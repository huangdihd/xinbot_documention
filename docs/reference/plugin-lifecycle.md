# Plugin Lifecycle & Dependencies

Learn how to set up your development environment and understand the full plugin lifecycle.

## 1. Dependencies (JitPack)

Xinbot is hosted on JitPack. Add the repository and dependency to your build file.

### Maven
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
        <version>master-SNAPSHOT</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

---

## 2. Main Plugin Class

Every plugin must implement the `xin.bbtt.mcbot.plugin.Plugin` interface. Thanks to Java 8+ default methods, you only need to override the necessary lifecycle hooks.

```java
package com.example.plugin;

import xin.bbtt.mcbot.plugin.Plugin;

public class MyPlugin implements Plugin {
    
    @Override
    public void onLoad() {
        // Triggered when the plugin file is identified and loaded into memory.
        // Use getLogger() to get a SLF4J logger with your plugin's prefix.
        getLogger().info("Plugin is loading...");
    }

    @Override
    public void onEnable() {
        // Plugin is officially started. Register listeners and commands here.
        getLogger().info("Plugin enabled!");
    }

    @Override
    public void onDisable() {
        // Triggered before the plugin is disabled or the bot stops.
    }

    @Override
    public void onUnload() {
        // Triggered when the plugin is completely unloaded.
    }
}
```

### 💡 Key Built-in Methods
*   **`getName()`**: Defaults to the class name.
*   **`getVersion()`**: Defaults to the version in the Jar manifest.
*   **`getLogger()`**: Returns an SLF4J Logger. **Highly recommended over `System.out`**.

---

## 3. Plugin SPI File

Xinbot uses Java SPI to discover plugins. Create a file in your resources:

1.  Path: `src/main/resources/META-INF/services/xin.bbtt.mcbot.plugin.Plugin`
2.  Content: The **fully qualified name** of your main class:
    ```text
    com.example.plugin.MyPlugin
    ```
