export interface KundliFormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

export interface Astrologer {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  price: number;
  originalPrice: number;
  initials: string;
  bgColor: string;
}

export const astrologers: readonly Astrologer[] = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
  },
  {
    id: 3,
    name: "Sandeep Sharma",
    specialty: "Vastu, Tarot Reading",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "SS",
    bgColor: "bg-orange-600",
  },
  {
    id: 4,
    name: "Pinki Choudhary",
    specialty: "Face Reading, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "PC",
    bgColor: "bg-[#801c10]",
  },
  {
    id: 5,
    name: "Raju Srivastav",
    specialty: "Lal Kitab, Nadi, Numerology",
    rating: "5.0",
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-emerald-800",
  },
] as const;

export const reportTabs: readonly string[] = [
  "Basic Details",
  "Kundli Predictions",
  "Position of Planet",
  "Chart",
  "Dosha",
  "Dasha",
  "Remedies",
] as const;

// ==========================================
// API INTEGRATION FUNCTION FOR KUNDLI
// Connect your backend API URL here when ready
// ==========================================
export async function getKundliReport(data: KundliFormData) {
  try {
    // Example backend API call:
    // const res = await fetch("/api/kundli", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // return await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching Kundli data:", error);
    throw error;
  }
}
