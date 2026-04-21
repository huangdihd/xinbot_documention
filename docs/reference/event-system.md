# Event System

Events are the soul of the Xinbot plugin system. By listening to different events, your plugin can react to chat, logins, and other server activities.

## 1. Create a Listener

Implement the `xin.bbtt.mcbot.event.Listener` interface. **Using SLF4J `Logger` is highly recommended.**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.event.EventPriority;
import xin.bbtt.mcbot.events.PublicChatEvent;

public class MyChatListener implements Listener {
    private static final Logger log = LoggerFactory.getLogger(MyChatListener.class);

    @EventHandler(priority = EventPriority.NORMAL)
    public void onPublicChat(PublicChatEvent event) {
        // Use log instead of System.out for proper formatting
        log.info("[Chat] {}: {}", event.getSender(), event.getMessage());
    }
}
```

---

## 2. Common Events List

| Event Name | Triggered When | Core Methods |
| :--- | :--- | :--- |
| `PublicChatEvent` | Public chat message received | `getSender()`, `getMessage()` |
| `LoginSuccessEvent` | Successfully logged into the server | - |
| `ReceivePacketEvent` | Raw network packet received | `getPacket()` |

---

## 3. Event Priorities

Xinbot supports 6 priorities to determine execution order:
1. `LOWEST` (First) -> 2. `LOW` -> 3. `NORMAL` (Default) -> 4. `HIGH` -> 5. `HIGHEST` -> 6. `MONITOR` (Last, read-only)
