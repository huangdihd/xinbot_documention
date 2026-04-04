# Command System

Xinbot features a powerful JLine-based console system with advanced visual feedback.

## 1. Choose Your Executor

Xinbot provides specialized abstract classes for different command needs:

*   **`CommandExecutor`**: Basic execution logic only.
*   **`TabExecutor`**: Execution + Tab completion.
*   **`HighlightExecutor`**: Execution + Real-time syntax highlighting.
*   **`TabHighlightExecutor`**: **All-in-one solution**. Supports both completion and highlighting.

---

## 2. Syntax Highlighting (`onHighlight`)

`onHighlight` allows you to change console text colors in real-time as the user types.

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" ");
        
        String arg = args[i];
        if (arg.matches("\\d+")) {
            // Render numeric arguments in Yellow
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        } else {
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
        }
    }
    return builder.toAttributedString();
}
```

---

## 3. Registering Your Command

Register in your plugin's `onEnable()` hook:

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerCommand(
        new MyCmd(), 
        new MyTabHighlightExec(this), 
        this
    );
}
```
