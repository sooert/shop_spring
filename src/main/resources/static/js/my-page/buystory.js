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
                        <span>색상: ${purchase.color.toUpperCase()}</span>
                        <span>사이즈: ${purchase.size.toUpperCase()}</span>
                        <span>수량: ${purchase.quantity}개</span>
                    </div>
                    <div class="price-info">
                        <span class="total-price">${purchase.total_price.toLocaleString()}원</span>
                    </div>
                </div>
                <div class="purchase-actions">
                    ${getActionButtons(purchase)}
                </div>
            </div>
        </div> 
    `);
}

// 상태에 따른 버튼 생성을 위한 새로운 함수 추가
function getActionButtons(purchase) {
    if (purchase.status === 'CONFIRMED') {
        return `<button class="btn-review" data-buy-code="${purchase.buy_code}">구매 후기 작성</button>
                <button class="btn-delete" data-buy-code="${purchase.buy_code}">내역 삭제</button>`;
    } else if (purchase.status === 'CANCELLED') {
        return `<button class="btn-delete" data-buy-code="${purchase.buy_code}">내역 삭제</button>`;
    } else {
        return `<button class="btn-cancel" data-item-code="${purchase.item_code}">주문 취소</button>
                <button class="btn-confirm" data-buy-code="${purchase.buy_code}">주문 확정</button>`;
    }
}

// 이벤트 핸들러 초기화
function initializeEventHandlers() {
    
    // 개별 취소 버튼 이벤트
    $('.btn-cancel').click(function() {
        const buyCode = $(this).closest('.purchase-item').data('purchase-id');
        if (confirm('이 주문을 취소하시겠습니까?')) {
            cancelOrder(buyCode);
        }
    });
    
    // 개별 리뷰 작성 버튼 이벤트
    $('.btn-review').click(function() {
        const buyCode = $(this).data('buy-code');
        window.location.href = `./reviews-write?buyCode=${buyCode}`;
    });

    // 주문 확정 버튼 이벤트
    $('.btn-confirm').click(function() {
        const purchaseItem = $(this).closest('.purchase-item');
        const buyCode = purchaseItem.data('purchase-id');
        
        if (confirm('주문을 확정하시겠습니까?\n확정 후에는 취소할 수 없습니다.')) {
            confirmOrder(buyCode, purchaseItem);
        }
    });

    // 주문 삭제 버튼 이벤트
    $('.btn-delete').click(function() {
        const buyCode = $(this).data('buy-code');
        if (confirm('이 주문 내역을 삭제하시겠습니까?\n삭제된 내역은 복구할 수 없습니다.')) {
            deletePurchase(buyCode);
        }
    });

}
    

// 주문 취소 처리
function cancelOrder(buyCode) {
    $.ajax({
        url: './api/item/orderCancel',
        type: 'POST',
        data: { buy_code: buyCode },
        success: function(response) {
            if (response.status === 'success') {
                alert('주문이 성공적으로 취소되었습니다.');
                loadPurchaseHistory();
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

// 주문 확정 처리 함수
function confirmOrder(buyCode) {
    $.ajax({
        url: './api/item/orderConfirm',
        type: 'POST',
        data: { buy_code: buyCode },
        success: function(response) {
            if (response === 'ok') {
                alert('주문이 확정되었습니다.');
                
                // 구매 내역 새로고침
                loadPurchaseHistory();
            } else {
                alert('주문 확정에 실패했습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error("주문 확정 실패:", error);
            alert('주문 확정 처리 중 오류가 발생했습니다.');
        }
    });
}

// 주문 삭제 처리 함수 추가
function deletePurchase(buyCode) {
    $.ajax({
        url: './api/item/orderDelete',
        type: 'POST',
        data: { buy_code: buyCode },
        success: function(response) {
            if (response.status === 'success') {
                alert('주문이 성공적으로 삭제되었습니다.');
                loadPurchaseHistory(); // 구매 내역 새로고침
            } else {
                alert(response.message || '주문 삭제에 실패했습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error("주문 삭제 실패:", error);
            alert('주문 삭제 처리 중 오류가 발생했습니다.');
        }
    });
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

























