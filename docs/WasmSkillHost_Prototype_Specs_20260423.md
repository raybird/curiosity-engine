# 🔌 研究報告：WasmSkillHost 原型實作規範 (v26.0423.1336)

## 1. 核心結論 (Core Conclusion)
WasmSkillHost 是 TeleNexus 實施「技能主權」的執行終端。它負責將技能轉化引擎產出的 `.wasm` 模組動態加載至隔離環境中執行。調研顯示，利用 **Extism JS SDK** 的 `createPlugin` 接口，配合基於 `SHA256` 的 Manifest 規訓，可以實現在不中斷系統服務的前提下，完成邏輯更新（Hot-swapping）。這為自主演化範式提供了毫秒級的執行反應速度。

## 2. 技術觀察與數據 (Technical Insights)
### A. 加載器架構 (Host Architecture)
1.  **動態插件工廠 (Plugin Factory)**:
    - 接受 `.wasm` 二進位數據或 Manifest URL。
    - 驗證模組簽章與版本對位。
2.  **隔離執行環境 (Isolated Context)**:
    - 每個技能運行在獨立的 WASM 實例中，具備私有內存空間。
    - 透過 `allowed_paths` 與 `allowed_hosts` 嚴格限制 I/O 邊界。
3.  **因果通訊橋接 (Host-Guest Bridge)**:
    - 實作 `call_host_service` 等 Host Functions，允許插件在受控情況下請求系統資源（如讀取 `stream.json`）。

### B. 熱插拔規訓 (Hot-swapping Discipline)
- **版本鎖定**: 使用 Manifest 內的 `hash` 強制進行物理一致性檢查。
- **無縫切換**: 新舊插件實例共存於內存中，待新實例通過「意圖驗證」後，自動更新路由指針。

### C. 關鍵數據
- **內存占用**: 單個 WASM 插件基礎開銷預期 < 10MB。
- **函數調用延遲**: Host 與 Guest 間的通訊延遲 < 0.1ms。

## 3. 下一步實體化建議 (Next Steps)
- **實作核心類**: 在 `curiosity-engine/src` 下實體化 `WasmSkillHost.ts`，封裝 Extism 的底層調用。
- **意圖對位測試**: 實作一個簡單的「Hello World」WASM 技能，測試從編譯、加載到執行的完整因果鏈。

---
*Execution is the Realization of Intent.*
