# 插件生命周期与依赖

本章介绍如何搭建开发环境并理解插件从加载到卸载的全过程。

## 1. 引入依赖 (JitPack)

Xinbot 托管在 JitPack 上。你需要将其添加到构建配置文件中。

### Maven
在 `pom.xml` 中添加仓库和依赖：
```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.huangdihd</groupId>
        <artifactId>xinbot</artifactId>
        <version>master-SNAPSHOT</version> <!-- 建议使用 master-SNAPSHOT 跟踪最新开发版 -->
        <scope>provided</scope>
    </dependency>
</dependencies>
```

---

## 2. 插件主类

每个插件都必须有一个实现 `xin.bbtt.mcbot.plugin.Plugin` 接口的主类。

```java
package com.example.plugin;

import xin.bbtt.mcbot.plugin.Plugin;

public class MyPlugin implements Plugin {
    @Override
    public String getName() { return "MyAwesomePlugin"; }

    @Override
    public String getVersion() { return "1.0.0"; }

    @Override
    public void onLoad() {
        // 插件文件被识别并载入内存时触发（此时 Bot 可能尚未初始化完成）
    }

    @Override
    public void onEnable() {
        // 插件正式启动。绝大多数监听器、命令应在此处注册
        System.out.println(getName() + " 已启动！");
    }

    @Override
    public void onDisable() {
        // 插件被禁用或 Bot 停止前触发。用于保存数据或清理资源
    }

    @Override
    public void onUnload() {
        // 插件被彻底卸载时触发
    }
}
```

---

## 3. 插件描述文件 (SPI)

Xinbot 使用 Java 的 SPI 机制来发现插件。你必须在资源目录下创建描述文件：

1.  在 `src/main/resources` 下创建目录：`META-INF/services/`
2.  创建文件，文件名为：`xin.bbtt.mcbot.plugin.Plugin`
3.  文件内容仅需一行，即你的**插件主类全限定名**：
    ```text
    com.example.plugin.MyPlugin
    ```

---

## 4. 打包与测试
1. 使用 `mvn package` 打包为 JAR 文件。
2. 将生成的 JAR 放入 Xinbot 的 `plugin` 目录下。
3. 启动 Xinbot，控制台出现 `[PluginManager] Loaded plugin MyAwesomePlugin` 字样即代表成功。
