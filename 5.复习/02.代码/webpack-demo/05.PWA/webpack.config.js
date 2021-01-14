const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
/*
    PWA:离线缓存
    目的:当用户离线状态(断网)下,可以去使用网页的部分功能,或者浏览部分页面
    实现方法:
        1.npm install workbox-webpack-plugin --save-dev
        2.引入当前插件
        3.在plugins中,使用该插件
            new WorkboxPlugin.GenerateSW()
        4.在main.js中注册service-worker,需要写入一段代码
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./service-worker.js').then(registration => {
                console.log('SW registered: ', registration);
                }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
                });
            });
}
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
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")
        },
        extensions:[".ts",".js","jsx",".json",".less"]
    }
}