<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html> 
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지</title>
    <!-- jQuery 코어 먼저 로드 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- jQuery UI 자바스크립트 -->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    
    <!-- 나머지 스크립트들 -->
    <script src="./js/my-page.js"></script>

    <!-- 파이어베이스 관련 스크립트들 -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>
    
    <!-- Daum 우편번호 서비스 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/my-page.css">
</head>
<body>

    <div class="mypage-container">
        <aside class="sidebar">
          <div class="profile">
            <p>내 프로필</p>

            <!-- 이미지 업로드 -->
			<img id="profile-img" src="./img/default_profile.png"/>
			<input style="display: none;" type="file" id="file"/>

            <button id="profile-img-upload">업로드</button>

            <p class="profile-name">${sessionScope.me.nick}test 님</p>
          </div>
          <div class="extra-info">
            <button id="delete" style="margin-left:83px;">회원 탈퇴</button>
          </div>
        </aside>
        <main class="main-content">
          <section class="login-management">
            <h2>회원 정보</h2>
            <div class="login-info">
                <form action="my-page.jsp" method="post">
                    <div class="info-field">
                        <label for="userId">아이디</label>
                        <input type="text" id="userId" name="userId" value="${user.id}" readonly style="pointer-events: none;" autocomplete="username" />
                    </div>
                    <div class="info-field">
                        <label for="currentPassword">현재 비밀번호</label>
                        <input type="password" id="currentPassword" value="${user.pw}" name="currentPassword" autocomplete="current-password" placeholder="현재 비밀번호 입력" />
                    </div>
                    <div class="info-field">
                        <label for="newPassword">새 비밀번호</label>
                        <input type="password" id="newPassword" name="newPassword" autocomplete="new-password" placeholder="새 비밀번호 입력" />
                        <span id="newPasswordError" class="error-message"></span>
                    </div>
                    <div class="info-field">
                        <label for="address">주소</label>
                        <input type="text" id="address" name="address" value="${user.address}" placeholder="주소 입력" />
                    </div>
                    <!-- 생년월일 입력 -->
                    <div class="info-field">
                        <label for="birth_date">생년월일</label>
                        <input id="birth_date" name="birth_date" type="text" placeholder="생년월일 (YYYY-MM-DD)" value="${user.birth_date}"required readonly/>
                    </div>

                    <div class="info-field">
                        <label for="number">전화번호</label>
                        <input type="text" id="number" name="number" value="${user.number}" placeholder="전화번호 입력" />
                    </div>
                    <button type="button" id="update-btn">수정하기</button>
                </form>
          </section>
          <section class="connected-services">
            <h2>상품 판매 내역</h2>
            <ul>
              <li>${item.name} ${item.price} ${item.date}사탕 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}바나나 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}초콜릿 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}우유 1500원 2024-12-14</li>
            </ul>
          </section>
          <section class="connected-services">
            <h2>상품 구매 내역</h2>
            <ul>
              <li>${item.name} ${item.price} ${item.date}사탕 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}바나나 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}초콜릿 1500원 2024-12-14</li>
              <li>${item.name} ${item.price} ${item.date}우유 1500원 2024-12-14</li>
            </ul>
          </section>
        </main>
      </div>
</body>
</html>