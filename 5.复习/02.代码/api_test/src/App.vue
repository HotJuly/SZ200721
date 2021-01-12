<template>
  <div id="app">
    <h1 v-pre>msg:{{msg}}</h1>
    <h1 ref="msg" @click="trigger">value:{{value}}</h1>
    <keep-alive exclude="login">
      <!-- <router-view></router-view> -->
      <HelloWorld v-if="flag" ref="hello" v-model="msg" :value1.sync="value">
        <template v-slot:default>
          <h1>我是第一个插槽</h1>
        </template>
        <template v-slot:header>
          <h1>我是header插槽</h1>
        </template>
        <template v-slot:footer="scope">
          <h1>我是footer插槽{{scope.footerData}}</h1>
        </template>
      </HelloWorld>
    </keep-alive>
    <!-- <component :is=""></component> -->
    <!-- .sync实现原理 <HelloWorld ref="hello" :value="value" @update:value1="data=>value=data"/> -->
    <!-- v-model实现原理 <HelloWorld :value="msg" @input="value=>msg=value"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg1111:"我是修改之前的数据",
      msg:"Welcome to Your Vue.js App",
      value:"222",
      flag:true
    }
  },
  provide:{
    aaa:"haha"
  },
  components: {
    HelloWorld
  },
  // mounted(){
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
    // console.log(this.$refs.msg,this.$refs.hello)
  // },
  methods:{
    trigger(){
      this.flag=!this.flag
    }
  },
  beforeCreate(){
    console.log("-------------beforeCreate-------------",this.value,this.$data,this.$refs.msg)
  },
  created(){
    console.log("-------------created-------------",this.value,this.$data,this.$refs.msg)
  },
  beforeMount(){
    console.log("-------------beforeMount-------------",this.$refs.msg)
  },
  mounted(){
    console.log("-------------mounted-------------",this.$refs.msg)
  },
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
