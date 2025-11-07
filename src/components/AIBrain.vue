<template>
  <div class="ai-brain">
    <!-- 星空背景 -->
    <div class="starfield">
      <div
        v-for="(star, index) in stars"
        :key="`star-${index}`"
        class="star"
        :style="{
          left: star.x + '%',
          top: star.y + '%',
          width: star.size + 'px',
          height: star.size + 'px',
          '--star-delay': star.delay,
          '--star-duration': star.duration,
          opacity: star.opacity
        }"
      ></div>
    </div>

    <!-- 大脑主体容器 -->
    <div class="brain-container">
      <!-- HUD 圆环系统 - 粒子版本 -->
      <div class="hud-rings">
        <!-- 最外圆环粒子（新增） -->
        <div
          v-for="i in 150"
          :key="`ring-outermost-${i}`"
          class="ring-particle ring-outermost-particle"
          :style="{
            '--angle': (i * 2.4) + 'deg',
            '--radius': '340px',
            '--delay': (i * 0.015) + 's'
          }"
        ></div>
        
        <!-- 外圆环粒子 -->
        <div
          v-for="i in 120"
          :key="`ring-outer-${i}`"
          class="ring-particle ring-outer-particle"
          :style="{
            '--angle': (i * 3) + 'deg',
            '--radius': '280px',
            '--delay': (i * 0.02) + 's'
          }"
        ></div>
        
        <!-- 中圆环粒子 -->
        <div
          v-for="i in 90"
          :key="`ring-middle-${i}`"
          class="ring-particle ring-middle-particle"
          :style="{
            '--angle': (i * 4) + 'deg',
            '--radius': '220px',
            '--delay': (i * 0.025) + 's'
          }"
        ></div>
        
        <!-- 刻度标记粒子（外圆） -->
        <div
          v-for="i in 36"
          :key="`tick-outer-${i}`"
          class="tick-particle tick-outer"
          :style="{
            '--angle': (i * 10) + 'deg',
            '--radius': '280px'
          }"
        ></div>
        
        <!-- 刻度标记粒子（中圆） -->
        <div
          v-for="i in 24"
          :key="`tick-middle-${i}`"
          class="tick-particle tick-middle"
          :style="{
            '--angle': (i * 15) + 'deg',
            '--radius': '220px'
          }"
        ></div>
        
        <!-- 数据点 -->
        <div v-for="i in 8" :key="`data-point-${i}`" 
             class="data-point"
             :style="{
               '--angle': (i * 45) + 'deg',
               '--radius': '220px',
               '--delay': (i * 0.3) + 's'
             }">
        </div>
      </div>
      
      <!-- 外围光晕 -->
      <div class="brain-glow"></div>
      
      <!-- 大脑图片 -->
      <div class="brain-image"></div>
      
      <!-- 中央神经脉冲 -->
      <div class="neural-pulse"></div>
      
      <!-- 环绕粒子 -->
      <div
        v-if="enableOrbit"
        v-for="(particle, index) in orbitParticles"
        :key="`orbit-${index}`"
        class="orbit-particle"
        :style="{
          '--orbit-radius': particle.radius + 'px',
          '--orbit-duration': particle.duration,
          '--orbit-delay': particle.delay,
          '--particle-color': particle.color,
          '--start-angle': particle.startAngle + 'deg',
          '--particle-size': particle.size + 'px',
          '--particle-opacity': particle.opacity
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AIBrainProps, Star, OrbitParticle, PerformanceLevel } from '../types'
import { getPerformanceConfig, isMobileDevice } from '../utils/performance'

// Props
const props = withDefaults(defineProps<AIBrainProps>(), {
  starCount: undefined,
  particleCount: undefined,
  animationSpeed: 1,
  enableOrbit: true,
  enableNebula: true,
  enableNeuralNetwork: true,
  performance: 'auto'
})

// Emits
const emit = defineEmits<{
  loaded: []
  performanceChange: [level: PerformanceLevel]
  error: [error: Error]
}>()

// 状态
const stars = ref<Star[]>([])
const orbitParticles = ref<OrbitParticle[]>([])
const neuralLines = ref<Array<{x1: number, y1: number, x2: number, y2: number, delay: string, duration: string}>>([])

// 根据性能配置计算实际数量
const actualStarCount = computed(() => {
  if (props.starCount !== undefined) return props.starCount
  const config = getPerformanceConfig(props.performance)
  const isMobile = isMobileDevice()
  return isMobile ? Math.floor(config.starCount / 2) : config.starCount
})

const actualParticleCount = computed(() => {
  if (props.particleCount !== undefined) return props.particleCount
  const config = getPerformanceConfig(props.performance)
  const isMobile = isMobileDevice()
  return isMobile ? Math.floor(config.particleCount / 2) : config.particleCount
})

// 生成星空
const generateStars = () => {
  try {
    const starList: Star[] = []
    const count = actualStarCount.value
    
    for (let i = 0; i < count; i++) {
      starList.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        delay: `${Math.random() * 5}s`,
        duration: `${(3 + Math.random() * 4) / props.animationSpeed}s`
      })
    }
    
    stars.value = starList
  } catch (error) {
    emit('error', error as Error)
  }
}

// 生成环绕粒子
const generateOrbitParticles = () => {
  try {
    if (!props.enableOrbit) {
      orbitParticles.value = []
      return
    }

    const particles: OrbitParticle[] = []
    const colors = [
      'rgba(100, 200, 255, 0.9)',
      'rgba(150, 100, 255, 0.9)',
      'rgba(100, 255, 200, 0.9)',
      'rgba(255, 150, 200, 0.9)'
    ]
    
    const count = actualParticleCount.value
    
    for (let i = 0; i < count; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1
      const speed = Math.random()
      let duration
      
      if (speed < 0.3) {
        duration = `${(10 + Math.random() * 5) / props.animationSpeed}s`
      } else if (speed < 0.7) {
        duration = `${(20 + Math.random() * 10) / props.animationSpeed}s`
      } else {
        duration = `${(35 + Math.random() * 15) / props.animationSpeed}s`
      }
      
      particles.push({
        radius: 250 + i * 30,
        duration,
        delay: '0s',
        color: colors[Math.floor(Math.random() * colors.length)],
        startAngle: Math.random() * 360,
        size: 3 + Math.random() * 6,
        opacity: 0.6 + Math.random() * 0.4,
        blur: 0,
        direction
      })
    }
    
    orbitParticles.value = particles
  } catch (error) {
    emit('error', error as Error)
  }
}

// 生成神经连接线
const generateNeuralLines = () => {
  try {
    if (!props.enableNeuralNetwork) {
      neuralLines.value = []
      return
    }

    const lines: Array<{x1: number, y1: number, x2: number, y2: number, delay: string, duration: string}> = []
    const center = 400
    const lineCount = 12
    
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2
      const length = 200 + Math.random() * 200
      
      lines.push({
        x1: center,
        y1: center,
        x2: center + Math.cos(angle) * length,
        y2: center + Math.sin(angle) * length,
        delay: `${Math.random() * 3}s`,
        duration: `${(2 + Math.random() * 2) / props.animationSpeed}s`
      })
    }
    
    neuralLines.value = lines
  } catch (error) {
    emit('error', error as Error)
  }
}

// 初始化
onMounted(() => {
  try {
    generateStars()
    generateOrbitParticles()
    generateNeuralLines()
    emit('loaded')
  } catch (error) {
    emit('error', error as Error)
  }
})
</script>

<style scoped>
.ai-brain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
  background: radial-gradient(
    ellipse at center,
    rgba(10, 10, 30, 0.95) 0%,
    rgba(5, 5, 15, 0.98) 50%,
    rgba(0, 0, 5, 1) 100%
  );
}

/* 星空背景 */
.starfield {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  animation: star-twinkle var(--star-duration) ease-in-out infinite;
  animation-delay: var(--star-delay);
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 大脑容器 */
.brain-container {
  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
}

/* HUD 圆环系统 - 粒子版本 */
.hud-rings {
  position: absolute;
  inset: 0;
  z-index: 5;
}

/* 圆环粒子 */
.ring-particle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 2px;
  background: rgba(100, 200, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(100, 200, 255, 0.8);
  transform: translate(-50%, -50%) 
             rotate(var(--angle)) 
             translateX(var(--radius));
  animation: particle-pulse 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.ring-outermost-particle {
  background: rgba(80, 180, 255, 0.6);
  box-shadow: 0 0 3px rgba(80, 180, 255, 0.6);
  animation: particle-pulse 3s ease-in-out infinite, 
             ring-rotate-cw 80s linear infinite;
  animation-delay: var(--delay), 0s;
}

.ring-outer-particle {
  background: rgba(100, 200, 255, 0.7);
  box-shadow: 0 0 3px rgba(100, 200, 255, 0.7);
  animation: particle-pulse 3s ease-in-out infinite, 
             ring-rotate-ccw 60s linear infinite;
  animation-delay: var(--delay), 0s;
}

.ring-middle-particle {
  background: rgba(150, 180, 255, 0.6);
  box-shadow: 0 0 3px rgba(150, 180, 255, 0.6);
  animation: particle-pulse 3s ease-in-out infinite, 
             ring-rotate-cw 45s linear infinite;
  animation-delay: var(--delay), 0s;
}

@keyframes particle-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) 
               rotate(var(--angle)) 
               translateX(var(--radius))
               scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) 
               rotate(var(--angle)) 
               translateX(var(--radius))
               scale(1.2);
  }
}

/* 顺时针旋转 */
@keyframes ring-rotate-cw {
  0% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--angle) + 0deg)) 
               translateX(var(--radius));
  }
  100% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--angle) + 360deg)) 
               translateX(var(--radius));
  }
}

/* 逆时针旋转 */
@keyframes ring-rotate-ccw {
  0% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--angle) - 0deg)) 
               translateX(var(--radius));
  }
  100% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--angle) - 360deg)) 
               translateX(var(--radius));
  }
}

/* 刻度标记粒子 */
.tick-particle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  background: rgba(100, 200, 255, 1);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(100, 200, 255, 1);
  transform: translate(-50%, -50%) 
             rotate(var(--angle)) 
             translateX(var(--radius));
}

.tick-outer {
  width: 5px;
  height: 5px;
  background: rgba(100, 200, 255, 1);
  box-shadow: 0 0 8px rgba(100, 200, 255, 1);
}

.tick-middle {
  width: 4px;
  height: 4px;
  background: rgba(150, 180, 255, 0.9);
  box-shadow: 0 0 6px rgba(150, 180, 255, 0.9);
}

/* 数据点 */
.data-point {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  background: rgba(100, 200, 255, 1);
  border-radius: 50%;
  box-shadow: 
    0 0 10px rgba(100, 200, 255, 1),
    0 0 20px rgba(100, 200, 255, 0.6);
  transform: translate(-50%, -50%) 
             rotate(var(--angle)) 
             translateX(var(--radius));
  animation: data-pulse 2s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes data-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) 
               rotate(var(--angle)) 
               translateX(var(--radius))
               scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) 
               rotate(var(--angle)) 
               translateX(var(--radius))
               scale(1.2);
  }
}

/* 外围光晕 */
.brain-glow {
  position: absolute;
  inset: -120px;
  background: 
    radial-gradient(
      circle at 50% 50%,
      rgba(100, 200, 255, 0.4) 0%,
      rgba(150, 100, 255, 0.3) 25%,
      rgba(100, 150, 255, 0.2) 50%,
      transparent 100%
    ),
    radial-gradient(
      circle at 30% 30%,
      rgba(150, 220, 255, 0.3) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 70%,
      rgba(180, 100, 255, 0.3) 0%,
      transparent 40%
    );
  filter: blur(80px);
  animation: glow-pulse 4s ease-in-out infinite;
  z-index: 1;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    filter: blur(80px) brightness(1);
  }
  50% {
    opacity: 0.9;
    filter: blur(100px) brightness(1.3);
  }
}

/* 大脑图片 */
.brain-image {
  position: absolute;
  inset: 0;
  background-image: url('../assets/images/brain.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: brain-breathe 5s ease-in-out infinite;
  z-index: 2;
  filter: drop-shadow(0 0 40px rgba(100, 200, 255, 0.8))
          drop-shadow(0 0 80px rgba(150, 100, 255, 0.4));
}

@keyframes brain-breathe {
  0%, 100% {
    opacity: 0.85;
    filter: drop-shadow(0 0 40px rgba(100, 200, 255, 0.8))
            drop-shadow(0 0 80px rgba(150, 100, 255, 0.4))
            brightness(1);
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 60px rgba(100, 200, 255, 1))
            drop-shadow(0 0 120px rgba(150, 100, 255, 0.6))
            brightness(1.2);
  }
}

/* 中央神经脉冲 */
.neural-pulse {
  position: absolute;
  left: 50%;
  top: 25%;
  width: 3px;
  height: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    rgba(100, 200, 255, 0) 0%,
    rgba(150, 220, 255, 0.8) 20%,
    rgba(200, 240, 255, 1) 50%,
    rgba(150, 220, 255, 0.8) 80%,
    rgba(100, 200, 255, 0) 100%
  );
  filter: blur(2px);
  animation: neural-pulse 1s ease-in-out infinite;
  z-index: 3;
  box-shadow: 
    0 0 8px rgba(150, 220, 255, 0.8),
    0 0 16px rgba(100, 200, 255, 0.6);
}

@keyframes neural-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(-50%) scaleY(0.95);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleY(1.05);
  }
}

/* 环绕粒子 */
.orbit-particle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--particle-size);
  height: var(--particle-size);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    var(--particle-color) 50%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 calc(var(--particle-size) * 2) var(--particle-color),
    0 0 calc(var(--particle-size) * 4) var(--particle-color);
  opacity: var(--particle-opacity);
  animation: orbit var(--orbit-duration) linear infinite;
  animation-delay: var(--orbit-delay);
  z-index: 4;
}

@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) 
               rotate(var(--start-angle))
               translateX(var(--orbit-radius))
               scale(0.5);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 180deg))
               translateX(var(--orbit-radius))
               scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 360deg))
               translateX(var(--orbit-radius))
               scale(0.5);
    opacity: 0.3;
  }
}

/* 神经网络连接线 */
.neural-network {
  position: absolute;
  inset: -150px;
  z-index: 1;
}

.neural-lines {
  width: 100%;
  height: 100%;
}

.neural-line {
  stroke: rgba(100, 200, 255, 0.4);
  stroke-width: 1;
  stroke-linecap: round;
  animation: line-pulse var(--line-duration) ease-in-out infinite;
  animation-delay: var(--line-delay);
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0.2;
    stroke-width: 1;
  }
  50% {
    opacity: 0.8;
    stroke-width: 2;
  }
}

/* 响应式 */
@media (max-width: 1200px) {
  .brain-container {
    width: 400px;
    height: 400px;
  }
}

@media (max-width: 768px) {
  .brain-container {
    width: 300px;
    height: 300px;
  }
  
  .brain-glow {
    inset: -60px;
  }
}

@media (max-width: 480px) {
  .brain-container {
    width: 250px;
    height: 250px;
  }
  
  .brain-glow {
    inset: -40px;
  }
}
</style>
