---
title: maven 的 scope 都是什么用处
author: zzq
pubDatetime: 2024-07-05T06:15:59.643Z
modDatetime: 2024-07-05T06:15:59.643Z
slug: maven_的_scope_都是什么用处.md
featured: true
draft: false
tags:
  - 后端
  - 前端
ogImage: ""
description: maven 的 scope 都是什么用处
canonicalURL: ""
---

在 Maven 中，`scope` 用于定义依赖项在项目的生命周期中的可见性和可用性。Maven 支持以下几种常见的 `scope`：

1. **compile**：默认范围，适用于项目的编译、测试和运行。编译范围的依赖会包含在最终的构建输出中。
2. **provided**：编译时需要，但在运行时由 JDK 或容器（如应用服务器）提供。例如，Servlet API 通常使用这个范围。

3. **runtime**：编译时不需要，但在运行时需要。例如，JDBC 驱动程序。包含在运行和测试阶段，但不包括在编译时。

4. **test**：仅在测试编译和运行时使用。例如 JUnit。不会包含在项目的最终构建输出中。

5. **system**：类似于 `provided`，但需要显式提供依赖项的路径。例如，本地的 JAR 文件。需要指定 `systemPath`。

6. **import**：用于导入依赖的 BOM（Bill of Materials）或其他 POM 文件。通常在使用 Maven 的依赖管理机制时使用。

具体的 `scope` 使用示例如下：

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

各个范围的作用及其生命周期阶段如下表：

| Scope    | Compile | Test | Runtime | Provided | System |
| -------- | ------- | ---- | ------- | -------- | ------ |
| compile  | Yes     | Yes  | Yes     | Yes      | Yes    |
| provided | Yes     | Yes  | No      | Yes      | Yes    |
| runtime  | No      | Yes  | Yes     | No       | Yes    |
| test     | No      | Yes  | No      | No       | Yes    |
| system   | Yes     | Yes  | Yes     | Yes      | Yes    |

了解这些 `scope` 可以帮助你更好地管理项目的依赖，确保在不同阶段只引入所需的库。
