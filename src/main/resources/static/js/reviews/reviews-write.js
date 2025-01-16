$(document).ready(function() {
    // URL에서 itemCode 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const buyCode = urlParams.get('buyCode');
    
    // 상품 정보 로드
    loadItemDetails(buyCode);
    
    // 이미지 업로드 관련 초기화
    initializeImageUpload();
    
    // 등록 버튼 클릭 이벤트
    $('#submit-btn').click(function() {
        submitReview();
    });
});

// 상품 정보 로드 함수
function loadItemDetails(buyCode) {
    $.ajax({
        url: './api/item/buyItemDetail',
        type: 'GET',
        data: { 
            buy_code: buyCode 
        },
        success: function(response) {
            // 카테고리와 가격 정보 표시
            $('#category').val(response.item_category);
            $('#price').val(response.item_price);
            
            // 상품 이미지 표시 (필요한 경우)
            if (response.item_img_url) {
                const imgHtml = `
                    <div class="product-image">
                        <img src="${response.item_img_url}" alt="상품 이미지">
                    </div>`;
                $('.detail-container1').prepend(imgHtml);
            }
        },
        error: function(xhr, status, error) {
            console.error("상품 정보 로드 실패:", error);
            alert('상품 정보를 불러오는데 실패했습니다.');
        }
    });
}

// 이미지 업로드 초기화
function initializeImageUpload() {
    const maxImageCount = 5; // 최대 이미지 개수
    $('#max-cnt').text(maxImageCount);
    
    // 이미지 업로드 박스 클릭 이벤트
    $('#detail-img-upload-box').click(function() {
        $('#detail-img-file').click();
    });
    
    // 파일 선택 시 이벤트
    $('#detail-img-file').change(function(e) {
        const files = e.target.files;
        handleImageUpload(files);
    });
}

// 리뷰 제출 함수
function submitReview() {
    const title = $('#name').val();
    const content = $('#content').val();
    const rating = $('#star').val();
    
    // 유효성 검사
    if (!title || !content || rating === '0') {
        alert('제목, 내용, 별점을 모두 입력해주세요.');
        return;
    }
    
    // 여기에 리뷰 제출 로직 구현
    // ...
}
