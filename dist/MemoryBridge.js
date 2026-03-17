export class MemoryBridge {
    history = new Map();
    save(entry) {
        const existing = this.history.get(entry.keyword) || [];
        existing.push(entry);
        this.history.set(entry.keyword, existing);
    }
    getHistory(keyword) {
        return this.history.get(keyword) || [];
    }
    getAllHistory() {
        return this.history;
    }
    query(keyword) {
        const results = [];
        for (const [key, entries] of this.history.entries()) {
            if (key.includes(keyword)) {
                results.push(...entries);
            }
        }
        return results;
    }
    getLatest(keyword, limit = 5) {
        const entries = this.getHistory(keyword);
        return entries.slice(-limit);
    }
    clear(keyword) {
        if (keyword) {
            this.history.delete(keyword);
        }
        else {
            this.history.clear();
        }
    }
}
