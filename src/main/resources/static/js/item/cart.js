$(document).ready(function(){

    // 장바구니 버튼
    $('.cart-button').on('click', function(){
        const $cartButton = $(this); // 버튼 요소를 저장
        
        // 로그인 체크
        $.ajax({
            url: './api/user/loginCheck',
            type: 'GET',
            success: function(response) {
                if(response === "not-login") {
                    alert("로그인이 필요한 서비스입니다.");
                    window.location.href = './login';
                    return;
                }
                
                // 로그인 되어있다면 장바구니 추가 로직 실행
                // 선택된 옵션 가져오기
                const selectedColor = $cartButton.attr('selected-color').toLowerCase();
                const selectedSize = $cartButton.attr('selected-size').toUpperCase();
                
                const cart_count = 1;
                const item_code = $cartButton.attr('item-code');
                const item_name = $cartButton.attr('item-name');
                const item_img_url = $cartButton.attr('item-img-url');
                const item_color = selectedColor;
                const item_size = selectedSize;
                const total_price = parseInt($('.total-price').text().replace(/[^0-9]/g, ''));
                
                if (!item_code) {
                    alert("상품을 선택해주세요.");
                    return;
                }
                
                if (!selectedColor || !selectedSize) {
                    alert("색상과 사이즈를 선택해주세요.");
                    return;
                }

                cartCreate(item_code, cart_count, item_name, item_img_url, item_color, item_size, total_price);
            },
            error: function(xhr, status, error) {
                console.error("로그인 체크 실패:", error);
                alert("서버 오류가 발생했습니다.");
            }
        });
    });

    // 장바구니 조회
    cartList();

   

});

/////////////////////////////// 장바구니 ///////////////////////////////////

// 장바구니 생성
function cartCreate(item_code, cart_count, item_name, item_img_url, item_color, item_size, total_price) {
    $.ajax({
        url: './api/item/cartCreate',
        type: 'POST',
        data: {
            item_code: item_code,
            cart_count: cart_count,
            item_name: item_name,
            item_img_url: item_img_url,
            item_color: item_color,
            item_size: item_size,
            total_price: total_price
        },
        success: function(response) {
            if(response === "ok") {
                if(confirm("장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?")) {
                    window.location.href = './cart';
                }
            }
        },
        error: function(xhr, status, error) {
            console.error("장바구니 추가 실패:", error);
            alert("장바구니 추가 중 오류가 발생했습니다.");
        }
    });
}

/////////////////////////// 장바구니 조회 //////////////////////////////

// 장바구니 조회
function cartList() {
    $.ajax({
        url: './api/item/cartList',
        type: 'GET',
        success: function(response) {
            const cartList = $('.cart-list');
            cartList.empty();

            if(response.length === 0) {
                cartList.append(`
                    <div class="empty-cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p>장바구니가 비어있습니다.</p>
                        <button class="shop-button" onclick="window.location.href='./index'">
                            쇼핑하러 가기
                        </button>
                    </div>
                `);
                return;
            }

            let totalAmount = 0;

            response.forEach(cart => {
                totalAmount += cart.total_price * cart.cart_count;
                cartList.append(`
                    <div class="cart-item" onclick="window.location.href='./detail-item?item_code=${cart.item_code}'" style="cursor: pointer;">
                        <div class="cart-image">
                            <img src="${cart.item_img_url}" alt="${cart.item_name}">
                        </div>
                        <div class="cart-info">
                            <h3>${cart.item_name}</h3>
                            <div class="cart-details">
                                <p class="cart-option">
                                    <span class="label">색상:</span> ${cart.item_color.toUpperCase()} / 
                                    <span class="label">사이즈:</span> ${cart.item_size.toUpperCase()}
                                </p>
                                <p class="cart-price">
                                    <span class="label">가격:</span> 
                                    <span class="amount">${cart.total_price.toLocaleString()}원</span>
                                </p>
                            </div>
                            <div class="cart-quantity" onclick="event.stopPropagation();">
                                <button class="cart-update-minus" data-cart-idx="${cart.cart_idx}">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="quantity-value">${cart.cart_count}</span>
                                <button class="cart-update-plus" data-cart-idx="${cart.cart_idx}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="cart-actions" onclick="event.stopPropagation();">
                            <button class="cart-delete" data-cart-idx="${cart.cart_idx}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `);
            });

            // 장바구니 수량 증가 
            $('.cart-update-plus').on('click', function() {
                const cart_idx = $(this).data('cart-idx');
                cartUpdatePlus(cart_idx);
            });

            // 장바구니 수량 감소
            $('.cart-update-minus').on('click', function() {
                const cart_idx = $(this).data('cart-idx');
                cartUpdateMinus(cart_idx);
            });

            // 장바구니 삭제
            $('.cart-delete').on('click', function() {
                if(confirm("장바구니에서 삭제하시겠습니까?")) {
                    const cart_idx = $(this).data('cart-idx');
                    cartDelete(cart_idx);
                    cartList();
                    return;
                }
            });

            // 총 결제금액 표시
            cartList.append(`
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>총 상품금액</span>
                        <span>${totalAmount.toLocaleString()}원</span>
                    </div>
                    <div class="summary-row">
                        <span>배송비</span>
                        <span>${totalAmount >= 50000 ? '무료' : '3,300원'}</span>
                    </div>
                    <div class="summary-row total">
                        <span>결제예정금액</span>
                        <span>${(totalAmount + (totalAmount >= 50000 ? 0 : 3300)).toLocaleString()}원</span>
                    </div>
                    <button class="order-button">주문하기</button>
                </div>
            `);
                // 주문하기 버튼 수정
                $('.cart-summary').on('click', '.order-button', function() {
                    // 장바구니가 비어있는지 확인
                    const cartItems = $('.cart-item');
                    if (cartItems.length === 0) {
                        alert("장바구니가 비어있습니다.");
                        return;
                    }

                    if(confirm("선택하신 상품을 주문하시겠습니까?")) {
                        // UUID를 사용하여 고유한 buy_code 생성
                        const buy_code = crypto.randomUUID();
                        let orderSuccess = true;
                        
                        // 장바구니의 각 상품을 구매 처리
                        cartItems.each(function() {
                            const $item = $(this);
                            const item_code = $item.attr('onclick').split('item_code=')[1].split("'")[0];
                            const quantity = parseInt($item.find('.quantity-value').text());
                            const color = $item.find('.cart-option').text().match(/색상:\s*([^/]*)/)[1].trim();
                            const size = $item.find('.cart-option').text().match(/사이즈:\s*(.*)/)[1].trim();
                            const cart_idx = $item.find('.cart-delete').data('cart-idx');
                            
                            // buy.js의 buyAdd 함수 호출
                            $.ajax({
                                url: './api/item/buyAdd',
                                type: 'POST',
                                data: {
                                    item_code: item_code,
                                    quantity: quantity,
                                    color: color,
                                    size: size,
                                    status: 'ACTIVE',
                                    buy_code: buy_code
                                },
                                async: false, // 순차적 처리를 위해 동기 요청으로 변경
                                success: function(response) {
                                    if(response === "ok") {
                                        // 구매 성공 시 장바구니에서 제거
                                        cartDelete(cart_idx);
                                        
                                        // 구매 수량 업데이트
                                        buyCountUpdate(item_code, quantity);
                                    } else {
                                        orderSuccess = false;
                                    }
                                },
                                error: function(xhr, status, error) {
                                    console.error("주문 처리 실패:", error);
                                    orderSuccess = false;
                                }
                            });
                        });
                        
                        if(orderSuccess) {
                            alert("주문이 완료되었습니다.");
                            window.location.href = './my-page'; // 주문 완료 후 마이페이지로 이동
                        } else {
                            alert("주문 처리 중 오류가 발생했습니다.");
                        }
                    }
                });
                
        },
        error: function(xhr, status, error) {
            console.error("장바구니 조회 실패:", error);
            alert("장바구니 조회 중 오류가 발생했습니다.");
        }
    });
}

// 장바구니 수량 증가
function cartUpdatePlus(cart_idx) {
    $.ajax({
        url: './api/item/cartUpdatePlus',
        type: 'POST',
        data: {
            cart_idx: cart_idx
        },
        success: function(response) {
            if(response === "ok") {
                cartList();
            }
        },
        error: function(xhr, status, error) {
            console.error("장바구니 수량 증가 실패:", error);
            alert("장바구니 수량 증가 중 오류가 발생했습니다.");
        }
    });
}

// 장바구니 수량 감소
function cartUpdateMinus(cart_idx) {
    $.ajax({
        url: './api/item/cartUpdateMinus',
        type: 'POST',
        data: {
            cart_idx: cart_idx
        },
        success: function(response) {
            if(response === "ok") {
                cartList();
            }
        },
        error: function(xhr, status, error) {
            console.error("장바구니 수량 감소 실패:", error);
            alert("장바구니 수량 감소 중 오류가 발생했습니다.");
        }
    });
}

// 장바구니 삭제
function cartDelete(cart_idx) {
    $.ajax({
        url: './api/item/cartDelete',
        type: 'POST',
        data: { cart_idx: cart_idx },
        success: function(response) {
            if(response === "ok") {
                cartList();
            }
        },
        error: function(xhr, status, error) {
            console.error("장바구니 삭제 실패:", error);
            alert("장바구니 삭제 중 오류가 발생했습니다.");
        }   
    });
}

// buyCountUpdate 함수 추가 
function buyCountUpdate(item_code, quantity) {
    $.ajax({
        url: './api/item/buyCountUpdate',
        type: 'POST',
        data: {
            item_code: item_code,
            quantity: quantity
        },
        async: false,
        success: function(response) {
            if(response !== "ok") {
                console.error("구매 수량 업데이트 실패");
            }
        },
        error: function(xhr, status, error) {
            console.error("구매 수량 업데이트 실패:", error);
        }
    });
}












