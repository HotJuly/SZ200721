# 总结 Webpack

## Webpack 基本概念

#### 1. entry 入口

- 以某个文件为入口开始打包
- 分类
  - 单入口 String 
    - 只会输出一个文件
  - 多入口 Array / Object
    - Array 只会输出一个文件
    - Object 会输出多个文件  ==> 多页应用(MPA)

#### 2. output 输出

- 打包后资源输出到哪里去
- 输出的文件名叫什么

#### 3. loader 加载器

- webpack 本身只能识别 json、js 模块，其他模块一旦加载就会报错
- 需要借助 loader 帮助 webpack 识别其它识别不了的模块

#### 4. plugins 插件

- loader 功能有限，要想做功能更加强大的工作交给插件
- 比如在页面中自动引入打包生成的js/css, 压缩css, 拷贝文件等

#### 5. mode

- 模式：开发环境（development）和生产环境（production）
- 提供一系列默认配置, 用于简化配置

## Webpack 基本配置
#### 1. 处理JS文件

- eslint-loader
  - 在package.json中配置eslintConfig来指示eslint-loader到底要干什么事
  - enfore: 'pre' 优先执行
- babel-loader
  - 在webpack配置中配置babel来指示babel-loader到底要干什么事
  - babel.config.js: 配置webpack的preset与plugin
#### 2. 处理Vue文件

- vue-loader

#### 3. 处理JSX文件

- babel-loader
- presets: ['@babel/preset-react']

#### 4. 处理CSS文件

- 开发环境：创建style标签插入样式
  - style-loader
  - css-loader
  - postcss-loader
  - less-loader / sass-loader / stylus-loader
- 生产环境：提取单独css文件，将来通过link引入
  - MiniCssExtractPlugin.loader（还需要配置插件 new MiniCssExtractPlugin）
  - css-loader
  - postcss-loader
  - less-loader / sass-loader / stylus-loader

#### 5. 处理HTML文件

- 目标: 自动引入打包生成的js/css
- html-webpack-plugin

#### 6. 处理图片/字体/音视频文件

- url-loader / file-loader
- limit: 10000 小于10kb一下的图片会被base64处理

## Webpack 优化手段
#### 1. 优化打包构建速度

##### HMR 热模块替换

- 为什么要用？
  - 默认情况下，一旦修改了代码，全部代码重新编译刷新，速度慢（全体刷新）
- 有什么作用？
  - 只更新修改的模块，其他模块不变（局部更新）  
- 怎么使用？
  - devServer: { hot: true }  
  - new webpack.HotModuleReplacementPlugin()  
- 注意：
  - 默认情况下只有样式文件有HMR功能（style-loader），JS是没有的
- 开启JS的HMR功能：
  - 手写JS代码 --> module.hot.accpet('模块路径', () => {})
  - 在Vue使用 --> vue-loader
  - 在React使用 --> react-hot-loader

##### 缓存

- eslint和babel两个任务处理JS文件，时间一般会比较长，为了让其重新构建速度更快, 可以使用缓存。
- eslint --> cache: true
- babel --> cacheDirectory: true
- cache-loader放置在要缓存loader的前面
- 注意：一般只针对耗时长的任务：eslint-loader/babel-loader/vue-loader

##### oneOf

- 作用：
  - 让模块只被一个loader处理，其他的就不看了(原本所有都会判断一下)
  - 能够提升打包速度
- 注意：
  - eslint-loader: 处理js, 需要先执行, 将其定义在oneOf的外面
  - babel-loader: 处理js, 后执行, 将其定义在oneOf的内部

##### 多进程打包

- 过去: happyPack
- 现在: thread-loader
- 用法和cache-loader差不多，放在要使用loader前面
- 作用：开启多进程处理前面的任务，提升打包速度
- 注意：每个进程开启和通信都有开销，一般只针对耗时长的任务：babel-loader

#### 2. 优化打包代码体积和性能

##### 兼容性处理

- JS
  - ES6由二个部分
    - 新语法: const/let/箭头函数/解构赋值/对象简写 
    - 新API: Promise / 数组新方法/ 对象新方法
  - babel-loader presets: ['@babel/preset-env'] 问题就是只能编译语法, 不能处理新API
  - @babel/polyfill 做API兼容，问题是体积太大了
  - core-js3 在@babel/preset-env基础上，增加了useBuiltIns: 'usage'来实现按需加载
  - 指定浏览器版本或占有率配置, 进一步减小打包文件: 只打包使用了且浏览器没有实现的
- CSS  
  - postcss-loader 
  - 在package.json中指定browserslist来指示postcss-loader兼容性做到什么程度

##### tree shaking( 摇树)

- 去除没有使用的JS代码
- 必须使用ES6模块化（需要禁止@babel/preset-env转换ES6模块化语法 modules: false）
- 开启webpack的生产模式（内部启用TerserPlugin，用来压缩JS代码的插件，tree shaking功能就是这个插件完成的）
- 在package.json配置sideEffects来指定哪些文件需要进行tree shaking

##### code split 代码分割 / lazy loading 懒加载

- 作用：
  - 抽取公共代码 
  - 拆分多个文件，减少单个文件体积（避免单次请求时间过长）
- 配置：
  - 多入口 + optimization
    - 将node_modules抽取成单独模块
    -  将多入口的公共模块也抽取成单独模块
  - 单入口 + optimization + import
    - 将node_modules抽取成单独模块
    - 动态导入语法import就能将某些文件抽取成单独模块
  - import()动态引入模块
    - 原生 JS:  在需要的回调函数中动态加载模块, import(模块).then()
    - Vue: () => import('./Foo.vue'), 实现路由组件懒加载
    - React: Suspence +lazy(() => import('./SomeComponent')), 实现路由组件懒加载

##### preload 和 prefetch 预加载

- 作用：
  - 让资源提前加载
- 区别：
  - preload 让当前页面的要使用资源加载（延后加载）
  - prefetch 让后面要使用资源提前加载（当前不需要使用）
- 使用：
  - import(/*webpackChunkName: xxx webpackPrefetch: true */'./xxx')
  - import(/*webpackChunkName: xxx webpackPreload: true */'./xxx') // 没有效果
  - 问题：兼容性较差 
- 使用Chrome团队提供的一个工具包: preload-webpack-plugin
  - npm i -D preload-webpack-plugin@next  // 必须是最新的下一个版本
  -  对异步模块包使用: prefetch
  - 对同步模块包使用: preload

##### 浏览器cache/缓存

- hash 
  - webpack每次构建都会生成一个新的且唯一的hash
  - 问题：只要webpack重新构建，所有文件的hash都会发生变化，缓存就会失效

- chunkhash
  - 打包属于同一个chunk，就共享同一个hash
  - 问题：样式文件被css-loader打包js文件中，导致样式文件和js文件属于同一个chunk，共享同一个hash
  - 一旦样式文件发生变化，js文件也会变

- contenthash
  - 根据文件的内容来成hash，所以只要文件内容不一样，hash就不一样
  - 问题：
    - 比如A模块有一个依赖，是B模块，那么A模块内部就会保存B模块hash值，
    - 一旦B模块发生变化，B模块的hash值就会变，导致A模块内部保存B模块hash值也发生改变
    - 此时A模块文件内容发生变化，它的hash值也会变
  - 解决：
    - runtimechunk: true 将A模块保存的B模块hash值存到runtime文件中，这样A模块内部就没有B模块的hash值了，就不会因为B模块的修改而修改