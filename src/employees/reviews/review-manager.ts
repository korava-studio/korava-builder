export type ReviewFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "annual";

export interface ReviewRecord {
  employeeId: string;
  frequency: ReviewFrequency;
  notes: string;
  createdAt: string;
}

export class ReviewManager {
  private records: ReviewRecord[] = [];

  submitReview(record: ReviewRecord) {
    this.records.push(record);
  }

  getReviews(employeeId: string) {
    return this.records.filter((record) => record.employeeId === employeeId);
  }
}
