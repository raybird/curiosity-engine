import type { Interest, InterestOptions } from "./types.js";
export declare class InterestManager {
    private interests;
    addInterest(keyword: string, options?: InterestOptions): Interest;
    removeInterest(keyword: string): boolean;
    listInterests(): Interest[];
    getInterest(keyword: string): Interest | undefined;
    getInterestsByCategory(category: string): Interest[];
    updateLastSearched(keyword: string): void;
    needsSearch(interest: Interest): boolean;
    getInterestsNeedingSearch(): Interest[];
}
//# sourceMappingURL=InterestManager.d.ts.map