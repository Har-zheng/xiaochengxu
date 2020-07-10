import { HTTP } from '../utils/http-p.js'
class LikeModel extends HTTP {
    like(behavior, artID, category) {
        let url = behavior== 'like'?'like':'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    }
    getClassLikeStatus(artID, category, sCallback){
      const favor =  this.request({
            url: 'classic/'+ artID + '/'+ category  +'/favor',
        })
        favor.then(res => {
           sCallback(res)
        })
    }
}
export { LikeModel }