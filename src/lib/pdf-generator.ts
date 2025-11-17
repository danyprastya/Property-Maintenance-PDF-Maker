/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import type { FormEntry, FormType } from "@/types/form";
import { formTypes } from "@/config/form-types";

interface PDFGeneratorOptions {
  building: string;
  formType: FormType;
  periodType: "Mingguan" | "Bulanan" | "";
  week: string;
  month: string;
  selectedDate?: Date; // Optional custom date untuk periode mingguan
  entries: FormEntry[];
  idPerangkat: string;
}

export async function generatePDF(options: PDFGeneratorOptions): Promise<jsPDF> {
  const { building, formType, periodType, week, month, selectedDate, entries, idPerangkat } = options;

  // Create PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
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
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12); // Dikecilkan dari 14 ke 12
  const formTypeName = formTypes.find((f) => f.value === formType)?.label || formType;
  const periodeName = periodType === "Mingguan" ? "MINGGUAN" : "BULANAN";
  const fullTitle = `PEMELIHARAAN ${formTypeName.toUpperCase()} ${periodeName}`;
  doc.text(fullTitle, 15, yPos); // Align kiri, x=15 sama dengan logo
  yPos += 10;

  // 3. Info Header (SEMUA BOLD)
  doc.setFont("helvetica", "bold"); // Set bold untuk seluruh info header
  doc.setFontSize(9); // Dikecilkan dari 10 ke 9

  // Minggu/Tanggal
  if (periodType === "Mingguan") {
    doc.text(`MINGGU KE`, 15, yPos);
    doc.text(`: MINGGU ${week}`, 80, yPos);
  } else {
    const monthDate = month ? new Date(month) : new Date();
    doc.text(`TANGGAL`, 15, yPos);
    doc.text(`: ${format(monthDate, "dd MMMM yyyy").toUpperCase()}`, 80, yPos);
  }
  yPos += 5;

  // Kode Gedung (SIMA)
  const kodeGedungMap: Record<string, string> = {
    "TCU 1": "1611",
    "TCU 2": "1618",
    "TCU 3": "1608",
    "GD Menara Risti Idex": "1547",
    "Telkom Cisanggarung": "", // Bisa diisi jika ada kode SIMA
  };
  const kodeGedung = kodeGedungMap[building] || "-"; // Default ke "-" jika tidak ada mapping
  doc.text(`KODE GEDUNG (SIMA)`, 15, yPos);
  doc.text(`: ${kodeGedung}`, 80, yPos);
  yPos += 5;

  // Lokasi Gedung
  doc.text(`LOKASI GEDUNG`, 15, yPos);
  doc.text(`: ${building}`, 80, yPos);
  yPos += 5;

  // ID Perangkat (SIMA)
  doc.text(`ID PERANGKAT (SIMA)`, 15, yPos);
  doc.text(`: ${idPerangkat || ""}`, 80, yPos);
  yPos += 10;

  // 4. Tabel
  const tableData = entries.map((entry, idx) => [
    (idx + 1).toString(),
    entry["Item Checklist"],
    entry["Tolak Ukur"],
    entry.jawaban,
    entry.deskripsi,
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
      minCellHeight: 20,
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
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" }, // No
      1: { cellWidth: 50 }, // Item Checklist
      2: { cellWidth: 35 }, // Tolak Ukur
      3: { cellWidth: 25, halign: "center" }, // Jawaban
      4: { cellWidth: 35 }, // Deskripsi
      5: { cellWidth: 30, halign: "center" }, // Foto
    },
    didDrawCell: (data: any) => {
      // Tambahkan foto di kolom ke-6 (index 5)
      if (data.section === "body" && data.column.index === 5) {
        const rowIndex = data.row.index;
        const entry = entries[rowIndex];

        if (entry?.photoDataUrl) {
          try {
            const imgWidth = 25;
            const imgHeight = 18;
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

  // Tanggal untuk bagian kanan
  const tanggalTTD =
    periodType === "Mingguan"
      ? selectedDate // Gunakan tanggal custom jika dipilih
        ? format(selectedDate, "dd MMMM yyyy")
        : format(new Date(), "dd MMMM yyyy") // Fallback ke hari ini
      : month
      ? format(new Date(month), "dd MMMM yyyy")
      : format(new Date(), "dd MMMM yyyy");

  // Kolom Kiri - Mengetahui/menyetujui (BOLD)
  const leftX = 30;
  doc.setFont("helvetica", "bold"); // BOLD
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

  // TTD Images
  try {
    // TTD PA AMIR (kiri)
    const ttdAmirResponse = await fetch("/TTD PA AMIR.jpg");
    const ttdAmirBlob = await ttdAmirResponse.blob();
    const ttdAmirUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(ttdAmirBlob);
    });
    doc.addImage(ttdAmirUrl, "JPEG", leftX - 15, yPos, 30, 20);

    // TTD HERIYANTO (kanan)
    const ttdHeriyantoResponse = await fetch("/HERIYANTO.jpg");
    const ttdHeriyantoBlob = await ttdHeriyantoResponse.blob();
    const ttdHeriyantoUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(ttdHeriyantoBlob);
    });
    doc.addImage(ttdHeriyantoUrl, "JPEG", rightX - 15, yPos, 30, 20);
  } catch (err) {
    console.error("Failed to load signatures:", err);
  }

  yPos += 25;

  // Nama dengan underline (kiri)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const amirName = "AMIRUDDIN";
  const amirWidth = doc.getTextWidth(amirName);
  doc.text(amirName, leftX, yPos, { align: "center" });
  doc.line(
    leftX - amirWidth / 2,
    yPos + 0.5,
    leftX + amirWidth / 2,
    yPos + 0.5
  );

  // Nama dengan underline (kanan)
  const heriName = "HERRIYANTO";
  const heriWidth = doc.getTextWidth(heriName);
  doc.text(heriName, rightX, yPos, { align: "center" });
  doc.line(
    rightX - heriWidth / 2,
    yPos + 0.5,
    rightX + heriWidth / 2,
    yPos + 0.5
  );

  yPos += 5;

  // Jabatan
  doc.text("MANAR BANDUNG", leftX, yPos, { align: "center" });
  doc.text("SENIOR CHIEF ENGINEERING", rightX, yPos, { align: "center" });

  return doc;
}
