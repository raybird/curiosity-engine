# 🚑 研究報告：自癒監控探針實作規範 (v26.0425.1336)

## 1. 核心結論 (Core Conclusion)
自癒監控探針是 TeleNexus 實施「規訓韧性」的第一防線。調研顯示，單純依賴 `SIGKILL` 訊號無法區分人為終止與系統 OOM 崩潰。本規範確立了基於 **「信號監聽 + 核心日誌交叉驗證」** 的雙重判定機制。透過在收到 SIGKILL 後即時執行物理審計（`dmesg`），系統能精確定位崩潰成因，並依據 `Sovereign Evolution SPEC v1.1` 啟動上下文降維與自主演化路徑。

## 2. 技術觀察與數據 (Technical Insights)
### A. 偵測矩陣 (Detection Matrix)
1.  **L1 訊號監聽 (Node.js Level)**:
    - 監控子程序的 `exit` 事件。
    - 判定特徵：`signal === 'SIGKILL' && code === null`。
2.  **L2 因果驗證 (Kernel Level)**:
    - 觸發時執行 `dmesg | grep -i "oom-killer" | tail -n 10`。
    - 比對 PID 與「Out of memory」關鍵字。
3.  **L3 狀態感應 (cgroup Level)**:
    - 讀取 `/sys/fs/cgroup/memory/memory.failcnt` 以確認容器記憶體上限觸發次數。

### B. 自癒啟動規訓 (Self-Healing Protocol)
- **因果提取**: 立即鎖定 `runner-audit.log` 最後 1MB 數據。
- **降維轉化**: 調用 `CausalLogDistiller` 將冗餘日誌壓縮為 < 2KB 的核心故障提示詞。
- **隔離重啟**: 利用 `WasmSkillHost` 載入降維後的意圖模型，實施受限資源下的「降級執行」。

### C. 關鍵性能指標
- **崩潰識別延遲**: < 500ms (訊號接收到日誌驗證)。
- **誤報率目標**: < 5% (區分人為 kill 與系統崩潰)。

## 3. 下一步實體化建議 (Next Steps)
- **實作核心組件**: 在 `curiosity-engine/src` 實體化 `SelfHealingProbe.ts`。
- **日誌對位測試**: 模擬 OOM 情境，驗證 `dmesg` 提取邏輯的物理正確性。

---
*Healing is the Physical Restoration of Causal Intent.*
