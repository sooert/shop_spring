$(document).ready(function () {
	/*날씨받아오기*/
	weather();
	
    // 홈 버튼
	$('.go-home, .htop-left').on('click', function () {
	    window.location.href = './index'; 
	});

    // 상품 등록 버튼
    $('#register-btn').on('click', function () {
        window.location.href = './save-item';
    });
 
    // 장바구니 버튼
    $('#cart-btn, .go-cart').on('click', function () {
        window.location.href = './cart';
    });

    // 마이페이지 버튼
    $('.go-my-page, .info-my-box').on('click', function () {
        window.location.href = './basics';
    }); 

    // 찜 버튼
    $('.go-like').on('click', function () {
        window.location.href = './loves';
    });

    // 찜 버튼(비회원)
    $('.go-like-noUser').on('click', function () {
        window.location.href = './nouser-lovers';
    });
 
	// 로그인 버튼과 팝업창 로그인
	$('#login-btn, .name-box').on('click', function () {
	    window.location.href = './login';
    });

	// 로그아웃 버튼
	$("#log-out-btn").click(function(){
       var con = confirm("로그아웃 하시겠습니까?");
       if(con){
            $.ajax({
                url: "./api/user/logout",
                type: "post",
                success: function(result){
                    
                    alert("로그아웃 되었습니다.");

                    location.reload();
                },
                error: function(e){
                    console.log(e);
                }
            });
       }
       else{
        alert("로그아웃 취소 되었습니다.");
       }     
	});
	
	//팝업창버튼
	$('.open-popup-btn').click(function() {
		$('.popup').addClass('show');
		$('.overlay').fadeIn();
		// popup 열릴 때 scrollToTop 버튼 숨김
		$('#scrollToTop').hide();
	});
	//팝업창 닫는버튼
	$('.close-btn, .overlay').click(function() {
		$('.popup').removeClass('show');
		$('.overlay').fadeOut();
		// popup 닫힐 때 스크롤 위치에 따라 scrollToTop 버튼 표시 여부 결정
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			$('#scrollToTop').show();
		}
	});

});

/*------------------날씨 받아오기------------------*/
function weather() {
    const apiKey = '6fadcbc924506ede336b8cebee8a0165';
    
    // 서울의 위도/경도 좌표 (기본값)
    const defaultCoords = {
        latitude: 37.5665,  // 서울의 위도
        longitude: 126.9780 // 서울의 경도
    };

    function fetchWeather(latitude, longitude) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('날씨 정보를 가져올 수 없습니다');
                return response.json();
            })
            .then(data => {
                // 도시 이름을 한글로 매핑
                const cityNameKR = {
                    'Seoul': '서울',
                    'Incheon': '인천',
                    'Busan': '부산',
                    'Daegu': '대구',
                    'Daejeon': '대전',
                    'Gwangju': '광주',
                    'Ulsan': '울산',
                    'Seolman': '설만',
                    'Suwon-si': '수원',
                    'Seongnam-si': '성남',
                    'Changwon': '창원',
                    'Goyang-si': '고양',
                    'Yongin': '용인',
                    'Gimhae': '김해',
                    // 필요한 도시 추가
                };

                // 도시 이름이 매핑 테이블에 없는 경우 API에서 받은 이름을 그대로 사용
                const cityName = cityNameKR[data.name] || data.name;
                
                const weatherHtml = `
                    <tr>
                        <td><img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="날씨 아이콘"></td>
                    </tr>
                    <tr>
                        <td class="place" style="font-weight: bold;">${cityName}</td>
                    </tr>
                    <tr>
                        <td class="temperature">온도: ${Math.round(data.main.temp)}°C</td>
                    </tr>
                    <tr>
                        <td class="description" style="color: #666;">${data.weather[0].description}</td>
                    </tr>
                    <tr>
                        <td class="humidity" style="color: #666;">습도: ${data.main.humidity}%</td>
                    </tr>
                `;
                
                $('.weather-table').empty().html(weatherHtml);
            })
            .catch(error => {
                console.error('날씨 정보 가져오기 실패:', error);
                $('.weather-table').html('<tr><td>날씨 정보를 가져올 수 없습니다</td></tr>');
            });
    }

    // 위치 정보 옵션 추가
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    // 위치 정보 가져오기 시도
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // 한국 영역 내의 좌표인지 확인
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // 한국의 대략적인 좌표 범위
                const koreaCoords = {
                    minLat: 33.0,  // 제주도 남단
                    maxLat: 38.5,  // 북한 경계
                    minLon: 125.0, // 서해안
                    maxLon: 132.0  // 동해안
                };

                // 좌표가 한국 영역 내에 있는지 확인
                if (lat >= koreaCoords.minLat && lat <= koreaCoords.maxLat &&
                    lon >= koreaCoords.minLon && lon <= koreaCoords.maxLon) {
                    fetchWeather(lat, lon);
                } else {
                    // 한국 영역 밖이면 서울 좌표 사용
                    fetchWeather(defaultCoords.latitude, defaultCoords.longitude);
                }
            },
            error => {
                console.error('위치 정보 가져오기 실패:', error);
                fetchWeather(defaultCoords.latitude, defaultCoords.longitude);
            },
            options  // 옵션 추가
        );
    } else {
        // 지오로케이션을 지원하지 않는 경우 서울 좌표 사용
        fetchWeather(defaultCoords.latitude, defaultCoords.longitude);
    }
}

// DOM이 로드되면 날씨 정보 가져오기
$(document).ready(function() {
    weather();
    
    // 30분마다 날씨 정보 업데이트
    setInterval(weather, 1800000);
});


