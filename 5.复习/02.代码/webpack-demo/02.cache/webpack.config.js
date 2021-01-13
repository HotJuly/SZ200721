const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
    cache:
        1.强缓存(cache-control:maxAge=36000000)(status code:200)
            只要用户没有手动清除,或者超过最大存活时间,就会使用本地的缓存文件,不会发送请求
        2.协商缓存(cache-control:e-tag和last-modifined)(status code:304)
            只要服务器文件不变,就会使用本地缓存的文件,相比较于强缓存,协商缓存每次都会发送请求
    解决方案:
        1.hash值(每次构建项目的时候,生成的唯一标识)
            在文件名字中配置hash值,可以保证每次打包生成新文件的时候,文件名称与上次不同,可以让上次的强缓存失效
        
        2.chunkhash(每次构建项目的时候,每个入口文件的唯一标识)
                
        3.contenthash(每次构建项目的时候,每个文件的唯一标识)
*/

module.exports={
    entry:"./src/main.js",
    output:{
        filename:"[name].[contenthash].js",
        path:resolve(__dirname,"./server/public")
    },
    module:{
        rules:[
            {
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[contenthash].css"
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