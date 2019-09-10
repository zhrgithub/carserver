// pages/pendingInfo/pendingInfo.js
var api = require('../../config/api.js'); 
Page({
  drivingDistanceInput:function(e){
    this.setData({
      drivingDistance: e.detail.value,
    })
  },
  useFuelInput: function (e) {
    this.setData({
      useFuel: e.detail.value,
    })
  },
  costInput: function (e) {
    this.setData({
      costs: e.detail.value,
    })
  },
  /**点击结束 */
  modalcnt: function (e) {
    var arr = (e.target.id).split(",");
    let that  = this;
    var costs = that.data.costs;
    var drivingDistance = that.data.drivingDistance;
    var useFuel = that.data.useFuel;
    if(costs == ''){
      wx.showModal({
        showCancel: false,
        content: '请输入此次维修费用',
      })
      return;
    }
    if (drivingDistance == '请输入本次行驶里程') {
      wx.showModal({
        showCancel: false,
        content: '请输入本次行驶里程',
      })
      return;
    }
    if (useFuel == '请输入本次耗油') {
      wx.showModal({
        showCancel: false,
        content: '请输入本次耗油',
      })
      return;
    }
    wx.showModal({
      content: '确认结束该申请流程?',
      cancelColor: '#000000',
      confirmColor: '#576B95',
      success: function (res) {
        
        if(res.confirm){
          wx.request({
            url: api.UpCostsByIdUrl,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              id: arr[0],
              costs: costs,
              drivingDistance: drivingDistance,
              useFuel: useFuel,
            },
            success:function(){
              wx.navigateBack({
                url: '',
              })
              wx.request({
                url: api.SendFinishedEmailByIdentityURL,
                method: 'POST',
                data: {
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
              })
            },
            fail: function () {
              wx.showModal({
                content: '糟糕,网络信号不好',
                showCancel: false,

              })
            }
          })
          wx.request({
            url: api.ToUnsedProvelByIdURL,
            method: 'POST',
            data: {
              name: arr[1],
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

            },
            fail: function () {
              wx.showModal({
                content: '糟糕,网络信号不好',
                showCancel: false,
              })
            }
          })
          
        };
        
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换，默认值是0
    currentTab: 0,
    //判断是审批通过
    flag: 1,
    costs:"",
    drivingDistance:'请输入本次行驶里程',
    useFuel:'请输入本次耗油',
   // hundredKmFuel:'请输入百公里耗油'
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
        that.setData({
          id: res.data.data.id,
          submitTime: submitTime,
          approvalTime: approvalTime,
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
          serviceTime: serviceTime,
          serviceProject: res.data.data.serviceProject,
          serviceAddress: res.data.data.serviceAddress,
          //drivingDistance: res.data.data.drivingDistance,
          //useFuel: res.data.data.useFuel,
          hundredKmFuel: res.data.data.hundredKmFuel,
          name: res.data.data.name,
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