document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
  
    // 썸네일 클릭 시 메인 이미지 변경
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.src;
      });
    });
  
    // 구매 버튼 클릭 이벤트
    const buyButton = document.querySelector('.buy-button');
    buyButton.addEventListener('click', () => {
      alert('구매가 완료되었습니다!');
    });
  });