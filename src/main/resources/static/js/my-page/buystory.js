$(document).ready(function() {
    // 구매 내역 로드
    loadPurchaseHistory();


});

// 구매 내역 로드
function loadPurchaseHistory() {
    $.ajax({
        url: './api/item/buyListDetail',
        type: 'GET',
        success: function(purchases) {
            const purchaseContainer = $('.purchase-history');
            purchaseContainer.empty();
            
            purchases.forEach(purchase => {
                // 날짜 포맷팅
                const purchaseDate = new Date(purchase.date);
                const formattedDate = `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, '0')}-${String(purchaseDate.getDate()).padStart(2, '0')} ${String(purchaseDate.getHours()).padStart(2, '0')}:${String(purchaseDate.getMinutes()).padStart(2, '0')}`;

                purchaseContainer.append(`
                    <div class="purchase-item">
                        <div class="purchase-image">
                            <img src="${purchase.item_img_url} " alt="${purchase.item_name}" 
                                style="width: 100px; height: 100px; margin-right: 35px; margin-bottom: 40px;">
                        </div>
                        <div class="purchase-info">
                            <h3>${purchase.item_name}</h3>
                            <p>구매 일: ${formattedDate}</p>
                            <p>색상: ${purchase.color}</p>
                            <p>사이즈: ${purchase.size}</p>
                            <p>수량: ${purchase.quantity}개</p>
                            <p>구매가격: ${purchase.total_price.toLocaleString()}원</p>
                        </div>
                    </div>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error("구매 내역 로드 실패:", error);
        }
    });
} 