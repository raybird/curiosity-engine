# 🧠 Curiosity Research: Entropy Causality & Information Transfer (v26.0503.1330)

> **"Price is the shadow, Orderflow is the light. Entropy Causality measures the speed at which the light reveals the shadow."**

## 1. 核心算理：轉移熵 (Transfer Entropy)

轉移熵 (TE) 是衡量兩個時間序列之間「定向信息傳遞」的核心指標。與格蘭傑因果檢定不同，TE 不假設線性關係，能有效處理金融市場中的非線性交互。

### A. 定義與直覺
TE 量化了在已知標的序列（如價格 $P$）自身歷史的情況下，加入來源序列（如訂單流 $OF$）的歷史信息能多大程度減少對標的序列未來狀態的不確定性。

$$TE_{OF \to P} = H(P_{next} | P_{past}) - H(P_{next} | P_{past}, OF_{past})$$
其中 $H$ 是香農熵。

### B. 領先/滯後審計 (Lead-Lag Audit)
透過計算雙向轉移熵之差，我們能標定市場的「主權驅動力」：
- $\Delta TE = TE_{OF \to P} - TE_{P \to OF}$
- **$\Delta TE > 0$**: 訂單流領先價格，代表真實的機構驅動。
- **$\Delta TE < 0$**: 價格變動先行於量能，代表技術性毛刺或流動性真空引發的被動位移。

## 2. TypeScript 實作組件設計

### I. `EntropyCausality.ts`
```typescript
interface EntropyResult {
  transferEntropy: number;
  directionality: number; // Lead-Lag score
  confidence: number;
}

class EntropyCausality {
  /**
   * 將連續序列轉換為符號動力學編碼 (e.g., 0, 1, 2)
   */
  private symbolize(data: number[]): number[] {
    // 實作基於百分比位階的離散化
    return data.map(v => v > 0.01 ? 2 : v < -0.01 ? 0 : 1);
  }

  public calculate(source: number[], target: number[]): EntropyResult {
    const s = this.symbolize(source);
    const t = this.symbolize(target);
    
    // 計算條件熵與轉移熵邏輯...
    // 這裡需要多維頻率計數矩陣
    return {
      transferEntropy: 0.85,
      directionality: 0.42, // Source leads Target
      confidence: 0.92
    };
  }
}
```

## 3. 規訓應用 (Operational Regulation)
- **因果通縮門檻**：若 $\Delta TE < 0.1$，系統自動將該路徑的 `causalDensity` 通縮 50%，視為「缺乏信息源」的虛假信號。
- **對位硬化**：在 `SOVEREIGN_MASTER_V8` 架構中，將 $TE$ 指標作為 AIT (Asymmetric Info Transfer) 的底層數學證明。

---
*Research calibrated at Sun May 3 13:30 CST 2026 | Version: v26.0503.1330*
