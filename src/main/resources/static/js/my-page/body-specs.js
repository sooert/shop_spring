// 전역 범위에서 슬라이더 관련 유틸리티 함수들을 정의
function updateSliderValuePosition(slider, valueDisplay) {
    const percent = (slider.value - slider.min) / (slider.max - slider.min);
    const sliderRect = slider.getBoundingClientRect();
    const valueRect = valueDisplay.getBoundingClientRect();
    
    const thumbWidth = 18;
    const availableWidth = sliderRect.width - thumbWidth;
    
    // 값 표시 위치 계산
    let leftPosition = (percent * availableWidth) + (thumbWidth / 2);
    
    // 화면 경계 처리
    const minPosition = valueRect.width / 2;
    const maxPosition = sliderRect.width - (valueRect.width / 2);
    leftPosition = Math.max(minPosition, Math.min(maxPosition, leftPosition));
    
    valueDisplay.style.left = `${leftPosition}px`;
}

function updateSliderValue(slider, valueDisplay, formatFn) {
    const value = parseInt(slider.value);
    valueDisplay.textContent = formatFn(value);
}

/////////////////// 바디 치수 추가 /////////////////////
$(document).ready(function() {

    // 초기 조회
    bodySpecsSelect();
    

    // 저장 버튼
    $('#save-button').click(function() {
        bodySpecsCreate();
    });

});

/////////////////// 바디 치수 생성 /////////////////////
function bodySpecsCreate() {
    const height = $('#height').val();
    const pants_size = $('#pants_size').val();
    const top_size = $('#top_size').val();
    const shoes_size = $('#shoe_size').val();

    $.ajax({
        url: './api/user/bodySpecsCreate',
        type: 'POST',
        data: {
            height: height,
            pants_size: pants_size,
            top_size: top_size,
            shoes_size: shoes_size
        },
        success: function(response) {
            alert('저장 되었습니다.');
            location.reload();
        },
        error: function(error) {
            console.error("저장을 다시 시도해주세요.", error);
        }
    });
}

/////////////////// 바디 치수 수정 /////////////////////
function bodySpecsUpdate() {
    const height = $('#height').val();
    const pants_size = $('#pants_size').val();
    const top_size = $('#top_size').val();
    const shoes_size = $('#shoe_size').val();

    $.ajax({
        url: './api/user/bodySpecsUpdate',
        type: 'POST',
        data: {
            height: height,
            pants_size: pants_size,
            top_size: top_size,
            shoes_size: shoes_size
        },  
        success: function(response) {
            alert('수정 되었습니다.');
            location.reload();
        },
        error: function(error) {
            console.error("수정을 다시 시도해주세요.", error);
        }
    });
}

/////////////////// 바디 치수 조회 /////////////////////
function bodySpecsSelect() {
    $.ajax({
        url: './api/user/bodySpecsSelect',
        type: 'GET',
        success: function(response) {
            // 서버에서 받은 데이터로 슬라이더와 셀렉트 박스 값을 업데이트
            if (response) {
                // 슬라이더 값 설정
                $('#height').val(response.height);
                $('#pants_size').val(response.pants_size);
                
                // 슬라이더 표시 값 업데이트
                const heightDisplay = document.querySelector('.range-value#height');
                const pantsDisplay = document.querySelector('.range-value#pants_size');
                
                // 키 표시 업데이트
                if (response.height >= 180) {
                    heightDisplay.textContent = '180cm 이상';
                } else {
                    heightDisplay.textContent = response.height + 'cm';
                }
                
                // 바지 사이즈 표시 업데이트
                if (response.pants_size >= 32) {
                    pantsDisplay.textContent = '32 이상';
                } else {
                    pantsDisplay.textContent = response.pants_size;
                }
                
                // 셀렉트 박스 값 설정
                $('#top_size').val(response.top_size);
                $('#shoe_size').val(response.shoes_size);
                
                // 슬라이더 값 위치 재계산
                const heightSlider = document.getElementById('height');
                const pantsSlider = document.getElementById('pants_size');
                
                updateSliderValuePosition(heightSlider, heightDisplay);
                updateSliderValuePosition(pantsSlider, pantsDisplay);
                
                // 저장 버튼의 동작 변경 (수정 모드로)
                $('#save-button').off('click').on('click', function() {
                    bodySpecsUpdate();
                });
            }
        },
        error: function(error) {
            console.error("조회를 다시 시도해주세요.", error);
        }
    });
}

/////////////////// 바디 치수 슬라이더 설정 /////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // 슬라이더 설정 객체
    const sliderConfig = {
        height: {
            min: 140,
            max: 190,
            format: value => value >= 180 ? '180cm 이상' : value + 'cm'
        },
        pants_size: {
            min: 23,
            max: 35,
            format: value => value >= 32 ? '32 이상' : value.toString()
        }
    };

    // 슬라이더 초기화
    Object.keys(sliderConfig).forEach(id => {
        initializeSlider(id, sliderConfig[id]);
    });

    function initializeSlider(id, config) {
        const slider = document.getElementById(id);
        const valueDisplay = document.querySelector(`.range-value#${id}`);
        
        if (!slider || !valueDisplay) return;

        // 초기값 설정
        updateSliderValue(slider, valueDisplay, config.format);
        updateSliderValuePosition(slider, valueDisplay);

        // 이벤트 리스너 등록
        slider.addEventListener('input', function() {
            updateSliderValue(this, valueDisplay, config.format);
            updateSliderValuePosition(this, valueDisplay);
        });
    }
});
