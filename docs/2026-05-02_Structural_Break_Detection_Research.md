# 🧠 Curiosity Research: Structural Break Detection & Regime Shifts (v26.0502.1330)

> **"Financial signals are non-stationary; identifying the moment the rule changes is the key to sovereignty."**

## 1. 核心算理：CUSUM Filter

CUSUM (Cumulative Sum) 濾波器是捕捉金融序列「結構性改變」的高效工具。它不依賴單一價格，而是審計序列的累積動能偏離。

### A. 算式定義
給定序列 $y_t$，其累積和定義為：
- $S^+_t = \max(0, S^+_{t-1} + y_t - E[y_t])$
- $S^-_t = \min(0, S^-_{t-1} + y_t - E[y_t])$

當 $S^+_t > h$ 或 $S^-_t < -h$ 時，系統觸發「結構性斷裂信號」。
- **門檻 $h$**: 建議設定為 $5 \times \sigma(y_t)$，以對沖隨機噪聲。

### B. 應用場景
- **Labeling**: 作為 Triplet Barrier 方法的觸發器。
- **Regime Switch**: 識別市場從「低熵盤整」轉向「高能量噴發」的精確瞬間。

## 2. 統計驗證：Chow-test

Chow-test 用於在已知斷裂點的情況下，驗證兩段序列的參數是否顯著不同。

### A. F-統計量計算
$$F = \frac{(RSS_p - (RSS_1 + RSS_2)) / k}{(RSS_1 + RSS_2) / (N_1 + N_2 - 2k)}$$
- $RSS_p$: 全樣本殘差平方和。
- $RSS_1, RSS_2$: 斷裂點前後兩段的殘差平方和。
- $k$: 參數數量。

## 3. TypeScript 實作組件設計

### I. `CUSUMFilter.ts`
```typescript
class CUSUMFilter {
  private sPos: number = 0;
  private sNeg: number = 0;

  public check(val: number, mean: number, threshold: number): boolean {
    const diff = val - mean;
    this.sPos = Math.max(0, this.sPos + diff);
    this.sNeg = Math.min(0, this.sNeg + diff);
    
    if (this.sPos > threshold || Math.abs(this.sNeg) > threshold) {
      this.sPos = 0; // Reset
      this.sNeg = 0;
      return true;
    }
    return false;
  }
}
```

---
*Research calibrated at Sat May 2 13:30 CST 2026 | Version: v26.0502.1330*
