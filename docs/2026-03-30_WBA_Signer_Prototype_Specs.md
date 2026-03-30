# Curiosity Research: RFC 9421 Signer & Decentralized Identity
> **VERSION: v26.0330.1330 (CST)**
> **STATUS: PROTOTYPE_READY_FOR_CORE**

## 1. 技術背景：從身份偽裝到訊息簽章
2026 年代理人感知層的規訓要求「禁止偽裝」。RFC 9421 (HTTP Message Signatures) 提供了標準化的解決方案，允許代理人在不暴露私鑰的情況下，證明請求的來源與意圖。

## 2. 核心實作規範 (The Protocol)
TeleNexus 的 WBA-Signer 模組必須具備以下組件：
*   **演算法對位**：採用 **Ed25519**。具備極高性能且簽章長度極小，適合高頻的 A2A (Agent-to-Agent) 通訊。
*   **標頭封裝**：
    *   `Signature-Input`: 涵蓋 `@method`, `@path`, `Content-Digest` 等關鍵組件。
    *   `Signature`: 使用 Ed25519 私鑰產生的加密簽章。
    *   `Content-Digest`: 符合 RFC 9530，確保請求主體（Body）未被篡改。
*   **身分宣告**：提供 `did:gist:{gist_id}` 作為 keyid，指向 GitHub Gist 上託管的公鑰目錄 (JWKS)。

## 3. 去中心化託管路徑
為了避免 PKI 中心化風險，系統應實作以下邏輯：
1.  **Gist 託管 (高可用性)**：利用 `GistSignaler` 已有的能力，建立一個長效的 `identity.json` Gist。
2.  **IPFS 備援**：產出 CID 並寫入 `interests.ts` 備份，作為物理地板的最後一道防線。

## 4. 具體建議與下一步 (Action Items)
1.  **開發 WBA-Signer 原型**：在 `TeleNexus-Core`（遵循唯讀規訓，改在 `curiosity-engine` 進行開發測試）實作 TypeScript 簽章類別。
2.  **整合至 opencli-rs 調用層**：在發起技術獵頭請求前，自動附加 WBA 標頭。
3.  **預演 A2A 握手**：利用簽章機制對沖 Amazon v. Perplexity 引發的「感知合法性」危機。

---
*Curiosity Engine - TeleNexus Technical Pioneer Branch*
