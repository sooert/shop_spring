<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>  
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상품 상세</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../js/detail-item.js"></script>
    <script src="../js/header.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../css/detail-item.css">
    <link rel="stylesheet" href="../css/header.css">
</head>
<style>
    
</style>
<body>
    <%@ include file="../include/header.jsp" %>

    <button id="scrollToTop"><i class="fa-solid fa-chevron-up"></i></button>
        
    <div class="product-container">
        <!-- 상품 이미지 섹션 -->
        <div class="product-image">
          <img src="../img/default_profile.png" alt="상품 이미지" class="main-image">
          <div class="thumbnail-container">
            <img src="../img/default_profile.png" alt="Thumbnail 1" class="thumbnail">
            <img src="../img/default_profile.png" alt="Thumbnail 2" class="thumbnail">
            <img src="../img/default_profile.png" alt="Thumbnail 3" class="thumbnail">
          </div>
        </div>
    
        <!-- 상품 정보 섹션 -->
        <div class="product-details">
          <h1 class="product-title">니트</h1>
          <p class="product-discount">33% 할인</p>
          <p class="original-price">42,000원</p>
          <p class="discounted-price">28,000원</p>
    
          <!-- 할인 정보 -->
          <div class="user-benefit">
            <h2>성준님만을 위한 혜택</h2>
            <p>내일 혜택가: <strong>28,000원</strong></p>
            <ul>
              <li>오늘 추가 10% 상품 할인</li>
              <li>적립금 최대 6% 적립</li>
            </ul>
          </div>
    
          <!-- 옵션 선택 -->
          <div class="product-options">
            <label for="color">COLOR:</label>
            <select id="color">
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="gray">gray</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
            </select>
    
            <label for="size">SIZE:</label>
            <select id="size">
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
            </select>
          </div>
    
          <!-- 구매 버튼 -->
          <div class="purchase-buttons">
            <button class="gift-button">선물하기</button>
            <button class="buy-button">구매하기</button>
            <button class="cart-button">장바구니</button>
          </div>
    
          <!-- 추가 정보 -->
          <div class="additional-info">
            <p>택배비: 3,300원 (주문 시 결제)</p>
            <p>50,000원 이상 구매 시 무료배송</p>
          </div>
        </div>
    </div>
    
    <div class="item-description-container">
        <div class="item-description">
            <button class="item-description-button" style="background-color: #b6b6b6;">상세 설명</button>
            <button class="item-description-button">상품 사이즈</button>
            <button class="item-description-button">리뷰</button>
        </div>
            
            <p id="item-text">판매자가 작성한 상품 상세 설명입니다.</p>

        <div class="description-container">
            <h1 class="product-title">상품 상세 설명</h1>
            <p>여기에 상품에 대한 자세한 설명이 들어갑니다.</p>
            <h2>특징</h2>
            <ul>
                <li>특징 1</li>
                <li>특징 2</li>
                <li>특징 3</li>
            </ul>
            <h2>사용 방법</h2>
            <p>상품 사용 방법에 대한 설명이 들어갑니다.</p>
        </div>
    </div>

    </div>
</body>
</html>