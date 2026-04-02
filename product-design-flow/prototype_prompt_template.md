# Spec -> 原型 Prompt 编译模板

用途：把 `product-spec` 的结构化内容编译为原型生成输入，避免直接用长 PRD 生成导致漂移。

---

## 0. 输入前提

- 输入必须来自同一版本的 Spec：`feature_id + spec_version`
- 若缺少以下任一项，禁止生成原型：
  - 页面清单
  - 字段清单
  - 关键动作
  - 状态清单
  - 不可改动约束

---

## 1. Block A：页面骨架（Layout）

```text
请严格依据以下 Spec 生成页面骨架，不要发明新页面。

【来源】
- feature_id: {feature_id}
- spec_version: {spec_version}
- pages: {page_ids}

【范围】
- 本次仅生成: {page_scope}
- 禁止改动: {locked_pages}

【输出】
- 页面区块结构
- 主操作区/筛选区/列表区/详情区
- 页面间跳转关系
```

## 2. Block B：交互规则（Interaction）

```text
基于 Spec 的交互规则生成页面行为，必须覆盖：
- 按钮生命周期：默认/执行中/成功/失败
- 表单校验：必填、格式、错误提示
- 列表规则：筛选、排序、分页、冻结列（如有）
- 删除规则：删除限制、关联阻断、二次确认

禁止新增 Spec 未定义字段或流程。
```

## 3. Block C：状态与边界（State & Edge）

```text
按 Spec 补全状态与边界：
- 默认态
- 加载中
- 空态
- 失败态
- 无权限

输出格式：场景 -> 触发条件 -> 页面反馈 -> 恢复路径
```

## 4. Block D：不可改动约束（Guardrails）

```text
必须遵循：
- 不改动字段：{locked_fields}
- 不改动流程：{locked_flows}
- 不改动验收口径：{locked_acceptance}
- 不新增页面：{no_new_pages}

若发现冲突，输出“冲突清单”并停止，不要自行修正。
```

---

## 2. 输出格式

```text
prototype_change_id: PT-YYYYMMDD-XX
feature_id: {feature_id}
spec_version: {spec_version}
scope: [...]
changes: [...]
blocked: [...]
needs_prd_patch: yes/no
```

---

## 3. 回写规则（Prototype -> Spec -> PRD）

- 原型确认后先更新 Spec，再 patch PRD。
- 仅允许白名单差异：
  - 文案优化
  - 交互微调
  - 字段增删
  - 状态补充
- 禁止无依据改动：
  - 业务目标
  - 核心流程闭环
  - 验收标准

