<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>FIND ID</title> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/find/find-id.js"></script>
    <link rel="stylesheet" href="./css/find-id.css">
</head>
<body>
    <header>
        <h1>FIND ID</h1>
    </header>
    <!-- 아이디찾기 페이지 -->
    <div class="center-container" style="flex-direction: column;">
        <!-- 아이디찾기 폼 -->
		<div class="form-container">
			<form id="find-id-form">

				<!-- 이름 입력 -->
				<div class="input-with-btn">
					<input id="name" name="name" type="text" placeholder="이름" required/>
				</div>

				<!-- 이메일 입력 --> 
				<div class="input-with-btn">
					<input id="email" name="email" type="email" placeholder="이메일" required/>
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
				<button id="find-id-btn" type="submit">아이디찾기</button>
			</form>
            <button id="back-btn" type="button">뒤로가기</button>
		</div>
    </div>

</body>
</html>