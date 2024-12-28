const firebaseConfig = {
    apiKey: "AIzaSyAjMo161z8lVauMCOAiynyo2xcK_SHwlxI",
    authDomain: "open-market-801f0.firebaseapp.com",
    projectId: "open-market-801f0",
    storageBucket: "open-market-801f0.firebasestorage.app",
    messagingSenderId: "486349643801",
    appId: "1:486349643801:web:bf1543d2dda44d06668a88",
    measurementId: "G-ZDKCZ2PVN5"
};

// 프로필 이미지 업로드
var firebaseUtil = {
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
    uploadUserImage: async function(storage, base64, userId) {
        return new Promise(function(resolve, reject) {
            try {
                const userFolder = userId || 'temp_' + Date.now();
                const timestamp = Date.now();
                var ref = storage.ref('users').child(userFolder).child(timestamp + ".png");
                
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
                        reject(err);
                    });
            } catch (error) {
                console.error("Firebase 업로드 중 오류:", error);
                reject(error);
            }
        });
    },
    uploadItemImage: async function(storage, base64) {
        return new Promise(function(resolve, reject) {
            try {
                const userFolder = 'temp_' + Date.now();
                const timestamp = Date.now();
                var ref = storage.ref('items').child(userFolder).child(timestamp + ".png");
                
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
                        reject(err);
                    });
            } catch (error) {
                console.error("Firebase 업로드 중 오류:", error);
                reject(error);
            }
        });
    }
}

$(document).ready(function() {
    // Firebase 초기화
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const storage = firebase.storage();

    // DOM 요소 가져오기
    const fileInput = document.getElementById("file");
    const profileImg = document.getElementById("profile-img");

    // 파일 입력이 존재할 경우에만 이벤트 리스너 추가
    if (fileInput) {
        fileInput.addEventListener("change", async function(event) {
            const file = event.target.files[0];
            if (!file) return;

            // 이미지 미리보기 설정
            const reader = new FileReader();
            reader.onload = function(e) {
                if (profileImg) {
                    profileImg.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);

            // Firebase에 이미지 업로드
            try {
                const base64 = await firebaseUtil.getBase64(file);
                const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}');
                const downloadUrl = await firebaseUtil.uploadUserImage(storage, base64, signupData.id);
                
                signupData.img_url = downloadUrl;
                sessionStorage.setItem('signupData', JSON.stringify(signupData));

            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert("프로필 이미지 업로드 실패. 다시 시도해주세요.");
            }
        });
    }
});












