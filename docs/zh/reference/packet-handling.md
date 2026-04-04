# 数据包处理

如果你需要实现一些极其复杂的功能（如自动行走、地形分析、拦截特定协议包），你可以直接操作 Minecraft 原始数据包。

## 1. 监听数据包

Xinbot 基于 `MCProtocolLib` 构建。你可以创建一个继承自 `SessionAdapter` 的类来监听网络会话。

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import org.geysermc.mcprotocollib.network.session.Session;
import xin.bbtt.mcbot.Bot;

public class MyPacketListener extends SessionAdapter {
    @Override
    public void packetReceived(Session session, Packet packet) {
        // 打印收到的每一个数据包类名
        // System.out.println("收到包: " + packet.getClass().getSimpleName());
        
        // 拦截特定数据包示例
        /*
        if (packet instanceof ServerChatPacket p) {
            System.out.println("原始聊天内容: " + p.getMessage());
        }
        */
    }
}
```

---

## 2. 注册数据包监听器

数据包监听器通常在插件的 `onEnable()` 中注册：

```java
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(), this);
}
```

---

## 3. 发送数据包

通过 Bot 实例，你可以向服务器发送自定义数据包：

```java
import org.geysermc.mcprotocollib.protocol.data.game.ClientRequest;
import org.geysermc.mcprotocollib.protocol.packet.ingame.client.ClientRequestPacket;

// 示例：发送一个“请求重生”的数据包
Bot.Instance.getSession().send(new ClientRequestPacket(ClientRequest.RESPAWN));
```

---

## ⚠️ 注意事项
*   **性能影响**：`packetReceived` 会在网络线程中高频触发，请勿在此处执行耗时操作（如数据库查询或文件读写）。
*   **协议版本**：Xinbot 目前锁定的协议版本请参考源码中的 `pom.xml` 配置。
