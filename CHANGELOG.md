# 更新日志

所有值得注意的更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [2.2.0] - 2025-11-07

### ✨ 新增功能

#### AIBrain 组件全新升级 - HUD 科技圆环系统

**粒子圆环系统：**
- ✅ 三层粒子圆环 - 使用独立粒子点组成圆环，而非传统画线
- ✅ 最外圈（340px）- 150个粒子，顺时针旋转，80秒/圈
- ✅ 外圈（280px）- 120个粒子，逆时针旋转，60秒/圈
- ✅ 中圈（220px）- 90个粒子，顺时针旋转，45秒/圈
- ✅ 交替反向旋转 - 产生强烈的视觉冲击力和科技感

**刻度标记系统：**
- ✅ 外圈刻度 - 36个发光粒子（每10度一个）
- ✅ 中圈刻度 - 24个发光粒子（每15度一个）
- ✅ 独立发光效果 - 每个刻度都是独立的光点

**数据点系统：**
- ✅ 8个大型数据点 - 分布在中圈上（每45度一个）
- ✅ 脉冲动画 - 透明度和缩放变化，2秒周期
- ✅ 延迟闪烁 - 产生波浪式的视觉效果

**大脑图片集成：**
- ✅ 使用 `brain.png` 作为核心视觉元素
- ✅ 呼吸发光效果 - 5秒周期，双层阴影（青蓝+紫色）
- ✅ 亮度变化 - 呼吸时亮度从1.0到1.2
- ✅ 中央神经脉冲 - 垂直光柱，1秒快速闪烁

**视觉效果优化：**
- ✅ 外围光晕 - 三层渐变（主光晕+左上高光+右下高光）
- ✅ 光晕呼吸 - 4秒周期，透明度和模糊度变化
- ✅ 星空背景 - 480颗星星，随机闪烁
- ✅ 环绕粒子 - 可选的轨道粒子系统

### 🎨 优化改进

**动画性能：**
- ✅ 粒子脉冲 - 3秒周期，透明度0.4-1.0，缩放0.8-1.2
- ✅ 圆环旋转 - 不同速度的交替反向旋转
- ✅ 波浪效果 - 通过延迟产生流动感

**布局调整：**
- ✅ 大脑容器 - 600x600px，位于左侧30%位置
- ✅ 神经脉冲 - 缩短至50%高度，只在大脑内部显示
- ✅ 避免遮挡 - 不影响右侧登录表单

**粒子总数：**
- 最外圈：150个粒子
- 外圈：120个粒子
- 中圈：90个粒子
- 外圈刻度：36个粒子
- 中圈刻度：24个粒子
- 数据点：8个粒子
- **总计：428个粒子**

### 🎯 技术亮点

**粒子系统：**
- 每个粒子都是独立的 DOM 元素
- 使用 CSS 变量控制位置和动画
- 支持独立的延迟和动画参数
- 高性能的 CSS 动画，无需 JavaScript 计算

**动画系统：**
- `particle-pulse` - 粒子脉冲动画
- `ring-rotate-cw` - 顺时针旋转
- `ring-rotate-ccw` - 逆时针旋转
- `data-pulse` - 数据点脉冲
- `brain-breathe` - 大脑呼吸
- `glow-pulse` - 光晕呼吸
- `neural-pulse` - 神经脉冲

**视觉层级：**
```
z-index 5: HUD圆环系统
z-index 3: 神经脉冲
z-index 2: 大脑图片
z-index 1: 外围光晕
z-index 0: 星空背景
```

### 📊 性能数据

- 粒子数量：428个
- 动画帧率：60fps
- 内存占用：优化良好
- 移动端兼容：完全支持

---

## [2.1.0] - 2025-11-07

### ✨ 新增功能

#### AndromedaGalaxy 组件增强
- ✅ 新增 `useFixedPositions` 属性 - 支持固定星星位置，每次刷新不再随机
- ✅ 新增 `randomSeed` 属性 - 支持自定义随机种子，生成不同的固定布局
- ✅ 固定随机数生成器（LCG算法）- 确保相同种子产生相同星空布局

### 🎨 优化改进
- ✅ 移除星系核心旋转动画 - 改为纯呼吸效果（渐明渐暗）
- ✅ 移除星云层飘动动画 - 提升视觉稳定性
- ✅ 调整星系位置 - 从中心25%移到左侧20%，避免遮挡登录框
- ✅ 优化星系尺寸 - 从50vmax×25vmax调整为45vmax×22vmax
- ✅ 修正z-index层级 - 确保星系核心 < 星云层 < 星星层

### 🐛 Bug修复
- ✅ 修复容器旋转导致边缘裁剪的问题
- ✅ 修复TypeScript类型声明缺失的问题

#### 完整样式库集成（之前版本）

**设计令牌（Design Tokens）**
- ✅ `tokens/colors.scss` - 完整的颜色系统（品牌色、功能色、中性色、渐变）
- ✅ `tokens/typography.scss` - 字体系统（字体族、大小、粗细、行高）
- ✅ `tokens/spacing.scss` - 间距系统（基础间距、语义化间距）
- ✅ `tokens/radius.scss` - 圆角系统
- ✅ `tokens/shadows.scss` - 阴影系统（基础阴影、玻璃态、发光效果）
- ✅ `tokens/animations.scss` - 动画系统（时长、缓动、关键帧动画）

**混入系统（Mixins）**
- ✅ `mixins/glass.scss` - 玻璃态效果（从主题SDK提取）
- ✅ `mixins/gradient.scss` - 渐变效果（渐变文字、渐变边框、星云渐变）
- ✅ `mixins/responsive.scss` - 响应式系统（断点、媒体查询）
- ✅ `mixins/utils.scss` - 工具混入（布局、文本、滚动条等）

**核心样式**
- ✅ `core/reset.scss` - CSS重置
- ✅ `core/base.scss` - 基础元素样式

**主题系统**
- ✅ `themes/galaxy-dark.scss` - 星空深色主题（默认）

### 📦 导出增强

- ✅ 新增样式导出路径：`@vjsplus-j/vue-starfall/styles`
- ✅ 支持按需导入样式模块：`@vjsplus-j/vue-starfall/styles/*`
- ✅ 提供独立的样式CSS文件：`dist/styles.css`

### 📚 使用方式

**导入完整样式库：**
```js
import '@vjsplus-j/vue-starfall/styles'
```

**在SCSS中使用设计令牌：**
```scss
@use '@vjsplus-j/vue-starfall/styles/tokens/colors' as *;
@use '@vjsplus-j/vue-starfall/styles/mixins/glass' as *;

.my-card {
  @include glass-card;
  color: $text-primary;
}
```

---

## [2.0.1] - 2025-11-07

### 🔧 修复

- ✅ 修复 `.gitignore` 文件格式问题（添加末尾换行符）

---

## [2.0.0] - 2025-11-07

### 🎉 重大更新

这是一个重大版本更新，包含了大量新功能和增强。虽然**完全向后兼容**，但新增功能足够重要，值得升级主版本号。

### ✨ 新增功能

#### 1. 主题配置增强

**GalaxyBackground 组件：**
- ✅ 新增 `theme` 属性 - 支持主题切换（`'ai-brain'` | `'andromeda'`）
- ✅ 新增 `watermarkPosition` 属性 - 水印位置可配置（四个角落）
- ✅ 新增 `watermarkOpacity` 属性 - 水印透明度可调节（0-1）
- ✅ 新增 `enableDataflow` 属性 - 数据流网格开关
- ✅ 新增 `autoDetect` 属性 - 自动检测设备性能

**AIBrain 组件：**
- ✅ 新增 `nebulaCount` 属性 - 星云数量控制（1-7层）
- ✅ 新增 `animationSpeed` 属性 - 动画速度倍数
- ✅ 新增 `enableOrbit` 属性 - 环绕粒子开关
- ✅ 新增 `enableNebula` 属性 - 星云效果开关
- ✅ 新增 `enableCompanion` 属性 - 伴星开关
- ✅ 新增 `performance` 属性 - 性能级别控制

**AndromedaGalaxy 组件：**
- ✅ 新增 `animationSpeed` 属性 - 动画速度倍数
- ✅ 新增 `enableCoreGlow` 属性 - 核心光晕开关
- ✅ 新增 `enableNebula` 属性 - 星云节点开关
- ✅ 新增 `performance` 属性 - 性能级别控制

#### 2. 性能优化系统

**智能性能检测：**
- ✅ 新增 `detectDevicePerformance()` 函数 - 检测设备性能
- ✅ 新增 `getPerformanceConfig()` 函数 - 获取性能配置
- ✅ 新增 `getActualPerformanceLevel()` 函数 - 获取实际性能级别
- ✅ 新增 `isMobileDevice()` 函数 - 移动设备检测
- ✅ 新增 `getDevicePixelRatio()` 函数 - 像素比检测
- ✅ 新增 `PerformanceMonitor` 类 - FPS性能监控

**性能级别：**
- ✅ `'auto'` - 自动检测设备性能并选择最优配置
- ✅ `'high'` - 高性能模式（桌面480星，移动240星）
- ✅ `'medium'` - 中性能模式（桌面240星，移动120星）
- ✅ `'low'` - 低性能模式（桌面120星，移动60星）

**智能降级机制：**
- ✅ 根据CPU核心数自动调整
- ✅ 根据设备内存自动调整
- ✅ 根据设备像素比自动调整
- ✅ 移动端自动减半渲染元素

#### 3. 事件系统

**所有组件新增事件：**
- ✅ `loaded` - 组件加载完成事件
- ✅ `performanceChange` - 性能级别变化事件
- ✅ `themeChange` - 主题变化事件（仅GalaxyBackground）
- ✅ `error` - 渲染错误事件

#### 4. TypeScript 类型增强

**新增类型定义：**
- ✅ `WatermarkPosition` - 水印位置类型
- ✅ `DevicePerformance` - 设备性能信息接口
- ✅ `PerformanceConfig` - 性能配置接口
- ✅ `ComponentEvents` - 组件事件类型
- ✅ 扩展所有组件的 Props 接口

#### 5. 工具函数导出

**可直接导入使用：**
```typescript
import {
  detectDevicePerformance,
  getPerformanceConfig,
  getActualPerformanceLevel,
  isMobileDevice,
  getDevicePixelRatio,
  PerformanceMonitor
} from '@vjsplus-j/vue-starfall'
```

### 📚 文档更新

- ✅ 新增 `FEATURES.md` - 完整的新特性文档
- ✅ 更新所有组件的使用说明
- ✅ 添加完整的API文档
- ✅ 添加最佳实践指南

### 🔧 改进

- ✅ 优化星星生成算法，支持动态数量
- ✅ 优化动画性能，支持速度调节
- ✅ 改进类型定义，更好的IDE提示
- ✅ 增强错误处理机制

### ⚠️ 注意事项

**向后兼容性：**
- ✅ 所有 v1.0.0 代码无需修改即可运行
- ✅ 新功能为可选，默认行为保持不变
- ✅ 无破坏性变更

**升级建议：**
- 建议使用 `performance="auto"` 启用自动性能优化
- 建议监听 `loaded` 事件以优化用户体验
- 建议在低端设备上手动设置 `performance="low"`

---

## [1.0.0] - 2025-11-07

### ✨ 新增

- 🎉 首次发布
- 🌌 AI星空主题组件（AIBrain）
- 🌠 仙女座星系主题组件（AndromedaGalaxy）
- 📦 统一背景容器组件（GalaxyBackground）
- 💪 完整的 TypeScript 类型支持
- 📱 响应式设计和移动端优化
- ⚡ 性能自动检测和优化
- 📖 完整的使用文档

### 🎨 特性

- 动态星星闪烁效果
- 多彩星云飘动动画
- AI核心星球3D效果
- 环绕粒子轨道动画
- 超大型伴星效果
- 能量波纹动画
- 星系核心光晕
- 螺旋臂结构模拟

### 🔧 技术栈

- Vue 3.5+
- TypeScript 5.9+
- Vite 7.1+
- CSS3 动画

[1.0.0]: https://github.com/vjsplus-j/vue-starfall/releases/tag/v1.0.0
