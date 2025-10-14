import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// 确保 dist 目录存在
const distDir = resolve('./dist')
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true })
}

// 使用 PostCSS 处理 Tailwind CSS
try {
  execSync(
    `npx postcss ./src/assets/styles/tailwind.css -o ./dist/tailwind.temp.css --no-map`,
    { stdio: 'inherit' }
  )
  console.log('Tailwind CSS 构建成功!')
} catch (error) {
  console.error('Tailwind CSS 构建失败:', error)
  process.exit(1)
}