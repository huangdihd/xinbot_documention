# Plugin Development Guide (PDG)

This guide will help you develop plugins for Xinbot to extend its functionality. Plugins can add custom packet listeners, event handlers, and commands.

## 1. Add Xinbot Dependency

Xinbot is available via JitPack. Add the following to your build configuration:

### Maven

Add JitPack repository to your `pom.xml`:
```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

### Gradle

Add JitPack repository to your `build.gradle`:
```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

## 2. Basic Plugin Structure

Create a main plugin class implementing the `Plugin` interface:

```java
package com.yourpackage;

import xin.bbtt.mcbot.plugin.Plugin;

public class MyPlugin implements Plugin {
    
    @Override
    public String getName() {
        return "MyPlugin";
    }
    
    @Override
    public String getVersion() {
        return "1.0.0";
    }

    @Override
    public void onLoad() {}
    
    @Override
    public void onUnload() {}

    @Override
    public void onEnable() {
        // Register events and commands here
    }

    @Override
    public void onDisable() {}
}
```

## 3. Registering Packet Listeners

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import xin.bbtt.mcbot.Bot;

public class MyPacketListener extends SessionAdapter {
    @Override
    public void packetReceived(Session session, Packet packet) {
        System.out.println("Received packet: " + packet.getClass().getSimpleName());
    }
}

// Register in your plugin's onEnable()
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(), this);
}
```

## 4. Registering Event Listeners

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.events.SystemChatMessageEvent;

public class MyEventListener implements Listener {
    @EventHandler
    public void onSystemChatMessage(SystemChatMessageEvent event) {
        System.out.println("Received message: " + event.getText());
    }
}

// Register in onEnable()
Bot.Instance.getPluginManager().registerEvents(new MyEventListener(), this);
```

## 5. Creating Commands

In Xinbot, you can create custom commands by extending the `Command` class and implementing `CommandExecutor`.

### 5.1 Basic Command

Define the command:
```java
import xin.bbtt.mcbot.command.Command;

public class MyCommand extends Command {
    @Override
    public String getName() {
        return "mycommand";
    }

    @Override
    public String[] getAliases() {
        return new String[]{"mc"};
    }
}
```

Create an executor and register:
```java
import xin.bbtt.mcbot.command.CommandExecutor;

public class MyExecutor extends CommandExecutor {
    @Override
    public void onCommand(Command command, String label, String[] args) {
        System.out.println("Hello from MyCommand!");
    }
}

// Register in plugin's onEnable
Bot.Instance.getPluginManager().registerCommand(new MyCommand(), new MyExecutor(), this);
```

### 5.2 Tab Completion

Override `onTabComplete` to provide suggestions:

```java
@Override
public List<String> onTabComplete(Command cmd, String label, String[] args) {
    if (args.length == 1) {
        return List.of("option1", "option2");
    }
    return List.of();
}
```

### 5.3 Real-time Syntax Highlighting

Override `onHighlight` to customize colors in the console:

```java
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStringBuilder;
import org.jline.utils.AttributedStyle;

@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" ");
        
        // Example: Render the first argument in Green
        builder.append(args[i], AttributedStyle.DEFAULT.foreground(AttributedStyle.GREEN));
    }
    return builder.toAttributedString();
}
```

## 6. Packaging and Deployment

1. Create `src/main/resources/META-INF/services/xin.bbtt.mcbot.plugin.Plugin`.
2. Add your main plugin class name to that file.
3. Package as JAR and place in the `plugin` directory.
