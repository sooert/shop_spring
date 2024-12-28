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

    <!-- jQuery UI 자바스크립트 -->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <!-- 나머지 스크립트들 -->
    <script src="./js/my-page/my.js"></script>

    <!-- Daum 우편번호 서비스 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/my-page.css">
</head>
<body>
    <div class="container">
        <!-- 좌측 네비게이션 바 -->
        <div class="sidebar-left">
            <div class="logo">
                <h1>몌뉴</h1>
            </div>
            <ul class="menu">
                <li><button id="home" onclick="location.href='./index'">🏠 홈</button></li>

                <li><button id="my" onclick="location.href='./my'" 
                    style="background-color: var(--color-hover);">✔ 내정보 관리</button>

                    <button id="call" 
                    onclick="location.href='./call'" style="font-size: 13px; margin-left: 10px;">📞 전화번호 변경</button>
                </li>

                <li><button id="buy" onclick="location.href='./buys'">📊 구매 내역</button></li>
                <li><button id="sell" onclick="location.href='./sells'">👤 판매 내역</button></li>
                <li><button id="review" onclick="location.href='./reviews'">✏️ 리뷰</button></li>
                <li><button id="love" onclick="location.href='./loves'">💖 좋아요</button></li>
            </ul>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="content" id="content-area">
            <h2>내 정보 관리</h2>
            <p>내 정보를 관리할 수 있습니다.</p>
                
            <!-- 아이디 확인만 가능 -->
            <div class="input-with-btn">
                <input id="id" name="id" type="text" 
                    required autocomplete="username" placeholder="사용자ID : ${sessionScope.me.id}" 
                    style="cursor: not-allowed; background-color: var(--color-gray); font-weight: bold;" disabled/>
            </div>

            <!-- 비밀번호 입력 -->
            <div class="input-with-btn">
                <input id="newPw" name="pw" type="password" placeholder="새 비밀번호를 입력해주세요." required/>
            </div>
            <div id="pw-result-txt" class="validation-message"></div> 

            <!-- 닉네임 입력 -->
            <div class="input-with-btn">
                <input id="nick" name="nickname" type="text" class="nickcheck" placeholder="닉네임을 입력해주세요." required/>
            </div>
            <div id="nick-result-txt" class="validation-message"></div> 

            <!-- 생년월일 입력 -->
			<div class="input-with-btn">
				<input id="birth_date" name="birth_date" type="text" 
						placeholder="생년월일 (YYYY-MM-DD)" 
						required readonly/>
			</div>

            <!-- 이메일 입력 -->
            <div class="input-with-btn">
                <input id="email" name="email" type="email" placeholder="이메일을 입력해주세요." required/>
            </div>

            <!-- 주소 입력 -->
            <div class="input-with-btn">
                <input id="address" name="address" type="text" placeholder="주소를 입력해주세요."  
                        required style="margin-bottom: 10px; cursor:pointer;" required/>

            <!-- 주소 상세 입력 -->
            <input id="detail_address" name="detail_address" type="text" placeholder="상세주소를 입력해주세요." required/>
            </div>

            <!-- 수정 버튼 -->
            <button type="button" id="update-btn">수정</button>
        </div>

       <!-- 우측 사이드바 -->
       <%@ include file="../include/sider.jsp" %>

    </div>
</body>
</html>