import axios from "../../../config/axios";

export interface AstrologerPricing {
  chat: number;
  chatFix: number;
  voice: number;
  voiceFix: number;
  video: number;
  videoFix: number;
}

export interface AstrologerServices {
  chat: boolean;
  voice: boolean;
  video: boolean;
  whatsappConsult: boolean;
}

export interface AstrologerSpeciality {
  specialityId: string;
  name: string;
}

export interface AstrologerWallet {
  balance: number;
  lockedBalance: number;
}

export interface AstrologerApiItem {
  pricing: AstrologerPricing;
  consultPricing: AstrologerPricing;
  wallet: AstrologerWallet;
  services: AstrologerServices;
  consultDuration: number;
  bufferDuration: number;
  _id: string;
  name: string;
  displayName: string;
  about: string;
  city: string;
  state: string;
  address: string;
  qualification: string;
  gender: string;
  language: string[];
  email: string;
  preferredLanguage: string;
  pincode: number;
  dob: string;
  mobile: string;
  status: string;
  isBusy: boolean;
  profileImage: string;
  experience: number;
  speciality: AstrologerSpeciality[];
  commission: number;
  poojaCommission: number;
  giftCommission: number;
  freeChatPrice: number;
  priority: number;
  performPooja: boolean;
  isBlock: boolean;
  fcmToken: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  gif: string;
  gstNumber: string;
  isExpert: boolean;
  adharFrontImage: string;
  adharBackImage: string;
  panImage: string;
  bankPassbookImage: string;
  accountType: string;
  cancelChecqueImage: string;
  maxWaitingTime: string;
  referralCode: string;
  referralCommission: number;
  isVerify: boolean;
  firstUser: boolean;
  gallery: string[];
  isLive: boolean;
  deviceId: string;
  deviceType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  adharNumber: string;
  availability: number;
  panNumber: string;
  aadhaarVerified: boolean;
  panVerified: boolean;
  bankVerified: boolean;
  availabilityEndTime: string;
  availabilityStartTime: string;
  chatMinDuration: number;
  videoMinDuration: number;
  voiceMinDuration: number;
  ratingAverage: number;
  ratingCount: number;
  currentLiveSession: unknown | null;
  isDeleted: boolean;
  payoutOnHold: boolean;
  isFavoriteAstrologer: boolean;
}

export interface AstrologerListResponse {
  status: boolean;
  totalResult: number;
  totalPage: number;
  currentPage: number;
  limit: number;
  message: string;
  data: AstrologerApiItem[];
  usedLanguage: string;
}

export interface Astrologer {
  _id?: string;
  id: string | number;
  name: string;
  specialty: string;
  category: string;
  skills?: string[];
  languages?: string[];
  rating: string | number;
  reviewsCount: number;
  experienceYears: number;
  price: number;
  originalPrice: number;
  initials: string;
  bgColor: string;
  isOnline: boolean;
  image?: string;
  profileImage?: string;
  bio?: string;
  about?: string;
  callRate?: number;
  chatRate?: number;
  videoRate?: number;
}

export const filterCategories: readonly string[] = [
  "All Astrologers",
  "Vedic Astrology",
  "Tarot Reading",
  "Vastu",
  "Numerology",
  "KP Astrology",
  "Face Reading",
  "Nadi Astrology",
] as const;

const bgColors = [
  "bg-[#1b4327]",
  "bg-amber-700",
  "bg-orange-600",
  "bg-[#801c10]",
  "bg-emerald-800",
  "bg-indigo-800",
  "bg-purple-800",
  "bg-red-900",
  "bg-teal-800",
  "bg-blue-900",
];

// Helper to get initials
function getInitials(name: string): string {
  if (!name) return "AS";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Helper to format image URLs from API
export function formatImageUrl(url?: string): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("/images/")
  ) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `http://160.187.87.138:9859${trimmed}`;
  }
  return `http://160.187.87.138:9859/${trimmed}`;
}

// Normalize raw API item to Astrologer interface
export function normalizeAstrologer(
  item: Record<string, unknown>,
  index: number = 0,
): Astrologer {
  const id = (item._id || item.id || `astro-${index}`) as string | number;
  const name = (item.displayName || item.name || item.fullName || item.userName || `Astrologer ${index + 1}`) as string;
  
  let specialty = "Vedic Astrology";
  if (Array.isArray(item.speciality) && item.speciality.length > 0) {
    specialty = item.speciality
      .map((speciality) =>
        typeof speciality === "object" && speciality !== null && "name" in speciality
          ? String(speciality.name)
          : String(speciality),
      )
      .join(", ");
  } else if (Array.isArray(item.skills) && item.skills.length > 0) {
    specialty = item.skills.join(", ");
  } else if (typeof item.skills === "string") {
    specialty = item.skills;
  } else if (typeof item.specialty === "string") {
    specialty = item.specialty;
  } else if (typeof item.expertise === "string") {
    specialty = item.expertise;
  }

  const category = (item.category || item.primarySkill || specialty.split(",")[0] || "Vedic Astrology") as string;
  const rating = item.ratingAverage ? String(item.ratingAverage) : item.rating ? String(item.rating) : (4.8 + (index % 3) * 0.1).toFixed(1);
  const reviewsCount = Number(item.ratingCount || item.reviewsCount || item.totalReviews || item.totalOrders || 850 + (index * 120));
  const experienceYears = Number(item.experienceYears || item.experience || 5 + (index % 15));
  const apiChatPrice = typeof item.consultPricing === "object" && item.consultPricing !== null && "chat" in item.consultPricing
    ? Number(item.consultPricing.chat)
    : 0;
  const price = Number(item.price || item.chatRate || item.callRate || item.rate || apiChatPrice || 20);
  const originalPrice = Number(item.originalPrice || price + 10);
  const initials = getInitials(name);
  const bgColor = bgColors[index % bgColors.length];
  const isOnline = item.isOnline !== undefined ? Boolean(item.isOnline) : item.status === "online";
  const rawImage = (item.profileImage || item.image || item.avatar || item.photo || item.profilePic || "") as string;
  const image = formatImageUrl(rawImage);
  const bio = (item.bio || item.about || item.description || "") as string;

  return {
    _id: String(id),
    id,
    name,
    specialty,
    category,
    skills: Array.isArray(item.speciality)
      ? item.speciality.map((speciality) =>
          typeof speciality === "object" && speciality !== null && "name" in speciality
            ? String(speciality.name)
            : String(speciality),
        )
      : Array.isArray(item.skills)
        ? (item.skills as string[])
        : [specialty],
    languages: Array.isArray(item.language)
      ? (item.language as string[])
      : Array.isArray(item.languages)
        ? (item.languages as string[])
        : ["Hindi", "English"],
    rating,
    reviewsCount,
    experienceYears,
    price,
    originalPrice,
    initials,
    bgColor,
    isOnline,
    image,
    profileImage: image,
    bio,
    about: bio,
    callRate: Number(item.callRate || price),
    chatRate: Number(item.chatRate || price),
    videoRate: Number(item.videoRate || price + 15),
  };
}

// ==========================================
// 1. GET ALL ASTROLOGERS (/asterologer)
// ==========================================
export async function getAstrologers(
  activeCategory: string = "All Astrologers",
  searchQuery: string = "",
  sortBy: string = "popular"
): Promise<Astrologer[]> {
  try {
    let res;
    try {
      res = await axios.get<AstrologerListResponse>("/asterologer");
    } catch {
      // Fallback in case endpoint is spelled /astrologer
      res = await axios.get<AstrologerListResponse>("/astrologer").catch(() => null);
    }

    let rawList: Record<string, unknown>[] = [];

    if (res && res.data) {
      const data = res.data;
      if (Array.isArray(data.data)) {
        rawList = data.data as unknown as Record<string, unknown>[];
      }
    }

    // If API returned data, normalize it
    let list: Astrologer[] = [];
    if (rawList && rawList.length > 0) {
      list = rawList.map((item, idx) => normalizeAstrologer(item, idx));
    } else {
      list = getFallbackAstrologers();
    }

    // Apply client-side filters
    return list
      .filter((astro) => {
        const matchesCategory =
          activeCategory === "All Astrologers" ||
          astro.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          astro.specialty.toLowerCase().includes(activeCategory.toLowerCase());

        const matchesSearch =
          astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          astro.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_low") return a.price - b.price;
        if (sortBy === "price_high") return b.price - a.price;
        if (sortBy === "rating")
          return parseFloat(String(b.rating)) - parseFloat(String(a.rating));
        if (sortBy === "experience") return b.experienceYears - a.experienceYears;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    return getFallbackAstrologers();
  }
}

// ==========================================
// 2. GET ASTROLOGER BY ID (/asterologer/:id)
// ==========================================
export async function getAstrologerById(id: string | number): Promise<Astrologer | null> {
  try {
    let res;
    try {
      res = await axios.get(`/asterologer/${id}`);
    } catch {
      res = await axios.get(`/astrologer/${id}`).catch(() => null);
    }

    if (res && res.data) {
      const data = res.data;
      const raw = data.data?.astrologer || data.data?.asterologer || data.data || data.astrologer || data;
      if (raw && typeof raw === "object") {
        return normalizeAstrologer(raw as Record<string, unknown>, 0);
      }
    }

    // Fallback search in list
    const all = getFallbackAstrologers();
    const found = all.find((a) => String(a.id) === String(id) || String(a._id) === String(id));
    return found || null;
  } catch (error) {
    console.error(`Error fetching astrologer with id ${id}:`, error);
    return null;
  }
}

// Fallback Mock Data
export function getFallbackAstrologers(): Astrologer[] {
  return [
    {
      id: "1",
      _id: "1",
      name: "Pt. Rameshwar Prasad",
      specialty: "Vedic Astrology, Vastu",
      category: "Vedic Astrology",
      rating: "4.9",
      reviewsCount: 3200,
      experienceYears: 22,
      price: 35,
      originalPrice: 50,
      initials: "RP",
      bgColor: "bg-red-900",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Renowned Vedic Astrologer and Vastu expert with over 22 years of experience assisting thousands of devotees with Kundli doshas, career, marriage and gemstone consultations.",
      languages: ["Hindi", "Sanskrit", "English"],
      skills: ["Vedic Astrology", "Vastu Shastra", "Gemology", "Kundli Milan"],
    },
    {
      id: "2",
      _id: "2",
      name: "Raju Srivastav",
      specialty: "Lal Kitab, Nadi, Numerology",
      category: "Nadi Astrology",
      rating: "5.0",
      reviewsCount: 2100,
      experienceYears: 15,
      price: 20,
      originalPrice: 30,
      initials: "RS",
      bgColor: "bg-emerald-800",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Expert in Lal Kitab remedies and Nadi Astrology. Specializes in solving relationship, financial, and business hurdles with precise timing and effective remedies.",
      languages: ["Hindi", "English"],
      skills: ["Lal Kitab", "Nadi Astrology", "Numerology", "Remedies"],
    },
    {
      id: "3",
      _id: "3",
      name: "Vikram Singh",
      specialty: "Vedic Astrology, Kundli",
      category: "Vedic Astrology",
      rating: "5.0",
      reviewsCount: 1420,
      experienceYears: 12,
      price: 20,
      originalPrice: 30,
      initials: "VS",
      bgColor: "bg-[#1b4327]",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Specializes in planetary transits, Mahadasha analysis, and accurate horoscope predictions for career progression and family prosperity.",
      languages: ["Hindi", "English", "Punjabi"],
      skills: ["Vedic Astrology", "Kundli Reading", "Prashna Kundli"],
    },
    {
      id: "4",
      _id: "4",
      name: "Ravindra Sharma",
      specialty: "Tarot Reading, Psychic",
      category: "Tarot Reading",
      rating: "5.0",
      reviewsCount: 980,
      experienceYears: 8,
      price: 20,
      originalPrice: 30,
      initials: "RS",
      bgColor: "bg-amber-700",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Intuitive Tarot Card reader offering clarity on love, relationship compatibility, career decisions, and spiritual growth.",
      languages: ["Hindi", "English"],
      skills: ["Tarot Reading", "Aura Healing", "Psychic Reading"],
    },
    {
      id: "5",
      _id: "5",
      name: "Sandeep Sharma",
      specialty: "Vastu, Tarot Reading",
      category: "Vastu",
      rating: "5.0",
      reviewsCount: 1150,
      experienceYears: 10,
      price: 20,
      originalPrice: 30,
      initials: "SS",
      bgColor: "bg-orange-600",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Professional Vastu Consultant and Tarot Reader helping balance cosmic energies in homes and commercial workplaces.",
      languages: ["Hindi", "English"],
      skills: ["Vastu Shastra", "Tarot Reading", "Spiritual Counseling"],
    },
    {
      id: "6",
      _id: "6",
      name: "Pinki Choudhary",
      specialty: "Face Reading, Numerology",
      category: "Numerology",
      rating: "5.0",
      reviewsCount: 890,
      experienceYears: 7,
      price: 20,
      originalPrice: 30,
      initials: "PC",
      bgColor: "bg-[#801c10]",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Celebrated Numerologist and Samudrik Shastra (Face Reading) expert providing accurate personality insights and destiny numbers.",
      languages: ["Hindi", "English"],
      skills: ["Face Reading", "Numerology", "Name Correction"],
    },
    {
      id: "7",
      _id: "7",
      name: "Acharya Ankit",
      specialty: "KP Astrology, Vedic",
      category: "KP Astrology",
      rating: "4.9",
      reviewsCount: 1640,
      experienceYears: 11,
      price: 25,
      originalPrice: 40,
      initials: "AA",
      bgColor: "bg-indigo-800",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Renowned KP Astrologer applying Krishnamurti Paddhati stellar astrology for sub-lord calculations and pin-point event predictions.",
      languages: ["Hindi", "English"],
      skills: ["KP Astrology", "Vedic Astrology", "Horary Astrology"],
    },
    {
      id: "8",
      _id: "8",
      name: "Pt. Gopal Krishan",
      specialty: "Vastu Specialist, Muhurat",
      category: "Vastu",
      rating: "4.8",
      reviewsCount: 1940,
      experienceYears: 18,
      price: 28,
      originalPrice: 40,
      initials: "GK",
      bgColor: "bg-yellow-900",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Expert Vedic astrologer providing guidance on Shubh Muhurat for marriage, Griha Pravesh, and business inaugurations.",
      languages: ["Hindi", "English"],
      skills: ["Vastu", "Muhurat Calculation", "Puja Rituals"],
    },
    {
      id: "9",
      _id: "9",
      name: "Guruji Devendra",
      specialty: "Nadi Astrology, Prashna Kundli",
      category: "Nadi Astrology",
      rating: "5.0",
      reviewsCount: 1890,
      experienceYears: 14,
      price: 30,
      originalPrice: 45,
      initials: "GD",
      bgColor: "bg-blue-900",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Prashna Kundli expert delivering instantaneous answers to life's immediate dilemmas with high accuracy.",
      languages: ["Hindi", "English", "Gujarati"],
      skills: ["Prashna Kundli", "Nadi Astrology", "Remedial Astrology"],
    },
    {
      id: "10",
      _id: "10",
      name: "Meenakshi Devi",
      specialty: "Tarot Reading, Numerology",
      category: "Tarot Reading",
      rating: "5.0",
      reviewsCount: 750,
      experienceYears: 6,
      price: 18,
      originalPrice: 28,
      initials: "MD",
      bgColor: "bg-purple-800",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      isOnline: true,
      bio: "Specialist in Angel card and Tarot card consultations with a compassionate approach to emotional and relationship healing.",
      languages: ["Hindi", "English"],
      skills: ["Tarot Reading", "Numerology", "Chakra Balancing"],
    },
  ];
}
