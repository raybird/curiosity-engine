# Curiosity Research: TrajectoryDistiller Implementation Specs
> **VERSION: v26.0411.1330 (CST)**
> **STATUS: ARCHITECTURE_LOCKED**

## 1. 2026 軌跡蒸餾願景
在 TeleNexus 核心 v2.9.7 之後，系統面臨「日誌膨脹」與「經驗無法沈澱」的挑戰。`TrajectoryDistiller` 旨在建立一條工業級的生產線，將 AI 代理人的每一次成功執行自動轉化為可重用的「具身技能」。

## 2. 核心邏輯路徑 (Distillation Logic)

### A. 日誌清洗與標籤化 (Phase 1: Ingestion)
*   **格式**：攝取非結構化 `.jsonl` 認知日誌。
*   **操作**：利用小型專用模型執行「語義對映」，將 raw API 調用標註為 `[DISCOVERY]`, `[DECISION]`, `[EXECUTION]`。
*   **規訓**：強制過濾 10 分鐘以上的無效等待與重複性搜尋。

### B. 因果骨幹判定 (Phase 2: Pruning)
*   **機制**：構建因果 DAG。
*   **規則**：若移除步驟 $X$ 後，最終目標狀態（Task Success）依然成立，則判定 $X$ 為冗餘噪聲。
*   **輸出**：精簡後的「核心路徑向量」。

### C. Skill.md 自動編譯 (Phase 3: Synthesis)
*   **模板**：基於 `agentskills.io` 2026 標準。
*   **內容**：
    *   `NAME`: 技能語義名稱。
    *   `INTENT`: 觸發此技能的意圖模式。
    *   `CONSTRAINTS`: 物理與安全約束（由 Causal Guard 提供）。
    *   `TRAJECTORY`: 結構化的 Reason-Act 指令集。

## 3. 2026 實踐價值
1.  **消除記憶斷層**：透過自動化的技能合成，系統能將「這一次的經驗」永久轉化為「下一次的地板」。
2.  **降低 Token 成本**：直接調用結構化 Skill 的 Token 消耗僅為「推理鏈重構」的 2%~5%。

## 4. 下一步行動 (Action Items)
*   [ ] 開發 `jsonl-to-dag` 解析腳本原型。
*   [ ] 在 `temp/` 環境建立 TrajectoryDistiller 的沙盒測試場。
*   [ ] 研究「Federated Skill Sync Protocol」：如何在 Ghost Grid 節點間安全地分享這些蒸餾後的技能。

---
*Curiosity Engine - TeleNexus Trajectory Branch*
