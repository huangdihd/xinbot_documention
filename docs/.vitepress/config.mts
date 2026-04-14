import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Xinbot",
  description: "A lightweight, extensible Minecraft bot client built for 2b2t.xin",
  head: [['link', { rel: 'icon', href: '/xinbot-logo.jpg' }]],
  
  // Multi-language configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Reference', link: '/reference/' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/guide/getting-started' },
                { text: 'Usage Guide', link: '/guide/usage' },
                { text: 'Config Generator', link: '/guide/config-generator' },
                { text: 'FAQ', link: '/guide/faq' }
              ]
            }
          ],
          '/reference/': [
            {
              text: 'Plugin Development',
              items: [
                { text: 'Overview', link: '/reference/' },
                { text: 'Lifecycle', link: '/reference/plugin-lifecycle' },
                { text: 'Event System', link: '/reference/event-system' },
                { text: 'Command System', link: '/reference/command-system' },
                { text: 'Packet Handling', link: '/reference/packet-handling' },
                { text: 'Language System', link: '/reference/lang-system' }
              ]
            }
          ]
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: '插件开发', link: '/zh/reference/' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速开始', link: '/zh/guide/getting-started' },
                { text: '使用手册', link: '/zh/guide/usage' },
                { text: '配置文件生成器', link: '/zh/guide/config-generator' },
                { text: '常见问题', link: '/zh/guide/faq' }
              ]
            }
          ],
          '/zh/reference/': [
            {
              text: '插件开发参考',
              items: [
                { text: '开发总览', link: '/zh/reference/' },
                { text: '生命周期与依赖', link: '/zh/reference/plugin-lifecycle' },
                { text: '事件系统', link: '/zh/reference/event-system' },
                { text: '命令系统', link: '/zh/reference/command-system' },
                { text: '数据包处理', link: '/zh/reference/packet-handling' },
                { text: '语言系统', link: '/zh/reference/lang-system' }
              ]
            }
          ]        }
      }
    }
  },

  themeConfig: {
    logo: '/xinbot-logo.jpg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/huangdihd/xinbot' },
      { icon: 'telegram', link: 'https://t.me/xinbot_develop' }
    ],
    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright © 2024-present huangdihd'
    },
    search: {
      provider: 'local'
    }
  }
})
