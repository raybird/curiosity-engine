# Curiosity Research: Agent Intent & Crawling Legality 2026
> **VERSION: v26.0328.1330 (CST)**
> **STATUS: ACTIONABLE_PRECEDENT_IDENTIFIED**

## 1. 法律地板坍縮：Amazon v. Perplexity 案的因果影響
2026 年 3 月的判例確立了「使用者權利」無法覆蓋「平台存取禁令」。核心規訓如下：
*   **Spoofing 刑事化風險**：將 AI 代理偽裝成 Chrome 瀏覽器以繞過 robots.txt，在 CFAA 框架下被認定為具備欺詐意圖的惡意存取。
*   **授權脫鉤**：即使持有使用者憑證，平台仍保有技術與法律上的拒絕存取權（Cease-and-desist 優先權）。

## 2. 技術對焦：意圖宣告與身分規訓
為了維持 TeleNexus 的「網頁原生感知」主權，我們必須演化出符合 2026 規範的感知層：
*   **Web Bot Auth (WBA)**：實作基於 SHA-256 的加密身分宣告，主動在 Request Header 揭露代理人身分與任務意圖。
*   **ai.txt 對位**：優先遵循 `ai.txt` 與 `llms.txt` 的精簡摘要規範，降低對目標伺服器的算力負載，規避「阻斷服務」之法律指控。
*   **MCP 整合**：利用 Model Context Protocol 將所有的抓取行為封裝為標準化工具調用，實現「授權路徑」的可追蹤性。

## 3. 去中心化因果預測市場的應用
*   **風險探針**：將 Polymarket 等預測市場的「法律勝訴機率」作為 Agent 執行高風險任務的前置參數。
*   **動態溢價**：當預測市場顯示某種行為的監管壓力激增時，自動觸發「進程坍縮」或路徑切換。

## 4. 具體建議與下一步 (Action Items)
1.  **實作 Intent-Header**：在 opencli-rs 的基礎調用中加入 TeleNexus 特有的意圖宣告標籤。
2.  **預演預測市場探針**：在 Curiosity Engine 中新增對 Polymarket API 的監測，將「法律因果」量化為系統參數。
3.  **遵循 llms.txt 優先級**：調整獵頭任務邏輯，若目標網站提供精簡 Markdown 摘要，禁止執行全量 HTML 爬取。

---
*Curiosity Engine - TeleNexus Technical Pioneer Branch*
