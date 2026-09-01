export interface ProfileDetails {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export interface PreviousReport {
  initials: string;
  name: string;
  date: string;
  color: string;
}

export interface ProfileCard {
  id: string;
  label: string;
  image: string;
}

export interface Astrologer {
  name: string;
  title: string;
  rating: number;
  fee: string;
  image: string;
}

export const previousReports: readonly PreviousReport[] = [
  {
    initials: "RP",
    name: "Rahul Sharma & Priya Sharma",
    date: "12 Jul 2026, 02:30 PM",
    color: "#cfe9da",
  },
  {
    initials: "RL",
    name: "Rajan Kholi & Laxmi Kholi",
    date: "12 Jul 2026, 03:30 PM",
    color: "#e6d8f0",
  },
  {
    initials: "RV",
    name: "Ravi Verma & Reema Verma",
    date: "12 Jul 2026, 04:30 PM",
    color: "#d9e7f3",
  },
  {
    initials: "SS",
    name: "Sandeep Bhardwaj & Sonia Bhardwaj",
    date: "12 Jul 2026, 05:30 PM",
    color: "#e9d9e7",
  },
  {
    initials: "DP",
    name: "Deepak Kumar & Priya Kumar",
    date: "12 Jul 2026, 06:30 PM",
    color: "#e8d5d0",
  },
] as const;

export const profileCards: readonly ProfileCard[] = [
  {
    id: "boy",
    label: "Boy",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "girl",
    label: "Girl",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
] as const;

export const compatibilityData = {
  labels: [
    "Nature 8/8",
    "Love 8/8",
    "Health 8/8",
    "Mentality 2/4",
    "Compatibility 4/5",
    "Dominance 0.5/2",
    "Trust 0.5/2",
    "Work 1/1",
  ],
  values: [8, 8, 8, 2, 4, 0.5, 0.5, 1],
} as const;

export const recommendedAstrologers: readonly Astrologer[] = [
  {
    name: "Vikram Singh",
    title: "Vedic Astrology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ravindra Sharma",
    title: "Tarot Reading",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sandeep Sharma",
    title: "Vastu, Tarot Reading",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pinki Choudhary",
    title: "Face Reading, Numerology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Raju Srivastav",
    title: "Kal Litab, Nadi, Numerology",
    rating: 5.0,
    fee: "₹20/min",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
  },
] as const;

export const reportText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

// ==========================================
// API INTEGRATION FUNCTION FOR MATCHMAKING
// Connect your backend API URL here when ready
// ==========================================
export async function getMatchMakingReport(
  boyDetails: ProfileDetails,
  girlDetails: ProfileDetails
) {
  try {
    // Example backend API call:
    // const res = await fetch("/api/match-making", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ boyDetails, girlDetails }),
    // });
    // return await res.json();
    return {
      score: "20/36",
      compatibilityData,
      reportText,
      boyDetails,
      girlDetails,
    };
  } catch (error) {
    console.error("Error fetching match making report:", error);
    throw error;
  }
}
