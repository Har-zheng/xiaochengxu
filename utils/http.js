import { config } from '../config.js'
const tips = {
    1: '抱歉出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}
class HTTP{
    request(params){
        // url data method
        if(!params.method){
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.data,
            header:{
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                // startwith
                // endwith
                let code = res.statusCode.toString()
                if(code.startsWith('2')){
                    params.success(res.data)
                }else {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(1)
            }
        })
    }
    _show_error(error_code){
        wx.showToast({
            title:  tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}
export { HTTP }