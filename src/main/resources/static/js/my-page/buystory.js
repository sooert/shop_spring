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

            if (purchases.length === 0) {
                purchaseContainer.append('<p class="no-purchases">구매 내역이 없습니다.</p>');
                return;
            }

            purchases.forEach(purchase => {
                const purchaseItem = createPurchaseItem(purchase);
                purchaseContainer.append(purchaseItem);
            });

            initializeEventHandlers();
        },
        error: function(xhr, status, error) {
            console.error("구매 내역 로드 실패:", error);
            alert('구매 내역을 불러오는데 실패했습니다.');
        }
    }); 
}

// 구매 아이템 생성 함수
function createPurchaseItem(purchase) {
    const formattedDate = formatDate(purchase.date);
    
    return $(`
        <div class="purchase-item" data-purchase-id="${purchase.buy_code}">
            <div class="purchase-header">
                <span class="order-date">주문일자: ${formattedDate}</span>
                <span class="order-id">주문번호: ${purchase.buy_code}</span>
            </div>
            <div class="purchase-content">
                <div class="purchase-image">
                    <img src="${purchase.item_img_url}" alt="${purchase.item_name}">
                </div>
                <div class="purchase-info">
                    <h3 class="item-name">${purchase.item_name}</h3>
                    <div class="item-details">
                        <span>색상: ${purchase.color}</span>
                        <span>사이즈: ${purchase.size}</span>
                        <span>수량: ${purchase.quantity}개</span>
                    </div>
                    <div class="price-info">
                        <span class="total-price">${purchase.total_price.toLocaleString()}원</span>
                    </div>
                </div>
                <div class="purchase-actions">
                    <button class="btn-cancel" data-item-code="${purchase.item_code}">주문 취소</button>
                    <button class="btn-review" data-item-code="${purchase.item_code}">구매 후기 작성</button>
                </div>
            </div>
        </div>
    `);
}

// 이벤트 핸들러 초기화
function initializeEventHandlers() {
    
    // 개별 취소 버튼 이벤트
    $('.btn-cancel').click(function() {
        const itemCode = $(this).data('item-code');
        if (confirm('이 주문을 취소하시겠습니까?')) {
            cancelOrders([itemCode]);
        }
    });

    // 개별 리뷰 작성 버튼 이벤트
    $('.btn-review').click(function() {
        const itemCode = $(this).data('item-code');
        window.location.href = `./reviews-write?itemCode=${itemCode}`;
    });
}
    

// 주문 취소 처리
function cancelOrders(itemCodes) {
    $.ajax({
        url: './api/item/orderCancel',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: { 'item_codes[]': itemCodes },
        traditional: true,
        success: function(response) {
            if (response.status === 'success') {
                alert('주문이 성공적으로 취소되었습니다.');
                loadPurchaseHistory(); // 구매 내역 새로고침
                
                // 메인 페이지의 구매 수량 표시 업데이트
                itemCodes.forEach(itemCode => {
                    if (window.updateBuyCount) {
                        updateBuyCount(itemCode);
                    }
                });
            } else {
                alert(response.message || '주문 취소에 실패했습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error("주문 취소 실패:", error);
            alert('주문 취소 처리 중 오류가 발생했습니다.');
        }
    });
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
























