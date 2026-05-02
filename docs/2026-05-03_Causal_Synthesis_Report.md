# 🧠 Curiosity Engine: 因果合成報告 (v26.0503.0130)

## 1. 核心綜述 (Synthesis Overview)
本次合成成功將 **結構性斷裂檢測 (Structural Break Detection)** 與 TeleNexus 的 **主權主宰 V7** 架構對位。這標誌著系統具備了「因果自癒」的基礎能力。透過 CUSUM 濾波器，我們能精確捕捉市場規則轉變的瞬間（Regime Shift），並主動觸發因果權重的重對準，防止舊有模型在失效環境下的過度擬合。

## 2. 跨域因果連結 (Cross-Domain Linkage)
- **研究領域 (Curiosity)**: 提供 CUSUM 累積動能偏離算法與 Chow-test 參數穩定性檢定。
- **執行領域 (Kronos)**: 將 `STRUCTURAL_REGIME_BREAK` Token 設為推論引擎的 Tier 1 指針，強制鎖定注意力閘門 (Attention Lock)。
- **治理領域 (Regulation)**: 確立「斷裂點敏感度」為策略健壯性的重要評估因子。若策略在 CUSUM 觸發後的回測勝率下降超過 30%，自動判定為「非因果型擬合」。

## 3. 關鍵數據與規訓 (Key Metrics & Regulation)
- **斷裂觸發門檻**: $h = 5\sigma$。當 CUSUM 累積和超過此門檻，系統強制重置遞歸偏見 (Recursive Bias)。
- **統計顯著性驗證**: 利用 Chow-test 對位獵頭策略在斷裂點前後的 RSS 變化，排除「幸運型突破」。
- **因果密度校正**: 引入「環境熵漂移 (Entropy Drift)」作為 DSR 通縮的動態乘數。

## 4. 決策記錄 (Core Decisions)
- **DECISION_0503_01**: 所有 v26.05 系列策略在預審時，必須包含「結構斷裂抗性測試」。
- **DECISION_0503_02**: 實體化 `CUSUMFilter` 並將其與 `DSRCalculator` 進行序列式審計聯動。

---
*Synthesized at Sun May 3 01:30:22 CST 2026 | Calibration: Sovereign*
