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
                <li><button id="my" onclick="location.href='./my'">✔ 내정보 관리</button>
                    <button id="call" style="display: none;">📞 전화번호 변경</button>
                </li>
                <li><button id="body-specs" onclick="location.href='./body-specs'">📊 바디 치수</button></li>
            </ul>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="content" id="content-area">
            <h2>가입 정보 관리</h2>
            <p>왼쪽 버튼을 눌러서 확인 할 수 있습니다.</p>

        </div>

        <!-- 우측 사이드바 -->
        <%@ include file="../include/sider.jsp" %>
       
    </div>
</body>
</html>