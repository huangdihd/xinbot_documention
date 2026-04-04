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
          { text: 'Reference', link: '/reference/plugin-development' }
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
              text: 'Reference',
              items: [
                { text: 'Plugin Development', link: '/reference/plugin-development' }
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
          { text: '插件开发', link: '/zh/reference/plugin-development' }
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
              text: '插件开发',
              items: [
                { text: '开发指南', link: '/zh/reference/plugin-development' }
              ]
            }
          ]
        }
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
