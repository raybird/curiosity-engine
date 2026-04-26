# 🧪 研究報告：InferenceValidator 原型實作規範 (v26.0426.1336)

## 1. 核心結論 (Core Conclusion)
InferenceValidator 是 TeleNexus 實施「推論主權」的回測地板。調研顯示，利用 **`@backtest-kit/signals`** 的架構，可以實作一套具備「AI 感知」能力的回測引擎。該探針能自動量化 `KronosTokenizer` 產出的語義 Token 在真實市場中的因果權力（Causal Power），並產出高密度的反饋報告。這標誌著自主演化閉環已具備「自我勝率審計」的物理能力。

## 2. 技術觀察與數據 (Technical Insights)
### A. 探針架構 (Probe Architecture)
1.  **時序數據流水線 (Data Pipeline)**:
    - 採用 Lazy Evaluation (延遲評估) 處理海量 OHLCV 數據，確保記憶體安全。
    - 實作「無看頭偏差 (No Look-ahead Bias)」的數據步進器。
2.  **因果對位探針 (Causal Alignment Probes)**:
    - 針對每個 Token（如 `STRUCTURAL_BREAK`）定義 `TargetWindow`（如 5-12 根 K 線）。
    - 計算 **「因果保留率 (Causal Retention)」**: $R = \frac{\Delta Price_{actual}}{\Delta Price_{predicted}}$。
3.  **語義反饋生成器 (Semantic Reporter)**:
    - 產出符合 Markdown 格式的「AI-Ready」訊號報告，直接對位 LLM 的上下文窗口。

### B. 自校準規訓 (Self-Calibration Discipline)
- **漂移偵測**: 當 Token 的歷史勝率相對於 `causalDensity` 的偏差值連續 3 次超過 15% 時，觸發邏輯。
- **自動修正**: 生成新的權重 Manifest 建議，提交至 `Dynamic_Causal_Weighting` 模組。

### C. 關鍵性能指標
- **回測吞吐量**: 預期 > 10,000 bars/sec。
- **報告密度**: 將 24H 的回測原始數據壓縮為 < 5KB 的因果摘要。

## 3. 下一步實體化建議 (Next Steps)
- **實作核心類**: 在 `curiosity-engine/src` 實體化 `InferenceValidator.ts`，封裝 `@backtest-kit/signals` 的核心邏輯。
- **Token 壓力測試**: 測試 `CAUSAL_SURPRISE` Token 在極端波動行情下的「因果衰減率」。

---
*Verification is the Physical Validation of Causal Truth.*
