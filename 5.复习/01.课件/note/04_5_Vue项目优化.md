### 1. Vue代码层面优化

####  1) v-for 遍历列表

指定非下标的唯一key

不同时使用 v-if

#### 2) 图片资源懒加载

如使用v-lazyload

#### 3) 路由组件懒加载

const Home = () => import('./pages/Home')

#### 4) 第三方插件的按需引入

如: element-ui / vant 

#### 5) 大数组优化1: 冻结响应式数据

当前组件如果只是为纯展示组件时，拿到数据后使用`Object.freeze()`将数据冻结，这样数据就无法进行响应变化。

```js
export default {
  data: () => ({
    users: []
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users); // 这样数组内部就没有做数据劫持处理, 效率更高
  }
};
```



#### 6) 大数组优化2: 虚拟列表

- 当组件处于非常长的列表时，数据过多导致DOM元素同样多，导致卡顿。

- 使用业界常用手段`虚拟列表`，只渲染可以看到的窗口的区域DOM。

- 虚拟列表的基本实现思路:  ==> 测试代码 vue/虚拟列表/index.html

  - 用vue的for循环渲染列表，自己手动加一个滚动条，然后通过监听scroll，
  - 算出应该显示到第几个，通过计算属性截取显示的数据

- 真实项目可以使用第三方插件:

  ​	[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

#### 7) 事件销毁

Vue 组件销毁时，实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。单独添加的监听事件是不会移除的，需要手动移除事件的监听，以免造成内存泄漏。

```
created() {
	document.addEventListener('scroll', this.onScroll, false);
},
beforeDestory() {
	document.removeEventListener('scroll', this.onScroll, false);
}
```



### 2. webpack配置层面优化

#### 1) 兼容性处理

- JS
  - babel-loader: presets: ['@babel/preset-env'] 问题就是只能编译/转换简单语法
  - @babel/polyfill: 做复杂语法(新的APi)兼容，问题是体积太大了
  - core-js: 在@babel/preset-env基础上，增加了useBuiltIns: 'usage'来实现按需打包
- CSS  
  - postcss-loader  
  
  - 内部使用autoprefixer插件, 给C3样式自动添加厂商前缀
  
    ![preview](https://segmentfault.com/img/remote/1460000014782566/view)
  
  - 在package.json中指定browserslist来指示postcss-loader兼容性做到什么程度

#### 2) 拆分打包与压缩

对第三方JS包, css进行拆分打包

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2130fabf53ec430b9d103ae8b8009eca~tplv-k3u1fbpfcp-watermark.image)

#### 3) 资源预加载(prefetch)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a896fd6ab9e4e3b9479ea018aae8b49~tplv-k3u1fbpfcp-watermark.image)

#### 4) 生产环境时不生成 SourceMap

productionSourceMap: false

减少打包文件

#### 5) 文件名hash化=>利用浏览器缓存

对打包文件名用上contenthash ==> 某个bundle对应的模块文件内容发生改变文件名才会变化 ===> 利用浏览器缓存

#### 6) 代码Tree Shaking

效果: 打包时'摇掉'模块中没有被使用的代码

条件: 必须是ES6模块化导出且进行代码压缩时



### 3. 基础的Web技术层面的优化

#### 1) 开启 Gzip

- 下载: yarn add compression-webpack-plugin --dev

- vue.config.js

```
var CompressionWebpackPlugin = require('compression-webpack-plugin');
...
configureWebpack: config => {
  config.plugins.push(
      new CompressionWebpackPlugin({
          test: new RegExp('\\.(js|css)$'),
          threshold: 8192,
          minRatio: 0.8
      })
 )
```

- nginx.conf中

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6749ab642da04d578181cc30d6f114e7~tplv-k3u1fbpfcp-watermark.image)

#### 2) 静态资源(css/js/img)使用CND引入

浏览器从服务器上下载 CSS、js 和图片等文件时都要和服务器连接，而大部分服务器的带宽有限，如果超过限制，网页就半天反应不过来。而 CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN 具有更好的可用性，更低的网络延迟和丢包率 。

![image-20201119221157741](images/image-20201119221157741.png)