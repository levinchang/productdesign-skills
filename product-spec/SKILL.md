---
name: product-spec
description: "结构化产品设计事实源。将单个 feature/story 固化为可机器消费的页面与交互规范，作为 PRD 与原型的共同上游。"
---

# 产品结构化规范（Product Spec）

本 skill 产出单一事实源（Spec）。目标是让 PRD 与原型都从同一份结构化事实渲染，避免二者漂移。

---

## 何时使用

- 已确定本轮要推进的 `feature_id`。
- 需要把业务需求固化为可执行结构，供 PRD/原型复用。
- 原型确认后，需要回写并同步 PRD 时。

---

## 输入

- feature_id
- 场景与目标
- 页面范围
- 关键字段
- 操作与状态
- 验收口径

---

## 输出结构（建议）

每个 feature 一份 spec（Markdown 或 JSON 均可），至少包含：

1. `meta`
   - `feature_id`
   - `spec_version`
   - `owner`
   - `updated_at`

2. `page_map`
   - 页面清单与页面职责
   - 页面间跳转关系

3. `page_schema`
   - 页面结构区块
   - 列表页：按钮、操作、筛选条件、列表字段、排序规则、冻结列（如有）
   - 新建页：字段说明、交互形式、校验规则
   - 详情页：标题栏、按钮、主要内容（查看态/操作态）
   - 删除动作：删除限制、关联阻断、二次确认弹窗规则

4. `interaction_rules`
   - 核心操作流程
   - 状态机（默认/加载中/成功/失败/空态）
   - 异常与恢复路径

5. `acceptance_map`
   - 可测试最小闭环条目
   - PRD 章节映射

---

## 约束

- Spec 只描述业务逻辑、页面行为、交互规则。
- 严禁写技术设计：字段键名、数据库结构、接口契约、服务实现。
- 原型与 PRD 均以 Spec 为上游，不得脱离 Spec 自由扩写。

---

## 回写机制

- 原型确认后，先更新 Spec 并记录 `prototype_change_id`。
- 由更新后的 Spec 回写 PRD Patch。
- Patch 白名单：文案优化、交互微调、字段增删、状态补充。

