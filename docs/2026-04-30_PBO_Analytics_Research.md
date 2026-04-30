# 🌌 Curiosity Research: PBO Analytics & Overfitting Metrics (v26.0430.1330)

> **"A high Sharpe Ratio is a warning sign; a low PBO is a green light."**

## 1. 算理定義：Probability of Backtest Overfitting (PBO)

PBO 解決了量化開發中最致命的問題：**回測過擬合**。當我們測試了 1000 種參數組合並選出最好的一個時，這個「最好」往往只是隨機噪聲的產物。

### A. 基於 CPCV 的 PBO 矩陣
給定 $N$ 個數據塊與 $k$ 個測試塊，總組合數 $S = \binom{N}{k}$。
對於每一個拆分 $s \in \{1, \dots, S\}$：
1.  **樣本內 (IS)**：在訓練集塊中計算所有策略的 Sharpe Ratio，找出最優策略索引 $i^*_s$。
2.  **樣本外 (OOS)**：在測試集塊中計算 $i^*_s$ 的 Sharpe Ratio，並獲取其在所有策略中的排名 $R_s \in [0, 1]$。
3.  **Logit 轉換**：計算相對排名之 Logit 值以平滑分佈。

### B. 判定標準
- **PBO < 0.10**: 極低過擬合風險，具備強大因果意圖。
- **0.10 < PBO < 0.40**: 中度風險，需增加 Purging 寬度。
- **PBO > 0.50**: 顯著過擬合，策略大概率失效。

## 2. TypeScript 實作組件設計

### I. `PBOAnalyzer.ts`
```typescript
interface PBOResult {
  pbo: number;
  rankDistribution: number[];
  isOverfitted: boolean;
}

class PBOAnalyzer {
  public calculate(splits: CPCVSplit[], strategyMatrix: number[][]): PBOResult {
    let lossCount = 0;
    const ranks: number[] = [];

    splits.forEach(split => {
      const isBest = this.findBestInSample(split.trainIdx, strategyMatrix);
      const oosRank = this.getOosRank(isBest, split.testIdx, strategyMatrix);
      
      if (oosRank < 0.5) lossCount++;
      ranks.push(oosRank);
    });

    return {
      pbo: lossCount / splits.length,
      rankDistribution: ranks,
      isOverfitted: (lossCount / splits.length) > 0.5
    };
  }
}
```

## 3. 未來研究方向
- **CSC (Deflated Sharpe Ratio)**：校正多重測試下的 Sharpe 比率。
- **因果自癒**：當 PBO 過高時，自動觸發「特徵剪枝」規訓。

---
*Research calibrated at Thu Apr 30 13:30 CST 2026 | Version: v26.0430.1330*
