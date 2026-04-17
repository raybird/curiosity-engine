# 🧪 Curiosity Engine Research: Causal Tokenization v2.0 (v26.0417.1330)

## 📌 研究主題
**因果代幣化 (Causal Tokenization)：基於 EAS 的執行軌跡信用化實作路徑**

## 🏗️ 技術架構
1. **軌跡封裝 (Trajectory Packaging)**：
   - 每一項 AI 任務的執行軌跡（包含 Tool Call, Decision Point, Result）將被封裝為一個 JSON 物件。
   - 使用 EAS (Ethereum Attestation Service) 定義專屬的 Schema。

2. **鏈上存證 (On-chain Attestation)**：
   - 將軌跡的 Hash 與關鍵元數據（UID, Timestamp）提交至 Base L2。
   - 確立「執行即存證」的原子性。

3. **因果信用權重 (Causal Credit Weighting)**：
   - 根據任務的成功率、複雜度與因果密度，自動計算該次證明的「信用價值」。
   - 此價值可作為 A2A (Agent-to-Agent) 經濟體系中的交換憑證。

## 📊 技術發現
- **EAS 整合優勢**：EIP-712 代理證明的引入，大幅降低了頻繁任務存證的 Gas 成本。
- **動態 Schema**：建議為不同的支柱（如 Market, Tech, Causal）建立分層 Schema，以優化檢索效率。

## 🚀 下一步實作
- 在 `projects/curiosity-engine/` 下原型實作一個 `TrajectoryAttestor.ts` 模組。
- 整合 `eas-sdk`，模擬一次自動化獵頭任務的鏈上存證流程。
