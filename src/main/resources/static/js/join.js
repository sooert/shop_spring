// 비밀번호 타이핑했을때 확인 
function validatePassword(password, passwordCheck) {
    // 첫 번째 비밀번호 입력란일 경우
    if (!passwordCheck) {
        if (!password) return "empty";
        if (password.length < 8) return "short";
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) return "invalid";
        return "ok";
    }
    // 비밀번호 확인란일 경우
    else {
        if (password !== passwordCheck) return "notmatch";
        return "match"; 
    }
}

// 비밀번호 경고 창 표시
var enablePw = false;
function buildResultText(result, isPasswordCheck) {
    const resultText = $('#pw-result-txt');
    
    // 비밀번호 확인란이 아닐 경우
    if (!isPasswordCheck) {
        switch(result) {
            case 'empty':
                resultText.text('비밀번호를 입력해주세요.').css('color','#f01200');
                enablePw = false;
                break;
            case 'short':
                resultText.text('비밀번호는 8자 이상이어야 합니다.').css('color','#f01200');
                enablePw = false;
                break;
            case 'invalid':
                resultText.text('영문/숫자/특수문자를 모두 포함해야 합니다.').css('color','#f01200');
                enablePw = false;
                break;
            case 'ok':
                if ($('#pw').val() === $('#pwcheck').val() && $('#pwcheck').val() !== '') {
                    resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
                    enablePw = true;
                }
                break;
        }
    } else if ($('#pw').val() === $('#pwcheck').val() && $('#pwcheck').val() !== '') {
        resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
        enablePw = true;
    } else {
        resultText.text('비밀번호가 일치하지 않습니다.').css('color','#f01200');
        enablePw = false;
    }
}

// 통합된 결과 텍스트 표시 함수
function showResultMessage(elementId, message, isSuccess) {
    $(`#${elementId}-result-txt`)
        .text(message)
        .css('color', isSuccess ? 'green' : 'red');
}
// 통합된 중복 체크 함수
async function checkDuplicate(type) {
    const value = $(`#${type}`).val();
    const fieldName = type === 'id' ? '아이디' : '닉네임';
    
    if (!value) {
        showResultMessage(type, `${fieldName}를 입력해주세요.`, false);
        return;
    }

    try {
        const response = await $.ajax({
            url: `./api/user/getBy${type.charAt(0).toUpperCase() + type.slice(1)}`,
            type: 'get',
            data: { 
                [type]: value 
            }
        });

        if (!response) {
            showResultMessage(type, `사용 가능한 ${fieldName}입니다.`, true);
            window[`is${type.charAt(0).toUpperCase() + type.slice(1)}Verified`] = true;
        } else {
            showResultMessage(type, `이미 사용중인 ${fieldName}입니다.`, false);
            $(`#${type}`).val('');
            window[`is${type.charAt(0).toUpperCase() + type.slice(1)}Verified`] = false;
        }
    } catch (error) {
        alert('서버 오류가 발생했습니다.');
        window[`is${type.charAt(0).toUpperCase() + type.slice(1)}Verified`] = false;
    }
}

// isValidDate 함수를 전역 스코프로 이동
function isValidDate(dateString) {
    if (!dateString) return false;
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);    
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    
    const date = new Date(year, month, day);
    
    const today = new Date();
    if (date > today) return false;  // 미래 날짜 체크
    
    return date.getFullYear() === year &&
           date.getMonth() === month &&
           date.getDate() === day;
}

$(document).ready(function() {

    // Datepicker 설정
    $('#birth_date').datepicker({
        dateFormat: 'yy-mm-dd',     // 날짜 형식
        changeYear: true,           // 연도 선택 가능
        changeMonth: true,          // 월 선택 가능
        yearRange: '1900:2024',     // 선택 가능한 연도 범위
        maxDate: new Date(),        // 오늘 날짜까지만 선택 가능
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,   // 연도 먼저 표시
        yearSuffix: '년'           // 연도 뒤에 '년' 표시
    }).on('click', function() {
        $(this).datepicker('show');
    });

    // 한글 입력 방지
    $('#id, #pw').on('keyup', function(e) {
        var id = $(this).val();
        var pw = $(this).val();

        $(this).val(id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
        $(this).val(pw.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
    });
    
    // 비밓번호 특수 문자 타이핑 쳤을때 확인
    $('#pw, #pwcheck').on('keyup', function() {
        var pw = $('#pw').val();
        var pwcheck = $('#pwcheck').val();
        var isPasswordCheck = $(this).attr('id') === 'pwcheck';
        
        var result = validatePassword(pw, pwcheck);
        
        if (isPasswordCheck) {
            // 비밀번호 확인란일 경우
            if (pwcheck) {
                if (result === 'match') {
                    $('#pw-result-txt').text('비밀번호가 일치합니다.').css('color','#006bea');
                    enablePw = true;
                } else {
                    $('#pw-result-txt').text('비밀번호가 일치하지 않습니다.').css('color','#f01200');
                }
            }
        }
        
        // 경고창 요청
        buildResultText(result, isPasswordCheck);
    });
    
    // 회원 가입 처리 수정
    $('#signup-btn').on('click', async function(e) {
        e.preventDefault(); // 이벤트 기본 동작 중단을 먼저 실행
        
        try {
            // birth_date 값을 가져올 때 하이픈(-) 포함된 형식으로 가져오기
            const birthDate = $('#birth_date').val();
            
            // 생년월일 유효성 검사 추가
            if (!isValidDate(birthDate)) {
                alert('올바른 생년월일 형식이 아닙니다. (YYYY-MM-DD)');
                $('#birth_date').focus();
                return false;
            }

            const userData = {
                id: $('#id').val(),
                nick: $('#nick').val(), 
                pw: $('#pw').val(),
                pwcheck: $('#pwcheck').val(),
                address: $('#address').val(),
                number: $('#number').val(),
                email: $('#email').val(),
                birth_date: birthDate 
            };

            // 필수 입력값 확인
            if (!validateInput(userData.id, '아이디') ||
                !validateInput(userData.nick, '닉네임') ||
                !validateInput(userData.pw, '비밀번호') ||
                !validateInput(userData.address, '주소') ||
                !validateInput(userData.number, '전화번호') ||
                !validateInput(userData.email, '이메일') ||
                !validateInput(userData.birth_date, '생년월일')) {
                return false;
            }

            // ID와 닉네임 중복확인을 했는지 검사
            if (!isIdVerified) {
                alert('아이디 중복확인을 해주세요.');
                return false;
            }

            if (!isNickVerified) {
                alert('닉네임 중복확인을 해주세요.');
                return false;
            }

            // 비밀번호 확인
            if (!enablePw) {
                alert('비밀번호를 확인해주세요.');
                $('#pw').focus();
                return false;
            }

            // 주소 확인
            if (!userData.address) {
                alert('주소를 입력해주세요.');
                $('#address').focus();
                return false;
            }

            // 전화번호 확인
            if (!userData.number) {
                alert('전화번호를 입력해주세요.');
                $('#number').focus();
                return false;
            }

            // 이메일 확인
            if (!userData.email) {
                alert('이메일을 입력해주세요.');
                $('#email').focus();
                return false;
            }

            // 회원가입 진행
            const result = await saveUserToDB(userData);
            if (result === 'ok') {
                alert("회원가입이 완료되었습니다.");
                window.location.href = './login';
            }
            
        } catch (error) {
            console.error('Error during signup:', error);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        }
        
        return false; // 폼 제출 방지
    });

    //주소창 검색
    $('#address').on('click', function() {
        new daum.Postcode({
            oncomplete: function(data) {
                console.log(data.address);
                $('#address').val(data.address);
            }
        }).open();
    });

    // 중복 확인 이벤트 핸들러 통합
    $('.idcheck').on('click', () => checkDuplicate('id'));
    $('.nickcheck').on('click', () => checkDuplicate('nick'));

    // 입력 필드 변경 감지 통합
    ['id', 'nick'].forEach(type => {
        $(`#${type}`).on('input', function() {
            window[`is${type.charAt(0).toUpperCase() + type.slice(1)}Verified`] = false;
            showResultMessage(type, '중복 확인이 필요합니다.', null);
        });

        // 엔터키 이벤트 처리 통합
        $(`#${type}`).on('keypress', function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                $(`.${type}check`).click();
            }
        });
    });

    // 입력값 유효성 검사 함수 추가
    function validateInput(value, fieldName) {
        if (!value || value.length === 0) {
            alert(`${fieldName}을(를) 입력해주세요.`);
            return false;
        }
        return true;
    }

    // ID 입력 필드 변경 감지
    $('#id').on('input', function() {
        isIdVerified = false;
        $('#id-result-txt').text('중복 확인이 필요합니다.').css('color', 'orange');
    });

    // 닉네임 입력 필드 변경 감지
    $('#nick').on('input', function() {
        isNickVerified = false;
        $('#nick-result-txt').text('중복 확인이 필요합니다.').css('color', 'orange');
    });

    $('#pw, #pwcheck').on('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if ($('#id').val() && $('#nick').val() && $('#pw').val() && $('#pwcheck').val()) {
                $('#signup-btn').click();
            } else {
                let nextInput = $(this).parent().next().find('input');
                if (nextInput.length > 0) {
                    nextInput.focus();
                }
            }
        }
    });

    // 달력 아이콘 클릭 이벤트
    $('.calendar-icon').on('click', function() {
        $('#birth_date').datepicker('show');
    });

     // 비밀번호 입력 필드에 포커스가 있을 때 비밀번호 보이기
     $('#pw').on('focus', function() {
        $(this).attr('type', 'text'); // 비밀번호를 텍스트로 변경
    }).on('blur', function() {
        $(this).attr('type', 'password'); // 포커스가 벗어나면 다시 비밀번호로 변경
    });

     // 전화번호 입력 형식 설정
     $('#number').on('input', function() {
        let value = $(this).val().replace(/\D/g, ''); // 숫자 이외의 문자 제거
    
        if (value.length > 11) {
            value = value.substr(0, 11); // 최대 11자리로 제한
        }
    
        if (value.length >= 7) {
            value = value.substr(0, 3) + '-' + value.substr(3, 4) + '-' + value.substr(7); // 하이픈 추가
        } else if (value.length >= 4) {
            value = value.substr(0, 3) + '-' + value.substr(3); // 하이픈 추가
        }
    
        $(this).val(value); // 입력 필드에 값 설정
    });
});

// saveUserToDB 함수 수정
function saveUserToDB(userData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './api/user/create',
            type: 'post',                               
            data: {
                id: userData.id,
                pw: userData.pw,
                nick: userData.nick,
                address: userData.address,
                number: userData.number,
                email: userData.email,
                birth_date: userData.birth_date
            },
            success: function(response) {
                resolve(response);
            },
            error: function(error) {
                console.error('Error:', error);
                alert('서버 오류: ' + error.responseText);
                reject(error);
            }
        });
    });
}



