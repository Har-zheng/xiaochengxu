// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
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
    book:null
  },
  onLoad: function(options){
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeCount = bookModel.getLikeStatus(bid)
    detail.then(res=>{
      this.setData({
        book: res
      })
      console.log(res)
    })
    comments.then(res=>{
      this.setData({
        comments: res.comments
      })
      console.log(this.data.comments)
    })
    likeCount.then(res=>{
      console.log(res)
    })
   },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
