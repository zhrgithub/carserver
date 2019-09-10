// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   OrderStatus:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var identity = wx.getStorageSync('identity')
    that.setData({
      identity: identity,
    })
  },

  infoClick:{
    "touser": "OPENID",
      "msgtype": "text",
        "text":
    {
      "content": "Hello World"
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
  
})