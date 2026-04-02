# Product Design Repo Rules

## 1) Single Source of Truth
- `product-spec` is the canonical source.
- PRD and prototype must both be derived from spec.

## 2) Item-by-Item Delivery
- Do not generate PRDs for all features at once.
- Work one `feature_id` (or one strongly-coupled small group) per iteration.

## 3) No Technical Design in PRD
- PRD must not include field keys, database schema, API routes, table names, or service implementation.
- PRD must focus on business logic, user interaction, boundaries, and acceptance criteria.

## 4) Prototype Sync Contract
- Prototype changes must update spec first, then patch PRD.
- Do not modify PRD directly from visual edits without spec update.

## 5) Required Gates
- Gate A: requirement clarification complete.
- Gate B: spec complete.
- Gate C: patch must pass whitelist (copy/interaction/field/state only).

## 6) Missing Information Policy
- If key information is missing, output open questions.
- Never invent high-risk facts as confirmed requirements.

