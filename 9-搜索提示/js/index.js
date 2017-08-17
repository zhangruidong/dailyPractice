/*
* 每个li 有三种状态
   通过他的class表现出来
   ""    "hover"    "selected"
 * */


var text=document.getElementById('text');
var list=document.getElementById('list');
var lis=list.getElementsByTagName('li');
var as=list.getElementsByTagName('a');

var numH=-1;
var sel=[];

text.onfocus=function () {
    list.style.opacity=1;
}
text.onclick=function () {
    list.style.opacity=1;
}


/*点击到li的同时可能会点击到a标签，会让a获得焦点，
如果此时按enter会触发a的点击事件，
a的点击事件会冒泡到li上，触发li的点击事件*/
for(var i=0;i<as.length;i++){  //让a永远不能获取焦点
    as[i].onfocus=function () {
        this.onblur;   //这里要用this  不要用as[i]
    }
}

for(var i=0;i<lis.length;i++){
    lis[i].index=i; //添加索引值
    lis[i].onmouseover=function () {
        numH=this.index;
        clear();
        selected(sel);
        hover(numH);
        inputText()
    }
    lis[i].onclick=function (e) {
        if(e.ctrlKey){//按住Ctrl
            if(inArray(sel,numH)==-1){ //sel中不存在
                sel.push(numH);
            }else{ //sel中存在
                sel.splice(inArray(sel,numH),1)
            }
            clear()
            selected(sel);
            hover(numH)
            inputText()
        }else{//没有按住Ctrl
            if(inArray(sel,numH)==-1){ //sel中不存在
                sel=[numH];
            }else{ //sel中存在
                sel=[];
            }
            clear()
            selected(sel);
            hover(numH)
            inputText();
            list.style.opacity=0;
        }
    }
}

document.onkeydown=function (e) {
    switch (e.keyCode){
        case 38://up
            numH--;
            if(numH<0){
                numH=lis.length-1;
            }
            clear()
            selected(sel);
            hover(numH)
            inputText()
            break;

        case 40://down
            numH++;
            if(numH==lis.length){
                numH=0;
            }
            clear()
            selected(sel);
            hover(numH)
            inputText()
            break;

        case 13://enter
            if(e.ctrlKey){//按住Ctrl的时候
                if(inArray(sel,numH)==-1){ //sel中不存在
                    sel.push(numH);
                }else{ //sel中存在
                    sel.splice(inArray(sel,numH),1)
                }
                clear()
                selected(sel);
                hover(numH)
                inputText()
            }else{//没有按住ctrl的时候
                if(inArray(sel,numH)==-1){ //sel中不存在
                    sel=[numH];
                }else{ //sel中存在
                    sel=[];
                }
                clear()
                selected(sel);
                hover(numH);
                inputText();
                list.style.opacity=0;
            }
        default:
            break;

    }
}




function clear() {
    for(var i=0;i<lis.length;i++){
        lis[i].className="";
    }
}


/*
* 有时候封装的函数能够合并，但合并后的当功能需要拓展的时候，操作不方便
* 尽量使封装的函数功能单一，这样可拓展新会更强，代码阅读的时候清晰易懂
* */
function hover(n) {  //当hover的时候 清除所有的class
    lis[n].className="hover";
}
function selected(arr) {//可能出现的情况  不止有一个元素被选中，所以传进来的参数是一个数组
    for(var i=0;i<arr.length;i++){
        lis[arr[i]].className="selected"
    }
}
function inArray(arr,item) {
    for(var i=0;i<arr.length;i++){
        if(arr[i]==item){return i}  //如果存在就返回第一次出现的位置
    }
    return -1;
}
function inputText() {
    sel.sort(function (a,b) {
        return a-b;
    })
    var str=""
    for(var i=0;i<sel.length;i++){
        str+="《"+lis[sel[i]].lastElementChild.lastElementChild.innerHTML+"》";
    }
    text.value=str;
}

