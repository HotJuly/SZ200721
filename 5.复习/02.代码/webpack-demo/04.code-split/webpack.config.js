const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
/*
    code split(代码分割)
    场景:多个入口文件,同时使用到了一个文件的代码,编译这些入口文件,他们都会携带上这个文件
    目的:将重复引入的依赖,单独分离出来,让所有文件都去引入这一份代码,防止代码多次出现
    实现方法:
            在optimization对象中的splitChunks属性中配置chunks属性
                optimization:{
                    splitChunks:{
                        chunks:"all"
                    }
                }

                扩展:默认体积小于30000B的代码,不会被单独拆分出来
                    splitChunks属性中配置minSize属性
                    splitChunks:{
                        chunks:"all",
                        minSize:1
                    }
            
    场景2:如果想实现部分代码异步加载(懒加载)
    实现方法:
            使用import()配合webpack实现代码切割
            被import()引入的文件,会单独生成一个文件,等待前端页面请求

            Vue组件懒加载
                    import Home from '@/components/Home'
                    routes:[{
                        path:"/home",
                        component:()=>import('@/components/Home')
                    }]
            
            React组件懒加载
                1.class组件懒加载
                    React提供了一个组件还有一个方法
                    import {Suspence,lazy} from 'react'
                    import Home from '@/components/Home'
                    <Suspence fallback="loading...">
                        <Route path="/home" component={lazy(()=>import("@/components/Home")}/>
                    </Suspence>
                
                2.函数组件懒加载
                    import {memo} from 'react'
                    function Home(){
                        return <div>home</div>
                    }
                    const newHome = memo(Home);


*/
module.exports={
    // entry:{
    //     main:"./src/main.js",
    //     home:"./src/home.js"
    // },
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,"./build")
    },
    module:{
        rules:[
            {
                test:/.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        })
    ],
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:[".ts",".js","jsx",".json",".less"]
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize:1
        }
    }
}