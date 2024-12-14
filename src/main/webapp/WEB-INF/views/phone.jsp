<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JOIN</title>

    <!-- jQuery 코어 먼저 로드 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- jQuery UI 자바스크립트 -->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    
    <!-- 나머지 스크립트들 -->
    <script src="./js/phone.js"></script>
    <script src="./js/join.js"></script>
    <script src="./js/util.js"></script>

    <!-- 파이어베이스 관련 스크립트들 -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/join.css">
</head>
<body>
    <header>
        <h1>JOIN</h1>
    </header>

    <!-- 회원가입 페이지 -->
	<div class="center-container" style="flex-direction: column;">
    <!-- 회원가입 폼 -->
		<div class="form-container">
			<form id="signupForm">
				<!-- 전화번호 입력
				<div class="input-with-btn">
					<input id="phone" name="phone" type="text" placeholder="전화번호 (-없이 입력)" 
						   pattern="[0-9]{11}" maxlength="11" required/>
					<button class="phone-auth" type="button">인증요청</button>
				</div> -->

                <!-- 전화번호 인증
                <div id="phone-auth-container" style="display: none;">
                    <div class="input-with-btn">
                        <input id="phone-auth-code" name="phone-auth-code" type="text" 
                               placeholder="인증번호 6자리" pattern="[0-9]{6}" maxlength="6" required/>
                        <span id="timer" class="timer">3:00</span>
                        <button class="phone-auth-check" type="button">확인</button>
                    </div>
                </div> -->

                <!-- 전화번호 입력 -->
                <div class="input-with-btn">
                    <input id="number" name="number" type="text" placeholder="전화번호 (010-1234-5678 형식)" required/>
                    <button class="numbercheck" type="button">중복확인</button>
                </div>
                <div id="number-check-result" class="validation-message" style="margin-bottom: 15px;"></div>
				
				<!-- 회원가입 버튼 -->
				<button type="submit" id="signup-btn">회원가입</button>
			</form>
		</div>
	</div>
</body>
</html>