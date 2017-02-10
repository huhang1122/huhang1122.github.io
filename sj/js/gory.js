/**
 * Created by Administrator on 2016/11/6.
 */
window.onload=function(){
    huadong_left();
}
/*左边滑动*/
var huadong_left=function(){
    var box=document.getElementsByClassName("jd_gory_left")[0];
    var uls=box.getElementsByClassName("jd_gory_left_box")[0];
    console.log(box);
    console.log(uls);
    /*高度*/
    var boxheight=box.offsetHeight;
    var ulsheight=uls.offsetHeight;
    console.log(ulsheight);
    console.log(boxheight);
    /*最大 最小值*/
    var maxY= 0;
    var minY=-(ulsheight-boxheight);
    console.log(minY);

    /*设置缓冲距离 150*/
    var juY=150;

    /*添加过渡*/
    var addTransition = function () {
        uls.style.transition = "all 0.3s ease";
        uls.style.webkitTransition = "all 0.3s ease";/*兼容老版本浏览器*/
    };
/*一些方法*/
    /*移除过渡*/
    var rmoveTransform = function () {
       uls.style.transition = "none";
       uls.style.webkitTransition = "none";/*兼容老版本浏览器*/
    };

    /*改变位置*/
    var translateY = function (y) {
        uls.style.transform = "translateY(" + y + "px)";
        /*移动*/
        uls.style.webkitTransform = "translateY(" + y + "px)";
    };

    var startY= 0, moveY= 0,endY=0;

    var currY=0;/*记录初始坐标*/


    /*绑定事件*/

    uls.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    },false);
    uls.addEventListener("touchmove",function(e){
        endY= e.touches[0].clientY;
        moveY=startY-endY;
        if((currY-moveY)<(maxY+juY)&&(currY-moveY)>(minY-juY)){
            rmoveTransform();
            translateY(currY-moveY);
        }
     /*   if((currY-moveY)<(maxY+juliY)&&(currY-moveY)>(minY -juliY)) {
            rmoveTransform();
            translateY(currY - moveY);
        }*/
    },false);
    uls.addEventListener("touchend",function(e) {
        if((currY-moveY)>maxY){
            currY=maxY;
            addTransition()
            translateY(currY);
        }else if((currY-moveY)<minY){
            currY=minY;
            addTransition()
            translateY(currY);
        }else {
            currY=currY-moveY;
        }
        startY= 0, moveY= 0,endY=0;

    },false);

    var starttime= 0,ismove=false;
    var lis=uls.getElementsByTagName("li");
    console.log(lis);
    uls.addEventListener("touchstart",function(e){
        starttime=Date.now();
    },false);
    uls.addEventListener("touchmove",function(e){
        ismove=true;
    },false);
    uls.addEventListener("touchend",function(e){
        /*模拟tap事件*/
        if(Date.now()-starttime<200&&ismove==false){
            console.log("tap");
            for (var i=0;i<lis.length;i++){
                lis[i].className=" ";/*清空li的class*/
                lis[i].index=i;/*记录li的序号*/
            }
            var li= e.target.parentNode;
            console.log(li);
            li.className="now";/*给点击的添加样式*/

            var tranform=-li.index*50;/*移动*/
            if(tranform>minY) {
                addTransition();
                translateY(tranform);
                currY = tranform;
            }else{
                translateY(minY);
                currY =minY;
            }
        }
        /*模拟加载效果*/
        var jd_right=document.getElementsByClassName("jd_gory_right")[0];
        jd_right.style.transition="all 0.2s"
        jd_right.style.opacity=0;
        setTimeout(function(){
            jd_right.style.opacity=1;
        },200)
        starttime= 0,ismove=false;
    },false);

}




