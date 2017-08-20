var inp=document.getElementsByTagName("input")[0];
var list=document.getElementById("list");
var lis=list.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
    lis[i].move=true;
    addScroll(lis[i],up,down);
}
document.onkeydown=function (e) {
    if(e.keyCode==13){
        var number=inp.value;
        if(/^\d{6}$/.test(number)){
            for (var i = 0; i < number.length; i++) {
                lis[i].firstElementChild.src="img/"+number.charAt(i)+".png";
                lis[i].lastElementChild.src="img/"+number.charAt(i)+".png";
            }
            inp.value=""
        }else{
            alert("请输入六位数字")
        }
    }
}
function addScroll(obj,upFn,downFn){
    obj.onmousewheel = fn;
    obj.addEventListener("DOMMouseScroll",fn);
    function fn(e){
        if( e.wheelDelta ){//chrome
            if( e.wheelDelta > 0 ){//上
                downFn(obj);
            }else{//下
                upFn(obj);
            }
        }else if( e.detail ){//firefox
            if( e.detail < 0 ){//上
                downFn(obj);
            }else{//下
                upFn(obj);
            }
        }
    }
}
function up(obj) {//   回滚
    //margintop ++  确保可见的img在下面
    if(!obj.move) return;
    var imgs=obj.getElementsByTagName("img");
    obj.move=false;
    if(obj.offsetTop!=287){//不正常
        var num=Number(imgs[0].src.charAt(imgs[0].src.length-5))
        var next=num+1>9?0:num+1;
        imgs[1].src="img/"+next+".png";
        var temp=imgs[0].src;
        imgs[0].src=imgs[1].src;
        imgs[1].src=temp;
        obj.style.marginTop="-58px";
    }else{
        var num=Number(imgs[1].src.charAt(imgs[1].src.length-5))
        var next=num+1>9?0:num+1;
        imgs[0].src="img/"+next+".png";
    }
    move(obj,{"marginTop":0},200,function () {
        obj.move=true;
        obj.style.marginTop="-58px";
        var temp=imgs[0].src;
        imgs[0].src=imgs[1].src;
        imgs[1].src=temp;
    })
}
function down(obj) {//   向前滚
    //margintop -- 确保可见的img在上面  默认
    if(!obj.move) return;
    var imgs=obj.getElementsByTagName("img");
    obj.move=false;
    if(obj.offsetTop!=345){//不正常
        var num=Number(imgs[1].src.charAt(imgs[1].src.length-5))
        var next=num-1<0?9:num-1
        imgs[0].src="img/"+next+".png";
        var temp=imgs[0].src;
        imgs[0].src=imgs[1].src;
        imgs[1].src=temp;
        obj.style.marginTop="0px";
    }else{
        var num=Number(imgs[0].src.charAt(imgs[0].src.length-5))
        var next=num-1<0?9:num-1
        imgs[1].src="img/"+next+".png";
    }
    move(obj,{"marginTop":-58},200,function () {
        obj.move=true;
        obj.style.marginTop="0px";
        var temp=imgs[0].src;
        imgs[0].src=imgs[1].src;
        imgs[1].src=temp;
    })
}
