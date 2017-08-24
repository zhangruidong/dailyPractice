/**  by zhangruidong   **/

/*
	滑屏:
		1. 滑屏的主体功能 -- 滑屏元素移动
		2. 上下滑屏 和 左右滑屏之间的冲突解决
			1) 获取用户滑屏的方向
			2) 一旦获取到方向，就不再获取
			3) 用户的滑屏方向必须和我们要移动的方西一致执行元素移动
		3. 缓冲动画：
			1) 获取最后一次的速度 =  (距离/时间)
				1. 获取距离 = 本次的手指位置 - 上一次的手指位置
				2. 时间 = 本次的时间戳 - 上一次的时间戳
			2) 根据速度求出缓冲距离
				1) 速度越大，距离越大 简单理解 距离 = speed放大了N倍之后的结果
			3) 动画时间
					距离越大 时间越大
					时间 = 距离 * n倍结果

		4. 范围限制:
				1) move时范围限制
					1) 超出距离大，越难拉动
						1. 定义一个拉力系数
						2. 获取超出的距离
						3. 根据超出的距离修改拉力系数的值,超出的越多，系数越小
						4.  超出的距离 * 拉力系数 + 最大(最小值)

				2) end时范围限制
					获取在什么地方超出

		5. 回调函数 -- 各种状态的对外接口
    */
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