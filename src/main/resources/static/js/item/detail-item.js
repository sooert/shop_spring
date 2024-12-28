$(document).ready(function() {
    // URL에서 item_code 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const item_code = urlParams.get('item_code');
    detailItem(item_code);
    
    // 스크롤 탑 버튼 기능 추가
    scrolltop();

    //구매하기 버튼
    $('.buy-button').on('click',function(){
        alert('구매하기');
    });

    //선물하기 버튼
    $('.love-button').on('click',function(){
        alert('좋아요');
    });

    //장바구니 버튼
    $('.cart-button').on('click',function(){
        alert('장바구니에 담았습니다.');
    });
});

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
            const discountPrice = item.price * (1 - item.discount);
            
            // 상품 정보 업데이트
            $('.main-image').attr('src', item.item_img_url);
            $('.product-title').text(item.name);
            $('.item-title').text(item.name);
            $('.item-content').text(item.content);
            $('.product-discount').text(`${item.discount * 100}% 할인`);
            $('.original-price').text(`${item.price.toLocaleString()}원`);
            $('.discounted-price').text(`${discountPrice.toLocaleString()}원`);
            $('.user-benefit strong').text(`${discountPrice.toLocaleString()}원`);
            
            // 상세 이미지 로드
            loadDetailImages(item.item_idx);
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

// 메인 이미지 변경 함수
function changeMainImage(imageUrl) {
    $('.main-image').attr('src', imageUrl);
}

// 스크롤 탑 버튼 기능
function scrolltop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    };

    scrollToTopButton.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}


