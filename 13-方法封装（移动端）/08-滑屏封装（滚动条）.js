/**  by zhangruidong   **/
function swiper(init){
    /*
    init: {
		el: 滑屏的元素,
		dir: 方向 "x"|"y",
		start: fn 开始时的回调
		move: 移动中的回调
		end: 抬起之后的回调
		over: 缓冲结束的回调
	}
*/
    var el = init.el;
    var dir = init.dir?init.dir:"y";
    var scroll = el.children[0];
    var startPoint = {};
    var startEl = {};
    scroll.style.minWidth = "100%";
    scroll.style.minHeight = "100%";
    var transformDir = {
        x: "translateX",
        y: "translateY"
    };
    var isMove = {
        x: false,
        y: false
    };
    var isFirst = false;

    var lastPoint = {}; //上一次手指位置
    var lastTime = 0; //上一次的时间戳
    var	diffPoint = {}; //两次手指之间的距离差
    var diffTime = 0;// 时间差值

    var minTranslate = {};

    css(scroll,"translateX",0);
    css(scroll,"translateY",0);
    css(scroll,"translateZ",0);
    el.addEventListener('touchstart', function(e) {
        init.start&&init.start.call(el);
        var touch = e.changedTouches[0];
        startPoint = {
            x: touch.pageX,
            y: touch.pageY
        };
        startEl = {
            x: css(scroll,"translateX"),
            y: css(scroll,"translateY")
        };

        lastPoint = {
            x: touch.pageX,
            y: touch.pageY
        };
        lastTime = Date.now();
        diffPoint = {
            x: 0,
            y:0
        };
        diffTime = 0;

        minTranslate = {
            x: el.clientWidth - scroll.offsetWidth,
            y: el.clientHeight - scroll.offsetHeight
        };
    });
    el.addEventListener('touchmove', function(e) {
        var touch = e.changedTouches[0];
        var nowPoint = {
            x: touch.pageX,
            y: touch.pageY
        };
        var dis = {
            x: nowPoint.x - startPoint.x,
            y: nowPoint.y - startPoint.y
        };
        getDir(dis);
        var target = startEl[dir] + dis[dir];
        if(target > 0){
            F = dir =="y"?(1 - Math.abs(target/el.clientHeight)):(1 - Math.abs(target/el.clientWidth));
            target *= F;

        } else if(target < minTranslate[dir]){
            var over = (target - minTranslate[dir]);
            F = dir =="y"?(1 - Math.abs(over/el.clientHeight)):(1 - Math.abs(over/el.clientWidth));
            target = minTranslate[dir] + over*F;
        }
        isMove[dir]&&(css(scroll,transformDir[dir],target));


        var nowTime = Date.now();
        diffTime = nowTime - lastTime;
        diffPoint = {
            x: nowPoint.x - lastPoint.x,
            y: nowPoint.y - lastPoint.y
        };
        lastPoint.x = nowPoint.x;
        lastPoint.y = nowPoint.y;
        lastTime = nowTime;
        init.move&&init.move.call(el);
    });
    el.addEventListener('touchend', function(e) {
        isMove = {
            x: false,
            y: false
        };
        isFirst = false;

        var speed = diffPoint[dir] / diffTime;
        speed = diffTime?speed:0;
        if(Date.now() - lastTime > 100){
            speed = 0;
        }
        var target = speed*120;
        target += css(scroll,transformDir[dir]);

        var type = "easeOutStrong";
        if(target > 0){
            target = 0;
            type = "backOut";
        } else if(target < minTranslate[dir]){
            target = minTranslate[dir];
            type = "backOut";
        }

        var time = parseInt(Math.abs(target - css(scroll,transformDir[dir]))*.12);
        var target = dir == "x"?{translateX:target}:{translateY:target};
        mTween({
            el: scroll,
            target: target,
            time: time,
            type: type,
            callIn: function(){
                init.move&&init.move.call(el);
            },
            callBack: function(){
                init.over&&init.over.call(el);
            }
        });
        init.end&&init.end.call(el);
    });

    //获取用户的滑屏方向
    function getDir(dis){
        if(!isFirst){
            if(Math.abs(dis['y']) - Math.abs(dis['x']) > 2){
                isMove.y = true;
                isFirst = true;
            } else if (Math.abs(dis['x']) - Math.abs(dis['y']) > 2){
                isMove.x = true;
                isFirst = true;
            }
        }
    }
}
function swiperBar(init){
    var dir = init.dir?init.dir:"y";
    var el = init.el;
    var scroll = el.children[0];
    var bar = document.createElement("div");
    var scale = 1;
    var startPoint = 0;
    var transformDir = {
        x: "translateX",
        y: "translateY"
    };
    bar.className = "bar";
    bar.style.cssText = "position:absolute;background:rgba(0,0,0,0.5);border-radius:3px;opacity:0;transition: .3s opacity;";
    if(dir == "x"){
        bar.style.left = 0;
        bar.style.bottom = 0;
        bar.style.height = "6px";
    } else {
        bar.style.right = 0;
        bar.style.top = 0;
        bar.style.width = "6px";
    }
    getScale();
    css(bar,transformDir[dir],0);
    el.appendChild(bar);
    swiper({
        el: el,
        dir: dir,
        start: function(){
            startPoint = css(scroll,transformDir[dir]);
            getScale();
            init.start&&init.start.call(el);
        },
        move: function(){
            var nowPoint = css(scroll,transformDir[dir]);
            if(Math.abs(nowPoint - startPoint) > 2){
                bar.style.opacity = 1;
            }
            var dis = -css(scroll,transformDir[dir]);
            css(bar,transformDir[dir],dis*scale);
            init.move&&init.move.call(el);
        },
        end: function(){
            init.end&&init.end.call(el);
        },
        over: function(){
            bar.style.opacity = 0;
            init.over&&init.over.call(el);
        }
    });

    function getScale(){
        if(dir == "x"){
            scale = el.clientWidth/scroll.offsetWidth;
            bar.style.width = el.clientWidth * scale + "px";
        } else {
            scale = el.clientHeight/scroll.offsetHeight;
            bar.style.height = el.clientHeight * scale + "px";
        }
    }
}