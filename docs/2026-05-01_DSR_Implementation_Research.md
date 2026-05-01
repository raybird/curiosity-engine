# 🧠 Curiosity Research: Deflated Sharpe Ratio (DSR) Implementation (v26.0501.1330)

> **"If you test enough random strategies, one will eventually look like a genius. DSR is the lie detector for backtests."**

## 1. 核心算理：Deflated Sharpe Ratio

Deflated Sharpe Ratio (DSR) 是由 Marcos Lopez de Prado 提出，旨在修正「多重測試偏誤 (Multiple Testing Bias)」。它回答了一個關鍵問題：在進行了 $N$ 次回測後，當前最優策略的 $SR$ 是否依然具備統計顯著性？

### A. 夏普比率膨脹 (SR Inflation)
當我們從 $N$ 個策略中選出一個最優者時，其期望的最大 SR ($E[max\_SR]$) 隨 $N$ 的增加而增加。若觀察到的 $SR$ 低於此期望值，則該策略極大機率是過擬合。

### B. 基準夏普比率 ($SR_0$) 的計算
$$SR_0 = \sqrt{V[SR]} \left( (1-\gamma)\Phi^{-1}[1 - \frac{1}{N}] + \gamma\Phi^{-1}[1 - \frac{1}{N}e^{-1}] \right)$$
其中 $\gamma$ 為 Euler-Mascheroni 常數 (~0.5772)，$V[SR]$ 為所有測試策略中 SR 的方差。

### C. DSR 顯著性檢定
$$DSR = \Phi \left[ \frac{(SR - SR_0)\sqrt{T-1}}{\sqrt{1 - \gamma_3 SR + \frac{\gamma_4 - 1}{4}SR^2}} \right]$$
- $T$: 樣本觀測數
- $\gamma_3, \gamma_4$: 策略收益率的偏度 (Skewness) 與 峰度 (Kurtosis)

## 2. TypeScript 邏輯組件設計

### I. `DSRCalculator.ts`
```typescript
interface DSRParams {
  sr: number;           // 觀察到的夏普比率
  t: number;            // 觀測次數
  skew: number;         // 偏度
  kurt: number;         // 峰度
  numTrials: number;    // 總測試次數 N
  srVariance: number;   // 所有測試策略 SR 的方差
}

class DSRCalculator {
  /**
   * 計算基準 SR (考慮到多重測試後的預期最大值)
   */
  public static calculateExpectedMaxSR(n: number, variance: number): number {
    const euler = 0.5772156649;
    const invN = 1 - (1 / n);
    const invNe = 1 - (1 / (n * Math.exp(1)));
    
    // 這裡需要正態分佈累計分佈函數的逆函數 Phi^-1
    const z1 = stats.normInv(invN);
    const z2 = stats.normInv(invNe);
    
    return Math.sqrt(variance) * ((1 - euler) * z1 + euler * z2);
  }

  /**
   * 計算 DSR (0-1 之間的機率值)
   */
  public static calculateDSR(params: DSRParams): number {
    const sr0 = this.calculateExpectedMaxSR(params.numTrials, params.srVariance);
    const stdErr = Math.sqrt(
      (1 - params.skew * params.sr + ((params.kurt - 1) / 4) * Math.pow(params.sr, 2)) / (params.t - 1)
    );
    
    const zScore = (params.sr - sr0) / stdErr;
    return stats.normCdf(zScore);
  }
}
```

## 3. 規訓應用 (Operational Regulation)
- **硬性門檻**：所有進入 `v26` 生產環境的策略，其 $DSR$ 必須 > 0.95。
- **動態懲罰**：當 $N$ (測試次數) 增加時，$SR_0$ 會自動上移，強制 AI 尋找更具因果強度的策略。

---
*Research calibrated at Fri May 1 13:30 CST 2026 | Version: v26.0501.1330*
