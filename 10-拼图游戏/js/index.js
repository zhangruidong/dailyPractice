var btnL=document.getElementById("btnL");
var btnR=document.getElementById("btnR");
var box=document.getElementById("box");
var divs=box.getElementsByTagName("div");

var boxW=box.clientWidth;
var boxH=box.clientHeight;
var cut=2;
var w,h;//div 的宽高
var ranArr=[];//乱序的数组
var crashNum;//被碰到div的index
var timer=null;
var num=0;//时间

btnL.value="第"+(cut-1)+"关";
timer=setInterval(function () {
    num++;
    btnR.value=num+"秒"
},1000)

createDiv(cut);
box.onmousedown=function (e) {
    var obj=e.target;
    //之前存好的w h  obj.l   obj.t   可以方便使用
    var disX=e.clientX-obj.l;
    var disY=e.clientY-obj.t;
    var newL;
    var newT;
    document.onmousemove=function (e) {
        obj.style.left=e.clientX-disX+"px";
        obj.style.top=e.clientY-disY+"px";
        newL=Math.round((e.clientX-disX)/w)*w;
        newT=Math.round((e.clientY-disY)/h)*h;
        crash(newL,newT);
    }
    document.onmouseup=function () {
        obj.style.left=obj.l+"px";
        obj.style.top=obj.t+"px";
        obj.style.backgroundPosition=(divs[crashNum].x)+"px "+(divs[crashNum].y)+"px";
        divs[crashNum].style.backgroundPosition=(obj.x)+"px "+(obj.y)+"px";
        var tempX=obj.x;
        var tempY=obj.y;
        var tempRan=obj.ran;
        obj.x=divs[crashNum].x;
        obj.y=divs[crashNum].y;
        obj.ran=divs[crashNum].ran;
        divs[crashNum].x=tempX;
        divs[crashNum].y=tempY;
        divs[crashNum].ran=tempRan;
        divs[crashNum].style.opacity=1;
        if(divs[crashNum].index==divs[crashNum].ran){
            check();
        }
        document.onmousemove=document.onmouseup=null;
    }
    return false;
}

function check() {
    for (var i = 0; i < divs.length; i++) {
        if(divs[i].index!=divs[i].ran){
            return
        }
    }
    setTimeout(function () {
        alert("恭喜你");
        createDiv(++cut);
        btnL.value="第"+(cut-1)+"关";
        clearInterval(timer);
        num=0;
        btnR.value=num+"秒"
        timer=setInterval(function () {
            num++;
            btnR.value=num+"秒"
        },1000)
    },200)
}

function crash(l,t) {//检测应该和谁调换背景图
    for (var i = 0; i < divs.length; i++) {
        if(divs[i].l==l && divs[i].t==t){
            divs[i].style.opacity=0.5;
            crashNum=divs[i].index;
        }else{
            divs[i].style.opacity=1;
        }
    }
}

//先浮动定位，然后浮动定位转固定定位
function createDiv(cut) {
    box.innerHTML="";
    for (var i = 0; i < cut*cut; i++) {
        var div=document.createElement("div");
        w=parseInt(boxW/cut);
        h=parseInt(boxH/cut);
        div.style.width=w+'px';
        div.style.height=h+'px';
        div.index=i;
        box.style.width=w*cut+'px';
        box.style.height=h*cut+'px';
        box.appendChild(div)
    }
    ranArr=ran();//获取乱序数组
    for (var i = 0; i < divs.length; i++) {
        divs[i].l=divs[i].offsetLeft;
        divs[i].t=divs[i].offsetTop;
        divs[i].x=-divs[i].l;
        divs[i].y=-divs[i].t;
        divs[ranArr[i]].ran=i
        divs[ranArr[i]].style.backgroundPosition=divs[i].x+"px "+ divs[i].y+"px";   //注意第一"px"中包含了一个空格
        /*打乱之后要对x,y 重新赋值*/
        divs[ranArr[i]].xx=divs[i].x;
        divs[ranArr[i]].yy=divs[i].y;
        divs[ranArr[i]].style.backgroundSize=box.clientWidth+"px "+box.clientHeight+"px";
    }
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.position="absolute";
        divs[i].style.left=divs[i].l+"px";
        divs[i].style.top=divs[i].t+"px";
        divs[i].x=divs[i].xx;
        divs[i].y=divs[i].yy;
        divs[i].style.float="none";
    }
}

/*
断乱顺序
    可能出现第一次打乱后 排序仍然是正确的
    利用递归的方式，知道顺序确定打乱
* */
function ran() {
    var arr=[];
    for (var i = 0; i < cut*cut; i++) {
        arr[i]=i;
    }
    aaa();
    return arr;
    function aaa() {
        arr.sort(function (a,b) {
            return Math.random()-0.5
        })
        for (var i = 0; i < cut*cut; i++) {
            if(arr[i]!=i){
                return ;
            }
        }
        aaa();
    }
}