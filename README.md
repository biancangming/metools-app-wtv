# metools-app-wtv

迷途工具箱（metools）· 直播源检测与管理工具

本项目是一个基于 Vue 3 + Vite 的桌面/网页应用，用于导入并检测 IPTV/直播源（m3u/txt），提供速度/分辨率/FPS 等信息展示、重命名与导出、右键菜单操作、暗色主题支持等功能。项目集成了 Naive UI 与 Tailwind CSS v4，适配 Electron webview 的主题控制。

## 主要功能

- 文件导入：支持选择 m3u/txt 文件并解析为列表
- 直播源检测：逐源检测，展示速度（ms）、分辨率（ratio）、帧率（fps）等信息
- 进度展示：顶部进度条与统计信息（已检测/可用数量）
- 列表操作：去重、排序（包括按速度排序）、右键菜单（重命名、复制、清除无效等）
- 扫源助手：弹出式工具（Scan 组件）辅助导入
- 导出功能：支持范围预置的导出对话框（ExportModal）
- 主题模式：Tailwind v4 的暗色模式（class 模式）与 Naive UI 主题联动

## 技术栈

- 框架：Vue 3 + TypeScript
- 构建：Vite 6
- 状态管理：Pinia 3
- UI 组件：Naive UI
- 图标：@vicons/ionicons5
- 样式：Tailwind CSS v4（@import "tailwindcss" + @tailwindcss/postcss）
- 其他：axios 等

## 目录结构（节选）

- src/views/Dashbord/Index.vue：主页面（导入/检测/列表/进度/弹窗等）
- src/views/Dashbord/components/SideMenu.vue：侧边菜单（导入、开始/停止检测、导出）
- src/views/Dashbord/components/IRightMenu.vue：右键菜单容器与操作
- src/views/Dashbord/hooks/m3utable.ts：列表列定义与操作逻辑
- src/store/originFormatData.ts、src/store/video.ts、src/store/webviewMsg.ts：数据与主题状态
- src/assets/tailwind.css：Tailwind v4 入口样式（@import "tailwindcss"）
- postcss.config.js：Tailwind v4 的 PostCSS 插件配置（@tailwindcss/postcss）

## 暗色模式（class 模式）

- Tailwind v4 使用 class 模式：当 <html> 上有 class="dark" 时，dark:XXX 样式生效。
- 在 App.vue 中，主题由 Pinia 的 webviewMsgStore 控制，并在 watch 中同步到 document.documentElement（html）的 dark 类，使 Tailwind 与 Naive UI 主题一致。
- Electron webview 场景下不依赖 prefers-color-scheme 的媒体查询，而是使用显式消息驱动：
  - 向 webview 注入：`window.onMessage('theme-change', 'dark' | 'light')`
  - 或在页面中调用 store：`useWebviewMsgStore().setTheme('dark' | 'light')` / `toggleTheme()`

## 快速开始

### 环境要求

- Node.js 18+（推荐）

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

## Tailwind v4 使用说明

- 入口样式：`src/assets/tailwind.css` 使用 `@import "tailwindcss"`。
- PostCSS 插件：`postcss.config.js` 使用 `@tailwindcss/postcss`。
- 不再需要传统的 `@tailwind base/components/utilities` 指令；`autoprefixer` 也无需手动配置（v4 已内置处理）。
- 由于采用 class 模式的暗色主题，确保在切换时给 `<html>` 添加/移除 `dark` 类即可。

## 常见问题与排查

- Tailwind 类不生效：确认 `src/assets/tailwind.css` 已被 `src/main.ts` 导入；检查 PostCSS 插件配置正确；查看 DevTools 是否存在对应类的样式规则。
- 暗色样式不生效：确认 `<html>` 是否包含 `class="dark"`；检查是否存在 scoped 样式覆盖；确保未依赖 webview 的 `matchMedia` 媒体查询。
- 宽度类无效（如 `w-[200px]`）：给组件添加 `block` 或使用外层容器 `w-[200px]` + 子元素 `w-full`；注意组件库根元素的 display 类型与样式覆盖。

## 作者与许可证

- 作者：Jiawei（一个橙子）
- 许可证：MIT

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