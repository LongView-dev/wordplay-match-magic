# 微信小程序版本分支

这个分支包含了从React Web应用转换而来的微信小程序版本。

## 分支说明

- 分支名称：`miniprogram-version`
- 小程序代码位置：`/miniprogram` 目录
- 原Web版本代码保持不变

## 版本对比

| 特性 | Web版本 (main分支) | 小程序版本 (当前分支) |
|-----|-------------------|---------------------|
| 框架 | React + TypeScript | 原生微信小程序 |
| 路由 | React Router | 小程序页面路由 |
| 样式 | Tailwind CSS | WXSS |
| 状态管理 | React Hooks | 小程序Data |
| 构建工具 | Vite | 微信开发者工具 |

## 如何使用小程序版本

1. 切换到本分支：`git checkout miniprogram-version`
2. 进入小程序目录：`cd miniprogram`
3. 使用微信开发者工具打开该目录
4. 配置AppID并运行

## 功能实现状态

- ✅ 首页
- ✅ 游戏核心功能
- ⏳ PK对战（基础框架）
- ⏳ 道具中心（基础框架）
- ⏳ 主题选择（基础框架）

详细使用说明请查看 `/miniprogram/README.md`
