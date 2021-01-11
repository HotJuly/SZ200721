

## Vue3

### 1) 了解相关信息

- 2年多开发, 100+位贡献者, 2600+次提交, 600+次PR
- Vue3支持vue2的大多数特性
- 更好的支持Typescript



### 2) 性能提升:

- 打包大小减少41%
- 初次渲染快55%, 更新渲染快133%
- 内存减少54%
- 重写虚拟DOM的实现和Tree-Shaking



### 3) Composition(组合) API

- setup
- ref 和 reactive
- computed 和 watch
- 新的生命周期函数
- 自定义hooks函数



### 4) 其它新增特性

-  Teleport - 瞬移组件的位置
-  Suspense - 异步加载组件的loading界面
-  全局API的修改



## 创建vue3项目

### 1) 使用 vue-cli 创建

文档: https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project
```

然后的步骤

- Please pick a preset - 选择 **Manually select features**
- Check the features needed for your project - 多选择上 **TypeScript** &&  **Router** &&  **Vuex**，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 **3.x (Preview)**
- Use class-style component syntax - 直接回车
- Use Babel alongside TypeScript - 直接回车
- Pick a linter / formatter config - 直接回车
-  Use history mode for router? - 直接回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 直接回车

### 2) 使用 vite 创建

文档: https://v3.cn.vuejs.org/guide/installation.html

Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，在生产环境下基于 Rollup 打包。

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```



## Composition API使用(重要)

文档: 

​	https://v3.cn.vuejs.org/api/basic-reactivity.html

​	https://v3.cn.vuejs.org/api/composition-api.html

​	https://composition-api.vuejs.org/zh/

### 1) setup

`setup` 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。

创建组件实例，然后初始化 `props` ，紧接着就调用`setup` 函数。从生命周期钩子的视角来看，它会在 `beforeCreate` 钩子之前被调用

### 2) ref

接受一个参数值并返回一个响应式且可改变的 ref 对象

ref 对象拥有一个指向内部值的单一属性 `.value`

如果传入 ref 的是一个对象，将调用 `reactive` 方法进行深层响应转换。

当 ref 作为渲染上下文的属性返回（即在`setup()` 返回的对象中）并在模板中使用时，它会自动解套，无需在模板内额外书写 `.value`

```vue
<template>
<div class="about">
  <h2>{{count}}</h2>
  <hr>
  <button @click="increment">加1</button>
</div>
</template>

<script lang="ts">
import {
  ref
} from "vue"
export default {
  beforeCreate () {
    console.log('beforeCreate()')
  },
  // 在beforeCreate()之前执行, 不能通过this访问组件对象
  setup() {
    console.log('setup()', this)
    
    // 包含响应式数据的引用对象
    const count = ref(0) // count是一个引用对象, 内部包含存储数据的value属性
    console.log(count, count.value)

    // 更新响应式数据的函数
    const increment = () => {
      count.value++
    }

    return { // 对象中的属性和方法, 模板可以直接访问
      count,
      increment
    }
  }
}
</script>
```



### 3) computed

使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。

或者，它可以使用具有 `get` 和 `set` 函数的对象来创建可写的 ref 对象。

```js
<template>
<div class="about">
  <h2>count: {{count}}</h2>
  <h2>double: {{double}}</h2>
  <h2>double2: {{double2}}</h2>
  <hr>
  <button @click="increment">加1</button>
</div>
</template>

<script lang="ts">
import {
  computed,
  ref
} from "vue"
export default {
  setup() {
    const count = ref(0) // count是一个ref/引用对象, 内部包含存储数据的value属性

    // 只有getter的计算属性
    const double = computed(() => { // 计算属性本质上也是一个ref对象
      console.log('double computed', count.value)
      return count.value * 2
    })

    // 包含getter与setter的计算属性
    const double2 = computed({
      get () {
        return count.value * 2
      },
      set (value: number) {
        count.value = value/2
      }
    })

    // 更新响应式数据的函数
    const increment = () => {
      count.value++
      setTimeout(() => {
        double2.value += 2
      }, 1000);
    }

    return {
      count,
      increment,
      double,
      double2
    }
  }
}
</script>
```



### 4) reactive

接收一个普通对象然后返回该普通对象的响应式代理器对象

响应式转换是“深层的”：会影响对象内部所有嵌套的属性

基于 ES2015 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

### 5) toRefs

问题: reactive 对象取出的所有属性值都是非响应式的

解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

### 6) watch

与选项 API [this.$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch) (以及相应的 [watch](https://v3.cn.vuejs.org/api/options-data.html#watch) 选项) 完全等效

侦听一个数据: ref 或 reactive 属性值(getter函数)

侦听多个数据

```vue
<template>
<div class="about">
  <h2>msg: {{msg}}</h2>
  <h2>numbers[1]: {{numbers[1]}}</h2>
  <h2>person.name: {{person.name}}</h2>

  <h2>count: {{count}}</h2>
  <hr>
  <button @click="update">更新</button>
</div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  ref,
  watch
} from "vue"

interface State {
  msg: string
  numbers: number[]
  person: {
    name?: string
  }
  update: () => void
}

export default {
  setup() {
    
    // 定义一个深度响应式对象
    const state: State = reactive({
      msg: 'haha',
      numbers: [1, 2, 3],
      person: {
        // name: 'tom'
      },
      update: () => {
        state.msg += '--'
        // 给对象添加新属性 ==> 3.0自动更新,2.0不可以
        state.person.name += '++' 
        // 通过下标直接替换数组元素  ==> 3.0自动更新,2.0不可以
        state.numbers[1] = Date.now() 

        count.value++
      }
    })

    const stateRefs = toRefs(state)

    const count = ref(0)

    // 监视一个ref
    watch(count, (newVal, oldVal) => {
      console.log('ref count变化了', newVal)
    })
    // 监视reactive中的某个属性
    watch(() => state.msg, value => {
      console.log('state中的msg变化了', value)
    })
    // 监视多个响应式数据
    watch([count, stateRefs.msg, () => state.msg], values => {
      console.log('多监视数据变化了', values)
    })

    return { // 对象中的属性和方法, 模板可以直接访问
      // state  // 模板表达式需要多写一层
      // ...state // 对象属性不是响应式的
      ...stateRefs,
      count
    }
  }
}
</script>
```



## 比较Vue2与Vue3的响应式(重要)

### 1) vue2的响应式

- 核心: 
  - 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

```js
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```

- 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新length, 界面不会自动更新

### 2) Vue3的响应式

- 核心: 
  - 通过Proxy(代理):  拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  - 通过 Reflect(反射):  动态对被代理对象的相应属性进行特定的操作
  - 文档:
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```js
new Proxy(data, {
	// 拦截读取属性值
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy 与 Reflect</title>
</head>
<body>
  <script>
    
    const user = {
      name: "John",
      age: 12
    };

    /* 
    proxyUser是代理对象, user是被代理对象
    后面所有的操作都是通过代理对象来操作被代理对象内部属性
    */
    const proxyUser = new Proxy(user, {

      get(target, prop) {
        console.log('劫持get()', prop)
        return Reflect.get(target, prop)
      },

      set(target, prop, val) {
        console.log('劫持set()', prop, val)
        return Reflect.set(target, prop, val); // (2)
      },

      deleteProperty (target, prop) {
        console.log('劫持delete属性', prop)
        return Reflect.deleteProperty(target, prop)
      }
    });
    // 读取属性值
    console.log(proxyUser===user)
    console.log(proxyUser.name, proxyUser.age)
    // 设置属性值
    proxyUser.name = 'bob'
    proxyUser.age = 13
    console.log(user)
    // 添加属性
    proxyUser.sex = '男'
    console.log(user)
    // 删除属性
    delete proxyUser.sex
    console.log(user)
  </script>
</body>
</html>
```



## 生命周期

### 1) vue2.x的生命周期

![lifecycle_2](.\lifecycle_2.png)

### 2) vue3的生命周期

![lifecycle_3](.\lifecycle_3.png)

### 3) 选项 API 生命周期选项和组合 API 之间的映射

- **beforeCreate -> setup代替**
- **created -> setup代替**
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated

**// 2.0中为 beforeDestroy 和 destroyed**

- **beforeUnmount -> onBeforeUnmount**
- **mounted -> onUnmounted**

// 用于处理错误

- errorCaptured -> onErrorCaptured

// 新增的专门用于调试

- renderTracked -> onRenderTracked
- renderTriggered -> onRenderTriggered

```vue
<template>
<div class="about">
  <h2>msg: {{msg}}</h2>
  <hr>
  <button @click="update">更新</button>
</div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate,
  onBeforeUnmount
} from "vue"

export default {
  beforeCreate () {
    console.log('beforeCreate()')
  },

  created () {
    console.log('created')
  },

  beforeMount () {
    console.log('beforeMount')
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('beforeUpdate')
  },

  updated () {
    console.log('updated')
  },

  beforeUnmount () {
    console.log('beforeUnmount')
  },

  unmounted () {
     console.log('unmounted')
  },
  

  setup() {
    
    const msg = ref('abc')

    const update = () => {
      msg.value += '--'
    }

    onBeforeMount(() => {
      console.log('--onBeforeMount')
    })

    onMounted(() => {
      console.log('--onMounted')
    })

    onBeforeUpdate(() => {
      console.log('--onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('--onUpdated')
    })

    onBeforeUnmount(() => {
      console.log('--onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('--onUnmounted')
    })
    
    return {
      msg,
      update
    }
  }
}
</script>

```



## 自定义hooks函数

- 作用: 对多个组件重复的功能进行提取封装

- 在vue2中, 可以使用mixin技术, 在vue3中使用自定义hooks函数

- 需求1: 收集用户鼠标点击的页面坐标

  hooks/useMousePosition.ts

  ```ts
  /* 
  自定义hooks: 收集用户鼠标点击的页面坐标
  */
  import { ref, onMounted, onUnmounted } from 'vue'
  
  export default function useMousePosition () {
    // 初始化坐标数据
    const x = ref(-1)
    const y = ref(-1)
  
    // 用于收集点击事件坐标的函数
    const updatePosition = (e: MouseEvent) => {
      x.value = e.pageX
      y.value = e.pageY
    }
  
    // 挂载后绑定点击监听
    onMounted(() => {
      document.addEventListener('click', updatePosition)
    })
  
    // 卸载前解绑点击监听
    onUnmounted(() => {
      document.removeEventListener('click', updatePosition)
    })
  
    return {x, y}
  }
  ```

- 需求2: 封装异步请求

  hooks/useUrlLoader.ts

  ```ts
  /* 
  使用axios发送异步ajax请求
  */
  import { ref } from 'vue'
  import axios from 'axios'
  
  export default function useUrlLoader(url: string) {
  
    const result = ref(null)
    const loading = ref(true)
    const errorMsg = ref(null)
  
    axios.get(url)
      .then(response => {
        loading.value = false
        result.value = response.data
      })
      .catch(e => {
        loading.value = false
        errorMsg.value = e.message || '未知错误'
      })
  
    return {
      loading,
      result,
      errorMsg,
    }
  }
  ```

- 在组件中使用自定义hooks

  ```vue
  <template>
  <div class="about">
    <h2>x: {{x}}, y: {{y}}</h2>
    <hr>
    <h2 v-if="loading">LOADING...</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <img v-if="result" :src="result.message" alt="">
  </div>
  </template>
  
  <script lang="ts">
  
  import {
    ref
  } from "vue"
  import useMousePosition from '../hooks/useMousePosition'
  import useUrlLoader from '../hooks/useUrlLoader'
  export default {
    setup() {
  
      const {x, y} = useMousePosition()
      const {loading, result, errorMsg} = useUrlLoader('https://dog.ceo/api/breeds/image/random')
      
      return {
        x,
        y,
        loading, 
        result, 
        errorMsg
      }
    }
  }
  </script>
  
  ```

  

## 利用 TS 强化类型检查与提示

### 1) 使用泛型

```ts
export default function useUrlLoader<T>(url: string) {

  const result = ref<T | null>(null)
  ...
}


// const {loading, result, errorMsg} = useUrlLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
const {loading, result, errorMsg} = useUrlLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search')

watch(result, () => {
  if (result.value) {
    // console.log(result.value.message)
    console.log(result.value[0].url)
  }
})
```



### 2) 使用 defineComponent 包裹组件

- 问题: 配置选项没有提示
- 解决: 使用defineComponent(options)

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    console.log(props.msg)
    console.log(context.attrs, context.slots, context.emit)
    return {

    }
  }
})
</script>
```

