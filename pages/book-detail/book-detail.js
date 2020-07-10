// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js';
const bookModel = new BookModel()
const likeModel = new LikeModel()
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
    comments: [], //书籍短评
    likeStatus: false, // 
    likeCount: 0, // 喜欢书籍数量
    posting: false,
    book: null,
    posting: false
  },
  onLoad: function (options) {
    wx.showLoading() // 加载框
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    // detail.then(res => {
    //   this.setData({
    //     book: res
    //   })
    //   console.log(res)
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    //   console.log(this.data.comments)
    // })
    // likeStatus.then(res => {
    //   console.error(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    // all 等待所有执行完毕  返回新的回调函数
    Promise.all([detail, comments, likeStatus]).then(res => {
      console.log(res)
      this.setData({
        book: res[0],
        comments: res[1],
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
  },
  onLike(event) {
    console.log(event)
    const like_or_cancel = event.detail.behavior
    console.log(like_or_cancel)
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    console.log(event)
    const comment = event.detail.text || event.detail.value
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: true
      })
      return
    }
    bookModel.getComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comment: this.data.comments,
        posting: false
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
