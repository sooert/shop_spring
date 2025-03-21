const firebaseConfig = {
    apiKey: "AIzaSyD0qbd50bRKylrlXfyInH73euD3qqwdCBI",
    authDomain: "open-market-82ccb.firebaseapp.com",
    projectId: "open-market-82ccb",
    storageBucket: "open-market-82ccb.firebasestorage.app",
    messagingSenderId: "153123476480",
    appId: "1:153123476480:web:a627a0fdaaeb6d01efb4e5",
    measurementId: "G-YPHBM9TV1S"
};

// Firebase 관련 코드를 하나의 객체로 통합
const firebaseService = {
    init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        return firebase.storage();
    },
    
    // firebaseUtil의 메서드들 통합
    getBase64: async function(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                resolve(reader.result);
            };
            reader.onerror = function(error) {
                reject('Error: ', error);
            };
        });
    },
    uploadReviewImage: async function(storage, base64) {
        return new Promise(function(resolve, reject) {
            try {
                const userFolder = 'temp_' + Date.now();
                const timestamp = Date.now();
                var ref = storage.ref('reviews').child(userFolder).child(timestamp + ".png");
                
                // base64 데이터에서 실제 이미지 데이터만 추출
                const imageData = base64.split(',')[1];
                
                ref.putString(imageData, 'base64', {contentType: 'image/png'})
                    .then(function(snapshot) {
                        return snapshot.ref.getDownloadURL();
                    })
                    .then(function(url) {
                        console.log("Firebase 업로드 성공:", url);
                        resolve(url);
                    })
                    .catch(function(err) {
                        console.error("Firebase 업로드 실패:", err);
                        reject('Firebase 업로드 실패: ' + err.message);
                    });
            } catch (error) {
                console.error("Firebase 업로드 중 오류:", error);
                reject('업로드 중 오류 발생: ' + error.message);
            }
        });
    }
}

$(document).ready(function() {
    // Firebase 초기화
    const storage = firebaseService.init();

    // DOM 요소 가져오기
    const fileInput = document.getElementById("file");
    const reviewImg = document.getElementById("review-img");

    // 파일 입력이 존재할 경우에만 이벤트 리스너 추가
    if (fileInput) {
        fileInput.addEventListener("change", async function(event) {
            const file = event.target.files[0];
            if (!file) return;

            // 이미지 미리보기 설정
            const reader = new FileReader();
            reader.onload = function(e) {
                if (reviewImg) {
                    reviewImg.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);

            // Firebase에 이미지 업로드
            try {
                const base64 = await firebaseService.getBase64(file);
                const downloadUrl = await firebaseService.uploadReviewImage(storage, base64);
                
                sessionStorage.setItem('reviewData', JSON.stringify(reviewData));

            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert("리뷰 이미지 업로드 실패. 다시 시도해주세요.");
            }
        });
    }
});












