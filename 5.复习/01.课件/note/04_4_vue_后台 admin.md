# 后台管理项目总结

## 商品管理功能
    分类查询
    品牌管理
    平台属性管理
    SPU管理
    SKU管理

## 使用的库
    vue
    vue-router
    vuex
    element-ui
    axios
    nprogress
    js-cookie
    lodash

## Vue配置
    name
    data
    props
    computed
    watch
    methods
    mounted/created
    components

## 2个重要方法:
    vm.$set()与Vue.set()
    vm.$nextTick()与Vue.nextTick()

## 组件间通信
    父向子通信 / 父组件更新子组件的数据
        非函数props
        ref
        $children
    子向父通信 / 子组件更新父组件的数据
        函数props
        自定义事件
        $parent
    父子双向通信
        v-model
        .sync
    祖孙间通信
        $attrs & v-bind
        $listeners & v-on
    兄弟间通信
        全局事件总线
        vuex
    任意间通信
        全局事件总线
        vuex

## element-ui
    Card: 卡片效果的块, 很简单
    Table: 列表表格组件, 最常用最复杂的组件之一
    Form: 表单组件, 包括数据收集与表单校验, 最常用最复杂的组件之一
    Select: 选择器, 基本的表单项组件
    Input: 单行输入, 基本的表单项
    Button: 按钮组件, 简单的基础的
    Popconfirm: 气泡确认框, 常用于删除操作的确认提示
    Tag: 标签, 比较简单
    Pagination: 分页组件, 与我们自定义的分页组件类似
    Drawer: 抽屉组件, 用得相对少些, 不太复杂
    Dialog: 对话框组件, 最常用最复杂的组件之一
    Upload: 文件上传组件, 封装度高, 最复杂的组件之一
    MessageBox: 消息警告框与确认框
    Message: 消息提示
    Row/Col: 行列布局
    Carousel: 轮播组件

## 与后台交互
    axios二次封装
    swagger接口文件与测试接口
    定义接口请求函数模块
    整合所有接口请求函数模块并暴露
    将API挂载到Vue的原型对象上
    在组件中调用接口请求函数与后台交互

## 数据处理/整理
    请求得到的数据: 整理后才保存到状态用于显示   ==> SpuForm的spuImageList
    组件间传递对象数据: 需要进行对象的浅拷贝或深拷贝  ==> 平台属性修改的取消功能
    在用户操作过程中: 需要将数据收集到特定对象或数组中, 用于提交请求的参数
    在提交请求前: 需要对收集的数据进行整理后才能完全满足接口参数的要求  spuImageList/spuSaleAttrList

## 项目开发中数组常用方法
    forEach()
    map()
    filter()
    reduce()
    find()
    some()
    every()
    splice()

