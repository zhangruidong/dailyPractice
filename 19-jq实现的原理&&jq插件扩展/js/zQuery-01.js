(function (global,factory) {
    factory(global);
})(window,function (global) {
   const version = "0.0.1";
   let zQuery = function (selector) {
       return new zQuery.fn.init(selector)
   };
   zQuery.fn=zQuery.prototype;
   zQuery.fn.init=function (selector) {
        switch (typeof selector){
            case 'string':     // css 选择器
                const element= document.querySelectorAll(selector);
                for (let i = 0; i < element.length; i++) {
                    this[i]= element[i];
                }

                // 添加一个length属性
                this.length=element.length;
                break;
            case 'object':
                if(Array.isArray(selector)){
                    selector.forEach((item,index)=>{
                        this[index]=item;
                    });
                    this.length=selector.length;
                }
        }
   };


   window.zQuery=window.$=zQuery;
});