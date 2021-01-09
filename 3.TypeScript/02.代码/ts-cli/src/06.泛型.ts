// (function(){
//     // 定义函数时,无法确定后续传入的数据类型,临时声明一个泛型变量,等待后续动态传入
//     function createArray<A>(value:  A, count: number): A[] {
//         const arr: A[] = []
//         for (let index = 0; index < count; index++) {
//           arr.push(value)
//         }
//         return arr
//     }

//       const arr1 = createArray<number>(11, 3)
//       const arr2 = createArray<string>('aa', 3)
//       console.log(arr1[0].toFixed(),arr2[0].split(''))
// })()

// (function(){
//     function swap <K, V> (a: K, b: V): [K, V] {
//         return [a, b]
//       }
//       const result = swap<string, number>('abc', 123)
//       console.log(result[0].length, result[1].toFixed())
// })()

// (function(){
//     interface IbaseCRUD <T> {
//         data: T[]
//         add: (t: T) => void
//         getById: (id: number) => T
//       }

//     //   interface IbaseCRUD{
//     //     data: User[]
//     //     add: (t: User) => void
//     //     getById: (id: number) => User
//     //   }

//       class User {
//         id?: number; //id主键自增
//         name: string; //姓名
//         age: number; //年龄

//         constructor (name, age) {
//           this.name = name
//           this.age = age
//         }
//       }

//       class UserCRUD implements IbaseCRUD <User> {
//         data: User[] = []

//         add(user: User): void {
//           user = {...user, id: Date.now()}
//           this.data.push(user)
//           console.log('保存user', user.id)
//         }

//         getById(id: number): User {
//           return this.data.find(item => item.id===id)
//         }
//       }


//       const userCRUD = new UserCRUD()
//       userCRUD.add(new User('tom', 12))
//       userCRUD.add(new User('tom2', 13))
//       console.log(userCRUD.data)
// })()

// (function () {
//     class GenericNumber<T> {
//         zeroValue: T
//         add: (x: T, y: T) => T
//     }

//     let myGenericNumber = new GenericNumber<number>()
//     myGenericNumber.zeroValue = 0
//     myGenericNumber.add = function (x, y) {
//         return x + y
//     }

//     let stringNumeric = new GenericNumber<string>()
//     stringNumeric.zeroValue = 'abc'
//     stringNumeric.add = function (x, y) {
//         return x + y
//     }

//     console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
// })()

(function(){
    interface Length{
        length:number
    }
    function fn <T extends Length>(x: T): void {
        console.log(x.length);
    }

    fn<string>("123")
})()