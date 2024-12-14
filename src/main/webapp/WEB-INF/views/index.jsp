<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>웹 쇼핑몰</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/index.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <%@ include file="include/header.jsp" %>

    <button id="scrollToTop"><i class="fa-solid fa-chevron-up"></i></button>
        
    <main class="main">
        <section class="hero">
            <div class="container">
                <h2>특별한 상품을 만나보세요</h2>
                <p>최고의 품질, 최상의 서비스를 제공합니다</p>
            </div>
        </section>

        <section class="products">
            <div class="container">
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 1</h3>
                    <p>가격: 29,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 2</h3>
                    <p>가격: 35,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 3</h3>
                    <p>가격: 42,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 4</h3>
                    <p>가격: 42,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
            </div>

            <div class="container">
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 1</h3>
                    <p>가격: 29,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 2</h3>
                    <p>가격: 35,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 3</h3>
                    <p>가격: 42,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
                <div class="product">
                    <img src="https://via.placeholder.com/300" alt="상품 이미지">
                    <h3>상품명 4</h3>
                    <p>가격: 42,000원</p>
                    <button class="btn-purchase">구매하기</button>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p style="text-align: center;">&copy; 웹 쇼핑몰 포토폴리오</p>
        </div>
    </footer>
</body>
</html>