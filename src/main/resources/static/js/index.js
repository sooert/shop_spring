/*------------------오른쪽 하단에 제일 위로가는 버튼------------------*/
function scrolltop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // 스크롤 이벤트 리스너
    window.onscroll = function() {
       // popup이 열려있는지 확인
       const isPopupOpen = $('.popup').hasClass('show');
       
       if (isPopupOpen) {
          // popup이 열려있으면 버튼 숨김
          scrollToTopButton.style.display = "none";
       } else {
          // popup이 닫혀있을 때만 스크롤 위치에 따라 버튼 표시/숨김
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
             scrollToTopButton.style.display = "block"; // 버튼 표시
          } else {
             scrollToTopButton.style.display = "none"; // 버튼 숨김
          }
       }
    };
 
    // 버튼 클릭 시 상단으로 스크롤
    scrollToTopButton.onclick = function() {
       window.scrollTo({
          top: 0,
          behavior: 'smooth' // 부드러운 스크롤
       });
    };
 }

 $(document).ready(function() {

    /*오른쪽 하단에 제일 위로가는 버튼*/
    scrolltop();

    
 });
