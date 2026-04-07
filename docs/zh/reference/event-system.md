# 事件系统

事件（Event）是 Xinbot 插件系统的灵魂。通过监听不同的事件，你的插件可以对服务器内的各种变动作出反应。

## 1. 创建监听器

要监听事件，你需要创建一个实现 `xin.bbtt.mcbot.event.Listener` 接口的类。**强烈建议使用 SLF4J `Logger` 来记录信息。**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.events.PublicChatEvent;

public class MyChatListener implements Listener {
    private static final Logger log = LoggerFactory.getLogger(MyChatListener.class);

    @EventHandler
    public void onPublicChat(PublicChatEvent event) {
        // 使用 log 而不是 System.out
        log.info("[聊天] {}: {}", event.getSender(), event.getMessage());
    }
}
```

---

## 2. 常用事件列表

| 事件名称 | 触发时机 | 常用方法 |
| :--- | :--- | :--- |
| `PublicChatEvent` | 收到公屏消息 | `getSender()`, `getMessage()` |
| `LoginSuccessEvent` | 成功登录 | - |
| `ReceivePacketEvent` | 收到原始数据包 | `getPacket()` |
| `AnswerQuestionEvent` | 需回答服务器问题 | `getQuestion()`, `setAnswer()` |

---

## 3. 事件优先级 (Priority)

当多个插件监听同一事件时，执行顺序由优先级决定。
例如，一个防脏话插件应该在 `LOWEST` 或 `LOW` 阶段拦截消息，而一个日志插件应该在 `MONITOR` 阶段只读记录。
