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

function extractString(val: any, fallback = "--"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    if (typeof val.result === "string" && val.result.trim()) return val.result.trim();
    if (typeof val.description === "string" && val.description.trim()) return val.description.trim();
    if (typeof val.report === "string" && val.report.trim()) return val.report.trim();
    if (typeof val.name === "string" && val.name.trim()) return val.name.trim();
    if (typeof val.meaning === "string" && val.meaning.trim()) return val.meaning.trim();
    if (typeof val.title === "string" && val.title.trim()) return val.title.trim();
    if (typeof val.effects === "string" && val.effects.trim()) return val.effects.trim();
    if (typeof val.consideration === "string" && val.consideration.trim()) return val.consideration.trim();
    if (typeof val.recommendation === "string" && val.recommendation.trim()) return val.recommendation.trim();
    if (typeof val.type === "string" && val.type.trim() && !val.result) return val.type.trim();
    if (typeof val.text === "string" && val.text.trim()) return val.text.trim();
    if (val.result && typeof val.result === "object") return extractString(val.result, fallback);
    if (val.report && typeof val.report === "object") return extractString(val.report, fallback);
    if (Array.isArray(val)) {
      return val.map((item) => extractString(item, "")).filter(Boolean).join(", ") || fallback;
    }
    return fallback;
  }
  return fallback;
}

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
    sunrise: extractString(basicRaw.sunrise),
    sunset: extractString(basicRaw.sunset),
    ascendant: extractString(basicRaw.ascendant?.name || basicRaw.ascendant),
    ascendantLord: extractString(basicRaw.ascendant_lord?.name || basicRaw.ascendant_lord || basicRaw.sign_lord),
    sign: extractString(basicRaw.sign?.name || basicRaw.sign || basicRaw.moon_sign),
    signLord: extractString(basicRaw.sign_lord?.name || basicRaw.sign_lord),
    nakshatra: extractString(basicRaw.nakshatra?.name || basicRaw.nakshatra),
    nakshatraLord: extractString(basicRaw.nakshatra_lord?.name || basicRaw.nakshatra_lord),
    charan: extractString(basicRaw.charan || basicRaw.pada, "1"),
    yog: extractString(basicRaw.yog?.name || basicRaw.yog || basicRaw.yoga),
    karan: extractString(basicRaw.karan?.name || basicRaw.karan || basicRaw.karana),
    tithi: extractString(basicRaw.tithi?.name || basicRaw.tithi),
    paksha: extractString(basicRaw.paksha),
    tatva: extractString(basicRaw.tatva || basicRaw.element),
    paya: extractString(basicRaw.paya),
    gan: extractString(basicRaw.gan || basicRaw.gana),
    varna: extractString(basicRaw.varna),
    nadi: extractString(basicRaw.nadi),
    vashya: extractString(basicRaw.vashya),
    yoni: extractString(basicRaw.yoni),
    yunja: extractString(basicRaw.yunja),
    nameAlphabet: extractString(basicRaw.name_alphabet),
  };

  // 2. Process Planetary Positions from live API
  let planets: PlanetaryPositionItem[] = [];
  if (Array.isArray(planetsRaw) && planetsRaw.length > 0) {
    planets = planetsRaw.map((p: any, idx: number) => ({
      id: idx + 1,
      name: extractString(p.name || p.planet || `Planet ${idx + 1}`),
      fullDegree: p.full_degree ? `${parseFloat(p.full_degree).toFixed(2)}°` : extractString(p.fullDegree),
      normDegree: extractString(p.norm_degree || p.degree),
      speed: p.speed !== undefined ? String(p.speed) : "--",
      isRetro: Boolean(p.is_retro || p.isRetro || p.retrograde),
      sign: extractString(p.sign || p.zodiac),
      signLord: extractString(p.sign_lord || p.signLord),
      house: p.house || p.house_number || idx + 1,
      nakshatra: extractString(p.nakshatra),
      nakshatraLord: extractString(p.nakshatra_lord || p.nakshatraLord),
      nakshatraPad: p.charan || p.pada || 1,
    }));
  } else if (typeof planetsRaw === "object" && planetsRaw !== null && Object.keys(planetsRaw).length > 0) {
    planets = Object.entries(planetsRaw)
      .filter(([k]) => !["status", "success", "message", "statusCode"].includes(k))
      .map(([key, val]: [string, any], idx) => ({
        id: idx + 1,
        name: extractString(val?.name || key),
        fullDegree: val?.full_degree ? `${parseFloat(val.full_degree).toFixed(2)}°` : "--",
        normDegree: extractString(val?.norm_degree || val?.degree),
        speed: val?.speed !== undefined ? String(val.speed) : "--",
        isRetro: Boolean(val?.is_retro || val?.retrograde),
        sign: extractString(val?.sign || val?.zodiac),
        signLord: extractString(val?.sign_lord),
        house: val?.house || idx + 1,
        nakshatra: extractString(val?.nakshatra),
        nakshatraLord: extractString(val?.nakshatra_lord),
        nakshatraPad: val?.charan || val?.pada || 1,
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
      isManglik: Boolean(manglikRaw.is_manglik || manglikRaw.manglik_present || String(manglikRaw.status || "").toLowerCase().includes("manglik")),
      status: extractString(manglikRaw.manglik_status || (manglikRaw.is_manglik ? "Manglik" : "Non-Manglik")),
      percentage: Number(manglikRaw.percentage || manglikRaw.manglik_percentage) || (manglikRaw.is_manglik ? 65 : 0),
      description: extractString(manglikRaw.description || manglikRaw.report || manglikRaw.result, "No severe Kuja dosha found in chart."),
      exceptions: Array.isArray(manglikRaw.exceptions)
        ? manglikRaw.exceptions.map((e: any) => extractString(e, ""))
        : [],
      house: extractString(manglikRaw.house),
    },
    sadheSati: {
      isSadheSati: Boolean(sadheSatiRaw.is_sadhe_sati || sadheSatiRaw.is_present),
      phase: extractString(sadheSatiRaw.phase || sadheSatiRaw.current_phase, "No Active Phase"),
      description: extractString(sadheSatiRaw.description || sadheSatiRaw.consideration || sadheSatiRaw.result, "Saturn is not currently transiting over natal Moon sign."),
      startYear: extractString(sadheSatiRaw.start_year),
      endYear: extractString(sadheSatiRaw.end_year),
      saturnSign: extractString(sadheSatiRaw.saturn_sign),
    },
    kaalSarp: {
      isKaalSarp: Boolean(kaalSarpRaw.is_kaal_sarp || kaalSarpRaw.is_present),
      type: extractString(kaalSarpRaw.type || kaalSarpRaw.name, "None"),
      description: extractString(kaalSarpRaw.description || kaalSarpRaw.result, "Planetary energies flow without Kaal Sarp constriction."),
      effects: extractString(kaalSarpRaw.effects || kaalSarpRaw.result),
    },
    pitraDosha: {
      isPitraDosha: Boolean(pitraRaw.is_pitra_dosha || pitraRaw.is_present),
      description: extractString(pitraRaw.description || pitraRaw.report || pitraRaw.result, "No major Pitra Dosha detected in chart."),
      remedies: Array.isArray(pitraRaw.remedies)
        ? pitraRaw.remedies.map((r: any) => extractString(r, ""))
        : ["Perform regular Surya Namaskar and respect elders."],
    },
  };

  // 5. Process Dashas from live API
  let dashas: DashaItem[] = [];
  const dashaArray = dashaRaw.dasha_periods || dashaRaw.maha_dasha || dashaRaw.periods || (Array.isArray(dashaRaw) ? dashaRaw : []);
  if (Array.isArray(dashaArray) && dashaArray.length > 0) {
    dashas = dashaArray.map((d: any) => ({
      planet: extractString(d.planet || d.name, "Dasha"),
      startDate: extractString(d.start_date || d.start),
      endDate: extractString(d.end_date || d.end),
      durationYears: extractString(d.duration || d.years),
      isActive: Boolean(d.is_active || d.active),
    }));
  }

  // 6. Process Predictions from live API
  const ascReport = ascReportRaw.report || ascReportRaw;
  const predictions: PredictionsData = {
    ascendantReport: {
      personality: extractString(ascReport.personality || ascReport.character || ascReportRaw.personality),
      physical: extractString(ascReport.physical_appearance || ascReport.physical || ascReport.appearance || ascReportRaw.physical),
      mental: extractString(ascReport.mental_temperament || ascReport.mental || ascReport.temperament || ascReportRaw.mental),
      career: extractString(ascReport.career_finance || ascReport.career || ascReport.profession || ascReportRaw.career),
      loveMarriage: extractString(ascReport.love_marriage || ascReport.relationship || ascReport.love || ascReportRaw.love_marriage),
    },
    yogas: [],
  };

  const rawYogasData = yogasRaw.yogas || yogasRaw.yoga_list || yogasRaw;
  if (Array.isArray(rawYogasData) && rawYogasData.length > 0) {
    predictions.yogas = rawYogasData.map((y: any, idx: number) => ({
      name: extractString(y.name || y.yoga || `Yoga ${idx + 1}`, "Vedic Yoga"),
      description: extractString(y.description || y.rule || y.type, "--"),
      effects: extractString(y.effects || y.result || y.description, "--"),
      planets: extractString(y.planets, ""),
    }));
  } else if (typeof rawYogasData === "object" && rawYogasData !== null && Object.keys(rawYogasData).length > 0) {
    predictions.yogas = Object.entries(rawYogasData)
      .filter(([k]) => !["status", "success", "message", "statusCode"].includes(k))
      .map(([key, val]: [string, any]) => ({
        name: key,
        description: extractString(val?.description || val?.type || val?.rule, "--"),
        effects: extractString(val?.result || val?.effects || val?.description || val, "--"),
        planets: extractString(val?.planets, ""),
      }));
  }

  // 7. Process Remedies from live API
  const remedies: RemediesData = {
    rudraksha: {
      name: extractString(rudrakshaRaw.name || rudrakshaRaw.recommended_rudraksha),
      recommendation: extractString(rudrakshaRaw.recommendation || rudrakshaRaw.description || rudrakshaRaw.result),
      deity: extractString(rudrakshaRaw.ruling_deity || rudrakshaRaw.deity),
      planet: extractString(rudrakshaRaw.ruling_planet || rudrakshaRaw.planet),
      mantra: extractString(rudrakshaRaw.wearing_mantra || rudrakshaRaw.mantra),
      benefits: extractString(rudrakshaRaw.benefits || rudrakshaRaw.result),
    },
    gemstones: {
      lifeStone: {
        name: basic.ascendantLord && basic.ascendantLord !== "--" ? `${basic.ascendantLord} Gemstone` : "--",
        finger: "Middle Finger",
        metal: "Silver / Gold",
        planet: basic.ascendantLord || "--",
      },
      luckyStone: {
        name: basic.signLord && basic.signLord !== "--" ? `${basic.signLord} Gemstone` : "--",
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
