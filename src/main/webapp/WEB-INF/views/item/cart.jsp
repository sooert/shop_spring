<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html> 
<head>
    <meta charset="UTF-8">
    <title>장바구니</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/cart.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/item/cart.js"></script>
    <script src="./js/item/buy.js"></script>
</head>
<body>
    <%@ include file="../include/header.jsp" %>
    <div class="container">
        <h1>장바구니</h1>
        <div class="cart-list">
            <!-- 장바구니 목록이 여기에 동적으로 로드됩니다 -->
        </div>
    </div>
</body>
</html>