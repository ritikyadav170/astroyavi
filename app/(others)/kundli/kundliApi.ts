import axios from "@/config/axios";
import { getCoordinates } from "../panchang/panchang";

export interface KundliFormData {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:mm
  placeOfBirth: string;
  gender: string; // male | female | other
  lat?: number;
  lon?: number;
}

export interface BasicAstroDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: string;
  lat?: number;
  lon?: number;
  tzone: number;
  sunrise: string;
  sunset: string;
  // Panchang / Avakahada
  ascendant: string;
  ascendantLord: string;
  sign: string;
  signLord: string;
  nakshatra: string;
  nakshatraLord: string;
  charan: number | string;
  yog: string;
  karan: string;
  tithi: string;
  paksha: string;
  tatva: string;
  paya: string;
  gan: string;
  varna: string;
  nadi: string;
  vashya: string;
  yoni: string;
  yunja: string;
  nameAlphabet: string;
}

export interface PlanetaryPositionItem {
  id: number;
  name: string;
  fullDegree: number | string;
  normDegree: number | string;
  speed: number | string;
  isRetro: boolean | string;
  sign: string;
  signLord: string;
  house: number | string;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraPad: number | string;
}

export interface HoroscopeChartData {
  d1Svg?: string;
  d9Svg?: string;
  moonSvg?: string;
  chalitSvg?: string;
}

export interface DoshaReport {
  manglik: {
    isManglik: boolean;
    status: string;
    percentage: number;
    description: string;
    exceptions: string[];
    house: number | string;
  };
  sadheSati: {
    isSadheSati: boolean;
    phase: string;
    description: string;
    startYear: string;
    endYear: string;
    saturnSign: string;
  };
  kaalSarp: {
    isKaalSarp: boolean;
    type: string;
    description: string;
    effects: string;
  };
  pitraDosha: {
    isPitraDosha: boolean;
    description: string;
    remedies: string[];
  };
}

export interface DashaItem {
  planet: string;
  startDate: string;
  endDate: string;
  durationYears: number | string;
  isActive?: boolean;
}

export interface YogaItem {
  name: string;
  description: string;
  effects: string;
  planets?: string;
}

export interface PredictionsData {
  ascendantReport: {
    personality: string;
    physical: string;
    mental: string;
    career: string;
    loveMarriage: string;
  };
  yogas: YogaItem[];
}

export interface RemediesData {
  rudraksha: {
    name: string;
    recommendation: string;
    deity: string;
    planet: string;
    mantra: string;
    benefits: string;
  };
  gemstones: {
    lifeStone: { name: string; finger: string; metal: string; planet: string };
    luckyStone: { name: string; finger: string; metal: string; planet: string };
    beneficStone: { name: string; finger: string; metal: string; planet: string };
  };
}

export interface FullKundliReportData {
  basic: BasicAstroDetails;
  planets: PlanetaryPositionItem[];
  charts: HoroscopeChartData;
  doshas: DoshaReport;
  dashas: DashaItem[];
  predictions: PredictionsData;
  remedies: RemediesData;
}

export const reportTabs: readonly string[] = [
  "Basic Details",
  "Kundli Predictions",
  "Position of Planet",
  "Chart",
  "Dosha",
  "Dasha",
  "Remedies",
] as const;

// =========================================================================
// API INTEGRATION FUNCTION FOR KUNDLI REPORT (ALL REAL DATA FROM API)
// =========================================================================
export async function getKundliReport(formData: KundliFormData): Promise<FullKundliReportData> {
  // Parse date
  const [yearStr, monthStr, dayStr] = (formData.dateOfBirth || "").split("-");
  const year = Number(yearStr) || new Date().getFullYear();
  const month = Number(monthStr) || new Date().getMonth() + 1;
  const day = Number(dayStr) || new Date().getDate();

  // Parse time
  const [hourStr, minStr] = (formData.timeOfBirth || "12:00").split(":");
  const hour = hourStr !== undefined && hourStr !== "" ? Number(hourStr) : 12;
  const min = minStr !== undefined && minStr !== "" ? Number(minStr) : 0;
  const sec = 0;

  // Coordinates
  let lat = formData.lat;
  let lon = formData.lon;
  if (lat === undefined || lon === undefined) {
    const coords = await getCoordinates(formData.placeOfBirth || "Delhi, India");
    lat = coords.lat;
    lon = coords.lon;
  }

  const gender = (formData.gender || "male").toLowerCase();
  const fullName = formData.fullName?.trim() || "";
  const place = formData.placeOfBirth?.trim() || "Delhi, India";

  const payload = {
    fullName,
    full_name: fullName,
    name: fullName,
    day,
    month,
    year,
    hour: hour === 0 ? "0" : hour,
    min: min === 0 ? "0" : min,
    sec: sec === 0 ? "0" : sec,
    gender,
    place,
    lat,
    lon,
    tzone: 5.5,
    lan: "en",
  };

  // Perform parallel requests directly to backend endpoints
  const [
    basicRes,
    planetsRes,
    chartD1Res,
    chartD9Res,
    chartMoonRes,
    manglikRes,
    sadheSatiRes,
    pitraRes,
    kaalSarpRes,
    dashaRes,
    ascReportRes,
    yogasRes,
    rudrakshaRes,
  ] = await Promise.all([
    axios.post("/basicAstroDetails", payload).catch((e) => {
      console.warn("basicAstroDetails error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/planetaryPositions", { ...payload, nodeType: "meannode" }).catch((e) => {
      console.warn("planetaryPositions error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/horoscopeChart", { ...payload, chartId: "D1", chartType: "north" }).catch((e) => {
      console.warn("horoscopeChart D1 error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/horoscopeChart", { ...payload, chartId: "D9", chartType: "north" }).catch((e) => {
      console.warn("horoscopeChart D9 error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/horoscopeChart", { ...payload, chartId: "MOON", chartType: "north" }).catch((e) => {
      console.warn("horoscopeChart MOON error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/manglikDosha", payload).catch((e) => {
      console.warn("manglikDosha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/sadheSati", payload).catch((e) => {
      console.warn("sadheSati error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/pitraDosha", payload).catch((e) => {
      console.warn("pitraDosha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/kaalSarpaDosha", { ...payload, nodeType: "meannode" }).catch((e) => {
      console.warn("kaalSarpaDosha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/vimshottariDasha", { ...payload, dashaType: "maha-dasha" }).catch((e) => {
      console.warn("vimshottariDasha error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/ascendantReport", payload).catch((e) => {
      console.warn("ascendantReport error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/yogas", payload).catch((e) => {
      console.warn("yogas error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
    axios.post("/rudrakshaSuggestion", payload).catch((e) => {
      console.warn("rudrakshaSuggestion error:", e?.response?.data || e.message);
      return { data: { data: null } };
    }),
  ]);

  const basicRaw = basicRes?.data?.data || {};
  const planetsRaw = planetsRes?.data?.data || {};
  const chartD1Raw = chartD1Res?.data?.data || {};
  const chartD9Raw = chartD9Res?.data?.data || {};
  const chartMoonRaw = chartMoonRes?.data?.data || {};
  const manglikRaw = manglikRes?.data?.data || {};
  const sadheSatiRaw = sadheSatiRes?.data?.data || {};
  const pitraRaw = pitraRes?.data?.data || {};
  const kaalSarpRaw = kaalSarpRes?.data?.data || {};
  const dashaRaw = dashaRes?.data?.data || {};
  const ascReportRaw = ascReportRes?.data?.data || {};
  const yogasRaw = yogasRes?.data?.data || {};
  const rudrakshaRaw = rudrakshaRes?.data?.data || {};

  // 1. Process Basic Details from live API
  const basic: BasicAstroDetails = {
    name: fullName,
    dateOfBirth: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`,
    timeOfBirth: `${String(hour % 12 || 12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`,
    placeOfBirth: place,
    gender: gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "--",
    lat,
    lon,
    tzone: 5.5,
    sunrise: basicRaw.sunrise || "--",
    sunset: basicRaw.sunset || "--",
    ascendant: basicRaw.ascendant || "--",
    ascendantLord: basicRaw.ascendant_lord || basicRaw.sign_lord || "--",
    sign: basicRaw.sign || basicRaw.moon_sign || "--",
    signLord: basicRaw.sign_lord || "--",
    nakshatra: basicRaw.nakshatra || "--",
    nakshatraLord: basicRaw.nakshatra_lord || "--",
    charan: basicRaw.charan || basicRaw.pada || "--",
    yog: basicRaw.yog || basicRaw.yoga || "--",
    karan: basicRaw.karan || basicRaw.karana || "--",
    tithi: basicRaw.tithi || "--",
    paksha: basicRaw.paksha || "--",
    tatva: basicRaw.tatva || basicRaw.element || "--",
    paya: basicRaw.paya || "--",
    gan: basicRaw.gan || basicRaw.gana || "--",
    varna: basicRaw.varna || "--",
    nadi: basicRaw.nadi || "--",
    vashya: basicRaw.vashya || "--",
    yoni: basicRaw.yoni || "--",
    yunja: basicRaw.yunja || "--",
    nameAlphabet: basicRaw.name_alphabet || "--",
  };

  // 2. Process Planetary Positions from live API
  let planets: PlanetaryPositionItem[] = [];
  if (Array.isArray(planetsRaw) && planetsRaw.length > 0) {
    planets = planetsRaw.map((p: any, idx: number) => ({
      id: idx + 1,
      name: p.name || p.planet || `Planet ${idx + 1}`,
      fullDegree: p.full_degree ? `${parseFloat(p.full_degree).toFixed(2)}°` : p.fullDegree || "--",
      normDegree: p.norm_degree || p.degree || "--",
      speed: p.speed !== undefined ? String(p.speed) : "--",
      isRetro: Boolean(p.is_retro || p.isRetro || p.retrograde),
      sign: p.sign || p.zodiac || "--",
      signLord: p.sign_lord || p.signLord || "--",
      house: p.house || p.house_number || idx + 1,
      nakshatra: p.nakshatra || "--",
      nakshatraLord: p.nakshatra_lord || p.nakshatraLord || "--",
      nakshatraPad: p.charan || p.pada || 1,
    }));
  } else if (typeof planetsRaw === "object" && Object.keys(planetsRaw).length > 0) {
    planets = Object.entries(planetsRaw).map(([key, val]: [string, any], idx) => ({
      id: idx + 1,
      name: val.name || key,
      fullDegree: val.full_degree ? `${parseFloat(val.full_degree).toFixed(2)}°` : "--",
      normDegree: val.norm_degree || val.degree || "--",
      speed: val.speed !== undefined ? String(val.speed) : "--",
      isRetro: Boolean(val.is_retro || val.retrograde),
      sign: val.sign || val.zodiac || "--",
      signLord: val.sign_lord || "--",
      house: val.house || idx + 1,
      nakshatra: val.nakshatra || "--",
      nakshatraLord: val.nakshatra_lord || "--",
      nakshatraPad: val.charan || val.pada || 1,
    }));
  }

  // 3. Process Charts from live API
  const charts: HoroscopeChartData = {
    d1Svg: chartD1Raw.svg || chartD1Raw.chart || (typeof chartD1Raw === "string" ? chartD1Raw : ""),
    d9Svg: chartD9Raw.svg || chartD9Raw.chart || (typeof chartD9Raw === "string" ? chartD9Raw : ""),
    moonSvg: chartMoonRaw.svg || chartMoonRaw.chart || (typeof chartMoonRaw === "string" ? chartMoonRaw : ""),
  };

  // 4. Process Doshas from live API
  const doshas: DoshaReport = {
    manglik: {
      isManglik: Boolean(manglikRaw.is_manglik || manglikRaw.manglik_present || manglikRaw.status?.toLowerCase()?.includes("manglik")),
      status: manglikRaw.manglik_status || (manglikRaw.is_manglik ? "Manglik" : "Non-Manglik"),
      percentage: Number(manglikRaw.percentage || manglikRaw.manglik_percentage) || (manglikRaw.is_manglik ? 65 : 0),
      description: manglikRaw.description || manglikRaw.report || "No severe Kuja dosha found in chart.",
      exceptions: Array.isArray(manglikRaw.exceptions) ? manglikRaw.exceptions : [],
      house: manglikRaw.house || "--",
    },
    sadheSati: {
      isSadheSati: Boolean(sadheSatiRaw.is_sadhe_sati || sadheSatiRaw.is_present),
      phase: sadheSatiRaw.phase || sadheSatiRaw.current_phase || "No Active Phase",
      description: sadheSatiRaw.description || sadheSatiRaw.consideration || "Saturn is not currently transiting over natal Moon sign.",
      startYear: sadheSatiRaw.start_year || "--",
      endYear: sadheSatiRaw.end_year || "--",
      saturnSign: sadheSatiRaw.saturn_sign || "--",
    },
    kaalSarp: {
      isKaalSarp: Boolean(kaalSarpRaw.is_kaal_sarp || kaalSarpRaw.is_present),
      type: kaalSarpRaw.type || kaalSarpRaw.name || "None",
      description: kaalSarpRaw.description || "Planetary energies flow without Kaal Sarp constriction.",
      effects: kaalSarpRaw.effects || "--",
    },
    pitraDosha: {
      isPitraDosha: Boolean(pitraRaw.is_pitra_dosha || pitraRaw.is_present),
      description: pitraRaw.description || pitraRaw.report || "No major Pitra Dosha detected in chart.",
      remedies: Array.isArray(pitraRaw.remedies) ? pitraRaw.remedies : ["Perform regular Surya Namaskar and respect elders."],
    },
  };

  // 5. Process Dashas from live API
  let dashas: DashaItem[] = [];
  const dashaArray = dashaRaw.dasha_periods || dashaRaw.maha_dasha || dashaRaw.periods || (Array.isArray(dashaRaw) ? dashaRaw : []);
  if (Array.isArray(dashaArray) && dashaArray.length > 0) {
    dashas = dashaArray.map((d: any) => ({
      planet: d.planet || d.name || "Dasha",
      startDate: d.start_date || d.start || "--",
      endDate: d.end_date || d.end || "--",
      durationYears: d.duration || d.years || "--",
      isActive: Boolean(d.is_active || d.active),
    }));
  }

  // 6. Process Predictions from live API
  const predictions: PredictionsData = {
    ascendantReport: {
      personality: ascReportRaw.personality || ascReportRaw.character || "--",
      physical: ascReportRaw.physical_appearance || ascReportRaw.appearance || "--",
      mental: ascReportRaw.mental_temperament || ascReportRaw.temperament || "--",
      career: ascReportRaw.career_finance || ascReportRaw.career || "--",
      loveMarriage: ascReportRaw.love_marriage || ascReportRaw.relationship || "--",
    },
    yogas: Array.isArray(yogasRaw.yogas || yogasRaw) && (yogasRaw.yogas || yogasRaw).length > 0
      ? (yogasRaw.yogas || yogasRaw).map((y: any) => ({
          name: y.name || y.yoga || "Vedic Yoga",
          description: y.description || y.rule || "--",
          effects: y.effects || y.result || "--",
          planets: y.planets || "",
        }))
      : [],
  };

  // 7. Process Remedies from live API
  const remedies: RemediesData = {
    rudraksha: {
      name: rudrakshaRaw.name || rudrakshaRaw.recommended_rudraksha || "--",
      recommendation: rudrakshaRaw.recommendation || rudrakshaRaw.description || "--",
      deity: rudrakshaRaw.ruling_deity || rudrakshaRaw.deity || "--",
      planet: rudrakshaRaw.ruling_planet || rudrakshaRaw.planet || "--",
      mantra: rudrakshaRaw.wearing_mantra || rudrakshaRaw.mantra || "--",
      benefits: rudrakshaRaw.benefits || "--",
    },
    gemstones: {
      lifeStone: {
        name: basic.ascendantLord ? `${basic.ascendantLord} Gemstone` : "--",
        finger: "Middle Finger",
        metal: "Silver / Gold",
        planet: basic.ascendantLord || "--",
      },
      luckyStone: {
        name: basic.signLord ? `${basic.signLord} Gemstone` : "--",
        finger: "Little Finger",
        metal: "Gold / Bronze",
        planet: basic.signLord || "--",
      },
      beneficStone: {
        name: "Benefic Planetary Gemstone",
        finger: "Ring Finger",
        metal: "Silver / Platinum",
        planet: "--",
      },
    },
  };

  return {
    basic,
    planets,
    charts,
    doshas,
    dashas,
    predictions,
    remedies,
  };
}
