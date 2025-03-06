<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html> 
<head>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상품 상세</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/detail-item.css">
    
    <!-- JavaScript -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/item/detail-item.js"></script> 
    <script src="./js/item/buy.js"></script>
    <script src="./js/item/cart.js"></script>
</head>
<body>
    <!-- 뒤로가기 버튼 추가 -->
    <button id="goBack" class="go-back-button" onclick="window.location.href='./index'">
        <i class="fa-solid fa-arrow-left"></i>
    </button>

    <!-- 이미지 팝업 추가 -->
    <div class="image-popup">
        <span class="close-popup">&times;</span>
        <img src="" alt="확대된 상품 이미지" class="popup-image">
        <button class="prev-image"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="next-image"><i class="fa-solid fa-chevron-right"></i></button>
    </div>

    <button id="scrollToTop">
        <i class="fa-solid fa-chevron-up"></i>
    </button>
        
    <!-- 상품 메인 섹션 -->
    <div class="product-container">
        <!-- 상품 이미지 영역 -->
        <div class="product-image">
            <img src="" alt="상품 이미지" class="main-image">
            <div class="thumbnail-container">
                <!-- 썸네일 이미지 JavaScript로 동적 추가 -->
            </div>
        </div>
    
        <!-- 상품 정보 영역 -->
        <div class="product-details">
            <h1 class="product-title"></h1>
            <div class="price-info">
                <p class="product-discount"></p>
                <p class="original-price"></p>
                <p class="discounted-price"></p>
            </div>
      
            <!-- 혜택 정보 -->
            <div class="user-benefit">
                <p>혜택가: <strong class="user-benefit-price"></strong></p>
                <p>계절 할인: <strong class="season-discount"></strong></p>
                <p>특가 할인: <strong class="special-sale"></strong></p>
                <p>적립금: <strong class="point-benefit"></strong></p>
            </div>
      
            <!-- 상품 옵션 선택 -->
            <div class="product-options">
                <div class="option-group">
                    <label for="color">COLOR:</label>
                    <select id="color">
                        <option value="">색상 선택하기</option>
                    </select>
                </div>
                
                <div class="option-group">
                    <label for="size">SIZE:</label>
                    <select id="size">
                        <option value="">사이즈 선택하기</option>
                    </select>
                </div>

                <!-- 선택된 옵션들을 보여줄 컨테이너 -->
                <div class="selected-options-container">
                    <!-- 여기에 선택된 옵션들이 동적으로 추가됨 -->
                </div>
                
                <!-- 총 금액 표시 영역 -->
                <div class="total-price-container" style="display: none;">
                    <p>총 상품 금액: <span class="total-price">0원</span></p>
                </div>
            </div>
      
            <!-- 구매 관련 버튼 -->
            <div class="purchase-buttons">
                <button class="love-button ${isLiked ? 'liked' : ''}">
                    <i class="fa-regular fa-heart" style="margin-right: 5px; color: #f5adad;"></i> 
                    <span id="like-count">0</span>
                </button>
                <button class="buy-button">구매하기</button>
                <button class="cart-button" data-item-code="${item_code}">장바구니</button>
            </div>
      
            <!-- 배송 정보 -->
            <div class="delivery-info">
                <p>택배비: 3,300원 (주문 시 결제)</p>
                <p>50,000원 이상 구매 시 무료배송</p>
            </div>
        </div>
    </div>
    
    <!-- 상품 상세 정보 섹션 -->
    <div class="item-description-container">
        <!-- 탭 메뉴 -->
        <div class="description-tabs">
            <button class="tab-button active">상세 설명</button>
            <button class="tab-button">상품 사이즈</button>
            <button class="tab-button" id="review-tab">
                <span id="review-count">리뷰 0</span>
            </button>
        </div>

        <!-- 상세 설명 내용 -->
        <div class="description-content active">
            <p class="description-notice">판매자가 작성한 상품 상세 설명입니다.</p>
            <h2 class="content-title">상품 상세 설명</h2>
            <h3 class="item-title"></h3>
            <p class="item-content"></p>
            
            <div class="features">
                <h3>특징</h3>
                <ul>
                    <li>특징 1</li>
                    <li>특징 2</li>
                    <li>특징 3</li>
                </ul>
            </div>
            
            <div class="usage">
                <h3>사용 방법</h3>
                <p>상품 사용 방법에 대한 설명이 들어갑니다.</p>
            </div>
        </div>

        <!-- 상품 사이즈 내용 -->
        <div class="description-content">
            <h2>상품 사이즈 정보</h2>
            // ... 사이즈 정보 내용 ...
        </div>

        <!-- 리뷰 내용 -->
        <div class="description-content" id="review-content">
            <h2>상품 리뷰</h2>
            <div class="review-list">
                <!-- 리뷰가 여기에 동적으로 추가됨 -->
            </div>
        </div>
    </div>
</body>
</html>