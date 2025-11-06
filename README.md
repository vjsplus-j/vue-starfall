# Vue Starfall 🌌

<div align="center">

**Vue3 星空主题组件库 - 让你的应用璀璨如星河**

[![npm version](https://img.shields.io/npm/v/@lifeiheng/vue-starfall.svg)](https://www.npmjs.com/package/@lifeiheng/vue-starfall)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)

[English](./README.md) | [中文文档](./README.zh-CN.md)

</div>

---

## ✨ Features

- 🌌 **Stunning Starry Background** - Realistic starry sky with stars, nebulae, planets, and Milky Way
- 🎨 **Glass Morphism Design** - Modern glassmorphism card effect
- 📱 **Responsive** - Auto-adapts for mobile and desktop devices
- ⚡ **Performance Optimized** - Smart performance adjustment based on device capabilities
- 🎭 **Smooth Animations** - Elegant transitions and interactions
- 🔧 **Highly Customizable** - Flexible slots and props for full control
- 💪 **TypeScript Support** - Complete type definitions
- 🎯 **Zero Configuration** - Works out of the box

---

## 📦 Installation

```bash
# npm
npm install @lifeiheng/vue-starfall

# yarn
yarn add @lifeiheng/vue-starfall

# pnpm
pnpm add @lifeiheng/vue-starfall
```

---

## 🚀 Quick Start

### Global Registration

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

### Component Registration

```vue
<script setup lang="ts">
import { ThemeBackground, LoginTheme } from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'
</script>
```

---

## 📖 Components

### ThemeBackground

Starry sky background component - provides a stunning cosmic background effect.

#### Basic Usage

```vue
<template>
  <ThemeBackground>
    <h1>Your Content</h1>
  </ThemeBackground>
</template>

<script setup lang="ts">
import { ThemeBackground } from '@lifeiheng/vue-starfall'
</script>
```

#### Features

- ⭐ Twinkling stars with depth perception
- 🌈 Colorful nebulae with rotation
- 🪐 Soft planet glows
- 🌌 Milky Way band effect
- 📱 Auto-degrades on mobile devices

---

### LoginTheme

Complete login page theme with glassmorphism design.

#### Basic Usage

```vue
<template>
  <LoginTheme
    title="My App"
    subtitle="Welcome Back"
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
    // Your login logic
    console.log('Login:', data)
  } catch (error) {
    errorMsg.value = 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Admin System'` | Login page title |
| `subtitle` | `string` | `'专注后台管理 · 安全高效'` | Login page subtitle |
| `loading` | `boolean` | `false` | Loading state |
| `errorMessage` | `string` | `''` | Error message |
| `modelValue` | `LoginFormData` | `{ username: '', password: '' }` | Form data (v-model) |

#### Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `submit` | `(data: LoginFormData)` | Triggered on form submit |
| `update:modelValue` | `(data: LoginFormData)` | Form data update |
| `clearError` | `()` | Clear error message |

#### Slots

| Slot | Description |
|------|-------------|
| `logo` | Custom logo |
| `default` | Complete form customization |
| `tips` | Custom footer tips |

#### Advanced Usage - Custom Form

```vue
<template>
  <LoginTheme title="Custom Login">
    <!-- Fully custom form using Element Plus -->
    <el-form :model="form" @submit.prevent="handleLogin">
      <el-form-item>
        <el-input v-model="form.username" placeholder="Username" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="Password" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.captcha" placeholder="Captcha" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Login</el-button>
      </el-form-item>
    </el-form>
  </LoginTheme>
</template>
```

---

## 🎨 Customization

### Custom Logo

```vue
<template>
  <LoginTheme>
    <template #logo>
      <img src="./logo.png" alt="logo" style="width: 64px; height: 64px;" />
    </template>
  </LoginTheme>
</template>
```

### Custom Tips

```vue
<template>
  <LoginTheme>
    <template #tips>
      <a href="/register">Create Account</a> |
      <a href="/forgot">Forgot Password?</a>
    </template>
  </LoginTheme>
</template>
```

---

## 🎯 Use Cases

### 404 Error Page

```vue
<template>
  <ThemeBackground>
    <div style="text-align: center; color: white;">
      <h1 style="font-size: 120px;">404</h1>
      <p>Page Not Found</p>
      <router-link to="/">Go Home</router-link>
    </div>
  </ThemeBackground>
</template>
```

### Welcome Page

```vue
<template>
  <ThemeBackground>
    <div class="welcome">
      <h1>Welcome to My App</h1>
      <button @click="start">Get Started</button>
    </div>
  </ThemeBackground>
</template>
```

---

## ⚡ Performance Tips

The components automatically adjust performance based on device:
- Mobile devices: Fewer stars and nebulae
- High DPI screens: Optimized rendering
- Desktop: Full effects enabled

To further optimize:

```typescript
// Reduce visual elements in your build
// Edit node_modules/@lifeiheng/vue-starfall source if needed
```

---

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires CSS backdrop-filter support

---

## 📄 License

Apache License 2.0

Copyright © 2025 李飞恒. All rights reserved.

---

## 🙏 Acknowledgments

Built with ❤️ using Vue 3 and TypeScript.

---

## 📞 Support

- 🐛 [Report Issues](https://github.com/vjsplus-j/vue-starfall/issues)
- 💬 [Discussions](https://github.com/vjsplus-j/vue-starfall/discussions)
- 📧 Email: your-email@example.com

---

<div align="center">

**Made with ⭐ by 李飞恒**

</div>
