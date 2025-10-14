#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 检查 index.ts 导出是否完整
function validateExport() {
  const indexPath = path.join(__dirname, '../src/index.ts')
  
  try {
    const content = fs.readFileSync(indexPath, 'utf-8')
    
    // 检查必要的导入
    const requiredImports = [
      'import icon from',
      'import app from',
      'import pkg from'
    ]
    
    for (const importItem of requiredImports) {
      if (!content.includes(importItem)) {
        console.error(`错误: index.ts 中缺少必要的导入: ${importItem}`)
        process.exit(1)
      }
    }
    
    // 检查info对象的必要字段
    const requiredInfoFields = [
      'version: pkg.version',
      'name:',
      'enName: pkg.name',
      'description: pkg.description',
      'author: pkg.author',
      'icon: icon'
    ]
    
    for (const field of requiredInfoFields) {
      if (!content.includes(field)) {
        console.error(`错误: index.ts 中缺少必要的info字段: ${field}`)
        process.exit(1)
      }
    }
    
    // 检查默认导出格式
    if (!content.includes('export default {') || 
        !content.includes('entry: app') || 
        !content.includes('...info')) {
      console.error('错误: index.ts 中缺少正确的默认导出格式')
      console.error('期望格式: export default { entry: app, ...info }')
      process.exit(1)
    }
    
    console.log('导出信息验证通过')
    return true
  } catch (error) {
    console.error('错误: 无法读取 index.ts 文件')
    console.error(error.message)
    process.exit(1)
  }
}

// 执行验证
try {
  validateExport()
  console.log('所有验证通过！组件符合打包要求。')
} catch (error) {
  console.error('验证失败:', error.message)
  process.exit(1)
}