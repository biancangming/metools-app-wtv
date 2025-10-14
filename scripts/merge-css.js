import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'

// 合并 CSS 文件
const distDir = resolve('./dist')
const tailwindCssPath = resolve('./dist/tailwind.temp.css')
const indexCssPath = resolve('./dist/index.css')

// 检查 Tailwind CSS 文件是否存在
if (!existsSync(tailwindCssPath)) {
  console.log('Tailwind CSS 文件不存在，跳过合并步骤')
  process.exit(0)
}

// 如果 index.css 不存在，直接使用 Tailwind CSS
if (!existsSync(indexCssPath)) {
  const tailwindCss = readFileSync(tailwindCssPath, 'utf8')
  writeFileSync(indexCssPath, tailwindCss)
  unlinkSync(tailwindCssPath)
  console.log('CSS 文件处理成功!')
  process.exit(0)
}

// 读取两个 CSS 文件
const tailwindCss = readFileSync(tailwindCssPath, 'utf8')
const indexCss = readFileSync(indexCssPath, 'utf8')

// 合并内容（Tailwind CSS 在前）
const mergedCss = tailwindCss + '\n' + indexCss

// 写入合并后的内容到 index.css
writeFileSync(indexCssPath, mergedCss)

// 删除临时文件
unlinkSync(tailwindCssPath)

console.log('CSS 文件合并成功!')