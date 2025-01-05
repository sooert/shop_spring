$(document).ready(function() {
    const stars = $('.star-rating i');
    const starInput = $('#star');
    
    // 별점 클릭 이벤트
    stars.click(function() {
        const rating = $(this).data('rating');
        starInput.val(rating);
        
        // 별 아이콘 업데이트
        stars.each(function(index) {
            if (index < rating) {
                $(this).removeClass('far').addClass('fas');
            } else {
                $(this).removeClass('fas').addClass('far');
            }
        });
    });
    
    // 마우스 호버 효과
    stars.hover(
        function() {
            const rating = $(this).data('rating');
            stars.each(function(index) {
                if (index < rating) {
                    $(this).removeClass('far').addClass('fas');
                }
            });
        },
        function() {
            const currentRating = starInput.val();
            stars.each(function(index) {
                if (index < currentRating) {
                    $(this).removeClass('far').addClass('fas');
                } else {
                    $(this).removeClass('fas').addClass('far');
                }
            });
        }
    );
}); 