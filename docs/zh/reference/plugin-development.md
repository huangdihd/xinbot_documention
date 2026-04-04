# 插件开发指南 (PDG)

本指南将帮助开发者为 Xinbot 开发插件，以扩展其功能。插件可以添加自定义的数据包监听器、事件处理器以及命令。

## 1. 添加 Xinbot 依赖

Xinbot 通过 JitPack 提供。将以下配置加入构建文件。

### Maven

在 `pom.xml` 中添加 JitPack 仓库：
```xml
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
```

添加 Xinbot 依赖：
```xml
<dependencies>
  <dependency>
    <groupId>com.github.huangdihd</groupId>
    <artifactId>xinbot</artifactId>
    <version>VERSION</version> <!-- 替换为最新版本 -->
  </dependency>
</dependencies>
```

### Gradle

在 `build.gradle` 中添加 JitPack 仓库：
```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

添加 Xinbot 依赖：
```groovy
dependencies {
    implementation 'com.github.huangdihd:xinbot:VERSION' // 替换为最新版本
}
```

## 2. 基础插件结构

创建一个实现 `Plugin` 接口的主插件类：

```java
package com.yourpackage;

import xin.bbtt.mcbot.plugin.Plugin;

public class MyPlugin implements Plugin {
    
    @Override
    public String getName() {
        return "MyPlugin";
        // 返回插件名称
    }
    
    @Override
    public String getVersion() {
        return "1.0.0";
        // 返回插件版本
    }

    @Override
    public void onLoad() {
        // 插件被加载时调用
    }
    
    @Override
    public void onUnload() {
        // 插件被卸载时调用
    }

    @Override
    public void onEnable() {
        // 插件被启用时调用
        // 在这里注册监听器与命令
    }

    @Override
    public void onDisable() {
        // 插件被禁用时调用
    }
}
```

## 3. 注册数据包监听器

数据包监听器用于处理收发的网络数据包：

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import xin.bbtt.mcbot.Bot;

public class MyPacketListener extends SessionAdapter {
    @Override
    public void packetReceived(Session session, Packet packet) {
        // 处理收到的数据包
        System.out.println("Received packet: " + packet.getClass().getSimpleName());
    }
}

// 在插件的 onEnable() 中注册
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(), this);
}
```

## 4. 注册事件监听器

事件监听器用于响应内部 Bot 事件。请使用 `xin.bbtt.mcbot.events` 包中的实际事件类。

### 4.1 创建事件监听器类

实现 `Listener` 接口，并在事件处理方法上使用 `@EventHandler` 注解：

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.event.EventPriority;
import xin.bbtt.mcbot.events.SystemChatMessageEvent;
import xin.bbtt.mcbot.events.LoginSuccessEvent;
import xin.bbtt.mcbot.events.AnswerQuestionEvent;

public class MyEventListener implements Listener {

    // 以 NORMAL 优先级处理系统聊天消息
    @EventHandler(priority = EventPriority.NORMAL)
    public void onSystemChatMessage(SystemChatMessageEvent event) {
        System.out.println("Received system message: " + event.getText());
        // 通过 getter 访问事件数据
        boolean isOverlay = event.isOverlay();
    }
    
    // 处理登录成功事件
    @EventHandler
    public void onLoginSuccess(LoginSuccessEvent event) {
        System.out.println("Bot has successfully logged in!");
    }
    
    // 以 HIGH 优先级处理问答事件
    @EventHandler(priority = EventPriority.HIGH)
    public void onAnswerQuestion(AnswerQuestionEvent event) {
        System.out.println("Question received: " + event.getQuestion());
        // 如有需要可修改答案
        event.setAnswer("Custom answer for: " + event.getQuestion());
    }
}
```

### 4.2 注册事件监听器

在插件的 `onEnable()` 方法中注册事件监听器：

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerEvents(new MyEventListener(), this);
}
```

## 5. 创建命令

在 Xinbot 中，你可以通过继承 `Command` 类并实现 `CommandExecutor` 接口来创建自定义指令。

### 5.1 基础命令

创建命令定义：
```java
import xin.bbtt.mcbot.command.Command;

public class MyCommand extends Command {
    @Override
    public String getName() {
        return "mycommand"; // 命令名称
    }

    @Override
    public String[] getAliases() {
        return new String[]{"mc"}; // 别名
    }
}
```

创建执行器并注册：
```java
import xin.bbtt.mcbot.command.CommandExecutor;

public class MyExecutor extends CommandExecutor {
    @Override
    public void onCommand(Command command, String label, String[] args) {
        System.out.println("Hello from MyCommand!");
    }
}

// 在插件 onEnable 中注册
Bot.Instance.getPluginManager().registerCommand(new MyCommand(), new MyExecutor(), this);
```

### 5.2 Tab 补全

通过重写 `onTabComplete` 提供命令提示：

```java
@Override
public List<String> onTabComplete(Command cmd, String label, String[] args) {
    if (args.length == 1) {
        return List.of("option1", "option2");
    }
    return List.of();
}
```

### 5.3 实时语法高亮

通过重写 `onHighlight` 方法，你可以根据用户输入的参数实时改变控制台文字颜色。

```java
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStringBuilder;
import org.jline.utils.AttributedStyle;

@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" ");
        
        // 示例：将第一个参数渲染为绿色
        builder.append(args[i], AttributedStyle.DEFAULT.foreground(AttributedStyle.GREEN));
    }
    return builder.toAttributedString();
}
```

## 6. 打包与部署

1. 创建资源目录结构：在 `src/main/resources` 下创建 `META-INF/services` 目录；
2. 在 `META-INF/services` 目录中创建文件，文件名为 `xin.bbtt.mcbot.plugin.Plugin`；
3. 在该文件中添加插件实现类的全限定名（例如 `com.yourpackage.MyPlugin`）；
4. 将插件打包为 JAR 文件并放入 `plugin` 目录。

## 7. 许可证说明

当插件与 Xinbot（GPL-3.0）进行链接并作为其派生作品分发时，插件需要在 GPL-3.0 兼容许可下发布。
