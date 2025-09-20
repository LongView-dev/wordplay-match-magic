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
      currentTheme: 'default'
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
      }
    })

    // 获取用户信息
    this.loadUserData()
  },

  loadUserData() {
    // 从本地存储加载用户数据
    try {
      const gameData = wx.getStorageSync('gameData')
      if (gameData) {
        this.globalData.gameData = gameData
      }

      const pkData = wx.getStorageSync('pkData')
      if (pkData) {
        this.globalData.pkData = pkData
      }
    } catch (e) {
      console.error('加载用户数据失败', e)
    }
  },

  saveUserData() {
    // 保存用户数据到本地存储
    try {
      wx.setStorageSync('gameData', this.globalData.gameData)
      wx.setStorageSync('pkData', this.globalData.pkData)
    } catch (e) {
      console.error('保存用户数据失败', e)
    }
  },

  updateGameData(key, value) {
    this.globalData.gameData[key] = value
    this.saveUserData()
  },

  updatePkData(key, value) {
    this.globalData.pkData[key] = value
    this.saveUserData()
  }
})
