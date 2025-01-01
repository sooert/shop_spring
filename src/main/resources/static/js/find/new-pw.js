// 비밀번호 유효성 검사 함수 
function validatePassword(password, passwordCheck) {
    if (!passwordCheck) {
        if (!password) return "empty";
        if (password.length < 8) return "short";
        // 영문, 숫자, 특수문자 조합 체크 강화
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@$!%*#?&]/.test(password);
        if (!(hasLetter && hasNumber && hasSpecial)) return "invalid";
        return "ok";
    }
    return password === passwordCheck ? "match" : "notmatch";
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
                if ($('#pw').val() === $('#pw-check').val() && $('#pw-check').val() !== '') {
                    resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
                    enablePw = true;
                }
                break;
        }
    } else if ($('#pw').val() === $('#pw-check').val() && $('#pw-check').val() !== '') {
        resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
        enablePw = true;
    } else {
        resultText.text('비밀번호가 일치하지 않습니다.').css('color','#f01200');
        enablePw = false;
    }
}

// 세션 보안 강화
$(document).ready(function() {
    // 페이지 로드 시 인증 상태 확인
    if (!checkAuthStatus()) {
        return;
    }
        
    // 한글 입력 방지
    $('#id').on('keyup', function(e) {
        var id = $(this).val();

        $(this).val(id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
    });

    // 비밀번호 입력 필드에 포커스가 있을 때 비밀번호 보이기
    $('#pw').on('focus', function() {
        $(this).attr('type', 'text'); // 비밀번호를 텍스트로 변경
    }).on('blur', function() {
        $(this).attr('type', 'password'); // 포커스가 벗어나면 다시 비밀번호로 변경
    });

    // 비밀번호 입력 필드 이벤트 처리
    $('#pw').on('input', function() {
        const pw = $(this).val();
        const result = validatePassword(pw);
        const resultText = $('#pw-result-txt');
        
        // 먼저 비밀번호 유효성 검사
        buildResultText(result, false);
        
        // 유효성 검사를 통과한 경우에만 기존 비밀번호 체크
        if (result === 'ok') {
            $.ajax({
                url: "./api/user/checkOldPw",
                type: "POST",
                data: {
                    id: sessionStorage.getItem('resetPasswordId'),
                    pw: pw
                },
                success: function(response) {
                    if (response.success) {
                        if (response.isDuplicate) {
                            resultText.text('기존 비밀번호와 동일합니다. 다른 비밀번호를 사용해주세요.').css('color','#f01200');
                            enablePw = false;
                        }
                    } else {
                        console.error('비밀번호 확인 실패:', response.message);
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                    resultText.text('서버 오류가 발생했습니다.').css('color','#f01200');
                    enablePw = false;
                }
            });
        }
    });

    // 비밀번호 확인 입력 필드 이벤트
    $('#pw-check').on('input', function() {
        const pw = $('#pw').val();
        const pwCheck = $(this).val();
        const result = validatePassword(pw, pwCheck);
        buildResultText(result, true);
    });

    // 비밀번호 변경 성공 후 세션 정리
    $('#new-pw-btn').on('click', function() {
        if(!checkAuthStatus()) return;
        if(!enablePw) {
            alert('비밀번호를 올바르게 입력해주세요.');
            return;
        }

        const name = sessionStorage.getItem('userName');

        $.ajax({
            url: "./api/user/updatePw",
            type: "POST",
            data: {
                id: sessionStorage.getItem('resetPasswordId'),
                newPw: $('#pw').val(),
                name: name
            },
            success: function(response) {
                if(response === 'ok') {
                    alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
                    sessionStorage.clear();
                    location.href = "./login";
                } else {
                    alert('비밀번호 변경에 실패했습니다.');
                }
            },
            error: function(error) {
                console.error('Error:', error);
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }
        });
    });
});


// 인증 상태 체크 함수 수정
function checkAuthStatus() {
    const resetPasswordId = sessionStorage.getItem('resetPasswordId');
    const isVerified = sessionStorage.getItem('isNumberVerified');
    
    // resetPasswordId나 인증 상태가 없는 경우
    if(!resetPasswordId || !isVerified || isVerified !== 'true') {
        alert('비정상적인 접근입니다.');
        location.href = "./find-pw";
        return false;
    }
    
    // 사용자 정보 확인
    let isValid = false;
    $.ajax({
        url: "./api/user/findIdByIN",
        type: "GET",
        async: false, // 동기 처리
        data: {
            id: resetPasswordId,
            name: sessionStorage.getItem('userName'),
            number: sessionStorage.getItem('userNumber')
        },
        success: function(response) {
            if (response && response.id === resetPasswordId) {
                isValid = true;
            } else {
                alert('비정상적인 접근입니다.');
                location.href = "./find-pw";
            }
        },
        error: function(error) {
            console.error('Error:', error);
            alert('사용자 정보 확인 중 오류가 발생했습니다.');
            location.href = "./find-pw";
        }
    });
    
    return isValid;
}

// 페이지를 벗어날 때 인증 정보 초기화
$(window).on('beforeunload', function() {
    // 비밀번호 변경 페이지서 벗어날 때만 세션 스토리지 초기화
    if (location.pathname !== '/new-pw') {
        sessionStorage.clear();
    }
});

