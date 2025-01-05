<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 파이어베이스 관련 스크립트들 -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>

<script src="./js/include/sider.js"></script>
<script src="./js/my-page/util.js"></script>

<link rel="stylesheet" href="./css/sider.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

<!-- 우측 사용자 정보 -->
<div class="sidebar-right">
    <div class="user-info-card">
        <div class="profile-img-box">
            <img src="${sessionScope.me.img_url}" class="profile-img" alt="프로필 이미지">
            <div class="profile-img-overlay">
                <i class="fas fa-camera"></i>
            </div>
            <input style="display: none;" type="file" id="file" name="file" accept="image/*"/>
        </div>
        <div class="user-details">
            <h2 class="user-name">${sessionScope.me.nick}님</h2>
            <p class="user-email">${sessionScope.me.email}</p>
        </div>
    </div>
    
    <nav class="sidebar-menu">
        <div class="menu-section">
            <h3><i class="fas fa-shopping-cart"></i> 쇼핑</h3>
            <ul>
                <li><a href="./cart"><i class="fas fa-shopping-basket"></i> 장바구니</a></li>
                <li><a href="./buy-history"><i class="fas fa-history"></i> 주문내역</a></li>
                <li><a href="./reviews"><i class="fas fa-star"></i> 리뷰</a></li>
            </ul>
        </div>
        
        <div class="menu-section">
            <h3><i class="fas fa-store"></i> 상품</h3>
            <ul>
                <li><a href="./lovers"><i class="fas fa-heart"></i> 좋아요</a></li>
                <li><a href="./sell-history"><i class="fas fa-box"></i> 판매내역</a></li>
                <li><a href="./sell-reviews"><i class="fas fa-star"></i> 리뷰관리</a></li>
            </ul>
        </div>
    </nav>
</div>