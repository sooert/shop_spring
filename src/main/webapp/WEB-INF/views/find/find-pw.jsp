<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FIND PW</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/find/find-pw.js"></script>
    <link rel="stylesheet" href="./css/find-pw.css">
</head>
<body>
    <header> 
        <h1>FIND PW</h1>
    </header>
    <!-- 비밀번호찾기 페이지 -->
    <div class="center-container" style="flex-direction: column;">
        <!-- 비밀번호찾기 폼 -->
		<div class="form-container">
			<form id="find-pw-form">

				<!-- 아이디 입력 --> 
				<div class="input-with-btn">
					<input id="id" name="id" type="text" placeholder="아이디" required autocomplete="username"/>
				</div>

				<!-- 이름 입력 -->
				<div class="input-with-btn">
					<input id="name" name="name" type="text" placeholder="이름" required/>
				</div>
				
				<!-- 전화번호 입력 -->
				<div class="input-with-btn">
					<input id="number" name="number" type="text" placeholder="전화번호 (010-1234-5678 형식)" required/>
					<button class="number" type="button">인증요청</button>
				</div>

				<!-- 인증번호 입력 -->
				<div id="number-auth-container" class="input-with-btn" style="display: none;">
					<input id="number-auth-code" name="number-auth-code" type="text" 
						placeholder="인증번호 6자리" pattern="[0-9]{6}" maxlength="6" required/>
					<span id="timer" class="timer"></span>
					<button class="number-check" type="button">확인</button>
				</div>
				<span id="number-check-result" class="number-check-result"></span>
				<button id="find-pw-btn" type="submit">비밀번호찾기</button>

				<!-- 비밀번호 찾기 결과 -->
				<div id="new-pw-txt" class="validation-message" style="margin-bottom: 15px;"></div>
			</form>
            <button id="back-btn" type="button">뒤로가기</button>
		</div>
    </div>

</body>
</html>