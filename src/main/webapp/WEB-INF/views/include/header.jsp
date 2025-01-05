<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- jQuery 로드 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./js/include/header.js"></script>

<!-- CSS 파일 로드 순서 수정 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="./css/header.css">

<header class="header">
    <div class="container">
        <div class="logo">
            <a href="./index">SHOP</a>
        </div>
        <nav class="nav-menu">
            <ul>
                <!-- 로그인 상태 -->
                <c:if test="${not empty sessionScope.me}"> 
                    <li><a id="register-btn">상품 등록</a></li>
                    <li><a id="cart-btn">장바구니</a></li>
                    <li><a id="log-out-btn">로그아웃</a></li>
                </c:if> 
 
                <!-- 로그아웃 상태 -->
                <c:if test="${empty sessionScope.me}">
                    <li><a id="cart-btn">장바구니</a></li>
                    <li><a id="login-btn">로그인</a></li>
                </c:if>
            </ul>
        </nav>

        <div class="right">
            <button class="open-popup-btn">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </div>

    <!-- 팝업 내용 -->
    <div class="overlay">
        <div class="popup"> 
            <button class="close-btn">&times;</button>
            <div class="popup-content">
                <div class="popup-admin">
                    <c:choose>
                        <c:when test="${empty sessionScope.me}">
                            <div class="info-left-box">
                                <div class="name-box">
                                    <p style="font-size:14px;">로그인이 필요한 서비스입니다.</p>
                                    <span>로그인 해주세요.</span>
                                </div>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <div class="info-my-box">
                                <div class="profile-img-box">
                                    <img class="profile-img" src="${sessionScope.me.img_url}" />   
                                 </div>
                                 <div class="name-box">
                                    <p style="font-size:14px;">반가워요!</p>
                                    <span style="margin-right:10px; color:black; font-weight:bold;">${sessionScope.me.nick} 님</span>
                                 </div>
                              </div>
                           </c:otherwise>
                        </c:choose>
                        <div class="weather">
                           <table class="weather-table">
                              <tr>
                                 <td><img class="weather-icon" src="" alt="날씨 아이콘"></td>
                              </tr>
                              <tr>
                                 <td class="place"></td>
                              </tr>
                              <tr>
                                 <td class="temperature"></td>
                              </tr>
                              <tr>
                                 <td class="description"></td>
                              </tr>
                              <tr>
                                 <td class="humidity"></td>
                              </tr>
                           </table>
                        </div> 
                     </div>

                     <!-- 로그아웃 상태 -->
                     <c:if test="${empty sessionScope.me}">
                        <ul class="menu-list">
                            <li class="menu-item go-home">홈</li>
                            <li class="menu-item go-like-noUser">찜</li>
                        </ul>
                     </c:if>

                     <!-- 로그인 상태 -->
                     <c:if test="${not empty sessionScope.me}">
                        <ul class="menu-list">
                            <li class="menu-item go-home">홈</li>
                            <li class="menu-item go-my-page">마이페이지</li>
                            <li class="menu-item go-like">찜</li>
                            <li class="menu-item go-buy-history">주문 내역</li>
                            <li class="menu-item go-board">문의사항</li>
                        </ul>
                     </c:if>
                  </div>
               </div>
            </div>   
         </div>
    </header>