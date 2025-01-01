$(document).ready(function(){

    var detail_img_urls = ['http1','http2','http3'];

    $.ajax({
        url:'./api/item/imgs',
        type:'post',
        data:{
            'detail_img_urls':detail_img_urls
        },
        success:function(data){
            console.log(data);
        },
        error:function(e){
            console.log(e);
        }
    });

    // Firebase 초기화 부분 수정
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    //스토리지 초기화 - 순서 변경
    var storage = firebase.storage();

    //firebaseItemUtil 초기화
    var firebaseItemUtil = {}; 
    firebaseItemUtil.getBase64 = firebaseUtil.getBase64;
    firebaseItemUtil.uploadItemImage = firebaseUtil.uploadItemImage;
    firebaseItemUtil.storage = storage;

    const maxImgCnt = 8;
   
    var selectedMainImgBase64 = '';


    $('#max-cnt').text(maxImgCnt);


    $(document).on('click','.del-btn',function(){
        if(confirm('사진을 삭제하시겠습니까?')){
            $(this).closest('.img-box').remove();
            $('#detail-img-count').text($('.img-box').length);
        }
    });

    $('#detail-img-upload-box').click(function(){
        //최대 이미지 비교 로직
        if($('.img-box').length>=maxImgCnt){
            alert(`이미지는 최대 ${maxImgCnt}개 까지 등록할 수 있습니다.`);
            return;
        }
        $('#detail-img-file').trigger('click');
    });

    $('#detail-img-file').change(async function(){
        var file = this.files[0];
        var base64 = await firebaseItemUtil.getBase64(file);
        $(this).val('');
        

        $('#detail-img-list').append(`

            <div class="img-box" style="">
                <img src="${base64}"/>
                <div class="del-btn">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        
        `);

       
        $('#detail-img-count').text($('.img-box').length);
    });

    $('#img-upload-box').click(function(){
        $('#main-img-file').trigger('click');
    });

    $('#main-img-file').change(async function(){
        var file = this.files[0];
       
        //미리 보기
        var base64 = await firebaseItemUtil.getBase64(file);
       
        selectedMainImgBase64=base64;
        $('#img-upload-box').empty();
        $('#img-upload-box')
            .css('background-image','url('+base64+')')
            .css('background-size','cover');
    });

    $('#submit-btn').click(async function(){
        var name = $('#name').val();
        var content = $('#content').val();
        var price = $('#price').val();
        var discount = $('#discount').val(); 
        var category = $('#category').val();
        var company = $('#company').val();
        
        if(name.length == 0){
            alert('상품명을 채워주세요.');
            return;
        }

        if(content.length == 0){
            alert('상품소개를 채워주세요.');
            return;
        }

        if(company.length == 0){
            alert('회사명을 채워주세요.');
            return;
        }

        if(price.length == 0 || isNaN(price) || price <= 0){
            alert('유효한 상품가격을 채워주세요.');
            return;
        }

        if(discount.length == 0 || isNaN(discount) || discount < 0){
            alert('유효한 할인율을 채워주세요.');
            return;
        }

        if(selectedMainImgBase64.length == 0){
            alert('대표 상품 이미지를 등록해주세요.');
            return;
        }   

        $('#loader').css('display','inline-block');

        try {
            //이미지 업로드
            var item_img_url = await firebaseItemUtil.uploadItemImage(storage, selectedMainImgBase64);

            //상세 이미지 업로드
            var detail_img_urls = [];

            for(var i = 0; i < $('.img-box').length; i++){
                var base64 = $('.img-box').eq(i).find('img').attr('src');
                var url = await firebaseItemUtil.uploadItemImage(storage, base64);
                detail_img_urls.push(url);
            }

            // detail_img_urls가 비어있지 않은지 확인
            if (detail_img_urls.length === 0) {
                alert('상세 이미지를 등록해주세요.');
                return;
            }

            const itemData = {
                name: name,
                category: category,
                content: content,
                price: parseInt(price),
                discount: parseFloat(discount) / 100,
                company: company,
                item_img_url: item_img_url,
                detail_img_urls: detail_img_urls
            };

            $.ajax({
                url: './api/item/create',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(itemData),
                success: function(data){ 
                    $('#loader').css('display', 'none');
                    if(data === 'ok'){
                        alert('상품 등록이 완료되었습니다.');
                        location.href = './index';
                    } else {
                        alert('상품 등록에 실패하였습니다.');
                    }
                },
                error: function(e){
                    $('#loader').css('display', 'none');
                    console.error(e);
                    alert('상품 등록 중 오류가 발생했습니다.');
                }
            });
        } catch(error) {
            $('#loader').css('display', 'none');
            console.error(error);
            alert('이미지 업로드 중 오류가 발생했습니다.');
        }
    });

});