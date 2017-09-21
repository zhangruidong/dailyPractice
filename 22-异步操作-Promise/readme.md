# Promise

### 异步&&同步  阻塞&&非阻塞

举个形象的例子

> **老王烧开水的例子**
> 老王想要喝茶，于是他去烧开水，水开需要一段时间，具体时间老王也不知道，水开后如果不管，水会烧干~

* 阻塞模式： 老王一直在水壶旁等着，什么也不干，水开后就去泡茶
* 非阻塞模式： 老王开始烧水后，就去干别的事情，不管水有没有烧开
------------
* 异步：水烧开后，有一个报警器，通知老王水开了
* 同步：水烧开后，不做任何通知

JavaScript通常用的是异步非阻塞模式
一般分为异步非阻塞，同步阻塞
当然，同步也可以实现非阻塞，开启一个定时器，间隔一段时间检查水有没有烧开



### 什么是Promise？

ES6的Promise对象是一个构造函数，用来生成Promise实例。
所谓Promise对象，就是代表了未来某个将要发生的事件（通常是一个异步操作）。它的好处在于，有了Promise对象，就可以将异步操作以同步操作的流程表达出来，**避免了层层嵌套的回调函数**

### Promise

`new Promise(function(resolve,reject){})`

返回Promise实例对象。


### then


`promise.then(resolve,reject)`

返回promise

### catch

捕获前一个回调函数抛出的错误。


### Promise.all

Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。。参数要求拥有iterator接口，并且每一项都是promise实例
`var p = Promise.all([p1,p2,p3])`

p的状态由p1、p2、p3决定，分成两种情况:
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。



### Promise.race

与Promise.all方法类似将多个promise包装成一个新的promise实例,但是其中有一项的状态发生改变新的实例的状态就会随着改变。



### async函数

只要函数名之前加上async关键字，就表明该函数内部有异步操作。该异步操作应该返回一个Promise对象，前面用await关键字注明。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
例如：

```js
async function fn(){
	let data = await ajax ();
	return data;
}

```