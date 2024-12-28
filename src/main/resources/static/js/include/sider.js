$(document).ready(function() {
    // Firebase 초기화
    firebaseUtil.initializeFirebase();
    
    // 프로필 이미지 클릭 시 파일 입력 창 열기
    $('.profile-img').on('click', function() {
        $('#file').click();
    });

    // 파일 선택 시 이미지 업로드
    $('#file').on('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // 파일을 base64로 변환
            const base64 = await firebaseUtil.getBase64(file);
            
            // Firebase Storage에 업로드
            const storage = firebase.storage();
            const userId = '${sessionScope.me.id}'; // JSP에서 사용자 ID 가져오기
            const imageUrl = await firebaseUtil.uploadUserImage(storage, base64, userId);

            // 프로필 이미지 업데이트
            $('.profile-img').attr('src', imageUrl);

            // 서버에 이미지 URL 업데이트 요청
            await $.ajax({
                url: './api/user/updateImgUrl',
                method: 'POST',
                data: { 
                    img_url: imageUrl 
                },
                success: function(response) {
                    location.reload();
                    alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
                },
                error: function(xhr, status, error) {
                    console.error('프로필 이미지 업데이트 실패:', error);
                    alert('프로필 이미지 업데이트에 실패했습니다. 다시 시도해주세요.');
                }
            });

        } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
        }
    });
});