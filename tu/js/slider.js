/**
 * Created by andy on 2015/11/23.
 */
window.onload = function() {
    // 获取元素
    function $(id){return document.getElementById(id);}
    var js_slider=$("js_slider");//大盒子
    var slider_main_block=$("slider_main_block");//图片父盒子
    var img= slider_main_block.children;
    var slider_ctrl=$("slider_ctrl");//span父盒子
    var len=slider_main_block.children.length;
    for (var i=0;i<len;i++){
        var span=document.createElement("span");//创建span
        span.innerHTML=len-i;
        span.className="slider-ctrl-con";
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);//插入在第一个span前面
    }
    var spans=slider_ctrl.children;
    spans[1].setAttribute("class","slider-ctrl-con current");//第二个span背景
    var scrollwidth=js_slider.clientWidth;
    for(var i=1;i<img.length;i++){
        img[i].style.left= scrollwidth+"px";
    }
    var newk=0;
    for(var k in spans ){
        spans[k].onclick=function(){
            if(this.className=="slider-ctrl-prev"){
               //alert("左侧按钮");
                //当前先到慢慢右侧，在判断，上一张在到左侧，当前到中央
                fun(img[newk],{left:scrollwidth});
                --newk<0? newk=img.length-1: newk;
                img[newk].style.left= -scrollwidth+"px";
                fun(img[newk],{left:0});
                aaa();
            }else if(this.className=="slider-ctrl-next"){
                //alert("右侧按钮");
                fun(img[newk],{left:-scrollwidth});
                ++newk>img.length-1? newk=0: newk;
                img[newk].style.left= scrollwidth+"px";
                fun(img[newk],{left:0});
                aaa();
            }else {
                //alert("下面的span");
                that=this.innerHTML-1;//索引号
                if(that>newk){
                    fun(img[newk],{left:-scrollwidth});
                    img[that].style.left= scrollwidth+"px";
                }else if (that<newk){
                    fun(img[newk],{left:scrollwidth});
                    img[that].style.left= -scrollwidth+"px";
                }
                newk=that;
                fun(img[newk],{left:0});
                aaa();
            }
        }
        function aaa(){
            for (var i=1;i<spans.length-1;i++){
                spans[i].className="slider-ctrl-con";
            }
            spans[newk+1].className="slider-ctrl-con current";
        }

    }
    var timer=null;
    timer=setInterval(autopaly,2000);//开启定时器
    function autopaly(){
        fun(img[newk],{left:-scrollwidth});
        ++newk>img.length-1? newk=0: newk;
        img[newk].style.left= scrollwidth+"px";
        fun(img[newk],{left:0});
        aaa();
    }
    js_slider.onmouseover=function(){
        clearInterval(timer);
    }
    js_slider.onmouseout=function(){
        clearInterval(timer);
        timer=setInterval(autopaly,2000);
        console.log(222);
    }


}