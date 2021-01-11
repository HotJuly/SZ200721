# Vue 复习

https://juejin.im/post/6844904079206924295

- 谈谈 mvvm
  - m - model 数据层：保存数据
  - v - view 视图层：展示页面
  - vm - ViewModel
    - 通过 vm 可以将 model 层数据展示在 view 层
    - 通过 vm 可以将 view 层用户输入的数据，来更新 model 层数据

- mvvm 和 mvc 的区别
  - m - model
  - v - view
  - c - controller 控制层
    - 负责将 model 数据流向 view 层

- react 和 vue 的区别

  - react jsx 语法 / vue template 模板语法
    - 组件化
  - react 单向数据流 / vue 双向数据流
  - vue 有指令，react 没有
  - 更新方式不一样 / diff 算法不一样
  - vue 很多语法（通信方式、computed），react 没有

- 谈谈 vue 生命周期

  - 8 个周期
    - 项目中如何使用
  - 额外三个生命周期

- vue 组件间通信方案

  - props
  - pubsub 没啥用
  - 自定义事件 / 全局事件总线
  - ref
  - $children $parent
  - 插槽
  - model
  - .sync
  - vuex
  - 路由传参
  - 适用于什么场景，项目中如何使用

- 谈谈 vuex

  - 用于集中式管理多个组件共享 state 数据
  - 组成：

    - state
      - 管理 state 数据的仓库
      - 是一个对象
    - actions
      - 包含 n 个用来间接修改数据的方法对象
      - 一般会进行异步操作
    - mutations
      - 包含 n 个用来直接修改数据的方法对象
      - vue devtools 监视数据的变化
    - getters
      - 计算属性数据
      - 一般用来简化使用 state
    - modules

      - 用来 vuex 模块化
      - 通过 require.context 来汇总所有 vuex 的 module

    - 操作

      - 读取 state
        - mapState(['xxx'])
        - mapGetters(['xxx'])
        - this.\$store.state.xxx
      - 更新 state
        - mapActions(['xxx']) this.xxx
        - mapMutations(['xxx']) this.xxx
        - this.\$store.dispatch('xxx', data)
        - this.\$store.commit('xxx', data)

    - 更新 state 工作流程
      - 通过 dispath 触发 action 函数，action 函数中调用 commit 触发 mutation，mutaion 直接更新 state 数据
      - 直接操作 mutation 更新 state 数据

- 谈谈 vue-router

  - 用来开发单页面应用 SPA 的
  - 内部包含：
    - router-link 用来路由链接跳转
    - router-view 用来显示相应的路由组件
  - 路由导航守卫
    - 全局
      - beforeEach
        - 权限管理
      - afterEach
    - 局部
      - beforeRouteEnter
      - beforeRouteUpdate
      - beforeRouteLeave
      - 一般用少
  - 路由传参
    - params
      - this.\$route.params
    - query
      - this.\$route.query

  ```
      给一个路由组件传参
      /home/messages/detail/1?name=jack&age=18
          params参数 1
          this.$route.params
          query参数 ?name=jack&age=18
          this.$route.query
          第二种写法：
          :to="{
              name: 'detail', // 会去路由配置找相应的name
              params: { id: message.id },
              query: {
              name: 'jack',
              age: 18
              }
          }"
          组件内部使用：this.$route
          将其变成props方式：
          props: function(route) {
              console.log("router", route); // $route
              // 返回值对象，对象里面的数据就会以props方式传递到当前组件中
              return {
              ...route.params,
              ...route.query
              };
          }

      给多个路由组件传相同参
      props
          将来router-view显示哪个组件，就给哪个组件传参
          <router-view :xxx="xxx"></router-view>
          组件内部需要声明接受props
          使用：this.xxx

  ```

- 各种指令
- vue 双向数据绑定原理/响应式原理
- 特殊属性 $attrs / $listeners

## 通信方式列表:

    1) props
    2) vue自定义事件
    3) 全局事件总线
    4) v-model
    5) .sync
    6) $attrs与$listeners
    7) $ref, $children与$parent
    8) provide与inject
    9) Vuex
    10) 插槽 ==> 作用域插槽

## 根据通信的 2 个组件间的关系来选择一种通信方式

    父子
    	props
    	vue自定义事件
    	v-model
    	.sync
    	$ref, $children与$parent
    	插槽 ==> 作用域插槽
    	$attrs与$listeners
    祖孙
    	provide与inject
    兄弟或其它/任意
    	全局事件总线
    	Vuex

## 1. 方式一: props

    1). 实现父向子通信: 属性值是非函数
    2). 实现子向父通信: 属性值是函数
    应用: 最基本, 用得最多的方式

## 2. 方式二: vue 自定义事件

    1). 用来实现子组件向父组件通信
    2). 相关语法:
        父组件中绑定自定义事件监听:
          <Child @eventName="callback" ref="child">
    	  this.$refs.child.$on('eventName', this.callback)
        子组件中分发事件
          this.$emit('eventName', data)
    应用: element-ui的组件的事件监听语法都用的是自定义事件
          我们项目中的组件也用了不少自定义事件

## 3. 方式三: 全局事件总线 ===> 消息订阅与发布

    1). 实现任意组件间通信
    2). 编码:
        将入口js中的vm作为全局事件总线对象:
            beforeCreate() {
                Vue.prototype.$bus = this
            }
        分发事件/传递数据的组件: this.$bus.$emit('eventName', data)
        处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})
    应用: 前台项目中使用全局事件总线

## 4. 方式四: v-model

    1). 实现父子之间相互通信/同步
    2). 组件标签上的v-model的本质: 动态value属性与自定义input监听来接收子组件分发的数据更新父组件数据
        父组件:
            <CustomInput v-model="name"/>
            <!-- 等价于 -->
            <CustomInput :value="name" @input="name=$event"/>
        子组件:
            <input type="text" :value="value" @input="$emit('input', $event.target.value)">
            props: ['value']
    应用: element-ui中的表单项相关组件都用了v-model: Input / Select / Checkbox / Radio

## 5. 方式五: .sync

    1). 实现父子之间相互通信/同步(在原本父向子的基础上增加子向父)
    2). 组件标签的属性上使用.sync的本质: 通过事件监听来接收子组件分发过来的数据并更新父组件的数据
        父组件:
            <child :money.sync="total"/>
            <!-- 等价于 -->
            <Child :money="total" @update:money="total=$event"/>

            data () {
              return {
                total: 1000
              }
            },
        子组件:
            <button @click="$emit('update:money', money-100)">花钱</button>
            props: ['money']
    应用:
        element-ui在有显示隐藏的组件上: Dialog / Drawer

## 6. $attrs与$listeners

    1). $attrs
        实现当前组件的父组件向当前组件的子组件通信
        它是包含所有父组件传入的标签属性(排除props声明, class与style的属性)的对象
        使用: 通过 v-bind="$attrs" 将父组件传入的n个属性数据传递给当前组件的子组件
    2). $listeners
        实现当前组件的子组件向当前组件的父组件通信
        $listeners是包含所有父组件传入的自定义事件监听名与对应回调函数的对象
        使用: 通过v-on="$listeners" 将父组件绑定给当前组件的事件监听绑定给当前组件的子组件
    应用: 利用它封装了一个自定义的带hover文本提示的el-button

## 7. $refs, $children, \$parent

    1). $refs
        实现父组件向指定子组件通信
        $refs是包含所有有ref属性的标签对象或组件对象的容器对象
        使用: 通过 this.$refs.child 得到子组件对象, 从而可以直接更新其数据或调用其方法更新数据
    2). $children
        实现父组件向多个子组件通信
        $children是所有直接子组件对象的数组
        使用: 通过this.$children 遍历子组件对象, 从而可以更新多个子组件的数据
    3). $parent
        实现子组件向父组件通信
        $parent是当前组件的父组件对象
        使用: 通过this.$parent 得到父组件对象, 从而可以更新父组件的数据
    应用: 在后台管理项目中使用了$refs

## 8. provide 与 inject

    1). 实现祖孙组件间直接通信
    2). 使用
    	在祖组件中通过provide配置向后代组件提供数据
    	在后代组件中通过inject配置来声明接收数据
    3). 注意:
    	不太建议在应用开发中使用, 一般用来封装vue插件
    	provide提供的数据本身不是响应式的 ==> 父组件更新了数据, 后代组件不会变化
    	provide提供的数据对象内部是响应式的 ==> 父组件更新了数据, 后代组件也会变化
    应用: element-ui中的Form组件中使用了provide和inject

## 9. Vuex

    1). 实现任意组件间通信
    2). Vuex 是一个专为 Vue 应用程序设计的管理多组件共享状态数据的 Vue 插件
        任意组件都可以读取到Vuex中store的state对象中的数据
        任意组件都可以通过dispatch()或commit()来触发store去更新state中的数据
        一旦state中的数据发生变化, 依赖于这些数据的组件就会自动更新
    应用: 前台和后台项目都有用vuex管理组件数据

## 10. 插槽 ==> 作用域插槽 slot-scope

    1). 实现父组件向子组件传递标签内容
    2). 什么情况下使用作用域插槽?
        父组件需要向子组件传递标签结构内容
        但决定父组件传递怎样标签结构的数据在子组件中
    3). 编码:
        子组件:
            <slot name="title" :row="item" :$index="index">  <!-- slot的属性会自动传递给父组件 -->
        		默认内容
    	 	</slot>
        父组件:
            <template v-slot:title="{row, $index}">
                <span>{{$index+1}}</span> &nbsp;&nbsp;
                <span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
            </template>
    应用: element-ui中的Table组件
