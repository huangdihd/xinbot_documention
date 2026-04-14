# Plugin Development Reference

Welcome to the Xinbot Plugin Development Manual. Xinbot features a highly decoupled, plugin-based architecture that allows developers to extend almost every functionality of the bot using simple Java code.

### 🚀 Core Documentation
- **[Plugin Lifecycle](./plugin-lifecycle)**: Setup your project and master lifecycle hooks like `onEnable`.
- **[Event System](./event-system)**: Listen to 20+ built-in events including chat, login, and player updates.
- **[Command System](./command-system)**: Add custom console commands with tab completion and real-time highlighting.
- **[Packet Handling](./packet-handling)**: Go low-level and handle raw Minecraft protocol packets.
- **[Language System](./lang-system)**: Implement multi-language support and internationalization for your plugin.

### 💡 Development Tips
*   **Java Version**: Java 17 or newer is required.
*   **Dependencies**: Maven or Gradle is recommended for project management.
*   **Study Source Code**: Examining the existing plugin infrastructure in the Xinbot source code, or referring to official open-source plugins like [MovementSync](https://github.com/huangdihd/movementsync), is the best way to learn advanced usage.
