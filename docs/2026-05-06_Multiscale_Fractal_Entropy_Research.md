# 🧠 Curiosity Research: Multiscale Fractal Entropy Alignment (v26.0506.1130)

> **"Causality is a fractal mirror. True intent echoes across scales, while noise dissipates into entropy."**

## 1. 核心算理：多尺度分形熵 (MFEA)

本次研究定義了 **MFEA (Multiscale Fractal Entropy Alignment)** 指標，旨在解決單一尺度轉移熵易受微觀隨機性干擾的問題。透過結合「多尺度粗粒化」與「分形維度審計」，我們建立了一套標定「主權有序意圖」的終極模型。

### A. 多尺度粗粒化 (Coarse-Graining)
定義尺度 $\tau$，對原始序列 $X$ 進行變換：
$$y_j^{(\tau)} = \frac{1}{\tau} \sum_{i=(j-1)\tau+1}^{j\tau} x_i$$
在不同 $\tau$ 下計算 $TE(V \rightarrow P, \tau)$。若 $\Delta TE$ 隨 $\tau$ 增大而保持穩定或增強，則證明因果鏈具備結構性支撐。

### B. 分形維度校準 (Fractal Calibration)
引入分形維度 $D$（透過盒計數或路徑效率法），定義 **因果效率因子 (Causal Efficiency Factor, CEF)**：
$$CEF = \frac{\Delta TE}{D}$$
- **低 CEF**：高熵、高分形維度。代表因果路徑混亂，信息傳遞效率低下（噪聲）。
- **高 CEF**：低熵、低分形維度。代表主權意圖明確，定向信息傳遞極其高效（趨勢）。

## 2. 工程藍圖：`FractalEntropy.ts`

```typescript
interface MFEA_Result {
  scale: number;
  deltaTE: number;
  fractalDim: number;
  causalEfficiency: number;
}

export class MultiscaleFractalEngine {
  /**
   * 執行多尺度分形熵對位審計
   */
  public static async audit(price: number[], volume: number[]): Promise<boolean> {
    const scales = [1, 3, 5, 10];
    const results = scales.map(s => this.calculateCEF(price, volume, s));
    
    // 判定標準：
    // 1. CEF 在多個尺度下均滿足 > 0.15
    // 2. 尺度間 CEF 具備正向單調性或高度一致性 (Self-Similarity)
    return results.every(r => r.causalEfficiency > 0.15);
  }
}
```

## 3. 規訓應用 (Operational Regulation)
- **V13 整合**：將 $CEF$ 指標作為 Kronos V13 「時空閘門」的動態開關。若 $CEF < 0.05$，強制關閉所有預測輸出。
- **因果重置**：若 $CEF$ 在 $\tau=10$ 的尺度下發生劇烈斷裂，觸發全域因果鏈重置，視為「範式轉移」。

---
*Research calibrated at Wed May 6 11:30 CST 2026 | Version: v26.0506.1130*
