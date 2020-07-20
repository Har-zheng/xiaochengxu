// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuccess: false
  },
  textPaste(text) {
    console.log(text)
    const that = this
    wx.setClipboardData({
      data: '链接：https://pan.baidu.com/s/135Mg72RDYiYYHNKQTxo2Xg   提取码：zhz9',
      success: function (res) {
        wx.getClipboardData({ //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            console.log(res.data) // data
            that.setData({
              isSuccess: true
            })
          }
        })
      }
    })
  },
  textPaste2(text) {
    console.log(text)
    wx.setClipboardData({
      data: '链接：https://pan.baidu.com/s/18INvs6WU5Us65ZkpBocSNA   提取码：zhz9',
      success: function (res) {
        wx.getClipboardData({ //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
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