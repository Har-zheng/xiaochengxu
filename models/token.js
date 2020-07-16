import { config } from '../config'
class Token{
  constructor(){
    this.verifyUrl = config.api_base_url + 'token/verify'
    this.tokenUrl = config.api_base_url + 'token'
  }
  varify(){
    const token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServer()
    }else{
      this._verifyFromServer(token)
    }
  }
  _verifyFromServer(token){
    const that = this
    wx.request({
      url: that.verifyUrl,
      method: "post",
      data: {
        token
      },
      success: (res)=> {
        const isValid = res.data.is_valid
        if(!isValid){
          this.getTokenFromServer()
        }
      }
    })
  }
  getTokenFromServer(callBack){
    const that = this
    wx.login({
      success: (res)=> {
        wx.request({
          url: that.tokenUrl,
          method: "post",
          data: {
            type: 100, // 后端统一设置  类型 100 为小程序登录
            account: res.code
          },
          success: (res)=> {
            wx.setStorageSync('token', res.data.token)
            callBack && callBack(res)
          }
        })
      }
    })
  }
}
export {
  Token
}