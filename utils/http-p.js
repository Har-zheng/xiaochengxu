import {
    config
} from '../config.js'
import { Base64 } from 'js-base64'
const tips = {
    1: '抱歉出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在',
    1007: 'url错误',
    1000: '输入参数错误',
    1001: '输入的json格式不正确',
    1002: '找不到资源',
    1003: '未知错误',
    1004: '禁止访问',
    1005: '不正确的开发者key',
    1006: '服务器内部错误'
}
class HTTP {
    request({
        url,
        data,
        method
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data = {}, method = "GET") {
        // url data method
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                Authorization: this._encode()
            },
            success: (res) => {
                // startwith  首部的匹配
                // endwith 尾部部的匹配
                console.log(res)
                const code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }
        })
    }
    _show_error(error_code) {
        console.log(error_code)
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
    _encode() {
        const token = wx.getStorageSync('token')
        const base64 = Base64.encode(token + ':')
        return 'Basic ' + base64
    }
}
export {
    HTTP
}