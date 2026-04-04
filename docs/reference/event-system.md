# Event System

## 1. Create Listener

```java
import xin.bbtt.mcbot.event.Listener;
import xin.bbtt.mcbot.event.EventHandler;
import xin.bbtt.mcbot.events.PublicChatEvent;

public class MyChatListener implements Listener {
    @EventHandler
    public void onPublicChat(PublicChatEvent event) {
        System.out.println(event.getSender() + ": " + event.getMessage());
    }
}
```

## 2. Register Listener

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerEvents(new MyChatListener(), this);
}
```
