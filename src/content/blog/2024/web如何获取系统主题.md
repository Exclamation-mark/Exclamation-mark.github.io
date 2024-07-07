---
title: web如何获取系统主题
author: zzq
pubDatetime: 2024-07-07T15:10:41.179Z
modDatetime: 2024-07-07T15:10:41.180Z
slug: web如何获取系统主题.md
featured: true
draft: false
tags:
  - 后端
  - 前端
ogImage: ""
description: web如何获取系统主题
canonicalURL: ""
---

### Table of contents

在网页中检测用户的系统主题（即浅色模式或深色模式），可以使用 CSS 和 JavaScript 来实现。以下是一个简单的例子来展示如何做到这一点：

### 使用 CSS 媒体查询检测系统主题

CSS 提供了一个 `prefers-color-scheme` 媒体查询，可以用来检测用户的系统主题。你可以使用它来为不同的主题设置不同的样式：

```css
/* 默认样式 */
body {
  background-color: white;
  color: black;
}

/* 深色主题样式 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

### 使用 JavaScript 检测系统主题

你也可以使用 JavaScript 来检测用户的系统主题，并根据主题做出相应的调整。以下是一个示例代码：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>检测系统主题</title>
  </head>
  <body>
    <h1>系统主题检测</h1>
    <p id="theme-status"></p>

    <script>
      function detectTheme() {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.body.style.backgroundColor = "black";
          document.body.style.color = "white";
          document.getElementById("theme-status").textContent =
            "当前系统主题为：深色模式";
        } else {
          document.body.style.backgroundColor = "white";
          document.body.style.color = "black";
          document.getElementById("theme-status").textContent =
            "当前系统主题为：浅色模式";
        }
      }

      detectTheme();

      // 监听系统主题的变化
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {
          detectTheme();
        });
    </script>
  </body>
</html>
```

### 解释

1. **CSS**：使用 `@media (prefers-color-scheme: dark)` 媒体查询，针对深色模式设置特定的样式。
2. **JavaScript**：
   - 使用 `window.matchMedia('(prefers-color-scheme: dark)').matches` 检测当前是否为深色模式，并相应地修改页面样式和文本内容。
   - 添加事件监听器 `window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)`，实时响应系统主题的变化。

通过这种方式，你可以在网页中检测并响应用户的系统主题，提供更好的用户体验。
