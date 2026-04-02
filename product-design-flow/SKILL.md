---
name: product-design-flow
description: "统一编排产品设计流程：blueprint -> featurelist -> spec -> prd -> prototype-generator -> patch。支持“用户指定先做项”与“按优先级推进”双入口，一次只推进一个最小闭环。"
---

# 产品设计一体化流程（Product Design Flow）

入口 skill。负责在本地可写环境中编排产品设计全流程，并确保 PRD 与原型围绕同一份结构化 Spec 协作，避免双向漂移。

---

## 何时使用

- 从 0-1 设计新产品/子系统。
- 1-n 版本迭代，需逐条推进并控制返工。
- 希望 PM 指定“先做哪个需求”，系统直接进入该需求闭环。

---

## 输入与模式

- **mode（必需）**：`0-1` 或 `1-n`
- **目标范围**：版本目标、模块、场景
- **先做项（可选）**：`feature_id` 或模块名
- **已有材料（可选）**：蓝图、Feature List、旧 PRD、旧原型

执行入口规则：
- 若用户指定先做项，直接进入该项；
- 若未指定，从 Feature List 中选 `Ready=Yes` 且优先级最高的条目。

---

## 场景路由（必须）

根据用户输入类型自动路由到合适流程：

1. **场景 A：已有 feature_id，直接做原型或迭代**
   - 路由：`featurelist -> spec -> prd -> prototype-generator`
2. **场景 B：已有 PRD，要生成原型**
   - 路由：`prd(校正) -> prd-to-spec(编译) -> prototype-generator`
   - 规则：禁止 PRD 直接生成高保真原型，必须先转 Spec。
3. **场景 C：只有截图/想法，要先出 PRD**
   - 路由：`prd(独立模式：Draft -> RD) -> (可选) spec -> prototype-generator`
   - 说明：此场景可跳过 blueprint/featurelist，但后续要做原型时仍需补 Spec。

---

## 核心流程（一次只做一个 item）

1. **读取或初始化项目标准文档**
   - 优先读取 `product-doc-standard/README.md`；
   - 无则按默认路径初始化文档结构。

2. **更新上游（按需）**
   - 需要时调用 `product-blueprint` 更新场景/目标；
   - 调用 `product-featurelist` 更新条目与状态字段。

3. **确定本轮 item**
   - 锁定一个 `feature_id`（或一小组强耦合编号）。

4. **最小需求澄清（门禁 A）**
   - 调用 `product-prd` 的深度访谈机制先形成共享理解；
   - 补齐：目标用户、主流程、异常流程、关键字段、状态、验收口径、非范围；
   - 缺任一关键项则输出待确认项并暂停，不生成 PRD/原型。

5. **生成/更新 Spec（门禁 B）**
   - 调用 `product-spec` 产出该 item 的结构化事实源；
   - 产出至少包含：页面清单、字段、动作、状态、约束、验收映射。

6. **从 Spec 渲染 PRD-RD**
   - 调用 `product-prd` 仅生成当前 item 的研发协作 PRD；
   - 严禁在 PRD 中写技术设计（字段键名、数据库结构、接口细节）。

7. **从 Spec 生成原型**
   - 调用 `prototype-generator` 生成高保真原型（Next.js 基线）；
   - 使用 `prototype_prompt_template.md` 编译提示词；
   - 仅在锁定范围内生成，冲突输出冲突清单并停止。

   **硬规则：没有 Spec，不生成高保真原型。**

8. **原型确认后回写（门禁 C）**
   - 记录 `prototype_change_id`；
   - 先回写 Spec，再由 Spec 反向 patch PRD；
   - 仅允许白名单差异：文案优化、交互微调、字段增删、状态补充。

---

## 输出要求

- 每轮必须输出：
  - 当前 item（编号/模块）
  - 新建或更新的文件路径
  - 本轮完成的最小闭环说明（可测试点）
  - 待确认项（若有）

---

## 与其它 Skill 的关系

- `product-blueprint`：定义上游场景与目标
- `product-featurelist`：维护编号、优先级与状态
- `product-spec`：单一事实源（中间层）
- `product-prd`：从 Spec 渲染研发协作文档
- `prototype-generator`：从 Spec 生成高保真原型

本 skill 负责编排，不替代各下游 skill 的写作细则。

