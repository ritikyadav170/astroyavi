export interface PujaItem {
  id: number;
  name: string;
  category: string;
  image: string;
  description?: string;
}

export interface PujaDetailData {
  id: string;
  name: string;
  category: string;
  bannerImage: string;
  description: string;
  rating: string;
  bookings: string;
  duration: string;
  guarantee: string;
  gallery: string[];
  benefits: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const CATEGORIES = [
  "All Puja",
  "Ganesh Puja",
  "Satyanarayana Puja",
  "Lakshmi Puja",
  "Grah Puja",
  "Shiv Puja",
  "Durga Puja",
] as const;

export const ALL_PUJAS: readonly PujaItem[] = [
  {
    id: 1,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description:
      "Removes obstacles and brings prosperity, new beginnings, and good fortune.",
  },
  {
    id: 2,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description:
      "Invokes peace, harmony, health, and happiness for the whole family.",
  },
  {
    id: 3,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description:
      "Attracts wealth, abundance, business growth, and financial stability.",
  },
  {
    id: 4,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description:
      "Pacifies planetary doshas and balances all nine planetary energies.",
  },
  {
    id: 5,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description:
      "Grants inner peace, longevity, protection, and spiritual liberation.",
  },
  {
    id: 6,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description:
      "Bestows divine protection, strength, and victory over all negative forces.",
  },
];

export const PUJA_DATABASE: Record<string, PujaDetailData> = {
  "satyanarayana-puja": {
    id: "satyanarayana-puja",
    name: "Maha Satyanarayana Vrat Katha & Puja",
    category: "Satyanarayana Puja",
    bannerImage:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    description:
      "The Satyanarayana Puja is performed to seek blessings of Lord Vishnu for health, wealth, prosperity, education, and relief from troubles.",
    rating: "4.9",
    bookings: "1,250+",
    duration: "2 - 2.5 Hours",
    guarantee: "100% Certified Vedic Pandits",
    gallery: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop",
    ],
    benefits: [
      "Removes obstacles in career and business",
      "Brings peace, harmony, and positivity to household",
      "Protects family members from malefic planetary influences",
      "Bestows good health and spiritual upliftment",
    ],
  },
};

export const TIME_SLOTS: readonly TimeSlot[] = [
  { time: "08:00 AM", available: false },
  { time: "09:00 AM", available: false },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: false },
  { time: "03:00 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: false },
  { time: "07:00 PM", available: true },
  { time: "08:00 PM", available: false },
] as const;

export async function getPujaList(
  searchQuery: string = "",
  selectedCategory: string = "All Puja"
): Promise<PujaItem[]> {
  try {
    return ALL_PUJAS.filter((puja) => {
      const matchesSearch =
        puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puja.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Puja" || puja.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  } catch (error) {
    console.error("Error fetching pujas:", error);
    return ALL_PUJAS as PujaItem[];
  }
}

export async function getPujaDetailById(rawId: string): Promise<PujaDetailData> {
  try {
    return PUJA_DATABASE[rawId] || PUJA_DATABASE["satyanarayana-puja"];
  } catch (error) {
    console.error("Error fetching puja detail:", error);
    return PUJA_DATABASE["satyanarayana-puja"];
  }
}
