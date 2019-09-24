var dateTimePicker = require('../../utils/dateTimePicker.js');
var api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**判断是否是重新申请 */
      isResetApplication:0,
    /**预约开始时间 */
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    
    dateTimeArray1: null,
    dateTime1: null,

    dateTimeArray2: null,
    dateTime2: null,
    startYear: 2000,
    endYear: 2050,

    bookingStartTime:"",
    endOfAppointment:"",
    serviceTime:"",
    chooseCar:"请您选择车辆",
    userId:"请输入乘车人姓名",
    alongNumber:"请输入随行人数",
    pickUpPoint:"请输入上车地点",
    destination:"请输入目的地",
    typeService:"请输入用车理由",
    serviceProject:"请输入用车项目",
    serviceAddress:"请输入用车地点",
    
  },  
  userIdInput:function(e){
    this.setData({
      userId:e.detail.value
    })
  },
  alongNumerInput: function (e) {
    this.setData({
      alongNumber: e.detail.value
    })
  },
  alongNumerInput: function (e) {
    this.setData({
      alongNumber: e.detail.value
    })
  },

  pickUpPointInput: function (e) {
    this.setData({
      pickUpPoint: e.detail.value
    })
  },
  destinationInput: function (e) {
    this.setData({
      destination: e.detail.value
    })
  },
  typeServiceInput: function (e) {
    this.setData({
      typeService: e.detail.value
    })
  },
  serviceProjectInput: function (e) {
    this.setData({
      serviceProject: e.detail.value
    })
  },
  serviceAddressInput: function (e) {
    this.setData({
      serviceAddress: e.detail.value
    })
  },




  // 提示跳转到首页
  modalcnt: function (e) {
    this.setData({
      bookingStartTime: ['20' + this.data.dateTime[0] + '-' + (this.data.dateTime[1] + 1) + '-' + (this.data.dateTime[2] + 1) + ' ' + this.data.dateTime[3] + ':' + this.data.dateTime[4] + ':' + this.data.dateTime[5]],
      endOfAppointment: ['20' + this.data.dateTime1[0] + '-' + (this.data.dateTime1[1] + 1) + '-' + (this.data.dateTime1[2] + 1) + ' ' + this.data.dateTime1[3] + ':' + this.data.dateTime1[4] + ':' + this.data.dateTime1[5]],
      serviceTime: ['20' + this.data.dateTime2[0] + '-' + (this.data.dateTime2[1] + 1) + '-' + (this.data.dateTime2[2] + 1) + ' ' + this.data.dateTime2[3] + ':' + this.data.dateTime2[4] + ':' + this.data.dateTime2[5]]
    });
    let that = this;
    var phone = wx.getStorageSync('passwd');
    var bookingStartTime = that.data.bookingStartTime;
    var  endOfAppointment = that.data.endOfAppointment;
    var  serviceTime = that.data.serviceTime;
    var  vehicleId = that.data.chooseCar;
    var  userId = that.data.userId;
    var  alongNumber = that.data.alongNumber;
    var  pickUpPoint = that.data.pickUpPoint;
    var  destination = that.data.destination;
    var  typeService = that.data.typeService;
    var  serviceProject = that.data.serviceProject;
    var serviceAddress = that.data.serviceAddress;

    if (vehicleId == '请您选择车辆'){
      wx.showModal({
        showCancel:false,
        content: '请您选择车辆',
      })
      return;
    }
    if (userId == '请输入乘车人姓名') {
      wx.showModal({
        showCancel: false,
        content: '请输入乘车人姓名',
      })
      return;
    }

    if (alongNumber == '请输入随行人数') {
      wx.showModal({
        showCancel: false,
        content: '请输入随行人数',
      })
      return;
    }
    if (pickUpPoint == '请输入上车地点') {
      wx.showModal({
        showCancel: false,
        content: '请输入上车地点',
      })
      return;
    }
    if (destination == '请输入目的地') {
      wx.showModal({
        showCancel: false,
        content: '请输入目的地',
      })
      return;
    }
    if (typeService == '请输入用车理由') {
      wx.showModal({
        showCancel: false,
        content: '请输入用车理由',
      })
      return;
    }
    if (serviceProject == '请输入用车项目') {
      wx.showModal({
        showCancel: false,
        content: '请输入用车项目',
      })
      return;
    }
    if (serviceAddress == '请输入用车地点') {
      wx.showModal({
        showCancel: false,
        content: '请输入用车地点',
      })
      return;
    }
    
    if (e.target.id==''){
           
      wx.request({
        url: api.InsertFormURL,
        method: 'POST',
        data: {
          bookingStartTime: bookingStartTime,
          endOfAppointment: endOfAppointment,
          serviceTime: serviceTime,
          vehicleId: vehicleId,
          userId: userId,
          alongNumber: alongNumber,
          pickUpPoint: pickUpPoint,
          destination: destination,
          typeService: typeService,
          serviceProject: serviceProject,
          serviceAddress: serviceAddress,
          phone: phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.state == 200) {
            wx.showModal({
              showCancel: false,
              content: '提交成功',
              success:function(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '../index/index',

                  })
                  wx.request({
                    url: api.ToUsingProvelByIdURL,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      name: vehicleId,
                    }
                  })
                  wx.request({
                    url: api.SelectEmailInfoByIdentityURL,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                  })
                  
                 
                  
                }
              }
            })
           
          }
          

        },
        fail: function (e) {
          wx.showModal({
            showCancel: false,
            content: '请求服务器失败',
          })
          return;
        }
      })
    }else{
      wx.request({
        url: api.UpdataFormByIdURL,
        method: 'POST',
        data: {
          bookingStartTime: bookingStartTime,
          endOfAppointment: endOfAppointment,
          serviceTime: serviceTime,
          vehicleId: vehicleId,
          userId: userId,
          alongNumber: alongNumber,
          pickUpPoint: pickUpPoint,
          destination: destination,
          typeService: typeService,
          serviceProject: serviceProject,
          serviceAddress: serviceAddress,
          OrderStatus:'newinfo',
          id: e.target.id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.state == 200) {
            wx.showModal({
              showCancel: false,
              content: '提交成功',
              success:function(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '../index/index',
                  })
                  wx.request({
                    url: api.ToUsingProvelByIdURL,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      name: vehicleId,
                    },
                    success:function(){
                      wx.request({
                        url: api.SelectEmailInfoByIdentityURL,
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                      })
                    }
                  })
                  
                }

              }
            })
           
          }
        },
        fail: function (e) {
          wx.showModal({
            showCancel: false,
            content: '请求服务器失败',
          })
          return;
        }
      })
}
        
     
  },
  // 点击取消按钮
  cancelModalcnt: function (e) {
    wx.request({
      url: api.ToFinishedUrl,
      method: 'POST',
      data: {
        id:e.target.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.state == 200) {
          wx.showModal({
            showCancel: false,
            content: '取消成功',
          })
          wx.switchTab({
            url: '../index/index',
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          showCancel: false,
          content: '请求服务器失败',
        })
        return;
      }
    })
    wx.navigateBack({
      url:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // var ids="";
    // that.setData({
    //   ids:options.id,
    // })
    var id = '';
    if(Object.keys(options).length!=0){
      id = options.id;
    }
    
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      id=data.id;
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    if(id == ''){
      this.setData({
        dateTime: obj.dateTime,
        dateTimeArray: obj.dateTimeArray,
        dateTimeArray1: obj1.dateTimeArray,
        dateTime1: obj1.dateTime,
        dateTimeArray2: obj2.dateTimeArray,
        dateTime2: obj2.dateTime,
        bookingStartTime: "请输入预约开始时间",
        endOfAppointment:"请输入预约结束时间",
        serviceTime:"请输入用车时间"
      });
    }else{
      var that = this;
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
          that.setData({
            id: res.data.data.id,
            submitTime: submitTime,
            bookingStartTime: bookingStartTime,
            endOfAppointment: endOfAppointment,
            userId: res.data.data.userId,
            name: res.data.data.name,
            applyDepartment: res.data.data.applyDepartment,
            chooseCar: res.data.data.vehicleId,
            alongNumber: res.data.data.alongNumber,
            pickUpPoint: res.data.data.pickUpPoint,
            destination: res.data.data.destination,
            typeService: res.data.data.typeService,
            serviceTime: serviceTime,
            serviceProject: res.data.data.serviceProject,
            serviceAddress: res.data.data.serviceAddress,
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime,
            dateTimeArray2: obj2.dateTimeArray,
            dateTime2: obj2.dateTime,
          });
        },
        fail: function () {
          wx.showModal({
            content: '糟糕,网络信号不好',
            showCancel: false,
          })
        }
      })
    }
     
   
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ 
      dateTime: e.detail.value,
      bookingStartTime: ['20' + this.data.dateTime[0] + '-' + (this.data.dateTime[1]+1) + '-' + (this.data.dateTime[2]+1) + ' ' + this.data.dateTime[3] + ':' + this.data.dateTime[4] + ':' + this.data.dateTime[5]]
      });
  },
  changeDateTime1(e) {
    this.setData({ 
      dateTime1: e.detail.value,
      endOfAppointment: ['20' + this.data.dateTime1[0] + '-' + (this.data.dateTime1[1] + 1) + '-' + (this.data.dateTime1[2] + 1) + ' ' + this.data.dateTime1[3] + ':' + this.data.dateTime1[4] + ':' + this.data.dateTime1[5]]
       });
  },
  changeDateTime2(e) {
    this.setData({
      dateTime2: e.detail.value,
      serviceTime: ['20' + this.data.dateTime2[0] + '-' + (this.data.dateTime2[1] + 1) + '-' + (this.data.dateTime2[2] + 1) + ' ' + this.data.dateTime2[3] + ':' + this.data.dateTime2[4] + ':' + this.data.dateTime2[5]]
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr,
      bookingStartTime: ['20' + this.data.dateTime[0] + '-' + (this.data.dateTime[1] + 1) + '-' + (this.data.dateTime[2] + 1) + ' ' + this.data.dateTime[3] + ':' + this.data.dateTime[4] + ':' + this.data.dateTime[5]]
    });
   
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,
      endOfAppointment: ['20' + this.data.dateTime1[0] + '-' + (this.data.dateTime1[1] + 1) + '-' + (this.data.dateTime1[2] + 1) + ' ' + this.data.dateTime1[3] + ':' + this.data.dateTime1[4] + ':' + this.data.dateTime1[5]]
    });
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr,
      serviceTime: ['20' + this.data.dateTime2[0] + '-' + (this.data.dateTime2[1] + 1) + '-' + (this.data.dateTime2[2] + 1) + ' ' + this.data.dateTime2[3] + ':' + this.data.dateTime2[4] + ':' + this.data.dateTime2[5]]
    });
  },

})