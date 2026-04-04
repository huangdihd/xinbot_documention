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

`onHighlight` 允许你根据用户当前的输入，动态改变控制台中文字的颜色。这在提示参数错误或区分参数类型时非常有用。

### 渲染原理
通过 `AttributedStringBuilder` 手动构建一个带样式的字符串。你可以为每一个 Token 分别指定颜色。

```java
@Override
public AttributedString onHighlight(Command cmd, String label, String[] args) {
    AttributedStringBuilder builder = new AttributedStringBuilder();
    
    for (int i = 0; i < args.length; i++) {
        if (i > 0) builder.append(" "); // 加上参数间的空格
        
        String arg = args[i];
        if (i == 0) {
            // 第一个参数渲染为青色
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN));
        } else if (arg.matches("\\d+")) {
            // 数字参数渲染为黄色
            builder.append(arg, AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        } else {
            // 其他默认颜色
            builder.append(arg);
        }
    }
    return builder.toAttributedString();
}
```

---

## 3. 全能方案示例：`TabHighlightExecutor`

当你需要像官方命令一样拥有丝滑的交互时，继承 `TabHighlightExecutor`。

```java
public class MyComplexExecutor extends TabHighlightExecutor {
    private final Plugin plugin;
    public MyComplexExecutor(Plugin plugin) { this.plugin = plugin; }

    @Override
    public void onCommand(Command cmd, String label, String[] args) {
        plugin.getLogger().info("收到指令，正在处理...");
    }

    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        return List.of("sub1", "sub2"); // 实时补全建议
    }

    @Override
    public AttributedString onHighlight(Command cmd, String label, String[] args) {
        // 这里的逻辑会让用户在输入 sub1 时看到特定的颜色
        return new AttributedStringBuilder()
            .append(args[0], AttributedStyle.DEFAULT.foreground(AttributedStyle.MAGENTA))
            .toAttributedString();
    }
}
```
