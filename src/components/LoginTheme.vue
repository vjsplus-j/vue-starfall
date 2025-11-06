<!--
  Vue Starfall - LoginTheme Component
  @author 李飞恒
  @copyright Copyright © 2025 李飞恒. All rights reserved.
  @license Apache-2.0
-->
<template>
  <ThemeBackground>
    <div class="glass-card">
      <!-- 品牌区域 -->
      <div class="brand">
        <slot name="logo">
          <svg viewBox="0 0 64 64" class="logo">
            <defs>
              <linearGradient id="starfall-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6ea8fe"/>
                <stop offset="100%" stop-color="#7c4dff"/>
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="28" fill="url(#starfall-gradient)" opacity="0.25" />
            <path d="M18 40 L32 16 L46 40 Z" fill="url(#starfall-gradient)"/>
          </svg>
        </slot>
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="error-message">
        <span>{{ errorMessage }}</span>
        <button @click="$emit('clearError')" class="error-close">×</button>
      </div>

      <!-- 表单区域 - 使用默认插槽完全自定义 -->
      <slot>
        <!-- 默认表单实现 -->
        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-item">
            <input
              v-model="localForm.username"
              type="text"
              placeholder="用户名"
              class="form-input"
              :disabled="loading"
            />
          </div>
          <div class="form-item">
            <input
              v-model="localForm.password"
              type="password"
              placeholder="密码"
              class="form-input"
              :disabled="loading"
              @keyup.enter="handleSubmit"
            />
          </div>
          <div class="form-item">
            <button
              type="submit"
              class="submit-button"
              :disabled="!localForm.username || !localForm.password || loading"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </button>
          </div>
          <div class="tips">
            <slot name="tips">
              <span>没有账号？请联系管理员开通</span>
            </slot>
          </div>
        </form>
      </slot>
    </div>
  </ThemeBackground>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import ThemeBackground from './ThemeBackground.vue'

export interface LoginFormData {
  username: string
  password: string
  [key: string]: any
}

interface Props {
  title?: string
  subtitle?: string
  loading?: boolean
  errorMessage?: string
  modelValue?: LoginFormData
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Admin System',
  subtitle: '专注后台管理 · 安全高效',
  loading: false,
  errorMessage: '',
  modelValue: () => ({ username: '', password: '' })
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: LoginFormData): void
  (e: 'submit', value: LoginFormData): void
  (e: 'clearError'): void
}>()

const localForm = reactive<LoginFormData>({
  username: props.modelValue?.username || '',
  password: props.modelValue?.password || ''
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    localForm.username = newVal.username || ''
    localForm.password = newVal.password || ''
  }
}, { deep: true })

watch(localForm, (newVal) => {
  emit('update:modelValue', { ...newVal })
})

const handleSubmit = () => {
  if (!localForm.username || !localForm.password || props.loading) return
  emit('submit', { ...localForm })
}
</script>

<style scoped>
.glass-card {
  width: min(92vw, 420px);
  padding: 28px 28px 22px;
  border-radius: 16px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 8px 40px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06);
  backdrop-filter: blur(14px) saturate(160%);
  color: #fff;
  animation: card-in 0.8s ease-out;
}

@keyframes card-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: rgba(245, 108, 108, 0.1);
  border: 1px solid rgba(245, 108, 108, 0.3);
  border-radius: 8px;
  color: #fab1a0;
  font-size: 14px;
}

.error-close {
  background: none;
  border: none;
  color: #fab1a0;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.2s;
}

.error-close:hover {
  color: white;
}

.brand {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  width: 56px;
  height: 56px;
}

.title {
  margin: 16px 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.subtitle {
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,.65);
}

.form {
  margin-top: 16px;
}

.form-item {
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.15);
  background: rgba(255,255,255,.9);
  font-size: 14px;
  color: #333;
  outline: none;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #7c4dff;
  box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input::placeholder {
  color: rgba(0,0,0,.4);
}

.submit-button {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #7c4dff 0%, #6ea8fe 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(124, 77, 255, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tips {
  margin-top: 8px;
  text-align: center;
  color: rgba(255,255,255,.6);
  font-size: 12px;
}
</style>
