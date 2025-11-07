<template>
  <div class="andromeda-galaxy">
    <!-- 星云光晕节点 -->
    <div v-if="enableNebula" class="nebula-nodes" />
    <!-- 星系核心光晕 -->
    <div v-if="enableCoreGlow" class="galaxy-core-glow" />
    <!-- 仙女座星系星星 -->
    <i v-for="(s, i) in stars" :key="i" class="star" :style="s" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AndromedaGalaxyProps, StarStyle, PerformanceLevel } from '../types'
import { getPerformanceConfig, isMobileDevice } from '../utils/performance'

// Props
const props = withDefaults(defineProps<AndromedaGalaxyProps>(), {
  centerX: 32,
  centerY: 50,
  starCount: undefined,
  coreRatio: 0.20,
  armRatio: 0.70,
  animationSpeed: 1,
  enableCoreGlow: true,
  enableNebula: true,
  performance: 'auto'
})

// Emits
const emit = defineEmits<{
  loaded: []
  performanceChange: [level: PerformanceLevel]
  error: [error: Error]
}>()

const stars = ref<StarStyle[]>([])

const rand = (min: number, max: number): string => (Math.random() * (max - min) + min).toFixed(2)

// 根据性能配置计算实际数量
const actualStarCount = computed(() => {
  if (props.starCount !== undefined) return props.starCount
  const config = getPerformanceConfig(props.performance)
  // AndromedaGalaxy 默认使用更多星星
  return Math.floor(config.starCount * 1.5)
})

onMounted(() => {
  try {
    const isMobile = isMobileDevice()
    const starCount: number = isMobile ? Math.floor(actualStarCount.value / 2) : actualStarCount.value
  const centerX: number = props.centerX
  const centerY: number = props.centerY

  stars.value = Array.from({ length: starCount }, (): StarStyle => {
    // 仙女座星系参数 - 三层结构
    const isCore: boolean = Math.random() < props.coreRatio // 核心区
    const isArm: boolean = Math.random() < props.armRatio // 旋臂

    let left: number
    let top: number
    let depth: number

    if (isCore) {
      // 核心区域：密集且明亮
      const coreRadius: number = Math.random() * 10
      const coreAngle: number = Math.random() * Math.PI * 2
      left = centerX + Math.cos(coreAngle) * coreRadius
      top = centerY + Math.sin(coreAngle) * coreRadius * 0.6 // 椭圆形
      depth = 0.85 + Math.random() * 0.15 // 核心星星非常亮
    } else if (isArm) {
      // 螺旋臂：多条主旋臂
      const armIndex: number = Math.floor(Math.random() * 8)
      const distance: number = 15 + Math.random() * 45 // 距离中心
      const spiralTightness: number = 0.75 // 螺旋紧密度
      const angle: number = (distance * spiralTightness + armIndex * Math.PI) + (Math.random() - 0.5) * 0.8

      left = centerX + Math.cos(angle) * distance
      top = centerY + Math.sin(angle) * distance * 0.6 // 椭圆形
      depth = 0.4 + Math.random() * 0.4
    } else {
      // 外围稀疏区域
      const outerDistance: number = 25 + Math.random() * 50
      const outerAngle: number = Math.random() * Math.PI * 2
      left = centerX + Math.cos(outerAngle) * outerDistance
      top = centerY + Math.sin(outerAngle) * outerDistance * 0.6
      depth = 0.2 + Math.random() * 0.3
    }

    // 确保在视野范围内
    left = Math.max(-5, Math.min(99, left))
    top = Math.max(0, Math.min(95, top))

    const size: string = `${(1.2 + depth * 2.5).toFixed(2)}px`
    const delay: string = `${rand(0, 4)}s`
    const dur: string = `${((5 - depth * 2.5) / props.animationSpeed).toFixed(2)}s`
    const glow: string = (0.4 + depth * 0.8).toFixed(2)
    const blur: string = `${(isMobile ? 0.8 : 0.5 - depth * 0.3).toFixed(2)}px`

    return {
      '--sx': `${left}%`,
      '--sy': `${top}%`,
      '--ss': size,
      '--sdel': delay,
      '--sdur': dur,
      '--sglow': glow,
      '--sblur': blur
    }
  })
  
  emit('loaded')
  } catch (error) {
    emit('error', error as Error)
  }
})
</script>

<style scoped>
.andromeda-galaxy {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  transform: rotate(-15deg); /* 仙女座星系的真实倾斜角度 */
  transform-origin: center center;
}

.star {
  position: absolute;
  left: var(--sx);
  top: var(--sy);
  width: var(--ss);
  height: var(--ss);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(220, 240, 255, 0.05) 70%);
  border-radius: 50%;
  filter: blur(var(--sblur));
  animation: twinkle var(--sdur) ease-in-out infinite;
  animation-delay: var(--sdel);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px rgba(100, 200, 255, var(--sglow)),
    0 0 10px rgba(120, 210, 255, calc(var(--sglow) * 0.7));
  opacity: 0.9;
}

/* 紫色星星 */
.star:nth-child(3n) {
  box-shadow: 0 0 6px rgba(171, 71, 188, var(--sglow)),
    0 0 10px rgba(124, 77, 255, calc(var(--sglow) * 0.7)),
    0 0 12px rgba(171, 71, 188, calc(var(--sglow) * 0.4));
}

/* 绿色星星 */
.star:nth-child(5n) {
  box-shadow: 0 0 6px rgba(102, 187, 106, var(--sglow)),
    0 0 10px rgba(120, 255, 180, calc(var(--sglow) * 0.7)),
    0 0 12px rgba(102, 187, 106, calc(var(--sglow) * 0.4));
}

/* 红色星星 */
.star:nth-child(7n) {
  box-shadow: 0 0 6px rgba(239, 83, 80, var(--sglow)),
    0 0 10px rgba(255, 120, 120, calc(var(--sglow) * 0.7)),
    0 0 12px rgba(239, 83, 80, calc(var(--sglow) * 0.4));
}

/* 橙色星星 */
.star:nth-child(11n) {
  box-shadow: 0 0 6px rgba(255, 152, 0, var(--sglow)),
    0 0 10px rgba(255, 193, 7, calc(var(--sglow) * 0.7)),
    0 0 12px rgba(255, 152, 0, calc(var(--sglow) * 0.4));
}

@keyframes twinkle {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}

/* 星系核心光晕 */
.galaxy-core-glow {
  position: absolute;
  width: 25vmax;
  height: 28vmax;
  left: 32%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse 80% 100% at 30% 50%,
    rgba(255, 255, 255, 0.30) 0%,
    rgba(255, 255, 245, 0.20) 20%,
    rgba(255, 250, 230, 0.12) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(45px);
  mix-blend-mode: screen;
  z-index: 0;
  animation: pulse 7s ease-in-out infinite reverse;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.08);
  }
}

/* 星云光晕节点 */
.nebula-nodes {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 25% 35%,
      rgba(100, 220, 255, 0.25) 0%,
      rgba(100, 220, 255, 0.15) 15%,
      transparent 30%
    ),
    radial-gradient(
      circle at 75% 25%,
      rgba(120, 180, 255, 0.20) 0%,
      rgba(120, 180, 255, 0.12) 12%,
      transparent 25%
    ),
    radial-gradient(
      circle at 60% 70%,
      rgba(80, 200, 255, 0.18) 0%,
      rgba(80, 200, 255, 0.10) 15%,
      transparent 28%
    ),
    radial-gradient(
      circle at 15% 75%,
      rgba(140, 160, 255, 0.15) 0%,
      rgba(140, 160, 255, 0.08) 10%,
      transparent 22%
    ),
    radial-gradient(
      circle at 85% 65%,
      rgba(90, 210, 255, 0.16) 0%,
      rgba(90, 210, 255, 0.08) 13%,
      transparent 26%
    );
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: screen;
  animation: nebula-pulse 8s ease-in-out infinite alternate;
}

@keyframes nebula-pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.85;
  }
}

@media (max-width: 768px) {
  .star {
    filter: blur(1px);
  }
  
  .galaxy-core-glow {
    left: 50%;
    width: 25vmax;
    height: 25vmax;
  }
  
  .nebula-nodes {
    opacity: 0.5;
    background: radial-gradient(
        circle at 30% 40%,
        rgba(100, 220, 255, 0.12) 0%,
        rgba(100, 220, 255, 0.06) 15%,
        transparent 30%
      ),
      radial-gradient(
        circle at 70% 30%,
        rgba(120, 180, 255, 0.10) 0%,
        rgba(120, 180, 255, 0.05) 12%,
        transparent 25%
      ),
      radial-gradient(
        circle at 50% 70%,
        rgba(80, 200, 255, 0.08) 0%,
        rgba(80, 200, 255, 0.04) 15%,
        transparent 28%
      );
  }
}
</style>
