// 전역 변수 추가
let item_code;
let buy_code;
$(document).ready(function(){
    // URL에서 item_code 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    item_code = urlParams.get('item_code'); // 전역 변수에 할당
    
    //구매하기 버튼
    $('.buy-button').on('click',function(){
        // 로그인 체크
        $.ajax({
            url: './api/user/loginCheck',
            type: 'GET',
            success: function(response) {
                if(response === "not-login") {
                    if(confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?')) {
                        window.location.href = './login';
                    }
                    return;
                }
                
                // 기존 구매 로직
                if (selectedOptions.size === 0) {
                    alert('상품 옵션을 선택해주세요.');
                    return;
                }

                let totalQuantity = 0;
                selectedOptions.forEach((optionData) => {
                    totalQuantity += optionData.quantity;
                });
                
                if(confirm(`선택하신 상품 ${totalQuantity}개를 구매하시겠습니까?`)) {
                    // UUID를 사용하여 고유한 buy_code 생성
                    buy_code = crypto.randomUUID();
                    
                    // 선택된 모든 옵션에 대해 구매 처리
                    selectedOptions.forEach((optionData, optionKey) => {
                        buyAdd(item_code, optionData.quantity, optionData.color, optionData.size, buy_code, 'ACTIVE');
                    });
                    alert("구매가 완료되었습니다.");
                    location.reload();
                } else {
                    alert("구매가 취소되었습니다.");
                }
            },
            error: function(xhr, status, error) {
                console.error("로그인 체크 실패:", error);
                alert("서버 오류가 발생했습니다.");
            }
        });
    });

    // 색상 선택 이벤트
    $('#color').change(function() {
        selectedColor = $(this).val();
        checkOptionsSelected();
    }); 

    // 사이즈 선택 이벤트
    $('#size').change(function() {
        selectedSize = $(this).val();
        checkOptionsSelected();
    });

    // 플러스 버튼 클릭 이벤트
    $('.plus-button').on('click', function () {
        const optionKey = $(this).closest('.selected-option').data('option-key');
        updateQuantity(optionKey, 1);
    });

    // 마이너스 버튼 클릭 이벤트
    $('.minus-button').on('click', function () {
        const optionKey = $(this).closest('.selected-option').data('option-key');
        updateQuantity(optionKey, -1);
    });

    // 선택 옵션 삭제
    $(document).on('click', '.remove-option', function() {
        $('.selected-option-info').hide();
        $('#color').val('색상 선택하기');
        $('#size').val('사이즈 선택하기');
        selectedColor = '';
        selectedSize = '';
    });

    // 색상 선택 이벤트
    $('#color, #size').change(function() {
        checkOptionsSelected();
    });

});

/////////////////////////////// 구매 ///////////////////////////////////

// 구매 생성
function buyAdd(item_code, quantity, color, size, buy_code, status) {
    $.ajax({
        url: './api/item/buyAdd',
        type: 'POST',
        data: { 
            item_code: item_code,
            quantity: quantity,
            color: color,
            size: size,
            buy_code: buy_code,
            status: status
        },
        success: function(response) {
            if(response === "not-login") {
                alert("로그인이 필요한 서비스입니다.");
                window.location.href = './login';
                return;
            }
            
            // 구매 생성 성공 후 buy_count 증가 호출
            buyCountUpdate(item_code, quantity);
            console.log("구매 생성 성공");
        },
        error: function(xhr, status, error) {
            console.error("구매 생성 실패:", error);
            alert("구매 처리 중 오류가 발생했습니다.");
        }
    }); 
}

// buy_count 증가 함수 수정
function buyCountUpdate(item_code, quantity) {
    $.ajax({
        url: './api/item/buyCountUpdate',
        type: 'POST',
        data: {
            item_code: item_code,
            quantity: quantity  // quantity 값을 서버로 전송
        },
        success: function(response) {
            if(response === "ok") {
                console.log("구매 수 업데이트 성공");
                // 성공 후 페이지 새로고침하여 buy_count 반영
                location.reload();
            } else {
                console.error("구매 수 업데이트 실패");
            }
        },
        error: function(xhr, status, error) {
            console.error("구매 수 업데이트 실패:", error);
        }
    });
}

/////////////////////////////// 카테고리 옵션 ///////////////////////////////////

// 카테고리별 옵션 설정
function updateProductOptions(category) {
    const colorSelect = $('#color');
    const sizeSelect = $('#size');
    
    // 기본 초기화
    colorSelect.empty();
    sizeSelect.empty();
    
    // 카테고리별 옵션 설정
    switch(category) {
        case '상의':
            // 상의 컬러 옵션
            ['색상 선택하기','WHITE', 'BLACK', 'GRAY', 'NAVY', 'BEIGE'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 상의 사이즈 옵션
            ['사이즈 선택하기','XS', 'S', 'M', 'L', 'XL', 'XXL'].forEach(size => {
                sizeSelect.append(`<option value="${size.toLowerCase()}">${size}</option>`);
            });
            break;
            
        case '하의':
            // 하의 컬러 옵션
            ['색상 선택하기','BLACK', 'BLUE', 'GRAY', 'BEIGE', 'KHAKI'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 하의 사이즈 옵션
            ['사이즈 선택하기','27','28', '30', '32', '34', '36'].forEach(size => {
                sizeSelect.append(`<option value="${size}">${size}</option>`);
            });
            break;
            
        case '신발':
            // 신발 컬러 옵션
            ['색상 선택하기','BLACK', 'WHITE', 'GRAY', 'BROWN'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 신발 사이즈 옵션
            ['사이즈 선택하기','230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280'].forEach(size => {
                sizeSelect.append(`<option value="${size}">${size}</option>`);
            });
            break;
            
        case '악세사리':
            // 악세사리 컬러 옵션
            ['색상 선택하기','GOLD', 'SILVER', 'ROSE GOLD', 'BLACK'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 악세사리 사이즈 옵션
            ['사이즈 선택하기','FREE'].forEach(size => {
                sizeSelect.append(`<option value="${size.toLowerCase()}">${size}</option>`);
            });
            break;
            
        case '원피스':
            // 원피스 컬러 옵션
            ['색상 선택하기','BLACK', 'WHITE', 'PINK', 'BLUE', 'RED'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 원피스 사이즈 옵션
            ['사이즈 선택하기','XS', 'S', 'M', 'L', 'XL'].forEach(size => {
                sizeSelect.append(`<option value="${size.toLowerCase()}">${size}</option>`);
            });
            break;
            
        case '아우터':
            // 아우터 컬러 옵션
            ['색상 선택하기','BLACK', 'BEIGE', 'GRAY', 'NAVY', 'BROWN'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            // 아우터 사이즈 옵션
            ['사이즈 선택하기','S', 'M', 'L', 'XL'].forEach(size => {
                sizeSelect.append(`<option value="${size.toLowerCase()}">${size}</option>`);
            });
            break;
            
        default:
            // 기타 카테고리의 경우 기본 옵션
            ['색상 선택하기','BLACK', 'WHITE', 'GRAY'].forEach(color => {
                colorSelect.append(`<option value="${color.toLowerCase()}">${color}</option>`);
            });
            ['사이즈 선택하기','FREE'].forEach(size => {
                sizeSelect.append(`<option value="${size.toLowerCase()}">${size}</option>`);
            });
    }
}

/////////////////////////////// 상품 선택 후 결과 값 표시 ///////////////////////////////////

// 전역 변수 정리 (파일 상단에 배치)
let selectedOptions = new Map(); // 선택된 옵션들을 저장할 Map
let itemPrice = 0; // 상품 가격을 저장할 변수

// 옵션 선택 확인 함수 수정
function checkOptionsSelected() {
    const selectedColor = $('#color').val();
    const selectedSize = $('#size').val();
    
    if (selectedColor && selectedColor !== '색상 선택하기' && 
        selectedSize && selectedSize !== '사이즈 선택하기') {
        
        const optionKey = `${selectedColor}-${selectedSize}`;
        
        // 이미 선택된 옵션인지 확인
        if (selectedOptions.has(optionKey)) {
            alert('이미 선택된 옵션입니다.');
            resetSelects();
            return;
        }
        
        // 새로운 옵션 추가
        const optionData = {
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
            price: itemPrice
        };
        
        selectedOptions.set(optionKey, optionData);
        addOptionToContainer(optionKey, optionData);
        updateTotalPrice();
        
        // 선택 초기화
        resetSelects();
        
        // 총 금액 컨테이너 표시
        $('.total-price-container').show();
    }
}

// select 박스 초기화
function resetSelects() {
    $('#color').val('색상 선택하기');
    $('#size').val('사이즈 선택하기');
    selectedColor = '';
    selectedSize = '';
}

// 옵션을 화면에 추가하는 함수
function addOptionToContainer(optionKey, optionData) {
    const optionHtml = `
        <div class="selected-option" data-option-key="${optionKey}">
            <div class="selected-option-header">
                <span class="selected-option-text">${optionData.color} / ${optionData.size}</span>
                <button class="remove-option" onclick="removeOption('${optionKey}')">×</button>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn minus" onclick="updateQuantity('${optionKey}', -1)">-</button>
                <input type="text" class="quantity-input" value="${optionData.quantity}" 
                       readonly
                       onkeydown="return false"
                       style="cursor: default;"
                       min="1" max="10">
                <button class="quantity-btn plus" onclick="updateQuantity('${optionKey}', 1)">+</button>
                <span class="option-price">${optionData.price.toLocaleString()}원</span>
            </div>
        </div>
    `;
    
    $('.selected-options-container').append(optionHtml);
}

// 옵션 삭제
function removeOption(optionKey) {
    $(`.selected-option[data-option-key="${optionKey}"]`).remove();
    selectedOptions.delete(optionKey);
    updateTotalPrice();
    
    if (selectedOptions.size === 0) {
        $('.total-price-container').hide();
    }
}

/////////////////////////////// 수량 업데이트 ///////////////////////////////////

// 수량 업데이트
function updateQuantity(optionKey, delta) {
    const optionData = selectedOptions.get(optionKey);
    const optionElement = $(`.selected-option[data-option-key="${optionKey}"]`);
    const quantityInput = optionElement.find('.quantity-input');

    // 현재 수량을 정수로 변환
    let currentQuantity = parseInt(quantityInput.val(), 10) || 1;

    // 새로운 수량 계산
    const newQuantity = Math.max(1, Math.min(10, currentQuantity + delta));

    if (newQuantity !== currentQuantity) {
        // 옵션 데이터 업데이트
        optionData.quantity = newQuantity;
        selectedOptions.set(optionKey, optionData);

        // UI 업데이트
        quantityInput.val(newQuantity);
        optionElement.find('.option-price').text(`${(optionData.price * newQuantity).toLocaleString()}원`);

        // 총 가격 업데이트
        updateTotalPrice();
    } else if (newQuantity === 10 && delta > 0) {
        alert('최대 10개까지만 구매 가능합니다.');
    }
}

// 수량 직접 입력 처리
function updateQuantityInput(optionKey, input) {
    let value = parseInt(input.value) || 1;

    if (value < 1) {
        value = 1;
    } else if (value > 10) {
        value = 10;
        alert('최대 10개까지만 구매 가능합니다.');
    }

    const optionData = selectedOptions.get(optionKey);
    optionData.quantity = value;
    selectedOptions.set(optionKey, optionData);

    input.value = value;
    const optionElement = $(`.selected-option[data-option-key="${optionKey}"]`);
    optionElement.find('.option-price').text(`${(optionData.price * value).toLocaleString()}원`);

    updateTotalPrice();
}

// 총 금액 업데이트
function updateTotalPrice() {
    let totalPrice = 0;

    selectedOptions.forEach((optionData) => {
        totalPrice += optionData.price * optionData.quantity; // 각 옵션의 가격과 수량을 곱하여 총 가격에 더함
    });

    // 할인 적용
    const discountRate = 0.4; // 예시: 40% 할인
    totalPrice *= (1 - discountRate); // 할인 적용

    $('.total-price').text(`${totalPrice.toLocaleString()}원`); // 총 금액 표시
}

// 가격 업데이트 함수
function updateOptionPrice() {
    const quantity = parseInt($('.quantity-input').val()) || 1;
    const basePrice = parseFloat($('.discounted-price').text().replace(/[^0-9]/g, '')) || 0;
    const totalPrice = basePrice * quantity;
    $('.option-price').text(`${totalPrice.toLocaleString()}원`);
}


