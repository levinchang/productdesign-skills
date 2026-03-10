---
name: product-design-flow
description: "统一编排产品设计流程，在本地（Cursor/Codex）环境下串联 product-blueprint、product-featurelist 与 product-prd 等技能。兼容 0-1 与 1-n 场景，自动读取或初始化项目文档结构，生成/更新蓝图、Feature List 与 PRD，使 PM 更专注于决策与校准。"
---

# 产品设计一体化流程（Product Design Flow）

作为入口 skill，负责在本地可写环境中统一编排产品设计流程：根据用户给定的场景（0-1/1-n）、目标模块与已有材料，自动调用 `product-blueprint`、`product-featurelist` 与 `product-prd` 等技能，生成或更新对应的文档与目录结构。

---

## 何时使用

- 希望从 0-1 设计一个新产品/子系统，并一次性得到「蓝图 + Feature List + 初版 PRD」。
- 针对已有产品的 1-n 版本迭代，希望在统一入口下完成蓝图更新、Feature List 增量与相关 PRD 的调整。
- 希望 PM 只需要用自然语言描述「版本目标/改动范围」，其余由 AI 按既定文档规范自动落盘与追溯。

---

## 输入与模式

调用本 skill 时，应在对话中明确以下信息（可由 AI 追问补齐）：

- **mode（必需）**：`0-1` 或 `1-n`。
- **版本/迭代信息**：如「V1.0 首发」「V2.1 告警处理优化」。
- **目标与范围**：本次主要关注的领域/模块/场景。
- **已有材料（可选）**：旧 PRD、旧 Feature List、页面描述、链接或简要文字说明等。
- **期望产出**：例如「只要蓝图」「蓝图+Feature List」「蓝图+Feature List+PRD」等。

本 skill 本身不绑定具体参数格式，而是通过自然语言理解后，在内部决定调用哪些下游 skill。

---

## 本地执行流程（概念步骤）

1. **读取或初始化项目标准参考文档**
   - 按各下游 skill 约定的优先级，尝试读取项目中的标准参考文档（如 `product-doc-standard/README.md`）。
   - 若不存在，则基于下游 skill 附带的 `product-doc-standard/README.md` 模板，在仓库根创建最小默认版本，约定：
     - 文档根目录（默认 `docs/`）；
     - 蓝图文件路径（默认 `docs/01_blueprint.md`）；
     - Feature List 路径（默认 `docs/02_featurelist.md`）；
     - PRD 根目录（默认 `docs/prd/`）。

2. **根据 mode 分流**
   - **0-1 模式**：
     - 调用 `product-blueprint`：生成或更新蓝图与场景说明文档；
     - 调用 `product-featurelist`：基于蓝图的领域/模块/能力生成首版 Feature List；
     - 如用户要求生成 PRD，则按指定模块/FeatureList 编号调用 `product-prd` 生成对应 PRD 文件与 PlantUML 图表/附录。
   - **1-n 模式**：
     - 读取既有蓝图、Feature List 与 PRD，结合用户提供的版本目标与范围，识别受影响的领域/模块/场景；
     - 调用 `product-blueprint`：在蓝图中新增/更新本次版本相关的目标与场景变化；
     - 调用 `product-featurelist`：对相关模块进行增量更新，或按项目约定派生新版本的 Feature List 文件；
     - 如需要更新 PRD，则调用 `product-prd` 更新受影响模块的 PRD 内容与 PlantUML 图表/附录。

3. **结果汇总与反馈**
   - 在对话中以简短列表形式汇总：
     - 本次新建或更新的文件路径（蓝图、Feature List、PRD 等）；
     - 每类文档的关键变更点摘要（例如：新增了哪些模块/场景/功能）。

---

## 与其它 Skill 的关系

- **product-blueprint**：负责「背景/角色/场景/能力地图」层，是本 skill 的上游第一步。
- **product-featurelist**：负责「可排期的功能清单」层，绑定蓝图中的场景与能力 ID。
- **product-prd**：负责「模块/功能级 PRD」层，承接 Feature List 的编号，并嵌入 UML/PlantUML 图表与附录。

本 skill 自身不规定具体的文档内容细节，只负责**编排顺序与落盘行为**；具体写作规范由各下游 skill 的 `SKILL.md` 与其附带的 `product-doc-standard/README.md` 决定。

