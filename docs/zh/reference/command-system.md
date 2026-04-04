# 命令系统

你可以为你的插件添加自定义的控制台指令。Xinbot 的命令行基于 JLine 构建，支持极佳的交互体验。

## 1. 定义命令

你需要创建一个继承自 `xin.bbtt.mcbot.command.Command` 的类来定义命令的元数据。

```java
import xin.bbtt.mcbot.command.Command;

public class HelloCommand extends Command {
    @Override
    public String getName() {
        return "hello"; // 主命令名
    }

    @Override
    public String[] getAliases() {
        return new String[]{"hi", "greet"}; // 别名
    }

    @Override
    public String getDescription() {
        return "向你打个招呼";
    }
}
```

---

## 2. 编写执行逻辑

实现 `CommandExecutor` 来处理命令执行、Tab 补全和语法高亮。

```java
import xin.bbtt.mcbot.command.CommandExecutor;
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStringBuilder;
import org.jline.utils.AttributedStyle;
import java.util.List;

public class HelloExecutor extends CommandExecutor {

    // 命令执行逻辑
    @Override
    public void onCommand(Command command, String label, String[] args) {
        System.out.println("Hello, welcome to Xinbot!");
    }

    // Tab 补全建议
    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        if (args.length == 1) {
            return List.of("player", "admin");
        }
        return List.of();
    }

    // 实时语法高亮 (特色功能)
    @Override
    public AttributedString onHighlight(Command cmd, String label, String[] args) {
        AttributedStringBuilder builder = new AttributedStringBuilder();
        for (int i = 0; i < args.length; i++) {
            if (i > 0) builder.append(" ");
            
            // 示例：将第一个参数高亮为绿色
            builder.append(args[i], AttributedStyle.DEFAULT.foreground(AttributedStyle.GREEN));
        }
        return builder.toAttributedString();
    }
}
```

---

## 3. 注册命令

在插件主类的 `onEnable()` 中注册：

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerCommand(
        new HelloCommand(), 
        new HelloExecutor(), 
        this
    );
}
```
