# Event System

Listeners allow your plugin to react to bot and server activities. **Always use `getLogger()` for logging.**

## 1. Create Listener

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.events.PublicChatEvent;
import xin.bbtt.mcbot.plugin.Plugin;

public class MyChatListener implements Listener {
    private final Plugin plugin;
    public MyChatListener(Plugin plugin) { this.plugin = plugin; }

    @EventHandler
    public void onPublicChat(PublicChatEvent event) {
        plugin.getLogger().info("{}: {}", event.getSender(), event.getMessage());
    }
}
```

## 2. Common Events

- `PublicChatEvent`: Received a public chat.
- `LoginSuccessEvent`: Logged in successfully.
- `ReceivePacketEvent`: Low-level raw packet received.
