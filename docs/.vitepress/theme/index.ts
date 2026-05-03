import DefaultTheme from 'vitepress/theme'
import ConfigGenerator from './components/ConfigGenerator.vue'
import PluginYmlGenerator from './components/PluginYmlGenerator.vue'
import CommandsYmlGenerator from './components/CommandsYmlGenerator.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('ConfigGenerator', ConfigGenerator)
    app.component('PluginYmlGenerator', PluginYmlGenerator)
    app.component('CommandsYmlGenerator', CommandsYmlGenerator)
  }
}
