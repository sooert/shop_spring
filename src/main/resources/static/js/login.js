$(document).ready(function() {
	
	// 한글 입력 방지
	 $('#id, #pw').on('keyup', function(e) {
		var value = $(this).val();
	    $(this).val(value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
	});

	// AJAX 로그인 함수 정의
	function performLogin(url, id, pw) {
		$.ajax({
			url: url,
			type: "POST",
			data: { id: id, pw: pw },
			success: function(result) {
				if(!result || result == '') {
					alert("아이디 또는 비밀번호가 올바르지 않습니다.");
				} else {
					alert("로그인 완료 되었습니다.");
					location.href = './index';
				}
			},
			error: function(e) {
				alert("로그인 처리 중 오류가 발생했습니다.");
				console.log(e);
			}
		});
	}

	$("#login-btn").on("click", function(e) {
		e.preventDefault();
		
		var id = $("#id").val().trim();
		var pw = $("#pw").val().trim();
		
		if(!id || !pw) {
			alert("아이디와 비밀번호를 모두 입력해주세요.");
			return;
		}
		
		// 로그인 URL 로직 수정
		var loginUrl = "./api/user/login";  // 기본 URL 설정
		performLogin(loginUrl, id, pw);
	});
});
