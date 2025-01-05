$(document).ready(function() {
    // 찜 목록 로드
    loadLikes();
});

// 찜 목록 로드 함수
function loadLikes() {
    $.ajax({
        url: './api/item/findLikes',
        type: 'GET',
        dataType: 'json',
        success: function(items) {
            if (!items) {
                alert('로그인이 필요합니다.');
                return;
            }
            
            const loveContainer = $('.loves-list');
            loveContainer.empty();
            
            if (items.length === 0) {
                loveContainer.append('<p>찜한 상품이 없습니다.</p>');
                return;
            }
            
            items.forEach(item => {
                // 날짜 포맷팅
                const likeDate = new Date(item.like_date);
                const formattedDate = `${likeDate.getFullYear()}-${String(likeDate.getMonth() + 1).padStart(2, '0')}-${String(likeDate.getDate()).padStart(2, '0')} ${String(likeDate.getHours()).padStart(2, '0')}:${String(likeDate.getMinutes()).padStart(2, '0')}`;
                
                loveContainer.append(`
                    <div class="love-item" data-item-code="${item.item_code}">
                        <img src="${item.item_img_url}" alt="${item.name}" onerror="this.src='./img/default.jpg'">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>${Number(item.price).toLocaleString()}원</p>
                            <p>찜한 날짜: ${formattedDate}</p>
                        </div>
                        <button class="cancel-like" onclick="cancelLike('${item.item_code}')">
                            취소
                        </button>
                    </div>
                `);
            });
        },
        error: function(error) {
            console.error('찜 목록 로드 실패:', error);
            alert('찜 목록을 불러오는데 실패했습니다.');
        }
    });
}

// 찜 삭제 함수
function cancelLike(item_code) {
    $.ajax({
        url: './api/item/likeDelete',
        type: 'POST',
        data: { item_code: item_code },
        success: function() {
            loadLikes();
        },
        error: function(xhr, status, error) {
            console.error("찜 삭제 실패:", error);
            alert("찜 삭제 중 오류가 발생했습니다.");
        }
    });
}