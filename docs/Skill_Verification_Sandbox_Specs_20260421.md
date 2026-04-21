# 🏗️ 研究報告：技能驗證沙盒 (Skill Verification Sandbox) 技術規範 (v26.0421.1332)

## 1. 核心結論 (Core Conclusion)
為了支撐「代理人自主演化」的安全對位，TeleNexus 必須建立一套具備「多層隔離」能力的技能驗證沙盒。建議採用混合架構：對於高風險的系統級技能使用 **Firecracker MicroVM (E2B 範式)**，而對於常規的邏輯技能與 Pine Script 轉化驗證，則使用 **WebAssembly (WASM) Runtime** 以實現毫秒級的「冷啟動驗證」。這將確保所有「自主改良」的代碼在併入主系統前，都經過了嚴格的因果隔離測試。

## 2. 技術觀察與數據 (Technical Insights)
### A. 沙盒分層規訓 (Layered Isolation)
- **L1: WASM 輕量驗證層**: 針對 TypeScript/Python 腳本的純邏輯測試。具備極低的資源消耗，適合在 12:00 等高負載時段併發執行。
- **L2: MicroVM 物理隔離層**: 針對涉及網絡、檔案系統操作的技能（如 `git-workflow`）。確保 SIGKILL 或資源溢出被限制在單一 VM 內，不影響 Host Runtime。

### B. 驗證流程 (Verification Pipeline)
1. **意圖提取 (Intent Extraction)**: 使用語義審計提取新技能的期望行為。
2. **模擬執行 (Simulated Execution)**: 在 WASM 沙盒中注入「虛擬環境變數」與「Mock 數據」。
3. **因果比對 (Causal Comparison)**: 比對沙盒輸出與原始意圖的偏差。若意圖保留率 > 95% 且無崩潰，則視為「規訓通過」。

### C. 關鍵效能指標
- **冷啟動延遲**: WASM 預期 < 10ms，MicroVM < 150ms。
- **隔離強度**: 確保沙盒內的「惡意演化」無法讀取 `.env` 或 `.git` 敏感目錄。

## 3. 下一步實體化建議 (Next Steps)
- **原型開發**: 在 `curiosity-engine` 下建立 `sandbox/` 目錄，嘗試整合 `extism` 或 `wasmer` 作為首個驗證引擎。
- **自動化觸發**: 當 `evolution-detector.ts` 捕獲到演化信號時，自動將任務派發至沙盒執行。

---
*Isolation is the Prerequisite for Evolution.*
