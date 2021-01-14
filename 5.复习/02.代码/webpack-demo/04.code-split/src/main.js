import "@/index";
import $ from 'jquery';
// import语法,是同步加载
// import()函数,是异步加载,得到的结果是promise对象
// import {fn1,fn2,fn3} from '@/lodash';


document.querySelector('#app').onclick=function(){
    // console.log(import("@/lodash"))
    import(/* webpackChunkName:"lodash"*/"@/lodash").then(({fn1})=>{
        console.log(fn1(1,2))
    })
}
// console.log(fn1(1,2))
console.log('main',$)
console.log("我是Main.JS");