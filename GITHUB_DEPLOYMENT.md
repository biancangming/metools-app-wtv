# GitHub部署与模板项目设置指南

本文档将指导您如何将此项目部署到GitHub并将其标记为模板项目。

## 前置要求

- 已安装Git
- 已注册GitHub账户
- 本地项目代码已准备就绪

## 部署步骤

### 1. 在GitHub上创建新仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `metools-app-starter`
   - **Description**: `metools 工具（迷途工具箱）插件开发脚手架`
   - **Public**: 选择公开仓库
   - **重要**: 不要初始化 README、.gitignore 或许可证
4. 点击 "Create repository"

### 2. 获取仓库URL

创建完成后，复制仓库的HTTPS或SSH URL，例如：
- HTTPS: `https://github.com/yourusername/metools-app-starter.git`
- SSH: `git@github.com:yourusername/metools-app-starter.git`

### 3. 配置远程仓库并推送代码

在终端中执行以下命令：

```bash
# 进入项目目录
cd /Users/ttw/Documents/ygcz/metools-starter

# 添加远程仓库（请替换为您的实际仓库URL）
git remote add origin YOUR_GITHUB_REPO_URL

# 推送代码到GitHub
git push -u origin main
```

### 4. 设置为模板仓库

1. 访问您的GitHub仓库页面
2. 点击 "Settings" 选项卡
3. 向下滚动到 "Template repository" 部分
4. 勾选 "Template repository" 选项
5. 点击 "Save changes"

## 使用模板仓库

设置为模板仓库后，其他开发者可以通过以下方式使用此模板：

1. 在GitHub上点击 "Use this template" 按钮
2. 填写新仓库的名称和描述
3. 选择公开或私有
4. 点击 "Create repository from template"

## 自动化部署

您也可以使用以下npm脚本获取部署指导：

```bash
npm run deploy:github
```

## 验证部署

部署完成后，您应该能够：

1. 在GitHub上看到完整的代码提交历史
2. 看到仓库被标记为 "Template" 
3. 能够通过 "Use this template" 按钮创建新项目

## 故障排除

如果遇到问题，请检查：

1. 确保网络连接正常
2. 确保GitHub账户凭据正确配置
3. 确保没有重复的仓库名称
4. 确保本地代码已提交

如有其他问题，请参考 [GitHub官方文档](https://docs.github.com)。