# @vjsplus-j/vue-starfall

<div align="center">

✨ **Vue 3 Galaxy Theme Background Component Library** ✨

[![npm version](https://img.shields.io/npm/v/@vjsplus-j/vue-starfall.svg)](https://www.npmjs.com/package/@vjsplus-j/vue-starfall)
[![license](https://img.shields.io/npm/l/@vjsplus-j/vue-starfall.svg)](https://github.com/vjsplus-j/vue-starfall/blob/main/LICENSE)

Beautiful galaxy theme background components, featuring **AI Starfield** and **Andromeda Galaxy** themes

[Live Demo](https://vjsplus-j.github.io/vue-starfall) | [GitHub](https://github.com/vjsplus-j/vue-starfall) | [Style Library →](https://github.com/vjsplus-j/galaxy-styles)

[中文文档](./README.zh-CN.md)

</div>

> **📦 Dependency Notice:** This component library depends on [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) style library, which provides a complete design system. The dependency will be automatically installed.

---

## 📸 Screenshots

### AI Brain Theme - HUD Tech Rings System
<img src="./screenshots/AI-Brain.png" alt="AI Brain Theme" width="800">

*Features particle ring system, alternating rotation, scale markers, data points, and neural pulse effects*

### Andromeda Galaxy Theme
<img src="./screenshots/andromeda.png" alt="Andromeda Galaxy Theme" width="800">

*Features galaxy core, spiral arms, nebula nodes, and star twinkling effects*

---

## ✨ Features

- 🌌 **Two Beautiful Themes** - AI Starfield & Andromeda Galaxy
- 🎨 **Dynamic Animations** - Smooth star twinkling, particle orbiting, nebula floating
- 📱 **Responsive Design** - Auto-adapts to mobile and desktop
- ⚡ **Smart Performance Optimization** - Auto device detection, dynamic element adjustment
- 🎭 **TypeScript Support** - Complete type definitions
- 🔧 **Easy Integration** - Support for on-demand import, ready to use
- 💪 **Lightweight Dependencies** - Only depends on Vue 3 and galaxy-styles
- 🎉 **v2.0 New** - Enhanced theme configuration, event system, utility function exports
- 🎨 **Style Library** - Integrated @vjsplus-j/galaxy-styles design system

---

## 📦 Installation

```bash
# npm
npm install @vjsplus-j/vue-starfall

# yarn
yarn add @vjsplus-j/vue-starfall

# pnpm
pnpm add @vjsplus-j/vue-starfall
```

> **💡 Tip:** This component library depends on [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) style library.  
> For custom styles or design tokens, see [Style Library Documentation →](https://github.com/vjsplus-j/galaxy-styles)

---

## 🚀 Quick Start

### Global Registration (Recommended)

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

### On-demand Import

```vue
<template>
  <GalaxyBackground>
    <div class="content">
      <h1>Welcome</h1>
    </div>
  </GalaxyBackground>
</template>

<script setup lang="ts">
import { GalaxyBackground } from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
</script>
```

---

## 📖 Component Introduction

### 1. GalaxyBackground (Recommended)

Unified galaxy background container, uses AI Starfield theme by default.

```vue
<template>
  <GalaxyBackground theme="ai-brain">
    <div class="content">
      <h1>Your Content</h1>
    </div>
  </GalaxyBackground>
</template>
```

**Props:**
- `theme` - Theme type: `'ai-brain'` | `'andromeda'`
- `performance` - Performance level: `'high'` | `'medium'` | `'low'` | `'auto'`
- `watermarkText` - Watermark text
- `watermarkPosition` - Watermark position
- `enableDataflow` - Enable data flow grid

---

### 2. AIBrain (AI Starfield Theme)

Beautiful AI starfield background, includes:
- ⭐ 150 dynamically twinkling stars
- 🔮 20 orbiting particles
- 🌌 Flowing nebula background
- 💫 Smooth animations

```vue
<template>
  <AIBrain :star-count="150" :particle-count="20" />
</template>
```

---

### 3. AndromedaGalaxy (Andromeda Galaxy Theme)

Realistic Andromeda Galaxy simulation, includes:
- 🌟 720 stars (core, spiral arms, outer regions)
- 🌀 Spiral structure
- ✨ Depth layering
- 🎨 Realistic colors

```vue
<template>
  <AndromedaGalaxy :star-count="720" />
</template>
```

---

## 🎨 Style Library

> **⚠️ Important:** This component library depends on [@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) style library.  
> galaxy-styles provides a complete design system, including design tokens, mixins, themes, etc.

### About galaxy-styles

[@vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) is an independent galaxy theme style library, including:

- 🎨 **Design Tokens** - Colors, typography, spacing, radius, shadows, animations
- 🪄 **Mixin System** - Glass morphism, gradients, responsive, utility functions
- 🌌 **Theme System** - Galaxy dark theme
- 📦 **On-demand Import** - Support for SCSS modular imports

**📚 View Complete Documentation:** [galaxy-styles GitHub →](https://github.com/vjsplus-j/galaxy-styles)

### Install Style Library

```bash
npm install @vjsplus-j/galaxy-styles
# or
yarn add @vjsplus-j/galaxy-styles
```

> **💡 Tip:** Installing vue-starfall will automatically install galaxy-styles as a dependency.

### Import Complete Styles

```js
// main.ts
import '@vjsplus-j/galaxy-styles'
```

### Use Design Tokens in SCSS

```scss
// Import required tokens and mixins
@use '@vjsplus-j/galaxy-styles/tokens/colors' as *;
@use '@vjsplus-j/galaxy-styles/tokens/spacing' as *;
@use '@vjsplus-j/galaxy-styles/mixins/glass' as *;
@use '@vjsplus-j/galaxy-styles/mixins/gradient' as *;

.my-card {
  // Use glass morphism effect
  @include glass-card;
  
  // Use design tokens
  padding: $spacing-lg;
  color: $text-primary;
}

.title {
  // Gradient text
  @include gradient-text-primary;
}
```

---

## ⚡ Performance Optimization

Built-in performance optimization mechanisms:

- ✅ **Mobile Detection** - Auto reduce stars and particles (halved)
- ✅ **Device Pixel Ratio Detection** - Auto optimize for high DPI devices
- ✅ **CSS Animations** - GPU accelerated, excellent performance
- ✅ **Lazy Loading** - Components loaded on demand

### Performance Levels

Use the `performance` prop to control rendering quality:

```vue
<GalaxyBackground performance="medium">
  <!-- Your content -->
</GalaxyBackground>
```

**Performance Comparison:**

| Level | Stars | Particles | Nebula Layers | Use Case |
|-------|-------|-----------|---------------|----------|
| `high` | 150 | 20 | 3 | Demo/Showcase pages |
| `medium` | 100 | 14 | 2 | Login/Landing pages ⭐ |
| `low` | 50 | 7 | 1 | Dashboard/Work pages |
| `auto` | Auto-detected based on device | | | Default (Recommended) |

**Performance Impact:**

- **high**: Best visual quality, higher GPU/CPU usage
- **medium**: Balanced quality and performance (recommended for most pages)
- **low**: Minimal resource usage, suitable for work environments
- **auto**: Automatically adjusts based on device capabilities

### Manual Optimization

For individual components, you can manually control element count:

```vue
<AIBrain :star-count="100" :particle-count="10" />
<AndromedaGalaxy :star-count="360" />
```

---

## 🎯 Browser Compatibility

- ✅ Chrome >= 90
- ✅ Firefox >= 88
- ✅ Safari >= 14
- ✅ Edge >= 90

---

## 📝 TypeScript

Complete TypeScript type support:

```typescript
import type { 
  GalaxyBackgroundProps,
  ThemeType,
  PerformanceLevel 
} from '@vjsplus-j/vue-starfall'
```

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

## 📄 License

[MIT](LICENSE)

Copyright © 2025 李飞恒. All rights reserved.

---

## 🔗 Related Links

- [GitHub Repository](https://github.com/vjsplus-j/vue-starfall)
- [Issue Tracker](https://github.com/vjsplus-j/vue-starfall/issues)
- [Changelog](https://github.com/vjsplus-j/vue-starfall/blob/main/CHANGELOG.md)
- [📦 Style Library @vjsplus-j/galaxy-styles](https://github.com/vjsplus-j/galaxy-styles) - Style dependency for this component library

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

Made with ❤️ by 李飞恒

</div>
