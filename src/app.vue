<template>
  <div class="metools-app-example">
    <h1>{{ info.name }}</h1>
    <p>{{ info.description }}</p>
    <div class="author">作者: {{ info.author }}</div>
    <div class="version">版本: {{ info.version }}</div>
  </div>
</template>

<script setup lang="ts">

// 定义 info 对象的类型
interface Info {
  version: string
  name: string
  enName: string
  description: string
  author: string
  icon: string
}

// 为 info 对象指定类型
const info: Info =  {
  "version": "1.0.0",
  "name": "metools-app-example",
  "enName": "metools-app-example",
  "description": "metools-app-example",
  "author": "metools",
  "icon": "https://cdn.jsdelivr.net/gh/metools/metools-app-example@latest/icon.png"
}

// 组件逻辑可以在这里添加
</script>

<style scoped>
.metools-app-example {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.metools-app-example h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.metools-app-example p {
  color: #666;
  font-size: 16px;
  margin-bottom: 15px;
}

.author, .version {
  color: #999;
  font-size: 14px;
}
</style>