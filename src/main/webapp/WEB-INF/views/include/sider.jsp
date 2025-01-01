<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!-- 파이어베이스 관련 스크립트들 -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>

<script src="./js/include/sider.js"></script>
<script src="./js/my-page/util.js"></script>

<link rel="stylesheet" href="./css/my-page.css">

 <!-- 우측 사용자 정보 -->
 <div class="sidebar-right">
    <div class="user-info">
      <div class="profile-img-box">
        <img src="${sessionScope.me.img_url}" class="profile-img" style="cursor: pointer;">
        <input style="display: none;" type="file" id="file" name="file" accept="image/*"/>
      </div>
        <p><strong>${sessionScope.me.nick}님</strong>
    </div>
    <div class="menu">
        <h3></h3>
        <ul>
            <li><a href="#">장바구니 - 구현 중</a></li>
            <li><a href="#">주문내역 - 구현 미정</a></li>
        </ul>
        <!-- <h3>상품</h3>
        <ul>
            <li><a href="#">좋아요</a></li>
            <li><a href="#">구매내역</a></li>
            <li><a href="#">판매내역</a></li>
        </ul> -->
  </div>
</div>