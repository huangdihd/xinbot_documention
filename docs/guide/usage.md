# Usage Guide

This guide provides an overview of Xinbot's core concepts and a complete reference for its built-in commands.

## 1. Core Concepts

### Bot
The central client that connects to the Minecraft server. It handles the network session, authentication, and coordinates all other systems.

### Plugin
Extensible modules that add custom logic to the bot. Xinbot uses a plugin-first architecture, allowing hot-reloading.

### Event
Internal triggers that occur within the bot (e.g., chat message, login success). Plugins can "listen" to these events.

### Command
Console-based instructions to control the bot, supporting tab-completion and syntax highlighting.

## 2. Command Reference

Xinbot commands can be executed directly in the console (case-insensitive).

| Command | Aliases | Usage | Description |
| :--- | :--- | :--- | :--- |
| `help` | - | `help [command]` | Shows help information, including sub-commands. |
| `say` | `chat` | `say <message>` | Sends a message to the public chat. |
| `command` | `cmd` | `cmd <command>` | Sends a command to the server (e.g., `cmd home`). |
| `pm` | `PluginManager` | `pm <sub-command>` | Manages plugins (load, unload, reload, etc.). |
| `plugins` | - | `plugins` | Lists all loaded plugins. |
| `list` | - | `list [uuid]` | Lists online players. |
| `disconnect` | - | `disconnect` | Disconnects the bot from the current server. |
| `stop` | - | `stop` | Stops the bot and closes the app gracefully. |

### PluginManager (pm) Sub-commands
- `pm list`: Lists all plugins.
- `pm load <file>`: Loads a plugin JAR.
- `pm unload <name>`: Unloads a plugin.
- `pm reload <name>`: Reloads a plugin.

## 3. Advanced Features

### Tab Completion
Press `Tab` to suggest command names, sub-commands, plugin names, and even server-side commands.

### Syntax Highlighting
Valid commands/arguments appear in specific colors, while unrecognized ones appear in Red.

### Server Commands
To send a command like `/w`, **must** use the `cmd` prefix:
> `cmd w <username> <message>`

## 4. Quick Tips

- **Owner Configuration**: Ensure the `owner` field in `config.conf` matches your Minecraft username.
- **Auto-slash**: The console handles the `/` prefix automatically when using `cmd`.
- **Exiting**: Always use `stop` to ensure plugins are unloaded properly.
