var box=document.getElementById("box");
var content=document.getElementById("content");
var bar=document.getElementById("bar");
var inner=document.getElementById("inner");

inner.style.height=bar.clientHeight*(box.clientHeight/content.offsetHeight) +"px";
var maxH=bar.clientHeight-inner.offsetHeight;
var t=inner.offsetTop;
var timer=null;


/*
* 载入页面后，t的值可能不等于0；  当t不等于0 的时候需要将页面滚动到t目标位置
* */



window.onbeforeunload=function(){
    localStorage.setItem("scroll",t);
}
t=Number(localStorage.getItem("scroll"));
inner.style.top=t+"px";
content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";

/*
* 可能content的高度 小于  box 的高度  ，这时 bar就没有必要显示出来
* */
if(box.clientHeight/content.offsetHeight>=1){
    bar.style.display="none";
}else{
    addScroll(inner,up,down);
    addScroll(content,up,down);
}

bar.onmousedown=function (e) {//滚动条拖拽
    if(e.target==bar){
        return;
    }
    clearInterval(timer);
    var disY=e.clientY-(inner.offsetTop+bar.clientTop+box.clientTop);
    // var disY=e.clientY-inner.getBoundingClientRect().top;
    // todo   ?为何用 getBoundingClientReact 会出现bug（move会跳一下）
    document.onmousemove=function (e) {
        t=e.clientY-disY;
        if(t<0){t=0};
        if(t>maxH){t=maxH};
        inner.style.top=t+"px";
        content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";
    }
    document.onmouseup=function () {
        document.onmousemove=null;
    }
    return false;
}

bar.onclick=function (e) {//点击事件
    if(e.target==bar){
        target=e.clientY-bar.getBoundingClientRect().top-inner.clientHeight/2;
        target=Math.floor(target);   //这里  target要取整   不然会出现判断终止条件时 出错
        clearInterval(timer);
        timer=setInterval(function () {
            if(target-t>0){
                t++;
                if(t>maxH){
                    t=maxH;
                    clearInterval(timer)
                }
                inner.style.top=t+"px";
                content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";
            }else{
                t--;
                if(t<0){
                    t=0;
                    clearInterval(timer);
                }
                inner.style.top=t+"px";
                content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";
            }
            // console.log(t+":"+target)
            if(t==target){
                clearInterval(timer);
            }
        },10)

    }
    return false;
}

function up() {//鼠标向上滚动   向下翻页
    clearInterval(timer);
    t+=10;
    if(t>maxH){
        t=maxH;
    }
    inner.style.top=t+"px";
    content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";
}
function down() {//鼠标向下滚动  向上翻页
    clearInterval(timer)
    t-=10;
    if(t<0){
        t=0
    }
    inner.style.top=t+"px";
    content.style.top=(t/maxH)*(box.clientHeight-content.offsetHeight)+"px";
}

function addScroll(obj,upFn,downFn){
    obj.onmousewheel = fn;
    obj.addEventListener("DOMMouseScroll",fn);
    function fn(e){
        if( e.wheelDelta ){//chrome
            if( e.wheelDelta > 0 ){//上
                downFn();
            }else{//下
                upFn();
            }
        }else if( e.detail ){//firefox
            if( e.detail < 0 ){//上
                downFn();
            }else{//下
                upFn();
            }
        }
    }
}