<script>
	import ajax from './utils/ajax.js';
	export default {
		onLaunch: function() {
			wx.login({
				success:async ({code})=>{
					// console.log('res',code)
					let {data} = await ajax("/getOpenId",{code});
					wx.setStorage({
						key:"openId",
						data
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	@import url(/static/iconfont/iconfont.styl)
	page{
		height:100%
	}
	/*每个页面公共css */
</style>
