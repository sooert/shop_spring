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

    $('#birth_date').on('click', function() {
        $(this).datepicker('show');
    });
   

    // 한글 입력 방지
    $('#newPw, #email').on('keyup', function(e) {
        var pw = $(this).val();
        var email = $(this).val();

        $(this).val(pw.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
        $(this).val(email.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
    });

    // 비밀번호 입력 필드에 포커스가 있을 때 비밀번호 보이기
    $('#newPw').on('focus', function() {
        $(this).attr('type', 'text'); // 비밀번호를 텍스트로 변경
    }).on('blur', function() {
        $(this).attr('type', 'password'); // 포커스가 벗어나면 다시 비밀번호로 변경
    });

    // 비밀번호 입력 필드 이벤트 처리
    $('#newPw').on('input', function() {
        const value = $(this).val();
        const result = validatePassword(value); // 비밀번호 유효성 검사
        if (result === "ok") {
            showResultMessage('pw', '사용 가능한 비밀번호입니다.', true);
        } else {
            showResultMessage('pw', '사용 불가능한 비밀번호입니다.', false);
         }
    });

    // 닉네임 유효성 검사
    $('#nick').on('input', function() {
        checkNick('nick');
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

    // 수정 버튼 클릭시
    $('#update-btn').on('click', function() {
        

        const userData = {
            pw: $('#newPw').val(),
            nick: $('#nick').val(),
            birth_date: $('#birth_date').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            detail_address: $('#detail_address').val()
        };

        $.ajax({
            url: './api/user/update',
            type: 'post',
            data: {
                pw: userData.pw,
                nick: userData.nick,
                birth_date: userData.birth_date,
                email: userData.email,
                address: userData.address,
                detail_address: userData.detail_address
            },
            success: function(response) {
                location.reload();
                alert('회원 정보 수정완료 되었습니다.');
            },
            error: function(error) {
                console.error("회원 정보 수정을 다시 시도해주세요.", error);
            }
        });
    });
});
 
// 통합된 결과 텍스트 표시 함수
function showResultMessage(elementId, message, isSuccess) {
    $(`#${elementId}-result-txt`)
        .text(message)
        .css({
            'color': isSuccess ? 'blue' : 'red',
            'margin-bottom': '15px'
    });
}

// 닉네임 중복 체크 함수
async function checkNick(type) {
    const value = $(`#${type}`).val();
    const fieldName = type === 'nick' ? '닉네임' : '';
    
    if (!value) {
        showResultMessage(type, `${fieldName}를 입력해주세요.`, false);
        return;
    }

    try {
        const response = await $.ajax({
            url: `./api/user/findByNick`,
            type: 'GET',
            data: { 
                nick: value 
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

// 비밀번호 유효성 검사
function validatePassword(value) {
    if (!value) return "empty";
    if (value.length < 8) return "short";
    // 영문, 숫자, 특수문자 조합 체크 강화
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[@$!%*#?&]/.test(value);
    if (!(hasLetter && hasNumber && hasSpecial)) return "invalid";
    return "ok";
}



