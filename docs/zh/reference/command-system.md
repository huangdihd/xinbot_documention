# 命令系统

Xinbot 的命令行系统深度集成了 JLine，支持极佳的视觉反馈。

## 1. 执行器概述

Xinbot 提供了几种抽象类来满足不同的命令需求。所有执行器最终都继承自 `CommandExecutor`。

| 类名 | 用途 | 需要实现的方法 |
| :--- | :--- | :--- |
| `CommandExecutor` | 基础命令逻辑 | `onCommand` |
| `TabExecutor` | 添加 Tab 补全 | `onCommand`, `onTabComplete` |
| `HighlightExecutor` | 添加语法高亮 | `onCommand`, `onHighlight` |
| `TabHighlightExecutor` | 全功能命令 | `onCommand`, `onTabComplete`, `onHighlight` |
| `SubCommandExecutor` | 带有子命令的复杂指令 | `registerSubCommand` |

---

## 2. 实现基础执行器

对于大多数命令，建议使用 `TabHighlightExecutor` 以提供最佳的用户体验。

### 示例：简单的 "Hello" 命令
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloExecutor extends TabHighlightExecutor {
    private static final Logger log = LoggerFactory.getLogger(HelloExecutor.class);

    @Override
    public void onCommand(Command cmd, String label, String[] args) {
        log.info("你好, {}!", args.length > 0 ? args[0] : "世界");
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
        return Utils.parseHighlight(args); // 使用默认高亮
    }
}
```

---

## 3. 子命令系统 (`SubCommandExecutor`)

`SubCommandExecutor` 是专门为具有多个子动作（例如 `/mycmd add`, `/mycmd remove`）的命令设计的。它会自动处理分发逻辑、子命令名称的补全以及基础高亮。

### 注册子命令
通常在构造函数或初始化块中注册子命令。每个子命令本身也是一个 `CommandExecutor`。

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyMainCommand extends SubCommandExecutor {
    private static final Logger log = LoggerFactory.getLogger(MyMainCommand.class);

    public MyMainCommand() {
        // 自动将 "/test add" 路由给 AddExecutor
        registerSubCommand("add", new AddExecutor());
        registerSubCommand("remove", new RemoveExecutor());
    }

    @Override
    protected void onNoSubCommand(Command command, String label) {
        // 当用户只输入主命令时的逻辑
        log.warn("用法: /{} <add|remove>", label);
    }
}
```

---

## 4. 深入理解语法高亮 (`onHighlight`)

Xinbot 使用 `AttributedStyle[]` 数组来定义每个参数的颜色和样式。数组的长度必须与 `args` 的长度一致。

### 代码示例

#### 方式 A：手动实现
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

#### 方式 B：使用 `Utils`（推荐）
`Utils` 类提供了函数式辅助方法来减少样板代码。

```java
@Override
public AttributedStyle[] onHighlight(Command cmd, String label, String[] args) {
    // 使用函数式写法实现相同的逻辑
    return Utils.parseConditionalHighlight(
        args, 
        arg -> arg.matches("\\d+"), 
        AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW), 
        AttributedStyle.DEFAULT.foreground(AttributedStyle.CYAN)
    );
}
```

---

## 5. Tab 自动补全 (`onTabComplete`)

返回一个 `List<String>` 建议列表。Xinbot 会根据用户已经输入的字符自动过滤这些建议。

```java
@Override
public List<String> onTabComplete(Command cmd, String label, String[] args) {
    // args.length 表示用户当前正在输入第几个参数
    if (args.length == 1) {
        return List.of("red", "blue", "green");
    }
    return List.of();
}
```
