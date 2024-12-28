<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEW PW</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/find/new-pw.js"></script>
    <link rel="stylesheet" href="./css/new-pw.css">
</head>
<body>
    <header> 
        <h1>NEW PW</h1>
    </header>
    <!-- 비밀번호 변경 페이지 -->
    <div class="center-container" style="flex-direction: column;">
        <!-- 비밀번호 변경 폼 -->
		<div class="form-container">
			<form id="new-pw-form">
                <!-- 아이디 전달 -->
                <input type="hidden" id="id" name="id" value="${id}">
				
				<!-- 비밀번호 입력 -->
				<div class="input-with-btn">
					<input id="pw" name="password" type="password" placeholder="비밀번호를 입력해주세요" required/>
				</div>

				<!-- 비밀번호 확인 -->
				<div class="input-with-btn">
					<input id="pw-check" name="password" type="password" placeholder="비밀번호를 다시 입력해주세요" required/>
				</div>
				<div id="pw-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>

				<!-- 비밀번호 변경 버튼 -->
				<button id="new-pw-btn" type="submit">비밀번호 변경</button>
			</form>
		</div>
    </div>

</body>
</html>