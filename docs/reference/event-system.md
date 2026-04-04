# Event System

Events are the soul of the Xinbot plugin system. By listening to different events, your plugin can react to chat, logins, and other server activities.

## 1. Create a Listener

Implement the `xin.bbtt.mcbot.event.Listener` interface. **Using the built-in `getLogger()` is highly recommended.**

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.event.EventPriority;
import xin.bbtt.mcbot.events.PublicChatEvent;
import xin.bbtt.mcbot.plugin.Plugin;

public class MyChatListener implements Listener {
    private final Plugin plugin;
    public MyChatListener(Plugin plugin) { this.plugin = plugin; }

    @EventHandler(priority = EventPriority.NORMAL)
    public void onPublicChat(PublicChatEvent event) {
        // Use getLogger() instead of System.out for proper formatting
        plugin.getLogger().info("[Chat] {}: {}", event.getSender(), event.getMessage());
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
| `AnswerQuestionEvent` | Server asks a question (Captcha) | `getQuestion()`, `setAnswer()` |

---

## 3. Event Priorities

Xinbot supports 6 priorities to determine execution order:
1. `LOWEST` (First) -> 2. `LOW` -> 3. `NORMAL` (Default) -> 4. `HIGH` -> 5. `HIGHEST` -> 6. `MONITOR` (Last, read-only)
