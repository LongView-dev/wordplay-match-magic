// pages/index/index.js
const app = getApp()

Page({
  data: {
    userInfo: {
      avatar: '/images/default-avatar.png',
      nickname: '玩家',
      level: 1,
      masteredWords: 0,
      totalScore: 0
    },
    todayProgress: 65,
    completedWords: 65,
    bestScore: 1520,
    learnedToday: 32,
    showModal: false,
    recentThemes: [
      {
        id: 1,
        name: '基础词汇',
        icon: '/images/theme-basic.png',
        progress: 80
      },
      {
        id: 2,
        name: '生活用语',
        icon: '/images/theme-life.png',
        progress: 45
      },
      {
        id: 3,
        name: '科技词汇',
        icon: '/images/theme-tech.png',
        progress: 30
      }
    ]
  },

  onLoad() {
    this.loadUserData()
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshData()
  },

  loadUserData() {
    const gameData = app.globalData.gameData
    const userInfo = wx.getStorageSync('userInfo') || {}
    
    this.setData({
      userInfo: {
        avatar: userInfo.avatarUrl || '/images/default-avatar.png',
        nickname: userInfo.nickName || '玩家',
        level: gameData.level || 1,
        masteredWords: gameData.masteredWords || 0,
        totalScore: gameData.score || 0
      }
    })
  },

  refreshData() {
    // 刷新今日进度等数据
    const todayData = wx.getStorageSync('todayData') || {}
    this.setData({
      todayProgress: todayData.progress || 0,
      completedWords: todayData.completed || 0,
      learnedToday: todayData.learned || 0
    })
  },

  navigateToGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  },

  navigateToThemes() {
    wx.switchTab({
      url: '/pages/themes/themes'
    })
  },

  navigateToPk() {
    wx.switchTab({
      url: '/pages/pk/pk'
    })
  },

  navigateToItems() {
    wx.switchTab({
      url: '/pages/items/items'
    })
  },

  selectTheme(e) {
    const themeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/game/game?themeId=${themeId}`
    })
  },

  showProgressModal() {
    this.setData({
      showModal: true
    })
  },

  hideProgressModal() {
    this.setData({
      showModal: false
    })
  },

  stopPropagation() {
    // 阻止事件冒泡
    return false
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '一起来玩文字匹配魔法吧！',
      path: '/pages/index/index',
      imageUrl: '/images/share-img.png'
    }
  },

  onShareTimeline() {
    return {
      title: '文字匹配魔法 - 挑战你的词汇量！'
    }
  }
})
