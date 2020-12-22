// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"123"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      数据流
      Vue 单向
        双向数据绑定  v-model原理(input或change)
        显示初始值  :value="msg"
        当用户修改input的值时,同时将用户输入的结果赋值给data
        @input="(event)=>{this.msg=event.target.value}"
      React 单向
      小程序 单向
        双向数据绑定->有->但是不好用
    */
    /*
    获取
      Vue this.msg->数据代理  ->msg属性具有get方法,返回this.$data.msg
      React this.state.msg->没有数据代理
      小程序  this.data.msg->没有数据代理

    修改
      Vue this.msg=234->数据代理 ->msg属性具有set方法,会设置给this.$data.msg  ->数据劫持,当$data中的数据发生变化,会触发dep.notify()
      Vue的最小更新单位->组件(能做到如此精准的原因是因为每个组件都有dep和watcher的关系,还有每个data属性的set方法)

      React this.state.msg=234(不行的) this.setState({msg:234})(可行)   持久化存储
      React的最小更新单位->App(不精准的原因,因为没有数据劫持)
      面试题:setState更新state的效果是同步还是异步?
      答:某些情况是同步更新,某些情况是异步更新
      异步更新(将更新的效果延后,多次更新合并成一次):
        1.生命周期(生命周期结束之后,才会执行所有的更新)
        2.合成事件
      
      同步更新:
        1.原生事件
        2.定时器

      面试题:如何区分合成事件和原生事件
        <div onClick={handleClick}>123</div>
        <div onclick={handleClick}>123</div>
        box.onmousemove
        合成事件(捡来的):驼峰命名法
          实现原理:将所有的事件都绑定在document上,实现事件委派
        原生事件(亲儿子):全小写
    
    小程序(状态持久化)
      this.data.msg=234(不可行)
      this.setData({
        msg:234
      })

    */
    this.setData({
      msg:234
    })
    console.log('msg', this.data.msg)
    console.log('msg', this)
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})