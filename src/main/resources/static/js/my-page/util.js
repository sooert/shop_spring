const firebaseConfig = {
    apiKey: "AIzaSyAjMo161z8lVauMCOAiynyo2xcK_SHwlxI",
    authDomain: "open-market-801f0.firebaseapp.com",
    projectId: "open-market-801f0",
    storageBucket: "open-market-801f0.firebasestorage.app",
    messagingSenderId: "486349643801",
    appId: "1:486349643801:web:bf1543d2dda44d06668a88",
    measurementId: "G-ZDKCZ2PVN5"
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
                var ref = storage.ref('users').child(userFolder).child(timestamp + ".png");

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