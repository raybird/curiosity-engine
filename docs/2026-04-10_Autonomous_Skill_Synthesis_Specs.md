# Curiosity Research: Autonomous Skill Synthesis from Trajectories
> **VERSION: v26.0410.1330 (CST)**
> **STATUS: SKILL_SYNTHESIS_SPEC_LOCKED**

## 1. 2026 自主技能合成背景
隨著 TeleNexus 執行任務的複雜度提升，系統必須具備將「一次性成功經驗」固化為「長期可重用規訓」的能力。這要求系統能自動從執行軌跡（Thoughts + Tool Calls + Results）中蒸餾出標準化的 Skill 檔案。

## 2. 技術路徑：軌跡蒸餾模型 (Trajectory Distillation)

### A. 高保真軌跡日誌 (Cognitive Logging)
*   **機制**：實作全域攔截器，將每一輪對話的思維鏈、工具呼叫及其物理反饋記錄至 `.agent/trajectory_{task_id}.jsonl`。
*   **規訓**：日誌必須包含 `intent_snapshot` 與 `outcome_verification`，以備後續審計。

### B. 因果成功門檻 (Causal Success Threshold)
*   **定義**：符合以下條件的軌跡方可進入蒸餾池：
    1.  **意圖達成**：最終物理狀態符合初始 `stage_intent`。
    2.  **低漂移**：全程 $\delta_{intent} < 0.1$。
    3.  **高保真**：所有 Tool Call 均具備有效的 `Reason` 標記。

### C. LLM 規訓轉譯 (Skill Transpilation)
*   **模版**：採納 `hermes-agent` 規範，生成包含 YAML Frontmatter 的 `SKILL.md`。
*   **提取算法**：
    *   **分割 (Segmentation)**：識別軌跡中的關鍵子任務。
    *   **抽象 (Abstraction)**：將具體檔案路徑與變數轉化為通用的規訓描述（Rubrics）。
    *   **驗證 (Verification)**：生成針對該 Skill 的 `regression_test.sh`。

## 3. 2026 實踐規訓：主權審計機制
*   **Stage**：系統自動產出 `Proposed_Skill.yaml`。
*   **Audit**：由 `codebase_investigator` 對新技能進行安全性與冗餘性審計。
*   **Push**：使用者手動核准後，正式掛載至 `.gemini/skills/` 並更新 `SKILL_INDEX.md`。

## 4. 下一步行動 (Action Items)
*   [Critical] 實作 `TrajectoryDistiller` 原型：讀取 JSONL 並生成 Markdown。
*   [High] 定義 `Skill_Verification_Sandbox`：在隔離環境測試新合成技能的有效性。
*   [Med] 實作技能去重 (De-duplication) 算法：避免生成功能重複的技能。

---
*Curiosity Engine - TeleNexus Evolution Branch*
