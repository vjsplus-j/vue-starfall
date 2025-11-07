# @vjsplus-j/vue-starfall

<div align="center">

✨ **Vue 3 星空主题背景组件库** ✨

[![npm version](https://img.shields.io/npm/v/@vjsplus-j/vue-starfall.svg)](https://www.npmjs.com/package/@vjsplus-j/vue-starfall)
[![license](https://img.shields.io/npm/l/@vjsplus-j/vue-starfall.svg)](https://github.com/vjsplus-j/vue-starfall/blob/main/LICENSE)

精美的星空主题背景组件，包含 **AI星空** 和 **仙女座星系** 两大主题

[在线演示](https://vjsplus-j.github.io/vue-starfall) | [GitHub](https://github.com/vjsplus-j/vue-starfall) | [样式库 →](https://github.com/vjsplus-j/galaxy-styles)

[English](./README.md) | 简体中文

</div>

> **📦 依赖说明：** 本组件库依赖 [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) 样式库，提供完整的设计系统。安装时会自动安装该依赖。

---

## ✨ 特性

- 🌌 **两大精美主题** - AI星空 & 仙女座星系
- 🎨 **动态动画效果** - 流畅的星星闪烁、粒子环绕、星云飘动
- 📱 **响应式设计** - 自动适配移动端和桌面端
- ⚡ **智能性能优化** - 自动设备检测，动态调节渲染元素
- 🎭 **TypeScript支持** - 完整的类型定义
- 🔧 **易于集成** - 支持按需导入，开箱即用
- 💪 **轻量依赖** - 仅依赖 Vue 3 和 galaxy-styles
- 🎉 **v2.0 新增** - 主题配置增强、事件系统、工具函数导出
- 🎨 **样式库** - 集成 @vjsplus-j/galaxy-styles 设计系统

---

## 📦 安装

```bash
# npm
npm install @vjsplus-j/vue-starfall

# yarn
yarn add @vjsplus-j/vue-starfall

# pnpm
pnpm add @vjsplus-j/vue-starfall
```

> **💡 提示：** 本组件库依赖 [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) 样式库。  
> 如果需要自定义样式或使用设计令牌，请查看 [样式库文档 →](https://github.com/vjsplus-j/galaxy-styles)

---

## 🚀 快速开始

### 全局注册（推荐）

```typescript
// main.ts
import { createApp } from 'vue'
import VueStarfall from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueStarfall)
app.mount('#app')
```

### 按需导入

```vue
<template>
  <GalaxyBackground>
    <div class="your-content">
      <h1>欢迎使用 Vue Starfall</h1>
    </div>
  </GalaxyBackground>
</template>

<script setup lang="ts">
import { GalaxyBackground } from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
</script>
```

---

## 📖 组件介绍

### 1. GalaxyBackground (推荐)

统一的星空背景容器，默认使用 AI星空 主题。

```vue
<template>
  <GalaxyBackground>
    <YourContent />
  </GalaxyBackground>
</template>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'ai-brain' \| 'andromeda'` | `'ai-brain'` | 主题类型 |
| `showWatermark` | `boolean` | `true` | 是否显示水印 |
| `watermarkText` | `string` | `'GMD AI生成'` | 水印文字 |

---

### 2. AIBrain (AI星空主题)

精美的AI星空背景，包含：
- ⭐ 150颗动态闪烁星星
- 🌀 3层多彩星云
- 🪐 巨大的AI核心星球（真实的球体效果）
- 💫 20颗环绕恒星粒子
- 🌙 超大型伴星（月亮般的效果）
- 🌊 能量波纹动画

```vue
<template>
  <div class="container">
    <AIBrain />
    <YourContent />
  </div>
</template>

<script setup lang="ts">
import { AIBrain } from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
</script>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `starCount` | `number` | `150` | 星星数量 |
| `particleCount` | `number` | `20` | 环绕粒子数量 |

---

### 3. AndromedaGalaxy (仙女座星系主题)

真实的仙女座星系模拟，包含：
- 🌟 720颗星星（核心区、螺旋臂、外围三层结构）
- ✨ 多色星星（蓝、紫、绿、红、橙）
- 🌌 星系核心光晕
- 💫 星云光晕节点
- 🔄 -15° 倾斜角（真实星系角度）

```vue
<template>
  <div class="container">
    <AndromedaGalaxy 
      :center-x="32"
      :center-y="50"
      :star-count="720"
    />
    <YourContent />
  </div>
</template>

<script setup lang="ts">
import { AndromedaGalaxy } from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
</script>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `centerX` | `number` | `32` | 星系中心X坐标（百分比） |
| `centerY` | `number` | `50` | 星系中心Y坐标（百分比） |
| `starCount` | `number` | `720` | 星星总数量 |
| `coreRatio` | `number` | `0.20` | 核心区星星比例 |
| `armRatio` | `number` | `0.70` | 螺旋臂星星比例 |

---

## 🎨 使用场景

### 登录页面
```vue
<template>
  <GalaxyBackground>
    <div class="login-card">
      <!-- 登录表单 -->
    </div>
  </GalaxyBackground>
</template>
```

### 404 错误页
```vue
<template>
  <GalaxyBackground>
    <div class="error-page">
      <h1>404</h1>
      <p>页面未找到</p>
    </div>
  </GalaxyBackground>
</template>
```

### 引导页
```vue
<template>
  <GalaxyBackground>
    <div class="welcome">
      <h1>Welcome</h1>
      <button>开始使用</button>
    </div>
  </GalaxyBackground>
</template>
```

---

## 🎨 样式库

> **⚠️ 重要：** 本组件库依赖 [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) 样式库。  
> galaxy-styles 提供了完整的设计系统，包括设计令牌、混入、主题等。

### 关于 galaxy-styles

[@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) 是一个独立的星空主题样式库，包含：

- 🎨 **设计令牌** - 颜色、字体、间距、圆角、阴影、动画
- 🪄 **混入系统** - 玻璃态、渐变、响应式、工具函数
- 🌌 **主题系统** - 星空深色主题
- 📦 **按需导入** - 支持 SCSS 模块化导入

**📚 查看完整文档：** [galaxy-styles GitHub →](https://github.com/vjsplus-j/galaxy-styles)

### 安装样式库

```bash
npm install @vjsplus-j/galaxy-styles
# 或
yarn add @vjsplus-j/galaxy-styles
```

> **💡 提示：** 安装 vue-starfall 时会自动安装 galaxy-styles 作为依赖。

### 导入完整样式

```js
// main.ts
import '@vjsplus-j/galaxy-styles'
```

### 在SCSS中使用设计令牌

```scss
// 导入所需的令牌和混入
@use '@vjsplus-j/galaxy-styles/tokens/colors' as *;
@use '@vjsplus-j/galaxy-styles/tokens/spacing' as *;
@use '@vjsplus-j/galaxy-styles/mixins/glass' as *;
@use '@vjsplus-j/galaxy-styles/mixins/gradient' as *;

.my-card {
  // 使用玻璃态效果
  @include glass-card;
  
  // 使用设计令牌
  padding: $spacing-lg;
  color: $text-primary;
}

.title {
  // 渐变文字
  @include gradient-text-primary;
}
```

### 可用的样式模块

**设计令牌（Design Tokens）**
- `tokens/colors` - 颜色系统
- `tokens/typography` - 字体系统
- `tokens/spacing` - 间距系统
- `tokens/radius` - 圆角系统
- `tokens/shadows` - 阴影系统
- `tokens/animations` - 动画系统

**混入（Mixins）**
- `mixins/glass` - 玻璃态效果
- `mixins/gradient` - 渐变效果
- `mixins/responsive` - 响应式系统
- `mixins/utils` - 工具混入

**主题**
- `themes/galaxy-dark` - 星空深色主题

详细文档请查看：[@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles)

---

## ⚡ 性能优化

组件内置了性能优化机制：

- ✅ **移动端检测** - 自动降低星星和粒子数量（减半）
- ✅ **设备像素比检测** - 高DPI设备自动优化
- ✅ **CSS动画** - 使用 GPU 加速，性能优异
- ✅ **懒加载** - 组件按需加载

### 手动优化

如果遇到性能问题，可以手动降低元素数量：

```vue
<AIBrain :star-count="100" :particle-count="10" />
<AndromedaGalaxy :star-count="360" />
```

---

## 🎯 浏览器兼容性

- ✅ Chrome >= 90
- ✅ Firefox >= 88
- ✅ Safari >= 14
- ✅ Edge >= 90

---

## 📝 TypeScript

完整的 TypeScript 类型支持：

```typescript
import type {
  AIBrainProps,
  AndromedaGalaxyProps,
  GalaxyBackgroundProps,
  ThemeType,
  PerformanceLevel
} from '@vjsplus-j/vue-starfall'
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 开源协议

[MIT](LICENSE)

Copyright © 2025 李飞恒. All rights reserved.

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/vjsplus-j/vue-starfall)
- [问题反馈](https://github.com/vjsplus-j/vue-starfall/issues)
- [更新日志](https://github.com/vjsplus-j/vue-starfall/blob/main/CHANGELOG.md)
- [📦 样式库 @vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) - 本组件库的样式依赖

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by 李飞恒

</div>
