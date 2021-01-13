const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
/*
    1.入口entry
    2.输出(出口)output
    3.module
        webpack只认识js代码,也就是说没有能力解析其他的代码,解析其他代码需要其他的包配合
        例如:  
            解析less文件  less包 -> 中间过渡者less-loader
    4.plugins
        面试题:plugin和loader的区别
        回答:loader基本都是跟代码解析相关,将所有其他类型的代码都转换成js
            plugin一般是实现一些新功能的扩展,HTMLWebpackPlugin
    5.mode
        设置/确定当前打包环境
*/
module.exports={
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
    // devServer:{
    //     port:8080,
    //     proxy:{
    //         "/api":{
    //             target:"http://www.baidu.com",
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 "^/api":""
    //             }
    //         }
    //     },
    //     // hot和hotOnly都是热模替换,hot热模替换的同时会刷新页面,hotOnly不会刷新
    //     hot:true,
    //     hotOnly:true
    // },
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:[".ts",".js","jsx",".json",".less"]
    }
}