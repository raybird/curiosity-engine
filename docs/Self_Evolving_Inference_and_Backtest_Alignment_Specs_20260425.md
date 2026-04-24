# 🧬 研究報告：自演化推論與回測對位規範 (v26.0425.0132)

## 1. 核心結論 (Core Conclusion)
隨着 Kronos 意圖推論層的實體化，系統需要一套動態的「自我校準」機制。本週期成功定義了 **「自演化推論閉環 (Self-Evolving Inference Loop)」**：利用 `Skill_Verification_Sandbox` 作為回測地板，自動評估 `Causal Bias Score` 與真實市場走勢的因果偏差。這將金融大腦從「靜態規則聚合」提升至「基於反饋的自適應系統」，實現了因果權重的自動演化與主權對位。

## 2. 技術觀察與數據 (Technical Insights)
### A. 回測感應探針 (Backtest Sensing Probes)
- **原理**: 針對每一個實體化的語義 Token，在沙盒中執行「因果有效性掃描」。
- **反饋指標**: 
    - **因果保留率 (Causal Retention)**: Token 出現後預期走勢的達成率。
    - **權重漂移 (Weight Drift)**: 實際勝率與貝氏先驗權重的偏差值。
- **自癒觸發**: 當連續 5 個樣本的漂移量 > 15% 時，自動觸發權重 Manifest 的更新任務。

### B. 基於反饋的權重優化 (Feedback-Driven Optimization)
- **演算法**: 採用「強化學習預研 (RL-Lite)」思想，根據回測結果動態調整 $\rho$ (共振係數) 與 $\lambda$ (衰減因子)。
- **物理路徑**: 沙盒回測 -> 誤差降維 -> 參數優化 -> 更新 `inference.ts` 配置模組。

### C. 關鍵數據標定
- **自校準週期**: 隨每日 20:00 的深度蒸餾同步執行。
- **演化收斂速度**: 預期在 3 個交易日內完成特定 Regime 的權重硬化。
- **誤差容忍地板**: 因果偏差需控制在 < 12%。

## 3. 下一步實體化建議 (Next Steps)
- **實作 BacktestProbe**: 在 `curiosity-engine/src` 開發 `InferenceValidator.ts`。
- **因果合流**: 將此回測反饋作為 `Sovereign Evolution SPEC v1.1` 的「邏輯失效」信號之一。

---
*Evolution is the Recursive Correction of Truth.*
