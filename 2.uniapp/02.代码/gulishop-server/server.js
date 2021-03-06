const Koa = require('koa');
const KoaRouter = require('koa-router');
const Fly=require("flyio/src/node")
const fly=new Fly;

// const express = require('express')

/*
    1.创建服务器应用实例app
        const app = express();
*/
const app = new Koa();

/*
    3.注册后端路由
        express
            app.get('/home',function(){

            })
        3.1 创建路由器实例router
        3.2 声明使用中间件
            1)具有拦截请求的功能
            2)能对请求头或者请求体做一些操作或者配置
                router.routes()->使用路由器中所有的路由
                router.allowedMethods()->用来处理响应的,404
        3.3 注册路由
            回调函数接受的参数:
                express:
                    1.request->请求报文对象
                    2.response->响应报文对象
                        response.send() end send json
                    3.next
                
                koa:
                    1.ctx   ->  request+response
                        接受query参数:ctx.query
                        返回响应数据:ctx.body=返回的数据
                    2.next
*/
const router = new KoaRouter();

app.use(router.routes())
    .use(router.allowedMethods())

router.get('/test',function(ctx,next){
    console.log("/test get success",ctx.query)
    ctx.body="哈哈"
})

//用于测试jsonp
router.get('/test1',function(ctx,next){
	let data = 5666666;
    console.log("/test1 get success",ctx.query)
	// `getData(5666666)`
    ctx.body=`getData(${data})`
})


//用于测试cors
router.get('/test2',function(ctx,next){
	ctx.set('Access-Control-Allow-Origin',"*");
	ctx.set('Access-Control-Allow-Methods',"POST,GET,DELETE,PUT");
	ctx.set('Access-Control-Allow-Headers',"Content-type");
	
	
	let data = "cors返回的数据";
    console.log("/test1 get success")
	// `getData(5666666)`
    ctx.body=data
})

//用于返回首页数据
let indexData = require('./datas/index.json');
router.get('/getIndexData',function(ctx,next){
	// console.log('getIndexData')
    ctx.body=indexData
})

//用于返回首页catelist数据
let indexCateListData = require('./datas/indexCateList.json');
router.get('/getindexCateList',function(ctx,next){
	// console.log('getIndexData')
    ctx.body={
		data:indexCateListData
	}
})

//用于返回商品详细数据
let goods = require('./datas/goods.json');
router.get('/getGoodDetail',function(ctx,next){
	/*
		1.获取前端传来的商品id
			query传参 ctx.query
		2.通过id查找到对应的商品
		3.将商品详细信息返回
	*/
	let {goodId} =ctx.query;
	console.log('getGoodDetail',goodId)
	
	let good = goods.find((good)=>{
		// goods内部的id是数字类型,通过url传递过来的goodid是字符串类型
		return good.id === goodId*1
	})
	
    ctx.body=good
})

// 用于获取用户唯一标识
router.get('/getOpenId',async function(ctx,next){
    // console.log('getIndexData')
    let {code} = ctx.query;
    let appid = "wxe5931a68ea66cece";
    let appSecret = "41922c0cba498307a79ad078037d8ab2";
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    let result = await fly.get(url);
    // console.log(result)
    result = JSON.parse(result.data);
    ctx.body={
		data:result.openid
	}
})


/*
    2.将服务器应用实例app运行在某个端口上,并监听该端口
*/
app.listen('3000',function(error){
    if(error){
        console.log('服务器运行失败!!!')
    }else{
        console.log('服务器成功运行,运行于http:localhost:3000');
    }
})

