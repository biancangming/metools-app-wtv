# 项目总结

## 项目概述

本项目是专为 metools 工具（迷途工具箱）设计的插件开发脚手架，支持在线调试和打包功能。它遵循 metools 插件规范，可以轻松创建、开发和打包适用于 metools 平台的 Vue3 插件。

## 项目结构

```
metools-starter/
├── src/                    # 源代码目录
│   ├── metools-app-example.vue  # 示例插件（符合命名规范）
│   ├── index.ts            # 插件入口文件和信息导出
│   ├── icon.ts             # 默认图标
│   ├── icon.svg            # SVG 图标文件
│   └── test-export.ts      # 导出测试文件
├── playground/             # 在线调试环境
│   ├── index.html          # HTML 入口文件
│   └── main.ts             # 调试入口文件
├── scripts/                # 脚本目录
│   └── validate-component.js  # 插件验证脚本
├── dist/                   # 构建输出目录（构建后生成）
├── package.json            # 项目配置和依赖
├── tsconfig.json           # TypeScript 配置
├── tsdown.config.js        # tsdown 打包配置
├── vite.config.ts          # Vite 配置
├── README.md               # 项目说明文档
├── USAGE.md                # 使用说明文档
├── AGENTS.md               # 原始需求文档
├── PROJECT_SUMMARY.md      # 项目总结文档
├── .gitignore              # Git 忽略文件配置
└── .nvmrc                  # Node.js 版本配置
```

## 核心特性

1. **符合规范**: 插件文件名以 `metools-app-` 开头，导出格式符合要求
2. **TypeScript 支持**: 完整的 TypeScript 类型支持
3. **在线调试**: 使用 Vite 提供实时预览功能
4. **插件验证**: 内置验证脚本确保插件符合打包要求
5. **轻松打包**: 使用 tsdown 工具进行插件打包
6. **开箱即用**: 包含示例插件和完整配置

## 使用流程

1. **创建插件**: 复制示例插件并重命名为符合规范的名称
2. **开发调试**: 使用 `npm run dev` 启动开发服务器
3. **验证插件**: 使用 `npm run validate` 检查插件是否符合规范
4. **构建打包**: 使用 `npm run build` 打包插件

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- Vite (开发调试)
- tsdown (打包工具)
- Node.js (运行环境)

## 注意事项

1. 插件文件名必须以 `metools-app-` 开头
2. index.ts 中必须包含完整的插件信息导出
3. 构建前会自动验证插件是否符合规范
4. 打包后的插件位于 dist/ 目录中，可直接用于 metools 平台