/**
 * @vjsplus-j/vue-starfall
 * Vue 3 星空主题背景组件库
 * 
 * @features
 * - 🌌 星空主题组件（AI星空、仙女座星系）
 * - 🎨 完整样式库（设计令牌、混入、主题系统）
 * - ⚡ 性能优化（自动设备检测）
 * - 🎭 TypeScript支持
 * 
 * @author 李飞恒
 * @copyright Copyright © 2025 李飞恒. All rights reserved.
 * @license MIT
 * @version 2.1.0
 */

import type { App, Plugin } from 'vue'
import AIBrain from './components/AIBrain.vue'
import AndromedaGalaxy from './components/AndromedaGalaxy.vue'
import GalaxyBackground from './components/GalaxyBackground.vue'

// 导出组件
export { AIBrain, AndromedaGalaxy, GalaxyBackground }

// 导出类型
export type * from './types'

// 导出工具函数
export {
  detectDevicePerformance,
  getPerformanceConfig,
  getActualPerformanceLevel,
  isMobileDevice,
  getDevicePixelRatio,
  PerformanceMonitor
} from './utils/performance'

// 组件列表
const components = [AIBrain, AndromedaGalaxy, GalaxyBackground]

/**
 * Vue 插件安装函数
 */
const install: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name || component.__name || '', component)
    })
  }
}

// 默认导出（支持 Vue.use() 方式安装）
export default install
