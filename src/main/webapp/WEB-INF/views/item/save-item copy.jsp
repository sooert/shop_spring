<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 
<!DOCTYPE html> 
<html>
<head> 
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상품 등록</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../js/save-item.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../css/save-item.css">
</head>
<body>
    <header>
        <h1>상품 등록</h1>
    </header>

    <!-- 상품 등록 페이지 -->
	<div class="center-container" style="flex-direction: column;">
    <!-- 상품 등록 폼 -->
		<div class="form-container">
			<form id="saveItemForm">

				<!-- 이미지 업로드 최대 8개까지-->
                <div id="img-upload-hint" style="margin-bottom: 10px;">
                    <span>이미지선택</span>
                    <span style="font-size: 12px; color:#999; ">( 최대 5장 등록가능! 첫번째 이미지가 메인사진입니다. )</span>
                </div>
                <div class="input-with-btn">
                    <input id="img-file" name="img_url" type="file" multiple required/>
                </div>
                <div id="img_url-result-txt" class="validation-message" style="margin-bottom: 15px;"></div> 
 
				<!-- 상품 이름 입력 -->
				<div class="input-with-btn">
					<input id="name" name="name" type="text" placeholder="상품 이름" required autocomplete="item_name"/>
				</div>

				<!-- 상품 가격 입력 -->
				<div class="input-with-btn">
					<input id="price" name="price" type="number" placeholder="상품 가격" 
						required autocomplete="item_price"/>
				</div>
				
				<!-- 상품 설명 입력 -->
				<div class="content-with-btn">
					<textarea id="content" name="content" placeholder="상품 설명" 
						required autocomplete="item_content" maxlength="1000" style="width: 100%; height: 230px;"></textarea>
				</div>

				<!-- 제조사 -->
				<div class="input-with-btn">
					<input id="maker" name="maker" type="text" placeholder="제조사" required readonly/>
				</div>
				
				<!-- 상품 등록 버튼 -->
				<button type="submit" id="save-btn">등록</button>
			</form>
		</div>
	</div>
</body>
</html>