# Product Design Skills README

这是 Levin 的产品设计 / PRD skill 体系。  
当前版本的核心目标是：让产品文档从“文档驱动”升级为“工件驱动”，以 `Spec` 作为 PRD 与原型的共同事实源，降低幻觉与返工。

---

## 1. 设计目标

- 统一处理 `0-1` 新产品设计与 `1-n` 版本迭代
- 支持“用户指定先做项”与“按优先级推进”双入口
- 一次只推进一个最小闭环（单个 `目标项ID（feature_id 或 module_id）` 或强耦合小组）
- 建立 `FeatureList -> Spec -> PRD -> Prototype -> Patch` 的稳定追溯链
- 保证 PRD 面向研发协作，但不包含技术设计细节

---

## 2. 技能清单（6 个）

- `product-design-flow`：入口编排与门禁控制
- `product-blueprint`：产品定位、市场洞察、场景与边界决策
- `product-featurelist`：模块级功能清单 + 轻量计划字段
- `product-spec`：结构化事实源（中间层）
- `product-prd`：研发协作 PRD 渲染器
- `prototype-generator`：高保真原型编译器（Next.js 基线）

---

## 3. 标准链路

```text
design-flow -> blueprint -> featurelist -> spec -> prd -> prototype-generator -> patch
```

说明：
- `spec` 是单一事实源。
- `prd` 和 `prototype-generator` 产物都应从 `spec` 派生。
- 原型确认后必须先回写 `spec`，再回写 `prd`。

---

## 3.1 场景路由（实战）

### 场景 A：已有目标项ID（feature_id 或 module_id），要做原型

`featurelist -> spec -> prototype-generator -> patch`

### 场景 B：已有 PRD，要做原型

`prd(校正) -> prd-to-spec(编译) -> prototype-generator -> patch`

规则：PRD 不能直接生成高保真原型，必须先转 Spec。

### 场景 C：只有截图/想法，要先出 PRD

`prd(独立访谈收敛 -> 正式PRD) -> (可选) spec -> prototype-generator`

说明：该场景可先不走 blueprint/featurelist，但后续要做高保真原型时仍需补 Spec。

---

## 4. 各 Skill 职责

### 4.1 `product-design-flow`

负责：
- 识别 `0-1/1-n` 场景
- 锁定本轮 item（用户指定优先；否则按 Ready+优先级）
- 执行门禁 A/B/C
- 串联下游 skill 并输出本轮结果

### 4.2 `product-blueprint`

负责：
- 产品定位、价值主张、市场洞察（含竞品扫描）
- 用户角色、关键场景、能力地图
- 产品边界、关键约束、风险假设与阶段策略
- 输出场景 ID / 能力 ID
- 标注本轮先做项（可选）
- 标注冻结边界与待确认项

### 4.3 `product-featurelist`

负责：
- 一级/二级菜单与模块级功能项梳理
- 维护轻量计划字段：`优先级/状态/依赖/计划迭代/Ready`
- 允许细项暂缺并在 PRD 收敛后回填
- 提供“指定先做项”与“按优先级推进”双模式

### 4.4 `product-spec`

负责：
- 生成结构化页面与交互规范
- 约束列表/新建/详情/删除等关键页面规则
- 承担 PRD 与原型的共同事实源

### 4.5 `product-prd`

负责：
- 从 `spec` 渲染研发协作 PRD
- 可按模块成篇，但篇内必须按 Story 拆分最小闭环
- 每篇先产出“模块功能清单（Story级编号）”，再展开正文
- 强调可测试、可验收、可追溯
- 严禁技术设计细节（字段键名、数据库、接口路径等）

### 4.6 `prototype-generator`

负责：
- 从 `spec` 生成高保真原型（Next.js App Router + TypeScript + Tailwind + shadcn/ui）
- 覆盖关键页面与关键状态（默认/加载中/空态/失败态）
- 输出可回写标识 `prototype_change_id`
- 禁止新增 Spec 未定义业务逻辑
- 内置模板：`prototype-generator/assets/nextjs-template/`
- Prompt 模板：`prototype-generator/prototype_prompt_template.md`（缺失时使用 skill 内置默认模板）

---

## 5. 门禁机制（关键）

- Gate A：需求澄清完备（深度访谈到共享理解后，目标、主流程、异常、关键字段、状态、验收均已确认）
- Gate B：Spec 完备（页面、字段、动作、状态、约束）
- Gate C：Patch 白名单（文案优化/交互微调/字段增删/状态补充）

任一门禁不通过，不进入下一阶段。

---

## 6. PRD 协作原则

- PRD 面向研发协作，核心是业务逻辑与交互规则
- 可按模块生成单篇 PRD，但必须 Story 化拆分
- 每个 Story 必须可测试、可验收、可形成最小闭环
- 关键页面至少写清：
  - 列表：按钮、操作、筛选、字段、排序、冻结列
  - 新建：字段说明、交互形式、校验
  - 详情：标题栏、按钮、查看态/操作态
  - 删除：删除限制、关联阻断、二次确认弹窗

---

## 7. 目录建议

具体路径以项目内 `product-doc-standard/README.md` 为准。  
未约定时可参考：

- `docs/01_blueprint.md`
- `docs/02_feature_list.md`
- `docs/03_spec/`
- `docs/03_prd/`
- `docs/04_prototype/`

---

## 8. 适用范围

更适合：
- Web / B 端后台产品
- 中后台业务平台
- 需要高一致性（FeatureList/PRD/原型）协作的团队

若用于 C 端、硬件端或探索型项目，可按需轻量化裁剪。

---

## 9. 方法论参考（原则化）

本仓库采用“方法约束，不固定问卷”策略，可按阶段参考：

- `blueprint`：Double Diamond / JTBD / OST
- `featurelist`：Story Mapping / RICE(或WSJF) / INVEST
- `prd`：Event Storming / FMEA / BDD 验收表达

目标是提升访谈深度与决策质量，而不是强制套用统一问题清单。
