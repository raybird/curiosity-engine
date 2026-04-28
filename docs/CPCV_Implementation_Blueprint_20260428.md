# 📐 研究報告：CPCV 組合對稱交叉驗證實作藍圖 (v26.0428.1330)

## 1. 核心結論 (Core Conclusion)
傳統回測存在嚴重的「選擇偏差」與「數據洩漏」風險。本研究成功蒸餾了 **Marcos López de Prado** 的 **Combinatorial Purged Cross-Validation (CPCV)** 技術，為 TeleNexus 的主權推論提供了多路徑並行驗證的理論地板。CPCV 不僅能生成單一的歷史表現路徑，更能產出 $\binom{N-1}{k-1}$ 條獨立的替代歷史路徑，從而計算「回測過擬合機率 (PBO)」，確保金融語義 Token 的權重具備統計顯著性。

## 2. 技術觀察與數據 (Technical Insights)
### A. 組合拆分核心公式
- **模型訓練次數 (Splits)**: $\binom{N}{k}$。其中 $N$ 為分組總數，$k$ 為測試組數。
- **回測路徑數量 (Paths)**: $\binom{N-1}{k-1}$。每條路徑均覆蓋完整的歷史時序，但由不同模型在不同測試段的預測組合而成。
- **範例**: 若 $N=6, k=2$，需訓練 15 個模型，產出 5 條獨立回測路徑。

### B. 因果隔離規訓 (Causal Isolation)
1.  **Purging (清洗)**: 識別所有與測試集標籤期間 $[T_0, T_1]$ 有時間重疊的訓練樣本並執行物理移除，防止「預知未來」。
2.  **Embargoing (封鎖)**: 在每個測試集結束後，設定 $h$ 根 K 線的封鎖期（通常等於標籤的因果長度），移除緊隨其後的訓練樣本，以杜絕自相關性導致的洩漏。

### C. 路徑重組策略 (Path Reassembly)
- 將各個 Split 產出的 Out-of-Sample (OOS) 預測結果，根據其所屬分組進行矩陣映射。
- 透過「等權重分佈」算法，確保每條重新組裝的路徑在每個時間點都有且僅有一個 OOS 預測值。

## 3. 下一步實體化建議 (Next Steps)
- **實作 `CombinatorialSplitter`**: 開發 TypeScript 類別，根據 $N$ 與 $k$ 自動產出 Purged 索引矩陣。
- **PBO 評估器**: 整合 `curiosity-engine/src`，根據多路徑 Sharpe Ratio 分佈計算回測過擬合指標。

---
*Backtesting is not finding the best parameters, but quantifying the risk of being wrong.*
