// (function(){
//     // 命名函数
//     function add(x, y) {
//         return x + y
//     }
  
//   // 匿名函数,函数表达式
//     let myAdd = function(x, y) { 
//         return x + y;
//     }
// })()

// (function(){
//     // 命名函数
//     function add(x: number, y: number): number{
//         return x + y
//     }
  
//   // 匿名函数,函数表达式
//     let myAdd:(x:string,y:string)=>string = function(x:string, y:string): string{ 
//         return x + y;
//     }
// })()

// (function(){
//     function add(x: number=1, y: number=2): number{
//         return x + y
//     }
//     console.log(add(),add(3,4))

//     function add1(x: number, y?: number): number{
//         return x + y
//     }
//     console.log(add1(1),add1(3,4))
// })()

// (function(){
//     // 扩展运算符  {...obj}
//     function add(x: number,...args: number[]): void{
//         console.log(x,args)
//         // return x + y
//     }
//     console.log(add(3,4,5,6,7,8,9,10))
// })()

// (function(){
//     function add(x: string,y: string): string
//     function add(x: number,y: number): number
//     function add(x: string|number,y: string|number): string|number{
//         // 如果两个参数都是string,就拼接
//         // 如果两个参数都是number,就相加
//         // 都返回结果
//         if(typeof x==="string"&&typeof y==="string"){
//             return x + y;
//         }
//         if(typeof x==="number"&&typeof y==="number"){
//             return x + y;
//         }
//     }
//     console.log(add("1","2"),add(3,4));
//     console.log(add("1",2));
// })()