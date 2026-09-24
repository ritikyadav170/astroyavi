import axios from "@/config/axios";
import { getCoordinates } from "../panchang/panchang";

export interface ProfileCard {
  id: string;
  label: string;
  image: string;
}

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

export interface ProfileDetails {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:mm
  placeOfBirth: string;
  gender?: string;
  lat?: number;
  lon?: number;
}

export interface KootItem {
  name: string;
  hindiName: string;
  receivedPoints: number;
  maxPoints: number;
  description: string;
  status: "Auspicious" | "Average" | "Inauspicious";
  boyAttribute?: string;
  girlAttribute?: string;
}

export interface MatchMakingResult {
  score: number;
  maxScore: number;
  percentage: number;
  conclusion: string;
  recommendation: "Excellent" | "Good" | "Average" | "Not Recommended";
  boyDetails: ProfileDetails;
  girlDetails: ProfileDetails;
  boyAstro: {
    sign: string;
    signLord: string;
    nakshatra: string;
    charan: string | number;
    gan: string;
    nadi: string;
    yoni: string;
    varna: string;
    isManglik: boolean;
  };
  girlAstro: {
    sign: string;
    signLord: string;
    nakshatra: string;
    charan: string | number;
    gan: string;
    nadi: string;
    yoni: string;
    varna: string;
    isManglik: boolean;
  };
  ashtakoot: {
    varna: KootItem;
    vashya: KootItem;
    tara: KootItem;
    yoni: KootItem;
    maitri: KootItem;
    gan: KootItem;
    bhakoot: KootItem;
    nadi: KootItem;
  };
  radarData: {
    labels: string[];
    values: number[];
  };
  doshaAnalysis: {
    manglikMatch: string;
    nadiDosha: { present: boolean; remedy: string };
    bhakootDosha: { present: boolean; remedy: string };
  };
  detailedInsights: {
    mental: string;
    physical: string;
    emotional: string;
    financial: string;
    family: string;
  };
}

export interface SavedMatchProfile {
  _id: string;
  userId?: string;
  user1: {
    fullName?: string;
    day?: number;
    month?: number;
    year?: number;
    hour?: number;
    min?: number;
    gender?: string;
    place?: string;
  };
  user2: {
    fullName?: string;
    day?: number;
    month?: number;
    year?: number;
    hour?: number;
    min?: number;
    gender?: string;
    place?: string;
  };
  createdAt?: string;
}

function extractVal(val: any, fallback = "--"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    if (typeof val.name === "string") return val.name.trim();
    if (typeof val.result === "string") return val.result.trim();
    if (typeof val.report === "string") return val.report.trim();
    return fallback;
  }
  return fallback;
}

// =========================================================================
// ASHTAKOOT GUNA MILAN ENGINE (VEDIC CALCULATION)
// =========================================================================
const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const RASHIS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

// Helper to compute Gun Milan
function computeAshtakoot(boyAstro: any, girlAstro: any) {
  const boyNakIdx = Math.max(0, NAKSHATRAS.findIndex((n) => boyAstro.nakshatra.toLowerCase().includes(n.toLowerCase())));
  const girlNakIdx = Math.max(0, NAKSHATRAS.findIndex((n) => girlAstro.nakshatra.toLowerCase().includes(n.toLowerCase())));

  const boyRashiIdx = Math.max(0, RASHIS.findIndex((r) => boyAstro.sign.toLowerCase().includes(r.toLowerCase())));
  const girlRashiIdx = Math.max(0, RASHIS.findIndex((r) => girlAstro.sign.toLowerCase().includes(r.toLowerCase())));

  // 1. Varna (1 Point)
  const varnaOrder: Record<string, number> = { brahmin: 4, kshatriya: 3, vaishya: 2, shudra: 1 };
  const boyVarnaVal = varnaOrder[boyAstro.varna.toLowerCase()] || 2;
  const girlVarnaVal = varnaOrder[girlAstro.varna.toLowerCase()] || 2;
  const varnaPoints = boyVarnaVal >= girlVarnaVal ? 1 : 0;

  // 2. Vashya (2 Points)
  let vashyaPoints = 1;
  if (boyRashiIdx === girlRashiIdx) vashyaPoints = 2;
  else if (Math.abs(boyRashiIdx - girlRashiIdx) === 6) vashyaPoints = 0;
  else if ([4, 8, 2, 6, 10].includes(Math.abs(boyRashiIdx - girlRashiIdx))) vashyaPoints = 2;

  // 3. Tara (3 Points)
  const taraFromGirl = ((boyNakIdx - girlNakIdx + 27) % 9) + 1;
  const taraFromBoy = ((girlNakIdx - boyNakIdx + 27) % 9) + 1;
  const taraAuspicious = [1, 2, 4, 6, 8, 9];
  let taraPoints = 0;
  if (taraAuspicious.includes(taraFromGirl) && taraAuspicious.includes(taraFromBoy)) taraPoints = 3;
  else if (taraAuspicious.includes(taraFromGirl) || taraAuspicious.includes(taraFromBoy)) taraPoints = 1.5;

  // 4. Yoni (4 Points)
  const boyYoni = (boyAstro.yoni || "").toLowerCase();
  const girlYoni = (girlAstro.yoni || "").toLowerCase();
  let yoniPoints = 2;
  if (boyYoni === girlYoni && boyYoni !== "--") yoniPoints = 4;
  else if (["ashwa", "gaja", "mesha", "gau", "mriga"].some((y) => boyYoni.includes(y) && girlYoni.includes(y))) yoniPoints = 3;
  else if ((boyYoni.includes("simha") && girlYoni.includes("gaja")) || (boyYoni.includes("marjara") && girlYoni.includes("mushaka"))) yoniPoints = 0;

  // 5. Graha Maitri (5 Points)
  const rashiDiff = Math.abs(boyRashiIdx - girlRashiIdx);
  let maitriPoints = 3;
  if (boyRashiIdx === girlRashiIdx) maitriPoints = 5;
  else if ([4, 8, 2, 10].includes(rashiDiff)) maitriPoints = 4;
  else if ([6, 7].includes(rashiDiff)) maitriPoints = 0.5;

  // 6. Gana (6 Points)
  const boyGan = (boyAstro.gan || "").toLowerCase();
  const girlGan = (girlAstro.gan || "").toLowerCase();
  let ganPoints = 3;
  if (boyGan === girlGan && boyGan !== "--") ganPoints = 6;
  else if ((boyGan.includes("deva") && girlGan.includes("manushya")) || (boyGan.includes("manushya") && girlGan.includes("deva"))) ganPoints = 5;
  else if ((boyGan.includes("rakshasa") && !girlGan.includes("rakshasa")) || (girlGan.includes("rakshasa") && !boyGan.includes("rakshasa"))) ganPoints = 0;

  // 7. Bhakoot (7 Points)
  const rashiDist = ((girlRashiIdx - boyRashiIdx + 12) % 12) + 1;
  let bhakootPoints = 7;
  let hasBhakootDosha = false;
  if ([6, 8, 9, 5, 2, 12].includes(rashiDist)) {
    bhakootPoints = 0;
    hasBhakootDosha = true;
  }

  // 8. Nadi (8 Points)
  const boyNadi = (boyAstro.nadi || "").toLowerCase();
  const girlNadi = (girlAstro.nadi || "").toLowerCase();
  let nadiPoints = 8;
  let hasNadiDosha = false;
  if (boyNadi === girlNadi && boyNadi !== "--" && boyNadi !== "") {
    nadiPoints = 0;
    hasNadiDosha = true;
  }

  const totalScore = Number((varnaPoints + vashyaPoints + taraPoints + yoniPoints + maitriPoints + ganPoints + bhakootPoints + nadiPoints).toFixed(1));

  let recommendation: "Excellent" | "Good" | "Average" | "Not Recommended" = "Good";
  if (totalScore >= 28) recommendation = "Excellent";
  else if (totalScore >= 18) recommendation = "Good";
  else if (totalScore >= 12) recommendation = "Average";
  else recommendation = "Not Recommended";

  return {
    totalScore,
    recommendation,
    hasNadiDosha,
    hasBhakootDosha,
    ashtakoot: {
      varna: {
        name: "Varna",
        hindiName: "वर्ण",
        receivedPoints: varnaPoints,
        maxPoints: 1,
        description: varnaPoints === 1 ? "Harmonious mental working capacity and mutual respect." : "Difference in ego or spiritual outlook.",
        status: varnaPoints === 1 ? "Auspicious" : "Average",
        boyAttribute: boyAstro.varna,
        girlAttribute: girlAstro.varna,
      },
      vashya: {
        name: "Vashya",
        hindiName: "वश्य",
        receivedPoints: vashyaPoints,
        maxPoints: 2,
        description: vashyaPoints >= 1 ? "Balanced emotional mutual control and affection." : "Possibility of dominance clash.",
        status: vashyaPoints === 2 ? "Auspicious" : vashyaPoints >= 1 ? "Average" : "Inauspicious",
        boyAttribute: boyAstro.sign,
        girlAttribute: girlAstro.sign,
      },
      tara: {
        name: "Tara",
        hindiName: "तारा",
        receivedPoints: taraPoints,
        maxPoints: 3,
        description: taraPoints >= 2 ? "Favorable destiny, long-term health and good fortune." : "Moderate luck and mutual support.",
        status: taraPoints === 3 ? "Auspicious" : taraPoints > 0 ? "Average" : "Inauspicious",
        boyAttribute: boyAstro.nakshatra,
        girlAttribute: girlAstro.nakshatra,
      },
      yoni: {
        name: "Yoni",
        hindiName: "योनि",
        receivedPoints: yoniPoints,
        maxPoints: 4,
        description: yoniPoints >= 3 ? "Strong physical, intimate and biological compatibility." : "Average physical affinity.",
        status: yoniPoints >= 3 ? "Auspicious" : yoniPoints >= 2 ? "Average" : "Inauspicious",
        boyAttribute: boyAstro.yoni,
        girlAttribute: girlAstro.yoni,
      },
      maitri: {
        name: "Graha Maitri",
        hindiName: "ग्रह मैत्री",
        receivedPoints: maitriPoints,
        maxPoints: 5,
        description: maitriPoints >= 3 ? "Friendly natural intellect, communication, and shared values." : "Differing temperaments.",
        status: maitriPoints >= 4 ? "Auspicious" : maitriPoints >= 2 ? "Average" : "Inauspicious",
        boyAttribute: boyAstro.signLord,
        girlAttribute: girlAstro.signLord,
      },
      gan: {
        name: "Gana",
        hindiName: "गण",
        receivedPoints: ganPoints,
        maxPoints: 6,
        description: ganPoints >= 4 ? "Compatible psychological temperament and social nature." : "Opposing lifestyles and nature.",
        status: ganPoints >= 4 ? "Auspicious" : ganPoints > 0 ? "Average" : "Inauspicious",
        boyAttribute: boyAstro.gan,
        girlAttribute: girlAstro.gan,
      },
      bhakoot: {
        name: "Bhakoot",
        hindiName: "भकूट",
        receivedPoints: bhakootPoints,
        maxPoints: 7,
        description: bhakootPoints === 7 ? "Excellent family prosperity, longevity of marriage, and happiness." : "Bhakoot Dosha: Requires puja remedy for financial stability.",
        status: bhakootPoints === 7 ? "Auspicious" : "Inauspicious",
        boyAttribute: boyAstro.sign,
        girlAttribute: girlAstro.sign,
      },
      nadi: {
        name: "Nadi",
        hindiName: "नाड़ी",
        receivedPoints: nadiPoints,
        maxPoints: 8,
        description: nadiPoints === 8 ? "Optimal health, genetic harmony and progeny blessing." : "Nadi Dosha: Same nadi requires Nadi Shanti Puja.",
        status: nadiPoints === 8 ? "Auspicious" : "Inauspicious",
        boyAttribute: boyAstro.nadi,
        girlAttribute: girlAstro.nadi,
      },
    },
    radarData: {
      labels: [
        `Nature ${ganPoints}/6`,
        `Love ${yoniPoints}/4`,
        `Health ${nadiPoints}/8`,
        `Mentality ${maitriPoints}/5`,
        `Compatibility ${bhakootPoints}/7`,
        `Dominance ${vashyaPoints}/2`,
        `Destiny ${taraPoints}/3`,
        `Work ${varnaPoints}/1`,
      ],
      values: [
        (ganPoints / 6) * 10,
        (yoniPoints / 4) * 10,
        (nadiPoints / 8) * 10,
        (maitriPoints / 5) * 10,
        (bhakootPoints / 7) * 10,
        (vashyaPoints / 2) * 10,
        (taraPoints / 3) * 10,
        (varnaPoints / 1) * 10,
      ],
    },
  };
}

// =========================================================================
// API INTEGRATION: FETCH MATCH REPORT & SAVE PROFILE
// =========================================================================
export async function getMatchMakingReport(
  boyDetails: ProfileDetails,
  girlDetails: ProfileDetails
): Promise<MatchMakingResult> {
  // Parse boy details
  const [bYearStr, bMonthStr, bDayStr] = (boyDetails.dateOfBirth || "").split("-");
  const bYear = Number(bYearStr) || 1995;
  const bMonth = Number(bMonthStr) || 1;
  const bDay = Number(bDayStr) || 1;
  const [bHourStr, bMinStr] = (boyDetails.timeOfBirth || "12:00").split(":");
  const bHour = bHourStr ? Number(bHourStr) : 12;
  const bMin = bMinStr ? Number(bMinStr) : 0;

  // Parse girl details
  const [gYearStr, gMonthStr, gDayStr] = (girlDetails.dateOfBirth || "").split("-");
  const gYear = Number(gYearStr) || 1997;
  const gMonth = Number(gMonthStr) || 1;
  const gDay = Number(gDayStr) || 1;
  const [gHourStr, gMinStr] = (girlDetails.timeOfBirth || "12:00").split(":");
  const gHour = gHourStr ? Number(gHourStr) : 12;
  const gMin = gMinStr ? Number(gMinStr) : 0;

  // Resolve coordinates
  let bLat = boyDetails.lat;
  let bLon = boyDetails.lon;
  if (bLat === undefined || bLon === undefined) {
    const coords = await getCoordinates(boyDetails.placeOfBirth || "Delhi, India");
    bLat = coords.lat;
    bLon = coords.lon;
  }

  let gLat = girlDetails.lat;
  let gLon = girlDetails.lon;
  if (gLat === undefined || gLon === undefined) {
    const coords = await getCoordinates(girlDetails.placeOfBirth || "Delhi, India");
    gLat = coords.lat;
    gLon = coords.lon;
  }

  const boyPayload = {
    fullName: boyDetails.fullName || "Boy",
    full_name: boyDetails.fullName || "Boy",
    name: boyDetails.fullName || "Boy",
    day: bDay,
    month: bMonth,
    year: bYear,
    hour: bHour === 0 ? "0" : bHour,
    min: bMin === 0 ? "0" : bMin,
    sec: "0",
    gender: "male",
    place: boyDetails.placeOfBirth || "Delhi, India",
    lat: bLat,
    lon: bLon,
    tzone: 5.5,
    lan: "en",
  };

  const girlPayload = {
    fullName: girlDetails.fullName || "Girl",
    full_name: girlDetails.fullName || "Girl",
    name: girlDetails.fullName || "Girl",
    day: gDay,
    month: gMonth,
    year: gYear,
    hour: gHour === 0 ? "0" : gHour,
    min: gMin === 0 ? "0" : gMin,
    sec: "0",
    gender: "female",
    place: girlDetails.placeOfBirth || "Delhi, India",
    lat: gLat,
    lon: gLon,
    tzone: 5.5,
    lan: "en",
  };

  // Perform parallel requests for both Boy and Girl astro details & Manglik dosha
  const [boyBasicRes, girlBasicRes, boyManglikRes, girlManglikRes] = await Promise.all([
    axios.post("/basicAstroDetails", boyPayload).catch((e) => {
      console.warn("Boy basicAstroDetails error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/basicAstroDetails", girlPayload).catch((e) => {
      console.warn("Girl basicAstroDetails error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/manglikDosha", boyPayload).catch((e) => {
      console.warn("Boy manglikDosha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/manglikDosha", girlPayload).catch((e) => {
      console.warn("Girl manglikDosha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
  ]);

  const bRaw = boyBasicRes?.data?.data || {};
  const gRaw = girlBasicRes?.data?.data || {};
  const bManglikRaw = boyManglikRes?.data?.data || {};
  const gManglikRaw = girlManglikRes?.data?.data || {};

  const boyAstro = {
    sign: extractVal(bRaw.sign || bRaw.moon_sign, "Aries"),
    signLord: extractVal(bRaw.sign_lord, "Mars"),
    nakshatra: extractVal(bRaw.nakshatra, "Ashwini"),
    charan: extractVal(bRaw.charan || bRaw.pada, 1),
    gan: extractVal(bRaw.gan || bRaw.gana, "Deva"),
    nadi: extractVal(bRaw.nadi, "Aadi"),
    yoni: extractVal(bRaw.yoni, "Ashwa"),
    varna: extractVal(bRaw.varna, "Kshatriya"),
    isManglik: Boolean(bManglikRaw.is_manglik || String(bManglikRaw.status || "").toLowerCase().includes("manglik")),
  };

  const girlAstro = {
    sign: extractVal(gRaw.sign || gRaw.moon_sign, "Leo"),
    signLord: extractVal(gRaw.sign_lord, "Sun"),
    nakshatra: extractVal(gRaw.nakshatra, "Magha"),
    charan: extractVal(gRaw.charan || gRaw.pada, 1),
    gan: extractVal(gRaw.gan || gRaw.gana, "Manushya"),
    nadi: extractVal(gRaw.nadi, "Madhya"),
    yoni: extractVal(gRaw.yoni, "Gaja"),
    varna: extractVal(gRaw.varna, "Kshatriya"),
    isManglik: Boolean(gManglikRaw.is_manglik || String(gManglikRaw.status || "").toLowerCase().includes("manglik")),
  };

  // Compute Ashtakoot Match
  const { totalScore, recommendation, ashtakoot, radarData, hasNadiDosha, hasBhakootDosha } = computeAshtakoot(boyAstro, girlAstro);

  // Save profile to backend kundliMatchProfile in background
  try {
    await axios.post("/kundliMatchProfile", {
      person1: {
        fullName: boyDetails.fullName,
        day: bDay,
        month: bMonth,
        year: bYear,
        hour: bHour,
        min: bMin,
        sec: 0,
        gender: "male",
        place: boyDetails.placeOfBirth,
        lat: bLat,
        lon: bLon,
        tzone: 5.5,
      },
      person2: {
        fullName: girlDetails.fullName,
        day: gDay,
        month: gMonth,
        year: gYear,
        hour: gHour,
        min: gMin,
        sec: 0,
        gender: "female",
        place: girlDetails.placeOfBirth,
        lat: gLat,
        lon: gLon,
        tzone: 5.5,
      },
    }).catch(() => {});
  } catch {
    // ignore if guest user not authenticated
  }

  // Manglik analysis
  let manglikMatch = "Both charts have balanced Manglik energies.";
  if (boyAstro.isManglik && girlAstro.isManglik) {
    manglikMatch = "Both are Manglik. Kuja dosha gets automatically cancelled (दोष भंग).";
  } else if (boyAstro.isManglik && !girlAstro.isManglik) {
    manglikMatch = "Boy is Manglik while Girl is Non-Manglik. Astrological consultation recommended.";
  } else if (!boyAstro.isManglik && girlAstro.isManglik) {
    manglikMatch = "Girl is Manglik while Boy is Non-Manglik. Astrological remedies suggested.";
  } else {
    manglikMatch = "Neither partner is Manglik. Fully auspicious for marriage.";
  }

  return {
    score: totalScore,
    maxScore: 36,
    percentage: Math.round((totalScore / 36) * 100),
    conclusion:
      totalScore >= 28
        ? "Excellent match! Planetary vibrations align harmoniously for marital bliss, health, and prosperity."
        : totalScore >= 18
        ? "Good and auspicious match according to Vedic standards. Approved for wedding."
        : "Below traditional threshold. Astrological consultation and Vedic remedies recommended.",
    recommendation,
    boyDetails,
    girlDetails,
    boyAstro,
    girlAstro,
    ashtakoot,
    radarData,
    doshaAnalysis: {
      manglikMatch,
      nadiDosha: {
        present: hasNadiDosha,
        remedy: hasNadiDosha ? "Perform Nadi Nivarana Mahapuja or consult an expert astrologer." : "None needed.",
      },
      bhakootDosha: {
        present: hasBhakootDosha,
        remedy: hasBhakootDosha ? "Perform Bhakoot Shanti Puja and Shiva-Parvati worship." : "None needed.",
      },
    },
    detailedInsights: {
      mental:
        ashtakoot.maitri.receivedPoints >= 3
          ? "High mutual understanding, constructive communication, and emotional resonance."
          : "Occasional difference of viewpoint requiring patient dialogue.",
      physical:
        ashtakoot.yoni.receivedPoints >= 3
          ? "Strong biological and intimate affinity ensuring lifelong physical contentment."
          : "Moderate physical rapport with good scope for mutual adaptation.",
      emotional:
        ashtakoot.bhakoot.receivedPoints >= 5
          ? "Deep empathetic connection and profound trust across marital life."
          : "Requires consistent emotional bonding exercises.",
      financial:
        ashtakoot.bhakoot.receivedPoints >= 5
          ? "Favorable planetary alignment for joint wealth generation and household stability."
          : "Prudent financial planning recommended.",
      family:
        ashtakoot.gan.receivedPoints >= 4
          ? "Harmonious blending with extended families and peaceful domestic environment."
          : "Respect for differing familial traditions will foster peace.",
    },
  };
}

// Fetch saved profiles from backend
export async function getSavedMatchProfiles(): Promise<SavedMatchProfile[]> {
  try {
    const res = await axios.get("/kundliMatchProfile");
    const profiles = res?.data?.data?.profiles || res?.data?.profiles || [];
    return Array.isArray(profiles) ? profiles : [];
  } catch {
    return [];
  }
}
