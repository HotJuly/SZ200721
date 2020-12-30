import config from './config.js';
/*
	根据当前环境进行基础路径配置:
		1.如果是h5端,使用config.h5Host
		2.如果是小程序端,使用config.mpHost
	
	使用uni.getSystemInfoSync().platform区分当前环境
		1.如果值是ios,说明当前在h5端
		2.如果值是devtools,说明当前在小程序端
*/
let baseUrl;
let devtools = uni.getSystemInfoSync().platform;
if(devtools==="ios"){
	baseUrl = config.h5Host
}else if(devtools === "devtools"){
	baseUrl = config.mpHost
}

// console.log(uni.getSystemInfoSync());

export default function(url,data={},method="GET"){
	return new Promise((resolve)=>{
		uni.request({
			url:baseUrl + url,
			data,
			method,
			success:(res)=>{
				// console.log('res',res);
				resolve(res.data);
				// this.indexData = res.data;
			}
		})
	})
}