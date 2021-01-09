/*
    JavaScript数据类型(js中,一切都是对象):
        1)基本数据类型(7个)
            string
            number
            boolean
            null
            undefined
            symbol
            bigint
        2)对象数据类型
            Object,Function,Array,NodeList,HTMLCollection...
*/

let str: string = "哈哈";
let num: number = 123;
let flag: boolean = true;

let null1: null = null;
let undefined1: undefined = undefined;

// 注意:null和undefined是所有类型的子类型,非严格模式下
str = null;
num = undefined;
undefined1=null;

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

let list3: [number,string]=[1,"2"];

// console.log(list3[0],list3[1].split(""));

// list1[0]="str";
// list2[0]=true

enum SEX {
    MAN=999,
    WOMAN=666
}

let obj={
    name:"xiaoming",
    sex:999
}

console.log(SEX[obj.sex],SEX)

let b:any ;
b=123;
b=true;

let list4: any[] = [];
list4.push(1)
list4.push("1")

// void代表没有值,而且不能有值
let void1:void =undefined;
let void2:void =null;

// function get():void{
//     return 123;
// }

let obj1: object = {

}
// obj1=123;
obj1=[];


let c: number|string;
c=123;
c="123";

function getLength(a: string|number){
    // 如果a是数字,输出当前数字
    // 如果a是字符串,输出字符串长度
    if((a as string).length){
        return (<string>a).length
    }else{
        return a;
    }
}

console.log(getLength(1),getLength("dsjhashdjkahskjda"));

let d = 123;
// d=true;