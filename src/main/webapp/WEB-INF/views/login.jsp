<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo-icon.png">
    <title>LOGIN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/login.js"></script>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <header>
        <h1>LOGIN</h1>
    </header>
    <!-- 로그인 페이지 -->
    <div class="center-container" style="flex-direction: column;">
        <!-- 로그인 폼 -->
		<div class="form-container">
			<form id="signupForm">

				<!-- 아이디 입력 -->
				<div class="input-with-btn">
					<input id="id" name="id" type="text" placeholder="아이디" required autocomplete="username"/>
				</div>
				
				<!-- 비밀번호 입력 -->
				<div class="input-with-btn">
					<input id="pw" name="password" type="password" placeholder="비밀번호를 입력하세요" 
						required autocomplete="new-password" minlength="8"/>
				</div>

				<button id="login-btn" type="submit">로그인</button>
			</form>
		</div>
    </div>

</body>
</html>