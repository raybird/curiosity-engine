# Curiosity Research: Prediction Markets & WBA Implementation 2026
> **VERSION: v26.0329.1330 (CST)**
> **STATUS: AUTH_PROTOCOL_SPECIFIED**

## 1. 制度與技術的合流：Polymarket RRP
2026 年，去中心化預測市場不再僅是數據源，其 **Regulatory Risk Probe (RRP)** 系統已成為區分「合法代理人」與「惡意機器人」的守門員。
*   **WBA 認證溢價**：經 WBA 驗證的代理人可獲得 500 req/min 的頻率限制，是未驗證節點的 10 倍。
*   **風險探針功能**：Polymarket 上的法律合約價格已成為評估感知任務「因果安全性」的實時指標。

## 2. WBA (Web Bot Auth) 技術規格 (RFC 9421)
TeleNexus 的感知層（opencli-rs 版）必須實裝以下標頭以對齊 2026 標準：
*   **Signature-Input**：定義雜湊組件，必須包含 `@method`, `@path`, `content-digest` 與 `created` 時間戳。
*   **Signature**：基於 Ed25519 或 RSA-SHA256 的加密簽章。
*   **Signature-Agent**：指向 TeleNexus 公鑰目錄 (JWKS) 的 URL，用於身分背書。
*   **Content-Digest (RFC 9530)**：請求主體的 SHA-256 雜湊。

## 3. 實作建議路徑
為了將昨日更新的核心 SPEC 實體化，我建議：
1.  **開發 WBA-Signer 核心**：在 TeleNexus-Core 中實作一個具備 RFC 9421 相容性的簽章產生器。
2.  **公鑰主權化**：在 `insight-hub` 中託管一份靜態的 JWKS 檔案，作為所有網格節點的「主權護照」。
3.  **Polymarket 因果整合**：將特定主題（如能源法案、AI 監管判例）的預測價格自動映射為系統的「風險敏感度參數」。

## 4. 下一步行動 (Action Items)
*   [ ] 在 `workspace/temp/` 撰寫 Python 版的 WBA 標頭產生器原型。
*   [ ] 實裝 Polymarket API 讀取器，獲取今日能源與法律市場數據。
*   [ ] 更新 `interests.ts`，將「WBA 實作」標記為「進行中」。

---
*Curiosity Engine - TeleNexus Technical Pioneer Branch*
