# 数据包处理

你可以直接操作 Minecraft 原始数据包来实现高级功能。

## 1. 监听数据包

创建一个继承自 `SessionAdapter` 的类。

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import org.geysermc.mcprotocollib.network.session.Session;
import xin.bbtt.mcbot.plugin.Plugin;

public class MyPacketListener extends SessionAdapter {
    private final Plugin plugin;
    public MyPacketListener(Plugin plugin) { this.plugin = plugin; }

    @Override
    public void packetReceived(Session session, Packet packet) {
        // 使用日志记录收到的包名
        plugin.getLogger().debug("收到包: {}", packet.getClass().getSimpleName());
    }
}
```

---

## 2. 发送数据包 (以重生为例)

通过 Bot 实例，你可以向服务器发送自定义数据包。例如，发送一个“重生”请求。

```java
import org.geysermc.mcprotocollib.protocol.data.game.ClientCommand;
import org.geysermc.mcprotocollib.protocol.packet.ingame.serverbound.ServerboundClientCommandPacket;
import xin.bbtt.mcbot.Bot;

// 正确的重生包发送方式
Bot.Instance.getSession().send(new ServerboundClientCommandPacket(
    ClientCommand.RESPAWN
));
```

---

## 3. 注册监听器

在插件的 `onEnable()` 中注册：

```java
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(this), this);
}
```
