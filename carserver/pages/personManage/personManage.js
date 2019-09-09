var api = require('../../config/api.js');
Page({
  loding: function () {
    let that = this;
    wx.request({
      url: api.ListDepartmentURL,
      method: 'POST',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data[0].department)
        let datas = res.data.data;
        var department = [];
        for (var i = 0; i < datas.length; i++) {
          department[i] = datas[i].department;
        }
        console.log(department);
        that.setData({
          department: department,
        });
      },
      fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: false,
        })
      }
    })
  },
  /**重新加载的时候执行该方法 */
  onShow() {
    this.loding();
    console.log(123456498489)
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      //this.getData = '数据拿到了'
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.onShow();
    }, 500)
  },
  /**
   * 页面的初始数据
   */
  data: {
    department: ['冀A · B12345', '冀B · B12345', '冀C · B12345', '冀D · B12345', '冀F · B12345',],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.loding()
  // },
})