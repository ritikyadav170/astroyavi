export interface Mandir {
  id: number;
  title: string;
  location: string;
  state: string;
  viewers: string;
  image: string;
  youtubeId: string;
}

export const mockMandirs: readonly Mandir[] = [
  {
    id: 1,
    title: "Bihari Ji Mandir",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "12.4k",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Barshana Mandir",
    location: "Barsana",
    state: "Uttar Pradesh",
    viewers: "8.9k",
    image:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Salasar Mandir",
    location: "Salasar",
    state: "Rajasthan",
    viewers: "15.2k",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Maha Kaleshwar Mandir",
    location: "Ujjain",
    state: "Madhya Pradesh",
    viewers: "28.6k",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Bihari Ji Live Darshan",
    location: "Vrindavan",
    state: "Uttar Pradesh",
    viewers: "9.1k",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export async function getLiveMandirs(searchQuery?: string): Promise<Mandir[]> {
  try {
    if (!searchQuery) return mockMandirs as Mandir[];
    const q = searchQuery.toLowerCase();
    return mockMandirs.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q)
    );
  } catch (error) {
    console.error("Error fetching live mandir streams:", error);
    return mockMandirs as Mandir[];
  }
}
