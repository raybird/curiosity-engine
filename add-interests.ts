import { CuriosityEngine } from "./src/index.js";

const engine = new CuriosityEngine({
  memory: true,
  searchApiKey: process.env.EXA_API_KEY,
});

const interests = [
  { keyword: "AI Agent infrastructure", category: "core-capability", frequency: "weekly" },
  { keyword: "LLM function calling techniques", category: "core-capability", frequency: "weekly" },
  { keyword: "Self-improving AI systems", category: "core-capability", frequency: "weekly" },
  { keyword: "Model context protocol MCP", category: "tool-integration", frequency: "weekly" },
  { keyword: "Model training techniques and pipelines", category: "machine-learning", frequency: "weekly" },
  { keyword: "Knowledge distillation methods for LLMs", category: "machine-learning", frequency: "weekly" },
  { keyword: "Parameter-efficient fine-tuning PEFT", category: "machine-learning", frequency: "weekly" },
];

console.log("🎯 加入核心能力關鍵字...\n");

for (const interest of interests) {
  engine.addInterest(interest.keyword, {
    category: interest.category,
    frequency: interest.frequency as any,
  });
  console.log(`✅ ${interest.keyword}`);
}

console.log("\n📋 當前追蹤清單：");
const list = engine.listInterests();
for (const item of list) {
  console.log(`  - ${item.keyword} (${item.category})`);
}
