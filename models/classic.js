import {
    HTTP
} from '../utils/http-p.js'
class CalssicModel extends HTTP {
    getLatest(sCallback) {
        const latest = this.request({
            url: 'classic/latest'
        })
        latest.then(res => {
            console.log(res)
            sCallback(res)
            this._setLatestIndex(res.index)
            let key = this._getkey(res.index)
            wx.setStorageSync(key, res)

        })
    }
    getClssic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or api 写入到缓存中
        // key 确定key
        console.log(nextOrPrevious)
        let key = nextOrPrevious == 'next' ?
            this._getkey(index + 1) : this._getkey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            const classic_res = this.request({
                url: `classic/${index}/${nextOrPrevious}`,

            })
            classic_res.then(res => {
                console.log(res)
                wx.setStorageSync(this._getkey(res.index), res)
                sCallback(res)
            })

        } else {
            sCallback(classic)
        }

    }
    isFirst(index) { //是否1
        return index == 1 ? true : false
    }
    isLatest(index) { //是否最后
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
    _getkey(index) {
        let key = `classic-${index}`
        return key
    }
}
export {
    CalssicModel
}