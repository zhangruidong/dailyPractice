/**  by zhangruidong   **/
function tap(el,fn){// 元素   回调函数
    var isTap = true;
    el.addEventListener('touchmove', function(e) {
        isTap = false;
    });
    el.addEventListener('touchend', function(e) {
        if(isTap){
            fn&&fn.call(el,e);
        }
        isTap = true;
    });
}