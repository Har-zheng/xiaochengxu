// pages/my/my.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    authorized: false,
    userInfo: null
  },
  onLoad(options) {
    this.userAuthorized()
    // 用户是否授权
    console.log(123)
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
              console.log(data)
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        authorized: true,
      })
    }
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
