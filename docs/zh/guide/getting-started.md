# 快速开始


本章节将引导你完成 Xinbot 的基础安装、配置和首次运行。

## 1. 下载

前往 GitHub Releases 获取最新版本的 JAR 文件：
[Xinbot Releases](https://github.com/huangdihd/xinbot/releases)

下载名为 `xinbot-[版本号].jar` 的文件。

## 2. 安装 Java 环境

Xinbot 需要 **Java 17** 或更高版本才能运行。
你可以通过运行以下命令来检查你的 Java 版本：
```bash
java -version
```

## 3. 基础配置

在 JAR 同目录下创建一个名为 `config.conf` 的文件。这是一个 HOCON 格式的配置文件，以下是一个典型配置示例：

::: tip 💡 小技巧
不想手动编写配置文件？使用我们的 [**配置文件生成器**](./config-generator) 即可一键生成！
:::

```json
{
    "account" : {
        "fullSession" : null,           // 由 Xinbot 自动生成；保持为空
        "name" : "[Bot name]",          // 机器人用户名
        "onlineMode" : false,           // true = 使用正版账号登录
        "password" : ""                 // 2b2t.xin 密码
    },
    "enableTranslation" : true,         // 是否加载语言文件（开启将占用更多内存）
    "owner" : "[Owner name]",           // 机器人的主人名称（管理员）
    "plugin" : {
        "directory" : "plugin"          // 插件目录
    },
    "proxy" : {
        "enable" : false,               // 是否启用代理
        "info" : {
            "address" : "",
            "type" : "",                // HTTP, SOCKS4, SOCKS5
            "password" : "",
            "username" : ""
        }
    }
}
```

## 4. 运行

使用命令行进入 JAR 文件所在的目录，执行：

```bash
# 默认使用同目录下的 config.conf
java -jar xinbot-[版本号].jar

# 或者手动指定配置文件路径
java -jar xinbot-[版本号].jar /path/to/your/config.conf
```

## 5. 正版登录（可选）

如果你将 `onlineMode` 设置为 `true` 且 `fullSession` 为空，程序启动后控制台会显示一个微软登录链接。你需要打开该链接完成授权，Xinbot 会自动获取并保存 Session。

---

接下来，你可以查看 [使用手册](./usage) 学习如何控制机器人。
