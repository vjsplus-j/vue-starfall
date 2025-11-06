/**
 * Vue Starfall SDK
 * @author 李飞恒
 * @copyright Copyright © 2025 李飞恒. All rights reserved.
 * @license Apache-2.0
 * @version 1.0.0
 */

import type { App } from 'vue'
import ThemeBackground from './components/ThemeBackground.vue'
import LoginTheme from './components/LoginTheme.vue'

export { ThemeBackground, LoginTheme }
export * from './types'

// Vue 插件安装
export default {
  install(app: App) {
    app.component('ThemeBackground', ThemeBackground)
    app.component('LoginTheme', LoginTheme)
  }
}
