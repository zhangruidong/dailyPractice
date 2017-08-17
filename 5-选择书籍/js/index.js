var text=document.getElementById('text');
var list=document.getElementById('list');
var lis=document.getElementsByTagName('li');
var arr=[];
var num=0;
arr.length=10;

for(var i=0;i<lis.length;i++){
    lis[i].index=i;
    lis[i].onclick=function (e) {
        var span=this.getElementsByTagName('span')[0];
        if(!e.ctrlKey){
            var onOff=arr[this.index];
            for(var i=0;i<arr.length;i++){
                arr[i]='';
                lis[i].className='';
            }
            if(onOff){
                this.className='';
                arr[this.index]='';
                text.value=arr.join('')
            }else {
                this.className='selected';
                arr[this.index]='《'+span.innerHTML+'》';
                text.value=arr.join('');
            }

        } else {
            if(arr[this.index]){
                this.className='';
                arr[this.index]='';
                text.value=arr.join('')
            }else {
                this.className='selected';
                arr[this.index]='《'+span.innerHTML+'》';
                text.value=arr.join('')
            }
        }

    }
}
document.onkeydown=function (e) {
    var direction='down';
    if(e.keyCode==38){//up
        changeColor()
        if(direction=='down'){
            direction='up';
            num=num-2;
            num=num<0?0:num;
            lis[num].className='hover';
            num++;
        }else{
            lis[num].className='hover';
            num--;
            num=num<0?0:num;
        }



    }else if(e.keyCode==40){ //down
        changeColor()
        if(direction=='down'){
            if(num==arr.length){
                lis[num-1].className='hover';
                return;
            }
            lis[num].className='hover';
            num++;
            num=num>arr.length?arr.length:num;
        }else{
            direction='down';
            num=num+2;
            num=num>arr.length-1?arr.length-1:num;
            lis[num].className='hover';
            num--;
        }

    }
    console.log(num)
    if(e.keyCode==13 && !e.ctrlKey){
        if(num==0){
            return;
        }
        var li=lis[num-1];
        var span=li.getElementsByTagName('span')[0];
        var onOff=arr[li.index];
        for(var i=0;i<arr.length;i++){
            arr[i]='';
            lis[i].className='';
        }
        if(onOff){
            li.className='';
            arr[li.index]='';
            text.value=arr.join('')
        }else {
            li.className='selected';
            arr[li.index]='《'+span.innerHTML+'》';
            text.value=arr.join('');
        }

    }
}

function changeColor() {
    for(var i=0;i<lis.length;i++){
        if(arr[i]){
            lis[i].className='selected';
        }else{
            lis[i].className='';
        }
    }
}

