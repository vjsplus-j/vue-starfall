<!--
  Vue Starfall - Custom Login Example
  使用Element Plus完全自定义登录表单
  @author 李飞恒
  @copyright Copyright © 2025 李飞恒. All rights reserved.
-->
<template>
  <LoginTheme title="自定义登录" subtitle="使用Element Plus">
    <!-- 自定义Logo -->
    <template #logo>
      <img src="./logo.png" alt="logo" style="width: 64px; height: 64px;" />
    </template>

    <!-- 自定义表单 -->
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          size="large"
          placeholder="用户名"
          :prefix-icon="User"
        />
      </el-form-item>
      
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          size="large"
          type="password"
          placeholder="密码"
          show-password
          :prefix-icon="Lock"
        />
      </el-form-item>
      
      <el-form-item prop="captcha">
        <div style="display: flex; gap: 12px;">
          <el-input
            v-model="form.captcha"
            size="large"
            placeholder="验证码"
            style="flex: 1;"
          />
          <img
            :src="captchaImage"
            alt="captcha"
            @click="refreshCaptcha"
            style="height: 40px; cursor: pointer; border-radius: 8px;"
          />
        </div>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          style="width: 100%;"
          @click="handleSubmit"
          :loading="loading"
        >
          {{ loading ? '登录中...' : '登 录' }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 自定义底部提示 -->
    <template #tips>
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <a href="/register" style="color: rgba(255,255,255,.8);">注册账号</a>
        <a href="/forgot" style="color: rgba(255,255,255,.8);">忘记密码?</a>
      </div>
    </template>
  </LoginTheme>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { LoginTheme } from '@lifeiheng/vue-starfall'
import '@lifeiheng/vue-starfall/dist/style.css'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const loading = ref(false)
const formRef = ref()
const captchaImage = ref('data:image/png;base64,...') // 验证码图片

const form = reactive({
  username: '',
  password: '',
  captcha: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}

const refreshCaptcha = () => {
  // 刷新验证码逻辑
  console.log('刷新验证码')
}

const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  try {
    // 登录逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('登录成功')
  } catch (error) {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>
