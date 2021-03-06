// pages/book/book.js
import { BookModel } from '../../models/book.js'
import { random } from '../../utils/common.js'
const bookModel = new BookModel()
Page({
  /**
   * 组件的属性列表
   */
  properties: {
    searching: false
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 纯粹callback 回调地狱 return
    // promise 代码风格 多个异步等待合并  不需要层层传递callback
    // async await 
    books: [],
    searching: false,
    more: ''
  },
  onLoad: function () {
    const hotList = bookModel.getHotList()
    hotList.then(res => {
      console.log(res)
      this.setData({
        books: res.key
      })
    })
  },
  onSearching: function (event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  },
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
