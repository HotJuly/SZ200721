<template>
  <div class="home">
    I'm Home
    <h2>count: {{count}}</h2>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    
  },
  // data(){
  //   return {

  //   }
  // },
  setup(){
    // 注册在模版中需要使用到的响应式数据和修改响应式数据的函数
    console.log('setup')

    //ref函数,生成的是一个Ref对象,他身上有value属性,不过他是一个getter
    // template中想使用响应式属性,直接写名字,不需要写.value
    // 在js代码中,想使用响应式属性的值或者修改,都必须要.value
    const count = ref(0);
    console.log(count)

    const handleClick = function(){
      count.value++;
    }

    return {
      count,
      handleClick
    }
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
})
</script>
