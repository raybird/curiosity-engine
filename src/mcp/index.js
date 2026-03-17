export function getCuriosityTools(engine) {
    return [
        {
            name: "curiosity_add_interest",
            description: "新增興趣關鍵字進行追蹤",
            inputSchema: {
                type: "object",
                properties: {
                    keyword: { type: "string", description: "要追蹤的關鍵字" },
                    frequency: {
                        type: "string",
                        enum: ["daily", "weekly", "monthly"],
                        description: "搜尋頻率",
                    },
                    category: { type: "string", description: "分類" },
                },
                required: ["keyword"],
            },
        },
        {
            name: "curiosity_remove_interest",
            description: "移除興趣關鍵字",
            inputSchema: {
                type: "object",
                properties: {
                    keyword: { type: "string", description: "要移除的關鍵字" },
                },
                required: ["keyword"],
            },
        },
        {
            name: "curiosity_list_interests",
            description: "列出所有追蹤中的興趣關鍵字",
            inputSchema: {
                type: "object",
                properties: {},
            },
        },
        {
            name: "curiosity_search",
            description: "立即執行搜尋",
            inputSchema: {
                type: "object",
                properties: {
                    keyword: { type: "string", description: "搜尋關鍵字" },
                    limit: { type: "number", description: "結果數量限制" },
                },
                required: ["keyword"],
            },
        },
        {
            name: "curiosity_get_report",
            description: "取得研究報告",
            inputSchema: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: ["daily", "weekly", "keyword"],
                        description: "報告類型",
                    },
                    keyword: { type: "string", description: "關鍵字（選填）" },
                },
                required: ["type"],
            },
        },
        {
            name: "curiosity_schedule",
            description: "設定定時追蹤排程",
            inputSchema: {
                type: "object",
                properties: {
                    keyword: { type: "string", description: "關鍵字" },
                    cron: { type: "string", description: "Cron 表達式" },
                },
                required: ["keyword", "cron"],
            },
        },
    ];
}
export async function executeTool(engine, toolName, args) {
    switch (toolName) {
        case "curiosity_add_interest":
            return engine.addInterest(args.keyword, {
                frequency: args.frequency || "weekly",
                category: args.category,
            });
        case "curiosity_remove_interest":
            return engine.removeInterest(args.keyword);
        case "curiosity_list_interests":
            return engine.listInterests();
        case "curiosity_search":
            return await engine.search(args.keyword);
        case "curiosity_get_report":
            if (args.type === "daily")
                return engine.generateDailyReport();
            if (args.type === "weekly")
                return engine.generateWeeklyReport();
            if (args.keyword)
                return engine.generateKeywordReport(args.keyword);
            return "請提供 keyword 參數";
        case "curiosity_schedule":
            return {
                message: "排程功能需透過外部排程系統設定",
                keyword: args.keyword,
            };
        default:
            return { error: `Unknown tool: ${toolName}` };
    }
}
