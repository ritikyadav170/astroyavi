export type ReportCategory =
  | "all"
  | "kundli"
  | "marriage"
  | "career"
  | "dosha"
  | "remedies";

export interface AstrologyReportItem {
  id: string;
  title: string;
  hindiTitle: string;
  category: ReportCategory;
  tag: string;
  tagColor?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  pages: string;
  delivery: string;
  features: string[];
  href: string;
  iconType: "scroll" | "heart" | "briefcase" | "shield" | "flame" | "sparkles";
  isPopular?: boolean;
  isFree?: boolean;
}

export interface UserReportForm {
  name: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  period: "AM" | "PM";
  birthPlace: string;
  reportType: string;
}
