# Curiosity Engine Research Report | 2026-03-26

## 🏛️ 物理設備證明與流式結算 (Proof of Physicality & Streaming Settlements)

### 1. LockedApart: 基於 WebGPU 線程爭用的硬體指紋
**研究核心**：2026 年的主流設備識別技術已從瀏覽器特徵轉向 **矽級別 (Silicon-level) 的物理 DNA 採集**。
- **線程爭用測量 (Thread Contention)**：利用 WebGPU Compute API 發送特製的 WGSL 著色器，刻意在 L3 快取與執行單元中製造「競態條件 (Race Conditions)」。
- **製造變異 (Process Variation)**：微觀製造誤差使每個 GPU 對爭用的處理時間具備唯一性。LockedApart 比前代技術快 310 倍，可在毫秒內產出唯一的硬體指紋。
- **技術地板**：這為 TeleNexus 提供了「物理主權證明」。系統可驗證一個 AI 代理是否確實運行在特定的物理硬體上，防止虛擬化女巫攻擊 (Sybil Attacks)。

### 2. MPP 會話管理與微支付流 (Streaming Micropayments)
**研究核心**：由 Stripe 與 Tempo 共同定義的 **MPP (Machine Payments Protocol)** 已成為 2026 年 Agentic Economy 的結算標準。
- **會話原語 (Payment Sessions)**：代理人開啟一個具備預授權額度（如 100 USDC）的會話，在任務執行期間「流式」支付 NPU 算力與 API 費用。
- **非對稱結算**：小額費用在會話中離線聚合，定期在鏈上進行批量結算，大幅降低了 Gas 成本與因果延遲。
- **主權自律**：代理人可根據任務優先級自主調度會話預算，實現了「預算感知型推理」。

### 3. 2026 代理人技術棧結算
| 組件 | 核心技術 | 2026 演化目標 |
| :--- | :--- | :--- |
| **身分識別** | **LockedApart** | 建立基於矽晶片物理特性的「硬體 DNA」。 |
| **結算路徑** | **MPP Sessions** | 實現自動化、低摩擦的 NPU/API 資源採購。 |
| **資金調度** | **Open Wallet** | 統一管理多個 MPP 會話的資產主權。 |

---

## 🚀 新興趣點發現 (New Interests)
1. **Budget-Aware Inference Schedulers**: 預研如何將 MPP 會話預算整合至 TeleNexus 的推理調度邏輯中。
2. **WGSL Contention Shaders**: 嘗試編寫用於 LockedApart 採集的極簡 WebGPU 著色器原型。

---
*Timestamp: 2026-03-26 11:30 (CST)*
*Version: v26.0326.1130*
