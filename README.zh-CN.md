# Vue Starfall 🌌

<div align="center">

**Vue3 星空主题组件库 - 让你的应用璀璨如星河**

[![npm version](https://img.shields.io/npm/v/@lifeiheng/vue-starfall.svg)](https://www.npmjs.com/package/@lifeiheng/vue-starfall)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)

[English](./README.md) | [中文文档](./README.zh-CN.md)

</div>

---

## ✨ 特性

- 🌌 **精美的星空背景** - 真实的星空效果,包含星星、星云、行星和银河
- 🎨 **毛玻璃设计** - 现代化的玻璃拟态卡片效果
- 📱 **响应式设计** - 自动适配移动端和桌面端设备
- ⚡ **性能优化** - 根据设备性能智能调节
- 🎭 **流畅动画** - 优雅的过渡和交互效果
- 🔧 **高度可定制** - 灵活的插槽和属性,完全控制
- 💪 **TypeScript 支持** - 完整的类型定义
- 🎯 **零配置** - 开箱即用

---

## 📦 安装

```bash
# npm
npm install @lifeiheng/vue-starfall

# yarn
yarn add @lifeiheng/vue-starfall

# pnpm
pnpm add @lifeiheng/vue-starfall
```

---

## 🚀 快速开始

### 全局注册

```typescript
// main.ts
import { createApp } from 'vue'
import VueStarfall from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueStarfall)
app.mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { ThemeBackground, LoginTheme } from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'
</script>
```

---

## 📖 组件

### ThemeBackground

星空主题背景组件 - 提供令人惊艳的宇宙背景效果。

#### 基础用法

```vue
<template>
  <ThemeBackground>
    <h1>你的内容</h1>
  </ThemeBackground>
</template>

<script setup lang="ts">
import { ThemeBackground } from '@lifeiheng/vue-starfall'
</script>
```

#### 功能特性

- ⭐ 闪烁的星星,带有景深效果
- 🌈 多彩的旋转星云
- 🪐 柔和的行星光晕
- 🌌 银河带效果
- 📱 移动端自动降级

---

### LoginTheme

完整的登录页面主题,采用毛玻璃设计。

#### 基础用法

```vue
<template>
  <LoginTheme
    title="我的应用"
    subtitle="欢迎回来"
    :loading="loading"
    :error-message="errorMsg"
    v-model="formData"
    @submit="handleLogin"
    @clear-error="errorMsg = ''"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LoginTheme, type LoginFormData } from '@lifeiheng/vue-starfall'

const loading = ref(false)
const errorMsg = ref('')
const formData = ref<LoginFormData>({
  username: '',
  password: ''
})

const handleLogin = async (data: LoginFormData) => {
  loading.value = true
  try {
    // 你的登录逻辑
    console.log('登录:', data)
  } catch (error) {
    errorMsg.value = '登录失败'
  } finally {
    loading.value = false
  }
}
</script>
```

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `title` | `string` | `'Admin System'` | 登录页标题 |
| `subtitle` | `string` | `'专注后台管理 · 安全高效'` | 登录页副标题 |
| `loading` | `boolean` | `false` | 加载状态 |
| `errorMessage` | `string` | `''` | 错误消息 |
| `modelValue` | `LoginFormData` | `{ username: '', password: '' }` | 表单数据 (v-model) |

#### 事件

| 事件 | 参数 | 说明 |
|-------|-----------|-------------|
| `submit` | `(data: LoginFormData)` | 表单提交时触发 |
| `update:modelValue` | `(data: LoginFormData)` | 表单数据更新 |
| `clearError` | `()` | 清除错误消息 |

#### 插槽

| 插槽 | 说明 |
|------|-------------|
| `logo` | 自定义 Logo |
| `default` | 完全自定义表单 |
| `tips` | 自定义底部提示 |

#### 高级用法 - 自定义表单

```vue
<template>
  <LoginTheme title="自定义登录">
    <!-- 使用 Element Plus 完全自定义表单 -->
    <el-form :model="form" @submit.prevent="handleLogin">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.captcha" placeholder="验证码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </LoginTheme>
</template>
```

---

## 🎨 自定义

### 自定义 Logo

```vue
<template>
  <LoginTheme>
    <template #logo>
      <img src="./logo.png" alt="logo" style="width: 64px; height: 64px;" />
    </template>
  </LoginTheme>
</template>
```

### 自定义提示

```vue
<template>
  <LoginTheme>
    <template #tips>
      <a href="/register">注册账号</a> |
      <a href="/forgot">忘记密码?</a>
    </template>
  </LoginTheme>
</template>
```

---

## 🎯 使用场景

### 404 错误页面

```vue
<template>
  <ThemeBackground>
    <div style="text-align: center; color: white;">
      <h1 style="font-size: 120px;">404</h1>
      <p>页面未找到</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </ThemeBackground>
</template>
```

### 欢迎页面

```vue
<template>
  <ThemeBackground>
    <div class="welcome">
      <h1>欢迎使用我的应用</h1>
      <button @click="start">开始使用</button>
    </div>
  </ThemeBackground>
</template>
```

---

## ⚡ 性能优化

组件会根据设备自动调整性能:
- 移动设备: 减少星星和星云数量
- 高 DPI 屏幕: 优化渲染
- 桌面端: 启用完整效果

进一步优化:

```typescript
// 如需减少视觉元素,可以在构建时调整
// 必要时可编辑 node_modules/@lifeiheng/vue-starfall 源码
```

---

## 🌐 浏览器支持

- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 移动浏览器 (iOS Safari, Chrome Mobile)
- 需要支持 CSS backdrop-filter

---

## 📄 开源协议

Apache License 2.0

Copyright © 2025 李飞恒. All rights reserved.

---

## 🙏 致谢

使用 Vue 3 和 TypeScript,用 ❤️ 构建。

---

## 📞 支持

- 🐛 [反馈问题](https://github.com/vjsplus-j/vue-starfall/issues)
- 💬 [讨论区](https://github.com/vjsplus-j/vue-starfall/discussions)
- 📧 邮箱: your-email@example.com

---

<div align="center">

**Made with ⭐ by 李飞恒**

</div>
