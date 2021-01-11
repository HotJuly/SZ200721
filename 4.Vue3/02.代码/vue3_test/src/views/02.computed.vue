<template>
  <div class="home">
    I'm Home
    <h2>count: {{count}}</h2>
    <h2>doubleCount: {{double}}</h2>
    <h2>ThreeCount: {{three}}</h2>
    <button @click="handleClick">+1</button>
    <button @click="clickThree">three点击</button>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref , computed} from 'vue';

export default defineComponent({
  name: 'Home',
  setup(){
    const count = ref<number>(0);

    const handleClick = function(){
      count.value++;
    }

    // Vue中计算属性本质是一个函数
    const double = computed(()=>{
      return count.value*2
    });

    
    const three = computed<number>({
      get () {
        return count.value*3;
      },
      set (newVal) {
        // console.log('set')
        count.value=newVal;
      }
    });

    const clickThree = function(){
      three.value=1111;
    }





    return {
      count,
      handleClick,
      double,
      three,
      clickThree
    }
  },
  // computed:{
  //   a(){
  //     return 123;
  //   }
  // },
})
</script>
