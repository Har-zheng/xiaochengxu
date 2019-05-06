// componets/seach/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from "../../models/book.js"
import { paginationBev } from "../behaviors/pagination.js"
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load_more() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      const length = this.data.dataArray.length
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unlocked()
        },()=> {
          this.unlocked()
        })
      }
    },
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      // const word = event.detail.value 
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          dataArray: res.books,
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },
    _showResult(){
      this.setData({
        searching: true
      })
    },
    _closeResult(){
      this.setData({
        searching: false
      })
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    }

  }
})
