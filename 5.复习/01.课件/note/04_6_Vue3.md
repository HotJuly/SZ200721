### 聊聊Vue3
- 今年9月份发布的正式版
- Vue3支持vue2的大多数特性
- 设计了一套强大的组合API来替代option API: 可读性和可复用性更好
- 更好的支持Typescript
- 使用Proxy代替defineProperty实现数据响应式: 效率更高, 功能更强大
- 重写虚拟DOM的实现和Tree-Shaking: 更小更快
- 新的组件: Fragment / Teleport / Suspense
- 设计了一个新的脚手架工具vite: 开发启动快了很多

### 比较Vue2与Vue3的响应式
#### vue2的响应式

- 核心: 
  - 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

- 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新  (defineProperty)
  - 直接通过下标替换元素或更新length, 界面不会自动更新   arr[1] = {}

#### Vue3的响应式

- 核心: 
  - 通过Proxy(代理):  拦截对data任意属性的任意(13种)操作, 常用3个: 读取属性值, 修改或添加属性, 删除属性
  - 通过 Reflect(反射):  动态对被代理对象的相应属性进行特定的操作
- 解决vue2下面3个不更新界面的问题
  - 给对象添加新属性
  - 删除对象已有属性
  - 直接通过下标替换元素或更新length

### 常用的Composition API
- setup: 所有组合API都在此选项函数中执行(它本身并不是组合API)
- ref : 一般用来定义基本类型数据的响应式
- reactive: 一般用来定义包含多个数据的对象/数组的响应式
- computed: 定义基于已有响应式数据的计算属性(getter/setter)
- watch与watchEffect: 监视响应式数据
- toRefs: 将一个被代理对象中所有属性都转换为ref对象
- onMounted: 当初始化挂载显示后执行回调
