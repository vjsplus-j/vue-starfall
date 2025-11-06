# 🎯 Vue Starfall 使用指南

> **作者**: 李飞恒  
> **版权**: Copyright © 2025 李飞恒. All rights reserved.

---

## 📦 安装

在你的 Vue 3 项目中安装:

```bash
npm install @vjsplus-j/vue-starfall
# 或
yarn add @vjsplus-j/vue-starfall
# 或
pnpm add @vjsplus-j/vue-starfall
```

---

## 🚀 快速开始

### 方式一: 全局注册 (推荐)

```typescript
// main.ts
import { createApp } from 'vue'
import VueStarfall from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueStarfall)
app.mount('#app')
```

然后在任何组件中直接使用:

```vue
<template>
  <ThemeBackground>
    <h1>欢迎</h1>
  </ThemeBackground>
</template>
```

### 方式二: 按需引入

```vue
<script setup lang="ts">
import { ThemeBackground } from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'
</script>

<template>
  <ThemeBackground>
    <h1>欢迎</h1>
  </ThemeBackground>
</template>
```

---

## 📖 组件详解

### 1. ThemeBackground - 星空背景

提供精美的星空主题背景。

#### 基础用法

```vue
<template>
  <ThemeBackground>
    <!-- 你的内容 -->
    <div class="content">
      <h1>欢迎使用 Vue Starfall</h1>
      <p>这是一个星空主题背景</p>
    </div>
  </ThemeBackground>
</template>

<style scoped>
.content {
  text-align: center;
  color: white;
}
</style>
```

#### 特性

- 🌟 自动闪烁的星星 (480个 桌面端, 240个 移动端)
- 🌈 多彩旋转星云 (7个 桌面端, 5个 移动端)
- 🪐 柔和的行星光晕 (3个 桌面端, 2个 移动端)
- 🌌 银河带效果
- 📱 自动性能优化

---

### 2. LoginTheme - 登录主题

完整的登录页面主题,带毛玻璃效果。

#### 基础用法

```vue
<template>
  <LoginTheme
    title="我的应用"
    subtitle="欢迎登录"
    :loading="loading"
    :error-message="errorMsg"
    v-model="formData"
    @submit="handleLogin"
    @clear-error="clearError"
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
  errorMsg.value = ''
  
  try {
    // 调用你的登录 API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      // 登录成功
      window.location.href = '/home'
    } else {
      errorMsg.value = '用户名或密码错误'
    }
  } catch (error) {
    errorMsg.value = '登录失败,请稍后重试'
  } finally {
    loading.value = false
  }
}

const clearError = () => {
  errorMsg.value = ''
}
</script>
```

#### Props 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `'Admin System'` | 标题 |
| `subtitle` | `string` | `'专注后台管理 · 安全高效'` | 副标题 |
| `loading` | `boolean` | `false` | 加载状态 |
| `errorMessage` | `string` | `''` | 错误消息 |
| `modelValue` | `LoginFormData` | `{ username: '', password: '' }` | 表单数据 |

#### Events 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `submit` | `(data: LoginFormData)` | 提交表单 |
| `update:modelValue` | `(data: LoginFormData)` | 更新表单数据 |
| `clearError` | `()` | 清除错误 |

#### Slots 插槽

| 插槽 | 说明 |
|------|------|
| `logo` | 自定义 Logo |
| `default` | 自定义整个表单区域 |
| `tips` | 自定义底部提示 |

---

## 🎨 高级用法

### 自定义 Logo

```vue
<template>
  <LoginTheme>
    <template #logo>
      <img src="@/assets/logo.png" style="width: 64px; height: 64px;" />
    </template>
  </LoginTheme>
</template>
```

### 自定义表单 (使用 Element Plus)

```vue
<template>
  <LoginTheme title="自定义登录">
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
        <el-button type="primary" native-type="submit" style="width: 100%;">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </LoginTheme>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: '',
  captcha: ''
})

const handleLogin = () => {
  console.log('登录:', form)
}
</script>
```

### 自定义底部提示

```vue
<template>
  <LoginTheme>
    <template #tips>
      <div style="display: flex; justify-content: space-between;">
        <router-link to="/register">注册账号</router-link>
        <router-link to="/forgot-password">忘记密码?</router-link>
      </div>
    </template>
  </LoginTheme>
</template>
```

---

## 🎯 实战场景

### 场景 1: 404 页面

```vue
<template>
  <ThemeBackground>
    <div class="error-404">
      <h1>404</h1>
      <p>页面未找到</p>
      <router-link to="/" class="btn">返回首页</router-link>
    </div>
  </ThemeBackground>
</template>

<style scoped>
.error-404 {
  text-align: center;
  color: white;
}
.error-404 h1 {
  font-size: 120px;
  margin: 0;
}
.btn {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #7c4dff, #6ea8fe);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 24px;
}
</style>
```

### 场景 2: 欢迎页

```vue
<template>
  <ThemeBackground>
    <div class="welcome">
      <h1>欢迎使用我的应用</h1>
      <p>开始你的精彩旅程</p>
      <button @click="start" class="start-btn">立即开始</button>
    </div>
  </ThemeBackground>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const start = () => {
  router.push('/login')
}
</script>

<style scoped>
.welcome {
  text-align: center;
  color: white;
}
.start-btn {
  padding: 16px 48px;
  font-size: 18px;
  background: linear-gradient(135deg, #7c4dff, #6ea8fe);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s;
}
.start-btn:hover {
  transform: translateY(-2px);
}
</style>
```

### 场景 3: 维护页面

```vue
<template>
  <ThemeBackground>
    <div class="maintenance">
      <h1>🔧 系统维护中</h1>
      <p>我们正在进行系统升级,预计 2 小时后恢复</p>
      <p class="time">{{ currentTime }}</p>
    </div>
  </ThemeBackground>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let timer: number

const updateTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN')
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.maintenance {
  text-align: center;
  color: white;
}
.time {
  font-family: monospace;
  font-size: 24px;
  margin-top: 32px;
}
</style>
```

---

## 💡 提示与技巧

### 1. 性能优化

组件已内置自动性能优化:
- 移动设备自动减少星星和星云数量
- 高DPI屏幕优化渲染
- 使用 CSS 硬件加速

### 2. 主题自定义

如需自定义颜色,可以覆盖 CSS 变量:

```css
:root {
  --starfall-primary: #your-color;
  --starfall-secondary: #your-color;
}
```

### 3. 与路由集成

```typescript
// router/index.ts
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { layout: 'blank' } // 不使用默认布局
  }
]
```

---

## 🌐 浏览器兼容性

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ iOS Safari 14+
- ✅ Chrome Android 88+

需要 CSS `backdrop-filter` 支持。

---

## 📞 获取帮助

- 📖 [完整文档](https://github.com/vjsplus-j/vue-starfall)
- 🐛 [反馈问题](https://github.com/vjsplus-j/vue-starfall/issues)
- 💬 [讨论区](https://github.com/vjsplus-j/vue-starfall/discussions)

---

**Made with ⭐ by 李飞恒**
