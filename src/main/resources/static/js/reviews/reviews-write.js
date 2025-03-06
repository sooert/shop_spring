// 최상단에 전역 변수 추가
const maxImgCnt = 5;

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const buyCode = urlParams.get('buyCode');
    
    // 상품 정보 로드
    loadItemDetails(buyCode);
    
    // 이미지 업로드 관련 초기화
    initializeImageUpload();
    
    // 등록 버튼 클릭 이벤트
    $('#submit-btn').click(submitReview);

    // 만족도, 색상, 사이즈 버튼 클릭 이벤트 통합
    ['satisfaction', 'colors', 'sizes'].forEach(type => {
        $(`.form-box-${type} button`).click(function() {
            const buttons = $(`.form-box-${type} button`);
            buttons.css('background-color', '').prop('disabled', false);
            $(this).css('background-color', '#c9ccf5').prop('disabled', true);
            $(`#${type}`).val($(this).text());
        });
    });

    // Firebase 초기화
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const storage = firebase.storage();
    const firebaseItemUtil = {
        getBase64: firebaseService.getBase64,
        uploadItemImage: firebaseService.uploadReviewImage,
        storage: storage
    };

    // 이미지 삭제 이벤트
    $(document).on('click', '.del-btn', function() {
        if(confirm('사진을 삭제하시겠습니까?')) {
            $(this).closest('.img-box').remove();
            updateImageCount();
        }
    });

    // 이미지 업로드 버튼 클릭
    $('#review-img-upload-box').click(function() {
        if($('.img-box').length >= maxImgCnt) {
            alert(`이미지는 최대 ${maxImgCnt}개 까지 등록할 수 있습니다.`);
            return;
        }
        $('#review-img-file').trigger('click');
    });

    // 이미지 파일 변경 이벤트
    $('#review-img-file').change(async function() {
        const file = this.files[0];
        if (!file) return;

        // 이미지 사이즈 확인
        // const img = new Image();
        // img.src = URL.createObjectURL(file);
        // img.onload = async function() {
        //     if (this.width !== 500 || this.height !== 500) {
        //         alert('이미지 사이즈는 500x500 픽셀이어야 합니다.');
        //         return;
        //     }

        try {
            const base64 = await firebaseItemUtil.getBase64(file);
            const downloadUrl = await firebaseService.uploadReviewImage(storage, base64);
            
            $('#review-img-list').append(`
                <div class="img-box">
                    <img src="${downloadUrl}"/>
                    <div class="del-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            `);
            
            // 첫 번째 이미지가 대표 이미지로 설정
            if ($('.img-box').length === 1) {
                $('#review_img_url').val(downloadUrl); // 대표 이미지 URL 저장
            }
            
            updateImageCount();
        } catch (error) {
            console.error('이미지 업로드 오류:', error);
            alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
        
        $(this).val('');
    });
});

// 상품 정보 로드 함수
function loadItemDetails(buyCode) {

    $.ajax({
        url: './api/item/buyItemDetail',
        type: 'GET',
        data: { buy_code: buyCode },
        success: function(response) {
            // 상품 이름과 가격 설정
            $('#item_name').val(response.item_name);
            $('#item_price').val(response.item_price);
            
            // 상품 이미지가 있을 경우 표시
            if (response.item_img_url) {
                $('.detail-container1').prepend(`
                    <div class="product-image">
                        <img src="${response.item_img_url}" alt="상품 이미지">
                    </div>`);
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
    $('#max-cnt').text(maxImgCnt);
}

// 이미지 개수 업데이트
function updateImageCount() {
    $('#detail-img-count').text($('.img-box').length);
}

// 리뷰 제출 함수
async function submitReview() {
    // buyCode 변수를 전역에서 가져오도록 수정
    const urlParams = new URLSearchParams(window.location.search);
    const buyCode = urlParams.get('buyCode'); // buyCode를 여기서 가져옴

    let review_img_url; // 대표 이미지 URL
    let review_img_urls = []; // 상세 이미지 URL 배열

    const reviewData = {
        satisfaction: $('#satisfaction').val(),
        colors: $('#colors').val(),
        sizes: $('#sizes').val(),
        content: $('#content').val(),
        review_img_url: review_img_url,
        review_img_urls: review_img_urls,
        buy_code: buyCode
    };

    // 유효성 검사
    if (!reviewData.satisfaction || !reviewData.colors || !reviewData.sizes) {
        alert('모든 항목을 선택해주세요.');
        return;
    }

    if (!reviewData.content) {
        alert('내용을 입력해주세요.');
        return;
    }

    try {
        // 이미지 URL 수집
        const imgBoxes = $('.img-box img');
        if (imgBoxes.length === 0) {
            alert('리뷰 이미지를 등록해주세요.');
            return;
        }
        
        reviewData.review_img_url = imgBoxes.first().attr('src');
        reviewData.review_img_urls = Array.from(imgBoxes).map(img => $(img).attr('src'));

        // 리뷰 제출
        $.ajax({
            url: './api/review/reviewAdd',
            type: 'POST',
            data: reviewData,
            success: function(response) {
                alert('리뷰가 등록되었습니다.');
                window.location.href = './reviews';
            },
            error: function(xhr, status, error) {
                console.error("리뷰 등록 실패:", error);
                alert('리뷰 등록에 실패했습니다.');
            }
        });
    } catch (error) {
        console.error('이미지 업로드 오류:', error);
        alert('이미지 업로드에 실패했습니다.');
    }
}

