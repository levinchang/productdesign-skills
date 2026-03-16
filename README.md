# Product Design Skills README

这是 **Levin 的产品设计 / PRD skill 体系**。它的核心目标不是只生成“给人看”的产品文档，而是尽量打通从产品设计到 AI Coding 消费之间的链路，让产品文档可以进一步沉淀为 **AI 可读、可复用、可直接调用的 PRD Prompt**。

这套 skill 整体约定了：

- 产品设计阶段的文档分层与编排顺序
- Feature List 与 PRD 的编号和追溯规则
- PRD 的书写规范与结构约束
- 原型生成与落盘方式
- 本地项目中的文档目录结构与更新方式

因此，它尤其适合：

- 从 `0-1` 启动的新产品 / 新项目
- 希望让 AI Coding 能直接消费 PRD Prompt 的团队
- 希望在本地项目中建立稳定产品文档资产的场景

本 README 面向以下 4 个产品设计相关 skill：

- `product-design-flow`
- `product-blueprint`
- `product-featurelist`
- `product-prd`

这 4 个 skill 共同组成一条从产品规划到需求落盘的标准链路：

`design-flow -> blueprint -> featurelist -> prd`

目标不是生成一堆彼此孤立的文档，而是让产品蓝图、功能清单与 PRD 之间形成稳定的上游到下游追溯关系，便于产品、设计、研发、测试在同一套语义下协作。

---

## 1. 设计目标

这套 skill 的设计目标是：

- 用统一方法处理 `0-1` 新产品设计与 `1-n` 版本迭代
- 在本地可写环境中自动读取或初始化文档结构
- 让蓝图、Feature List、PRD 三层文档之间保持可追溯
- 降低 PM 在文档编排、编号维护、目录管理上的重复劳动
- 提高 AI 在产品文档生成过程中的一致性与可维护性

---

## 2. 四个 Skill 的角色分工

### 2.1 `product-design-flow`

入口编排 skill。

职责：

- 识别用户当前是 `0-1` 还是 `1-n`
- 读取项目中的文档结构规范
- 决定本次需要调用哪些下游 skill
- 统一汇总本次生成或更新的文档结果

适合场景：

- 希望一句话描述版本目标，然后由 AI 自动串联蓝图、Feature List 与 PRD
- 希望在同一入口下完成整轮产品文档设计工作

---

### 2.2 `product-blueprint`

负责上游业务蓝图。

职责：

- 梳理需求背景、业务目标、用户角色
- 明确关键场景与范围边界
- 输出能力地图
- 为下游 Feature List 与 PRD 提供场景 ID、能力 ID 等追溯来源

适合场景：

- 新产品立项
- 版本规划前需要先澄清范围与价值
- 需要统一“为什么做、给谁做、在哪些场景做”

---

### 2.3 `product-featurelist`

负责中间层功能清单。

职责：

- 按统一表头拆解功能清单
- 为每个功能生成稳定编号
- 明确领域、模块、页面、功能点和可选子功能
- 作为 PRD 编写与排期的直接输入

当前推荐表头核心思路：

- `领域（Domain）`
- `一级（菜单/模块）`
- `二级（菜单/页面）`
- `功能（页内能力）`
- `子功能（可选）`
- `涉及端`

设计原则：

- 一行 = 一个可单独评审与排期的 Story
- 编号承担主归属端信息
- `涉及端` 表达实际受影响端，不再单独保留 `端（Client）`

---

### 2.4 `product-prd`

负责下游 PRD。

职责：

- 承接 Feature List 编号逐篇生成或更新 PRD
- 明确页面结构、交互逻辑、字段规格、边界规则
- 在复杂流程下按需补充 Mermaid 或 PlantUML 图
- 保持 PRD 与 Feature List、蓝图之间可追溯

设计原则：

- 默认一条 Feature 对应一篇 PRD
- 仅允许极少数强耦合小组 Feature 合并成一篇 PRD
- 文档以产品经理视角描述业务和交互，不展开技术实现

---

## 3. 推荐使用顺序

标准顺序如下：

1. `product-design-flow`
2. `product-blueprint`
3. `product-featurelist`
4. `product-prd`

对应关系：

- `design-flow` 决定本轮要做什么
- `blueprint` 说明为什么做、解决什么问题
- `featurelist` 说明拆成哪些可排期功能
- `prd` 说明每个功能具体怎么做

如果只做局部工作，也可以单独调用：

- 只需要梳理背景与场景：用 `product-blueprint`
- 只需要出功能清单：用 `product-featurelist`
- 已有 Feature List，只需要补 PRD：用 `product-prd`

---

## 4. 典型产出链路

### 4.1 0-1 新产品

常见产出顺序：

1. 生成 `01_blueprint.md`
2. 生成 `02_feature_list.md`
3. 按 Feature 编号逐步生成 `03_prd/...`

适合：

- 新平台
- 新子系统
- 新业务域

---

### 4.2 1-n 版本迭代

常见产出顺序：

1. 更新蓝图中的版本目标与影响范围
2. 增量更新 Feature List
3. 更新受影响 Feature 对应的 PRD

适合：

- 模块增强
- 流程优化
- 新页面补充
- 旧规则重构

---

## 5. 文档追溯关系

推荐遵循以下追溯链：

- 蓝图中维护 `场景 ID / 能力 ID`
- Feature List 中维护 `功能编号`，并在说明中引用必要的 `SCN/CAP`
- PRD Header 中引用：
  - `对应 FeatureList 编号`
  - `对应蓝图场景 ID（SCN-xx）`
  - `对应能力 ID（CAP-xx）`

这样可以保证：

- 从蓝图能追到 Feature
- 从 Feature 能追到 PRD
- 从 PRD 能反查上游业务背景和能力来源

---

## 6. 使用建议

### 6.1 何时优先用整套链路

适合：

- 新产品或新模块从无到有
- 版本范围较大，影响多个模块
- 希望形成完整文档资产

### 6.2 何时只用局部 skill

适合：

- 已有蓝图，只补功能清单
- 已有 Feature List，只写某几个 PRD
- 对已有文档做局部修订

### 6.3 编写习惯建议

- 蓝图不要写成 PRD
- Feature List 不要写成模块目录树
- PRD 不要写成技术设计文档
- 编号一旦进入协作阶段，尽量不要频繁重排

---

## 7. 文件与目录建议

具体路径以项目内 `product-doc-standard/README.md` 为准。

若项目尚未约定，通常建议使用：

- `docs/01_blueprint.md`
- `docs/02_feature_list.md`
- `docs/03_prd/`

并在 PRD 目录内维护必要的索引 README 或映射表。

---

## 8. 来源说明

本套 skill 为本地化重构与扩展版本，部分设计思路、文档结构启发与写法参考，借鉴自：

- [Kira-product-monster-skills](https://github.com/Kira2red/Kira-product-monster-skills)

在此基础上，当前版本做了以下方向上的本地化调整：

- 强化了本地落盘行为
- 强化了蓝图 -> Feature List -> PRD 的追溯链
- 调整了 Feature List 表头与编号策略
- 调整了 PRD 的拆分粒度与图表策略
- 更适配 Cursor / Codex 本地协作场景

---

## 9. 当前适用范围

这套 skill 目前更适合：

- Web / B 端后台产品
- 中后台业务平台
- 需要较强文档追溯和版本规划的产品团队

若用于 C 端、硬件端、纯原型探索型项目，也可以使用，但建议根据项目风格再做轻量化裁剪。
