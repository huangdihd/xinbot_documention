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

Add Xinbot dependency:
```xml
<dependencies>
    <dependency>
        <groupId>com.github.huangdihd</groupId>
        <artifactId>xinbot</artifactId>
        <version>VERSION</version> <!-- Replace with latest version -->
    </dependency>
</dependencies>
```

### Gradle

Add JitPack repository to your `build.gradle`:
```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

Add Xinbot dependency:
```groovy
dependencies {
    implementation 'com.github.huangdihd:xinbot:VERSION' // Replace with latest version
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
    public void onLoad() {
        // Called when plugin is loaded
    }
    
    @Override
    public void onUnload() {
        // Called when plugin is unloaded
    }

    @Override
    public void onEnable() {
        // Called when plugin is enabled
    }

    @Override
    public void onDisable() {
        // Called when plugin is disabled
    }
}
```

## 3. Registering Packet Listeners

Packet listeners handle incoming and outgoing network packets:

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

Event listeners respond to internal bot events.

### 4.1 Create an Event Listener Class

Implement the `Listener` interface and use the `@EventHandler` annotation:

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.event.EventPriority;
import xin.bbtt.mcbot.events.SystemChatMessageEvent;

public class MyEventListener implements Listener {

    @EventHandler(priority = EventPriority.NORMAL)
    public void onSystemChatMessage(SystemChatMessageEvent event) {
        System.out.println("Received system message: " + event.getText());
    }
}
```

### 4.2 Register the Listener

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerEvents(new MyEventListener(), this);
}
```

## 5. Creating Commands

### 5.1 Basic Command

Create a command class:
```java
import xin.bbtt.mcbot.command.Command;

public class MyCommand extends Command {
    @Override
    public String getName() {
        return "mycommand";
    }
}
```

Register in `onEnable()`:
```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerCommand(
        new MyCommand(),
        new MyCommandExecutor(),
        this
    );
}
```

## 6. Packaging and Deployment

1. Create directory `src/main/resources/META-INF/services`.
2. Create a file named `xin.bbtt.mcbot.plugin.Plugin`.
3. Add your main plugin class name to the file (e.g., `com.yourpackage.MyPlugin`).
4. Package as JAR and place in the `plugin` directory.

## 7. License Notes

Plugins linked with Xinbot (GPL-3.0) and distributed as derivative works must be released under a GPL-3.0-compatible license.
