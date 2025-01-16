const firebaseConfig = {
    apiKey: "AIzaSyD0qbd50bRKylrlXfyInH73euD3qqwdCBI",
    authDomain: "open-market-82ccb.firebaseapp.com",
    projectId: "open-market-82ccb",
    storageBucket: "open-market-82ccb.firebasestorage.app",
    messagingSenderId: "153123476480",
    appId: "1:153123476480:web:a627a0fdaaeb6d01efb4e5",
    measurementId: "G-YPHBM9TV1S"
  };
  
// Firebase 유틸리티 함수
var firebaseUtil = {
    initializeFirebase: function () {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    },

    getBase64: async function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject('Error: ', error);
            };
        });
    },

    uploadUserImage: async function (storage, base64, userId) {
        return new Promise(function (resolve, reject) {
            try {
                const userFolder = userId || 'temp_' + Date.now();
                const timestamp = Date.now();
                var ref = storage.ref('reviews').child(userFolder).child(timestamp + ".png");

                // base64 데이터에서 실제 이미지 데이터만 추출
                const imageData = base64.split(',')[1];

                ref.putString(imageData, 'base64', { contentType: 'image/png' })
                    .then(function (snapshot) {
                        return snapshot.ref.getDownloadURL();
                    })
                    .then(function (url) {
                        console.log("Firebase 업로드 성공:", url);
                        resolve(url);
                    })
                    .catch(function (err) {
                        console.error("Firebase 업로드 실패:", err);
                        reject(err);
                    });
            } catch (error) {
                console.error("Firebase 업로드 중 오류:", error);
                reject(error);
            }
        });
    }
};