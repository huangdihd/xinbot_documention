# 插件开发参考

欢迎来到 Xinbot 插件开发手册。Xinbot 采用了高度解耦的插件化架构，允许开发者通过简单的 Java 代码扩展机器人的几乎所有功能。

### 🚀 核心文档
- **[插件生命周期](./plugin-lifecycle)**：了解如何创建项目并掌握 `onEnable` 等生命周期钩子。
- **[事件系统](./event-system)**：监听聊天消息、登录状态、玩家变动等 20+ 种内置事件。
- **[命令系统](./command-system)**：为你的插件添加自定义控制台指令，支持自动补全和实时高亮。
- **[数据包处理](./packet-handling)**：深入底层，直接处理 Minecraft 原始网络协议包。

### 💡 开发建议
*   **Java 版本**：建议使用 Java 17 或更高版本。
*   **依赖管理**：推荐使用 Maven 或 Gradle 进行项目构建。
*   **源码学习**：阅读 Xinbot 源码中的现有插件基础设施，或者参考官方开源插件如 [MovementSync](https://github.com/huangdihd/movementsync) 的源码是最好的进阶方式。
