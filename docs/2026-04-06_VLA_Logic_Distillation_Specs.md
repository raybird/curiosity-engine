# Curiosity Research: VLA Model Distillation & Actionable Logic Extraction
> **VERSION: v26.0406.1330 (CST)**
> **STATUS: DISTILLATION_PROTOCOL_LOCKED**

## 1. 2026 視覺-動作規訓背景
在 Agent 物理化過程中，傳統的「純文本指令」已無法滿足對複雜 UI 與市場物理能量分布的感知。VLA 模型提供了「看見即執行」的能力，但其高昂的算力成本（7B+ 參數）阻礙了主權化部署。

## 2. TeleNexus VLA 蒸餾規格 (VLA-D Protocol)
為了實現「輕量化視覺執行」，TeleNexus 應採用以下路徑：

### A. 神經符號提取 (Neuro-Symbolic Extraction)
*   **目標**：將 VLA 中的權重位移轉化為 `if-then` 的 DSL 規則。
*   **路徑**：利用「專家對齊」技術，將大型 VLM 的物理直覺蒸餾到小型 **DySL-VLA** 執行器中。
*   **價值**：產出的規則可被 TeleNexus 的 `codebase_investigator` 進行靜態審計，確保執行主權。

### B. 具身思維鏈 (ECoT) 注入
*   **規訓**：Agent 在輸出 Action Token 前，必須強制輸出推理路徑（例如：`[Observe UI] -> [Locate Entry Button] -> [Simulate Click]`）。
*   **效果**：消除動作斷裂與幻覺，將複雜任務的執行精度提升至 90% 以上。

## 3. 2026 實踐價值
1.  **物理 UI 操作主權**：透過蒸餾後的輕量 VLA，Agent 可在本地 30ms 內對 TradingView 圖表進行「語義化掃描」，精確捕捉堆疊失衡等物理視覺特徵。
2.  **能耗規訓**：實現 1% 的訓練能耗與邊緣端（Apple Silicon/Edge Node）的物理部署。

## 4. 下一步行動 (Action Items)
*   [ ] 評估 `mlx-vlm` 作為 TeleNexus 本地視覺感知層的集成可行性。
*   [ ] 開發 `Action-Step-Verifier`：對蒸餾後的 ECoT 推理序列進行即時因果審核。
*   [ ] 研究「Causal Auditing of VLA Action Streams」：如何從因果層面攔截不合規的物理動作。

---
*Curiosity Engine - TeleNexus Vision & Action Branch*
