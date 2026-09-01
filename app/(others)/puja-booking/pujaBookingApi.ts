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
  {
    id: 7,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description:
      "Special Siddhi Vinayak ritual for career advancement and academic success.",
  },
  {
    id: 8,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description:
      "Sacred monthly vrat puja for housewarming and family blessings.",
  },
  {
    id: 9,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description:
      "Vedic ritual to overcome obstacles before starting any auspicious work.",
  },
  {
    id: 10,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description:
      "Traditional Katha & Hawan ritual performed by certified Vedic priests.",
  },
  {
    id: 11,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description:
      "Kuber & Mahalakshmi Mahapuja for business success and debt relief.",
  },
  {
    id: 12,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description:
      "Nine planets shanti jaap and havan to neutralize astrological afflictions.",
  },
  {
    id: 13,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description:
      "Maha Rudrabhishekam ritual with Panchamrit for health and wellness.",
  },
  {
    id: 14,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description:
      "Chandi Path & Navratri Special Puja for protection and energy.",
  },
  {
    id: 15,
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    image: "/images/puja/ganesh_puja.jpg",
    description: "Ganapati Atharvashirsha Havanam for wisdom and prosperity.",
  },
  {
    id: 16,
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    image: "/images/puja/satyanarayana_puja.jpg",
    description:
      "Full Lord Vishnu Pujan with Prasad distribution and mantra chanting.",
  },
  {
    id: 17,
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    image: "/images/puja/lakshmi_puja.jpg",
    description:
      "Kanakdhara Stotram jaap and Lakshmi Pujan for financial growth.",
  },
  {
    id: 18,
    name: "Navgraha Puja",
    category: "Grah Puja",
    image: "/images/puja/navgraha_puja.jpg",
    description:
      "Complete Navgraha Shanti Yagya performed at holy teerth sthan.",
  },
  {
    id: 19,
    name: "Shiv Puja",
    category: "Shiv Puja",
    image: "/images/puja/shiv_puja.jpg",
    description: "Laghu Rudra Puja with Bilva Patra and special Shiva Aarti.",
  },
  {
    id: 20,
    name: "Durga Puja",
    category: "Durga Puja",
    image: "/images/puja/durga_puja.jpg",
    description:
      "Durga Saptashati Paath for prosperity and victory over hurdles.",
  },
] as const;

export const CATEGORIES: readonly string[] = [
  "All Puja",
  "Ganesh Puja",
  "Hanuman Puja",
  "Vastu Puja",
  "Grah Puja",
  "Grahpravesh Puja",
  "Lakshmi Puja",
  "Durga Puja",
  "Shiv Puja",
  "Satyanarayana Puja",
] as const;

export const PUJA_DATABASE: Record<string, PujaDetailData> = {
  "satyanarayana-puja": {
    id: "satyanarayana-puja",
    name: "Satyanarayana Puja",
    category: "Satyanarayana Puja",
    bannerImage: "/images/puja/satyanarayana_puja.jpg",
    description:
      "The Satyanarayana Puja is one of the most sacred and popular Vedic rituals performed to seek the blessings of Lord Satyanarayana, an incarnation of Lord Vishnu. This puja brings peace, prosperity, health, and divine harmony to the family.",
    rating: "4.9",
    bookings: "1200+",
    duration: "1 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
    ],
    benefits: [
      "Prosperity & Wealth",
      "Family Happiness",
      "Attracts prosperity",
      "Removal of Obstacles",
      "Divine Blessings",
      "Promotes peace",
      "Success in new ventures",
      "Fulfills wishes & divine blessings",
      "Strengthens family harmony",
    ],
  },
  "ganesh-puja": {
    id: "ganesh-puja",
    name: "Ganesh Puja",
    category: "Ganesh Puja",
    bannerImage: "/images/puja/ganesh_puja.jpg",
    description:
      "Ganesh Puja is performed to invoke Lord Ganesha, the remover of all obstacles (Vighnaharta) and the deity of wisdom and new beginnings.",
    rating: "4.9",
    bookings: "1500+",
    duration: "1 hr - 1.5 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
    ],
    benefits: [
      "Removes all obstacles",
      "Wisdom & Knowledge",
      "Career advancement",
      "Success in examinations",
      "Divine Protection",
      "Auspicious beginnings",
      "Positive energy inflow",
    ],
  },
  "lakshmi-puja": {
    id: "lakshmi-puja",
    name: "Lakshmi Puja",
    category: "Lakshmi Puja",
    bannerImage: "/images/puja/lakshmi_puja.jpg",
    description:
      "Lakshmi Puja is dedicated to Goddess Lakshmi, the divine deity of wealth, fortune, and prosperity.",
    rating: "4.8",
    bookings: "980+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
    ],
    benefits: [
      "Financial stability & Growth",
      "Attracts Wealth & Fortune",
      "Removes debts & losses",
      "Business expansion",
      "Peace & Abundance",
      "Divine Grace",
    ],
  },
  "navgraha-puja": {
    id: "navgraha-puja",
    name: "Navgraha Puja",
    category: "Grah Puja",
    bannerImage: "/images/puja/navgraha_puja.jpg",
    description:
      "Navgraha Puja is a comprehensive Vedic ritual to pacify all nine planets.",
    rating: "4.9",
    bookings: "1100+",
    duration: "2 hr - 2.5 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
    ],
    benefits: [
      "Pacifies planetary doshas",
      "Removes Sade Sati effects",
      "Enhances good fortune",
      "Health & Mental clarity",
      "Overcomes sudden hurdles",
    ],
  },
  "shiv-puja": {
    id: "shiv-puja",
    name: "Shiv Puja",
    category: "Shiv Puja",
    bannerImage: "/images/puja/shiv_puja.jpg",
    description:
      "Shiv Puja and Maha Rudrabhishekam is a powerful spiritual ritual performed for Lord Shiva.",
    rating: "5.0",
    bookings: "1650+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/shiv_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/durga_puja.jpg",
      "/images/puja/shiv_puja.jpg",
    ],
    benefits: [
      "Inner peace & Purification",
      "Good Health & Longevity",
      "Destroys negative karma",
      "Fulfills deep desires",
      "Spiritual awakening",
    ],
  },
  "durga-puja": {
    id: "durga-puja",
    name: "Durga Puja",
    category: "Durga Puja",
    bannerImage: "/images/puja/durga_puja.jpg",
    description:
      "Durga Puja is performed to invoke Goddess Durga, the supreme embodiment of Shakti.",
    rating: "4.9",
    bookings: "1350+",
    duration: "1.5 hr - 2 hr",
    guarantee: "100% Secure & Trusted",
    gallery: [
      "/images/puja/durga_puja.jpg",
      "/images/puja/ganesh_puja.jpg",
      "/images/puja/satyanarayana_puja.jpg",
      "/images/puja/lakshmi_puja.jpg",
      "/images/puja/navgraha_puja.jpg",
      "/images/puja/shiv_puja.jpg",
      "/images/puja/durga_puja.jpg",
    ],
    benefits: [
      "Protection from enemy & evil eye",
      "Courage & Confidence",
      "Overcomes illness & fear",
      "Victory in litigation",
      "Divine grace & Energy",
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

// ==========================================
// API INTEGRATION FUNCTIONS FOR PUJA BOOKING
// Connect your backend API URL here when ready
// ==========================================
export async function getPujaList(
  searchQuery: string = "",
  selectedCategory: string = "All Puja"
): Promise<PujaItem[]> {
  try {
    return ALL_PUJAS.filter((puja) => {
      const matchesSearch =
        puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puja.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (puja.description &&
          puja.description.toLowerCase().includes(searchQuery.toLowerCase()));

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
    const match =
      PUJA_DATABASE[rawId] ||
      PUJA_DATABASE[
        Object.keys(PUJA_DATABASE).find((k) =>
          rawId.toLowerCase().includes(k.split("-")[0])
        ) || "satyanarayana-puja"
      ] ||
      PUJA_DATABASE["satyanarayana-puja"];

    return match;
  } catch (error) {
    console.error("Error fetching puja detail:", error);
    return PUJA_DATABASE["satyanarayana-puja"];
  }
}
