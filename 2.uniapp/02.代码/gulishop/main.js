import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

//mpType -> mp mini program	type 类型声明
//通知uniapp,当前的App组件代表整个小程序
App.mpType  = 'app'

//创建vue实例,相当于app.js中的App(),注册小程序
const app = new Vue({
    ...App,
	store
})


// const app = App({
//     // ...App
	
// 	onLaunch: function() {
// 		console.log('App Launch')
// 	},
// 	onShow: function() {
// 		console.log('App Show')
// 	},
// 	onHide: function() {
// 		console.log('App Hide')
// 	}
// })
app.$mount()
