export const buildings = [
  "TCU 1",
  "TCU 2",
  "TCU 3",
  "GD Menara Risti Idex",
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