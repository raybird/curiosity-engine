import type { Interest, InterestOptions } from "./types.js";

export class InterestManager {
  private interests: Map<string, Interest> = new Map();

  addInterest(keyword: string, options: InterestOptions = {}): Interest {
    const interest: Interest = {
      keyword,
      category: options.category,
      frequency: options.frequency || "weekly",
      sources: options.sources,
      createdAt: new Date(),
    };
    this.interests.set(keyword, interest);
    return interest;
  }

  removeInterest(keyword: string): boolean {
    return this.interests.delete(keyword);
  }

  listInterests(): Interest[] {
    return Array.from(this.interests.values());
  }

  getInterest(keyword: string): Interest | undefined {
    return this.interests.get(keyword);
  }

  getInterestsByCategory(category: string): Interest[] {
    return this.listInterests().filter((i) => i.category === category);
  }

  updateLastSearched(keyword: string): void {
    const interest = this.interests.get(keyword);
    if (interest) {
      interest.lastSearched = new Date();
    }
  }

  needsSearch(interest: Interest): boolean {
    if (!interest.lastSearched) return true;

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

  getInterestsNeedingSearch(): Interest[] {
    return this.listInterests().filter((i) => this.needsSearch(i));
  }
}
