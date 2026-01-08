export const areas = [
  "Bandung",
  "Priangan Barat",
  "Priangan Timur",
] as const;

export type Area = (typeof areas)[number];

export const buildings = [
  // Area Bandung
  "TCU 1",
  "TCU 2",
  "TCU 3",
  "GD Menara Risti Idex",
  "Telkom Cisanggarung",
  "Assessment Center Indonesia 71",
  "Assessment Center Indonesia Tendean",
  "GT Lembong",
  "STO Cicadas",
  "GMP Bandung",
  "GT Rajawali",
  "Plasa Supratman",
  "STO Gegerkalong",
  "Plasa Cimahi",
  // Area Priangan Timur
  "Kantor Witel Jabar Timur",
  "Plasa Cirebon",
  "Plasa Indramayu",
  "Plasa Ciamis",
  "Garut Centrum Pramuka",
  "GT Plasa Telkom Tasikmalaya",
  "STO Tasikmalaya",
  "Plasa Telkom Garut",
  // Area Priangan Barat
  "GT Cianjur STO Centrum",
  "Datel Cianjur",
  "Kantor Witel Jabar Selatan",
] as const;

export type Building = (typeof buildings)[number];

export const formTypes = [
  { value: "Genset_Mingguan", label: "Pemeriksaan Genset (Mingguan)" },
  { value: "Genset_Bulanan", label: "Pemeriksaan Genset (Bulanan)" },
  { value: "MDPSDP_Mingguan", label: "MDPSDP (Mingguan)" },
  { value: "MDPSDP_Bulanan", label: "MDPSDP (Bulanan)" },
  { value: "Penyalur_Petir_Bulanan", label: "Penyalur Petir (Bulanan)" },
  { value: "Trafo_Bulanan", label: "Pemeriksaan Trafo (Bulanan)" },
  { value: "COSATFAMF", label: "COS/ATS/AMF" },
] as const;

export const periodTypes = [
  { value: "Mingguan", label: "Mingguan" },
  { value: "Bulanan", label: "Bulanan" },
] as const;

export type PeriodType = (typeof periodTypes)[number]["value"];

export type FormType = (typeof formTypes)[number]["value"];