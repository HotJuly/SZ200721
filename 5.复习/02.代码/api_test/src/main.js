import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.mixin({
//   mounted(){
//     console.log(this.$el)
//   }
// })

/* 
用于收集用户出现的错误,反馈给公司,及时补救
window.onerror=function(error){

 }

Vue.config.errorHandler=function(err, vm, info){
  console.log(err, vm, info)
  // ajax...
}
*/

// 创建构造器
// var Profile = Vue.extend({
//   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
//   data: function () {
//     return {
//       firstName: 'Walter',
//       lastName: 'White',
//       alias: 'Heisenberg'
//     }
//   }
// })
// // 创建 Profile 实例，并挂载到一个元素上。
// new Profile().$mount('#app')

// Vue.prototype.$bus=new Vue()
// this.$bus.$on("msg",()=>{})
// this.$bus.$emit("msg",value)

new Vue({
  render: h => h(App),
}).$mount('#app')
