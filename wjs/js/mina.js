/**
 * Created by Administrator on 2016/11/12.
 */
$(function(){
    $(window).on('resize', resize);

    function resize() {
        var pmwidth = $(window).width();
        /*获取屏幕的宽度*/
        var isSmallpm = pmwidth < 992;
        /*判断屏幕是否小于992*/
        var $itms = $("#add-carousel .item");
        /*获取轮播item的*/
        $itms.each(function (i, item) {
            console.log(pmwidth);
            console.log(isSmallpm);
            var $item = $(item);
            var attr = isSmallpm ? 'smImage' : 'lgImage';
            var val = $item.data(attr);
            var url = 'url("' + val + '")'; // url("dsfsll.jpg")
            // 设置轮播项的背景
            $item.css('backgroundImage', url);
            if (pmwidth) {
                // 5.如果是小图换用，动态创建一个img标签append轮播项中
                var $img = $('<img src="' + val + '"/>');
                $item.empty().append($img);
            } else {
                // 防止由小变大的时候 小图依然保留的情况
                $item.empty();
            }
        })
    }


    $(window).on('resize', ulwidth).trigger('resize');
/*一下只能在小屏中使用*/
    function ulwidth(){
        var $Eul=$("#product .nav-tabs");
        console.log($Eul);
        var $Elis=$("li[role= 'presentation']",$Eul);
        console.log($Elis);
        var width=10;
        $Elis.each(function(i ,Eli){
            width +=$(Eli).width();
        })
        console.log(width);
        /*$Eul.width(width);*/
        var containerWidth=$Eul.width();
        console.log(containerWidth);
        if(containerWidth<width){
            $Eul.width(width);
        }else {
            $Eul.css("width","auto");
        }
    }


});