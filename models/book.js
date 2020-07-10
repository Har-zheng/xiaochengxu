import {
  HTTP
} from '../utils/http-p.js'
class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  search(start, q) {
    return this.request({
      url:'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
  getComment(bid, comment) {
    return this.request({
      url: `book/add/short_comment`,
      method: 'POST',
      data: {
        bookId: bid,
        content: comment
      }
    })
  }


}
export { BookModel }