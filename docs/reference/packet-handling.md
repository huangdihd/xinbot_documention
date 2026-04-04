# Packet Handling

## 1. Listen to Packets

```java
import org.geysermc.mcprotocollib.network.event.session.SessionAdapter;
import org.geysermc.mcprotocollib.network.packet.Packet;
import org.geysermc.mcprotocollib.network.session.Session;

public class MyPacketListener extends SessionAdapter {
    @Override
    public void packetReceived(Session session, Packet packet) {
        System.out.println("Packet: " + packet.getClass().getSimpleName());
    }
}
```

## 2. Register

```java
@Override
public void onEnable() {
    Bot.Instance.addPacketListener(new MyPacketListener(), this);
}
```
