// (function(){
//     class Greeter {
//         // static的属性会直接给构造函数,没加static的属性会交给实例对象,方法会直接交给原型对象
//         static state=123
//         // 声明属性
//         message: string
      
//         // 构造方法
//         constructor (message: string) {
//           this.message = message
//         }
      
//         // 一般方法
//         // Greeter.prototype.greet=function(){
//         //   return 'Hello ' + this.message
//         // }
//         greet (): string {
//           return 'Hello ' + this.message
//         }
//       }
      
//       // 创建类的实例
//       const greeter = new Greeter('world')
//       // 调用实例的方法
//       console.log(Greeter.state)


// })();

// (function(){
//     class Animal{
//         eat(){
//            console.log('eating') ;
//         }
//     }
//     class Dog extends Animal{
        
//     }
//     /*
//         Dog.prototype=new Animal();
//         Dog.prototype=animal;
//         Dog.prototype.constructor=Dog;
//     */

//     let dog = new Dog();
//     /*
//         继承原理:通过原型链实现的
//         继承的作用:子类实例可以使用到父类原型对象上的方法
//         原型链->隐式原型链
//         dog.eat()
//         dog.__proto__.eat()=Dog.prototype.eat()=animal.eat()
//         animal.eat()
//         animal.__proto__.eat()=Animal.prototype.eat()
//         dog.__proto__ === Dog.prototype
//         一个构造函数只有一个原型对象
//     */
//     dog.eat()
// })();

// (function(){
//     class Person{
//         public name: string;
//         protected age: number;
//         private sex: string;
//         readonly phone: number;
//         constructor(name: string,age: number,sex: string,phone: number){
//             this.name=name;
//             this.age=age;
//             this.sex=sex;
//             this.phone=phone;
//         }
//         eat(){
//            console.log('eating') ;
//         }
//         say(){
//             console.log('我的性别是'+this.sex)
//         }
//     }
//     class Man extends Person{
//         speak(){
//             console.log('我今年'+this.age)
//         }
//     }

//     let man = new Man("xiaohong",22,"女",177777);
//     console.log(man.name)
//     man.speak();
//     man.say();
//     man.phone=888888;
//     console.log(man)
// })();

// (function(){
//     class Person {
//         firstName: string = 'A'
//         lastName: string = 'B'

//         // Object.defineProperty
//         get fullName () {
//           return this.firstName + '-' + this.lastName
//         }
//         set fullName (value) {
//           const names = value.split('-')
//           this.firstName = names[0]
//           this.lastName = names[1]
//         }
//       }
      
//       const p = new Person()
//       console.log(p.fullName)
      
//       p.firstName = 'C'
//       p.lastName =  'D'
//       console.log(p.fullName)
      
//       p.fullName = 'E-F'
//       console.log(p.firstName, p.lastName)

// })()


(function(){
    abstract class Animal {

        abstract cry ()
      
        run () {
          console.log('run()')
        }
    }

    class Dog extends Animal{
        cry(){
            console.log('cry')
        }
    }
    new Dog().run();
})()