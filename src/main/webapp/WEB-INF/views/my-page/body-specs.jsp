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
    <script src="./js/my-page/body-specs.js"></script>

    <!-- Daum 우편번호 서비스 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/my-page.css">
    <link rel="stylesheet" href="./css/body-specs.css">
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
                <li><button id="body-specs" onclick="location.href='./body-specs'" 
                    style="background: var(--primary-color); color: white;">📊 바디 치수</button></li>
            </ul>
        </div>

        <div class="content">
            <h2>바디 치수 설정</h2>
            <div class="body-specs-container">

                <!-- 키 입력 부분 -->
                <div class="specs-group">
                    <label class="specs-label">키</label>
                    <div class="range-container">
                        <input type="range" id="height" min="140" max="190" value="160">
                        <span class="range-value" id="height">160cm</span>
                    </div>
                </div>

                <!-- 하의 사이즈 입력 부분 -->
                <div class="specs-group">
                    <label class="specs-label">하의 사이즈</label>
                    <div class="range-container">
                        <input type="range" id="pants_size" min="23" max="35" value="28">
                        <span class="range-value" id="pants_size">28</span>
                    </div>
                </div>

                <!-- 상의 사이즈 -->
                <div class="specs-group">
                    <label class="specs-label">상의 사이즈</label>
                    <select id="top_size" name="top_size" required>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                <!-- 신발 사이즈 -->
                <div class="specs-group">
                    <label class="specs-label">신발 사이즈</label>
                    <select id="shoe_size" name="shoe_size" required> 
                        <option value="240">240</option>
                        <option value="245">245</option>
                        <option value="250">250</option>
                        <option value="255">255</option>
                    </select>
                </div>


                <button type="submit" class="save-button" id="save-button">저장하기</button>
            </div>
        </div>
    </div>

       <!-- 우측 사이드바 -->
       <%@ include file="../include/sider.jsp" %>

    </div>
</body>
</html>