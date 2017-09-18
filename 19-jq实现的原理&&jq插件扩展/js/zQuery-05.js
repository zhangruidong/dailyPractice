(function (global,factory) {
    factory(global);
})(window,function (global) {
   const version = "0.0.1";
   let zQuery = function (selector,context) {
       return new zQuery.fn.init(selector,context)
   };
   zQuery.fn=zQuery.prototype;
   zQuery.fn.init=function (selector,context) {
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
                break;
        };
        this.prevObject=context;
   };
   zQuery.fn.init.prototype.css=function (attr,value) {
       this.each(function () {
           this.style[attr]=value;
       });
       return this
   };
    zQuery.fn.init.prototype.each=function (callback) {
        for (let i = 0; i < this.length; i++) { // 注意 这里this并不是数组
            callback.call(this[i],i,this[i]);
        }

    };
    zQuery.fn.init.prototype.find=function (selector) {
        let elements = [];
        this.each(function() {
            elements = elements.concat(...this.querySelectorAll(selector));
        });

        return zQuery(elements,this);

    };
    zQuery.fn.init.prototype.end= function () {
        if(this.prevObject){
            return this.prevObject;
        }
    };
    zQuery.fn.extend = function(obj) {
        for (let attr in obj) {
            zQuery.fn.init.prototype[attr] = obj[attr];
        }
    };

   window.zQuery=window.$=zQuery;
});