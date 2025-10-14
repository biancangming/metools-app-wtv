# 系统说明

本系统是metools工具（迷途工具箱）的插件开发脚手架项目，支持playground在线调试。

## 技术选型
1. 打包工具采用 tsdown : https://tsdown.dev/zh-CN/guide/getting-started
2. 使用vite预览 playground: https://vitejs.dev/guide/
3. 支持typescript + vue3
4. 项目可以打包并返回一个vue3组件
5. 插件名称必须是 metools-app- 开头
6. index.ts 导出必须是以下格式
```
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

## 注意事项

打包时必须校验插件名称是否是 metools-app- 开头，否则将无法在metools平台中使用。
打包时必须校验 export 信息是否完整