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
  performance: 'auto',
  useFixedPositions: false,
  randomSeed: 12345
})

// Emits
const emit = defineEmits<{
  loaded: []
  performanceChange: [level: PerformanceLevel]
  error: [error: Error]
}>()

const stars = ref<StarStyle[]>([])

// 固定随机数生成器（使用种子）
let seedValue = props.randomSeed
const seededRandom = (): number => {
  seedValue = (seedValue * 9301 + 49297) % 233280
  return seedValue / 233280
}

// 随机数函数（根据useFixedPositions选择）
const getRandom = (): number => {
  return props.useFixedPositions ? seededRandom() : Math.random()
}

const rand = (min: number, max: number): string => (getRandom() * (max - min) + min).toFixed(2)

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
    const isCore: boolean = getRandom() < props.coreRatio // 核心区
    const isArm: boolean = getRandom() < props.armRatio // 旋臂

    let left: number
    let top: number
    let depth: number

    if (isCore) {
      // 核心区域：密集且明亮
      const coreRadius: number = getRandom() * 10
      const coreAngle: number = getRandom() * Math.PI * 2
      left = centerX + Math.cos(coreAngle) * coreRadius
      top = centerY + Math.sin(coreAngle) * coreRadius * 0.6 // 椭圆形
      depth = 0.85 + getRandom() * 0.15 // 核心星星非常亮
    } else if (isArm) {
      // 螺旋臂：多条主旋臂
      const armIndex: number = Math.floor(getRandom() * 8)
      const distance: number = 15 + getRandom() * 45 // 距离中心
      const spiralTightness: number = 0.75 // 螺旋紧密度
      const angle: number = (distance * spiralTightness + armIndex * Math.PI) + (getRandom() - 0.5) * 0.8

      left = centerX + Math.cos(angle) * distance
      top = centerY + Math.sin(angle) * distance * 0.6 // 椭圆形
      depth = 0.4 + getRandom() * 0.4
    } else {
      // 外围稀疏区域
      const outerDistance: number = 25 + getRandom() * 50
      const outerAngle: number = getRandom() * Math.PI * 2
      left = centerX + Math.cos(outerAngle) * outerDistance
      top = centerY + Math.sin(outerAngle) * outerDistance * 0.6
      depth = 0.2 + getRandom() * 0.3
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

/* 星系核心光晕 - 高对比度真实仙女座 */
.galaxy-core-glow {
  position: absolute;
  width: 45vmax;
  height: 22vmax;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: 
    /* 超亮核心 - 白色 */
    radial-gradient(
      ellipse 8% 12% at 50% 50%,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.95) 20%,
      rgba(255, 255, 250, 0.85) 40%,
      transparent 60%
    ),
    /* 强烈的黄色层 */
    radial-gradient(
      ellipse 15% 22% at 50% 50%,
      rgba(255, 245, 200, 0.9) 0%,
      rgba(255, 230, 180, 0.75) 30%,
      rgba(255, 215, 150, 0.5) 60%,
      transparent 80%
    ),
    /* 橙色过渡 */
    radial-gradient(
      ellipse 25% 35% at 50% 50%,
      rgba(255, 180, 120, 0.7) 0%,
      rgba(255, 150, 100, 0.55) 30%,
      rgba(255, 130, 80, 0.35) 60%,
      transparent 85%
    ),
    /* 粉橙色 */
    radial-gradient(
      ellipse 35% 50% at 50% 50%,
      rgba(255, 140, 140, 0.6) 0%,
      rgba(255, 120, 150, 0.45) 30%,
      rgba(240, 100, 160, 0.3) 60%,
      transparent 90%
    ),
    /* 紫粉色螺旋臂 */
    radial-gradient(
      ellipse 50% 70% at 50% 50%,
      rgba(220, 140, 255, 0.55) 0%,
      rgba(200, 120, 255, 0.4) 25%,
      rgba(180, 100, 240, 0.28) 50%,
      rgba(160, 80, 220, 0.15) 75%,
      transparent 95%
    ),
    /* 外围深紫蓝 */
    radial-gradient(
      ellipse 70% 90% at 50% 50%,
      rgba(140, 100, 220, 0.35) 0%,
      rgba(120, 80, 200, 0.22) 40%,
      rgba(100, 60, 180, 0.12) 70%,
      transparent 100%
    );
  filter: blur(20px);
  mix-blend-mode: screen;
  z-index: 2;
  animation: galaxy-pulse 6s ease-in-out infinite;
}

@keyframes galaxy-pulse {
  0%, 100% {
    opacity: 0.85;
    filter: blur(20px) brightness(1);
  }
  50% {
    opacity: 1;
    filter: blur(18px) brightness(1.15);
  }
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

/* 星云光晕节点 - 增强的螺旋臂 */
.nebula-nodes {
  position: absolute;
  inset: 0;
  background: 
    /* 主螺旋臂1 - 明亮紫粉色 */
    radial-gradient(
      ellipse 45% 18% at 18% 48%,
      rgba(240, 180, 255, 0.65) 0%,
      rgba(220, 160, 255, 0.5) 25%,
      rgba(200, 140, 255, 0.35) 50%,
      rgba(180, 120, 240, 0.18) 75%,
      transparent 100%
    ),
    /* 主螺旋臂2 - 明亮粉紫色 */
    radial-gradient(
      ellipse 40% 15% at 22% 52%,
      rgba(255, 160, 220, 0.6) 0%,
      rgba(240, 140, 240, 0.45) 25%,
      rgba(220, 120, 255, 0.3) 50%,
      rgba(200, 100, 240, 0.15) 75%,
      transparent 100%
    ),
    /* 星尘密集区1 */
    radial-gradient(
      circle at 17% 40%,
      rgba(220, 160, 255, 0.45) 0%,
      rgba(200, 140, 255, 0.3) 15%,
      rgba(180, 120, 240, 0.15) 30%,
      transparent 50%
    ),
    /* 星尘密集区2 */
    radial-gradient(
      circle at 23% 60%,
      rgba(240, 150, 255, 0.4) 0%,
      rgba(220, 130, 255, 0.25) 15%,
      rgba(200, 110, 240, 0.12) 30%,
      transparent 50%
    ),
    /* 次级螺旋臂 */
    radial-gradient(
      ellipse 30% 10% at 12% 55%,
      rgba(200, 140, 255, 0.35) 0%,
      rgba(180, 120, 240, 0.2) 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse 28% 10% at 28% 45%,
      rgba(220, 150, 255, 0.3) 0%,
      rgba(200, 130, 240, 0.18) 40%,
      transparent 80%
    ),
    /* 外围光晕增强 */
    radial-gradient(
      ellipse 60% 40% at 20% 50%,
      rgba(160, 120, 255, 0.25) 0%,
      rgba(140, 100, 240, 0.15) 40%,
      rgba(120, 80, 220, 0.08) 70%,
      transparent 100%
    );
  pointer-events: none;
  z-index: 3;
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
