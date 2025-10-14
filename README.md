# metools-app-starter

metools 工具（迷途工具箱）插件开发脚手架，支持在线调试和打包。

## 简介

本项目是专为 metools 工具（迷途工具箱） 设计的插件开发脚手架。通过此脚手架，开发者可以快速创建、调试和打包适用于 metools 平台的 Vue3 插件。

## 作者简介

本项目由"一个橙子"开发，是一位专注于软件开发、软件制作和软件运维的互联网开发者。"一个橙子"致力于为用户提供高质量的软件解决方案，涵盖前端组件开发、云函数服务以及各种实用工具的开发。

"一个橙子"维护着个人技术网站 [yigechengzi.com](https://yigechengzi.com/)，分享软件开发经验和技术文章，提供 HOWUSE 前端组件库和橙汁云函数等实用工具。

如果您觉得该项目还不错，可以扫一下二维码捐赠。
<div style="display: flex; justify-content: space-around; align-items: center; margin: 20px 0;">
    <div style="text-align: center;">
        <img src="捐赠.png" alt="捐赠二维码" style="width: 200px; height: 200px;">
        <p>扫码捐赠支持</p>
    </div>
    <div style="text-align: center;">
        <img src="%E5%85%AC%E4%BC%97%E5%8F%B7.jpg" alt="公众号二维码" style="width: 200px; height: 200px;">
        <p>扫码关注公众号</p>
    </div>
</div>

## 技术选型

1. 打包工具采用 tsdown: https://tsdown.dev/zh-CN/guide/getting-started
2. 使用 vite 预览 playground: https://vitejs.dev/guide/
3. 支持 typescript + vue3
4. 项目可以打包并返回一个 vue3 组件
5. 插件名称必须是 metools-app- 开头
6. index.ts 导出必须是以下格式

```typescript
export const info = {
    version: "1.0.0", // 版本号，引入package.json的version
    name: "应用商店", // 中文必须修改
    enName: "AppStore", // 英文名必须修改
    description: "应用商店", // 描述，不小于10个字符。打包时引入package.json的description
    author: "Jiawei", // 作者，引入package.json的author
    icon: icon, // 应用图标，必须存在
}

export default 【vue3组件】
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## GitHub部署与模板项目设置

本项目支持部署到GitHub并设置为模板仓库，方便其他开发者快速创建基于此脚手架的新项目。

详细部署指南请参考 [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) 文件。

您也可以通过以下命令获取部署指导：
```bash
npm run deploy:github
```

## 插件命名规范

当创建新的插件时，请确保：

1. 插件文件名必须以 `metools-app-` 开头
2. 在 `src/index.ts` 中正确导出插件信息
3. 插件信息包含完整的元数据（版本、名称、描述、作者、图标）

例如，如果创建一个名为 "天气预报" 的插件，文件名应为 `metools-app-weather.vue`。

## 注意事项

1. 打包时必须校验插件名称是否是 metools-app- 开头，否则将无法在 metools 平台中使用。
2. 打包时必须校验 export 信息是否完整。
3. 插件需要遵循 metools 平台的设计规范和交互要求。