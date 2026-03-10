---
name: product-doc-structure
description: "当用户要求创建、更新或说明「产品文档结构标准」时，可生成或复制 product-doc-standard/README.md 到项目中。日常使用中不要求启用本 skill；product-featurelist 与 product-prd 以项目内标准参考文档为准，可在任意编辑器中按该标准执行。"
---

# 产品文档结构标准（可选技能）

本 skill 为**可选**。仅当用户明确要求「创建/更新产品文档结构标准」「生成文档规范」「写一份产品文档结构 README」时使用。

---

## 何时使用

- 用户要求为项目**创建**或**更新**产品文档结构标准时。
- 用户要求**说明**或**导出**当前项目所采用的文档结构规范时。
- 用户希望把「产品文档结构」写成一份可在**任意编辑器、非 Cursor 环境**下使用的参考文档时。

**不需要使用本 skill 的情况**：撰写 Feature List、撰写 PRD、根据 PRD 出原型时，由 product-featurelist 与 product-prd 直接读取项目内的**标准参考文档**即可，无需依赖本 skill。

---

## 标准参考文档（与编辑器无关）

产品文档结构以**项目内的标准参考文档**为准，不依赖本 skill。推荐做法：

- 将 **product-doc-standard/README.md**（或等价的单文件如 `PRODUCT_DOC_STRUCTURE.md`、`产品文档结构规范.md`）放在项目中文档根或 `docs/` 下。
- 该 README 内容为完整的「文档根与两区、追溯链、PRD 八段式、索引表、原型约定、检查清单及附录模板」。
- 在 Cursor 中：product-featurelist 与 product-prd 会**优先查找并遵循**该文件。
- 在非 Cursor 环境：任何人可打开该 README 按规范执行，协作、评审、落地均不依赖 Cursor。

---

## 本 skill 的执行方式

当用户要求创建或更新标准时：

1. 若项目中已存在 `product-doc-standard/README.md` 或 `docs/PRODUCT_DOC_STRUCTURE.md` 等，则在其基础上按用户需求增改。
2. 若不存在，则从**标准参考格式**生成一份完整 README，建议路径：
   - `product-doc-standard/README.md`（推荐，便于整目录复制到其他项目），或
   - `docs/PRODUCT_DOC_STRUCTURE.md`，或
   - 文档根下的 `产品文档结构规范.md`。
3. 内容需包含：文档根与两区、追溯链、PRD 目录与命名、八段式、索引表、原型目录与规范、根据 PRD 生成原型、tech/、检查清单、附录（PRD 模板、索引表格式、原型对应表格式）。

标准参考格式的完整内容见项目内 **product-doc-standard/README.md**（若已存在）或本 skill 同目录下 REFERENCE.md 中的结构说明。
