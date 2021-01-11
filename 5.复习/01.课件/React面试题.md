## 1. react 生命周期函数

最新的生命周期：

- 初始化
  - constructor （初始化状态 - ref - 绑定 this 指向）
  - static getDerivedStateFromProps / componentWillMount(旧)
  - render（返回渲染页面需要的虚拟 dom 对象）
  - componentDidMount（发送 ajax 请求、设置定时器等一次任务）
- 更新
  - static getDerivedStateFromProps / componentWillReceiveProps(旧)
  - shouldComponentUpdate（性能优化，减少重新渲染次数）
  - componentWillUpdate(旧)
  - render
  - getSnapshotBeforeUpdate
  - componentDidUpdate（更新时发请求，注意需要有退出条件）
- 卸载

  - componentWillUnmount(收尾工作，如清除定时器、取消 ajax 请求)

- 即将废弃

  - componentWillMount
  - componentWillUpdate
  - componentWillReceiveProps

- 处理异常
  - static getDerivedStateFromError(error)
    - 通过更新状态 --> 从而渲染显示错误信息的组件
  - componentDidCatch()
    - 记录错误信息

## 2. react 性能优化?

- shouldComponentUpdate
  - 通过对比新旧 state 和 props 来决定是否重新渲染
- PureComponent
  - 实现了新旧 state 和 props 的浅比较
- 为了防止修改原对象，从而让浅比较比较不出来（确保前后数据一定不一样），可以使用 immuable.js

## 3. 为什么虚拟 dom 会提高性能?

- 虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。
- 具体实现步骤如下：
  - 用 JavaScript 对象结构表示 DOM 树的结构
  - 然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。
  - 然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

## 4. 虚拟 DOM diff 算法

- 虚拟 DOM diff 算法主要就是对以下三种场景进行优化：
- tree diff
  - 对树进行分层比较，两棵树只会对同一层次的节点进行比较。(因为 DOM 节点跨层级的移动操作少到可以忽略不计)
  - 如果父节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。
  - 注意：
    - React 官方建议不要进行 DOM 节点跨层级的操作，非常影响 React 性能。
    - 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点。
- component diff
  - 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree（tree diff）。
    - 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
  - 如果不是，直接替换整个组件下的所有子节点。
- element diff

  - 对处于同一层级的节点进行对比。
  - 这时 React 建议：添加唯一 key 进行区分。虽然只是小小的改动，性能上却发生了翻天覆地的变化！
    - 如： A B C D --> B A D C
    - 添加 key 之前： 发现 B != A，则创建并插入 B 至新集合，删除老集合 A；以此类推，创建并插入 A、D 和 C，删除 B、C 和 D。
    - 添加 key 之后： B、D 不做任何操作，A、C 进行移动操作，即可。
  - 建议：在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

- 总结
  - React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
  - React 通过分层求异的策略，对 tree diff 进行算法优化；
  - React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
  - React 通过设置唯一 key 的策略，对 element diff 进行算法优化；
  - 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
  - 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

## 5. 调用 setState 真的是异步吗？

- `setState` 只在 React 合成事件和钩子函数中是“异步”的，在原生 DOM 事件和定时器中都是同步的。
- 如果需要获取“异步”场景的 `setState` 的值 --> `this.setState(partial, callback)` 在 callback 中拿到最新的值
- 如果要在“异步”场景保证同步更新多次 `setState` --> `this.setState((prevState, props) => {return newState}) `
  - 能保证同步更新, 但是外面获取的值还是之前的值

## 6. setState 如何使用？

- this.setState(obj) 更新，多次更新会合并，最后一次生效
- this.setState(obj, callback) callback 会在界面更新后调用
- this.setState(callback) callback 更新，多次更新会依次执行

## 7. React 中 keys 的作用是什么？

- 虚拟 DOM 的 key 的作用?
  - 简单说: key 是虚拟 DOM 对象的标识, 在更新显示时 key 起着极其重要的作用
  - 详细说: 当列表数组中的数据发生变化生成新的虚拟 DOM 后, React 进行新旧虚拟 DOM 的 diff 比较
    - key 没有变
      - item 数据没变, 直接使用原来的真实 DOM
      - item 数据变了, 对原来的真实 DOM 进行数据更新
    - key 变了
      - 销毁原来的真实 DOM, 根据 item 数据创建新的真实 DOM 显示(即使 item 数据没有变)
- key 为 index 的问题
  - 添加/删除/排序 => 产生没有必要的真实 DOM 更新 ==> 界面效果没问题, 但效率低
  - 如果 item 界面还有输入框 => 产生错误的真实 DOM 更新 ==> 界面有问题
  - 注意: 如果不存在添加/删除/排序操作, 用 index 没有问题
- 解决:
  - 使用 item 数据的标识数据作为 key, 比如 id 属性值

## 8. 在生命周期中的哪一步你应该发起 AJAX 请求？

- 我们应当将 AJAX 请求放到 componentDidMount 函数中执行，主要原因有下：
  - 放在 constructor 和 componentWillMount 中都会影响组件初始化渲染速度
  - React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。
    - 所以 componentWillMount 即将废弃
  - 如果是服务器渲染，放在 constructor 和 componentWillMount 中请求会在服务器端和浏览器端都执行一次，不好

## 9. 何为受控组件(controlled component)

- 在 HTML 中，类似 `<input>, <textarea> 和 <select>` 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。
- 简单来讲：受控组件就是做自动收集表单数据的一种组件，通过 onChange 事件来更新

## 10. 何为高阶组件(higher order component)

- 概念：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
- 目的: 能让其他组件复用相同的逻辑
- 当你发现两个组件有重复逻辑时，就使用 HOC 来解决。
- 用法详见：https://juejin.im/post/5c972f985188252d7f2a3eb0

## 11. 组件间通信有哪些方式

- props
  - 子 --> 父，父组件传函数数据给子组件，子组件调用修改父组件数据
  - 父 --> 子，父组件传非函数数据给子组件
  - 兄弟（一般不用）,数据定义在公共的父组件中。
- context
  - 适用于祖孙组件
  - const context = React.createContext()
  - context.Provider / context.Consumer
- pubsub-js
  - 适用于兄弟组件、祖孙组件。
  - pubsub.subscribe('MSG', (msg, data) => {})
  - pubsub.publish('MSG', data)
  - 注意：
    - 先订阅在发布
    - 订阅只能一次，发布可以多次
- redux

  - 保存多个组件共享的数据

- 定义对象保存数据（一般不用）
  - 类似与 redux，在对象中保存，其他组件引入使用
- webstorage
  - 保存在浏览器本地，引入使用
  - 也可以跨页面通信

## 12. 谈谈 redux

- 作用: 集中管理多个组件共享的状态
- 特点: 单一数据源、纯函数、只读 state
- 核心：
  - store
    - 用来集中存储数据的
  - action-creators actions
    - 用来生成 action 对象 {type: xxx, data: xxx}
    - 分为：同步和异步，同步返回值是对象，异步返回值是函数
  - action-types  contants
    - 用来定义 action 对象的 type
  - reducers
    - 根据之前的状态和 action 对象来生成新状态，并更新 store 对象的数据
    - 一种状态数据对应一个 reducer 函数
- 工作流程
  - 组件调用 action-creators 生成 action 对象
  - 组件调用 store 对象的 dispatch 方法，分发 action 对象
  - 此时会自动触发 reducer 函数调用（遍历所有 reducer 函数直到匹配上）
  - reducer 函数一旦调用就会返回一个新的状态
  - 新状态会交给 store 对象管理，从而更新状态
  - 一旦状态更新，就会触发 store.subscribe 订阅的函数，从而重新渲染组件
  - 组件重新渲染就能获取最新的 store 对象的值了
- 扩展概念：
  - UI 组件：负责界面展示，没有 redux 内容
  - 容器组件：负责数据操作，仅有 redux 内容，将其传给 UI 组件

## 13. 前端路由实现原理

- Hash 模式
  - window 对象提供了 onhashchange 事件来监听 hash 值的改变,一旦 url 中的 hash 值发生改变,便会触发该事件。
- History 模式
  - listen 监听历史栈信息变化,变化时重新渲染
  - 使用 pushState 方法实现添加功能
  - 使用 replaceState 实现替换功能

## 14. react 懒加载方案

- react-loadable
  - 是民间 --> 需要额外下载引入
  - 支持服务器渲染
- Suspense 和 lazy
  - 是官方 --> 只需引入
  - 不支持服务器渲染

总结：使用 create-react-app 会将其单独提取成一个 bundle 输出，从而资源可以懒加载和重复利用。

## 15. 什么是状态提升？

- 它允许你在兄弟组件间传递数据”或“它允许你拥有更多纯展示组件，更易复用

## 16. React 和 vue 的区别

https://juejin.im/post/6844903649970241549

## 17. 开放性问题

- 开发中如何调试 React 的错误

  - 借助 React Developer Tools 。
  - 借助 eslint 的报错。
  - 打断点。
  - 打印法。一行行打印

- 开发中遇到了什么困难

  - 一般：开发中遇到某个错误，调试过了， 开发中遇到某个功能，研究/找资料过了
  - 好：开发中如何优化，如何提升团队效率，如何规避/检查错误

- 如果你有无限的时间预算并让你解决/提升/改变你最后一个项目里的一项东西，你会选什么，以及为什么选它？
  - 使用 mobx 取代 redux
  - 使用 react hooks 取代 state
  - 使用 context 组件通信
  - ...

## 18. react 调度/调和算法 fiber（高级）

- 概念：react 的执行流程
- 此文偏难，一般不问，需要掌握者自行说出~ 可跳过
- 具体内容详见两篇文章，大量涉及源码
- https://mp.weixin.qq.com/s/uDIknJ-WeUJnPR8S-HnTww
- https://juejin.im/post/5a2276d5518825619a027f57#heading-0

## 19. React Hooks
让纯函数组件拥有状态数据和生命周期函数
- React.useState
- React.useEffect(callback, [])