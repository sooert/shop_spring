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

   // 상품 목록 불러오기
   getItems();

 });

 function getItems(){ 
   $.ajax({
       url:"./api/item/findAll",
       method:"GET", 
       success:function(response){ 
           var items = response;
           console.log(items);
           $.each(items, function(index, item){
              var discount_price = item.price * (1-item.discount);
              $('.item-container').append(`
                  <div class="product" style="cursor:pointer;" onclick="location.href='./detail-item?item_code=${item.item_code}'">
                        <img src="${item.item_img_url}" class="product-image"/>
                        <div class="product-info">
                           <span class="product-discount" style="color:red;">${item.discount*100}%</span>
                           <span class="product-discount-price">${discount_price.toLocaleString()} 원</span>
                        </div>
                        <div class="product-company">
                           <span style="color:#999;font-size:13px;">${item.company}</span>
                        </div>
                        <div class="product-detail" style="margin-top:-5px; margin-bottom:-6px;">
                           <span style="color:#999;font-size:13px;">${item.content}</span>
                        </div>
                  </div>
              `);
           });
           
       }
   });
}


