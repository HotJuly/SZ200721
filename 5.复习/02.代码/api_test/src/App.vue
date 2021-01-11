<template>
  <div id="app">
    <h1 ref="msg">{{msg}}</h1>
    <HelloWorld ref="hello" v-model="msg" value="222"/>
    <!-- <HelloWorld :value="msg" @input="value=>msg=value"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg1111:"我是修改之前的数据",
      msg:"Welcome to Your Vue.js App"
    }
  },
  provide:{
    aaa:"haha"
  },
  components: {
    HelloWorld
  },
  mounted(){
    // console.log(123)
    // this.msg1111="我是修改之后的数据";
    // 更新data数据是同步的,但是视图更新是异步(实现原理:then->nextTick(updateDOM))
    // nextTick实现原理:then
    // nextTick??????
    // Promise.resolve().then(()=>{
    //   console.log('then')
    // })
    // this.$nextTick(()=>{
    //   console.log("nextTick1")
    // })
    // this.$nextTick(()=>{
    //   console.log("nextTick2")
    // })

    // callbacks=[fun1,fun2,fun3,fun4]
    // .then()=>fun1()->fun2()->fun3


    // console.log(this.$el)
    // console.log(this.$children[0].ccc=333)
    console.log(this.$refs.msg,this.$refs.hello)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
