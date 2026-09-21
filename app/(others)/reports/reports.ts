import axios from "../../../config/axios";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Backend Matching Data Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportCategoryData {
  _id: string;
  key: string;
  title: string;
  shortTitle?: string;
  description?: string;
  hasSubtypes?: boolean;
  status?: boolean;
  priority?: number;
  packages?: ReportPackageData[];
  createdAt?: string;
}

export interface ReportVariantData {
  _id: string;
  reportPackage: string | ReportPackageData;
  variantName: string;
  duration?: string;
  pages?: string;
  url?: string;
  price: number;
  sellPrice: number;
  isDefault?: boolean;
  status?: boolean;
  createdAt?: string;
}

export interface ReportPackageData {
  _id: string;
  category: string | ReportCategoryData;
  title: string;
  shortTitle?: string;
  thumbImage: string;
  description?: string;
  benefits?: string[];
  reportType: string;
  hasVariants?: boolean;
  personCount?: number;
  status?: boolean;
  priority?: number;
  isPopular?: boolean;
  variants?: ReportVariantData[];
  createdAt?: string;
}

export interface ReportMemberData {
  fullName: string;
  gender: "male" | "female" | "other";
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  sec?: number;
  place: string;
  lat: number;
  lon: number;
  tzone?: number;
}

export interface ReportTransactionData {
  _id: string;
  transactionId?: string;
  orderId?: string;
  user: string;
  reportCategory: string | ReportCategoryData;
  reportPackage: string | ReportPackageData;
  reportPackageVariant: string | ReportVariantData;
  members: ReportMemberData[];
  lan: "en" | "hi";
  PaymentMethod: "online" | "cod";
  amount: number;
  gstAmount?: number;
  currency?: string;
  reportStatus: "pending" | "processing" | "generated" | "failed";
  reportUrl?: string;
  reportError?: string;
  reportGeneratedAt?: string;
  status: "pending" | "success" | "failed";
  createdAt?: string;
}

export interface CreateReportTransactionPayload {
  reportPackage: string;
  reportPackageVariant: string;
  members: ReportMemberData[];
  lan?: "en" | "hi";
  PaymentMethod?: "online" | "cod";
  gstAmount?: number;
}

export interface AstrologyReportItem {
  id: string;
  title: string;
  shortTitle?: string;
  hindiTitle?: string;
  categoryKey: string;
  categoryTitle?: string;
  thumbImage?: string;
  description: string;
  benefits: string[];
  reportType: string;
  personCount: number;
  hasVariants: boolean;
  variants: ReportVariantData[];
  rating: number;
  reviewsCount: number;
  pages: string;
  price: number;
  sellPrice: number;
  isPopular: boolean;
  isFree?: boolean;
  tag?: string;
  tagColor?: string;
  backendPackageId: string;
  backendVariantId?: string;
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

// ─────────────────────────────────────────────────────────────────────────────
// 2. Default Initial Dataset (Exactly matching backend data)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_REPORT_CATEGORIES = [
  { id: "all", key: "all", label: "All Reports", icon: "✨" },
  { id: "vedic_reports", key: "vedic_reports", label: "Vedic Reports", icon: "📜" },
  { id: "natal_report", key: "natal_report", label: "Natal Report", icon: "🌟" },
  { id: "natal_couple_report", key: "natal_couple_report", label: "Natal Couple", icon: "💍" },
  { id: "prediction_report", key: "prediction_report", label: "Prediction", icon: "🔮" },
  { id: "numerology_report", key: "numerology_report", label: "Numerology", icon: "🔢" },
  { id: "vedic_numerology_v2", key: "vedic_numerology_v2", label: "Vedic Numerology", icon: "🕉️" },
  { id: "western_reports_v2", key: "western_reports_v2", label: "Western Astrology", icon: "🌌" },
];

export const DEFAULT_REPORT_PACKAGES: AstrologyReportItem[] = [
  {
    id: "6a8fe2a7153d5ae6c029c1af",
    backendPackageId: "6a8fe2a7153d5ae6c029c1af",
    backendVariantId: "6a8ff54f153d5ae6c029c1df",
    title: "Kundali PDF - Sampoorna",
    shortTitle: "Sampoorna",
    hindiTitle: "सम्पूर्ण जन्म कुंडली विश्लेषण",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/kundali_sampoorna.png",
    description: "Complete detailed kundali report covering all aspects of your birth chart with deep Vedic house predictions.",
    reportType: "kundali_sampoorna",
    personCount: 1,
    hasVariants: false,
    price: 499,
    sellPrice: 299,
    pages: "15 Pages",
    rating: 4.9,
    reviewsCount: 14850,
    isPopular: true,
    tag: "Bestseller",
    tagColor: "bg-amber-100 text-[#c85a17] border-amber-300",
    benefits: [
      "Detailed Birth Chart Analysis",
      "Career & Finance Insights",
      "Love & Marriage Predictions",
      "Health & Wellness Guidance",
      "Personalized Astrology Report",
      "Planetary Position Analysis",
      "Lucky Numbers & Colors",
      "Remedies & Recommendations",
    ],
    variants: [
      {
        _id: "6a8ff54f153d5ae6c029c1df",
        reportPackage: "6a8fe2a7153d5ae6c029c1af",
        variantName: "Default",
        pages: "15",
        url: "https://pdf.divineapi.com/indian-api/v2/kundali-sampoorna",
        price: 499,
        sellPrice: 299,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fe31a153d5ae6c029c1b2",
    backendPackageId: "6a8fe31a153d5ae6c029c1b2",
    backendVariantId: "6a900b7600ed98d2961ada0c",
    title: "Kundali PDF - Ananta",
    shortTitle: "Ananta",
    hindiTitle: "अनंता जन्म कुंडली रिपोर्ट",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/kundli_ananta.png",
    description: "In-depth kundali report with extended predictions and personalized planetary remedies.",
    reportType: "kundali_ananta",
    personCount: 1,
    hasVariants: false,
    price: 499,
    sellPrice: 299,
    pages: "15 Pages",
    rating: 4.9,
    reviewsCount: 11200,
    isPopular: false,
    tag: "In-Depth Study",
    tagColor: "bg-orange-100 text-[#c85a17] border-orange-300",
    benefits: [
      "Detailed Birth Chart Analysis",
      "Career & Finance Insights",
      "Love & Marriage Predictions",
      "Health & Wellness Guidance",
      "Personalized Astrology Report",
      "Planetary Position Analysis",
      "Lucky Numbers & Colors",
      "Remedies & Recommendations",
    ],
    variants: [
      {
        _id: "6a900b7600ed98d2961ada0c",
        reportPackage: "6a8fe31a153d5ae6c029c1b2",
        variantName: "Default",
        pages: "15",
        url: "https://pdf.divineapi.com/indian-api/v2/kundali-ananta",
        price: 499,
        sellPrice: 299,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fe409153d5ae6c029c1b5",
    backendPackageId: "6a8fe409153d5ae6c029c1b5",
    backendVariantId: "6a8ff5bc153d5ae6c029c1e3",
    title: "Kundali PDF - Prakash",
    shortTitle: "Prakash",
    hindiTitle: "प्रकाश जन्म कुंडली रिपोर्ट",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/kundli_prakash.png",
    description: "Basic kundali report covering key planetary positions, lagna analysis and predictions.",
    reportType: "kundali_prakash",
    personCount: 1,
    hasVariants: false,
    price: 299,
    sellPrice: 149,
    pages: "8 Pages",
    rating: 4.8,
    reviewsCount: 8400,
    isPopular: false,
    tag: "Quick Guide",
    tagColor: "bg-amber-100 text-amber-800 border-amber-300",
    benefits: [
      "Detailed Birth Chart Analysis",
      "Planetary Position Analysis",
      "Lucky Numbers & Colors",
      "Basic Remedies",
    ],
    variants: [
      {
        _id: "6a8ff5bc153d5ae6c029c1e3",
        reportPackage: "6a8fe409153d5ae6c029c1b5",
        variantName: "Default",
        pages: "8",
        url: "https://pdf.divineapi.com/indian-api/v2/kundali-prakash",
        price: 299,
        sellPrice: 149,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fe532153d5ae6c029c1b8",
    backendPackageId: "6a8fe532153d5ae6c029c1b8",
    backendVariantId: "6a8ff5cc153d5ae6c029c1e7",
    title: "Match Making PDF",
    shortTitle: "Match Making",
    hindiTitle: "36 गुण अष्टकूट मिलान रिपोर्ट",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/match_making.png",
    description: "Detailed compatibility report based on Vedic matchmaking principles (Ashtakoot 36 Guna Milan & Mangal Dosha).",
    reportType: "match_making",
    personCount: 2,
    hasVariants: false,
    price: 599,
    sellPrice: 349,
    pages: "12 Pages",
    rating: 4.9,
    reviewsCount: 13400,
    isPopular: true,
    tag: "Couple Compatibility",
    tagColor: "bg-rose-100 text-rose-700 border-rose-300",
    benefits: [
      "36 Guna Milan Score Breakdown",
      "Manglik Dosha Impact & Remedies",
      "Emotional & Physical Compatibility",
      "Longevity & Mutual Health Harmony",
      "Financial Stability & Family Life",
      "Remedies & Auspicious Guidance",
    ],
    variants: [
      {
        _id: "6a8ff5cc153d5ae6c029c1e7",
        reportPackage: "6a8fe532153d5ae6c029c1b8",
        variantName: "Default",
        pages: "12",
        url: "https://pdf.divineapi.com/indian-api/v2/match-making",
        price: 599,
        sellPrice: 349,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fe6b1153d5ae6c029c1bb",
    backendPackageId: "6a8fe6b1153d5ae6c029c1bb",
    backendVariantId: "6a8ff5db153d5ae6c029c1eb",
    title: "Government Job Report",
    shortTitle: "Govt Job",
    hindiTitle: "सरकारी नौकरी व पद योग रिपोर्ट",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/Government_Jobs.png",
    description: "Astrological analysis of your prospects for a government job, competitive exams, and administrative success.",
    reportType: "government_job_report",
    personCount: 1,
    hasVariants: false,
    price: 449,
    sellPrice: 249,
    pages: "10 Pages",
    rating: 4.8,
    reviewsCount: 9600,
    isPopular: false,
    tag: "Career & Exams",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    benefits: [
      "10th & 6th House Planetary Strength",
      "Sun & Mars Government Yogas (Raja Yoga)",
      "Best Time Windows for Competitive Exams",
      "Remedies for Career Stability & Promotion",
    ],
    variants: [
      {
        _id: "6a8ff5db153d5ae6c029c1eb",
        reportPackage: "6a8fe6b1153d5ae6c029c1bb",
        variantName: "Default",
        pages: "10",
        url: "https://pdf.divineapi.com/indian-api/v2/government-job-report",
        price: 449,
        sellPrice: 249,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fe798153d5ae6c029c1be",
    backendPackageId: "6a8fe798153d5ae6c029c1be",
    backendVariantId: "6a8ff5e6153d5ae6c029c1ef",
    title: "Foreign Travel and Settlement",
    shortTitle: "Foreign Travel",
    hindiTitle: "विदेश यात्रा एवं स्थायी निवास योग",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/foreign_travel_settlement.png",
    description: "Astrological insights into foreign travel, visa approvals, overseas job relocation, and settlement opportunities.",
    reportType: "foreign_travel_settlement",
    personCount: 1,
    hasVariants: false,
    price: 449,
    sellPrice: 249,
    pages: "10 Pages",
    rating: 4.8,
    reviewsCount: 7800,
    isPopular: false,
    tag: "Relocation & Visa",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    benefits: [
      "9th & 12th House Foreign Travel Combinations",
      "Rahu Transit Impact on Overseas Relocation",
      "Best Timelines for Visa Approval & PR",
      "Remedies for Smooth Relocation",
    ],
    variants: [
      {
        _id: "6a8ff5e6153d5ae6c029c1ef",
        reportPackage: "6a8fe798153d5ae6c029c1be",
        variantName: "Default",
        pages: "10",
        url: "https://pdf.divineapi.com/indian-api/v2/foreign-travel-settlement",
        price: 449,
        sellPrice: 249,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fecb7153d5ae6c029c1c1",
    backendPackageId: "6a8fecb7153d5ae6c029c1c1",
    backendVariantId: "6a8ff66e153d5ae6c029c20a",
    title: "Vedic Yearly Prediction",
    shortTitle: "Yearly Prediction",
    hindiTitle: "वार्षिक महादशा व गोचर फल",
    categoryKey: "vedic_reports",
    categoryTitle: "Vedic Reports",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/vedic_prediction.png",
    description: "Year-wise detailed Vedic astrology predictions for upcoming years with 5-Year, 10-Year, and 15-Year timelines.",
    reportType: "vedic_yearly_prediction",
    personCount: 1,
    hasVariants: true,
    price: 699,
    sellPrice: 499,
    pages: "20 - 50 Pages",
    rating: 4.9,
    reviewsCount: 18200,
    isPopular: true,
    tag: "Multi-Year Forecast",
    tagColor: "bg-purple-100 text-purple-800 border-purple-300",
    benefits: [
      "Year-by-Year Mahadasha & Antardasha Predictions",
      "Jupiter & Saturn Major Transit Forecasts",
      "Career, Wealth, Health & Family Milestones",
      "Customized Vedic Planetary Remedies",
    ],
    variants: [
      {
        _id: "6a8ff66e153d5ae6c029c20a",
        reportPackage: "6a8fecb7153d5ae6c029c1c1",
        variantName: "5 Year",
        pages: "20",
        url: "https://pdf.divineapi.com/indian-api/v2/vedic-yearly-prediction-5-year",
        price: 699,
        sellPrice: 499,
        isDefault: true,
      },
      {
        _id: "6a8ff679153d5ae6c029c20d",
        reportPackage: "6a8fecb7153d5ae6c029c1c1",
        variantName: "10 Year",
        pages: "35",
        url: "https://pdf.divineapi.com/indian-api/v2/vedic-yearly-prediction-10-year",
        price: 999,
        sellPrice: 799,
        isDefault: false,
      },
      {
        _id: "6a8ff683153d5ae6c029c210",
        reportPackage: "6a8fecb7153d5ae6c029c1c1",
        variantName: "15 Year",
        pages: "50",
        url: "https://pdf.divineapi.com/indian-api/v2/vedic-yearly-prediction-15-year",
        price: 1499,
        sellPrice: 1199,
        isDefault: false,
      },
    ],
  },
  {
    id: "6a8fed6c153d5ae6c029c1c4",
    backendPackageId: "6a8fed6c153d5ae6c029c1c4",
    backendVariantId: "6a8ff5f1153d5ae6c029c1f3",
    title: "Natal Report",
    shortTitle: "Natal",
    hindiTitle: "नेटल बर्थ चार्ट रिपोर्ट",
    categoryKey: "natal_report",
    categoryTitle: "Natal Report",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/natal_report.png",
    description: "A detailed analysis of your natal birth chart with personality traits, strengths, and soul purpose.",
    reportType: "natal_report",
    personCount: 1,
    hasVariants: false,
    price: 399,
    sellPrice: 249,
    pages: "12 Pages",
    rating: 4.8,
    reviewsCount: 6500,
    isPopular: false,
    tag: "Natal Insights",
    tagColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    benefits: [
      "Ascendant & Sun/Moon Sign Deep Analysis",
      "Psychological & Behavioral Profile",
      "Hidden Talents & Life Challenges",
      "Harmonious Colors & Elements",
    ],
    variants: [
      {
        _id: "6a8ff5f1153d5ae6c029c1f3",
        reportPackage: "6a8fed6c153d5ae6c029c1c4",
        variantName: "Default",
        pages: "12",
        url: "https://pdf.divineapi.com/astrology/v2/report",
        price: 399,
        sellPrice: 249,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fee0e153d5ae6c029c1c7",
    backendPackageId: "6a8fee0e153d5ae6c029c1c7",
    backendVariantId: "6a8ff5fd153d5ae6c029c1f7",
    title: "Natal Couple Report",
    shortTitle: "Couple",
    hindiTitle: "नेटल कपल कम्पैटिबिलिटी रिपोर्ट",
    categoryKey: "natal_couple_report",
    categoryTitle: "Natal Couple Report",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/natal_couple_report.jpg",
    description: "A detailed compatibility analysis based on the natal birth charts of two individuals.",
    reportType: "natal_couple_report",
    personCount: 2,
    hasVariants: false,
    price: 599,
    sellPrice: 399,
    pages: "15 Pages",
    rating: 4.9,
    reviewsCount: 8900,
    isPopular: false,
    tag: "Couple Synergy",
    tagColor: "bg-pink-100 text-pink-800 border-pink-300",
    benefits: [
      "Dual Chart Synastry & Aspect Analysis",
      "Emotional Connection & Communication Style",
      "Long-term Harmony & Relationship Growth",
      "Remedies for Mutual Understanding",
    ],
    variants: [
      {
        _id: "6a8ff5fd153d5ae6c029c1f7",
        reportPackage: "6a8fee0e153d5ae6c029c1c7",
        variantName: "Default",
        pages: "15",
        url: "https://pdf.divineapi.com/astrology/v1/couple",
        price: 599,
        sellPrice: 399,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8fef34153d5ae6c029c1ca",
    backendPackageId: "6a8fef34153d5ae6c029c1ca",
    backendVariantId: "6a8ff60d153d5ae6c029c1fb",
    title: "Prediction Report",
    shortTitle: "Prediction",
    hindiTitle: "प्रेडिक्शन लाइफ रिपोर्ट",
    categoryKey: "prediction_report",
    categoryTitle: "Prediction Report",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/prediction_report_image.jpg",
    description: "Personalized astrological predictions and transit timing based on your birth chart.",
    reportType: "prediction_report",
    personCount: 1,
    hasVariants: false,
    price: 349,
    sellPrice: 199,
    pages: "10 Pages",
    rating: 4.8,
    reviewsCount: 7200,
    isPopular: false,
    tag: "Forecast",
    tagColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    benefits: [
      "Key Upcoming Events & Milestones",
      "Planetary Transits & Caution Periods",
      "Personalized Growth Roadmaps",
    ],
    variants: [
      {
        _id: "6a8ff60d153d5ae6c029c1fb",
        reportPackage: "6a8fef34153d5ae6c029c1ca",
        variantName: "Default",
        pages: "10",
        url: "https://pdf.divineapi.com/numerology/v1/prediction_reports",
        price: 349,
        sellPrice: 199,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8feff0153d5ae6c029c1cd",
    backendPackageId: "6a8feff0153d5ae6c029c1cd",
    backendVariantId: "6a8ff61e153d5ae6c029c1ff",
    title: "Numerology Report",
    shortTitle: "Numerology",
    hindiTitle: "अंक ज्योतिष रिपोर्ट",
    categoryKey: "numerology_report",
    categoryTitle: "Numerology Report",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/numerology_image.jpg",
    description: "A personalized numerology report based on your name vibration and date of birth.",
    reportType: "prediction_report",
    personCount: 1,
    hasVariants: false,
    price: 299,
    sellPrice: 149,
    pages: "8 Pages",
    rating: 4.8,
    reviewsCount: 6800,
    isPopular: false,
    tag: "Name & Number",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    benefits: [
      "Life Path Number & Destiny Number",
      "Soul Urge & Expression Numbers",
      "Lucky Dates, Colors & Gemstones",
      "Name Spelling Correction Guidance",
    ],
    variants: [
      {
        _id: "6a8ff61e153d5ae6c029c1ff",
        reportPackage: "6a8feff0153d5ae6c029c1cd",
        variantName: "Default",
        pages: "8",
        url: "POST https://pdf.divineapi.com/numerology/v2/report",
        price: 299,
        sellPrice: 149,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8ff316153d5ae6c029c1d0",
    backendPackageId: "6a8ff316153d5ae6c029c1d0",
    backendVariantId: "6a8ff62d153d5ae6c029c203",
    title: "Vedic Numerology Report",
    shortTitle: "Vedic Numerology",
    hindiTitle: "वैदिक अंक शास्त्र रिपोर्ट",
    categoryKey: "vedic_numerology_v2",
    categoryTitle: "Vedic Numerology",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/numerology_image.jpg",
    description: "A personalized Vedic numerology report based on traditional Ank Jyotish principles.",
    reportType: "vedic_numerology_v2",
    personCount: 1,
    hasVariants: false,
    price: 349,
    sellPrice: 199,
    pages: "10 Pages",
    rating: 4.9,
    reviewsCount: 7400,
    isPopular: false,
    tag: "Ank Jyotish",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    benefits: [
      "Mulank & Bhagyank Vibrations",
      "Planetary Rulers of Your Numbers",
      "Career Alignment with Numbers",
      "Vedic Remedial Numbers & Yantras",
    ],
    variants: [
      {
        _id: "6a8ff62d153d5ae6c029c203",
        reportPackage: "6a8ff316153d5ae6c029c1d0",
        variantName: "Default",
        pages: "10",
        url: "https://pdf.divineapi.com/api/v1/reports/generate",
        price: 349,
        sellPrice: 199,
        isDefault: true,
      },
    ],
  },
  {
    id: "6a8ff3c1153d5ae6c029c1d3",
    backendPackageId: "6a8ff3c1153d5ae6c029c1d3",
    backendVariantId: "6a8ff642153d5ae6c029c207",
    title: "Western Astrology Report",
    shortTitle: "Western",
    hindiTitle: "वेस्टर्न एस्ट्रोलॉजी रिपोर्ट",
    categoryKey: "western_reports_v2",
    categoryTitle: "Western Astrology Report",
    thumbImage: "https://astrofirst.b-cdn.net/ReportPackage/western_astrology_image.jpg",
    description: "A detailed Western astrology report with Tropical zodiac aspects and houses analysis.",
    reportType: "western_reports_v2",
    personCount: 1,
    hasVariants: false,
    price: 399,
    sellPrice: 249,
    pages: "12 Pages",
    rating: 4.8,
    reviewsCount: 6100,
    isPopular: false,
    tag: "Tropical Zodiac",
    tagColor: "bg-teal-100 text-teal-800 border-teal-300",
    benefits: [
      "Tropical Sun, Moon & Rising Sign Breakdown",
      "Planetary Aspects (Trines, Squares, Oppositions)",
      "Midheaven & Life Calling Analysis",
    ],
    variants: [
      {
        _id: "6a8ff642153d5ae6c029c207",
        reportPackage: "6a8ff3c1153d5ae6c029c1d3",
        variantName: "Default",
        pages: "12",
        url: "https://pdf.divineapi.com/api/v1/western/reports/generate",
        price: 399,
        sellPrice: 249,
        isDefault: true,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. API Caller Methods
// ─────────────────────────────────────────────────────────────────────────────

export const getReportCategories = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await axios.get("/reportCategory", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching report categories:", error);
    return { status: false, data: [] };
  }
};

export const getReportCategoryById = async (id: string) => {
  try {
    const res = await axios.get(`/reportCategory/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching report category by ID:", error);
    return { status: false, data: null };
  }
};

export const getReportPackages = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
  status?: boolean | string;
  isPopular?: boolean | string;
  category?: string;
}) => {
  try {
    const res = await axios.get("/reportPackage", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching report packages:", error);
    return { status: false, data: [] };
  }
};

export const getReportPackageById = async (id: string) => {
  try {
    const res = await axios.get(`/reportPackage/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching report package by ID:", error);
    return { status: false, data: null };
  }
};

export const getReportPackageVariants = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
  reportPackage?: string;
}) => {
  try {
    const res = await axios.get("/reportPackageVariant", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching report variants:", error);
    return { status: false, data: [] };
  }
};

export const getReportPackageVariantById = async (id: string) => {
  try {
    const res = await axios.get(`/reportPackageVariant/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching report variant by ID:", error);
    return { status: false, data: null };
  }
};

export const createReportTransaction = async (
  payload: CreateReportTransactionPayload,
  token?: string
) => {
  try {
    const headers: Record<string, string> = {};
    const effectiveToken =
      token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("astroyavi_token") ||
          localStorage.getItem("token")
        : "");
    if (effectiveToken) {
      headers.Authorization = effectiveToken.startsWith("Bearer ")
        ? effectiveToken
        : `Bearer ${effectiveToken}`;
      headers.token = effectiveToken;
    }
    const res = await axios.post("/reportPackageTransaction", payload, {
      headers,
    });
    return res.data;
  } catch (error: any) {
    console.error("Error creating report transaction:", error);
    throw error?.response?.data || error;
  }
};

export const getMyReportTransactions = async (params?: {
  page?: number;
  limit?: number;
  lang?: string;
  status?: string;
  reportStatus?: string;
}) => {
  try {
    const effectiveToken =
      typeof window !== "undefined"
        ? localStorage.getItem("astroyavi_token") ||
          localStorage.getItem("token")
        : "";
    const headers: Record<string, string> = {};
    if (effectiveToken) {
      headers.Authorization = effectiveToken.startsWith("Bearer ")
        ? effectiveToken
        : `Bearer ${effectiveToken}`;
      headers.token = effectiveToken;
    }
    const res = await axios.get("/reportPackageTransaction", {
      params,
      headers,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching my report transactions:", error);
    return { status: false, data: [] };
  }
};
