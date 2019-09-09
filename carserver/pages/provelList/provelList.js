var api = require('../../config/api.js');
Page({
  loding: function () {
    let that = this;
    wx.request({
      url: api.ListProvelURL,
      method: 'POST',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data[0])
        let datas = res.data.data;
        var id = [];
        var name = [];
        var dName = [];
        for (var i = 0; i < datas.length; i++) {
          id[i] = datas[i].id;
          name[i]=datas[i].name;
          dName[i]=datas[i].dName;
        }
        console.log(id);
       
        that.setData({
          id: id,
          name:name,
          dName:dName,
        });
      },
      fail:function(){
        wx.showModal({
          showCancel:false,
          content: '糟糕，网络信号差',
        })
      }
    })
  },
  /**重新加载的时候执行该方法 */
  onShow() {
    this.loding();
    console.log(123456498489)
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      //this.getData = '数据拿到了'
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.onShow();
    }, 500)
  },
  /**
   * 页面的初始数据
   */
  data: {
    department: ['冀A · B12345', '冀B · B12345', '冀C · B12345', '冀D · B12345', '冀F · B12345',],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.loding()
  // },

 
   
 
})