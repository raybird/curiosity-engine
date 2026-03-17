export class InterestManager {
    interests = new Map();
    addInterest(keyword, options = {}) {
        const interest = {
            keyword,
            category: options.category,
            frequency: options.frequency || "weekly",
            sources: options.sources,
            createdAt: new Date(),
        };
        this.interests.set(keyword, interest);
        return interest;
    }
    removeInterest(keyword) {
        return this.interests.delete(keyword);
    }
    listInterests() {
        return Array.from(this.interests.values());
    }
    getInterest(keyword) {
        return this.interests.get(keyword);
    }
    getInterestsByCategory(category) {
        return this.listInterests().filter((i) => i.category === category);
    }
    updateLastSearched(keyword) {
        const interest = this.interests.get(keyword);
        if (interest) {
            interest.lastSearched = new Date();
        }
    }
    needsSearch(interest) {
        if (!interest.lastSearched)
            return true;
        const now = new Date();
        const diffMs = now.getTime() - interest.lastSearched.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        switch (interest.frequency) {
            case "daily":
                return diffDays >= 1;
            case "weekly":
                return diffDays >= 7;
            case "monthly":
                return diffDays >= 30;
            default:
                return false;
        }
    }
    getInterestsNeedingSearch() {
        return this.listInterests().filter((i) => this.needsSearch(i));
    }
}
