# 🎯 @vjsplus-j/vue-starfall 新特性文档

## ✨ v1.1.0 新增功能

### 1. 主题配置增强

#### GalaxyBackground 组件增强

```vue
<template>
  <GalaxyBackground
    theme="ai-brain"
    :show-watermark="true"
    watermark-text="我的品牌"
    watermark-position="bottom-right"
    :watermark-opacity="0.5"
    performance="auto"
    :auto-detect="true"
    :enable-dataflow="true"
    @loaded="handleLoaded"
    @performance-change="handlePerformanceChange"
    @theme-change="handleThemeChange"
    @error="handleError"
  >
    <YourContent />
  </GalaxyBackground>
</template>

<script setup lang="ts">
import type { PerformanceLevel, ThemeType } from '@vjsplus-j/vue-starfall'

const handleLoaded = () => {
  console.log('组件加载完成')
}

const handlePerformanceChange = (level: PerformanceLevel) => {
  console.log('性能级别变化:', level)
}

const handleThemeChange = (theme: ThemeType) => {
  console.log('主题变化:', theme)
}

const handleError = (error: Error) => {
  console.error('渲染错误:', error)
}
</script>
```

**新增 Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'ai-brain' \| 'andromeda'` | `'ai-brain'` | 主题类型 |
| `showWatermark` | `boolean` | `true` | 是否显示水印 |
| `watermarkText` | `string` | `'GMD AI生成'` | 水印文字 |
| `watermarkPosition` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | 水印位置 |
| `watermarkOpacity` | `number` | `0.3` | 水印透明度（0-1） |
| `performance` | `'high' \| 'medium' \| 'low' \| 'auto'` | `'auto'` | 性能级别 |
| `autoDetect` | `boolean` | `true` | 是否自动检测性能 |
| `enableDataflow` | `boolean` | `true` | 是否显示数据流网格 |

**新增事件:**

| 事件 | 参数 | 说明 |
|------|------|------|
| `loaded` | `()` | 组件加载完成 |
| `performanceChange` | `(level: PerformanceLevel)` | 性能级别变化 |
| `themeChange` | `(theme: ThemeType)` | 主题变化 |
| `error` | `(error: Error)` | 渲染错误 |

---

#### AIBrain 组件增强

```vue
<template>
  <AIBrain
    :star-count="300"
    :particle-count="25"
    :nebula-count="5"
    :animation-speed="1.5"
    :enable-orbit="true"
    :enable-nebula="true"
    :enable-companion="true"
    performance="high"
    @loaded="handleLoaded"
    @performance-change="handlePerformanceChange"
    @error="handleError"
  />
</template>
```

**新增 Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `starCount` | `number` | `auto` | 星星数量（根据性能自动调整） |
| `particleCount` | `number` | `auto` | 环绕粒子数量 |
| `nebulaCount` | `number` | `3` | 星云数量（1-7） |
| `animationSpeed` | `number` | `1` | 动画速度倍数 |
| `enableOrbit` | `boolean` | `true` | 是否启用环绕粒子 |
| `enableNebula` | `boolean` | `true` | 是否启用星云效果 |
| `enableCompanion` | `boolean` | `true` | 是否启用伴星 |
| `performance` | `'high' \| 'medium' \| 'low' \| 'auto'` | `'auto'` | 性能级别 |

---

#### AndromedaGalaxy 组件增强

```vue
<template>
  <AndromedaGalaxy
    :center-x="50"
    :center-y="50"
    :star-count="1000"
    :core-ratio="0.25"
    :arm-ratio="0.65"
    :animation-speed="1.2"
    :enable-core-glow="true"
    :enable-nebula="true"
    performance="high"
    @loaded="handleLoaded"
    @performance-change="handlePerformanceChange"
    @error="handleError"
  />
</template>
```

**新增 Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `starCount` | `number` | `auto` | 星星总数量 |
| `animationSpeed` | `number` | `1` | 动画速度倍数 |
| `enableCoreGlow` | `boolean` | `true` | 是否启用核心光晕 |
| `enableNebula` | `boolean` | `true` | 是否启用星云节点 |
| `performance` | `'high' \| 'medium' \| 'low' \| 'auto'` | `'auto'` | 性能级别 |

---

### 2. 性能优化增强

#### 自动性能检测

组件会自动检测设备性能并调整渲染元素数量：

```typescript
import { detectDevicePerformance } from '@vjsplus-j/vue-starfall'

const devicePerf = detectDevicePerformance()
console.log('设备信息:', {
  isMobile: devicePerf.isMobile,
  devicePixelRatio: devicePerf.devicePixelRatio,
  cpuCores: devicePerf.cpuCores,
  memory: devicePerf.memory,
  recommendedLevel: devicePerf.recommendedLevel
})
```

#### 性能级别配置

| 级别 | 桌面端星星 | 移动端星星 | 粒子数 | 星云数 |
|------|-----------|-----------|--------|--------|
| `high` | 480 | 240 | 20 | 7 |
| `medium` | 240 | 120 | 15 | 5 |
| `low` | 120 | 60 | 10 | 3 |
| `auto` | 根据设备自动选择 | - | - | - |

#### 手动获取性能配置

```typescript
import { getPerformanceConfig } from '@vjsplus-j/vue-starfall'

const config = getPerformanceConfig('high')
console.log('高性能配置:', config)
// {
//   starCount: 480,
//   particleCount: 20,
//   nebulaCount: 7,
//   enableBlur: true,
//   enableShadow: true
// }
```

#### 性能监控（可选）

```typescript
import { PerformanceMonitor } from '@vjsplus-j/vue-starfall'

const monitor = new PerformanceMonitor()
monitor.start((fps) => {
  console.log('当前FPS:', fps)
  if (fps < 30) {
    console.warn('性能较低，建议降低配置')
  }
})

// 停止监控
// monitor.stop()
```

---

### 3. 事件系统

所有组件现在都支持事件监听：

```vue
<template>
  <GalaxyBackground
    @loaded="onLoaded"
    @performance-change="onPerformanceChange"
    @theme-change="onThemeChange"
    @error="onError"
  >
    <YourContent />
  </GalaxyBackground>
</template>

<script setup lang="ts">
import type { PerformanceLevel, ThemeType } from '@vjsplus-j/vue-starfall'

const onLoaded = () => {
  console.log('✅ 组件已加载')
}

const onPerformanceChange = (level: PerformanceLevel) => {
  console.log('📊 性能级别:', level)
  // 可以根据性能级别显示提示
  if (level === 'low') {
    console.warn('当前设备性能较低')
  }
}

const onThemeChange = (theme: ThemeType) => {
  console.log('🎨 主题切换:', theme)
}

const onError = (error: Error) => {
  console.error('❌ 渲染错误:', error.message)
  // 错误处理逻辑
}
</script>
```

---

## 🔧 工具函数导出

```typescript
import {
  // 性能检测
  detectDevicePerformance,
  getPerformanceConfig,
  getActualPerformanceLevel,
  
  // 设备信息
  isMobileDevice,
  getDevicePixelRatio,
  
  // 性能监控
  PerformanceMonitor,
  
  // 类型
  type DevicePerformance,
  type PerformanceConfig,
  type PerformanceLevel
} from '@vjsplus-j/vue-starfall'

// 检测是否为移动设备
if (isMobileDevice()) {
  console.log('移动设备')
}

// 获取设备像素比
const dpr = getDevicePixelRatio()
console.log('设备像素比:', dpr)

// 获取实际性能级别（处理auto）
const actualLevel = getActualPerformanceLevel('auto')
console.log('实际性能级别:', actualLevel) // 'high' | 'medium' | 'low'
```

---

## 📖 完整示例

### 高度自定义的登录页面

```vue
<template>
  <GalaxyBackground
    theme="ai-brain"
    watermark-text="我的公司"
    watermark-position="bottom-right"
    :watermark-opacity="0.4"
    performance="auto"
    @loaded="handleLoaded"
    @performance-change="handlePerformanceChange"
  >
    <div class="login-container">
      <div class="login-card">
        <h1>欢迎登录</h1>
        <!-- 登录表单 -->
      </div>
      
      <div class="performance-indicator">
        性能级别: {{ currentPerformance }}
      </div>
    </div>
  </GalaxyBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PerformanceLevel } from '@vjsplus-j/vue-starfall'

const currentPerformance = ref<PerformanceLevel>('auto')

const handleLoaded = () => {
  console.log('星空背景加载完成')
}

const handlePerformanceChange = (level: PerformanceLevel) => {
  currentPerformance.value = level
  console.log('性能级别已调整为:', level)
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.performance-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 8px;
  font-size: 12px;
}
</style>
```

---

## 🎯 最佳实践

### 1. 性能优先

```vue
<!-- ✅ 推荐：让组件自动检测 -->
<GalaxyBackground performance="auto" />

<!-- ⚠️ 低端设备手动降级 -->
<GalaxyBackground 
  v-if="isLowEndDevice" 
  performance="low" 
/>
```

### 2. 按需启用功能

```vue
<!-- 移动端禁用一些效果 -->
<AIBrain 
  :enable-companion="!isMobile"
  :nebula-count="isMobile ? 2 : 5"
/>
```

### 3. 错误处理

```vue
<GalaxyBackground @error="handleError">
  <YourContent />
</GalaxyBackground>

<script setup>
const handleError = (error) => {
  // 降级方案：显示静态背景
  console.error('星空渲染失败，使用静态背景', error)
}
</script>
```

---

## 🔄 迁移指南

### 从 v1.0.0 升级到 v1.1.0

所有现有代码保持兼容，新功能为可选：

```vue
<!-- v1.0.0 代码 - 仍然有效 -->
<GalaxyBackground>
  <YourContent />
</GalaxyBackground>

<!-- v1.1.0 - 添加新功能 -->
<GalaxyBackground
  performance="auto"
  @loaded="handleLoaded"
>
  <YourContent />
</GalaxyBackground>
```

---

**享受新特性！** 🎉
