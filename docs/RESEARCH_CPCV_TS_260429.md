# 🌌 Curiosity Research: CPCV Engine TypeScript Implementation (v26.0429.1330)

> **"Financial backtesting is not about finding the best path, but understanding the distribution of all possible paths."**

## 1. 核心算理：Combinatorial Purged Cross-Validation (CPCV)

CPCV 解決了傳統回測的兩大痛點：**資料洩漏 (Data Leakage)** 與 **單一回測路徑的偏誤 (Single-Path Variance)**。

### A. 組合邏輯 (Combinatorial Logic)
將總樣本分為 $N$ 個連續區塊，選取 $k$ 個區塊作為測試集（Test Set），其餘 $N-k$ 個區塊作為訓練集（Train Set）。
- **總拆分數量 (Total Splits)**: $S = \binom{N}{k}$
- **回測路徑數量 (Backtest Paths)**: $\phi(N, k) = \binom{N-1}{k-1}$
- **範例 ($N=6, k=2$)**:
    - 總拆分數：15
    - 每組樣本作為測試集的次數：5
    - 可生成的獨立回測路徑：5 條

### B. 清洗與封鎖 (Purging & Embargoing)
由於金融序列具備序列相關性（Serial Correlation），必須消除訓練集與測試集間的重疊。
- **Purging**: 移除所有標籤時間範圍與測試集重疊的訓練樣本。
- **Embargoing**: 在測試集結束後移除長度為 $h$ 的訓練樣本，防止信息從測試集洩漏至後續訓練集（波動率聚類效應）。

## 2. TypeScript 實作架構設計

### I. `CombinatorialSplitter.ts`
負責計算索引組合並生成對應的訓練/測試遮罩。
```typescript
class CombinatorialSplitter {
  constructor(private n: number, private k: number) {}

  public getSplits(dataLength: number) {
    const groupSize = Math.floor(dataLength / this.n);
    const combos = this.k_combinations(Array.from(Array(this.n).keys()), this.k);
    
    return combos.map(testGroups => {
      const testIndices = testGroups.flatMap(g => /* ... */);
      const trainGroups = /* ... */;
      return { trainIndices, testIndices };
    });
  }
}
```

### II. `PurgedEvaluator.ts`
執行標籤級別的時間交叉檢查。
```typescript
class PurgedEvaluator {
  public purge(trainIdx: number[], testIdx: number[], labels: TimeLabel[]): number[] {
    // 識別測試集時間邊界 [test_start, test_end]
    // 移除訓練集中與之重疊的樣本
  }
}
```

### III. `PathStitcher.ts`
將各個拆分的 Out-of-Sample (OOS) 預測拼接到對應的路徑中。

## 3. 未來擴展
- **PBO 計算**: 透過 CPCV 產出的多條路徑計算「過擬合概率 (Probability of Backtest Overfitting)」。
- **與 Kronos 對接**: 將 `FinancialToken` 作為樣本特徵進行組合演化。

---
*Research calibrated at Wed Apr 29 13:30 CST 2026 | Version: v26.0429.1330*
