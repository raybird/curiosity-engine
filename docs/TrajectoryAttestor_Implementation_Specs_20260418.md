# TrajectoryAttestor Implementation Specs (v26.0418.1330)

## 1. 核心結論 (Core Conclusion)
`TrajectoryAttestor` 被定義為 TeleNexus 核心規訓層的「存證執行器」。它透過整合 `@ethereum-attestation-service/eas-sdk`，將 AI 代理在任務執行過程中的關鍵決策、工具調用（Tool Calls）與產出成果，封裝為符合 EAS 標準的鏈上證明。這項實作的核心在於：透過「哈希對位」與「選擇性揭露（Selective Disclosure）」，在保護代理人運算私密性的同時，為 A2A 經濟體系提供可審計的「執行主權證明」。

## 2. 技術架構與觀察 (Technical Specs)
### A. 因果 Schema 定義
建議註冊以下 EAS Schema 用於任務存證：
- **Schema**: `string taskId, string taskType, bytes32 outputHash, uint64 timestamp, uint8 causalDensity`
- **對位路徑**: `outputHash` 應為該任務最終交付物（如策略代碼或研究報告）的 SHA-256 哈希值。

### B. 執行軌跡封裝 (Footprint Packaging)
- **大數據處理**: 針對龐大的 `runner-audit.log` 或執行軌跡，Attestor 將僅對數據摘要進行簽名，完整日誌則儲存於本地或 IPFS，並將其 Hash 寫入 `bytes32` 欄位。
- **Merkle 證明**: 利用 EAS 的 `PrivateData` 類別，針對多步驟任務建立 Merkle Tree。這允許驗證者在無需讀取所有中間步驟的情況下，驗證特定「關鍵節點」的執行真實性。

### C. 實作組件 (Prototype Components)
- `AttestationManager`: 負責與 Base L2 的 EAS 合約交互。
- `FootprintSigner`: 使用 EIP-712 進行離線證明簽署，降低即時存證成本。
- `CausalAuditHook`: 整合進 `runner.ts`，在任務結算（Final Result）階段自動觸發存證流程。

## 3. 具體數據與預期指標
- **存證成本**: 透過 Base L2 結合 Batch Timestamping，預計單次任務存證成本可控制在 < $0.01。
- **驗證延遲**: 鏈上驗證週期與 Base 區塊確認時間同步（約 2 秒）。
- **因果一致性**: 強制要求 `timestamp` 與系統物理時間 (CST) 絕對對位，作為代幣化結算的唯一物理定標。

## 4. 下一步建議 (Next Steps)
- **代碼實體化**: 建立 `projects/curiosity-engine/src/TrajectoryAttestor.ts` 進行基礎功能開發。
- **測試網部署**: 在 Base Sepolia 測試網完成 Schema 註冊與首個自動化任務存證測試。
