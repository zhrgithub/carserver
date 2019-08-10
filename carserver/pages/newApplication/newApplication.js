// pages/newApplication/newApplication.js
Page({
  // 提示跳转到首页
  modalcnt: function () {
     wx.showModal({
       content: '提交成功',
       showCancel:false,
       success(res){
         if (res.confirm) {
           console.log('用户点击确定')
           wx.switchTab({
             url: '../index/index',
           })
         } 
       }
     })
  },

  /**
   * 页面的初始数据
   */
  data: {
    /**判断是否是重新申请 */
      isResetApplication:0,
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