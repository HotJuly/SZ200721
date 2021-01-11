<template>
  <div class="home">
    I'm Home
    <h2>count: {{count}}</h2>
    <div>msg:{{msg}}</div>
    <div>person:
      <p>name:{{person.name}}</p>
      <p>age:{{person.age}}</p>
      <p>sex:{{person.sex}}</p>
    </div>
    <ul>
      <li v-for="item in arr" :key="item">{{item}}</li>
    </ul>
    <button @click="handleClick">+1</button>
    <button @click="handleClick1">修改age</button>
    <button @click="handleClick2">修改arr</button>
    <button @click="handleClick3">添加sex</button>
    <button @click="handleClick4">修改msg</button>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref , reactive , toRefs} from 'vue';

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

    // const data = {
    //   msg:"home",
    //   person:{
    //     name:"xiaoming",
    //     age:18
    //   },
    //   arr:["东","西","南","北"]
    // }

    const data = reactive<Data>({
      msg:"home",
      person:{
        name:"xiaoming",
        age:18
      },
      arr:["东","西","南","北"]
    });
    // data.msg="xixi"
    // console.log(data)

    const toRefsData = toRefs(data);
    console.log(toRefsData)

    const handleClick1 = ()=>{
      data.person.age++;
    }

// Vue2.0中,对数组的操作,最好都是通过push,splice等方法(被Vue重写过的)去操作,否则页面很有可能不更新
// Vue3.0中,可以直接对数组进行任意操作,页面会跟着更新
    const handleClick2 = ()=>{
      // data.arr[1]="中"
      data.arr[4]="中"
    }

    const handleClick3 = ()=>{
      // Vue2.0中,想要设置响应式属性,必须使用Vue.set或者this.$set
      data.person.sex="未知"
    }

    const handleClick4 = () =>{
      data.msg="我是点击之后的msg"
    }

    return {
      count,
      handleClick,
      // data,
      handleClick1,
      handleClick2,
      handleClick3,
      // ...data,
      handleClick4,
      ...toRefsData
    }
  },
})
</script>
