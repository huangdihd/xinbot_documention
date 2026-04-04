# Command System

Xinbot features a powerful JLine-based console with advanced visual feedback.

## 1. Executor Types

- **`CommandExecutor`**: Basic logic only.
- **`TabExecutor`**: Basic + Tab completion.
- **`HighlightExecutor`**: Basic + Syntax highlighting.
- **`TabHighlightExecutor`**: **All-in-one solution**. Recommended for complex commands.

## 2. Syntax Highlighting (`onHighlight`)

Customize how your command arguments look in the console.

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" ");
        builder.append(args[i], AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
    }
    return builder.toAttributedString();
}
```
