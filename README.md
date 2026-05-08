# 汽车租赁静态项目 (Car Rental Landing)

这是一个基于原生 HTML5/CSS3/JavaScript 开发的高端汽车租赁静态着陆页。项目严格遵循无框架（No-Framework）策略，强调代码的语义化、美观度及原生性能。

## ✨ 核心特性

- **纯原生技术栈**：零依赖，仅使用 Vanilla JS 和 CSS Variables/Flexbox/Grid。
- **现代化设计**：视觉层次清晰，无紫色背景，交互流畅。
- **完全本地化**：所有资源（图片、字体引用）均已本地化或优化，无需远程 CDN 依赖。
- **交互反馈**：内置轻量级 Toast 通知系统，模拟真实用户交互。
- **登录状态模拟**：使用 `localStorage` 模拟完整的登录/登出流程及 UI 状态同步。
- **实时搜索**：支持按车型或关键词实时过滤车辆卡片。

## 🛠️ 项目结构

```
CarRentalLanding/
├── docker-compose.yml       # 容器化启动配置
├── frontend/
│   ├── src/
│   │   ├── css/
│   │   │   └── style.css    # 核心样式表
│   │   ├── js/
│   │   │   └── main.js      # 核心逻辑 (Auth, Search, Toast)
│   │   ├── assets/
│   │   │   └── images/      # 本地车辆图片资源
│   │   ├── index.html       # 首页 (中文)
│   │   └── login.html       # 登录页 (中文)
│   ├── tests/
│   │   └── e2e.spec.js      # Playwright 测试脚本
│   ├── package.json         # 测试依赖配置
│   └── Dockerfile           # Nginx 镜像构建
└── README.md                # 项目文档
```

## 🚀 启动指南 (How to Run)

### 方式一：Docker 启动 (推荐)

直接在项目根目录运行：

```bash
docker compose up
```

访问地址：**http://localhost:3000**

### 方式二：本地开发

1. 进入 frontend 目录
2. 使用任意静态服务器启动 (如 Live Server 或 Python `http.server`)

## 💡 功能演示

1. **登录模拟**：
   - 点击右上角“登录”按钮 -> 跳转至登录页。
   - 输入任意非空邮箱和密码 -> 登录成功。
   - 首页右上角变为“欢迎, Admin User”和“退出登录”。

2. **搜索功能**：
   - 在“取车地点”输入框键入关键词（如 "Tesla"）。
   - 点击“搜索车辆”按钮 -> 仅显示匹配的卡片。
   - 输入无关词汇（如 "UFO"） -> 显示“未找到匹配车型”提示。

3. **租车交互**：
   - **未登录**：点击“立即租车” -> 提示需登录并跳转。
   - **已登录**：点击“立即租车” -> 提示预订成功，卡片显示“已预订”标签。

## 🧪 运行测试 (Testing)

由于本地网络环境可能导致 Playwright 浏览器下载失败，**强烈推荐使用 Docker 运行测试** (无需本地安装依赖)。

```bash
# 运行测试容器
docker compose run --rm tests
```

如果坚持使用本地环境：

```bash
cd frontend
# 1. 设置淘宝镜像加速 (可选)
npm config set registry https://registry.npmmirror.com
# 2. 安装依赖
npm install
# 3. 手动下载浏览器 (需要网络畅通)
npx playwright install
# 4. 运行测试
npm test
```
