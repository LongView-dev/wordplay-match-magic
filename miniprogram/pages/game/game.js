// pages/game/game.js
const app = getApp()

// 模拟单词数据
const MOCK_WORDS = [
  { id: 1, english: 'apple', chinese: '苹果', phonetic: '[ˈæpl]' },
  { id: 2, english: 'book', chinese: '书', phonetic: '[bʊk]' },
  { id: 3, english: 'cat', chinese: '猫', phonetic: '[kæt]' },
  { id: 4, english: 'dog', chinese: '狗', phonetic: '[dɔːɡ]' },
  { id: 5, english: 'water', chinese: '水', phonetic: '[ˈwɔːtər]' },
  { id: 6, english: 'fire', chinese: '火', phonetic: '[ˈfaɪər]' },
  { id: 7, english: 'tree', chinese: '树', phonetic: '[triː]' },
  { id: 8, english: 'house', chinese: '房子', phonetic: '[haʊs]' },
  { id: 9, english: 'car', chinese: '汽车', phonetic: '[kɑːr]' },
  { id: 10, english: 'phone', chinese: '电话', phonetic: '[foʊn]' }
]

Page({
  data: {
    gameState: 'ready', // ready, playing, finished
    currentWordIndex: 0,
    currentWord: {},
    candidates: [],
    score: 0,
    combo: 0,
    timeLeft: 90,
    progress: 0,
    toast: {
      show: false,
      message: '',
      type: 'success'
    },
    result: {
      accuracy: 0,
      timeUsed: 0,
      comboMax: 0,
      newMastered: 0,
      score: 0,
      rewardText: ''
    }
  },

  // 游戏统计
  stats: {
    correctAnswers: 0,
    totalAnswers: 0,
    maxCombo: 0
  },

  timer: null,

  onLoad(options) {
    // 可以根据options传入不同的主题ID
    const themeId = options.themeId || 'default'
    this.initGame()
  },

  onUnload() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },

  initGame() {
    this.setData({
      gameState: 'ready',
      currentWordIndex: 0,
      score: 0,
      combo: 0,
      timeLeft: 90,
      progress: 0
    })
    this.stats = {
      correctAnswers: 0,
      totalAnswers: 0,
      maxCombo: 0
    }
  },

  startGame() {
    this.setData({
      gameState: 'playing'
    })
    this.loadNextWord()
    this.startTimer()
  },

  startTimer() {
    this.timer = setInterval(() => {
      const timeLeft = this.data.timeLeft - 1
      if (timeLeft <= 0) {
        this.endGame()
      } else {
        this.setData({ timeLeft })
      }
    }, 1000)
  },

  loadNextWord() {
    const wordIndex = this.data.currentWordIndex % MOCK_WORDS.length
    const currentWord = MOCK_WORDS[wordIndex]
    const candidates = this.generateCandidates(currentWord)
    
    this.setData({
      currentWord,
      candidates,
      currentWordIndex: wordIndex + 1
    })
  },

  generateCandidates(word) {
    const candidates = [
      { id: 1, chinese: word.chinese, isCorrect: true, selected: false }
    ]
    
    // 添加其他错误选项
    const otherWords = MOCK_WORDS.filter(w => w.id !== word.id)
    const shuffled = otherWords.sort(() => Math.random() - 0.5)
    
    for (let i = 0; i < 3; i++) {
      candidates.push({
        id: i + 2,
        chinese: shuffled[i].chinese,
        isCorrect: false,
        selected: false
      })
    }
    
    // 打乱顺序
    return candidates.sort(() => Math.random() - 0.5)
  },

  selectCandidate(e) {
    if (this.data.gameState !== 'playing') return
    
    const id = e.currentTarget.dataset.id
    const candidates = this.data.candidates
    const selected = candidates.find(c => c.id === id)
    
    if (!selected) return
    
    this.stats.totalAnswers++
    
    if (selected.isCorrect) {
      this.handleCorrect()
    } else {
      this.handleWrong()
    }
    
    // 加载下一个单词
    setTimeout(() => {
      this.loadNextWord()
    }, 500)
  },

  handleCorrect() {
    this.stats.correctAnswers++
    const newCombo = this.data.combo + 1
    this.stats.maxCombo = Math.max(this.stats.maxCombo, newCombo)
    
    // 计算得分
    const baseScore = 10
    const comboBonus = Math.floor(newCombo / 5) * 5
    const earnedScore = baseScore + comboBonus
    
    // 时间奖励
    const timeBonus = 3
    const newTimeLeft = Math.min(this.data.timeLeft + timeBonus, 120)
    
    // 更新进度
    const newProgress = Math.min(100, Math.round((this.stats.totalAnswers / 20) * 100))
    
    this.setData({
      score: this.data.score + earnedScore,
      combo: newCombo,
      timeLeft: newTimeLeft,
      progress: newProgress
    })
    
    this.showToast(`+${earnedScore} 分!`, 'success')
    
    // 检查胜利条件
    if (newProgress >= 100) {
      setTimeout(() => this.endGame(), 1000)
    }
  },

  handleWrong() {
    // 时间惩罚
    const timePenalty = 5
    const newTimeLeft = Math.max(this.data.timeLeft - timePenalty, 10)
    
    this.setData({
      combo: 0,
      timeLeft: newTimeLeft
    })
    
    this.showToast('答错了！', 'error')
  },

  showToast(message, type) {
    this.setData({
      toast: {
        show: true,
        message,
        type
      }
    })
    
    setTimeout(() => {
      this.setData({
        'toast.show': false
      })
    }, 2000)
  },

  endGame() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    
    const accuracy = this.stats.totalAnswers > 0 
      ? Math.round((this.stats.correctAnswers / this.stats.totalAnswers) * 100)
      : 0
    
    const result = {
      accuracy,
      timeUsed: 90 - this.data.timeLeft,
      comboMax: this.stats.maxCombo,
      newMastered: Math.floor(this.stats.correctAnswers / 3),
      score: this.data.score,
      rewardText: '提示卡×1 + 单词碎片×20'
    }
    
    this.setData({
      gameState: 'finished',
      result
    })
    
    // 保存游戏数据
    this.saveGameData()
  },

  saveGameData() {
    const gameData = app.globalData.gameData
    gameData.score += this.data.score
    gameData.experience += this.stats.correctAnswers * 10
    
    // 更新今日数据
    const todayData = wx.getStorageSync('todayData') || {}
    todayData.completed = (todayData.completed || 0) + this.stats.correctAnswers
    todayData.learned = (todayData.learned || 0) + this.stats.correctAnswers
    todayData.progress = Math.min(100, Math.round((todayData.completed / 100) * 100))
    
    wx.setStorageSync('todayData', todayData)
    app.saveUserData()
  },

  handleAgain() {
    this.initGame()
  },

  handleHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
