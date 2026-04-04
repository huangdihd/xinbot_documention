# 事件系统

事件（Event）是 Xinbot 插件系统的灵魂。通过监听不同的事件，你的插件可以对服务器内的聊天、玩家进出、登录状态等各种情况做出反应。

## 1. 创建监听器

要监听事件，你需要创建一个实现 `xin.bbtt.mcbot.event.Listener` 接口的类。

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.event.EventPriority;
import xin.bbtt.mcbot.events.PublicChatEvent;

public class MyChatListener implements Listener {

    @EventHandler(priority = EventPriority.NORMAL)
    public void onPublicChat(PublicChatEvent event) {
        String sender = event.getSender();
        String message = event.getMessage();
        
        System.out.println("[聊天] " + sender + ": " + message);
        
        // 如果消息包含 "hi"，自动回复
        if (message.contains("hi")) {
            // 注意：发送消息通常建议通过 Bot 实例或命令执行器
        }
    }
}
```

---

## 2. 注册监听器

在插件主类的 `onEnable()` 方法中注册你的监听器类：

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerEvents(new MyChatListener(), this);
}
```

---

## 3. 事件优先级 (Priority)

Xinbot 支持 6 个事件优先级，决定了多个插件处理同一事件时的执行顺序：
1. `LOWEST` (最先执行)
2. `LOW`
3. `NORMAL` (默认)
4. `HIGH`
5. `HIGHEST`
6. `MONITOR` (最后执行，通常只读，不建议在此修改事件状态)

---

## 4. 常用事件列表

| 事件名称 | 触发时机 | 核心方法 |
| :--- | :--- | :--- |
| **聊天相关** | | |
| `PublicChatEvent` | 收到公屏聊天消息 | `getSender()`, `getMessage()` |
| `PrivateChatEvent` | 收到私聊消息 | `getSender()`, `getMessage()` |
| `SystemChatMessageEvent` | 收到系统消息（如公告） | `getText()`, `isOverlay()` |
| **登录与连接** | | |
| `LoginSuccessEvent` | 成功登录服务器 | - |
| `DisconnectEvent` | 与服务器断开连接 | `getReason()` |
| `PositionInQueueUpdateEvent` | 2b2t 排队位置变动 | `getPosition()` |
| **玩家动作** | | |
| `PlayerJoinEvent` | 有玩家加入服务器 | `getPlayerName()` |
| `PlayerLeaveEvent` | 有玩家离开服务器 | `getPlayerName()` |
| **底层协议** | | |
| `ReceivePacketEvent` | 收到原始数据包 | `getPacket()` |
| `AnswerQuestionEvent` | 服务器弹出需要回答的问题 | `getQuestion()`, `setAnswer()` |

---

## 5. 取消事件

部分事件支持取消（如 `AnswerQuestionEvent`）。通过调用 `event.setDefaultActionCancelled(true)`，你可以阻止 Bot 执行默认的内置逻辑。
