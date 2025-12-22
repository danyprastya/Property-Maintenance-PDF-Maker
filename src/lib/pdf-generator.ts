/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import type { FormEntry, FormType } from "@/types/form";
import { formTypes } from "@/config/form-types";

// Flag untuk track apakah font sudah di-load
let fontLoaded = false;
let fontBase64Cache: string | null = null;

/**
 * Normalize Unicode characters yang tidak support di jsPDF default font
 * Mengganti karakter spesial dengan ASCII equivalent yang readable
 * Hanya digunakan sebagai fallback jika custom font gagal di-load
 */
function normalizeTextForPDF(text: string): string {
  if (!text) return text;
  
  return text
    .replace(/≤/g, '≤')      // Keep as is if font supports, otherwise will be normalized below
    .replace(/≥/g, '≥')      // Keep as is if font supports
    .replace(/°/g, '°')      // Keep as is if font supports
    .replace(/±/g, '±')      // Keep as is if font supports
    .replace(/–/g, '-')       // En dash to hyphen
    .replace(/—/g, '-')       // Em dash to hyphen
    .replace(/'/g, "'")       // Smart quotes
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"');
}

/**
 * Fallback: Convert Unicode to ASCII when font doesn't support it
 */
function fallbackNormalize(text: string): string {
  if (!text) return text;
  
  return text
    .replace(/≤/g, '<=')      // Less than or equal
    .replace(/≥/g, '>=')      // Greater than or equal  
    .replace(/°/g, ' C')      // Degree - just use space + C since °C is common
    .replace(/±/g, '+/-')     // Plus-minus
    .replace(/–/g, '-')       // En dash
    .replace(/—/g, '-')       // Em dash
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"');
}

/**
 * Load custom font untuk Unicode support (≤, ≥, °, etc.)
 * Menggunakan Roboto font dari local atau CDN
 */
async function loadUnicodeFont(doc: jsPDF): Promise<void> {
  // Jika font sudah di-load sebelumnya, langsung set
  if (fontLoaded && fontBase64Cache) {
    try {
      doc.addFileToVFS("Roboto-Regular.ttf", fontBase64Cache);
      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      doc.setFont("Roboto", "normal");
      return;
    } catch {
      // Jika gagal, coba load ulang
    }
  }

  try {
    // Coba load dari local terlebih dahulu
    let fontBuffer: ArrayBuffer | null = null;
    
    // Coba load dari public folder
    try {
      const localResponse = await fetch("/fonts/Roboto-Regular.ttf");
      if (localResponse.ok) {
        fontBuffer = await localResponse.arrayBuffer();
        console.log("Font loaded from local: /fonts/Roboto-Regular.ttf");
      }
    } catch {
      console.log("Local font not found, trying CDN...");
    }
    
    // Jika tidak ada di local, load dari CDN
    if (!fontBuffer) {
      const cdnUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf",
        "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
      ];
      
      for (const url of cdnUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            fontBuffer = await response.arrayBuffer();
            console.log(`Font loaded from CDN: ${url}`);
            break;
          }
        } catch {
          continue;
        }
      }
    }
    
    if (!fontBuffer) {
      throw new Error("Failed to load font from any source");
    }
    
    const fontBase64 = arrayBufferToBase64(fontBuffer);
    fontBase64Cache = fontBase64;
    
    // Add font ke jsPDF
    doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto", "normal");
    
    fontLoaded = true;
    console.log("Roboto font loaded successfully for Unicode support");
  } catch (error) {
    console.warn("Failed to load Roboto font, will use fallback normalization:", error);
    fontLoaded = false;
  }
}

/**
 * Convert ArrayBuffer to Base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192; // Process in chunks to avoid call stack issues
  
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
}

/**
 * Helper untuk process text - gunakan normalize jika font tidak support Unicode
 */
function processText(text: string): string {
  if (fontLoaded) {
    return normalizeTextForPDF(text); // Keep Unicode if font loaded
  }
  return fallbackNormalize(text); // Convert to ASCII if no font
}

interface PDFGeneratorOptions {
  building: string;
  formType: FormType;
  periodType: "Mingguan" | "Bulanan" | "";
  week: string;
  month: string;
  selectedDate?: Date; // Optional custom date untuk periode mingguan
  entries: FormEntry[];
  idPerangkat: string;
  unitNumber?: string; // Untuk Genset 1/2 atau Trafo 1/2 di GD Menara Risti Idex
  // Data baru dari building-data
  kodeGedung?: string;
  lokasiGedung?: string;
  signatureDate?: Date;
  manarName?: string;
  picName?: string;
}

export async function generatePDF(options: PDFGeneratorOptions): Promise<jsPDF> {
  const { 
    building, 
    formType, 
    periodType, 
    week, 
    month, 
    selectedDate, 
    entries, 
    idPerangkat, 
    unitNumber,
    kodeGedung: kodeGedungProp,
    lokasiGedung: lokasiGedungProp,
    signatureDate,
    manarName,
    picName
  } = options;

  // Create PDF dengan Unicode support
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
    putOnlyUsedFonts: true,
  });
  
  // Load custom font untuk Unicode support (≤, ≥, °, etc.)
  await loadUnicodeFont(doc);
  
  // Set encoding untuk Unicode support
  doc.setProperties({
    title: `Laporan ${formType}`,
    author: "Telkom Indonesia",
    creator: "Property Maintenance System",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 10;

  // 1. Logo Telkom (kiri atas)
  try {
    const logoResponse = await fetch("/logo_telkom.jpg");
    const logoBlob = await logoResponse.blob();
    const logoDataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(logoBlob);
    });
    doc.addImage(logoDataUrl, "JPEG", 15, yPos, 40, 15);
    yPos += 25; // Spacing lebih jauh antara logo dan judul
  } catch (err) {
    console.error("Failed to load logo:", err);
    yPos += 5;
  }

  // 2. Judul - Jenis Laporan + Periode (ALIGN KIRI, di bawah logo)
  // Gunakan Roboto jika tersedia untuk Unicode support
  const fontFamily = fontLoaded ? "Roboto" : "helvetica";
  doc.setFont(fontFamily, "bold");
  doc.setFontSize(12); // Dikecilkan dari 14 ke 12
  
  // Parse formType untuk menghilangkan duplikasi periode
  // Contoh: "Genset_Mingguan" atau "Penyalur_Petir_Bulanan"
  let cleanFormTypeName: string = formType;
  
  // Hilangkan suffix _Mingguan atau _Bulanan dari formType
  if (formType.endsWith("_Mingguan") || formType.endsWith("_Bulanan")) {
    cleanFormTypeName = formType.replace(/_Mingguan|_Bulanan/g, "");
  }
  
  // Ganti underscore dengan spasi untuk readability
  cleanFormTypeName = cleanFormTypeName.replace(/_/g, " ");
  
  // Cari label yang sesuai dari config, atau gunakan yang sudah dibersihkan
  const formTypeLabel = formTypes.find((f) => f.value === formType)?.label || cleanFormTypeName;
  
  // Tambahkan unit number jika ada (untuk GD Menara Risti Idex - Genset 1/2 atau Trafo 1/2)
  const unitSuffix = unitNumber ? ` ${unitNumber}` : "";
  
  // Tambahkan periode hanya jika ada periodType
  const periodeName = periodType === "Mingguan" ? "MINGGUAN" : periodType === "Bulanan" ? "BULANAN" : "";
  const fullTitle = periodeName 
    ? `PEMELIHARAAN ${formTypeLabel.toUpperCase()}${unitSuffix} ${periodeName}`
    : `PEMELIHARAAN ${formTypeLabel.toUpperCase()}${unitSuffix}`;
    
  doc.text(fullTitle, 15, yPos); // Align kiri, x=15 sama dengan logo
  yPos += 10;

  // 3. Info Header (SEMUA BOLD)
  doc.setFont(fontFamily, "bold"); // Set bold untuk seluruh info header
  doc.setFontSize(9); // Dikecilkan dari 10 ke 9

  // Minggu/Tanggal
  if (periodType === "Mingguan") {
    // Tampilkan MINGGU KE
    doc.text(`MINGGU KE`, 15, yPos);
    doc.text(`: MINGGU ${week}`, 80, yPos);
    yPos += 5;
    
    // Tampilkan TANGGAL (gunakan selectedDate jika ada, fallback ke hari ini)
    const reportDate = selectedDate || new Date();
    doc.text(`TANGGAL`, 15, yPos);
    doc.text(`: ${format(reportDate, "dd MMMM yyyy").toUpperCase()}`, 80, yPos);
  } else {
    // Untuk Bulanan, tampilkan TANGGAL saja
    const monthDate = month ? new Date(month) : new Date();
    doc.text(`TANGGAL`, 15, yPos);
    doc.text(`: ${format(monthDate, "dd MMMM yyyy").toUpperCase()}`, 80, yPos);
  }
  yPos += 5;

  // Kode Gedung (SIMA) - Gunakan dari props jika ada, fallback ke mapping lama
  const kodeGedung = kodeGedungProp || "-";
  doc.text(`KODE GEDUNG (SIMA)`, 15, yPos);
  doc.text(`: ${kodeGedung}`, 80, yPos);
  yPos += 5;

  // Lokasi Gedung - Gunakan dari props jika ada, fallback ke building name
  const lokasiGedung = lokasiGedungProp || building;
  doc.text(`LOKASI GEDUNG`, 15, yPos);
  doc.text(`: ${lokasiGedung}`, 80, yPos);
  yPos += 5;

  // ID Perangkat (SIMA)
  doc.text(`ID PERANGKAT (SIMA)`, 15, yPos);
  doc.text(`: ${idPerangkat || ""}`, 80, yPos);
  yPos += 10;

  // 4. Tabel - Process text untuk handle Unicode characters
  const tableData = entries.map((entry, idx) => [
    (idx + 1).toString(),
    processText(entry["Item Checklist"]),
    processText(entry["Tolak Ukur"]),
    processText(entry.jawaban),
    processText(entry.deskripsi),
  ]);

  let finalY = yPos;

  autoTable(doc, {
    head: [["No", "Item Checklist", "Tolak Ukur", "Jawaban", "Deskripsi", "Foto (Evidence)"]],
    body: tableData,
    startY: yPos,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak",
      halign: "left",
      valign: "middle",
      minCellHeight: 35, // Diperbesar untuk foto dengan timestamp
      lineColor: [0, 0, 0],
      lineWidth: 0.3, // Ketebalan garis konsisten
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.3, // SAMA dengan body, bukan 0.5
      minCellHeight: 10, // Header tidak perlu tinggi
    },
    // Konfigurasi margin untuk page break yang lebih baik
    margin: { top: 15, right: 10, bottom: 15, left: 10 },
    // Set font untuk autoTable menggunakan hook
    didParseCell: (data: any) => {
      // Gunakan Roboto font jika tersedia untuk Unicode support
      if (fontLoaded) {
        data.cell.styles.font = "Roboto";
      }
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" }, // No
      1: { cellWidth: 45 }, // Item Checklist - sedikit dikurangi
      2: { cellWidth: 30 }, // Tolak Ukur - sedikit dikurangi
      3: { cellWidth: 22, halign: "center" }, // Jawaban - sedikit dikurangi
      4: { cellWidth: 33 }, // Deskripsi - sedikit dikurangi
      5: { cellWidth: 45, halign: "center" }, // Foto - diperbesar untuk timestamp
    },
    didDrawCell: (data: any) => {
      // Tambahkan foto di kolom ke-6 (index 5)
      if (data.section === "body" && data.column.index === 5) {
        const rowIndex = data.row.index;
        const entry = entries[rowIndex];

        if (entry?.photoDataUrl) {
          try {
            // Ukuran foto diperbesar agar timestamp terlihat jelas
            const imgWidth = 40;
            const imgHeight = 30;
            const x = data.cell.x + (data.cell.width - imgWidth) / 2;
            const y = data.cell.y + (data.cell.height - imgHeight) / 2;

            doc.addImage(
              entry.photoDataUrl,
              "JPEG",
              x,
              y,
              imgWidth,
              imgHeight
            );
          } catch (err) {
            console.error("Error adding image:", err);
          }
        }
      }
    },
    didDrawPage: (data: any) => {
      finalY = data.cursor.y;
    },
  });

  yPos = finalY + 15;

  // 5. Tanda Tangan Section
  // Jika yPos terlalu dekat dengan bottom, buat halaman baru
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  // Tanggal untuk bagian kanan - Gunakan signatureDate jika ada
  const tanggalTTD = signatureDate 
    ? format(signatureDate, "dd MMMM yyyy")
    : periodType === "Mingguan"
      ? selectedDate
        ? format(selectedDate, "dd MMMM yyyy")
        : format(new Date(), "dd MMMM yyyy")
      : month
      ? format(new Date(month), "dd MMMM yyyy")
      : format(new Date(), "dd MMMM yyyy");

  // Nama untuk tanda tangan - gunakan dari props jika ada
  const leftSignatureName = manarName || "AMIRUDDIN";
  const rightSignatureName = picName || "HERRIYANTO";

  // Kolom Kiri - Mengetahui/menyetujui (BOLD)
  const leftX = 30;
  doc.setFont(fontFamily, "bold"); // BOLD - gunakan Roboto untuk Unicode
  doc.setFontSize(10);
  doc.text("Mengetahui/ menyetujui,", leftX, yPos, { align: "center" });

  // Kolom Kanan - Tanggal dan Petugas (BOLD)
  const rightX = pageWidth - 40;
  doc.text(`BANDUNG, ${tanggalTTD.toUpperCase()}`, rightX, yPos, {
    align: "center",
  });
  yPos += 5;
  doc.text("Petugas Pelaksana", rightX, yPos, { align: "center" });
  yPos += 5;

  // TTD Images - coba load berdasarkan nama, fallback ke default
  try {
    // Mapping untuk file signature yang spesifik
    // Normalize semua nama ke uppercase dan trim whitespace untuk matching
    const signatureFileMap: Record<string, string> = {
      "AMIRUDDIN": "/TTD PA AMIR.jpg",
      "HERRIYANTO": "/HERIYANTO.jpg",
      "GUNAWAN": "/GUNAWAN.png",
      "AANG CEPI": "/AANG_CEPI.png",
      "SIGIT RULLY": "/SIGIT_RULLY.png",
      "RANDI ROMDONI": "/RANDI_ROMDONI.png",
      "ASEP SOLEH": "/ASEP_SOLEH.png",
    };

    // Normalize nama untuk matching (uppercase + trim)
    const normalizedLeftName = leftSignatureName.trim().toUpperCase();
    const normalizedRightName = rightSignatureName.trim().toUpperCase();

    // TTD Manar (kiri)
    const ttdManarFilename = signatureFileMap[normalizedLeftName];
    
    if (ttdManarFilename) {
      const ttdManarExt = ttdManarFilename.endsWith('.png') ? 'PNG' : 'JPEG';
      try {
        const ttdManarResponse = await fetch(ttdManarFilename);
        if (ttdManarResponse.ok) {
          const ttdManarBlob = await ttdManarResponse.blob();
          const ttdManarUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(ttdManarBlob);
          });
          doc.addImage(ttdManarUrl, ttdManarExt, leftX - 15, yPos, 30, 20);
        } else {
          throw new Error('File not found');
        }
      } catch {
        // Fallback ke default jika file tidak ditemukan
        const ttdAmirResponse = await fetch("/TTD PA AMIR.jpg");
        const ttdAmirBlob = await ttdAmirResponse.blob();
        const ttdAmirUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(ttdAmirBlob);
        });
        doc.addImage(ttdAmirUrl, "JPEG", leftX - 15, yPos, 30, 20);
      }
    } else {
      // Jika tidak ada di mapping, langsung gunakan default
      console.warn(`Signature file not found in mapping for: ${leftSignatureName}, using default`);
      const ttdAmirResponse = await fetch("/TTD PA AMIR.jpg");
      const ttdAmirBlob = await ttdAmirResponse.blob();
      const ttdAmirUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(ttdAmirBlob);
      });
      doc.addImage(ttdAmirUrl, "JPEG", leftX - 15, yPos, 30, 20);
    }

    // TTD PIC (kanan)
    const ttdPicFilename = signatureFileMap[normalizedRightName];
    
    if (ttdPicFilename) {
      const ttdPicExt = ttdPicFilename.endsWith('.png') ? 'PNG' : 'JPEG';
      try {
        const ttdPicResponse = await fetch(ttdPicFilename);
        if (ttdPicResponse.ok) {
          const ttdPicBlob = await ttdPicResponse.blob();
          const ttdPicUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(ttdPicBlob);
          });
          doc.addImage(ttdPicUrl, ttdPicExt, rightX - 15, yPos, 30, 20);
        } else {
          throw new Error('File not found');
        }
      } catch {
        // Fallback ke default jika file tidak ditemukan
        const ttdHeriyantoResponse = await fetch("/HERIYANTO.jpg");
        const ttdHeriyantoBlob = await ttdHeriyantoResponse.blob();
        const ttdHeriyantoUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(ttdHeriyantoBlob);
        });
        doc.addImage(ttdHeriyantoUrl, "JPEG", rightX - 15, yPos, 30, 20);
      }
    } else {
      // Jika tidak ada di mapping, langsung gunakan default
      console.warn(`Signature file not found in mapping for: ${rightSignatureName}, using default`);
      const ttdHeriyantoResponse = await fetch("/HERIYANTO.jpg");
      const ttdHeriyantoBlob = await ttdHeriyantoResponse.blob();
      const ttdHeriyantoUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(ttdHeriyantoBlob);
      });
      doc.addImage(ttdHeriyantoUrl, "JPEG", rightX - 15, yPos, 30, 20);
    }
  } catch (err) {
    console.error("Failed to load signatures:", err);
  }

  yPos += 25;

  // Nama dengan underline (kiri) - gunakan nama dari props
  doc.setFont(fontFamily, "normal"); // gunakan Roboto untuk Unicode
  doc.setFontSize(10);
  const leftNameWidth = doc.getTextWidth(leftSignatureName);
  doc.text(leftSignatureName, leftX, yPos, { align: "center" });
  doc.line(
    leftX - leftNameWidth / 2,
    yPos + 0.5,
    leftX + leftNameWidth / 2,
    yPos + 0.5
  );

  // Nama dengan underline (kanan) - gunakan nama dari props
  const rightNameWidth = doc.getTextWidth(rightSignatureName);
  doc.text(rightSignatureName, rightX, yPos, { align: "center" });
  doc.line(
    rightX - rightNameWidth / 2,
    yPos + 0.5,
    rightX + rightNameWidth / 2,
    yPos + 0.5
  );

  yPos += 5;

  // Jabatan
  doc.text("MANAGER AREA BANDUNG", leftX, yPos, { align: "center" });
  doc.text(" PIC", rightX, yPos, { align: "center" });

  return doc;
}
