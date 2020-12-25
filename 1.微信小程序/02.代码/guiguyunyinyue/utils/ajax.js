/*
  封装代码,一般要么暴露数据要么暴露方法
  封装代码核心思想:
    保留公共部分,提取动态传入部分
    封装函数:
      1)保留公共部分(重复出现的代码,比如wx.request(options对象))
      2)提取动态传入部分()
      3)谁调用谁传入
*/

export default function (url, data={}, method="GET") {
  // let result;
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'http://localhost:3000' + url,
      data,
      method,
      success: (res) => {
        // console.log('success', res)
        resolve(res.data);
        // this.setData({
        //   bannerList: res.data.banners
        // })
      }
    });
  })
}