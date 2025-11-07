<template>
  <div class="ai-brain">
    <!-- 宇宙星空容器 -->
    <div class="cosmic-space">
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
      
      <!-- 星云效果 -->
      <div v-if="enableNebula && actualNebulaCount >= 1" class="nebula nebula-1"></div>
      <div v-if="enableNebula && actualNebulaCount >= 2" class="nebula nebula-2"></div>
      <div v-if="enableNebula && actualNebulaCount >= 3" class="nebula nebula-3"></div>
      
      <!-- AI核心星球 -->
      <div class="ai-planet">
        <div class="planet-body">
          <div class="planet-surface"></div>
          <div class="planet-atmosphere"></div>
        </div>
        <div class="planet-glow"></div>
      </div>
      
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
          '--particle-opacity': particle.opacity,
          '--particle-blur': particle.blur + 'px',
          '--orbit-direction': particle.direction
        }"
      ></div>
      
      <!-- 大型伴星（月亮） -->
      <div v-if="enableCompanion" class="companion-star"></div>
      
      <!-- 能量波纹 -->
      <div class="energy-ripples">
        <div class="ripple ripple-1"></div>
        <div class="ripple ripple-2"></div>
        <div class="ripple ripple-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AIBrainProps, Star, OrbitParticle, PerformanceLevel } from '../types'
import { getPerformanceConfig } from '../utils/performance'

// Props
const props = withDefaults(defineProps<AIBrainProps>(), {
  starCount: undefined,
  particleCount: undefined,
  nebulaCount: 3,
  animationSpeed: 1,
  enableOrbit: true,
  enableNebula: true,
  enableCompanion: true,
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

// 根据性能配置计算实际数量
const actualStarCount = computed(() => {
  if (props.starCount !== undefined) return props.starCount
  const config = getPerformanceConfig(props.performance)
  return config.starCount
})

const actualParticleCount = computed(() => {
  if (props.particleCount !== undefined) return props.particleCount
  const config = getPerformanceConfig(props.performance)
  return config.particleCount
})

const actualNebulaCount = computed(() => {
  return Math.min(props.nebulaCount, 7)
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
      'rgba(100, 200, 255, 0.85)',
      'rgba(150, 100, 255, 0.85)',
      'rgba(255, 150, 200, 0.85)',
      'rgba(100, 255, 200, 0.85)',
      'rgba(255, 200, 100, 0.85)',
      'rgba(200, 150, 255, 0.85)'
    ]
    
    const count = actualParticleCount.value
    
    for (let i = 0; i < count; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1
      const speed = Math.random()
      let duration
      
      // 创建速度层次：快速、中速、慢速
      if (speed < 0.3) {
        duration = `${(12 + Math.random() * 8) / props.animationSpeed}s`
      } else if (speed < 0.7) {
        duration = `${(25 + Math.random() * 15) / props.animationSpeed}s`
      } else {
        duration = `${(45 + Math.random() * 25) / props.animationSpeed}s`
      }
      
      particles.push({
        radius: 680 + i * 32,
        duration,
        delay: '0s',
        color: colors[Math.floor(Math.random() * colors.length)],
        startAngle: Math.random() * 360,
        size: 4 + Math.random() * 10,
        opacity: 0.6 + Math.random() * 0.35,
        blur: Math.random() * 1.5,
        direction
      })
    }
    
    orbitParticles.value = particles
  } catch (error) {
    emit('error', error as Error)
  }
}

// 初始化
onMounted(() => {
  try {
    generateStars()
    generateOrbitParticles()
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
}

/* 宇宙空间 */
.cosmic-space {
  position: absolute;
  width: 100%;
  height: 100%;
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

/* 星云效果 */
.nebula {
  position: absolute;
  filter: blur(80px);
  opacity: 0.25;
  animation: nebula-float 25s ease-in-out infinite;
  mix-blend-mode: screen;
}

.nebula-1 {
  width: 500px;
  height: 500px;
  left: 15%;
  top: 25%;
  background: 
    radial-gradient(ellipse at 40% 40%, rgba(120, 60, 255, 0.5) 0%, transparent 35%),
    radial-gradient(ellipse at 70% 60%, rgba(80, 40, 200, 0.4) 0%, transparent 40%),
    radial-gradient(circle, rgba(100, 50, 220, 0.45) 0%, rgba(140, 80, 255, 0.25) 40%, transparent 70%);
  animation-delay: 0s;
}

.nebula-2 {
  width: 450px;
  height: 450px;
  right: 20%;
  top: 15%;
  background: 
    radial-gradient(ellipse at 30% 50%, rgba(255, 80, 140, 0.45) 0%, transparent 40%),
    radial-gradient(ellipse at 65% 35%, rgba(200, 60, 120, 0.35) 0%, transparent 35%),
    radial-gradient(circle, rgba(240, 100, 160, 0.4) 0%, rgba(255, 140, 190, 0.2) 45%, transparent 75%);
  animation-delay: 4s;
}

.nebula-3 {
  width: 400px;
  height: 400px;
  left: 45%;
  bottom: 18%;
  background: 
    radial-gradient(ellipse at 50% 40%, rgba(80, 180, 255, 0.45) 0%, transparent 38%),
    radial-gradient(ellipse at 60% 70%, rgba(60, 140, 220, 0.35) 0%, transparent 42%),
    radial-gradient(circle, rgba(100, 200, 255, 0.4) 0%, rgba(140, 220, 255, 0.22) 48%, transparent 72%);
  animation-delay: 7s;
}

@keyframes nebula-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

/* AI核心星球 */
.ai-planet {
  position: absolute;
  left: -18%;
  bottom: -12%;
  transform: none;
  z-index: 10;
  animation: planet-revolution 480s linear infinite;
}

@keyframes planet-revolution {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(100px, -30px);
  }
  50% {
    transform: translate(150px, 0);
  }
  75% {
    transform: translate(100px, 30px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.planet-body {
  position: relative;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
}

.planet-surface {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: 
    /* 主高光区域 */
    radial-gradient(circle at 26% 26%, rgba(110, 150, 210, 0.5) 0%, transparent 15%),
    radial-gradient(circle at 28% 30%, rgba(95, 135, 195, 0.35) 0%, transparent 20%),
    /* 次级高光 */
    radial-gradient(ellipse at 35% 28%, rgba(85, 125, 185, 0.25) 0%, transparent 18%),
    /* 表面纹理斑块 */
    radial-gradient(ellipse at 55% 40%, rgba(65, 95, 155, 0.4) 0%, transparent 25%),
    radial-gradient(ellipse at 45% 60%, rgba(60, 90, 145, 0.35) 0%, transparent 28%),
    radial-gradient(ellipse at 70% 50%, rgba(55, 85, 140, 0.3) 0%, transparent 22%),
    radial-gradient(ellipse at 30% 75%, rgba(60, 95, 150, 0.35) 0%, transparent 26%),
    /* 深色陨石坑/凹陷 */
    radial-gradient(circle at 65% 35%, rgba(20, 35, 70, 0.6) 0%, transparent 8%),
    radial-gradient(circle at 50% 70%, rgba(18, 32, 65, 0.55) 0%, transparent 10%),
    radial-gradient(circle at 40% 45%, rgba(22, 38, 72, 0.5) 0%, transparent 7%),
    radial-gradient(circle at 75% 65%, rgba(20, 35, 68, 0.5) 0%, transparent 9%),
    /* 右下大阴影区 */
    radial-gradient(ellipse at 75% 75%, rgba(15, 30, 65, 0.7) 0%, transparent 40%),
    radial-gradient(ellipse at 70% 80%, rgba(18, 35, 70, 0.6) 0%, transparent 35%),
    /* 基础渐变 */
    radial-gradient(ellipse at 28% 28%, 
      rgba(55, 85, 145, 1) 0%, 
      rgba(45, 75, 130, 1) 35%, 
      rgba(35, 60, 110, 1) 65%, 
      rgba(25, 45, 90, 1) 85%,
      rgba(18, 35, 75, 1) 100%);
  box-shadow: 
    inset -80px -80px 150px rgba(0, 0, 15, 0.95),
    inset 50px 50px 100px rgba(90, 130, 190, 0.12),
    inset 0 0 180px rgba(25, 45, 95, 0.35),
    0 0 60px rgba(50, 90, 160, 0.3),
    0 0 120px rgba(40, 80, 150, 0.15);
  animation: 
    planet-rotate 60s linear infinite,
    planet-spin 120s linear infinite;
  filter: contrast(1.15) brightness(0.85) saturate(0.82);
}

@keyframes planet-rotate {
  0% {
    background-position: 0% 50%, 50% 50%, center;
  }
  100% {
    background-position: 100% 50%, 150% 50%, center;
  }
}

@keyframes planet-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.planet-atmosphere {
  position: absolute;
  inset: -55px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at 35% 35%, rgba(140, 170, 240, 0.18) 0%, transparent 35%),
    radial-gradient(circle, 
      transparent 50%,
      rgba(75, 115, 195, 0.28) 65%,
      rgba(95, 140, 220, 0.22) 75%,
      rgba(115, 160, 245, 0.15) 85%,
      rgba(130, 175, 255, 0.08) 92%,
      transparent 100%
    );
  animation: atmosphere-pulse 5s ease-in-out infinite;
  filter: blur(10px);
}

@keyframes atmosphere-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}


.planet-glow {
  position: absolute;
  inset: -220px;
  border-radius: 50%;
  background: 
    radial-gradient(ellipse at 30% 30%, rgba(85, 125, 205, 0.28) 0%, transparent 18%),
    radial-gradient(circle, 
      rgba(65, 105, 185, 0.32) 0%,
      rgba(80, 120, 200, 0.22) 22%,
      rgba(95, 135, 215, 0.14) 40%,
      rgba(105, 145, 225, 0.08) 60%,
      rgba(115, 155, 235, 0.04) 75%,
      transparent 85%
    );
  animation: planet-glow-pulse 7s ease-in-out infinite;
  filter: blur(110px);
}

@keyframes planet-glow-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.08);
  }
}

/* 环绕粒子 - 恒星效果 */
.orbit-particle {
  position: absolute;
  left: 2%;
  bottom: 15%;
  width: var(--particle-size);
  height: var(--particle-size);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    var(--particle-color) 40%,
    var(--particle-color) 70%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 calc(var(--particle-size) * 2) var(--particle-color),
    0 0 calc(var(--particle-size) * 4) var(--particle-color),
    0 0 calc(var(--particle-size) * 6) rgba(255, 255, 255, 0.5),
    inset 0 0 calc(var(--particle-size) * 0.5) rgba(255, 255, 255, 0.8);
  opacity: var(--particle-opacity);
  filter: blur(var(--particle-blur));
  animation: 
    orbit var(--orbit-duration) linear infinite,
    star-flicker 3s ease-in-out infinite;
  animation-delay: var(--orbit-delay), calc(var(--orbit-delay) * 0.5);
  transform-origin: center;
}

@keyframes star-flicker {
  0%, 100% {
    box-shadow: 
      0 0 calc(var(--particle-size) * 2) var(--particle-color),
      0 0 calc(var(--particle-size) * 4) var(--particle-color),
      0 0 calc(var(--particle-size) * 6) rgba(255, 255, 255, 0.5),
      inset 0 0 calc(var(--particle-size) * 0.5) rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 
      0 0 calc(var(--particle-size) * 2.5) var(--particle-color),
      0 0 calc(var(--particle-size) * 5) var(--particle-color),
      0 0 calc(var(--particle-size) * 8) rgba(255, 255, 255, 0.7),
      inset 0 0 calc(var(--particle-size) * 0.8) rgba(255, 255, 255, 1);
  }
}

@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 0deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(0px)
               scale(0.4);
    opacity: 0.3;
    z-index: 5;
  }
  12.5% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 45deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * -0.15))
               scale(0.6);
    opacity: 0.5;
    z-index: 5;
  }
  25% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 90deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * -0.25))
               scale(0.9);
    opacity: 0.8;
    z-index: 5;
  }
  37.5% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 135deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * -0.15))
               scale(1);
    opacity: 1;
    z-index: 12;
  }
  50% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 180deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(0px)
               scale(1);
    opacity: 1;
    z-index: 12;
  }
  62.5% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 225deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * 0.15))
               scale(0.9);
    opacity: 0.8;
    z-index: 12;
  }
  75% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 270deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * 0.25))
               scale(0.6);
    opacity: 0.5;
    z-index: 5;
  }
  87.5% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 315deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(calc(var(--orbit-radius) * 0.15))
               scale(0.5);
    opacity: 0.4;
    z-index: 5;
  }
  100% {
    transform: translate(-50%, -50%) 
               rotate(calc(var(--start-angle) + 360deg * var(--orbit-direction)))
               translateX(var(--orbit-radius))
               translateY(0px)
               scale(0.4);
    opacity: 0.3;
    z-index: 5;
  }
}

/* 大型伴星 - 像月球一样环绕 */
.companion-star {
  position: absolute;
  left: 2%;
  bottom: 15%;
  width: 450px;
  height: 450px;
  background: 
    radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1) 0%, transparent 15%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.95) 0%, transparent 25%),
    radial-gradient(circle, 
      rgba(255, 255, 255, 1) 0%,
      rgba(250, 250, 255, 0.98) 15%,
      rgba(240, 245, 255, 0.95) 30%,
      rgba(220, 230, 255, 0.85) 50%,
      rgba(200, 220, 255, 0.6) 70%,
      transparent 100%
    );
  border-radius: 50%;
  box-shadow: 
    0 0 720px rgba(255, 255, 255, 0.9),
    0 0 1350px rgba(230, 240, 255, 0.7),
    0 0 2250px rgba(200, 220, 255, 0.4),
    inset 0 0 270px rgba(255, 255, 255, 1),
    inset -72px -72px 225px rgba(200, 220, 240, 0.5);
  animation: 
    companion-orbit 540s linear infinite,
    companion-glow 8s ease-in-out infinite,
    companion-depth 540s linear infinite;
  animation-delay: -202.5s, 0s, -202.5s;
  z-index: 11;
  filter: blur(4px);
}

@keyframes companion-orbit {
  0% {
    transform: translate(calc(-50% - 1600px), calc(-50% + 600px)) scale(0.3);
  }
  12.5% {
    transform: translate(calc(-50% - 1200px), calc(-50% + 200px)) scale(0.5);
  }
  25% {
    transform: translate(calc(-50% - 400px), calc(-50% - 300px)) scale(0.85);
  }
  37.5% {
    transform: translate(calc(-50% + 600px), calc(-50% - 400px)) scale(1);
  }
  50% {
    transform: translate(calc(-50% + 1800px), calc(-50% - 200px)) scale(1);
  }
  62.5% {
    transform: translate(calc(-50% + 1400px), calc(-50% + 200px)) scale(0.9);
  }
  75% {
    transform: translate(calc(-50% + 400px), calc(-50% + 500px)) scale(0.6);
  }
  87.5% {
    transform: translate(calc(-50% - 800px), calc(-50% + 650px)) scale(0.4);
  }
  100% {
    transform: translate(calc(-50% - 1600px), calc(-50% + 600px)) scale(0.3);
  }
}

@keyframes companion-depth {
  0%, 100% {
    opacity: 0.3;
    z-index: 5;
  }
  25% {
    opacity: 0.8;
    z-index: 5;
  }
  37.5%, 62.5% {
    opacity: 1;
    z-index: 12;
  }
  75% {
    opacity: 0.6;
    z-index: 5;
  }
  87.5% {
    opacity: 0.4;
    z-index: 5;
  }
}

@keyframes companion-glow {
  0%, 100% {
    box-shadow: 
      0 0 720px rgba(255, 255, 255, 0.9),
      0 0 1350px rgba(230, 240, 255, 0.7),
      0 0 2250px rgba(200, 220, 255, 0.4),
      inset 0 0 270px rgba(255, 255, 255, 1),
      inset -72px -72px 225px rgba(200, 220, 240, 0.5);
  }
  50% {
    box-shadow: 
      0 0 900px rgba(255, 255, 255, 1),
      0 0 1620px rgba(230, 240, 255, 0.85),
      0 0 2700px rgba(200, 220, 255, 0.55),
      inset 0 0 360px rgba(255, 255, 255, 1),
      inset -90px -90px 270px rgba(200, 220, 240, 0.6);
  }
}


/* 能量波纹 */
.energy-ripples {
  position: absolute;
  left: 2%;
  bottom: 15%;
  transform: translate(-50%, -50%);
}

.ripple {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    transparent 0%,
    transparent 48%,
    rgba(80, 140, 220, 0.08) 49%,
    rgba(100, 160, 240, 0.15) 50%,
    rgba(90, 150, 230, 0.12) 51%,
    rgba(70, 130, 210, 0.06) 53%,
    transparent 55%
  );
  box-shadow: 
    inset 0 0 80px rgba(90, 150, 230, 0.15),
    0 0 60px rgba(80, 140, 220, 0.1);
  animation: atmosphere-ripple 8s ease-out infinite;
  filter: blur(3px);
}

.ripple-1 {
  animation-delay: 0s;
}

.ripple-2 {
  animation-delay: 2.5s;
}

.ripple-3 {
  animation-delay: 5s;
}

@keyframes atmosphere-ripple {
  0% {
    width: 400px;
    height: 400px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  8% {
    opacity: 0.6;
  }
  15% {
    opacity: 0.8;
  }
  85% {
    opacity: 0.5;
  }
  100% {
    width: 1200px;
    height: 1200px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .planet-body {
    width: 180px;
    height: 180px;
  }
  
  .planet-ring {
    width: 270px;
    height: 72px;
  }
  
  .nebula {
    filter: blur(50px);
  }
}

@media (max-width: 768px) {
  .planet-body {
    width: 140px;
    height: 140px;
  }
  
  .planet-ring {
    width: 210px;
    height: 56px;
    border-width: 2px;
  }
  
  .nebula-1 {
    width: 300px;
    height: 300px;
  }
  
  .nebula-2 {
    width: 250px;
    height: 250px;
  }
  
  .nebula-3 {
    width: 220px;
    height: 220px;
  }
  
  .orbit-particle {
    width: 4px;
    height: 4px;
  }
  
  .star {
    width: calc(var(--star-size, 2px) * 0.7);
    height: calc(var(--star-size, 2px) * 0.7);
  }
}

@media (max-width: 480px) {
  .planet-body {
    width: 100px;
    height: 100px;
  }
  
  .planet-ring {
    width: 150px;
    height: 40px;
    border-width: 1.5px;
  }
  
  .planet-glow {
    inset: -40px;
  }
  
  .nebula {
    filter: blur(40px);
  }
  
  .nebula-1 {
    width: 200px;
    height: 200px;
  }
  
  .nebula-2 {
    width: 180px;
    height: 180px;
  }
  
  .nebula-3 {
    width: 150px;
    height: 150px;
  }
  
  .orbit-particle {
    width: 3px;
    height: 3px;
  }
  
  .meteor {
    width: 2px;
    height: 2px;
  }
  
  .meteor::before {
    width: 60px;
    height: 1.5px;
  }
}
</style>
