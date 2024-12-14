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
    .detail-item-img{
		width: 100px;
		height: 100px;
		object-fit: cover;
		border:1px solid #f2f2f2;
		border-radius: 5px;
	}
</style>
<body>
    <%@ include file="../include/header.jsp" %>

    <button id="scrollToTop"><i class="fa-solid fa-chevron-up"></i></button>
        
    <div class="detail-container1">
		<div class="inner" style="display: flex;">

			<div class="detail-item-img-container" style="width: 50%;">
				<section>
					<img id="main-item-img" style="border:1px solid #f2f2f2;width: 100%;height: 400px;object-fit: cover;" 
						src="${item.item_img_url}" alt="상품이미지"/>
				</section>

				<section style="display: flex;gap: 10px;margin-top: 10px;">	
					<c:forEach items="${itemImgs}" var="itemImg">
						<img class="detail-item-img" src="${itemImg.item_img_url}" alt="상품이미지"/>
					</c:forEach>
				</section>
			</div>

			<div class="detail-item-info-container" style="width: 50%;">
				456
			</div>
		</div>
	</div>

    <footer class="footer">
        <div class="container">
            <p style="text-align: center;">&copy; 웹 쇼핑몰 포토폴리오</p>
        </div>
    </footer>
</body>
</html>