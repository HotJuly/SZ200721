# Vue原理
## 响应式原理
响应式：当数据发生变化，数据变，页面也变

1. 数据代理：将data数据代理到实例对象上（方便将来操作data数据）
  遍历所有data数据，通过Object.defineProperty()方法
  将data中数据定义在实例对象上
  内部就是通过get定义属性读取的方法，实际读取的是原数据_data
  内部就是通过set定义属性设置的方法，实际设置的是原数据_data

2. 数据劫持
  遍历所有data数据，进行重新定义，将其定义成响应式。
  也是通过Object.defineProperty()方法，重新定义属性get和set
  此时会通过闭包的方式保存了一个dep对象，
    get中将来通过dep就能建立dep和watcher的联系
    set中将来通过dep就能通知所有watcher去更新用户界面
  
3. 模板解析
  将指令语法/插值语法编译解析
  1. 将元素节点转换成文档碎片节点 fragment
  2. 编译模板
    取出当前节点所有子节点。进行遍历
    判断节点是元素节点还是文本节点
      如果是元素节点，要编译指令语法 
        取出当前元素所有属性
          判断属性是不是指令属性
            判断是事件指令 v-on
              给元素绑定事件，同时回调函数会通过bind方法强制改变this指向为vm
            判断是普通指令 
              就会相应的解析（v-text / v-html）
              最终会new Watcher()，new Watcher时就会建立起dep和watcher的联系（你中有我，我中有你，互相保存）
      如果是文本节点，要编译插值语法
        最终会给元素设置textContext，值为表达式对应的值

  3. 将编译后的模板添加到（el元素中）页面中生效

将来当用户去更新data数据时，this.person.name = 'xxx'
此时先会触发 数据代理设置的属性的set方法，方法中实际上设置的是_data（原数据）的值
又会触发数据劫持属性的set方法，此时就会更新data数据，同时通过dep.notify()
通知所有当前保存的watcher去更新用户界面，从而达到响应式~ 

## 双向数据绑定原理
是通过v-model来实现双向数据绑定原理

v-model会给元素绑定value属性(数据就从数据Model流向页面View)，和绑定input事件
当用户输入数据，会触发input事件，在input事件中会更新data数据（数据就从页面View流向数据Model）