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

export interface ChoghadiyaItem {
  id: number;
  name: string;
  time: string;
  status: "Auspicious" | "Inauspicious" | "Neutral";
}

export interface PlanetaryEvent {
  id: number;
  title: string;
  datetime: string;
}

export interface PanchangMetricsData {
  sunrise: string;
  sunset: string;
  yoga: string;
  tithi: string;
  nakshatra: string;
  karana: string;
  paksha: string;
  secondKarana: string;
  abhijit: string;
  varjam: string;
  amruthaKala: string;
  rahuKal: string;
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

export const choghadiyaList: readonly ChoghadiyaItem[] = [
  { id: 1, name: "Rog", time: "05:58:43 AM - 07:30:25 AM", status: "Inauspicious" },
  { id: 2, name: "Kaal", time: "07:30:25 AM - 09:05:10 AM", status: "Inauspicious" },
  { id: 3, name: "Laabh", time: "09:05:10 AM - 10:40:00 AM", status: "Auspicious" },
  { id: 4, name: "Udveg", time: "10:40:00 AM - 12:15:45 PM", status: "Inauspicious" },
  { id: 5, name: "Shubh", time: "12:15:45 PM - 01:50:30 PM", status: "Auspicious" },
  { id: 6, name: "Amrit", time: "01:50:30 PM - 03:25:15 PM", status: "Auspicious" },
  { id: 7, name: "Char", time: "03:25:15 PM - 05:00:00 PM", status: "Neutral" },
  { id: 8, name: "Rog", time: "05:00:00 PM - 06:35:00 PM", status: "Inauspicious" },
] as const;

export const planetaryEvents: readonly PlanetaryEvent[] = [
  {
    id: 1,
    title: "Surya & Budha at 0° (Today)",
    datetime: "July 13, 2026, Monday at 05:53 AM",
  },
  {
    id: 2,
    title: "Yam enters in U Ashadha (Today)",
    datetime: "July 13, 2026, Monday at 03:53 AM",
  },
  {
    id: 3,
    title: "Yam transits U Ashadha Pada (Today)",
    datetime: "July 13, 2026, Monday at 08:53 AM",
  },
  {
    id: 4,
    title: "Shukra enters in P Phalguni (3 Days)",
    datetime: "July 16, 2026, Thursday at 06:53 AM",
  },
  {
    id: 5,
    title: "Guru transits Pushya Pada (6 Days)",
    datetime: "July 19, 2026, Sunday at 06:53 AM",
  },
  {
    id: 6,
    title: "Mangal & Shani at 60° (7 Days)",
    datetime: "July 20, 2026, Monday at 06:53 AM",
  },
  {
    id: 7,
    title: "Bhadra & Mangal at 90° (9 Days)",
    datetime: "July 22, 2026, Wednesday at 06:53 AM",
  },
] as const;

export const defaultMetrics: PanchangMetricsData = {
  sunrise: "05:24 AM",
  sunset: "07:18 PM",
  yoga: "Shubha",
  tithi: "Amavasya",
  nakshatra: "Rohini",
  karana: "Chatushpada",
  paksha: "Shukla Paksha",
  secondKarana: "Hasta 11:40 PM",
  abhijit: "11:51 - 12:44",
  varjam: "23:43 - 23:08",
  amruthaKala: "11:51 - 12:44",
  rahuKal: "15:36 - 23:08",
};

// ==========================================
// API INTEGRATION FUNCTION FOR PANCHANG
// ==========================================
export async function getPanchangData(date: string, place: string) {
  try {
    return {
      metrics: defaultMetrics,
      choghadiya: choghadiyaList,
      events: planetaryEvents,
      date,
      place,
    };
  } catch (error) {
    console.error("Error fetching Panchang data:", error);
    throw error;
  }
}
