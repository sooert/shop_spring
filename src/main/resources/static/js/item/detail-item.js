let selectedColor = '';
let selectedSize = '';
let discountedPrice = 0;

$(document).ready(function() {

    // URL에서 item_code 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const item_code = urlParams.get('item_code');
    
    // 좋아요 상태 확인
    checkLikeStatus(item_code);
    
    detailItem(item_code);

    // 스크롤 버튼 기능 추가
    handleScrollButtons();

    //좋아요 버튼
    $('.love-button').on('click',function(){
        const isLiked = $(this).hasClass('liked');
        
        if (isLiked) {
            likeMinus(item_code);
        } else {
            likePlus(item_code);
        }
    });
    
    // 색상 선택 이벤트
    $('#color').on('change', function() {
        selectedColor = $(this).val();
        updateSelectedOptions();
    });

    // 사이즈 선택 이벤트
    $('#size').on('change', function() {
        selectedSize = $(this).val();
        updateSelectedOptions();
    });
});

/////////////////////////////// 좋아요 ///////////////////////////////////

// 좋아요 생성
function likeCreate(item_code, user_nick) {
    
    const itemLike = {
        item_code: item_code,
        user_nick: user_nick
    };
    
    $.ajax({
        url: './api/item/likeCreate',
        type: 'POST',
        data: itemLike,
        success: function(response) {
            if(response === "not-login") {
                alert("로그인이 필요한 서비스입니다.");
                window.location.href = './login';
                return;
            }
        },
        error: function(xhr, status, error) {
            console.error("좋아요 생성 실패:", error);
        }
    });
}

// 좋아요 버튼 클릭시 좋아요 증가 
function likePlus(item_code) {
    $.ajax({
        url: './api/item/likePlus',
        type: 'POST',
        data: {
            item_code: item_code
        },
        success: function(response) {
            if(response === "not-login") {
                alert("로그인이 필요한 서비스입니다.");
                window.location.href = './login';
                return;
            }
            // 좋아요 생성 API 호출
            likeCreate(item_code);
            $('.love-button').addClass('liked');
            const currentCount = parseInt($('#like-count').text());
            $('#like-count').text(currentCount + 1);
        },
        error: function(xhr, status, error) {
            console.error("좋아요 증가 실패:", error);
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    });
}

// 좋아요 버튼 클릭시 좋아요 감소
function likeMinus(item_code) {
    $.ajax({
        url: './api/item/likeMinus',
        type: 'POST',
        data: {
            item_code: item_code
        },
        success: function(response) {
            if(response === "not-login") {
                alert("로그인이 필요한 서비스입니다.");
                window.location.href = './login';
                return;
            }
            
            // 좋아요 상태와 카운트 업데이트
            $('.love-button').removeClass('liked');
            const currentCount = parseInt($('#like-count').text());
            $('#like-count').text(Math.max(0, currentCount - 1)); // 음수가 되지 않도록 처리
        },
        error: function(xhr, status, error) {
            console.error("좋아요 감소 실패:", error);
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    });
}

// 좋아요 상태 확인 함수 추가
function checkLikeStatus(item_code) {
    $.ajax({
        url: './api/item/checkLikeStatus',
        type: 'GET',
        data: {
            item_code: item_code
        },
        success: function(isLiked) {
            if(isLiked) {
                $('.love-button').addClass('liked');
            } else {
                $('.love-button').removeClass('liked');
            }
        },
        error: function(xhr, status, error) {
            console.error("좋아요 상태 확인 실패:", error);
        }
    });
}

/////////////////////////////// 상품 상세 ///////////////////////////////////

// 상품 상세 불러오기
function detailItem(item_code) {
    $.ajax({
        url: './api/item/detail-item',
        type: 'GET',
        data: {
            item_code: item_code
        },
        success: function(item) {
            // 할인가격 계산
            discountedPrice = item.price * (1 - item.discount);

            // 상품 이미지 로드
            $('.main-image').attr('src', item.item_img_url);

            // 상품 이름 업데이트
            $('.product-title').text(item.name);
            $('.item-title').text(item.name);

            // 상품 소개 업데이트
            $('.item-content').text(item.content);

            // 할인 안내 업데이트
            if(item.discount > 0 && item.price > 0) {
                $('.product-discount').text(`${(item.discount * 100).toFixed(0)}% 할인`);
                $('.original-price').text(`${item.price.toLocaleString()}원`);
                $('.product-discount', '.original-price').parent().show();
            } else {
                $('.product-discount', '.original-price').parent().hide();
            }

            // 할인 가격 업데이트
            if(discountedPrice > 0) {
                $('.discounted-price').text(`${discountedPrice.toLocaleString()}원`);
                $('.discounted-price').parent().show();
            } else {
                $('.discounted-price').parent().hide();
            }

            // 혜택 가격 업데이트
            $('.user-benefit strong').text(`${discountedPrice.toLocaleString()}원`);

            // 적립금 업데이트
            $('.point-benefit').text(`${item.point.toLocaleString()}원 적립`);

            // 계절 할인 표시
            if (item.season_discount > 0) {
                $('.season-discount').text(`${item.season_discount}% 상품 할인`);
                $('.season-discount').parent().show();
            } else {
                $('.season-discount').parent().hide();
            }

            // 특가 할인 표시
            if (item.special_sale > 0) {
                $('.special-sale').text(`${item.special_sale}% 상품 할인`);
                $('.special-sale').parent().show();
            } else {
                $('.special-sale').parent().hide();
            }
            // 상세 이미지 로드
            loadDetailImages(item.item_idx);
            
            // 좋아요 수 표시 추가
            $('#like-count').text(item.like_count);
            
            // 카테고리에 따른 옵션 설정
            updateProductOptions(item.category);
            
            // 전역 변수에 상품 가격 저장
            itemPrice = item.price * (1 - item.discount);
            
            // 옵션 초기화
            selectedColor = '';
            selectedSize = '';
            $('.selected-option-info').hide();

            // 장바구니 버튼에 필요한 모든 데이터 설정
            $('.cart-button')
                .attr('item-code', item.item_code)
                .attr('item-name', item.name)
                .attr('item-img-url', item.item_img_url)
                .attr('total-price', discountedPrice);

        },
        error: function(xhr, status, error) {
            console.error("상품 상세 불러오기 실패:", error);
        }
    });
}

// 상세 이미지 불러오기
function loadDetailImages(item_idx) {
    $.ajax({
        url: './api/item/imgs',
        type: 'GET',
        data: {
            item_idx: item_idx
        },
        success: function(images) {
            $('.thumbnail-container').empty();
            images.forEach(function(image) {
                $('.thumbnail-container').append(`
                    <img src="${image.item_img_url}" alt="상세 이미지" class="thumbnail" 
                        onclick="changeMainImage('${image.item_img_url}')">
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error("상세 이미지 불러오기 실패:", error);
        }
    });
}

/////////////////////////////// 이미지 팝업 ///////////////////////////////////

// 메인 이미지 변경 함수
function changeMainImage(imageUrl) {
    $('.main-image').attr('src', imageUrl);
}

/////////////////////////////// 스크롤 버튼 ///////////////////////////////////

// 스크롤 버튼 기능 통합
function handleScrollButtons() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const goBackButton = document.getElementById('goBack');

    // 버튼이 존재하는지 확인
    if (!scrollToTopButton || !goBackButton) return;

    window.onscroll = function() {
        const scrollTop = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
        
        // 스크롤 탑 버튼 표시
        scrollToTopButton.style.display = scrollTop ? "block" : "none";
        
        // 뒤로가기 버튼 표시
        goBackButton.style.display = scrollTop ? "none" : "block";
    };

    scrollToTopButton.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

/////////////////////////////// 이미지 팝업 ///////////////////////////////////

// 이미지 팝업 기능
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.image-popup');
    const popupImg = document.querySelector('.popup-image');
    const closeBtn = document.querySelector('.close-popup');
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    const mainImage = document.querySelector('.main-image');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const goBackButton = document.getElementById('goBack');
    
    let currentImageIndex = 0;
    let images = []; // 모든 상품 이미지 URL을 저장할 배열

    // 이미지 클릭 이벤트
    mainImage.addEventListener('click', function() { 
        currentImageIndex = 0;
        goBackButton.style.display = 'none';
        showPopup(mainImage.src);
    });

    // 썸네일 이미지 클릭 이벤트
    thumbnailContainer.addEventListener('click', function(e) {
        // 아래 코드를 주석 처리하여 팝업이 뜨지 않도록 함
        /*
        if (e.target.classList.contains('thumbnail')) {
            currentImageIndex = Array.from(thumbnailContainer.children).indexOf(e.target);
            showPopup(e.target.src);
        }
        */
    });

    // 팝업 닫기
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        goBackButton.style.display = 'block';
    });

    // 이전 이미지
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        popupImg.src = images[currentImageIndex];
    });

    // 다음 이미지
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        popupImg.src = images[currentImageIndex];
    });

    // ESC 키로 팝업 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popup.style.display = 'none';
        }
    });

    function showPopup(imageSrc) {
        popup.style.display = 'flex';
        popupImg.src = imageSrc;
        
        // 모든 이미지 URL 수집
        images = [mainImage.src];
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            images.push(thumb.src);
        });
    }
});

// 선택된 옵션 업데이트 함수
function updateSelectedOptions() {
    if (selectedColor && selectedSize) {
        $('.total-price-container').show();
        $('.total-price').text(discountedPrice.toLocaleString() + '원');
        
        // 장바구니 버튼에 선택된 옵션 데이터 업데이트
        $('.cart-button')
            .attr('selected-color', selectedColor)
            .attr('selected-size', selectedSize);
    }
}






