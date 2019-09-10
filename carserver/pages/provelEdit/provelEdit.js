var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name : "请输入车牌号码",
     dName :"未使用",
     inspection :"请输入年审信息", 
    insurance:"请输入保险信息",
    tonnage:"请输入车辆吨位",
     hundredKmFuel:"请输入百公里耗油",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (Object.keys(options).length != 0) {
      var vehicleId = options.id
      wx.request({
        url: api.FindProvelByIdURL,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: vehicleId,
        },
        success: function (res) {
          var name = res.data.data.name;
          var dName = res.data.data.dName;
          var inspection = res.data.data.inspection;
          var insurance = res.data.data.insurance;
          var tonnage = res.data.data.tonnage;
          var hundredKmFuel = res.data.data.hundredKmFuel;
          that.setData({
            name: name,
            dName: dName,
            inspection: inspection,
            insurance: insurance,
            tonnage: tonnage,
            id:vehicleId,
            hundredKmFuel: hundredKmFuel,
          })
        },
        fail: function () {
          wx.showModal({
            showCancel: false,
            content: '糟糕，网络信号差',
          })
        }
      })
    }
  },
  /**点击取消更改按钮 */
  cancelModalcnt: function (e) {
    var id =e.target.id;
    wx.showModal({
      content: '确认删除车辆？',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: api.DeleteProvelByIdURL,
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              id:id,
            },
            success:function(){
              wx.navigateBack({
                url: ''
              })
            },
            fail: function () {
              wx.showModal({
                showCancel: false,
                content: '糟糕，网络信号差',
              })
            }
          })
        }
      },
    })
    
  },
  /**点击提交更改 */
  modalcnt: function (e) {
    var id = e.target.id;
    let that = this;
    var name = that.data.name;
    var dName = that.data.dName;
    var inspection = that.data.inspection;
    var insurance = that.data.insurance;
    var tonnage = that.data.tonnage;
    var hundredKmFuel = that.data.hundredKmFuel;
    wx.showModal({
      content: '确认提交更改？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.UpProvelByIdURL,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              name: name,
              dName: dName,
              inspection: inspection,
              insurance: insurance,
              tonnage: tonnage,
              id: id,
              hundredKmFuel: hundredKmFuel,
            },
            success: function (res) {
              wx.navigateBack({
                url: ''
              })
            },
            fail: function () {
              wx.showModal({
                showCancel:false,
                content: '糟糕,网络信号差',
              })
            }
          })
        }
      }
    })
  },
  newProvel:function(e){
    let that = this;
    var name= that.data.name;
    var inspection = that.data.inspection;
    var insurance = that.data.insurance;
    var tonnage = that.data.tonnage;
    var hundredKmFuel = that.data.hundredKmFuel;
    if (name =='请输入车牌号码'){
      wx.showModal({
        content: '请输入车牌号码',
      })
      return
    }
    if(inspection=='请输入年审信息'){
      wx.showModal({
        content: '请输入年审信息',
      })
      return
    }
    if (insurance =='请输入保险信息'){
      wx.showModal({
        content: '请输入保险信息',
      })
      return
    }
    if (tonnage =='请输入车辆吨位'){
      wx.showModal({
        content: '请输入车辆吨位',
      })
      return
    }
    if (hundredKmFuel == '请输入百公里耗油') {
      wx.showModal({
        content: '请输入百公里耗油',
      })
      return
    }
    wx.showModal({
      content: '确认新增？',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: api.InsertProvelURL,
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              name: name,
              inspection: inspection,
              insurance: insurance,
              tonnage: tonnage,
              hundredKmFuel: hundredKmFuel,
            },
            fail:function(){
              wx.showModal({
                content: '糟糕,网络信号不好',
              })
            },
            
          })
          wx.navigateBack({
            url: ''
          })
        }
      }
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value,
    })
  }
  ,

  dNameInput: function (e) {
    this.setData({
      dName: e.detail.value,
    })
  }
  ,

  inspectionInput: function (e) {
    this.setData({
      inspection: e.detail.value,
    })
  }
  ,

  insuranceInput: function (e) {
    this.setData({
      insurance: e.detail.value,
    })
  }
  ,

  tonnageInput: function (e) {
    this.setData({
      tonnage: e.detail.value,
    })
  }

  ,

  hundredKmFuelInput: function (e) {
    this.setData({
      hundredKmFuel: e.detail.value,
    })
  }

















})