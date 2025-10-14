#!/usr/bin/env node

/**
 * GitHub部署脚本
 * 使用方法:
 * 1. 在GitHub上创建新仓库
 * 2. 复制仓库URL
 * 3. 运行此脚本并按提示操作
 */

import { spawn } from 'child_process';

console.log('🚀 GitHub部署助手');
console.log('==================');
console.log('请确保您已在GitHub上创建了新仓库，并准备好仓库URL。');
console.log('');

// 这个脚本提供指导而不是自动执行，因为需要用户输入GitHub仓库URL

console.log('部署步骤:');
console.log('1. 在GitHub上创建一个新的仓库');
console.log('2. 复制仓库的HTTPS或SSH URL');
console.log('3. 运行以下命令:');
console.log('');
console.log('   cd /Users/ttw/Documents/ygcz/metools-starter');
console.log('   git remote add origin YOUR_GITHUB_REPO_URL');
console.log('   git push -u origin main');
console.log('');
console.log('4. 在GitHub仓库页面的Settings中启用"Template repository"选项');
console.log('');
console.log('✅ 部署完成后，您的仓库将被标记为模板项目！');