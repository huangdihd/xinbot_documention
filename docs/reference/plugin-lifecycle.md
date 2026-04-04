# Plugin Lifecycle & Dependencies

## 1. Dependencies (JitPack)

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

Implement the `xin.bbtt.mcbot.plugin.Plugin` interface.

```java
public class MyPlugin implements Plugin {
    @Override
    public void onLoad() {
        getLogger().info("Plugin loading...");
    }

    @Override
    public void onEnable() {
        getLogger().info("Plugin enabled!");
    }

    @Override
    public void onDisable() {}

    @Override
    public void onUnload() {}
}
```
