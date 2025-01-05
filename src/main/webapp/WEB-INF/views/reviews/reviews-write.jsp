<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 
<!DOCTYPE html> 
<html>
<head> 
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상품 등록</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/reviews/reviews-write.js"></script>
	<script src="./js/reviews/star-rating.js"></script>
	<script src="./js/reviews/util.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/reviews-write.css">
</head>
<body>
    <div class="detail-container1">
        <div class="page-title">
            <h1>리뷰 작성</h1>
        </div>
        
        <div class="form-box">
            <div class="title">제목<span class="required">*</span></div>
            <div class="content">제목 입력</div>
            <input id="name" name="name" placeholder="제목을 입력해주세요" class="input-field"/>
        </div>

        <div class="form-box">
            <div class="title">내용<span class="required">*</span></div>
            <div class="content">내용 입력</div>
            <textarea id="content" placeholder="내용을 입력해주세요." class="textarea-field"></textarea>
        </div>

        <div class="form-box">
            <div class="title">별점<span class="required">*</span></div>
            <div class="content">별점 선택</div>
            <div class="star-rating">
                <i class="fa-star far" data-rating="1"></i>
                <i class="fa-star far" data-rating="2"></i>
                <i class="fa-star far" data-rating="3"></i>
                <i class="fa-star far" data-rating="4"></i>
                <i class="fa-star far" data-rating="5"></i>
                <input type="hidden" id="star" value="0">
            </div>
        </div>

        <div class="form-box">
            <div class="title">카테고리<font></font></div>
            <input type="text" id="category" placeholder="${item.category}"/>
        </div>

        <div class="form-box">
            <div class="title">가격<font></font></div>
            <input type="number"id="price" placeholder="${item.price}"/>
        </div>
        
        <div class="form-box">
            <div class="title">상세 리뷰 이미지<font style="color:red;">*</font></div>
            <div class="content bg">
				1. 첫번째 이미지가 대표 리뷰 이미지로 등록됩니다.<br/>
                2. 이미지 사이즈 500*500 권장<br/>
                3. 리뷰 이미지가 포함된 이미지.<br/>
                4. 불법, 광고성 이미지 금지.<br/>
            </div>
            
            
            <input id="detail-img-file" type="file" style="display: none;"/>
            <div id="detail-img-list" class="images-group">
                <div id="detail-img-upload-box" class="img-upload-box small">
                    <i class="fa-solid fa-plus" style="margin-top:10px;"></i>
                    <div style="font-size:13px;color:#585858;">
                        <font id="detail-img-count" style="color:var(--color-main);font-weight:700">0</font>/<font id="max-cnt"></font>
                    </div>
                </div>

                <!-- <div class="img-box" style="">
                    <img src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/7fec9212-16d5-43eb-bb62-ec54ac9e41ac.jpeg"/>
                    <div class="del-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div> -->
                
            </div>
        </div>
        
        <button id="submit-btn" class="long-btn" style="height:40px; cursor: pointer;margin-top:30px;display: flex;align-items: center;justify-content: center;">
            <span id="loader" class="loader" style="display: none;"></span>
            <span style="margin-left:10px;">등록완료</span>
        </button>
    </div>
</body>
</html>