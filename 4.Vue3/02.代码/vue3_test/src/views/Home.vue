<template>
  <div class="home">
    I'm Home
    <h2 ref="count1111">count: {{count}}</h2>
    <h1>pageX:{{pageX}}</h1>
    <h1>pageY:{{pageY}}</h1>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref , reactive , toRefs , onMounted, onBeforeUnmount} from 'vue';
import MousePosition from '../hooks/MousePosition';

interface Data{
      msg: string;
      person: {
        name: string;
        age: number;
        sex?: string;
      };
      arr: Array<string>;
}

export default defineComponent({
  name: 'Home',
  setup(){
    const count = ref<number>(0);

    const handleClick = function(){
      count.value++;
    }

    // const pageX= ref(0);
    // const pageY= ref(0);

    // // onMounted(()=>{
    // //   console.log('我是onMounted')
    // // })
    // function handle(event: MouseEvent){
    //     // console.log('event',event)
    //     const {clientX,clientY} =event;
    //     pageX.value=clientX;
    //     pageY.value=clientY;
    //   }

    // onMounted(()=>{
    //   document.addEventListener('click',handle);
    // })

    // onBeforeUnmount(()=>{
    //   document.removeEventListener('click',handle);
    // })
    const {pageX,pageY} = MousePosition();

    console.log('--------setup-------')

    return {
      count,
      handleClick,
      pageX,
      pageY
    }
  },
  beforeCreate(){
    console.log('-------beforeCreate-------')
  },
  created(){
    console.log('-------created-------')
  },
  beforeMount(){
    console.log('-------beforeMount-------')
  },
  mounted(){
    console.log('-------mounted-------')
  }
})
</script>
