const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
/*
    技术:tree-shaking(树摇)
    目的:将当前项目中多余(无用)的代码全部去除
    开启方法:
        1)mode:production
        2)直接下载插件terser-webpack-plugin,引入,并在plugins中构造调用
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
    mode:"production",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:[".ts",".js","jsx",".json",".less"]
    }
}