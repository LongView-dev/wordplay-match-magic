// app.js
App({
  globalData: {
    userInfo: null,
    gameData: {
      score: 0,
      level: 1,
      coins: 100,
      experience: 0,
      items: [],
      themes: [],
      currentTheme: 'default',
      masteredWords: 0
    },
    pkData: {
      wins: 0,
      losses: 0,
      streak: 0,
      ranking: null
    }
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      },
      fail: err => {
        console.error('登录失败', err)
      }
    })

    // 获取用户信息
    this.loadUserData()
  },

  onError(error) {
    // 全局错误处理
    console.error('小程序发生错误：', error)
    
    // 记录错误日志
    const errorLogs = wx.getStorageSync('errorLogs') || []
    errorLogs.push({
      time: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack || ''
    })
    
    // 只保留最近的50条错误日志
    if (errorLogs.length > 50) {
      errorLogs.shift()
    }
    
    try {
      wx.setStorageSync('errorLogs', errorLogs)
    } catch (e) {
      console.error('保存错误日志失败', e)
    }
    
    // 显示友好的错误提示
    wx.showToast({
      title: '出了点小问题',
      icon: 'none',
      duration: 2000
    })
  },

  onPageNotFound() {
    // 页面不存在时的处理
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  loadUserData() {
    // 从本地存储加载用户数据
    try {
      const gameData = wx.getStorageSync('gameData')
      if (gameData) {
        this.globalData.gameData = Object.assign({}, this.globalData.gameData, gameData)
      }

      const pkData = wx.getStorageSync('pkData')
      if (pkData) {
        this.globalData.pkData = Object.assign({}, this.globalData.pkData, pkData)
      }
    } catch (e) {
      console.error('加载用户数据失败', e)
      this.onError(e)
    }
  },

  saveUserData() {
    // 保存用户数据到本地存储
    try {
      wx.setStorageSync('gameData', this.globalData.gameData)
      wx.setStorageSync('pkData', this.globalData.pkData)
      return true
    } catch (e) {
      console.error('保存用户数据失败', e)
      
      // 尝试清理存储空间后重试
      try {
        wx.clearStorageSync()
        wx.setStorageSync('gameData', this.globalData.gameData)
        wx.setStorageSync('pkData', this.globalData.pkData)
        return true
      } catch (retryError) {
        console.error('重试保存失败', retryError)
        wx.showToast({
          title: '存储空间不足',
          icon: 'none',
          duration: 2000
        })
        return false
      }
    }
  },

  updateGameData(key, value) {
    this.globalData.gameData[key] = value
    return this.saveUserData()
  },

  updatePkData(key, value) {
    this.globalData.pkData[key] = value
    return this.saveUserData()
  }
})
