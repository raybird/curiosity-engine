# Curiosity Engine 開發 SOP

## GitHub 操作流程

### 1. 開發完成後 commit

```bash
cd /app/workspace/projects/curiosity-engine
git add .
git commit -m "feat: 描述你的變更"
```

### 2. Push 到 GitHub

```bash
git push origin main
```

### 3. 如果是新建立的專案

```bash
# 初始化 git（只做一次）
git init
git config user.email "ai@telenexus.local"
git config user.name "TeleNexus AI"

# 設定 remote（從其他專案取得 token）
git remote add origin https://ghp_TOKEN@github.com/raybird/curiosity-engine.git

# 建立 repo（如果不存在）
curl -s -X POST https://api.github.com/user/repos \
  -H "Authorization: token ghp_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"curiosity-engine","private":false}'

# Push
git push -u origin main
```

### Token 位置

參考：`/app/workspace/projects/skill-linker/.git/config`

---

## 開發檢查清單

- [ ] 程式碼變更完成
- [ ] 測試通過（如有）
- [ ] 更新相關文件
- [ ] commit 訊息清楚描述變更
- [ ] push 到 GitHub
