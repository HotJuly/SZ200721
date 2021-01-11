<template>
  <div id="app">
    <h1 ref="msg">{{msg1111}}</h1>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg1111:"我是修改之前的数据"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    console.log(123)
    this.msg1111="我是修改之后的数据";
    // 更新data数据是同步的,但是视图更新是异步(实现原理:then)
    // nextTick实现原理:then
    this.$nextTick(()=>{
      console.log(this.msg1111,this.$refs.msg.innerText)
    })
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
