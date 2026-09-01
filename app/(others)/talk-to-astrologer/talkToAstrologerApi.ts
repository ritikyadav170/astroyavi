export interface Astrologer {
  id: number;
  name: string;
  specialty: string;
  category: string;
  rating: string;
  reviewsCount: number;
  experienceYears: number;
  price: number;
  originalPrice: number;
  initials: string;
  bgColor: string;
  isOnline: boolean;
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

export const mockAstrologers: readonly Astrologer[] = [
  {
    id: 1,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 2,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 3,
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
    isOnline: true,
  },
  {
    id: 4,
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
    isOnline: true,
  },
  {
    id: 5,
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
    isOnline: true,
  },
  {
    id: 6,
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
    isOnline: true,
  },
  {
    id: 7,
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
    isOnline: true,
  },
  {
    id: 8,
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
    isOnline: true,
  },
  {
    id: 9,
    name: "Dr. Sunita Rao",
    specialty: "Face Reading, Palmistry",
    category: "Face Reading",
    rating: "4.8",
    reviewsCount: 620,
    experienceYears: 9,
    price: 22,
    originalPrice: 32,
    initials: "SR",
    bgColor: "bg-teal-800",
    isOnline: true,
  },
  {
    id: 10,
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
    isOnline: true,
  },
  {
    id: 11,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 12,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 13,
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
    isOnline: true,
  },
  {
    id: 14,
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
    isOnline: true,
  },
  {
    id: 15,
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
    isOnline: true,
  },
  {
    id: 16,
    name: "Pooja Shastri",
    specialty: "Numerology, Gemology",
    category: "Numerology",
    rating: "4.9",
    reviewsCount: 540,
    experienceYears: 6,
    price: 19,
    originalPrice: 29,
    initials: "PS",
    bgColor: "bg-pink-800",
    isOnline: true,
  },
  {
    id: 17,
    name: "Acharya Rajesh",
    specialty: "Vedic Astrology, KP System",
    category: "KP Astrology",
    rating: "4.9",
    reviewsCount: 1280,
    experienceYears: 13,
    price: 24,
    originalPrice: 36,
    initials: "AR",
    bgColor: "bg-cyan-900",
    isOnline: true,
  },
  {
    id: 18,
    name: "Kavita Joshi",
    specialty: "Tarot Reading, Aura Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 820,
    experienceYears: 9,
    price: 21,
    originalPrice: 32,
    initials: "KJ",
    bgColor: "bg-violet-800",
    isOnline: true,
  },
  {
    id: 19,
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
    isOnline: true,
  },
  {
    id: 20,
    name: "Nidhi Tripathi",
    specialty: "Face Reading, Astro Vastu",
    category: "Face Reading",
    rating: "5.0",
    reviewsCount: 910,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "NT",
    bgColor: "bg-rose-800",
    isOnline: true,
  },
  {
    id: 21,
    name: "Vikram Singh",
    specialty: "Vedic Astrology",
    category: "Vedic Astrology",
    rating: "5.0",
    reviewsCount: 1420,
    experienceYears: 12,
    price: 20,
    originalPrice: 30,
    initials: "VS",
    bgColor: "bg-[#1b4327]",
    isOnline: true,
  },
  {
    id: 22,
    name: "Ravindra Sharma",
    specialty: "Tarot Reading",
    category: "Tarot Reading",
    rating: "5.0",
    reviewsCount: 980,
    experienceYears: 8,
    price: 20,
    originalPrice: 30,
    initials: "RS",
    bgColor: "bg-amber-700",
    isOnline: true,
  },
  {
    id: 23,
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
    isOnline: true,
  },
  {
    id: 24,
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
    isOnline: true,
  },
  {
    id: 25,
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
    isOnline: true,
  },
] as const;

// ==========================================
// API INTEGRATION FUNCTION FOR TALK TO ASTROLOGER
// Connect your backend API URL here when ready
// ==========================================
export async function getAstrologers(
  activeCategory: string = "All Astrologers",
  searchQuery: string = "",
  sortBy: string = "popular"
): Promise<Astrologer[]> {
  try {
    // Example backend API call:
    // const res = await fetch(`/api/astrologers?category=${activeCategory}&search=${searchQuery}&sort=${sortBy}`);
    // return await res.json();
    return mockAstrologers
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
          return parseFloat(b.rating) - parseFloat(a.rating);
        if (sortBy === "experience") return b.experienceYears - a.experienceYears;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  } catch (error) {
    console.error("Error fetching astrologers list:", error);
    return mockAstrologers as Astrologer[];
  }
}
