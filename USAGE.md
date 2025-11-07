# 📖 @vjsplus-j/vue-starfall 使用指南

## 🚀 快速开始

### 1. 安装依赖

```bash
# 在SDK包目录下
cd packages/vue-starfall
yarn install
```

### 2. 构建SDK

```bash
yarn build
```

构建产物位于 `dist/` 目录：
- `index.es.js` - ES Module 格式
- `index.umd.js` - UMD 格式
- `index.d.ts` - TypeScript 类型定义
- `vue-starfall.css` - 样式文件

---

## 📦 发布到 npm

### 方式1：发布到公开 npm

```bash
# 登录npm账号
npm login

# 发布（会自动运行 prepublishOnly 脚本进行构建）
npm publish --access public
```

### 方式2：发布到私有npm

```bash
# 配置私有仓库
npm config set registry http://your-private-npm-registry.com

# 登录
npm login --registry http://your-private-npm-registry.com

# 发布
npm publish
```

### 方式3：本地测试（npm link）

```bash
# 在SDK包目录
cd packages/vue-starfall
npm link

# 在你的测试项目中
cd /path/to/your/project
npm link @vjsplus-j/vue-starfall
```

---

## 💻 在其他项目中使用

### 1. 安装

```bash
npm install @vjsplus-j/vue-starfall
# 或
yarn add @vjsplus-j/vue-starfall
```

### 2. 全局注册

```typescript
// main.ts
import { createApp } from 'vue'
import VueStarfall from '@vjsplus-j/vue-starfall'
import '@vjsplus-j/vue-starfall/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueStarfall)
app.mount('#app')
```

### 3. 使用组件

```vue
<template>
  <GalaxyBackground>
    <div class="content">
      <h1>欢迎</h1>
    </div>
  </GalaxyBackground>
</template>
```

---

## 🎨 三种组件用法

### 1. GalaxyBackground（推荐）

统一容器，默认使用AI星空主题：

```vue
<template>
  <GalaxyBackground>
    <YourContent />
  </GalaxyBackground>
</template>

<script setup>
import { GalaxyBackground } from '@vjsplus-j/vue-starfall'
</script>
```

### 2. AIBrain（AI星空主题）

```vue
<template>
  <div style="position: relative; min-height: 100vh; background: #000;">
    <AIBrain />
    <div style="position: relative; z-index: 10;">
      <YourContent />
    </div>
  </div>
</template>

<script setup>
import { AIBrain } from '@vjsplus-j/vue-starfall'
</script>
```

### 3. AndromedaGalaxy（仙女座星系主题）

```vue
<template>
  <div style="position: relative; min-height: 100vh; background: #000;">
    <AndromedaGalaxy :star-count="720" />
    <div style="position: relative; z-index: 10;">
      <YourContent />
    </div>
  </div>
</template>

<script setup>
import { AndromedaGalaxy } from '@vjsplus-j/vue-starfall'
</script>
```

---

## 🔧 配置选项

### AIBrain Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `starCount` | `number` | `150` | 星星数量 |
| `particleCount` | `number` | `20` | 环绕粒子数量 |

### AndromedaGalaxy Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `centerX` | `number` | `32` | 星系中心X坐标（%） |
| `centerY` | `number` | `50` | 星系中心Y坐标（%） |
| `starCount` | `number` | `720` | 星星总数 |
| `coreRatio` | `number` | `0.20` | 核心区比例 |
| `armRatio` | `number` | `0.70` | 螺旋臂比例 |

---

## 🛠️ 开发命令

```bash
# 安装依赖
yarn install

# 开发模式（需要配置dev入口）
yarn dev

# 构建
yarn build

# 预览构建结果
yarn preview
```

---

## 📂 目录结构

```
packages/vue-starfall/
├── src/
│   ├── components/          # 组件源码
│   │   ├── AIBrain.vue
│   │   ├── AndromedaGalaxy.vue
│   │   └── GalaxyBackground.vue
│   ├── types.ts            # TypeScript类型定义
│   └── index.ts            # 入口文件
├── dist/                   # 构建产物（生成）
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

---

## 🐛 常见问题

### Q1: 样式没有生效

**解决：** 确保导入了CSS文件

```typescript
import '@vjsplus-j/vue-starfall/style.css'
```

### Q2: TypeScript 类型错误

**解决：** 确保项目中有正确的类型声明

```typescript
// 导入类型
import type { AIBrainProps } from '@vjsplus-j/vue-starfall'
```

### Q3: 构建失败

**解决：** 确保安装了所有依赖

```bash
rm -rf node_modules yarn.lock
yarn install
yarn build
```

---

## 📝 版本更新流程

1. 修改代码
2. 更新 `CHANGELOG.md`
3. 更新 `package.json` 中的版本号
4. 构建：`yarn build`
5. 提交代码：`git commit -am "chore: release v1.x.x"`
6. 打标签：`git tag v1.x.x`
7. 推送：`git push && git push --tags`
8. 发布：`npm publish`

---

## 🔗 相关链接

- [npm包地址](https://www.npmjs.com/package/@vjsplus-j/vue-starfall)
- [GitHub仓库](https://github.com/vjsplus-j/vue-starfall)
- [问题反馈](https://github.com/vjsplus-j/vue-starfall/issues)
