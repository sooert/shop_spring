require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const twilio = require('twilio');

// Twilio 설정
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACdd65409153dbba7df22cdc20896e2585';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'd48a41751ef2a30211c386ded0e0446a';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+13614902816';
const client = twilio(accountSid, authToken);

// Redis 설정
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// 제한 및 설정 값
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_TIME_WINDOW = 60; // 초
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME = 10 * 60; // 초

const app = express();
app.use(bodyParser.json());

// 인증 요청 제한 확인
const isRateLimited = async (phoneNumber) => {
    const key = `rate_limit:${phoneNumber}`;
    return new Promise((resolve, reject) => {
        redisClient.multi()
            .incr(key)
            .expire(key, RATE_LIMIT_TIME_WINDOW)
            .exec((err, replies) => {
                if (err) return reject(err);
                const requestCount = replies[0];
                resolve(requestCount > RATE_LIMIT_MAX_REQUESTS);
            });
    });
};

// 실패 횟수 관리
const trackFailedAttempt = async (phoneNumber) => {
    const key = `failed_attempts:${phoneNumber}`;
    return new Promise((resolve, reject) => {
        redisClient.multi()
            .incr(key)
            .expire(key, LOCKOUT_TIME)
            .exec((err, replies) => {
                if (err) return reject(err);
                const failCount = replies[0];
                resolve(failCount >= MAX_FAILED_ATTEMPTS);
            });
    });
};

const isLockedOut = async (phoneNumber) => {
    const key = `failed_attempts:${phoneNumber}`;
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) return reject(err);
            const failCount = value ? parseInt(value, 10) : 0;
            resolve(failCount >= MAX_FAILED_ATTEMPTS);
        });
    });
};

// 인증 코드 보내기
const sendVerificationCode = async (phoneNumber) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return new Promise((resolve, reject) => {
        redisClient.setex(`verification_code:${phoneNumber}`, RATE_LIMIT_TIME_WINDOW * 5, verificationCode, (err) => {
            if (err) return reject(err);
            client.messages.create({
                body: `[ 인증 코드: ${verificationCode} ] 인증코드를 입력해주세요.`,
                from: twilioPhoneNumber,
                to: phoneNumber,
            }).then(() => resolve(true)).catch(reject);
        });
    });
};

const verifyCode = async (phoneNumber, userInputCode) => {
    const key = `verification_code:${phoneNumber}`;
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, storedCode) => {
            if (err) return reject(err);
            if (!storedCode) return resolve(false);
            resolve(storedCode === userInputCode);
        });
    });
};

// 추가 메시지 전송 API
app.post('/send-custom-message', async (req, res) => {
    const { to, messageBody } = req.body;

    if (!to || !messageBody) {
        return res.status(400).json({
            success: false,
            message: '전화번호와 메시지 본문이 필요합니다.',
        });
    }

    try {
        const message = await client.messages.create({
            body: messageBody,
            from: twilioPhoneNumber,
            to: to,
        });

        res.json({
            success: true,
            message: '메시지가 성공적으로 전송되었습니다.',
            sid: message.sid,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '메시지 전송에 실패했습니다.',
            error: error.message,
        });
    }
});

// 기존 인증 API
app.post('/send-code', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: '전화번호가 필요합니다.' });
    }

    try {
        if (await isRateLimited(phoneNumber)) {
            return res.status(429).json({ success: false, message: '요청이 너무 많습니다. 잠시 후 다시 시도하세요.' });
        }

        await sendVerificationCode(phoneNumber);
        res.json({ success: true, message: '인증 코드가 전송되었습니다.' });
    } catch (err) {
        res.status(500).json({ success: false, message: '인증 코드 전송에 실패했습니다.', error: err.message });
    }
});

app.post('/verify-code', async (req, res) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: '전화번호와 인증 코드가 필요합니다.' });
    }

    try {
        if (await isLockedOut(phoneNumber)) {
            return res.status(403).json({ success: false, message: '실패 횟수가 초과되었습니다. 잠시 후 다시 시도하세요.' });
        }

        if (await verifyCode(phoneNumber, code)) {
            res.json({ success: true, message: '인증에 성공했습니다.' });
        } else {
            if (await trackFailedAttempt(phoneNumber)) {
                return res.status(403).json({ success: false, message: '실패 횟수가 초과되었습니다. 잠시 후 다시 시도하세요.' });
            }
            res.status(400).json({ success: false, message: '인증 코드가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: '인증 처리 중 오류가 발생했습니다.', error: err.message });
    }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// /////////////////////////////////////////////


$(document).ready(function() {
    // 이전 페이지에서 전달된 회원가입 정보를 세션스토리지에서 가져옴
    const userSignupData = JSON.parse(sessionStorage.getItem('signupData'));
    
    let timerInterval;
    let isVerified = false;

    // 인증번호 요청
    $('.phone-auth').click(function() {
        const phoneNumber = $('#phone').val();
        if (!phoneNumber) {
            alert('전화번호를 입력해주세요.');
            return;
        }

        // 인증 요청 AJAX 호출
        $.ajax({
            url: '/send-code',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ phoneNumber: phoneNumber }),
            success: function(response) {
                if (response.success) {
                    alert('인증번호가 전송되었습니다.');
                    $('#phone-auth-container').show();
                    startTimer();
                }
            },
            error: function(xhr) {
                alert(xhr.responseJSON?.message || '인증번호 전송에 실패했습니다.');
            }
        });
    });

    // 인증번호 확인
    $('.phone-auth-check').click(function() {
        const phoneNumber = $('#phone').val();
        const code = $('#phone-auth-code').val();

        if (!code) {
            alert('인증번호를 입력해주세요.');
            return;
        }

        $.ajax({
            url: '/verify-code',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                phoneNumber: phoneNumber,
                code: code 
            }),
            success: function(response) {
                if (response.success) {
                    alert('인증이 완료되었습니다.');
                    isVerified = true;
                    clearInterval(timerInterval);
                    $('#timer').text('인증완료');
                    $('#phone-auth-code, .phone-auth-check').prop('disabled', true);
                }
            },
            error: function(xhr) {
                alert(xhr.responseJSON?.message || '인증에 실패했습니다.');
            }
        });
    });

    // 회원가입 폼 제출
    $('#signupForm').submit(function(e) {
        e.preventDefault();
        
        if (!isVerified) {
            alert('휴대폰 인증을 완료해주세요.');
            return;
        }

        // 이전 회원가입 정보와 휴대폰 번호를 합쳐서 최종 제출
        const finalUserData = {
            ...userSignupData,
            phone: $('#phone').val()
        };

        // 최종 회원가입 요청
        $.ajax({
            url: './api/user/finalCreate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(finalUserData),
            success: function(response) {
                alert('회원가입이 완료되었습니다.');
                // 세션스토리지 클리어
                sessionStorage.removeItem('signupData');
                location.href = './login';
            },
            error: function(xhr) {
                alert('회원가입 처리 중 오류가 발생했습니다.');
            }
        });
    });

    // 타이머 함수
    function startTimer() {
        let timeLeft = 180; // 3분
        clearInterval(timerInterval);
        
        const timerElement = document.getElementById('timer');
        if (!timerElement) {
            const timerDiv = document.createElement('div');
            timerDiv.id = 'timer';
            document.querySelector('#verificationCode').parentNode.appendChild(timerDiv);
        }
        
        timerInterval = setInterval(function() {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = '시간초과';
                document.getElementById('verificationCode').disabled = true;
                return;
            }

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }, 1000);
    }
});

function sendVerificationCode() {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    if (!phoneNumber) {
        alert('전화번호를 입력해주세요.');
        return;
    }

    fetch('/api/send-code?phoneNumber=' + phoneNumber, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        startTimer();
        document.getElementById('verificationCode').disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('인증번호 전송에 실패했습니다.');
    });
}

function verifyCode() {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const code = document.getElementById('verificationCode').value;
    
    if (!code) {
        alert('인증번호를 입력해주세요.');
        return;
    }

    fetch(`/api/verify-code?phoneNumber=${phoneNumber}&code=${code}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        if (result === '인증이 완료되었습니다.') {
            isVerified = true;
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = '인증완료';
            document.getElementById('verificationCode').disabled = true;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('인증 실패');
    });
}