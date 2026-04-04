# Packet Handling

Interact with the raw Minecraft protocol for advanced features.

## 1. Listen to Packets

Extend `SessionAdapter` to handle incoming data.

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import org.geysermc.mcprotocollib.network.session.Session;

public class MyPacketListener extends SessionAdapter {
    @Override
    public void packetReceived(Session session, Packet packet) {
        // Log received packet names for debugging
        plugin.getLogger().debug("Packet: {}", packet.getClass().getSimpleName());
    }
}
```

---

## 2. Sending Packets (e.g. Respawn)

```java
import org.geysermc.mcprotocollib.protocol.data.game.ClientCommand;
import org.geysermc.mcprotocollib.protocol.packet.ingame.serverbound.ServerboundClientCommandPacket;

// Send a respawn packet to the server
Bot.Instance.getSession().send(new ServerboundClientCommandPacket(
    ClientCommand.RESPAWN
));
```
