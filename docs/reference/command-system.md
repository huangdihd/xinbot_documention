# Command System

## 1. Define Command

```java
import xin.bbtt.mcbot.command.Command;

public class MyCmd extends Command {
    @Override
    public String getName() { return "mycmd"; }
}
```

## 2. Executor Types

- **`CommandExecutor`**: Basic logic.
- **`TabExecutor`**: Adds Tab completion.
- **`HighlightExecutor`**: Adds console highlighting.
- **`TabHighlightExecutor`**: All of the above.

## 3. Register

```java
Bot.Instance.getPluginManager().registerCommand(new MyCmd(), new MyTabExec(), this);
```
