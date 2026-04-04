# Command System

Xinbot features a powerful JLine-based console system with advanced visual feedback.

## 1. Choose Your Executor

Xinbot provides specialized abstract classes for different command needs:

*   **`CommandExecutor`**: Basic execution logic only.
*   **`TabExecutor`**: Execution + Tab completion.
*   **`HighlightExecutor`**: Execution + Real-time syntax highlighting.
*   **`TabHighlightExecutor`**: **All-in-one solution**. Supports both completion and highlighting.

---

## 2. Deep Dive: Syntax Highlighting (`onHighlight`)

`onHighlight` allows you to change console text colors in real-time as the user types. This is useful for providing instant feedback on argument validity.

### How it Works
Use `AttributedStringBuilder` to build a styled string token by token.

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" "); // Add spaces between arguments
        
        String arg = args[i];
        if (i == 0) {
            // Render the first argument in Cyan
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
        } else if (arg.matches("\\d+")) {
            // Render numeric arguments in Yellow
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        } else {
            // Default styling
            builder.append(arg);
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
