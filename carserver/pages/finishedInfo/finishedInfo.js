var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    //判断是审批通过
    flag: 1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
    })
    var id = that.data.id;
    /**向后台请求数据 */
    wx.request({
      url: api.IdFormUrl,
      method: 'POST',
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       
        let submitTime = (res.data.data.submitTime).substring(0, 19);
        let bookingStartTime = (res.data.data.bookingStartTime).substring(0, 19);
        let endOfAppointment = (res.data.data.endOfAppointment).substring(0, 19);
        let serviceTime = (res.data.data.serviceTime).substring(0, 19);
        let approvalTime = (res.data.data.approvalTime).substring(0,19);
        let endTime = (res.data.data.endTime).substring(0,19);
        that.setData({
          id: res.data.data.id,
          submitTime: submitTime,
          approvalTime: approvalTime,
          endTime: endTime,
          bookingStartTime: bookingStartTime,
          endOfAppointment: endOfAppointment,
          name: res.data.data.name,
          applyDepartment: res.data.data.applyDepartment,
          vehicleId: res.data.data.vehicleId,
          userId: res.data.data.userId,
          alongNumber: res.data.data.alongNumber,
          pickUpPoint: res.data.data.pickUpPoint,
          destination: res.data.data.destination,
          typeService: res.data.data.typeService,
          serviceTime: res.data.data.serviceTime,
          serviceProject: res.data.data.serviceProject,
          serviceAddress: res.data.data.serviceAddress,
          costs: res.data.data.costs,
          drivingDistance:res.data.data.drivingDistance,
          useFuel:res.data.data.useFuel,
          hundredKmFuel:res.data.data.hundredKmFuel,
          approvaluser:res.data.data.approvaluser,
          approvalOpinion:res.data.data.approvalOpinion,
        });
      },
      fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: false,
        })
      }
    })
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

})