# 命令系统

Xinbot 的命令行系统深度集成了 JLine，支持极佳的视觉反馈。

## 1. 核心概念：执行器 (Executor)

Xinbot 提供了几种抽象类，你可以根据需求选择：

*   **`CommandExecutor`**: 仅执行逻辑。
*   **`TabExecutor`**: 执行 + Tab 补全。
*   **`HighlightExecutor`**: 执行 + 实时语法高亮。
*   **`TabHighlightExecutor`**: **全能方案**。同时支持补全与高亮，是开发复杂指令的首选。

---

## 2. 深入理解语法高亮 (`onHighlight`)

在 JLine 命令行中，当你输入字符时，控制台可以实时通过颜色或字体样式（加粗、下划线）给出反馈。`onHighlight` 方法就是专门为了处理参数部分 (`args`) 的颜色而设计的。（注意：命令名称本身已经被自动高亮了，你只需要负责高亮参数部分）。

### 渲染原理
`onHighlight` 方法要求返回一个 `AttributedString` 对象。你需要使用 `AttributedStringBuilder` 来逐个拼接参数（即 Token），并在拼接时赋予它们不同的颜色（`AttributedStyle`）。

**重要提示：**
1. `args` 是一个数组，每个元素是你输入的一个参数（按空格分割的词）。
2. 在通过 `builder.append()` 拼接回一整句话时，**必须手动加上参数之间的空格**。
3. `AttributedStyle.DEFAULT` 表示默认无样式，在此基础上可以调用 `.foreground()` 改变颜色，或 `.bold()` 加粗。

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    
    for (int i = 0; i < args.length; i++) {
        // 除了第一个参数，其他参数前都需要补充原本被分割掉的空格
        if (i > 0) {
            builder.append(" ");
        }
        
        String arg = args[i];
        
        // 逻辑：如果参数全部是数字，高亮为黄色；否则高亮为青色
        if (arg.matches("\\d+")) {
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        } else {
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
        }
    }
    
    // 返回带有样式属性的字符串对象，JLine 会负责将其渲染到终端
    return builder.toAttributedString();
}
```

---

## 3. 全能方案详解：`TabHighlightExecutor`

在绝大多数场景下，一个成熟的命令既需要 **Tab 自动补全**，也需要 **语法高亮**。`TabHighlightExecutor` 就是为了这种场景设计的“全能方案”。

下面是一个更完整的例子：我们假设要写一个 `/manage <player> <ban|kick>` 命令。
- 当用户按下 Tab 时，智能补全 `ban` 或 `kick`。
- 当用户输入参数时，如果是 `ban` 显示为红色加粗，如果是 `kick` 显示为黄色。

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

    // 1. 命令实际执行的逻辑
    @Override
    public void onCommand(Command cmd, String label, String[] args) {
        if (args.length < 2) {
            plugin.getLogger().warn("参数不足！");
            return;
        }
        plugin.getLogger().info("对玩家 {} 执行了 {} 操作", args[0], args[1]);
    }

    // 2. Tab 键补全逻辑
    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        // args.length == 2 说明正在输入第二个参数，提示操作类型
        if (args.length == 2) {
            return List.of("ban", "kick");
        }
        // 返回空列表则不再提示
        return List.of();
    }

    // 3. 实时语法高亮逻辑
    @Override
    public AttributedString onHighlight(Command cmd, String label, String[] args) {
        AttributedStringBuilder builder = new AttributedStringBuilder();
        
        for (int i = 0; i < args.length; i++) {
            if (i > 0) builder.append(" ");
            
            String arg = args[i];
            
            // 第一个参数是玩家名，用蓝色
            if (i == 0) {
                builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.BLUE));
            } 
            // 第二个参数是操作，根据严重程度用不同颜色
            else if (i == 1) {
                if (arg.equalsIgnoreCase("ban")) {
                    builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.RED).bold()); // 红色且加粗
                } else if (arg.equalsIgnoreCase("kick")) {
                    builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
                } else {
                    builder.append(arg, AttributedStyle.DEFAULT); // 未识别的操作，使用默认颜色
                }
            } 
            // 多余的参数显示为红色，提示语法错误
            else {
                builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.RED));
            }
        }
        return builder.toAttributedString();
    }
}
```
通过这种方式，你的命令就会拥有与现代命令行工具一样的高级操作体验，极大提升了用户友好度。
