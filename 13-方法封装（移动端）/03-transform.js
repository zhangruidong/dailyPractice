/**  by zhangruidong   **/
function transform(el,attr,val){//如果没有传val 就是获取，否则设置
    // el.style.transform = attr+"("+val+"px)";
    if(!el.transform){
        el.transform = {};
    }
    if(typeof val == "undefined"){
        return el.transform[attr];
    } else {
        el.transform[attr] = val;
        var inner = "";
        for(var s in el.transform){
            switch(s){
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    inner += s+'('+el.transform[s]+'deg)';
                    break;
                case "translateX":
                case "translateY":
                case "translateZ":
                    inner += s+'('+el.transform[s]+'px) ';
                    break;
                case "scale":
                case "scaleX":
                case "scaleY":
                    inner += s+'('+el.transform[s]+')';
            }
        }
        el.style.WebkitTransform = el.style.transform = inner;
    }
}