---
title: 如何通过 git hook 配置 lint
author: zzq
pubDatetime: 2024-07-04T01:01:21Z
modDatetime: 2024-07-04T01:01:23Z
slug: add-lint-git-hook
featured: true
draft: false
tags:
  - some
ogImage: ""
description: "如何通过 git hook 配置 lint"
canonicalURL: ""
---

通过 Git Hook 配置 Lint，可以确保在每次提交代码或推送代码之前运行 Lint 检查，以便在提交到代码仓库之前捕获和修复代码中的问题。以下是如何使用 Husky 和 lint-staged 配置 Git Hook 以运行 Lint 的步骤：

### 步骤 1：安装 Husky 和 lint-staged

首先，确保你已经安装了 Node.js 和 npm（或 pnpm）。然后，安装 Husky 和 lint-staged：

```sh
npm install --save-dev husky lint-staged
```

或者使用 pnpm：

```sh
pnpm add -D husky lint-staged
```

### 步骤 2：初始化 Husky

初始化 Husky 以便在 `.husky` 目录中创建必要的配置文件：

```sh
npx husky install
```

### 步骤 3：设置 pre-commit Hook

使用 Husky 创建一个 pre-commit Hook，以便在每次提交之前运行 lint-staged：

```sh
npx husky add .husky/pre-commit "npx lint-staged"
```

这将在 `.husky` 目录中创建一个名为 `pre-commit` 的文件，其中包含以下内容：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 步骤 4：配置 lint-staged

在 `package.json` 文件中添加 lint-staged 配置，以指定在提交之前需要 lint 的文件类型和所需运行的 lint 命令。例如，如果你使用 ESLint，可以这样配置：

```json
{
  "lint-staged": {
    "src/**/*.{js,ts,vue}": "eslint --fix"
  }
}
```

这个配置会在提交之前运行 ESLint 并自动修复 `src` 目录下的所有 `.js`、`.ts` 和 `.vue` 文件。

### 完整的 package.json 示例

以下是一个完整的 `package.json` 示例，包含 Husky 和 lint-staged 的配置：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "lint": "eslint .",
    "prepare": "husky install"
  },
  "devDependencies": {
    "eslint": "^7.32.0",
    "husky": "^7.0.0",
    "lint-staged": "^11.0.0"
  },
  "lint-staged": {
    "src/**/*.{js,ts,vue}": "eslint --fix"
  }
}
```

### 使用

每次你运行 `git commit` 时，Husky 会触发 pre-commit Hook，并运行 lint-staged。lint-staged 会根据配置检查并修复代码中的 lint 问题。如果存在无法自动修复的问题，提交将会被阻止，你需要手动修复这些问题然后重新提交。

通过以上步骤，你可以确保在每次提交之前代码都会经过 Lint 检查，从而保持代码质量。
