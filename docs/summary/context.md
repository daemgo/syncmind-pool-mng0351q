# 项目上下文

---
### 2026-04-02
**Skills**: init-app
**变更**: 生成完整前端 Demo

- 系统类型：访客应用系统
- 模块：访客管理、员工管理、数据概览（Dashboard）
- 数据来源：用户对话（Mode C）

**项目结构**:
- 侧边导航：src/components/layout/sidebar.tsx
- 根布局：src/routes/__root.tsx
- 数据字典：src/lib/dict.ts
- Dashboard：src/routes/index.tsx
- 访客路由：src/routes/visitor/（index.tsx、$id.tsx）
- 员工路由：src/routes/employee/（index.tsx、$id.tsx）
- 访客组件：src/components/visitor/（filter-bar、table、detail、form-dialog）
- 员工组件：src/components/employee/（filter-bar、table、detail、form-dialog）
- Mock 数据：src/mock/visitor.ts、src/mock/employee.ts
- 类型定义：src/types/visitor.ts、src/types/employee.ts
