export type ZodiacSignName =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export type TimePeriod = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface ZodiacSign {
  name: ZodiacSignName;
  symbol: string;
  accent: string;
}

export interface CategorySection {
  title: string;
  text: string;
}

export interface Astrologer {
  name: string;
  title: string;
  rating: number;
  price: string;
  image: string;
}

export const signOptions: readonly ZodiacSign[] = [
  { name: "Aries", symbol: "♈", accent: "#1f5b4c" },
  { name: "Taurus", symbol: "♉", accent: "#1f5b4c" },
  { name: "Gemini", symbol: "♊", accent: "#1f5b4c" },
  { name: "Cancer", symbol: "♋", accent: "#1f5b4c" },
  { name: "Leo", symbol: "♌", accent: "#1f5b4c" },
  { name: "Virgo", symbol: "♍", accent: "#1f5b4c" },
  { name: "Libra", symbol: "♎", accent: "#1f5b4c" },
  { name: "Scorpio", symbol: "♏", accent: "#1f5b4c" },
  { name: "Sagittarius", symbol: "♐", accent: "#1f5b4c" },
  { name: "Capricorn", symbol: "♑", accent: "#1f5b4c" },
  { name: "Aquarius", symbol: "♒", accent: "#1f5b4c" },
  { name: "Pisces", symbol: "♓", accent: "#1f5b4c" },
] as const;

export const timePeriods: readonly TimePeriod[] = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
] as const;

export const categorySections: readonly CategorySection[] = [
  {
    title: "Career",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    title: "Health",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    title: "Love",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    title: "Business",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
] as const;

export const recommendedAstrologers: readonly Astrologer[] = [
  {
    name: "Vikram Singh",
    title: "Vedic Astrology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ravindra Sharma",
    title: "Tarot Reading",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sandeep Sharma",
    title: "Vastu, Tarot Reading",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pinki Choudhary",
    title: "Face Reading, Numerology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Raju Srivastav",
    title: "Kal Litab, Nadi, Numerology",
    rating: 5.0,
    price: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
  },
] as const;

export const periodStyles: Record<TimePeriod, string> = {
  Daily: "bg-[#1f5b4c] text-white shadow-sm",
  Weekly: "bg-transparent text-[#3c2415]",
  Monthly: "bg-transparent text-[#3c2415]",
  Yearly: "bg-transparent text-[#3c2415]",
};

export async function getHoroscopeData(
  sign: ZodiacSignName,
  period: TimePeriod
): Promise<CategorySection[]> {
  try {
    return categorySections as CategorySection[];
  } catch (error) {
    console.error("Failed to fetch horoscope data:", error);
    return categorySections as CategorySection[];
  }
}
