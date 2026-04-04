# 命令系统

你可以为你的插件添加自定义的控制台指令。Xinbot 的命令行系统深度集成了 JLine，支持强大的交互体验。

## 1. 定义命令元数据

创建一个继承自 `xin.bbtt.mcbot.command.Command` 的类。

```java
import xin.bbtt.mcbot.command.Command;

public class MyCmd extends Command {
    @Override
    public String getName() { return "mycmd"; }

    @Override
    public String[] getAliases() { return new String[]{"mc", "test"}; }

    @Override
    public String getDescription() { return "这是一个示例命令"; }
}
```

---

## 2. 选择合适的执行器 (Executor)

根据你命令的复杂程度，Xinbot 提供了四种不同的抽象类供你继承：

### A. 基础执行器 (`CommandExecutor`)
仅处理命令执行逻辑。
```java
public class MyExec extends CommandExecutor {
    @Override
    public void onCommand(Command command, String label, String[] args) {
        System.out.println("命令已执行！");
    }
}
```

### B. 带补全的执行器 (`TabExecutor`)
支持 Tab 键自动补全参数。
```java
public class MyTabExec extends TabExecutor {
    @Override
    public void onCommand(Command command, String label, String[] args) { ... }

    @Override
    public List<String> onTabComplete(Command cmd, String label, String[] args) {
        return List.of("option1", "option2");
    }
}
```

### C. 带高亮的执行器 (`HighlightExecutor`)
支持在输入时实时改变控制台文字颜色。
```java
public class MyHighExec extends HighlightExecutor {
    @Override
    public void onCommand(Command command, String label, String[] args) { ... }

    @Override
    public AttributedString onHighlight(Command cmd, String label, String[] args) {
        return new AttributedStringBuilder()
            .append(args[0], AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN))
            .toAttributedString();
    }
}
```

### D. 全功能执行器 (`TabHighlightExecutor`)
同时支持补全和高亮（最常用）。

---

## 3. 注册命令

在插件主类的 `onEnable()` 中注册。你需要传入：**命令定义实例**、**执行器实例** 以及 **插件实例 (`this`)**。

```java
@Override
public void onEnable() {
    Bot.Instance.getPluginManager().registerCommand(
        new MyCmd(), 
        new MyTabExec(), 
        this
    );
}
```
