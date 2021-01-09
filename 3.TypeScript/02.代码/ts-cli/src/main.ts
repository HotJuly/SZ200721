// import jQuery from 'jquery';
// jQuery(document.body).appendTo

/*
    string  ->  String
    number  ->  Number
    boolean ->  Boolean
*/
(function(){
    let a:any=123;
    a.c=234;
    // a=new Number(123)
    // a.c=234
    //a=123;
    // a=new Number(123)
    console.log(a,a.c)

    let str:any = "hello";
    str.title = "world"
    // str=new String("hello")
    // str.title="world"
    //str="hello";
    // str=new String("hello")
    console.log(str+str.title)


    // let num:Number =new Number(1);
    // console.log(num)
    // num=123;
    // let num1:number = new Number(2);
})()

