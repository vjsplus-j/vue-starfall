/**
 * @vjsplus-j/vue-starfall 类型定义
 */

/**
 * 星星对象接口
 */
export interface Star {
  x: number
  y: number
  size: number
  opacity: number
  delay: string
  duration: string
}

/**
 * 环绕粒子接口
 */
export interface OrbitParticle {
  radius: number
  duration: string
  delay: string
  color: string
  startAngle: number
  size: number
  opacity: number
  blur: number
  direction: number
}

/**
 * 星星样式接口（仙女座星系）
 */
export interface StarStyle {
  '--sx': string
  '--sy': string
  '--ss': string
  '--sdel': string
  '--sdur': string
  '--sglow': string
  '--sblur': string
}

/**
 * 主题类型
 */
export type ThemeType = 'ai-brain' | 'andromeda' | 'custom'

/**
 * 性能级别
 */
export type PerformanceLevel = 'high' | 'medium' | 'low' | 'auto'

/**
 * 水印位置
 */
export type WatermarkPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * 设备性能信息
 */
export interface DevicePerformance {
  /** 是否为移动设备 */
  isMobile: boolean
  /** 设备像素比 */
  devicePixelRatio: number
  /** CPU核心数（如果可获取） */
  cpuCores?: number
  /** 内存大小（GB，如果可获取） */
  memory?: number
  /** 推荐的性能级别 */
  recommendedLevel: PerformanceLevel
}

/**
 * 性能配置
 */
export interface PerformanceConfig {
  /** 星星数量 */
  starCount: number
  /** 粒子数量 */
  particleCount: number
  /** 星云数量 */
  nebulaCount: number
  /** 是否启用模糊效果 */
  enableBlur: boolean
  /** 是否启用阴影 */
  enableShadow: boolean
}

/**
 * AIBrain 组件 Props
 */
export interface AIBrainProps {
  /** 星星数量，默认根据性能自动调整 */
  starCount?: number
  /** 环绕粒子数量，默认根据性能自动调整 */
  particleCount?: number
  /** 星云数量，默认 3 */
  nebulaCount?: number
  /** 动画速度倍数，默认 1 */
  animationSpeed?: number
  /** 是否启用环绕粒子，默认 true */
  enableOrbit?: boolean
  /** 是否启用星云效果，默认 true */
  enableNebula?: boolean
  /** 是否启用伴星，默认 true */
  enableCompanion?: boolean
  /** 性能级别，默认 'auto' */
  performance?: PerformanceLevel
}

/**
 * AndromedaGalaxy 组件 Props
 */
export interface AndromedaGalaxyProps {
  /** 星系中心X坐标（百分比），默认 32 */
  centerX?: number
  /** 星系中心Y坐标（百分比），默认 50 */
  centerY?: number
  /** 星星总数量，默认根据性能自动调整 */
  starCount?: number
  /** 核心区星星比例，默认 0.20 */
  coreRatio?: number
  /** 旋臂星星比例，默认 0.70 */
  armRatio?: number
  /** 动画速度倍数，默认 1 */
  animationSpeed?: number
  /** 是否启用核心光晕，默认 true */
  enableCoreGlow?: boolean
  /** 是否启用星云节点，默认 true */
  enableNebula?: boolean
  /** 性能级别，默认 'auto' */
  performance?: PerformanceLevel
  /** 是否使用固定位置（不随机），默认 false */
  useFixedPositions?: boolean
  /** 固定位置的随机种子，默认 12345 */
  randomSeed?: number
}

/**
 * GalaxyBackground 组件 Props
 */
export interface GalaxyBackgroundProps {
  /** 主题类型，默认 'ai-brain' */
  theme?: ThemeType
  /** 是否显示水印，默认 true */
  showWatermark?: boolean
  /** 水印文字，默认 'GMD AI生成' */
  watermarkText?: string
  /** 水印位置，默认 'bottom-left' */
  watermarkPosition?: WatermarkPosition
  /** 水印透明度，默认 0.3 */
  watermarkOpacity?: number
  /** 性能级别，默认 'auto' */
  performance?: PerformanceLevel
  /** 是否自动检测性能，默认 true */
  autoDetect?: boolean
  /** 是否启用数据流网格，默认 true */
  enableDataflow?: boolean
  /** 是否使用固定位置（不随机），默认 false */
  useFixedPositions?: boolean
  /** 固定位置的随机种子，默认 12345 */
  randomSeed?: number
}

/**
 * 组件事件类型
 */
export interface ComponentEvents {
  /** 组件加载完成 */
  loaded: () => void
  /** 性能级别变化 */
  performanceChange: (level: PerformanceLevel) => void
  /** 主题变化 */
  themeChange: (theme: ThemeType) => void
  /** 渲染错误 */
  error: (error: Error) => void
}
