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
    
    <!-- 파이어베이스 관련 스크립트들 -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>
    
    <!-- 나머지 스크립트들 -->
    <script src="./js/my-page/util.js"></script>
    <script src="./js/my-page/sells.js"></script>
    
    <!-- Daum 우편번호 서비스 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/sells.css">
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
            </ul>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="content" id="content-area">
            <h2>판매 내역</h2>
            <p>판매 내역을 확인할 수 있습니다.</p>

        </div>

        <!-- 우측 사이드바 -->
        <%@ include file="../include/sider.jsp" %>
        
    </div>
</body>
</html>