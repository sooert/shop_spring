
var a = 0;

$(document).ready(async function(){

    var posts=[];


    //posts = await getPosts();
    //console.log(posts);

});

function getPosts(){        

    return new Promise(function(resolve,reject){
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts',
            method:'get',
            success:function(data){
                resolve(data);
            }
        });
    });

}


function changeAAfter2Sec(){

    return new Promise(function(resolve,reject){
        //로직
        setTimeout(function(){
            a=1;
            //console.log('2초뒤 a가 변경됨.');
            reject();
        },2000);
    });

}
