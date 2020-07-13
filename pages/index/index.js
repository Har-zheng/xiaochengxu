//index.js
import {
  CalssicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let calssicModel = new CalssicModel()
let likeModel = new LikeModel()
//获取应用实例
const app = getApp()

Page({
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    calssicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.likeStatus
      })
      // latestClassic latestIndex currentclassic currentIndex
    })
  },
  onLik: function (event) {
    let behavior = event.detail.behavior
    console.log(behavior)
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function (event) {
    this._updateClassic('next')
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },
  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classic.index
    console.log(index)
    calssicModel.getClssic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: calssicModel.isLatest(res.index),
        first: calssicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus: function (artID, category) {
    likeModel.getClassLikeStatus(artID, category, (res) => {
      const { favNums, likeStatus  } = res
      this.setData({
        likeCount:favNums,
        likeStatus
      })
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})