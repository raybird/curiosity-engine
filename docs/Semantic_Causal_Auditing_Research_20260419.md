# 🧠 研究報告：語義化因果審計與結構化差異分析 (v26.0419.1330)

## 1. 核心結論 (Core Conclusion)
借鑑 EVM (Ethereum Virtual Machine) 的合約差異分析技術，TeleNexus 的代碼演化審計應從「文本層 (Textual)」轉向「語義層 (Semantic)」。透過分析抽象語法樹 (AST) 或執行路徑的哈希位移，系統可以自主驗證 AI 代理在執行「策略重構（如 v5 to v6）」或「技能合成」時，是否精確保留了原始的因果意圖，而非僅僅產出相似的代碼。

## 2. 技術觀察與數據 (Technical Insights)
### A. 從 Bytecode Diff 到 Intent Diff
- **技術來源**: `evm-contract-differ` 透過比對鏈上字節碼檢測代理模式 (Proxy Patterns) 與實現升級。
- **對位應用**: TeleNexus 應實作 `CausalDiffer` 模組。在 Pine Script 自動重構過程中，透過解析 AST 節點，對比「進場條件組」與「風險管理邏輯」的邏輯等價性，而非字串匹配。

### B. 代理模式與執行委託 (Proxy-based Auditing)
- **觀察**: EVM 的實作分離了儲存與邏輯（Proxy vs Implementation）。
- **啟發**: TeleNexus 的「技能 (Skills)」應被視為「邏輯實現」，而「執行軌跡 (Trajectories)」則為「狀態快照」。審計器應能偵測技能升級是否導致了非預期的「因果溢出」。

### C. 關鍵數據指標
- **意圖保留率 (Intent Preservation Rate)**: 定義為 AST 關鍵邏輯路徑在重構前後的重合度。
- **存證哈希對位**: 利用 `TrajectoryAttestor` 對演化前後的邏輯快照進行鏈上存證，確保代碼主權的不可篡改性。

## 3. 下一步規訓建議 (Next Steps)
- **原型開發**: 在 `curiosity-engine` 下建立 `scripts/ast-causal-diff.ts`，嘗試對 Pine Script v6 策略進行結構化審計。
- **存證對接**: 將 `CausalDiffer` 的審計結果（PASS/FAIL）作為 EAS 證據包的 `causalDensity` 權重輸入。

---
*Verified Sovereignty through Semantic Integrity.*
