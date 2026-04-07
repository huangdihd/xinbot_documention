# Command System

Xinbot features a powerful JLine-based console system with advanced visual feedback.

## 1. Executor Overview

Xinbot provides several abstract classes to handle different command requirements. All executors inherit from the base `CommandExecutor`.

| Class | Purpose | Methods to Implement |
| :--- | :--- | :--- |
| `CommandExecutor` | Basic command logic | `onCommand` |
| `TabExecutor` | Adds tab completion | `onCommand`, `onTabComplete` |
| `HighlightExecutor` | Adds syntax highlighting | `onCommand`, `onHighlight` |
| `TabHighlightExecutor` | Full-featured command | `onCommand`, `onTabComplete`, `onHighlight` |
| `SubCommandExecutor` | Command with sub-commands | `registerSubCommand` |

---

## 2. Implementing Standard Executors

For most commands, you will use `TabHighlightExecutor` to provide the best user experience.

### Example: A Simple "Hello" Command
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloExecutor extends TabHighlightExecutor {
    private static final Logger log = LoggerFactory.getLogger(HelloExecutor.class);

    @Override
    public void onCommand(Command cmd, String label, String[] args) {
        log.info("Hello, {}!", args.length > 0 ? args[0] : "world");
    }

    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        if (args.length == 1) {
            return List.of("Alice", "Bob", "Charlie");
        }
        return List.of();
    }

    @Override
    public AttributedStyle[] onHighlight(Command cmd, String label, String[] args) {
        return Utils.parseHighlight(args); // Use default highlighting
    }
}
```

---

## 3. The Sub-Command System (`SubCommandExecutor`)

`SubCommandExecutor` is a specialized class designed to manage commands that have multiple sub-actions (e.g., `/mycmd add`, `/mycmd remove`). It automatically handles routing, tab completion for sub-command names, and basic highlighting.

### Registering Sub-Commands
You register sub-commands within the constructor or an initialization block. Each sub-command is itself a `CommandExecutor`.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyMainCommand extends SubCommandExecutor {
    private static final Logger log = LoggerFactory.getLogger(MyMainCommand.class);

    public MyMainCommand() {
        // Automatically routes "/test add" to AddExecutor
        registerSubCommand("add", new AddExecutor());
        registerSubCommand("remove", new RemoveExecutor());
    }

    @Override
    protected void onNoSubCommand(Command command, String label) {
        // Logic when the user types just the main command
        log.warn("Usage: /{} <add|remove>", label);
    }
}
```

---

## 4. Syntax Highlighting (`onHighlight`)

Xinbot uses an `AttributedStyle[]` array to define the color and style of each argument. The array length must match the `args` length.

### Implementation Examples

#### Option A: Manual Implementation
```java
@Override
public AttributedStyle[] onHighlight(Command cmd, String label, String[] args) {
    AttributedStyle[] styles = new AttributedStyle[args.length];
    for (int i = 0; i < args.length; i++) {
        if (args[i].matches("\\d+")) {
            styles[i] = AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW);
        } else {
            styles[i] = AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN);
        }
    }
    return styles;
}
```

#### Option B: Using `Utils` (Recommended)
The `Utils` class provides functional helpers to reduce boilerplate.

```java
@Override
public AttributedStyle[] onHighlight(Command cmd, String label, String[] args) {
    return Utils.parseConditionalHighlight(
        args, 
        arg -> arg.matches("\\d+"), 
        AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW), 
        AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN)
    );
}
```

---

## 5. Tab Completion (`onTabComplete`)

Return a `List<String>` of suggestions. Xinbot will automatically filter these suggestions based on what the user has already typed.

```java
@Override
public List<String> onTabComplete(Command cmd, String label, String[] args) {
    // args.length indicates which argument position the user is currently typing
    if (args.length == 1) {
        return List.of("red", "blue", "green");
    }
    return List.of();
}
```
