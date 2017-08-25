/**  by zhangruidong   **/
function gesture(init){
    /*
    init: {
		el: el,
		start: start时执行什么函数,
		change: function(e){
			e.scale change时和start时，两根手指之间的距离的缩放值
			e.rotation
			change时和start时,两根手指之间的旋转角度
		},
		end: end时执行什么函数
	}
	回调函数的 e   挂载了方位角和缩放值
    * */
    var el = init.el;
    var isGesture = false;
    var startPoint = 0;//按下时两根手指之间的距离
    var startDeg = 0;  //两根手指的方位角
    el.addEventListener('touchstart', function(e) {
        if(e.touches.length >= 2){
            isGesture = true;
            startPoint = getDis(e.touches[0],e.touches[1]);
            startDeg = getDeg(e.touches[0],e.touches[1]);
            init.start&&init.start.call(el,e);
        }
    });
    el.addEventListener('touchmove', function(e) {
        if(isGesture&&e.touches.length >= 2){
            var nowPoint = getDis(e.touches[0],e.touches[1]);
            var nowDeg = getDeg(e.touches[0],e.touches[1]);
            e.scale = nowPoint/startPoint;//start时 和 move时的缩放比例
            e.rotation = nowDeg - startDeg;
            init.move&&init.move.call(el,e);
        }
    });
    el.addEventListener('touchend', function(e) {
        if(isGesture){
            init.end&&init.end.call(el,e);
            isGesture = false;
        }
    });
    function getDis(point,point2){
        var x = point.pageX - point2.pageX;
        var y = point.pageY - point2.pageY;
        return Math.sqrt(x*x + y*y);
    }
    //Math.atan2 方位角 返回值 弧度
    function getDeg(point,point2){
        var x = point.pageX - point2.pageX;
        var y = point.pageY - point2.pageY;
        return Math.atan2(y,x)*180/Math.PI;
    }
}