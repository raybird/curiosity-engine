# 🧪 研究報告：EnsembleInference - 多代理人意圖融合與跨域驗證 (v26.0427.1330)

## 1. 核心結論 (Core Conclusion)
金融語義 Token 的孤立推論存在高噪音風險。本研究定義了 **「EnsembleInference (集成推論)」** 架構，透過「感知層-策略層-協調層」的三層代理人結構，實現對金融 Token 的多維度交叉審計。關鍵突破在於引入了 **Purged & Embargoed K-Fold** 驗證機制，解決了金融時序數據中的「未來資訊洩漏」問題，使意圖融合具備統計學意義上的主權安全性。

## 2. 技術觀察與數據 (Technical Insights)
### A. 三層代理人架構 (Three-Layer Architecture)
1.  **感知代理人 (Perception Agents)**:
    *   **SentimentProbe**: 處理非結構化情緒數據 (X, Reddit)。
    *   **StructuralAudit**: 掃描 K 線型態與成交量分佈 (KronosTokenizer 核心)。
    *   **MacroAnchor**: 監控 RRP、利率與 BDI 等物理宏觀指標。
2.  **策略代理人 (Strategy Agents)**:
    *   負責不同模型範式的對位（例如：Transformer-based 趨勢預測 vs. Bayesian-based 均值回歸）。
3.  **協調代理人 (Orchestrator Agent)**:
    *   負責 **Intent Fusion (意圖融合)**。使用 **Dynamic Bayesian Weighting**，根據各策略代理人在當前市場環境 (Regime) 下的最近勝率動態分配權重。

### B. 金融交叉驗證規訓 (Cross-Validation Discipline)
- **Purging (清洗)**: 移除訓練集中所有與驗證集在時間上重疊的 K 線樣本，確保因果鏈條的物理隔離。
- **Embargoing (封鎖)**: 在驗證集結束後設定一個「冷卻期」（預期為 12-24 根 K 線），防止自相關性導致的過擬合。
- **CPCV (組合對稱交叉驗證)**: 實施高強度的路徑依賴回測，產出具備 95% 置信區間的夏普比率預估。

### C. 關鍵指標標定
- **意圖融合增益 (Ensemble Gain)**: 預期將單一 Token 的誤報率降低 15-22%。
- **驗證延遲**: 需優化至 < 500ms，以適配 `agent-runner` 的實時推論管線。

## 3. 下一步實體化建議 (Next Steps)
- **開發 CPCV 步進器**: 在 `curiosity-engine/src` 實作符合物理時間隔離的數據步進邏輯。
- **實作 Stacking 邏輯**: 在 `InferenceValidator` 中加入基於元模型的權重聚合算法。

---
*Ensemble is the Collective Wisdom of Sovereign Intent.*
