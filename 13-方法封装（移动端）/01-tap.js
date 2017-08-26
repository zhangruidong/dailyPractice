/**  by zhangruidong   **/

/*
tap方法封装  这三种方式都可以实现
    第一种  部分安卓设备无法触发
    第二种  用户可能有微小的滑动（误触）就不能触发tap事件
    第三种  允许误触  且对安卓下的bug做了修复  但自身也存在bug 但难以触发，是较好的解决方式
* */

/*function tap(el,fn){// 元素   回调函数
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
}*/

/*
function tap(el,fn){
    var isTap = true;
    var lastPoint = {};
    el.addEventListener('touchstart', function(e) {
        var touch = e.changedTouches[0];
        lastPoint = {
            x: touch.pageX,
            y: touch.pageY
        }
    });
    el.addEventListener('touchmove', function(e) {
        var touch = e.changedTouches[0];
        if(lastPoint.x == touch.pageX && lastPoint.y == touch.pageY){
            return;
        }
        isTap = false;
        lastPoint = {
            x: touch.pageX,
            y: touch.pageY
        }
    });
    el.addEventListener('touchend', function(e) {
        if(isTap){
            fn&&fn.call(el,e);
        }
        isTap = true;
    });
}*/

function tap(el,fn){
    var startPoint = {};
    el.addEventListener('touchstart', function(e) {
        var touch = e.changedTouches[0];
        startPoint = {
            x: touch.pageX,
            y: touch.pageY
        }
    });
    el.addEventListener('touchend', function(e) {
        var touch = e.changedTouches[0];
        if(Math.abs(touch.pageX - startPoint.x)<5
            &&Math.abs(touch.pageY - startPoint.y)<5){
            fn&&fn.call(el,e);
        }
    });
}
