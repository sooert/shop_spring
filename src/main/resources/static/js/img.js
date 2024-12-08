// 파이어베이스 설정 (이미지 업로드)
const firebaseConfig = {
    apiKey: "AIzaSyClZQVAfWFBBXnVeSUhZoZPRrBoJ6L-5-Q",
    authDomain: "shop-c1b9b.firebaseapp.com",
    projectId: "shop-c1b9b",
    storageBucket: "shop-c1b9b.firebasestorage.app",
    messagingSenderId: "199260298169",
    appId: "1:199260298169:web:41cfc2f98880af519e3468",
    measurementId: "G-M9YXBH1B09"
};

// 파일을 base64로 변환 
async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// Firebase Storage에 이미지 업로드
async function uploadUserImage(storage, base64, userId) {
    return new Promise((resolve, reject) => {
        const timestamp = Date.now();
        const ref = storage.ref(`users/${userId}/${timestamp}.png`);
        ref.putString(base64, 'data_url')
            .then(() => ref.getDownloadURL())
            .then(resolve)
            .catch(reject);
    });
}

$(document).ready(function(){
    // Firebase 초기화
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const storage = firebase.storage();

    // DOM 객체(요소) 가져오기
    const fileInput = document.getElementById("main-profile-img");  // 파일 선택 input
    const profileButton = document.querySelector(".profile-img-box"); // 프로필 이미지 수정 버튼
    const profileImg = document.querySelector(".profile-img"); // 프로필 이미지 미리보기

    // 버튼 클릭 시 파일 선택창 열기
    profileButton.addEventListener("click", function () {
        fileInput.click(); 
    });

    // 파일 선택 및 이미지 미리보기
    fileInput.addEventListener("change", async function (event) {
        const file = event.target.files[0];
        if (!file) return;

        // 이미지 미리보기 설정
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImg.src = e.target.result; 
        };
        reader.readAsDataURL(file);

        // Firebase에 이미지 업로드
        try {
            const base64 = await getBase64(file);
            const downloadUrl = await uploadUserImage(storage, base64, userId); // USER_ID는 사용자 고유 ID
            console.log("업로드 완료. URL:", downloadUrl); 
            $.ajax({
                url: "./api/user/updateImgUrl",
                type: "POST",
                data: { new_img_url: downloadUrl },
                success: function(response) {
                    alert("프로필 이미지가 업로드되었습니다.");
                }
            }); 
        } catch (error) {
            alert("프로필 이미지 업로드 실패. 다시 시도해주세요.");
        }
    });
});

