/**  by zhangruidong   **/
function transform(el,attr,val){
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
function css(el,attr,val){
    var CSS3TRANSFORM = [
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skewX",
        "skewY",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY"
    ];
    for(var i = 0; i < CSS3TRANSFORM.length; i++){
        if(CSS3TRANSFORM[i] == attr){
            return transform(el,attr,val);
        }
    }
    if(typeof val == "undefined"){
        val = parseFloat(getComputedStyle(el)[attr]);
        return val;
    }
    switch(attr){
        case "opacity":
        case "zIndex":
            el.style[attr] = val;
            break;
        default:
            el.style[attr] = val + "px";
    }
}