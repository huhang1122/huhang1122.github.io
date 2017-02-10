/**
 * Created by Administrator on 2016/11/5.
 */
/*什么乱七八糟的我也不知道*/
window.guodu={};
window.guodu.transitionend=function(obj,aaa){
    if(typeof obj=="object"){
       obj.addEventListener("webkitTransitionend",function(e){
           aaa&&aaa(e);
       });
        obj.addEventListener("transitionend",function(e){
            aaa&&aaa(e);
        });
    }
}

