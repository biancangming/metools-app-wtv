#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

/**
 * 打包校验脚本
 * 检查 metools 应用是否符合规范要求
 */

console.log('🔍 开始 Metools 应用打包校验...\n')

let hasErrors = false

/**
 * 记录错误信息
 * @param {string} message 错误消息
 */
function logError(message) {
  console.error(`❌ ${message}`)
  hasErrors = true
}

/**
 * 记录成功信息
 * @param {string} message 成功消息
 */
function logSuccess(message) {
  console.log(`✅ ${message}`)
}

/**
 * 记录警告信息
 * @param {string} message 警告消息
 */
function logWarning(message) {
  console.warn(`⚠️  ${message}`)
}

/**
 * 校验 package.json 文件
 */
function validatePackageJson() {
  console.log('📋 校验 package.json...')
  
  const packageJsonPath = path.join(projectRoot, 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    logError('package.json 文件不存在')
    return
  }
  
  let packageJson
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8')
    packageJson = JSON.parse(content)
  } catch (error) {
    logError(`package.json 文件格式错误: ${error.message}`)
    return
  }
  
  // 检查必需字段
  const requiredFields = [
    { key: 'name', name: '应用名称' },
    { key: 'cnName', name: '中文名称' },
    { key: 'version', name: '版本号' },
    { key: 'description', name: '应用描述' },
    { key: 'author', name: '作者信息' }
  ]
  
  for (const field of requiredFields) {
    if (!packageJson[field.key]) {
      logError(`缺少必需字段: ${field.key} (${field.name})`)
    } else {
      logSuccess(`${field.name}: ${packageJson[field.key]}`)
    }
  }
  
  // 检查 name 字段是否以 metools-app- 开头
  if (packageJson.name) {
    if (!packageJson.name.startsWith('metools-app-')) {
      logError(`应用名称必须以 "metools-app-" 开头，当前为: ${packageJson.name}`)
    } else {
      logSuccess(`应用名称符合规范: ${packageJson.name}`)
    }
  }
  
  // 检查版本号格式
  if (packageJson.version) {
    const versionRegex = /^\d+\.\d+\.\d+(-.*)?$/
    if (!versionRegex.test(packageJson.version)) {
      logWarning(`版本号建议遵循语义化版本规范 (x.y.z): ${packageJson.version}`)
    }
  }
  
  console.log('')
}

/**
 * 校验应用图标文件
 */
function validateIconFile() {
  console.log('🎨 校验应用图标文件...')
  
  const supportedExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']
  let iconFound = false
  let iconPath = ''
  
  for (const ext of supportedExtensions) {
    const iconFilePath = path.join(projectRoot, `icon${ext}`)
    if (fs.existsSync(iconFilePath)) {
      iconFound = true
      iconPath = `icon${ext}`
      break
    }
  }
  
  if (!iconFound) {
    logError('未找到应用图标文件')
    logError('请在项目根目录添加名为 "icon" 的图片文件')
    logError(`支持的格式: ${supportedExtensions.join(', ')}`)
  } else {
    logSuccess(`找到应用图标: ${iconPath}`)
    
    // 检查文件大小
    const iconFilePath = path.join(projectRoot, iconPath)
    const stats = fs.statSync(iconFilePath)
    const fileSizeKB = Math.round(stats.size / 1024)
    
    if (fileSizeKB > 500) {
      logWarning(`图标文件较大 (${fileSizeKB}KB)，建议压缩以提高加载速度`)
    } else {
      logSuccess(`图标文件大小合适: ${fileSizeKB}KB`)
    }
  }
  
  console.log('')
}

/**
 * 校验构建文件
 */
function validateBuildFiles() {
  console.log('🏗️  校验构建文件...')
  
  const distPath = path.join(projectRoot, 'dist')
  
  if (!fs.existsSync(distPath)) {
    logError('dist 目录不存在，请先运行 npm run build')
    return
  }
  
  // 检查关键构建文件
  const indexHtmlPath = path.join(distPath, 'index.html')
  if (!fs.existsSync(indexHtmlPath)) {
    logError('缺少 dist/index.html 文件')
  } else {
    logSuccess('找到 index.html 文件')
  }
  
  const assetsPath = path.join(distPath, 'assets')
  if (!fs.existsSync(assetsPath)) {
    logError('缺少 dist/assets 目录')
  } else {
    const assetFiles = fs.readdirSync(assetsPath)
    const jsFiles = assetFiles.filter(file => file.endsWith('.js'))
    const cssFiles = assetFiles.filter(file => file.endsWith('.css'))
    
    if (jsFiles.length === 0) {
      logError('缺少 JavaScript 构建文件')
    } else {
      logSuccess(`找到 ${jsFiles.length} 个 JavaScript 文件`)
    }
    
    if (cssFiles.length === 0) {
      logWarning('未找到 CSS 文件，确认是否需要样式文件')
    } else {
      logSuccess(`找到 ${cssFiles.length} 个 CSS 文件`)
    }
  }
  
  console.log('')
}

/**
 * 校验项目结构
 */
function validateProjectStructure() {
  console.log('📁 校验项目结构...')
  
  const requiredFiles = [
    { path: 'src/app.vue', name: '主应用组件' },
    { path: 'src/main.ts', name: '应用入口文件' },
    { path: 'index.html', name: 'HTML 入口文件' },
    { path: 'vite.config.ts', name: 'Vite 配置文件' }
  ]
  
  for (const file of requiredFiles) {
    const filePath = path.join(projectRoot, file.path)
    if (!fs.existsSync(filePath)) {
      logError(`缺少必需文件: ${file.path} (${file.name})`)
    } else {
      logSuccess(`${file.name}: ${file.path}`)
    }
  }
  
  console.log('')
}

/**
 * 主校验函数
 */
function main() {
  validatePackageJson()
  validateIconFile()
  validateProjectStructure()
  validateBuildFiles()
  
  console.log('📊 校验结果:')
  if (hasErrors) {
    console.error('❌ 校验失败，请修复上述错误后重试')
    process.exit(1)
  } else {
    console.log('✅ 所有校验通过，项目符合 Metools 应用规范！')
    console.log('🚀 可以安全地进行打包和发布')
  }
}

// 运行校验
main()