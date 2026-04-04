# Command System

Xinbot features a powerful JLine-based console system with advanced visual feedback.

## 1. Executor Types

Xinbot provides specialized abstract classes for different command needs:

*   **`CommandExecutor`**: Basic execution logic only.
*   **`TabExecutor`**: Execution + Tab completion.
*   **`HighlightExecutor`**: Execution + Real-time syntax highlighting.
*   **`TabHighlightExecutor`**: **All-in-one solution**. Supports both completion and highlighting.

---

## 2. Deep Dive: Syntax Highlighting (`onHighlight`)

In the JLine console, the text can provide real-time feedback through colors and font styles (e.g., bold, underline) as you type. The `onHighlight` method is specifically designed to handle the styling of the arguments part (`args`). (Note: The command name itself is highlighted automatically, so you only need to highlight the arguments).

### Rendering Mechanism
The `onHighlight` method requires an `AttributedString` object in return. You use the `AttributedStringBuilder` to append arguments (tokens) one by one, applying different colors (`AttributedStyle`) as you append them.

**Important Notes:**
1. `args` is an array where each element represents an argument (words split by spaces).
2. When appending the arguments back into a single sentence using `builder.append()`, **you must manually add spaces between the arguments**.
3. `AttributedStyle.DEFAULT` means no styling by default. From there, you can call `.foreground()` to change colors, or `.bold()` for bold text.

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    
    for (int i = 0; i < args.length; i++) {
        // Add spaces before arguments (except the first one)
        if (i > 0) {
            builder.append(" ");
        }
        
        String arg = args[i];
        
        // Logic: highlight all-digit arguments in Yellow, others in Cyan
        if (arg.matches("\\d+")) {
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        } else {
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
        }
    }
    
    // Return the styled string. JLine will render it to the terminal.
    return builder.toAttributedString();
}
```

---

## 3. All-in-One Solution: `TabHighlightExecutor`

In most cases, a mature command needs both **Tab Completion** and **Syntax Highlighting**. `TabHighlightExecutor` is designed exactly for this scenario.

Here is a more comprehensive example: suppose we are creating a `/manage <player> <ban|kick>` command.
- When the user presses Tab, suggest `ban` or `kick`.
- When the user types the arguments: if it's `ban`, show it in bold red; if it's `kick`, show it in yellow.

```java
import xin.bbtt.mcbot.command.Command;
import xin.bbtt.mcbot.command.TabHighlightExecutor;
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStringBuilder;
import org.jline.utils.AttributedStyle;
import xin.bbtt.mcbot.plugin.Plugin;
import java.util.List;

public class ManageExecutor extends TabHighlightExecutor {
    private final Plugin plugin;

    public ManageExecutor(Plugin plugin) {
        this.plugin = plugin;
    }

    // 1. Command execution logic
    @Override
    public void onCommand(Command cmd, String label, String[] args) {
        if (args.length < 2) {
            plugin.getLogger().warn("Not enough arguments!");
            return;
        }
        plugin.getLogger().info("Performed {} action on player {}", args[1], args[0]);
    }

    // 2. Tab completion logic
    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        // args.length == 2 means the user is typing the second argument
        if (args.length == 2) {
            return List.of("ban", "kick");
        }
        // Return empty list to stop suggesting
        return List.of();
    }

    // 3. Real-time syntax highlighting logic
    @Override
    public AttributedString onHighlight(Command cmd, String label, String[] args) {
        AttributedStringBuilder builder = new AttributedStringBuilder();
        
        for (int i = 0; i < args.length; i++) {
            if (i > 0) builder.append(" ");
            
            String arg = args[i];
            
            // First argument is player name, color it Blue
            if (i == 0) {
                builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.BLUE));
            } 
            // Second argument is the action, color based on severity
            else if (i == 1) {
                if (arg.equalsIgnoreCase("ban")) {
                    builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.RED).bold()); // Red and Bold
                } else if (arg.equalsIgnoreCase("kick")) {
                    builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
                } else {
                    builder.append(arg, AttributedStyle.DEFAULT); // Unrecognized action, default color
                }
            } 
            // Extra arguments are syntax errors, color them Red
            else {
                builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.RED));
            }
        }
        return builder.toAttributedString();
    }
}
```
Using this approach, your command will provide an advanced user experience similar to modern CLI tools (like zsh or fish).
