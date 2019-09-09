var bmap = require('../../config/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    sugData: '',
    textinfos: "请输入起始地点",
    purposeinfos: "请输入目的",
    purpose: "",
    pickUpPoint:"",
    destination:""
  },

  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  bindKeyInput: function (e) {
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var sugData = [];
      for (var i = 0; i < data.result.length; i++) {
        sugData[i] = data.result[i].name;
      }
      that.setData({
        sugData: sugData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  suData: function (e) {
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本

    //console.log(viewText)
    var that = this;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      pickUpPoint: viewText,
    }),
    console.log(prevPage.data.pickUpPoint)
    that.setData({

      textvalue: viewText,
      
      //status:0,
      sugData: ''
    })
   
    console.log(this.data.textinfos);
    //this.onReady();
  },
  purposeData: function (e) {
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本
    //console.log(viewText)
    var that = this;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      destination: viewText,
    });
    console.log(prevPage.data.destination)
    that.setData({

      purpose: viewText,

      //status:0,
      purposeData: ''
    })
  },
  purposeInput: function (e) {
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        purposeData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var purposeData = [];
      for (var i = 0; i < data.result.length; i++) {
        purposeData[i] = data.result[i].name;
      }
      that.setData({
        purposeData: purposeData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  }

})