/**  by zhangruidong   **/
$.fn.extend({
    drag(){
        this.on("mousedown",function (e) {  //注意此处 this 为 jQuery 对象
            //此时this为触发该事件的dom对象
            const $this=$(this);
            let disX=e.clientX-$(this).position().left;
            let disY=e.clientY-$(this).position().top;
            $(document).on("mousemove.drag",function (e) {
                $this.css({
                    "left":e.clientX-disX,
                    "top":e.clientY-disY
                })
            });
            $(document).on("mouseup.drag",function () {
                $(this).off(".drag")
            });
            return false;
        })
    }
});