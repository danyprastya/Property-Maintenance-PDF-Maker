export interface ChecklistItem {
  no: number;
  "Item Checklist": string;
  "Tolak Ukur": string;
  jawaban: string;
  deskripsi: string;
}

export interface FormTemplate {
  checklist: ChecklistItem[];
}

export type FormType = 
  | "Genset"
  | "MDPSDP"
  | "Penyalur_Petir"
  | "Trafo"
  | "COSATFAMF";

export interface FormEntry extends ChecklistItem {
  photo?: File;
  photoDataUrl?: string;
}

export interface FormState {
  building: string;
  // User selects an activity name (e.g., "Genset", "MDPSDP") and we
  // compose the final FormType (e.g., "Genset_Mingguan") when fetching
  formType: string | "";
  periodType: "Mingguan" | "Bulanan" | "";
  week: string;
  month: string;
  entries: FormEntry[];
}