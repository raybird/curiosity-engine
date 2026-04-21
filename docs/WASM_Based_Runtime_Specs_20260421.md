# ⚡ 研究報告：基於 WASM 的敏捷運行時與技能熱插拔架構 (v26.0421.1334)

## 1. 核心結論 (Core Conclusion)
為了達成「代理人自主演化」的實時性，系統需要一種無需重啟主程序的技能更新機制。調研顯示，**Extism** 提供的 WASM 插件架構是實作此需求的最佳路徑。透過將技能封裝為獨立的 WASM 模組，TeleNexus 可以實現毫秒級的「技能注入 (Skill Injection)」與「熱更換 (Hot-swapping)」。這不僅隔離了執行風險，更讓「自演化」產出的新邏輯能立即生效，完成了從靜態代碼向動態生命的關鍵躍遷。

## 2. 技術觀察與數據 (Technical Insights)
### A. WASM 插件規訓 (Plugin Discipline)
- **多語言支持**: WASM 允許使用 Rust, Go, Zig 等編寫高性能技能，並透過 Extism SDK 注入到 TypeScript 或 Python 主代理中。
- **內存隔離**: 每個 WASM 插件擁有獨立的線性內存空間。若新演化的技能發生內存溢出，會被限制在插件層級，不會觸發主程序的 SIGKILL。
- **數據交換**: 透過 Extism 的 `host functions` 機制，主代理可以安全地將環境上下文（如當前 K 線或帳戶狀態）傳遞給技能模組。

### B. 熱插拔流程 (Hot-swapping Workflow)
1. **編譯 (Compile)**: 自演化任務產出的代碼由沙盒自動編譯為 `.wasm` 文件。
2. **驗證 (Verify)**: 在 `Skill Verification Sandbox` 執行因果比對。
3. **加載 (Load)**: 主程序偵測到 `skills/` 目錄下的 `.wasm` 更新，使用 Extism 實時重載 Plugin Instance。
4. **切換 (Switch)**: 路由邏輯將後續請求導向新實例，實現無縫升級。

### C. 關鍵數據指標
- **加載延遲**: 預期 WASM 模組加載時間 < 5ms。
- **通訊開銷**: 宿主與插件間的數據拷貝損耗極低，適合處理高頻交易邏輯。

## 3. 下一步實體化建議 (Next Steps)
- **原型實作**: 在 `projects/curiosity-engine/src` 下建立 `WasmSkillHost.ts` 樣板，整合 `extism/js-sdk`。
- **轉化引擎**: 開發一個簡單的 `ts-to-wasm` 轉化器，將現有的 `.ts` 技能邏輯自動封裝為合規的 WASM 插件。

---
*Agility is the Prerequisite for Evolution.*
