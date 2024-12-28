// 전화번호 자동 하이폰 추가
function validateNumber(number) {
  const regex = /^010-\d{4}-\d{4}$/;
  return regex.test(number);
}

// 인증번호 발송
function sendMessage() {
  const tel = $("#number").val();
  const numbercode = Math.floor(100000 + Math.random() * 900000);
  
  $.ajax({
      url: "./api/user/send", 
      type: "POST",
      data: {  
        tel: tel,
        numbercode: numbercode
      },  
      success: function(response) {
          console.log("메세지가 전송되었습니다.");
          console.log("tel: ", tel);
          console.log("numbercode: ", numbercode);

          // 인증번호 세션 스토리지에 저장
          sessionStorage.setItem('numbercode', numbercode.toString());
          startTimer(180); // 타이머 시작 (3분 = 180초)
      },
      error: function(error) {
          console.error("메세지 전송 실패했습니다.", error);
      }
  });
}

// 타이머 시작 함수
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = $('#timer');
    
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            clearInterval(interval);
            $('.number-check').hide();
            display.text("다시 인증 요청"); // 타이머 종료 시 메시지
        }
    }, 1000);
}

$(document).ready(function() {
  let isNumberVerified = false;

   // 전화번호 입력 시 자동 하이픈 추가
   $('#number').on('input', function() {
    let number = $(this).val().replace(/[^0-9]/g, '');
    
    if(number.length > 3 && number.length <= 8) {
        number = number.substr(0, 3) + '-' + number.substr(3);
    } else if(number.length > 8) {
        number = number.substr(0, 3) + '-' + number.substr(3, 4) + '-' + number.substr(7);
    }
    
    $(this).val(number);
    isNumberVerified = false;
  });

  // 인증번호 요청
  $(".number").click(function() {
    const number = $("#number").val();
    $.ajax({
          url: "./api/user/findByNumber",
          type: "GET",
          data: { 
            number: number,
          },
          success: function(response) {
            sendMessage();
            $('#number-auth-container').show();
          },
          error: function(error) {
            console.error("전화번호 조회 실패", error);
        }
    });
});

    // 인증번호 확인
    $(".number-check").click(function() {
        const numbercode = $("#number-auth-code").val();
        const expectedNumberCode = sessionStorage.getItem('numbercode');

        if(numbercode === expectedNumberCode) {
            isNumberVerified = true;
            $('#number-check-result').text('인증번호가 일치합니다.').css('color', 'green');
        } else {
            isNumberVerified = false;
            $('#number-check-result').text('인증번호가 일치하지 않습니다.').css('color', 'red');
        }
    });

    // 회원가입 제출
    $('#signupForm').on('submit', async function(e) {
      e.preventDefault();

      if (!isNumberVerified) {
          alert('인증번호가 일치하지 않습니다.');
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
          const response = await 
          $.ajax({
              url: './api/user/create',
              type: 'POST',
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
