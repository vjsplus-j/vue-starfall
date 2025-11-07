/**
 * 性能检测工具函数
 * @vjsplus-j/vue-starfall
 */

import type { DevicePerformance, PerformanceLevel, PerformanceConfig } from '../types'

/**
 * 检测设备性能
 */
export function detectDevicePerformance(): DevicePerformance {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches)

  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  // 尝试获取CPU核心数
  const cpuCores = (navigator as any).hardwareConcurrency || undefined

  // 尝试获取内存信息（仅部分浏览器支持）
  const memory = (navigator as any).deviceMemory || undefined

  // 计算推荐性能级别
  let recommendedLevel: PerformanceLevel = 'high'

  if (isMobile) {
    // 移动设备
    if (devicePixelRatio > 2 || (cpuCores && cpuCores >= 8) || (memory && memory >= 6)) {
      recommendedLevel = 'medium' // 高端移动设备
    } else {
      recommendedLevel = 'low' // 普通移动设备
    }
  } else {
    // 桌面设备
    if (cpuCores && cpuCores < 4) {
      recommendedLevel = 'medium'
    } else if (memory && memory < 4) {
      recommendedLevel = 'medium'
    } else {
      recommendedLevel = 'high'
    }
  }

  return {
    isMobile,
    devicePixelRatio,
    cpuCores,
    memory,
    recommendedLevel
  }
}

/**
 * 根据性能级别获取配置
 */
export function getPerformanceConfig(level: PerformanceLevel): PerformanceConfig {
  const devicePerf = detectDevicePerformance()
  
  // 如果是auto，使用推荐级别
  const actualLevel = level === 'auto' ? devicePerf.recommendedLevel : level

  switch (actualLevel) {
    case 'high':
      return {
        starCount: devicePerf.isMobile ? 240 : 480,
        particleCount: devicePerf.isMobile ? 15 : 20,
        nebulaCount: devicePerf.isMobile ? 5 : 7,
        enableBlur: true,
        enableShadow: true
      }
    
    case 'medium':
      return {
        starCount: devicePerf.isMobile ? 120 : 240,
        particleCount: devicePerf.isMobile ? 10 : 15,
        nebulaCount: devicePerf.isMobile ? 3 : 5,
        enableBlur: true,
        enableShadow: false
      }
    
    case 'low':
      return {
        starCount: devicePerf.isMobile ? 60 : 120,
        particleCount: devicePerf.isMobile ? 5 : 10,
        nebulaCount: devicePerf.isMobile ? 2 : 3,
        enableBlur: false,
        enableShadow: false
      }
    
    default:
      return getPerformanceConfig('high')
  }
}

/**
 * 获取实际性能级别（处理auto）
 */
export function getActualPerformanceLevel(level: PerformanceLevel): Exclude<PerformanceLevel, 'auto'> {
  if (level === 'auto') {
    const devicePerf = detectDevicePerformance()
    return devicePerf.recommendedLevel as Exclude<PerformanceLevel, 'auto'>
  }
  return level as Exclude<PerformanceLevel, 'auto'>
}

/**
 * 检测是否为移动设备
 */
export function isMobileDevice(): boolean {
  return detectDevicePerformance().isMobile
}

/**
 * 获取设备像素比
 */
export function getDevicePixelRatio(): number {
  return detectDevicePerformance().devicePixelRatio
}

/**
 * 性能监控（可选功能）
 */
export class PerformanceMonitor {
  private fps: number = 60
  private frameCount: number = 0
  private lastTime: number = performance.now()
  private rafId: number | null = null

  start(callback?: (fps: number) => void) {
    const measure = () => {
      this.frameCount++
      const currentTime = performance.now()
      const elapsed = currentTime - this.lastTime

      if (elapsed >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / elapsed)
        this.frameCount = 0
        this.lastTime = currentTime
        
        if (callback) {
          callback(this.fps)
        }
      }

      this.rafId = requestAnimationFrame(measure)
    }

    this.rafId = requestAnimationFrame(measure)
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  getFPS(): number {
    return this.fps
  }
}
