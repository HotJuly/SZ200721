# 前台管理项目总结

## 功能模块

    首页
    商品搜索列表
    商品详情
    购物车
    登陆与注册
    订单交易/结算
    支付
    个人中心/订单列表

## 使用的库

    vue
    vue-router
    vuex
    vee-validate
    vue-lazyload
    element-ui
    
    axios
    mockjs
    nprogress
    uuidjs
    
    swiper
    qrcode
    lodash

## Vue配置

    name
    data
    props
    computed
    watch
    methods
    mounted/created
    beforeCreate
    components

## 2个重要方法:

    vm.$nextTick()与Vue.nextTick()
    vm.$set()与Vue.set()

## 与后台交互

    axios二次封装
        1). 配置通用的基础路径和超时
        2). 显示请求进度条
        3). 成功返回的数据不再是response, 而直接是响应体数据response.data
        4). 统一处理请求错误, 具体请求也可以选择处理或不处理
        5). 每次请求都携带一个userTempId请求头, 数据值在state中
        6). 每次请求(已登陆)都携带一个token请求头, 数据值在state中
    postman与测试接口
    定义接口请求函数模块
    在vuex的异步action中调用接口请求函数
    将API挂载到Vue的原型对象上, 在组件中调用接口请求函数与后台交互: Vue.prototype.$API = this
    当后台接口还未完成时, 先mock数据, 可以使用mockjs, 当然有的公司可能有自己的一套

## vuex

    基本组成: store / state / mutations / actions / modules
    vuex多模块编程: 当要管理的数据过多时, 将每个模块的数据单独管理, 更方便, 更有扩展性
    带vuex的整体编码组成:
        component:
            触发action调用请求获取数据: dispatch()
            读取vuex中的数据: mapState() / mapGetters()
            模板动态显示数据: 插值与指令
        vuex:
            action: 调用API函数请求获取数据, 提交给mutation
            mutation: 更新state数据
        api:
            axios二次封装
            定义针对不同接口的请求函数

## 路由相关

    跳转路由的2种基本方式: 声明式路由与编程式路由
    跳转路由携带参数的类型: params与query参数
    携带参数的2种方式: 字符串与对象形式
    参数相关问题:
        params与path配置能不能同时使用
        如何配置params参数可传可不传?
        路由组件能不能传递props参数
        编程式路由跳转到当前路由, 参数不变会报出错误
    如何让路由跳转后, 滚动条自动停留到起始位置
        scrollBehavior配置
    路由导航守卫的理解和使用
        全局前置守卫
        路由/组件前置守卫

## 自定义通用型/复用型组件的基本步骤

    实现静态组件: 模板/样式写好
    设计从外部接收的数据: props
    设计内部的数据: data
    设计基于props和data的计算属性数据: computed
    根据props和data数据和computed进行动态显示
    更新数据, 更新界面, 通知父组件

## 相关问题(具体内容看笔记)

    编程式路由跳转到当前路由, 参数不变会报出错误
        vue-router版本变化: 上一个项目没问题, 新的项目有问题
        重写VueRouter原型上的push/replace方法
    优化减小打包文件: 
        对UI组件库实现按需打包
        对lodash库实现按需引入
    什么时候需要使用编程式导航代替声明式导航
        有一定条件限定
        个数太多
    优化事件处理效率: 
        利用事件委托
    如何携带点击的分类的数据?
    	event.target得到a标签
    	利用自定义的data标签属性来保存分类信息
    对mouseEnter高频事件进行节流处理
    	使用lodash的throttle进行节流处理
    解决swiper动态页面轮播的bug
        watch + $nextTick()
    解决Floor组件中轮播有问题的bug
        watch的immediate
    分发异步action后, 如何能知道处理完成了
        回调函数
        dipatch()的返回值是异步action返回的promise
    区别userTempId与Token
    	userTempId: 未登陆的标识
    	Token: 登陆用户的标识
    2种懒加载的优化手段:
        路由组件懒加载
        图片懒加载注册





## 面试可说性强的功能

### 三级分类列表

- 使用编程式导航代替声明式导航
  - router-link太多 ==> 创建很多组件对象 ==> 占用内存大, 效率低

- 优化事件处理效率
  - 利用事件委托: event.target
  - 理解事件委托与事件冒泡

- 如何携带点击的分类的数据?
  - event.target得到a标签
  - 利用自定义的data标签属性来保存分类信息

- 对mouseEnter高频事件进行节流处理
  - 使用lodash的throttle进行节流处理
  - 对lodash库实现按需引入

### 商品搜索列表
- 准备各种搜索条件
  - category1Id: '', // 一级分类ID
  - category2Id: '', // 二级分类ID
  - category3Id: '', // 三级分类ID
  - categoryName: '', // 分类名称
  - keyword: '', // 关键字
  - trademark: '', // 品牌  "ID:品牌名称"
  - props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
  - order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
  - pageNo: 1, // 当前页码
  - pageSize: 10, // 每页数量
- 添加搜索条件
- 删除搜索条件
	- 删除分类或关键字条件后, 地址栏还有条件参数?
	- 删除关键字条件, 输入框中的关键字没有同步删除?
- 排序处理
	- 根据综合/价格/销量/评价排序
	- 升序/降序
	- 搞清条件数据结构
		- orderFlag:orderType
		- orderFlag: 1: 综合,2: 价格, 3: 销量, 4: 评价
		- orderType:  asc: 升序,desc: 降序

### 下单支付流程
- 去结算 ==> 获取订单交易数据
- 提交订单 ==>提交下单请求, 得到订单ID
- 根据订单ID获取支付信息
	- 金额
	- 支付url
- 支付
	- 根支付Url生成支付二维码图片显示, 使用qrcode
	- 扫码支付
	- 轮询请求获取订单状态
- 分页显示订单列表

### 注册流程

- 前台: 输入注册需要的相关信息(用户名/密码/...), 进行前台表单校验, 如果不通过, 提示错误
- 前台: 发送注册的ajax请求(post), 携带注册接口需要的相关数据(用户名/密码/...)

- 后台: 获取到注册请求携带的参数, 去数据库中判断是否已经存在
  - 如果已经存在, 返回提示此用户已不存在的提示信息
  - 如果不存在, 保存到数据库, 返回成功的数据
- 前台: 接收到响应
  - 如果是不成功的数据, 提示
  - 如果是成功的数据, 自动跳转到登陆页面

### 登陆流程

- 前台: 输入登陆需要的相关信息(用户名/密码),  进行前台表单校验, 如果不通过, 提示错误
- 前台: 发送登陆的ajax请求(post), 携带登陆接口需要的相关数据(用户名/密码)
- 后台: 获取到登陆请求携带的参数, 去数据库中查询看是否存在
  - 如果不存在, 返回登陆失败的信息
  - 如果存在, 生成一个新的token字符串, 将token与用户信息一起返回
- 前台: 接收到响应
  - 如果是不成功的数据, 提示
  - 如果是成功的数据, 
    - 将用户信息和token都保存到vuex中
    - 将token保存到localStorage中   ==> 不保存用户信息
    - 跳转到首页或redirect页面

### 自动登陆流程

- 简单说: 页面一加载时, 发送请求根据token获取用户信息
- 利用全局前置守卫:
  -  一旦发再当前没有登陆, 但前面登陆过(有token, 没有用户信息)
  - 发送请求根据token获取用户信息
    - 成功了, 保存用户信息及token
    - 失败了(说明token过期了): 清除token, 强制跳转到登陆页面

### 购物车模块
- 购物车数据是保存在后台的, 标识是什么?
  - 未登陆: 标识为用户临时ID(userTempId)
    - 第一次访问时前台利用uuid库生成的唯一字符串, 保存保存在local中
    - 每次请求时通过请求头自动携带它(利用请求拦截器)
  - 登陆: 登陆用户对应的token
    - 用户请求登陆时, 服务器端生成并返回给浏览器, 浏览器收到后自动保存到local中
    - 每次请求时通过请求头自动携带它(利用请求拦截器)
- 添加购物车 / 修改购物项数量
  - 提交请求时, 携带商品的skuid和数量
  - 这2个操作是同一个接口, 也就是数量有可能是负数
- 获取购物车列表
  - 请求获取时不需要携带额外参数, 会自动携带标识: userTempId / token
  - 一旦用户登陆上, 后台会将关联在usertempId上的购物车数据合并到token对应用户关联的购物车数据
- 删除购物项(一个/多个)
  - 请求接口, 携带一个skuId或多个skuId的数组
- 勾选购物项(一个/多个)
  - 请求接口, 携带一个skuId或多个skuId的数组 和 是否勾选的标识数据(0/1)

