$(document).ready(function() {

    reviewList();
    

});


// 작성한 리뷰 조회
function reviewList(user_nick) {
    $.ajax({
        url: './api/review/reviewList',
        type: 'GET',
        data: { 
            user_nick: user_nick 
        },
        success: function(data) {
            // 리뷰 목록을 필터링하여 표시
            displayReviews(data);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

// 리뷰를 화면에 표시하는 함수 추가
function displayReviews(reviews) {
    // 리뷰를 표시할 HTML 요소 선택
    const reviewContainer = $('#review-list');
    reviewContainer.empty(); // 기존 리뷰 초기화

    // 각 리뷰를 HTML로 추가
    reviews.forEach(review => {
        reviewContainer.append(`<div class="review">${review.content}</div>`);
    });
}
