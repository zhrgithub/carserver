var api = require('../../config/api.js'); 
const app = getApp();
Page({

  /**点击撤回 */
  modalcnt: function (e) {
    console.log("e.target.id")
    console.log(e.target.id);
    wx.showModal({
      content: '确认撤回该申请流程?',
      cancelColor:'#000000',
      confirmColor:'#576B95',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          /**向后台请求数据 */
          wx.request({
            url: api.ToRevocationUrl,
            method: 'POST',
            data: {
              id: e.target.id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if(res.data.state==200){
                    wx.navigateBack({
                      url: '',
                    })
              }
            },
            fail:function(){
              wx.showModal({
                content: '糟糕,网络信号差',
                showCancel: 'false',
                success: function (res) {
                  console.log('跳转到审批列表');
                  wx.navigateBack({
                    url: '',
                  })
                }
              });
            }
          });
        }
      }
    })
  },
  
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
    approvalOpinion:"",
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var identity = wx.getStorageSync('identity')
    that.setData({
      id: options.id,
      identity: identity,
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
         var phones = res.data.data.phone;
          app.about = {
            phone:phones,
          };
          that.setData({
            id:res.data.data.id,
            submitTime: submitTime,
            bookingStartTime: bookingStartTime,
            endOfAppointment: endOfAppointment,
            userId: res.data.data.userId,
            name:res.data.data.name,
            applyDepartment: res.data.data.applyDepartment,
            vehicleId: res.data.data.vehicleId,
            alongNumber: res.data.data.alongNumber,
            pickUpPoint: res.data.data.pickUpPoint,
            destination: res.data.data.destination,
            typeService: res.data.data.typeService,
            serviceTime: serviceTime,
            serviceProject: res.data.data.serviceProject,
            serviceAddress: res.data.data.serviceAddress,
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
  optionsInput: function (e) {
    this.setData({
      approvalOpinion: e.detail.value,
    })
  },
/**点击通过 */
  btnPass:function(e){
     var arr = (e.target.id).split(",");
    var userName = wx.getStorageSync('userName')
    let that = this;
    console.log("1111111111111111111111111111111111111111111")
    console.log(that.data.approvalOpinion);
    var approvalOpinion = that.data.approvalOpinion;
    if (approvalOpinion == '') {
      wx.showModal({
        content: '请输入审批意见',
        showCancel: false,
      })
      return
    }
    console.log(arr[0] + "," + userName + "," + approvalOpinion +"OrderStatus")
     wx.showModal({
       content: '确认通过?',
       cancelColor: '#000000',
       confirmColor: '#576B95',
       success:function(e){
         if(e.confirm){
           wx.request({
             url: api.ToPassUrl,
             method: 'POST',
             header: {
               'content-type': 'application/x-www-form-urlencoded'
             },
             data:{
                  id:arr[0],
                  approvaluser:userName,
               approvalOpinion: approvalOpinion,
                  OrderStatus:'pass',
             },
             success:function(){
               
               //成功则跳转到上一个页面
               wx.navigateBack({
                 url:''
               })
               wx.request({
                 url: api.SendEmailByphoneURL,
                 method: 'POST',
                 header: {
                   'content-type': 'application/x-www-form-urlencoded'
                 },
                 data:{
                   phone:app.about.phone,
                 }
               })
             }, 
             fail:function(){
               //失败则提示请求服务器失败
               wx.showModal({
                 content: '糟糕,网络信号不好',
                 showCancel:false,
               })
             }

           })
         }
       }
     })
     
  },
  /**点击退回 */
  btnReturn:function(e){
     var id = e.target.id;
    var arr = (e.target.id).split(",");
    var userName = wx.getStorageSync('userName')
    let that = this;

    console.log(that.data.approvalOpinion);
    var approvalOpinion = that.data.approvalOpinion;
    if(approvalOpinion==''){
      wx.showModal({
        content: '请输入审批意见',
        showCancel:false,
      })
      return
    }
    wx.showModal({
      content: '确认退回?',
      cancelColor: '#000000',
      confirmColor: '#576B95',
      success: function (e) {
        if (e.confirm) {
          wx.request({
            url: api.ToPassUrl,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              id:arr[0],
              approvaluser: userName,
              approvalOpinion: approvalOpinion,
              OrderStatus: 'sendback',
            },
            success: function () {
            //成功则跳转到上一个页面
              wx.navigateBack({
                url: ''
              })
              //修改用车状态为未使用状态
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
              wx.request({
                url: api.SendEmailByphoneURL,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  phone: app.about.phone,
                }
              })
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