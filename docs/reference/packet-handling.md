# Packet Handling

Interact with the raw Minecraft protocol.

## 1. Listen to Packets

```java
public class MyPacketListener extends SessionAdapter {
    private final Plugin plugin;
    public MyPacketListener(Plugin plugin) { this.plugin = plugin; }

    @Override
    public void packetReceived(Session session, Packet packet) {
        plugin.getLogger().debug("Packet: {}", packet.getClass().getSimpleName());
    }
}
```

## 2. Sending Packets (e.g., Respawn)

```java
import org.geysermc.mcprotocollib.protocol.data.game.ClientCommand;
import org.geysermc.mcprotocollib.protocol.packet.ingame.serverbound.ServerboundClientCommandPacket;

Bot.Instance.getSession().send(new ServerboundClientCommandPacket(
    ClientCommand.RESPAWN
));
```
