
# Metools 应用开发规范

## 全局约定

1. `src` 文件夹是项目代码文件夹，所有代码都在这个文件夹下
2. 项目基于 Vue 3 + TypeScript + Vite 构建
3. 使用 Tailwind CSS 进行样式开发
4. 支持 Naive UI 组件库

## 项目结构

```
├── src/                    # 源代码目录
│   ├── app.vue            # 主应用组件
│   ├── main.ts            # 应用入口文件
│   ├── assets/            # 静态资源
│   │   └── styles/        # 样式文件
│   └── components/        # 组件目录
├── dist/                  # 构建输出目录
├── index.html             # HTML 入口文件
├── package.json           # 项目配置文件
├── vite.config.ts         # Vite 配置文件
├── icon.svg               # 应用图标文件（必需）
└── README.md              # 项目说明文档
```

## Package.json 规范

### 必需字段
以下字段为必需字段，缺少任何一个都无法通过打包校验：

1. **name**: 应用名称，必须以 `metools-app-` 开头
   ```json
   "name": "metools-app-yourapp"
   ```

2. **cnName**: 应用中文名称
   ```json
   "cnName": "你的应用名称"
   ```

3. **version**: 版本号，遵循语义化版本规范
   ```json
   "version": "1.0.0"
   ```

4. **description**: 应用描述
   ```json
   "description": "应用功能描述"
   ```

5. **author**: 作者信息
   ```json
   "author": "作者名称"
   ```

### 推荐字段
```json
{
  "license": "MIT",
  "type": "module",
  "files": [
    "dist",
    "*.png",
    "*.jpg",
    "*.svg",
    "src"
  ]
}
```

## 应用图标规范

1. **图标文件**: 项目根目录必须包含名为 `icon` 的图片文件
   - 支持格式：`.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`
   - 推荐使用 SVG 格式，文件名为 `icon.svg`
   - 图标尺寸建议：64x64 或更高分辨率

2. **图标用途**: 用于 metools 平台中的应用图标显示

## 开发流程

### 1. 开发调试
```bash
npm run dev
```
启动开发服务器，在浏览器中预览应用效果

### 2. 类型检查
```bash
npm run type-check
```
检查 TypeScript 类型错误

### 3. 构建项目
```bash
npm run build
```
构建生产版本，输出到 `dist/` 目录

### 4. 打包校验
```bash
npm run validate
```
校验项目是否符合 metools 应用规范

### 5. 预览构建结果
```bash
npm run preview
```
预览构建后的应用

## 打包校验规则

打包前会自动执行以下校验：

1. **Package.json 校验**
   - 检查必需字段：name, cnName, version, description, author
   - 验证 name 字段必须以 `metools-app-` 开头

2. **图标文件校验**
   - 检查项目根目录是否存在名为 `icon` 的图片文件
   - 支持的图片格式：png, jpg, jpeg, svg, gif

3. **构建文件校验**
   - 确保 `dist/` 目录存在且包含必要的构建文件

## 注意事项

1. 应用名称（name 字段）必须以 `metools-app-` 开头，否则无法通过校验
2. 必须提供应用图标文件，用于平台展示
3. 所有必需的 package.json 字段都必须填写完整
4. 构建前请确保通过类型检查和校验
5. 遵循 metools 平台的设计规范和交互要求

## 发布流程

1. 确保所有代码已提交到版本控制系统
2. 运行 `npm run validate` 确保通过所有校验
3. 运行 `npm run build` 构建项目
4. 运行 `npm publish` 发布到 npm 仓库