# 📦 Vue Starfall 发布指南

> **作者**: 李飞恒  
> **版权**: Copyright © 2025 李飞恒. All rights reserved.

---

## 🚀 发布到 npm

### 1. 准备工作

确保你已经:
- ✅ 注册了 npm 账号
- ✅ 在本地登录了 npm (`npm login`)
- ✅ 包名可用 (检查: `npm info @lifeiheng/vue-starfall`)

### 2. 发布前检查

```bash
# 1. 确保所有依赖已安装
yarn install

# 2. 构建项目
yarn build

# 3. 检查 dist 目录
ls -la dist/

# 应该包含:
# - index.js (ES 模块)
# - index.cjs (CommonJS 模块)
# - index.d.ts (TypeScript 类型声明)
# - style.css (样式文件)
```

### 3. 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

### 4. 发布到 npm

```bash
# 首次发布 (公开包)
npm publish --access public

# 后续发布
npm publish
```

### 5. 验证发布

```bash
# 检查包信息
npm info @lifeiheng/vue-starfall

# 在新项目中测试安装
mkdir test-project
cd test-project
npm init -y
npm install @lifeiheng/vue-starfall
```

---

## 📋 发布检查清单

在发布前,请确认:

- [ ] 代码已提交到 Git
- [ ] 版本号已更新
- [ ] CHANGELOG.md 已更新
- [ ] 构建成功 (`yarn build`)
- [ ] 类型声明文件存在 (`dist/index.d.ts`)
- [ ] package.json 信息正确
- [ ] README.md 文档完整
- [ ] LICENSE 文件存在

---

## 🔄 本地测试

在发布前,建议先本地测试:

### 方法 1: npm link

```bash
# 在 vue-starfall 目录
npm link

# 在测试项目目录
npm link @lifeiheng/vue-starfall
```

### 方法 2: 直接安装本地包

```bash
# 在测试项目目录
npm install /path/to/vue-starfall
```

---

## 📊 包大小优化

当前包大小:
- `index.js`: ~5.9KB (gzip: ~2.5KB)
- `index.cjs`: ~6.9KB (gzip: ~2.6KB)
- `style.css`: ~5.7KB (gzip: ~1.8KB)

**总计**: ~18.5KB (未压缩), ~6.9KB (gzip)

---

## 🌐 发布到私有 npm 仓库

如果需要发布到私有仓库:

### 1. 配置 .npmrc

```bash
# 编辑 .npmrc
registry=https://your-private-registry.com/
//your-private-registry.com/:_authToken=${NPM_TOKEN}
```

### 2. 更新 package.json

```json
{
  "publishConfig": {
    "registry": "https://your-private-registry.com/"
  }
}
```

### 3. 发布

```bash
npm publish
```

---

## 🔐 安全建议

1. **不要提交敏感信息**
   - npm token
   - 私钥
   - 密码

2. **使用 .npmignore**
   - 已配置,无需额外操作

3. **启用 2FA**
   ```bash
   npm profile enable-2fa auth-and-writes
   ```

---

## 📝 版本管理策略

遵循 [Semantic Versioning](https://semver.org/):

- **主版本** (MAJOR): 不兼容的 API 变更
- **次版本** (MINOR): 向下兼容的功能新增
- **修订版本** (PATCH): 向下兼容的问题修正

示例:
- `1.0.0` → `1.0.1`: 修复bug
- `1.0.1` → `1.1.0`: 新增功能
- `1.1.0` → `2.0.0`: 破坏性变更

---

## 🎯 发布后工作

1. **创建 Git Tag**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **GitHub Release**
   - 在 GitHub 创建 Release
   - 附加 CHANGELOG
   - 上传构建产物

3. **更新文档**
   - 更新示例
   - 更新版本号
   - 发布公告

4. **社区通知**
   - 发布博客
   - 社交媒体分享
   - 通知用户

---

## ❓ 常见问题

### Q: 发布失败,提示包名已存在?
**A**: 更换包名或使用 scope (`@username/package-name`)

### Q: 如何撤回已发布的版本?
**A**: 
```bash
# 只能撤回24小时内的版本
npm unpublish @lifeiheng/vue-starfall@1.0.0
```

### Q: 如何废弃某个版本?
**A**:
```bash
npm deprecate @lifeiheng/vue-starfall@1.0.0 "This version is deprecated"
```

---

## 📞 支持

如有问题,请联系:
- 📧 Email: your-email@example.com
- GitHub Issues: https://github.com/vjsplus-j/vue-starfall/issues

---

**Made with ⭐ by 李飞恒**
