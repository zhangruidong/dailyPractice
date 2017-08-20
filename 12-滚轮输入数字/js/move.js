//todo 封装运动框架
//停止运动的方法    clearInterval(obj.timer)
function move(obj, j, duration, fn,ease) {//j代表要运动的属性，是一个{}对象
    var ease = ease || "linear"
    var oldTime = new Date().getTime();
    var d = duration;
    var s = {};
    for(var attr in j) {
        s[attr] = {};
        s[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        s[attr].c = j[attr] - s[attr].b;
    }
    obj.timer = setInterval(function() {
        var t = new Date().getTime() - oldTime;
        if(t >= d) {
            t = d
        }
        for(var attr in s) {
            var c = s[attr].c;
            var b = s[attr].b;
            var v = Tween[ease](t, b, c, d);
            if(attr == "opacity") {
                obj.style[attr] = v;
            } else {
                obj.style[attr] = v + "px";
            }
        }
        if(t == d) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 16)
}

//todo 封装抖动函数
function boomshakalaka(obj,attr,fn){
    var arr = [];
    for (var i = 10; i > 0; i--) {
        arr.push( -2*i,2*i );
    }
    arr.push( 0 );
    var num = -1;
    var oldAttr=parseFloat(getComputedStyle(obj)[attr]);
    var timer = setInterval(function(){
        num++;
        if( num == arr.length ){
            clearInterval( timer );
            fn && fn();
        }
        obj.style[attr] =(oldAttr+arr[ num ]) + "px";
    },20)

}