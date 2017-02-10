window.onload=function(){
    header();
    tu();
    djs();
}
/*头部搜索框*/
function header(){
    var bannerbox=document.querySelector(".jd_banner");/*轮播图*/
    var headerbox=document.querySelector(".jd_header_box");/*搜索框*/
    var top=bannerbox.offsetHeight;/*轮播的高度*/
    window.onscroll=function(){
        var top1=document.body.scrollTop;/*当前页面滚动的距离*/
        var op=0;
        if(top1>top){
            op=0.85;
            headerbox.style.background="rgba(201,21,35,"+op+")";
        }else {
            op=0.85*(top1/top);
            headerbox.style.background="rgba(201,21,35,"+op+")";
        }
        /*设置透明度*/
    }
}
/*轮播图*/
function tu() {
    var banner = document.getElementsByClassName("jd_banner")[0];
    /*轮播图*/
    var imgbox = banner.getElementsByTagName("ul")[0];
    /*图片盒子*/
    var dianbox = banner.getElementsByTagName("ul")[1];
    /*圆点ul盒子，banner下面最后一个ul*/
    var dian = dianbox.getElementsByTagName('li');
    /*圆点ul盒子所以的子元素li*/
    console.log(banner);
    console.log(imgbox);
    console.log(dianbox);
    console.log(dian);

    var index = 1;
    /*初始化索引*/

    var width = banner.offsetWidth;
    /*图片的宽度*/
    console.log(width);

    /*添加过渡*/
    var addTransition = function () {
        imgbox.style.transition = "all 0.3s ease";
        imgbox.style.webkitTransition = "all 0.3s ease";
        /*兼容老版本浏览器*/
    };

    /*移除过渡*/
    var rmoveTransform = function () {
        imgbox.style.transition = "none";
        imgbox.style.webkitTransition = "none";
        /*兼容老版本浏览器*/
    };

    /*改变位置*/
    var translateX = function (x) {
        imgbox.style.transform = "translateX(" + x + "px)";
        /*移动*/
        imgbox.style.webkitTransform = "translateX(" + x + "px)";
    };
    /*定时器*/
    /*图片滚动*/
    var timer;
    timer = setInterval(function () {
        index++;
        addTransition();
        /*添加过渡*/
        translateX(-index * width);
        /*位置改变*/
    }, 1000);

    /*过渡结束事件*/
/*
    guodu.transitionend(imgbox, function (e) {
        if (index >= 9) {
            index = 1;
            rmoveTransform();
            /!*先清除过渡*!/
            translateX(-index * width);
            /!*后瞬间移动*!/
        } else if (index <= 0) {
            index = 8;
            rmoveTransform();
            translateX(-index * width);
        }
        diandian();/!*过渡结束后调用*!/
    });
*/
    imgbox.addEventListener("transitionend",function(){
        if(index>=9){
            index=1;
            rmoveTransform();/*先清除过渡*/
            translateX(-index*width);/*后瞬间移动*/
        }else if(index<=0) {
            index=8;
            rmoveTransform();
            translateX(-index*width);
        }
        diandian();
    });
    /*过渡结束事件*/
    imgbox.addEventListener("webkitTransitionend",function(){
        if(index>=9){
            index=1;
            rmoveTransform();/*先清除过渡*/
            translateX(-index*width);/*后瞬间移动*/
        }else if(index<=0) {
            index=8;
            rmoveTransform();
            translateX(-index*width);
        }
        diandian();
    });

    /*圆点滚动*/
    var diandian=function(){
        for( var i = 0; i<dian.length ; i++){
            dian[i].className=" ";
        }
        dian[index-1].className="now";/*当前的点和图对应并且加上now*/
    }

    /*图片滑动*/
    /*初始化*/
    var startX= 0,moveX= 0,juliX= 0;
    imgbox.addEventListener("touchstart",function(e){
        clearInterval(timer);
        startX= e.touches[0].clientX ;
        console.log(startX);
    },false);
    imgbox.addEventListener("touchmove",function(e){

        moveX=e.touches[0].clientX ;
        console.log(moveX);
        juliX=moveX-startX;

        rmoveTransform()
        translateX(-index * width+juliX);

    },false);
    imgbox.addEventListener("touchend",function(e){
       if(Math.abs(juliX)>width/3&& moveX != 0) {
           /*滑动方向*/
           if (juliX < 0) {
               index++;
           } else {
               index--;
           }
       }
        /*滑动没满足3/1的时候*/
        addTransition();
        translateX(-index * width)
        /*防止数据污染*/
        startX= 0,moveX= 0,juliX= 0;

        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();/*添加过渡*/
            translateX(-index * width);/*位置改变*/
        }, 1000);
    },false);
}
/*倒计时*/
var djs=function(){
    var timebox=document.getElementsByClassName("zs_time")[0];
    var spans=timebox.getElementsByTagName("span");
    console.log(timebox);
    console.log(spans);
    var time=9*60*60;
    var timer;
    timer=setInterval(function(){
        time--;
        if(time<0){
          clearInterval(timer);
        }
        var h=Math.floor(time/(60*60));/*小时*/
        var m=Math.floor(time%(60*60)/60);/*分钟*/
        var s=Math.floor(time%60);/*秒数*/
        console.log(h, m , s );
        spans[0].innerHTML= h>10? Math.floor(h/10):0;
        spans[1].innerHTML=h%10;
        spans[3].innerHTML= m>10? Math.floor(m/10):0;
        spans[4].innerHTML=m%10;
        spans[6].innerHTML= s>10? Math.floor(s/10):0;
        spans[7].innerHTML=s%10;
    },1000)

}




