var api = require('../../config/api.js');
var util = require('../../config/jsDateTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**当datas为0时候说明没有数据，显示空数据页面 */
    datas: 1,
    id: '',
  },

  loding: function () {
    var identity = wx.getStorageSync('identity'); 
    var ListPassURL = api.ListPassURL;
    if (identity == 1) {
      ListPassURL = api.SelectByStatusURL;
    }
    var phone = wx.getStorageSync('passwd');
    console.log("phone:" + phone);
    var that = this;
    wx.request({
      url: ListPassURL,
      method: 'POST',
      data: {
        phone: phone,
        OrderStatus:'pass'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data);

        let responseBody = res.data.data
        console.log("加载的时候执行" + responseBody);
        console.log(responseBody);
        var id = [];
        var bookingStartTime = [];
        var endOfAppointment = [];
        var name = [];
        var applyDepartment = [];
        var vehicleId = [];
        var pickUpPoint = [];
        var destination = [];
        var pages = [];
        var infos = [];
        for (var i = 0; i < responseBody.length; i++) {
          id[i] = responseBody[i].id;
          bookingStartTime[i] = responseBody[i].bookingStartTime;
          endOfAppointment[i] = responseBody[i].endOfAppointment;
          name[i] = responseBody[i].name;
          applyDepartment[i] = responseBody[i].applyDepartment;
          vehicleId[i] = responseBody[i].vehicleId;
          pickUpPoint[i] = responseBody[i].pickUpPoint;
          destination[i] = responseBody[i].destination;
          pages[i] = responseBody[i].pages;
          infos[i] = [id[i],bookingStartTime[i], endOfAppointment[i], name[i], applyDepartment[i], vehicleId[i], pickUpPoint[i], destination[i], pages[i]];
        }
        console.log(infos);
        that.setData({
          infos: infos,
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
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.loding();
  // },

  /**重新加载的时候执行该方法 */
  onShow() {
    this.loding();
  },
  /**重新加载的时候执行该方法 */
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      //this.getData = '数据拿到了'
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.loding();
    }, 500)
  }
})