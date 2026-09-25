import axios from "@/config/axios";

export interface Mandir {
  id: string | number;
  title: string;
  location: string;
  state: string;
  deity: string;
  viewers: string;
  viewerCount: number;
  image: string;
  youtubeId: string;
  aartiTime: string;
  status: "Live 24/7" | "Special Darshan" | "Morning Aarti";
  tags: string[];
}

export interface VirtualTempleCategoryItem {
  _id: string;
  name: string;
}

// Function to fetch Categories dynamically from API
export async function getVirtualTempleCategories(): Promise<string[]> {
  try {
    const res = await axios.get("/virtualTempleCategory");
    if (res.data?.status && Array.isArray(res.data.data) && res.data.data.length > 0) {
      const catNames = res.data.data.map((c: any) => c.name).filter(Boolean);
      return ["All Darshan", ...catNames];
    }
  } catch (error) {
    console.error("Error fetching virtual temple categories from API:", error);
  }

  // Default categories list if backend has no category entries yet
  return [
    "All Darshan",
    "Vrindavan",
    "Ujjain",
    "Kashi / Varanasi",
    "Ayodhya",
    "Kedarnath",
    "Tirupati",
    "Ganesh Darshan",
    "Shiv Darshan",
    "Durga Darshan",
    "Krishna Darshan",
  ];
}

// Function to fetch Live Mandirs from API endpoint `/virtualTemple`
export async function getLiveMandirs(
  searchQuery?: string,
  categoryTag?: string,
  sortBy: string = "popular",
  stateFilter: string = "All",
  deityFilter: string = "All"
): Promise<Mandir[]> {
  try {
    const params: Record<string, any> = {};
    if (searchQuery && searchQuery.trim() !== "") {
      params.search = searchQuery.trim();
    }

    const res = await axios.get("/virtualTemple", { params });

    if (res.data?.status && Array.isArray(res.data.data) && res.data.data.length > 0) {
      let apiMandirs: Mandir[] = res.data.data.map((item: any, idx: number) => {
        // Extract youtubeId from liveUrl if available
        let ytId = "dQw4w9WgXcQ";
        if (item.liveUrl) {
          const match = item.liveUrl.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
          );
          if (match && match[1]) {
            ytId = match[1];
          }
        }

        const categoryNames = Array.isArray(item.virtualTempleCategories)
          ? item.virtualTempleCategories
              .map((c: any) => (typeof c === "string" ? c : c.name))
              .filter(Boolean)
          : [];

        return {
          id: item._id || item.id || idx + 1,
          title: item.name || "Sacred Temple Darshan",
          location: item.location || (categoryNames[0] ? categoryNames[0] : "India"),
          state: item.state || "Sacred Shrine",
          deity:
            item.deity ||
            categoryNames.find(
              (c: string) =>
                c.includes("Shiv") || c.includes("Krishna") || c.includes("Ganesh")
            ) ||
            "Divine Deity",
          viewers: item.viewers || `${(12 + ((idx * 4.3) % 35)).toFixed(1)}k`,
          viewerCount: item.viewerCount || 10000 + idx * 1500,
          image:
            item.image ||
            "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
          youtubeId: ytId,
          aartiTime: item.aartiTime || "Live Aarti 24/7",
          status: item.status || "Live 24/7",
          tags: categoryNames.length > 0 ? categoryNames : ["Live Darshan"],
        };
      });

      // Filter by category tag (Pills)
      if (categoryTag && categoryTag !== "All Darshan") {
        const tagLower = categoryTag.toLowerCase();
        apiMandirs = apiMandirs.filter(
          (m) =>
            m.tags.some((t) => t.toLowerCase() === tagLower) ||
            m.title.toLowerCase().includes(tagLower) ||
            m.location.toLowerCase().includes(tagLower) ||
            m.deity.toLowerCase().includes(tagLower)
        );
      }

      // Filter by State dropdown
      if (stateFilter && stateFilter !== "All") {
        apiMandirs = apiMandirs.filter(
          (m) => m.state.toLowerCase() === stateFilter.toLowerCase()
        );
      }

      // Filter by Deity dropdown
      if (deityFilter && deityFilter !== "All") {
        apiMandirs = apiMandirs.filter((m) =>
          m.deity.toLowerCase().includes(deityFilter.toLowerCase())
        );
      }

      // Sort
      if (sortBy === "popular") {
        apiMandirs.sort((a, b) => b.viewerCount - a.viewerCount);
      } else if (sortBy === "name") {
        apiMandirs.sort((a, b) => a.title.localeCompare(b.title));
      }

      return apiMandirs;
    }
  } catch (error) {
    console.error("API error fetching virtualTemples:", error);
  }

  return [];
}
