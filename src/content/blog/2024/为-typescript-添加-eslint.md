---
title: "为 typescript 添加 eslint"
author: zzq
pubDatetime: 2024-07-03T18:23:10.336Z
modDatetime: 2024-07-03T18:23:10.336Z
slug: 为-typescript-添加-eslint
featured: true
draft: false
tags:
  - 后端
  - 前端
ogImage: ""
description: 为 typescript 添加 eslint
canonicalURL: ""
---

### Table of contents

要为 TypeScript 项目添加 ESLint，可以按照以下步骤进行：

1. **安装 ESLint 及相关插件**：
   首先，确保你已经在项目中安装了 ESLint 及 TypeScript 相关的插件：

   ```bash
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   ```

2. **创建 ESLint 配置文件**：
   在项目根目录创建 `.eslintrc.js` 文件，并配置如下内容：

   ```javascript
   module.exports = {
     root: true,
     parser: "@typescript-eslint/parser",
     plugins: ["@typescript-eslint"],
     extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
   };
   ```

   这个配置文件使用了 ESLint 推荐的规则和 TypeScript 插件提供的推荐规则。

3. **配置 VS Code 插件支持**（可选）：
   如果你使用 VS Code，建议安装 ESLint 插件以获取实时 linting 提示。

4. **运行 ESLint**：
   可以通过命令行运行 ESLint 进行 linting：
   ```bash
   npx eslint .
   ```
   或者结合 npm scripts，在 `package.json` 中添加一个 lint 命令：
   ```json
   {
     "scripts": {
       "lint": "eslint ."
     }
   }
   ```
   然后运行：
   ```bash
   npm run lint
   ```

这些步骤将帮助你在 TypeScript 项目中集成 ESLint，并开始进行代码质量检查和规范化。
