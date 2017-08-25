/**  by zhangruidong   **/
/*
	检测两次摇动之间的幅度差
		1) 两次摇动之间有一定的时间间隔
		2) 两次之间的幅度差，那我们需要知道上一次的数值
	当幅度差 大于一定时间之后，我们就可以认定他在摇一摇

	当用户摇一摇之后，再去处理相关的内容;
*/
// shake({
// 	range:70,
// 	callBack:function() {
// 		alert("您执行了摇一摇");
// 	}
// });
function shake(init){
    var Range = init.range || 60;
    // alert(Range)
    var lastTime = Date.now();
    var lastX = 0;
    var lastY = 0;
    var lastZ = 0;
    var isShake = false;
    window.addEventListener('devicemotion', function(e) {
        var nowTime = Date.now();
        if(nowTime - lastTime > 100){
            var motion = e.accelerationIncludingGravity;
            var x = motion.x;
            var y = motion.y;
            var z = motion.z;
            //两次之间的幅度差值
            var nowRange = Math.abs(x -lastX) + Math.abs(y -lastY) + Math.abs(z -lastZ);
            if(nowRange > Range){
                isShake = true;
            }
            /*isShake 剧烈摇动过手机，nowRange < 20即将停止摇动*/
            if(isShake&& nowRange < 20){
                init.callBack && init.callBack()
                isShake = false;
            }
            lastTime = nowTime;
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    });
}