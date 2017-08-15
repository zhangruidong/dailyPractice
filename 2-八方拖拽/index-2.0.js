/**  by zhangruidong   **/

var box=document.getElementById("box");
var dir=""; //s-resice  || n-resize   ||   ne-resize    把前面的位置信息存起来  方便处理
var changeCursor=true;   //给缩放（更改cursor）设置一个开关

box.onmousemove=function (ev) {
    if(!changeCursor){return};
    var pos=this.getBoundingClientRect()   // **包含边框
    dir="";    // 先 n s    后  e w
    if(ev.clientY<pos.top+10){//上
        dir+="n";
    }
    if(ev.clientY>pos.bottom-10){//下
        dir+="s";
    }
    if(ev.clientX<pos.left+10){//左
        dir+="w";
    }
    if(ev.clientX>pos.right-10){//右
        dir+="e";
    }
    this.style.cursor=dir+'-resize';
    if(dir==''){
        this.style.cursor='move';
    }
}
box.onmousedown=function (ev) {
    //先把按下时box的数据存放起来
    var original={
        w:box.offsetWidth,
        h:box.offsetHeight,
        l:box.getBoundingClientRect().left,
        t:box.getBoundingClientRect().top,
        x:ev.clientX,
        y:ev.clientY
    };
    console.log(original.w)
    changeCursor=false;
    document.body.style.cursor=box.style.cursor;
    document.onmousemove=function (ev) {
        if(dir.indexOf('e')!=-1){
            box.style.width=original.w+ev.clientX-original.x+'px';
        }
        if(dir.indexOf('s')!=-1){
            box.style.height=original.h+ev.clientY-original.y+'px';
        }
        if(dir.indexOf('w')!=-1){
            box.style.width=original.w+original.x-ev.clientX+'px';
            box.style.left=ev.clientX-(original.x-original.l)+'px';
            if(box.offsetLeft>=original.l+original.w-80){
                box.style.left=original.l+original.w-80+'px';
            }
        }
        if(dir.indexOf('n')!=-1){
            box.style.height=original.h+original.y-ev.clientY+'px';
            box.style.top=ev.clientY-(original.y-original.t)+'px';
            if(box.offsetTop>=original.t+original.h-80){
                box.style.top=original.t+original.h-80+'px';
            }
        }
        if(box.style.cursor=='move'){
            box.style.left=ev.clientX-(original.x-original.l)+'px'
            box.style.top=ev.clientY-(original.y-original.t)+'px'
        }
    }
    document.onmouseup=function () {
        document.onmousemove=null;
        box.style.crusor='default';
        changeCursor=true;
        document.body.style.cursor='default';
    }
    return false;
}