# Packet Handling

Interact with the raw Minecraft protocol to implement advanced features.

## 1. Listen to Packets

Create a class that extends `SessionAdapter`. **Please use SLF4J `Logger` to log information.**

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import org.geysermc.mcprotocollib.network.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyPacketListener extends SessionAdapter {
    private static final Logger log = LoggerFactory.getLogger(MyPacketListener.class);

    @Override
    public void packetReceived(Session session, Packet packet) {
        // Log received packet names for debugging
        log.debug("Received: {}", packet.getClass().getSimpleName());
    }
}
```

---

## 2. Sending Packets (e.g., Respawn)

When you listen to a specific event or receive a packet, you can send custom packets to the server using the provided `session` parameter (or by accessing `Bot.Instance.getSession()` globally).

Below is the correct way to send a "Respawn" request (`ServerboundClientCommandPacket`) inside an event callback:

```java
import org.geysermc.mcprotocollib.network.session.Session;
import org.geysermc.mcprotocollib.protocol.data.game.ClientCommand;
import org.geysermc.mcprotocollib.protocol.packet.ingame.serverbound.ServerboundClientCommandPacket;

// Assuming this code is inside a method that has access to a session instance,
// such as inside packetReceived(Session session, Packet packet):
session.send(new ServerboundClientCommandPacket(
    ClientCommand.RESPAWN
));
```

---

## 3. Registering the Listener

Register the listener in your plugin's `onEnable()` hook:

```java
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(), this);
}
```
