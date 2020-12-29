const Koa = require('koa');
const KoaRouter = require('koa-router');

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



/*
    2.将服务器应用实例app运行在某个端口上,并监听该端口
*/
app.listen('3001',function(error){
    if(error){
        console.log('服务器运行失败!!!')
    }else{
        console.log('服务器成功运行,运行于http:localhost:3001');
    }
})

