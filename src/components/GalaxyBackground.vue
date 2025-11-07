<template>
  <div class="galaxy-bg">
    <!-- 水印 -->
    <div 
      v-if="showWatermark" 
      class="ai-watermark"
      :class="watermarkPositionClass"
      :style="{ opacity: watermarkOpacity }"
    >
      {{ watermarkText }}
    </div>
    
    <!-- AI网格层（横竖交叉线） -->
    <div v-if="enableDataflow" class="ai-dataflow" />
    
    <div class="space">
      <!-- 根据主题类型渲染不同组件 -->
      <AIBrain 
        v-if="theme === 'ai-brain'"
        :performance="actualPerformance"
        @loaded="handleLoaded"
        @performance-change="handlePerformanceChange"
        @error="handleError"
      />
      <AndromedaGalaxy 
        v-else-if="theme === 'andromeda'"
        :performance="actualPerformance"
        :use-fixed-positions="useFixedPositions"
        :random-seed="randomSeed"
        @loaded="handleLoaded"
        @performance-change="handlePerformanceChange"
        @error="handleError"
      />
      <slot v-else name="custom-theme" />
    </div>
    
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { GalaxyBackgroundProps, ThemeType, PerformanceLevel } from '../types'
import { detectDevicePerformance, getActualPerformanceLevel } from '../utils/performance'
import AIBrain from './AIBrain.vue'
import AndromedaGalaxy from './AndromedaGalaxy.vue'

// Props
const props = withDefaults(defineProps<GalaxyBackgroundProps>(), {
  theme: 'ai-brain',
  showWatermark: true,
  watermarkText: 'GMD AI生成',
  watermarkPosition: 'bottom-left',
  watermarkOpacity: 0.3,
  performance: 'auto',
  autoDetect: true,
  enableDataflow: true,
  useFixedPositions: false,
  randomSeed: 12345
})

// Emits
const emit = defineEmits<{
  loaded: []
  performanceChange: [level: PerformanceLevel]
  themeChange: [theme: ThemeType]
  error: [error: Error]
}>()

// 状态
const actualPerformance = ref<PerformanceLevel>(props.performance)

// 水印位置样式类
const watermarkPositionClass = computed(() => {
  return `watermark-${props.watermarkPosition}`
})

// 初始化
onMounted(() => {
  try {
    // 自动检测性能
    if (props.autoDetect && props.performance === 'auto') {
      const devicePerf = detectDevicePerformance()
      actualPerformance.value = devicePerf.recommendedLevel
      emit('performanceChange', devicePerf.recommendedLevel)
    } else if (props.performance !== 'auto') {
      actualPerformance.value = props.performance
    } else {
      actualPerformance.value = getActualPerformanceLevel(props.performance)
    }
    
    emit('loaded')
  } catch (error) {
    emit('error', error as Error)
  }
})

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  emit('themeChange', newTheme)
})

// 监听性能级别变化
watch(() => props.performance, (newPerf) => {
  if (newPerf === 'auto') {
    const devicePerf = detectDevicePerformance()
    actualPerformance.value = devicePerf.recommendedLevel
  } else {
    actualPerformance.value = newPerf
  }
  emit('performanceChange', actualPerformance.value)
})

// 事件处理
const handleLoaded = () => {
  // 子组件加载完成
}

const handlePerformanceChange = (level: PerformanceLevel) => {
  actualPerformance.value = level
  emit('performanceChange', level)
}

const handleError = (error: Error) => {
  emit('error', error)
}
</script>

<style scoped>
.galaxy-bg {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #000000;
  overflow: hidden;
}

/* 水印 */
.ai-watermark {
  position: absolute;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
  z-index: 9;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: opacity 0.3s;
}

/* 水印位置 */
.watermark-bottom-left {
  left: 20px;
  bottom: 20px;
}

.watermark-bottom-right {
  right: 20px;
  bottom: 20px;
}

.watermark-top-left {
  left: 20px;
  top: 20px;
}

.watermark-top-right {
  right: 20px;
  top: 20px;
}

@media (max-width: 768px) {
  .ai-watermark {
    font-size: 10px;
  }
  
  .watermark-bottom-left {
    left: 12px;
    bottom: 12px;
  }
  
  .watermark-bottom-right {
    right: 12px;
    bottom: 12px;
  }
  
  .watermark-top-left {
    left: 12px;
    top: 12px;
  }
  
  .watermark-top-right {
    right: 12px;
    top: 12px;
  }
}

.content {
  width: auto;
  max-width: 480px;
  position: relative;
  z-index: 10;
  margin-left: auto;
  margin-right: 10%;
}

@media (max-width: 768px) {
  .content {
    width: 100%;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
}

.space {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

/* ========== AI增强效果模块 ========== */

/* AI网格层（横竖交叉线） */
.ai-dataflow {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
      0deg,
      rgba(100, 180, 255, 0.12) 0px,
      rgba(100, 180, 255, 0.12) 1px,
      transparent 1px,
      transparent 40px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(100, 180, 255, 0.12) 0px,
      rgba(100, 180, 255, 0.12) 1px,
      transparent 1px,
      transparent 40px
    );
  pointer-events: none;
  z-index: 9;
  opacity: 1;
  mix-blend-mode: screen;
}

@media (max-width: 768px) {
  .ai-dataflow {
    opacity: 0.4;
    background: repeating-linear-gradient(
        0deg,
        rgba(100, 180, 255, 0.05) 0px,
        rgba(100, 180, 255, 0.05) 1px,
        transparent 1px,
        transparent 50px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(100, 180, 255, 0.05) 0px,
        rgba(100, 180, 255, 0.05) 1px,
        transparent 1px,
        transparent 50px
      );
  }
}

</style>
