// pages/pendingInfo/pendingInfo.js
var api = require('../../config/api.js');
var util = require('../../config/jsDateTime.js');
Page({

  /**点击撤销 */
  modalcnt: function (e) {
    //var currPage = pages[pages.length - 1];   //当前页面
    // let that = this;
    // var id ="";
    // var vehicleId = "";
    
    
    var arr = (e.target.id).split(",");
    console.log(arr)
    wx.showModal({
      content: '确认撤回该用车申请?',
      cancelColor: '#000000',
      confirmColor: '#576B95',
      success: function (res) {
        if(res.confirm){
          /**向后台请求数据 */
          wx.request({
            url: api.ToUndoUrl,
            method: 'POST',
            data: {
              id:arr[0],
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.state == 200) {
                    wx.navigateBack({
                      url: '',
                    })
                    wx.request({
                      url: api.SendUndoEmailByIdentityURL,
                      method: 'POST',
                      data: {
                        
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                    })
              } 
            },
          fail:function(){
              wx.showModal({
                content: '糟糕,网络信号不好',
                showCancel: 'false',
                success: function (res) {
                  console.log('跳转到审批列表');
                  if(res.confirm){
                    wx.navigateBack({
                      url: '',
                    })
                  }
                  
                }
              });
          }
    }); 
     wx.request({
       url: api.ToUnsedProvelByIdURL,
       method: 'POST',
       data: {
         name:arr[1],
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       success:function(res){

       },
       fail: function () {
         wx.showModal({
           content: '糟糕,网络信号不好',
           showCancel: false,
         })
       }
     })
   }
  }
    })
  },
  btnStart:function(e){
    var id = e.target.id;
    wx.showModal({
      content: '确认启用该用车申请?',
      cancelColor: '#000000',
      confirmColor: '#576B95',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.UpStatusFormIdUrl,
            method: 'POST',
            data: {
              id: id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.navigateBack({
                url: '',
              })
            },
            fail: function () {
              wx.showModal({
                content: '糟糕,网络信号不好',
                showCancel: 'false',
                success: function (res) {
                  console.log('跳转到审批列表');
                  wx.navigateBack({
                    url: '',
                  })
                }
              });
            }
          })
        }
        
      }
    });
    
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
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
    })
    console.log(that.data.id);
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

        console.log(res.data);
        console.log(res.data.data.id)
        console.log(res.data.data.submitTime)
        let submitTime = (res.data.data.submitTime).substring(0, 19);
        let bookingStartTime = (res.data.data.bookingStartTime).substring(0, 19);
        let endOfAppointment = (res.data.data.endOfAppointment).substring(0, 19);
        let serviceTime = (res.data.data.serviceTime).substring(0, 19);
        let approvalTime = (res.data.data.approvalTime).substring(0,19);
        that.setData({
          id: res.data.data.id,
          submitTime: submitTime,
          bookingStartTime: bookingStartTime,
          endOfAppointment: endOfAppointment,
          userId: res.data.data.userId,
          name: res.data.data.name,
          applyDepartment: res.data.data.applyDepartment,
          vehicleId: res.data.data.vehicleId,
          alongNumber: res.data.data.alongNumber,
          pickUpPoint: res.data.data.pickUpPoint,
          destination: res.data.data.destination,
          typeService: res.data.data.typeService,
          serviceTime: serviceTime,
          serviceProject: res.data.data.serviceProject,
          serviceAddress: res.data.data.serviceAddress,
          approvalTime: approvalTime,
          approvaluser: res.data.data.approvaluser,
          approvalOpinion: res.data.data.approvalOpinion,
        });


      }
      , fail: function () {
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