import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FormType } from "@/types/form"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mapping template yang tersedia
// true = tersedia, false = tidak tersedia
export const templateAvailability: Record<string, { Mingguan: boolean; Bulanan: boolean }> = {
  "Genset": { Mingguan: true, Bulanan: true },
  "MDPSDP": { Mingguan: true, Bulanan: true },
  "Penyalur_Petir": { Mingguan: false, Bulanan: true },
  "Trafo": { Mingguan: false, Bulanan: true },
  "COSATFAMF": { Mingguan: true, Bulanan: true }, // Tidak pakai periode, set true agar tidak ada warning
};

// Label yang lebih ramah untuk nama laporan
export const formTypeLabels: Record<string, string> = {
  "Genset": "Pemeriksaan Genset",
  "MDPSDP": "MDP/SDP",
  "Penyalur_Petir": "Penyalur Petir",
  "Trafo": "Pemeriksaan Trafo",
  "COSATFAMF": "COS/ATS/AMF",
};

// Custom error class untuk template tidak tersedia
export class TemplateNotAvailableError extends Error {
  formType: string;
  periodType: string;
  
  constructor(formType: string, periodType: string) {
    const label = formTypeLabels[formType] || formType;
    super(`Template ${periodType} tidak tersedia untuk laporan ${label}. Silakan pilih periode Bulanan.`);
    this.name = "TemplateNotAvailableError";
    this.formType = formType;
    this.periodType = periodType;
  }
}

// Function untuk mengecek ketersediaan template
export function checkTemplateAvailability(formType: string, periodType: "Mingguan" | "Bulanan"): boolean {
  const availability = templateAvailability[formType];
  if (!availability) return true; // Jika tidak ada di map, anggap tersedia
  return availability[periodType];
}

export async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maximum dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            const newFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          'image/jpeg',
          0.7
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function getFormTemplate(formType: FormType) {
  try {
    const templateName = `${formType}.json`;
    const response = await fetch(`/template_pdf/${templateName}`);
    if (!response.ok) {
      // Parse formType untuk mendapatkan activity dan period
      const parts = formType.split("_");
      const periodType = parts[parts.length - 1];
      const activity = parts.slice(0, -1).join("_");
      
      // Cek apakah ini masalah template tidak tersedia untuk periode tertentu
      if (periodType === "Mingguan" || periodType === "Bulanan") {
        const label = formTypeLabels[activity] || activity;
        throw new TemplateNotAvailableError(activity, periodType);
      }
      
      throw new Error(`Template tidak ditemukan: ${templateName}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading template:', error);
    throw error;
  }
}