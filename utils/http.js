import { config } from '../config.js'
const tips = {
    1: '抱歉出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在',
    1007: 'url错误',
    1000:	'输入参数错误',
    1001:	'输入的json格式不正确',
    1002:	'找不到资源',
    1003:	'未知错误',
    1004:	'禁止访问',
    1005:	'不正确的开发者key',
    1006:	'服务器内部错误'
}
class HTTP{
    request(params){
        // url data method
        if(!params.method){
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header:{
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                // startwith
                // endwith
                let code = res.statusCode.toString()
                if(code.startsWith('2')){
                    params.success && params.success(res.data)
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
        console.log(error_code)
        wx.showToast({
            title:  tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}
export { HTTP }