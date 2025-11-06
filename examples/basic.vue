<!--
  Vue Starfall - Basic Usage Example
  @author 李飞恒
  @copyright Copyright © 2025 李飞恒. All rights reserved.
-->
<template>
  <div>
    <!-- 示例1: 仅使用星空背景 -->
    <ThemeBackground>
      <div style="text-align: center; color: white;">
        <h1 style="font-size: 48px;">欢迎</h1>
        <p>这是一个星空主题背景示例</p>
      </div>
    </ThemeBackground>

    <!-- 示例2: 使用完整登录主题 -->
    <LoginTheme
      title="我的应用"
      subtitle="欢迎回来"
      :loading="loading"
      :error-message="errorMsg"
      v-model="formData"
      @submit="handleLogin"
      @clear-error="errorMsg = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThemeBackground, LoginTheme, type LoginFormData } from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'

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
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (data.username === 'admin' && data.password === 'admin') {
      console.log('登录成功:', data)
      // 跳转到主页
    } else {
      errorMsg.value = '用户名或密码错误'
    }
  } catch (error) {
    errorMsg.value = '登录失败,请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>
