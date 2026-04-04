import DefaultTheme from 'vitepress/theme'
import ConfigGenerator from './components/ConfigGenerator.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('ConfigGenerator', ConfigGenerator)
  }
}
