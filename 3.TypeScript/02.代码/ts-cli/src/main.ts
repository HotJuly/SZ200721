(function(){
    // 接口初体验
    // 可以对对象内的属性进行约束
    interface IPerson{
        name: string;
        age: number;
        sex?: string;
        readonly phone:number;
        eat: (food: string) => void
    }

    let obj: IPerson ={
        name:"xiaoming",
        age:18,
        phone:177777,
        eat(food){
            console.log(`我吃了${food}`)
        }
    }

    obj.eat("苹果")
    // obj.phone=18888999

    let obj2: IPerson ={
        name:"xiaowang",
        age:28,
        sex:"男",
        phone:1888888,
        eat(food){
            console.log(`我吃了${food}`)
        }
    }
    // const vs readonly
    // const->定义变量(常量)
    // readonly->定义属性

    interface A{
        eat:(food: string)=>string
    }

    interface P extends A{
        speak:(content: any)=> string
    }

    class Person implements P{
        name:string;
        constructor(name: string){
            this.name=name;
        }
        speak(content){
            return this.name+"正在说:"+content
        }
        eat(food){
            // console.log()
            return  `我吃了${food}`
        }
    }

    let p = new Person("xiaolv");
    console.log(p.speak('爱上一匹野马,可我的家里没有草原'));
})()