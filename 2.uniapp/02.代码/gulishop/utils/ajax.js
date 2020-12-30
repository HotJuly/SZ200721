export default function(url,data={},method="GET"){
	return new Promise((resolve)=>{
		uni.request({
			url,
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