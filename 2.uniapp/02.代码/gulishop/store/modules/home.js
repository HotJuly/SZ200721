import ajax from '../../utils/ajax.js'
const state ={
	initData:"我是home的初始化数据",
	indexData:{}
}

const mutations={
	setIndexData(state,indexData){
		state.indexData=indexData;
	}
}

const actions={
	async getIndexData({commit}){
		let indexData = await ajax('/getIndexData');
		// console.log(indexData)
		commit("setIndexData",indexData)
	}
}

const getters={
	
}

export default{
	state,
	mutations,
	actions,
	getters
}