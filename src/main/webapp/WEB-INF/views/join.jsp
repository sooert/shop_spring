<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="*">
    <title>JOIN</title>
    <!-- 제이쿼리 로드   -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- 회원가입 자바스크립트 로드 -->
    <script src="js/join.js"></script>
    <!-- 이미지 자바스크립트 로드 -->
    <script src="js/img.js"></script>
    <!-- 파이어베이스 로드 -->
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-storage.js"></script>
    <!-- 달력 로드 -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <!-- 아이콘 로드 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <!-- 주소 로드 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- 회원가입 css 로드 -->
    <link rel="stylesheet" href="css/join.css">
</head>
<body>
    <header>
        <h1>JOIN</h1>
    </header>

    <div class="center-container" style="flex-direction: column;">
        <div class="form-container">
            <form id="signupForm">

                <!-- 이미지 업로드 -->
                <div class="input-with-btn">
                    <input id="img_url" name="img_url" type="file" accept="image/*" />
                    <i class="fa-solid fa-image image-icon"></i>
                </div>

                <!-- 아이디 입력 -->
                <div class="input-with-btn">
                    <input id="id" name="id" type="text" placeholder="아이디" required autocomplete="username"/>
                    <button class="idcheck" type="button" aria-label="아이디 중복확인">중복확인</button>
                </div>
                <div id="id-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>

                <!-- 비밀번호 입력 -->
                <div class="input-with-btn">
                    <input id="pw" name="password" type="password" placeholder="비밀번호를 입력하세요" required autocomplete="new-password" minlength="8"/>
                    <i class="fa-solid fa-eye-slash password-toggle"></i>
                </div>

                <!-- 비밀번호 확인 -->
                <div class="input-with-btn">
                    <input id="pwcheck" type="password" placeholder="비밀번호를 다시 입력하세요" required autocomplete="new-password"/>
                    <i class="fa-solid fa-eye-slash password-toggle"></i>
                </div>
                <div id="pw-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>

                <!-- 닉네임 입력 -->
                <div class="input-with-btn">
                    <input id="nick" name="nickname" type="text" placeholder="닉네임" required/>
                    <button class="nickcheck" type="button" aria-label="닉네임 중복확인">중복확인</button>
                </div>
                <div id="nick-result-txt" class="validation-message" style="margin-bottom: 15px;"></div> 

                <!-- 생년월일 입력 -->
                <div class="input-with-btn">
                    <input id="birth_date" name="birth_date" type="text" placeholder="생년월일 (YYYY-MM-DD)" required readonly/>
                    <i class="fa-regular fa-calendar calendar-icon"></i>
                </div>

                <!-- 주소 입력 -->
                <div class="input-with-btn">
                    <input id="address" name="address" type="text" placeholder="주소" required/>
                </div>

                <!-- 전화번호 입력 -->
                <div class="input-with-btn">
                    <input id="number" name="number" type="text" placeholder="전화번호" required/>
                </div>

                <!-- 이메일 입력 -->
                <div class="input-with-btn">
                    <input id="email" name="email" type="text" placeholder="이메일" required/>
                </div>

                <!-- 회원가입 버튼 -->
                <button type="submit" id="signup-btn">회원가입</button>
            </form>
        </div>
    </div>
</body>
</html>