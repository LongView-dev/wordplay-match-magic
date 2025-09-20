# 文字匹配魔法 - 微信小程序版

这是从Web React项目转换而来的微信小程序版本。

## 项目结构

```
wordplay-match-magic-miniprogram/
├── pages/                 # 页面文件
│   ├── index/             # 首页
│   ├── game/              # 游戏页面
│   ├── pk/                # PK对战页面
│   ├── items/             # 道具中心页面
│   └── themes/            # 主题选择页面
├── components/            # 自定义组件
├── utils/                 # 工具函数
├── images/                # 图片资源
├── styles/                # 公共样式
├── app.js                 # 小程序逻辑
├── app.json               # 小程序配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
└── sitemap.json           # 站点地图配置
```

## 功能特点

1. **首页功能**
   - 用户信息展示
   - 今日学习进度
   - 快速入口导航
   - 最近学习主题

2. **游戏核心功能**
   - 90秒限时挑战
   - 单词匹配游戏
   - 连击系统
   - 实时计分
   - 游戏结果展示

3. **数据存储**
   - 本地存储用户数据
   - 游戏进度保存
   - 成绩记录

## 使用方法

1. **导入项目**
   - 打开微信开发者工具
   - 选择"导入项目"
   - 选择项目目录：`wordplay-match-magic-miniprogram`
   - 填入您的AppID（在project.config.json中修改）

2. **配置AppID**
   - 打开 `project.config.json`
   - 将 `"appid": "替换为您的AppID"` 修改为您的小程序AppID

3. **添加图片资源**
   需要在 `images` 目录下添加以下图片：
   - 默认头像：`default-avatar.png`
   - 导航图标：`home.png`, `game.png`, `pk.png`, `items.png`, `themes.png`
   - 激活状态图标：`home-active.png`, `game-active.png`, 等
   - 功能图标：`icon-play.png`, `icon-target.png`, `icon-users.png`, 等

4. **运行项目**
   - 在微信开发者工具中编译运行
   - 可以在模拟器中预览效果

## 主要改动说明

### 从React到小程序的转换

1. **组件系统**
   - React组件 → 小程序Page/Component
   - JSX → WXML模板语法
   - useState/useEffect → data和生命周期函数

2. **路由系统**
   - React Router → 小程序页面路由
   - navigate → wx.navigateTo/wx.switchTab

3. **样式系统**
   - Tailwind CSS → WXSS样式
   - className → class
   - rem/px → rpx单位

4. **状态管理**
   - React状态 → 小程序data
   - setState → setData

5. **事件处理**
   - onClick → bindtap
   - onChange → bindinput/bindchange

## 待完善功能

- [ ] PK对战功能详细实现
- [ ] 道具系统完整功能
- [ ] 主题选择和管理
- [ ] 网络请求接入
- [ ] 用户登录系统
- [ ] 排行榜功能
- [ ] 成就系统
- [ ] 音效和动画效果

## 开发建议

1. 根据实际需求完善各个页面的功能
2. 添加网络请求处理真实数据
3. 优化UI和交互体验
4. 添加更多游戏模式
5. 实现社交功能（分享、好友等）

## 注意事项

- 小程序对包大小有限制（主包不超过2MB）
- 需要配置合法域名才能进行网络请求
- 部分Web API在小程序中不可用，需要使用对应的小程序API
- 建议使用小程序官方组件库提升开发效率
