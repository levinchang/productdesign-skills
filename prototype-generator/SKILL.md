---
name: prototype-generator
description: "基于 product-spec 生成高保真前端原型（Next.js App Router + TypeScript + Tailwind + shadcn/ui）。当用户需要从已确认的 feature/spec 产出可演示、可继续演进的页面原型时使用；支持列表/新建/详情/删除等中后台场景，强制状态覆盖与交互约束，并输出可回写的 prototype_change_id。"
---

# 高保真原型生成（Prototype Generator）

将单个 `feature_id` 的 Spec 编译为高保真原型页面，默认技术栈：

- Next.js（App Router）
- TypeScript
- Tailwind CSS
- shadcn/ui

本 skill 只负责原型实现与交互表达，不负责业务需求发散；业务事实以 `product-spec` 为准。

---

## 模板资产（先复制再实现）

仓库内已提供可运行模板：

- `prototype-generator/assets/nextjs-template/`
- `prototype-generator/prototype_prompt_template.md`（Spec -> 原型提示词模板）

使用规则：

1. 先复制模板到项目原型目录；
2. 再根据 Spec 填充页面与交互；
3. 不要跳过模板直接从零生成。

### Prompt 模板兜底规则（必须）

- 优先读取：`prototype-generator/prototype_prompt_template.md`。
- 若该文件不存在或不可读取，则直接使用以下内置默认模板继续执行，不得中断：

```text
请基于同一版本 Spec 生成原型，不得新增 Spec 未定义页面/字段/流程。

输入：
- 目标项ID：{feature_id_or_module_id}
- spec_version：{spec_version}
- page_scope：{page_scope}
- locked_fields：{locked_fields}
- locked_flows：{locked_flows}
- locked_pages：{locked_pages}
- locked_acceptance：{locked_acceptance}

输出必须包含：
1) 页面骨架：主操作区/筛选区/列表区/详情区与页面跳转关系
2) 交互规则：按钮生命周期、表单校验、列表规则、删除确认
3) 状态边界：默认/加载中/空态/失败态/无权限
4) 变更记录：
   - prototype_change_id
   - scope
   - changes
   - blocked
   - needs_prd_patch

冲突处理：
- 若发现 Spec 与目标输出冲突，输出冲突清单并停止，不得自行发明业务逻辑。
```

---

## 输入要求（必须）

1. `input_mode`：`spec` 或 `prd`
2. `feature_id`
3. 当 `input_mode=spec`：
   - `spec_version`
   - 页面范围（`page_scope`）
   - 不可改动约束（`locked_fields` / `locked_flows` / `locked_pages`）
   - 验收映射（至少列出本轮关键可测试点）
4. 当 `input_mode=prd`：
   - PRD 输入（文档或文本）
   - 先执行 `PRD -> Spec` 编译，再进入原型生成

若缺失任一项，先返回“缺失清单”，不直接生成。

---

## 双模式执行

1. **Spec 模式（默认推荐）**
   - 直接读取 Spec 生成高保真原型
2. **PRD 模式（快捷入口）**
   - 先把 PRD 编译为 Spec（最小结构化合同）
   - 编译成功后再生成原型

硬规则：PRD 不得直接跳过 Spec 生成高保真原型。

---

## 输出要求（必须）

1. 页面原型代码（按项目约定目录落盘）
2. 原型变更编号：`prototype_change_id`
3. 本轮改动清单：`scope / changes / blocked / needs_prd_patch`
4. 状态覆盖清单（默认/加载中/空态/失败态/无权限）
5. 操作点覆盖清单（按钮、筛选、行操作、删除确认等）

---

## 生成规则

### 1) 只做当前 item

- 一次只实现一个 `feature_id`（或强耦合小组）。
- 禁止跨 feature 混合改动。

### 2) 严格遵循 Spec

- 禁止新增 Spec 未定义页面、字段、流程。
- 若存在冲突，输出冲突清单并停止，不自行扩写业务逻辑。

### 3) 页面与交互最低覆盖

- 列表页：
  - 筛选区、列表区、行操作、批量操作（如有）
  - 排序规则与冻结列（若 Spec 定义）
- 新建页：
  - 字段、控件类型、校验、错误提示
- 详情页：
  - 标题栏、按钮、查看态/操作态
- 删除动作：
  - 删除限制、关联阻断、二次确认弹窗

### 4) 状态覆盖（强制）

- 默认态
- 加载中
- 空态
- 失败态
- 无权限（如 Spec 定义）

### 5) 工程质量（原型级）

- 组件拆分清晰，避免单文件过大
- 类型声明明确，避免 `any` 泛滥
- 使用 mock data / mock service，不接真实后端
- 页面可在桌面与移动宽度下正常展示

---

## 推荐目录结构（Next.js）

```text
prototype/
  app/
    (feature)/
      page.tsx
  components/
    feature/
      list-table.tsx
      filters.tsx
      detail-panel.tsx
      form-dialog.tsx
  lib/
    mock/
      feature-data.ts
  docs/
    prototype-change-log.md
```

如项目已有约定目录，优先遵循项目约定。

---

## 与其它 Skill 的协作

- 上游：`product-spec`
  - 读取结构化事实，不自由补脑
- 回写：`product-design-flow` / `product-prd`
  - 原型确认后先更新 Spec，再由 Spec 回写 PRD Patch
