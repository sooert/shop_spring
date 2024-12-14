$(document).ready(function() {
    let isNumberVerified = false;

    // 전화번호 형식 검증
    function validatePhoneNumber(number) {
        const regex = /^010-\d{4}-\d{4}$/;
        return regex.test(number);
    }

    // 전화번호 입력 시 자동 하이픈 추가
    $('#number').on('input', function() {
        let number = $(this).val().replace(/[^0-9]/g, '');
        
        if(number.length > 3 && number.length <= 7) {
            number = number.substr(0, 3) + '-' + number.substr(3);
        } else if(number.length > 7) {
            number = number.substr(0, 3) + '-' + number.substr(3, 4) + '-' + number.substr(7);
        }
        
        $(this).val(number);
        isNumberVerified = false;
        $('#number-check-result').text('중복 확인이 필요합니다.').css('color', 'orange');
    });

    // 전화번호 중복 확인
    $('.numbercheck').on('click', async function() {
        const number = $('#number').val();
        
        if (!validatePhoneNumber(number)) {
            $('#number-check-result').text('올바른 전화번호 형식이 아닙니다.').css('color', 'red');
            return;
        }

        try {
            // 하이픈 제거 후 서버로 전송
            const cleanNumber = number.replace(/-/g, '');
            const response = await $.ajax({
                url: './api/user/findByNumber',
                type: 'post',
                data: { number: cleanNumber }
            });

            if (!response) {
                $('#number-check-result').text('사용 가능한 전화번호입니다.').css('color', 'green');
                isNumberVerified = true;
            } else {
                $('#number-check-result').text('이미 등록된 전화번호입니다.').css('color', 'red');
                $('#number').val('');
                isNumberVerified = false;
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다.');
            isNumberVerified = false;
        }
    });

    // 회원가입 제출
    $('#signupForm').on('submit', async function(e) {
        e.preventDefault();

        if (!isNumberVerified) {
            alert('전화번호 중복 확인을 해주세요.');
            return;
        }

        try {
            // 세션 스토리지에서 이전 페이지 데이터 가져오기
            const prevData = JSON.parse(sessionStorage.getItem('signupData'));
            if (!prevData) {
                alert('이전 페이지의 정보가 없습니다.');
                return;
            }

            // 전화번호에서 하이픈 제거
            const cleanNumber = $('#number').val().replace(/-/g, '');
            
            // 최종 데이터 구성
            const userData = {
                ...prevData,
                number: cleanNumber,
                img_url: prevData.img_url || '' // img_url이 없는 경우 빈 문자열 전달
            };

            // 회원가입 요청
            const response = await $.ajax({
                url: './api/user/create',
                type: 'post',
                data: userData,
                traditional: true
            });

            if (response === 'ok') {
                alert('회원가입이 완료되었습니다.');
                sessionStorage.removeItem('signupData'); // 세션 데이터 삭제
                window.location.href = './login'; // 로그인 페이지로 이동
            } else {
                alert('회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        }
    });
});
