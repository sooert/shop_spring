$(document).ready(function(){

    // 시즌 할인과 특가 할인 체크박스 중 하나만 선택 가능
    $('#season_discount, #special_sale').on('change', function() {
        if ($(this).is(':checked')) {
            // 선택된 체크박스가 체크되면 다른 체크박스를 비활성화
            if ($(this).attr('id') === 'season_discount') {
                $('#special_sale').prop('checked', false);
            } else {
                $('#season_discount').prop('checked', false);
            }
        }
    });

    // 상세 이미지 미리보기
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

    // 상품 등록 버튼 
    $('#submit-btn').click(async function(){
        var name = $('#name').val().trim();
        var content = $('#content').val();
        var price = $('#price').val();

        ////////////////////////////////////////////////////////////////////

        var discount = $('#discount').val(); 
        // discount가 입력되지 않았을 경우 0으로 설정
        discount = discount.length == 0 ? 0 : parseFloat(discount);

        ////////////////////////////////////////////////////////////////////

        // 기본 할인율 설정
        var season_discount_rate = 25; // 시즌 할인 25%
        var special_sale_rate = 40; // 특가 할인 40%
        // 할인 종류(시즌할인, 특가할인)
        var season_discount = $('#season_discount').is(':checked') ? season_discount_rate : 0;
        var special_sale = $('#special_sale').is(':checked') ? special_sale_rate : 0;

        ////////////////////////////////////////////////////////////////////

        var category = $('#category').val();
        var company = $('#company').val();
        
        if(name.length == 0){
            alert('상품명을 채워주세요.');
            $('#name').focus();
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
            $('#img-upload-box').focus();
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
                point: parseInt(price) * 0.01,
                season_discount: parseInt(season_discount),
                special_sale: parseInt(special_sale),
                company: company,
                item_img_url: item_img_url,
                detail_img_urls: detail_img_urls
            };

            console.log("전송할 데이터:", itemData);

            $.ajax({
                url: './api/item/create',
                type: 'POST',
                data: itemData,
                success: function(data){ 
                    $('#loader').css('display', 'none');
                    if(data === 'ok'){
                        alert('상품 등록이 완료되었습니다.');
                        location.href = './index';
                    } else {
                        alert('상품 등록에 실패하였습니다.');
                        console.log(data);
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