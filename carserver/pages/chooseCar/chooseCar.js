// pages/chooseCar/chooseCar.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cars: ['冀A · B12345', '冀B · B12345', '冀C · B12345', '冀D · B12345', '冀F · B12345',],
  },
  // 选择车辆，然后填写到上一层页面的文本中
  ChooseCar: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var viewId = e.target.id;//点击的view的id
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      chooseCar: viewText
    }),
    wx.navigateBack({
      url:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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