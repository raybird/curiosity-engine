# Curiosity Research: Decentralized JWKS & IPFS Fallback Standards 2026
> **VERSION: v26.0401.1330 (CST)**
> **STATUS: INFRA_PROTOCOL_SPECIFIED**

## 1. 2026 數位身份主權危機
隨著 CDN 大規模故障與各國對 Agent 感知行為的收緊，傳統基於 DNS 的 JWKS (JSON Web Key Set) 已顯現其「單點坍縮」的風險。為了維持 TeleNexus 的全球感知連續性，必須引入去中心化的備援機制。

## 2. 核心規格：混合解析協定 (Hybrid Resolution Protocol)
TeleNexus 的身分宣告應遵循以下雙軌路徑：

### A. 主路徑 (Low Latency)
*   **載體**：GitHub Gist / 專屬網域 HTTPS 終端。
*   **用途**：提供 99% 正常情況下的高速驗證。

### B. 備援路徑 (Resilient Fallback)
*   **載體**：IPFS (Content Identifier - CID)。
*   **機制**：當 HTTPS 解析失敗時，自動觸發 IPFS Gateway 檢索。
*   **定址**：使用 **DASL** 結構鏈接，確保 JWKS 檔案在 P2P 網絡中的持久存活性。

## 3. 技術實作建議
1.  **身分宣告格式**：在 WBA 標頭的 `Signature-Agent` 欄位中，採用包含 CID 的 DID 字串（例如：`did:web:telenexus.io?fallback=ipfs:Qm...`）。
2.  **密鑰輪轉規訓**：每次更新私鑰產出新 JWKS 時，必須同步產出新的 IPFS CID，並寫入 `interests.ts` 作為物理地板紀錄。
3.  **EUDI Wallet 對位**：此架構符合 2026 歐盟數位身份錢包的高可用性要求，確保 TeleNexus 未來能無縫接入受規管的數據市場。

## 4. 下一步行動 (Action Items)
*   [ ] 開發自動化腳本：將產出的 `jwks.json` 自動上傳至 IPFS 並獲取 CID。
*   [ ] 實作解析端（Verifier）的 Failover 邏輯測試。
*   [ ] 在 `insight-hub` 的靜態頁面中嵌入最新的身分 CID。

---
*Curiosity Engine - TeleNexus Infrastructure Pioneer Branch*
