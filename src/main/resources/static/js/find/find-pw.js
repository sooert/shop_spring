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
  let foundUserId = null;

  // 한글 입력 방지
  $('#id').on('keyup', function(e) {
    var id = $(this).val();

    $(this).val(id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
  });

  // 뒤로가기 버튼 클릭 시 로그인 페이지로 이동
  $('#back-btn').click(function() {
    location.href = "./login";
  });

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
    const id = $("#id").val();
    const number = $("#number").val().replace(/-/g, '');
    const email = $("#email").val();

      if (!id) {
          alert("아이디를 입력해주세요.");
          return;
      }

      if (!number || !email) {
          alert("전화번호와 이메일을 모두 입력해주세요.");
          return;
      }

      if (!validateNumber($("#number").val())) {
          alert("올바른 전화번호 형식이 아닙니다.");
          return;
      }

      $.ajax({
          url: "./api/user/findIdByEPN",
          type: "GET",
          data: { 
              id: id,
              email: email,
              number: number
          },
          success: function(response) {
              if (response) {
                  foundUserId = response.id;
                  sessionStorage.setItem('resetPasswordId', foundUserId);
                  sendMessage();
                  $('#number-auth-container').show();
              } else {
                  alert("입력하신 정보와 일치하는 계정이 없습니다.");
              }
          },
          error: function(error) {
              console.error("조회 실패", error);
              alert("서버 오류가 발생했습니다.");
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

    // 비밀번호 찾기 제출
    $("#find-pw-btn").on("click", function(event) {
      event.preventDefault();

      if (!isNumberVerified) {
        alert("전화번호 인증을 완료해주세요.");
        return;
      }

      const id = $("#id").val();
      const email = $("#email").val();
      const number = $("#number").val().replace(/-/g, '');

      $.ajax({
        url: "./api/user/findIdByEPN",
        type: "GET", 
        data: {
          id: id,
          email: email,
          number: number
        },
        success: function(response) {
          if (response) {
            // 세션스토리지에 필요한 정보 모두 저장
            sessionStorage.clear();
            sessionStorage.setItem('resetPasswordId', response.id);
            sessionStorage.setItem('isNumberVerified', 'true');
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userNumber', number);
            
            alert("비밀번호 변경 페이지로 이동합니다.");
            location.href = "./new-pw";
          } else {
            alert("일치하는 사용자 정보를 찾을 수 없습니다.");
          }
        },
        error: function(error) {
          console.error("Error:", error);
          alert("서버 오류가 발생했습니다.");
        }
      });
    });
  
});
  
// beforeunload 이벤트 핸들러
$(window).on('beforeunload', function() {
    // numbercode만 삭제하고 다른 인증 정보는 유지
    sessionStorage.removeItem('numbercode');
});
  