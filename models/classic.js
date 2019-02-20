import { HTTP } from '../utils/http.js'
class CalssicModel extends HTTP{
    getLatest(sCallback) {
        this.request({
            url: '/classic/latest',
            success: (res)=> {
              console.log(res)
              sCallback(res)
            }
        })
    }
}
export { CalssicModel }