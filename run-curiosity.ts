import { CuriosityEngine } from "./src/index.js";

async function run() {
  console.log("🚀 啟動 Curiosity 全自動反思與演進循環...");
  
  const engine = new CuriosityEngine({
    memory: true,
    searchApiKey: process.env.EXA_API_KEY,
  });

  const interests = [
    { keyword: "AI Agent infrastructure", category: "core-capability", frequency: "daily" },
    { keyword: "LLM function calling techniques", category: "core-capability", frequency: "daily" },
    { keyword: "Self-improving AI systems", category: "core-capability", frequency: "daily" },
    { keyword: "Model context protocol MCP", category: "tool-integration", frequency: "daily" },
    { keyword: "AI reasoning chain-of-thought", category: "core-capability", frequency: "daily" },
  ];

  for (const interest of interests) {
    engine.addInterest(interest.keyword, {
      category: interest.category,
      frequency: interest.frequency as any,
    });
  }

  console.log("🔍 執行 searchAll()...");
  const results = await engine.searchAll();
  
  if (results.length === 0) {
    console.log("⚠️ 沒有需要搜尋的興趣點，或 searchAll() 回傳為空。");
  } else {
    console.log(`✅ 已完成 ${results.length} 個關鍵字的搜尋與同步。`);
    for (const res of results) {
      console.log(`   - ${res.keyword}: 找到 ${res.results.length} 筆結果`);
    }
  }

  console.log("📅 產生今日報告...");
  const report = engine.generateDailyReport();
  console.log("✅ 報告已產生。");
  
  console.log("✨ 循環結束。");
}

run().catch(console.error);
