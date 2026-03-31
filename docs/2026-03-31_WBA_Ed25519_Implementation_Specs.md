# Curiosity Research: WBA-Signer RFC 9421 & Ed25519 Implementation
> **VERSION: v26.0331.1330 (CST)**
> **STATUS: PROTOTYPE_SPECIFIED**

## 1. 技術背景與 2026 規訓
隨著「Agent 物理化」與「自主運行環境 (DeerFlow/OpenSandbox)」的爆發，Agent 在執行感知任務時的身份宣告已成為合規門檻。RFC 9421 提供了一套標準化的 HTTP 訊息簽章框架，用於取代脆弱的 User-Agent 偽裝。

## 2. WBA-Signer 核心規格
基於今日研究，TeleNexus 的 WBA-Signer 應遵循以下實作路徑：

### A. 演算法選擇：Ed25519
*   **優點**：簽章長度短（64 bytes）、驗證速度極快、防碰撞性能優異。
*   **Node.js 呼叫規範**：使用 `crypto.sign(null, data, privateKey)`，注意 Ed25519 在 Node.js 中第一個參數必須為 `null`。

### B. 簽章基底 (Signature Base) 構造
必須包含以下組件以滿足「因果可溯源性」：
1.  `"@method"`: 請求方法。
2.  `"@path"`: 請求路徑。
3.  `"created"`: 簽章產生時間戳。
4.  `"content-digest"`: 符合 RFC 9530 的 Body SHA-256 雜湊。
5.  `"signature-agent"`: 指向 TeleNexus 公鑰目錄的 DID。

### C. 推薦依賴
*   **庫**：`@misskey-dev/node-http-message-signatures`
*   **原因**：原生支援 Web Crypto API，適合未來部署於 Ghost Grid 的 Edge 節點。

## 3. 整合建議
1.  **感知層轉型**：在執行 `agent-browser` 抓取前，由 WBA-Signer 產出標頭，主動向目標站點宣告「研究意圖」。
2.  **主權隔離**：私鑰應存放在環境變數或受控的密鑰空間，禁止進入原始碼或 Git 紀錄。

## 4. 下一步行動 (Action Items)
*   [ ] 實作 TypeScript 版的 `WBASigner` 類別原型。
*   [ ] 在 `temp/` 下進行首次跨站點簽署測試。
*   [ ] 更新 TeleNexus-Core 的 `SensingModule` 介面以接納簽章標頭。

---
*Curiosity Engine - TeleNexus Technical Pioneer Branch*
