---
title: nginx 的 sub filter 功能
author: zzq
pubDatetime: 2024-07-03T18:04:08.772Z
modDatetime: 2024-07-03T18:04:08.772Z
slug: kijkuhugh
featured: true
draft: false
tags:
  - 后端
  - 前端
ogImage: ""
description: nginx 的 sub filter 功能
canonicalURL: ""
---

### Table of contents

在nginx中，`sub_filter`是一个非常有用的模块，它允许在响应内容中进行文本替换操作。这对于诸如修改HTML页面中的内容或者在代理后端服务的响应中进行动态内容替换非常有用。

### 使用方法

1. **启用sub_filter模块**：
   首先确保nginx已经编译并启用了`ngx_http_sub_module`模块。大多数情况下，这个模块默认是启用的，但有时需要检查nginx的编译选项或配置文件。

2. **配置sub_filter**：
   在nginx的配置文件中，可以使用`sub_filter`指令来配置替换规则。例如：

   ```nginx
   server {
       ...
       location / {
           ...
           sub_filter 'old_text' 'new_text';
           sub_filter_once off;  # 可选，设置是否仅替换一次，默认为on
           sub_filter_types *;   # 可选，指定响应类型进行替换，默认为text/html
           ...
       }
   }
   ```

   这里的`sub_filter 'old_text' 'new_text';`表示将响应中的所有'old_text'替换为'new_text'。

3. **配置选项说明**：

   - `sub_filter_once`: 控制是否仅替换第一次出现的匹配，默认为`on`，设置为`off`可以替换所有匹配项。
   - `sub_filter_types`: 指定响应的Content-Type类型进行替换，可以使用`*`表示所有类型，默认为`text/html`。

4. **重新加载nginx配置**：
   配置完毕后，记得重新加载或重启nginx服务使配置生效。

### 示例

假设要在代理后的HTML页面中替换所有`http://example.com`为`https://example.com`，可以这样配置：

```nginx
server {
    ...
    location / {
        ...
        sub_filter 'http://example.com' 'https://example.com';
        sub_filter_once off;
        ...
    }
}
```

这样配置后，nginx会在代理响应中查找并替换所有的`http://example.com`为`https://example.com`，并将修改后的内容返回给客户端。

通过这种方式，`sub_filter`使得nginx在代理和处理响应时可以动态地修改内容，非常适合一些需要在代理层面进行简单内容调整的场景。
