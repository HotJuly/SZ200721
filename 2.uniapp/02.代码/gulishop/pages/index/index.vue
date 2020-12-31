<template>
	<view id="indexContainer">
		<!-- 头部搜索区域 -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png"></image>
			<view class="searchContainer">
				<view class="iconfont icon-sousuo"></view>
				<input class="search" type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
			</view>
			<button class="nickname">七月</button>
		</view>
		
		<!-- 导航条区域 -->
		<scroll-view class="navScroll" enable-flex scroll-x v-if="indexData.kingKongModule">
			<view class="navItem " :class="currentIndex===-1?'active':''" @click="handleClick(-1)">
				推荐
			</view>
			<view class="navItem" :class="currentIndex===index?'active':''" @click="handleClick(index)" v-for="(item,index) in indexData.kingKongModule.kingKongList" :key="item.L1Id">
				{{item.text}}
			</view>
		</scroll-view>
		
		<!-- 内容区域 -->
		<scroll-view class="contentScroll" scroll-y="true" >
			<Recommend v-if="currentIndex===-1" />
			<CateList :navIndex="currentIndex" v-else/>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import ajax from '../../utils/ajax.js';
	import Recommend from '../../components/Recommend/Recommend.vue';
	import CateList from '../../components/cateList/cateList.vue';
	export default {
		data() {
			return {
				// indexData:{},
				currentIndex:-1
			}
		},
		/*
			1.在哪发
				Vue -> mounted和created
				小程序->onLoad
				uniapp中,可以使用小程序和Vue的生命周期
				uniapp兼容:1.小程序的组件 2.小程序的生命周期
				无论是uniapp还是mpvue(美团推出的小程序框架),都推荐使用Vue的生命周期,尽量少用小程序的生命周期
			2.怎么发
				小程序->wx.request
				uniapp->uni.request
			3.往哪发
				往自家服务器发送
		*/
		// onLoad() {
		// 	console.log('onLoad')
		// },
		async mounted(){
			// console.log('mounted')
			// console.log(this.$store.state.home.initData)
		
			
			// let indexData = await ajax('/getIndexData');
			//专门用于小程序请求
			// let indexData = await ajax('http://localhost:3000/getIndexData');
			//专门用于h5端请求
			// let indexData = await ajax('/api/getIndexData');
			// this.indexData = indexData;
			// console.log('indexData',indexData)
			
			this.$store.dispatch('getIndexData')
		},
		methods: {
			handleClick(index){
				this.currentIndex=index;
			}
		},
		components:{
			Recommend,
			CateList
		},
		computed:{
			// ...mapState(["getIndexData"])
			...mapState({
				indexData:state=>state.home.indexData
			})
		}
	}
</script>

<style lang="stylus">
	#indexContainer
		.header
			display flex
			align-items center
			padding-top 20upx
			.logo
				width 140upx
				height 40upx
				flex-shrink 0
				margin 0 20upx
			.searchContainer
				position  relative
				background #ededed
				width 100%
				height 60upx
				border-radius 10upx
				.iconfont
					position absolute
					left 20upx
					top 50%
					transform translateY(-50%)
				.search
					margin-left 60upx
					height 100%
					.placeholder
						text-align center
						font-size 24upx
						text-indent -40upx
			.nickname
				width 144upx
				height 60upx
				font-size 24upx
				color red
				flex-shrink 0
				margin 0 20upx
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				position relative
				display inline-block
				width 140upx
				height 80upx
				text-align center
				font-size 28upx
				line-height 80upx
				&.active::after
					position absolute
					content ""
					display block
					height 2upx
					width 100%
					background red
					left 0
					bottom 2upx
		.contentScroll
			// 小程序端	导航栏和tabBar并不算在100vh中,所以以下算法即可
			// h5端		导航栏和tabBar算在100vh,需要将他们一并减去
			//height calc(100vh - header的高度 - navScroll的高度 - 导航栏的高度 - tabBar的高度)
			//tabBar高度->--window-bottom 导航栏高度->--window-top
			// 这两个属性在小程序端是0px,在h5端是有各自的数据,设置在html标签上
			height calc(100vh - 100upx - 80upx - var(--window-bottom) - var(--window-top))
</style>