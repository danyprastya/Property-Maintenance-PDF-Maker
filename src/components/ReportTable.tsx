"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  Loader2,
  Eye,
  Sparkles,
  Camera,
  AlertCircle,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { FormEntry, FormType, FormTemplate } from "@/types/form";
import { compressImage, getFormTemplate, cn } from "@/lib/utils";
import { generatePDF } from "@/lib/pdf-generator";
import { getBuildingEquipmentData, buildingDataMap } from "@/config/building-data";

export default function ReportTable({
  building,
  formType,
  periodType,
  week,
  month,
  selectedDate,
  entries,
  unitNumber,
  onEntriesChange,
  onExported,
}: {
  building: string;
  formType: FormType;
  periodType: "Mingguan" | "Bulanan" | "";
  week: string;
  month: string;
  selectedDate?: Date;
  entries: FormEntry[];
  unitNumber?: string; // Untuk Genset 1/2 atau Trafo 1/2 di GD Menara Risti Idex
  onEntriesChange?: (next: FormEntry[]) => void;
  onExported?: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [idPerangkat, setIdPerangkat] = React.useState("");
  const [autoFill, setAutoFill] = React.useState(false);
  const [hasAutoFilled, setHasAutoFilled] = React.useState(false);
  const [missingPhotoIndex, setMissingPhotoIndex] = React.useState<number>(-1);
  const [templateData, setTemplateData] = React.useState<FormTemplate | null>(
    null
  );
  
  // State untuk data gedung dari building-data
  const [kodeGedung, setKodeGedung] = React.useState("");
  const [lokasiGedung, setLokasiGedung] = React.useState("");
  
  // State untuk tanda tangan
  const [selectedManar, setSelectedManar] = React.useState("");
  const [selectedPic, setSelectedPic] = React.useState("");
  
  // State untuk tanggal tanda tangan (terpisah dari tanggal laporan)
  const [signatureDate, setSignatureDate] = React.useState<Date | undefined>(undefined);
  
  // Daftar nama untuk dropdown tanda tangan
  const allSignatureNames = React.useMemo(() => {
    const names = new Set<string>();
    Object.values(buildingDataMap).forEach((data) => {
      if (data.manar) names.add(data.manar);
      if (data.pic) names.add(data.pic);
      // Juga ambil dari equipment jika ada
      Object.values(data.equipment).forEach((equipment) => {
        if (equipment) {
          Object.values(equipment).forEach((period) => {
            if (period && typeof period === "object") {
              // Check if this is a BuildingEquipmentData (has kodeGedung)
              if ("kodeGedung" in period) {
                const equipData = period as { pic?: string; manar?: string };
                if (equipData.pic) names.add(equipData.pic);
                if (equipData.manar) names.add(equipData.manar);
              } else {
                // Handle multi-unit - this is a Record<string, BuildingEquipmentData>
                Object.values(period).forEach((unit) => {
                  if (unit && typeof unit === "object" && "pic" in unit) {
                    const unitData = unit as { pic?: string; manar?: string };
                    if (unitData.pic) names.add(unitData.pic);
                    if (unitData.manar) names.add(unitData.manar);
                  }
                });
              }
            }
          });
        }
      });
    });
    return Array.from(names).sort();
  }, []);
  
  // Effect untuk auto-fill data gedung saat building/formType/periodType/unitNumber berubah
  React.useEffect(() => {
    // Extract base form type (e.g., "Genset_Mingguan" -> "Genset")
    const baseFormType = formType.replace(/_Mingguan|_Bulanan/g, "");
    const period = periodType as "Mingguan" | "Bulanan";
    
    if (building && baseFormType && period) {
      const equipmentData = getBuildingEquipmentData(building, baseFormType, period, unitNumber);
      
      if (equipmentData) {
        setKodeGedung(equipmentData.kodeGedung);
        setLokasiGedung(equipmentData.lokasiGedung);
        setIdPerangkat(equipmentData.idPerangkat);
        setSelectedManar(equipmentData.manar);
        setSelectedPic(equipmentData.pic);
      } else {
        // Fallback ke data gedung level atas
        const buildingData = buildingDataMap[building];
        if (buildingData) {
          setKodeGedung(buildingData.kodeGedung);
          setLokasiGedung(buildingData.lokasiGedung);
          setSelectedManar(buildingData.manar);
          setSelectedPic(buildingData.pic);
          setIdPerangkat("");
        }
      }
    }
  }, [building, formType, periodType, unitNumber]);

  const [editDialog, setEditDialog] = React.useState<{
    open: boolean;
    index: number;
    field: "jawaban" | "deskripsi";
    value: string;
    originalValue: string;
  }>({
    open: false,
    index: -1,
    field: "jawaban",
    value: "",
    originalValue: "",
  });
  const [detailDialog, setDetailDialog] = React.useState<{
    open: boolean;
    title: string;
    content: string;
  }>({
    open: false,
    title: "",
    content: "",
  });

  // Load template data when formType changes
  React.useEffect(() => {
    async function loadTemplate() {
      try {
        const template = await getFormTemplate(formType);
        setTemplateData(template as FormTemplate);
      } catch (error) {
        console.error("Failed to load template:", error);
      }
    }
    if (formType) {
      loadTemplate();
    }
  }, [formType]);

  // Template default values from JSON
  const getDefaultValue = React.useCallback(
    (index: number, field: "jawaban" | "deskripsi") => {
      if (!templateData?.checklist[index]) return "";
      return templateData.checklist[index][field] || "";
    },
    [templateData]
  );

  // Toggle autofill - fill when ON, clear when OFF
  React.useEffect(() => {
    if (autoFill && !hasAutoFilled && templateData) {
      const next = entries.map((entry, idx) => ({
        ...entry,
        jawaban: getDefaultValue(idx, "jawaban"),
        deskripsi: getDefaultValue(idx, "deskripsi"),
      }));
      onEntriesChange?.(next);
      setHasAutoFilled(true);
      toast.success("Autofill diaktifkan - Data dari template terisi");
    } else if (!autoFill && hasAutoFilled) {
      // Clear when turned off
      const next = entries.map((entry) => ({
        ...entry,
        jawaban: "",
        deskripsi: "",
      }));
      onEntriesChange?.(next);
      setHasAutoFilled(false);
      toast.info("Autofill dimatikan - Data dikosongkan");
    }
  }, [
    autoFill,
    hasAutoFilled,
    templateData,
    entries,
    getDefaultValue,
    onEntriesChange,
  ]);

  // Reset hasAutoFilled when entries change (new form generated)
  React.useEffect(() => {
    setAutoFill(false);
    setHasAutoFilled(false);
  }, [entries.length]);

  function onChangeEntry(index: number, field: keyof FormEntry, value: string) {
    const next = [...entries];
    next[index] = { ...next[index], [field]: value } as FormEntry;
    onEntriesChange?.(next);
  }

  function openEditDialog(
    index: number,
    field: "jawaban" | "deskripsi",
    currentValue: string
  ) {
    setEditDialog({
      open: true,
      index,
      field,
      value: currentValue,
      originalValue: currentValue,
    });
  }

  function handleSaveEdit() {
    onChangeEntry(editDialog.index, editDialog.field, editDialog.value);
    setEditDialog({ ...editDialog, open: false });
    toast.success("Data berhasil disimpan");
  }

  function handleCancelEdit() {
    setEditDialog({
      ...editDialog,
      open: false,
      value: editDialog.originalValue,
    });
  }

  function openDetailDialog(title: string, content: string) {
    setDetailDialog({ open: true, title, content });
  }

  // Helper function to check if entry is a note/catatan (no photo required)
  function isNoteEntry(entry: FormEntry): boolean {
    const itemName = entry["Item Checklist"].toLowerCase();
    return itemName.includes("catatan kesimpulan") || itemName.includes("catatan rekomendasi");
  }

  async function onChangePhoto(index: number, file?: File) {
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const next = [...entries];
        next[index] = {
          ...next[index],
          photo: compressed,
          photoDataUrl: dataUrl,
        };
        onEntriesChange?.(next);
        // Clear missing photo indicator when photo is uploaded
        if (missingPhotoIndex === index) {
          setMissingPhotoIndex(-1);
        }
      };
      reader.readAsDataURL(compressed);
      toast.success("Foto berhasil dikompresi dan ditambahkan");
    } catch {
      toast.error("Gagal mengkompresi foto");
    }
  }

  async function onExportPdf() {
    // Validate all photos are uploaded (except for note entries)
    const missingPhotoIdx = entries.findIndex((entry) => !entry.photoDataUrl && !isNoteEntry(entry));
    if (missingPhotoIdx !== -1) {
      setMissingPhotoIndex(missingPhotoIdx);
      setShowConfirm(false);
      toast.error(
        `Foto wajib diisi! Foto pada baris ${
          missingPhotoIdx + 1
        } belum diupload.`,
        {
          duration: 5000,
          action: {
            label: "Lihat",
            onClick: () => {
              // Scroll to the missing photo row
              const element = document.getElementById(
                `photo-row-${missingPhotoIdx}`
              );
              element?.scrollIntoView({ behavior: "smooth", block: "center" });
              // Highlight the row temporarily
              setTimeout(() => setMissingPhotoIndex(-1), 3000);
            },
          },
        }
      );
      return;
    }

    setShowConfirm(false);
    setIsLoading(true);

    try {
      const doc = await generatePDF({
        building,
        formType,
        periodType,
        week,
        month,
        selectedDate,
        entries,
        idPerangkat,
        unitNumber,
        // Data baru dari building-data
        kodeGedung,
        lokasiGedung,
        signatureDate: signatureDate || new Date(),
        manarName: selectedManar,
        picName: selectedPic,
      });

      // Save PDF
      const filename = `${building}_${formType}_${format(
        new Date(),
        "yyyy-MM-dd_HH-mm-ss"
      )}.pdf`;
      doc.save(filename);

      toast.success("PDF berhasil di-generate dan di-download");
      onExported?.();
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error(
        `Gagal generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { duration: 5000 }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="p-3 sm:p-6 border border-gray-200 dark:border-gray-700/50 w-full shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Header with Autofill Toggle */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Data Checklist
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Isi data checklist dan upload foto untuk setiap item
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <Label
              htmlFor="autofill"
              className="text-sm font-medium cursor-pointer"
            >
              Autofill
            </Label>
            <Switch
              id="autofill"
              checked={autoFill}
              onCheckedChange={setAutoFill}
            />
          </div>
        </div>

        {/* Mobile-First Table */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden w-full bg-white dark:bg-gray-900/50">
          <div className="overflow-x-auto scrollbar-thin">
            <Table className="w-full table-fixed">
              <colgroup>
                <col className="w-12 sm:w-16" />
                <col className="w-40 sm:w-48" />
                <col className="w-40 sm:w-48" />
                <col className="w-32 sm:w-40" />
                <col className="w-40 sm:w-48" />
                <col className="w-28 sm:w-36" />
              </colgroup>
              <TableHeader>
                <TableRow className="bg-linear-to-r from-slate-100 via-gray-100 to-slate-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-800 border-b-2 border-gray-300 dark:border-gray-600">
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-600 text-center text-xs sm:text-sm sticky left-0 z-20 bg-slate-100 dark:bg-slate-800">
                    No
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-600 text-xs sm:text-sm sticky left-12 sm:left-16 z-20 bg-slate-100 dark:bg-slate-800 sticky-col-shadow">
                    Item
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
                    Tolak Ukur
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
                    Jawaban
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
                    Deskripsi
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                    Foto
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, idx) => (
                  <TableRow
                    key={entry.no}
                    id={`photo-row-${idx}`}
                    className={`
                      ${
                        idx % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50 dark:bg-gray-800/50"
                      }
                      ${
                        missingPhotoIndex === idx
                          ? "ring-2 ring-red-500 ring-offset-2 bg-red-50 dark:bg-red-900/20"
                          : ""
                      }
                      hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150 border-b border-gray-200 dark:border-gray-700
                    `}
                  >
                    <TableCell className="font-bold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 text-center p-2 sm:p-4 sticky left-0 z-10 bg-inherit">
                      {entry.no}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm border-r border-gray-200 dark:border-gray-700 p-2 sm:p-4 sticky left-12 sm:left-16 z-10 bg-inherit sticky-col-shadow">
                      <div className="whitespace-normal wrap-break-word">
                        {entry["Item Checklist"]}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-muted-foreground border-r border-gray-200 dark:border-gray-700 p-2 sm:p-4">
                      {entry["Tolak Ukur"].length > 60 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-auto min-h-9 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 w-full justify-start"
                          onClick={() =>
                            openDetailDialog("Tolak Ukur", entry["Tolak Ukur"])
                          }
                        >
                          <Eye className="w-3 h-3 mr-1.5" />
                          Lihat Detail
                        </Button>
                      ) : (
                        <div className="whitespace-normal wrap-break-word">
                          {entry["Tolak Ukur"]}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="border-r border-gray-200 dark:border-gray-700 p-2 sm:p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-auto min-h-9 text-xs sm:text-sm justify-start text-left p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700"
                        onClick={() =>
                          openEditDialog(idx, "jawaban", entry.jawaban)
                        }
                      >
                        <span className="whitespace-normal wrap-break-word line-clamp-3 w-full">
                          {entry.jawaban || "Tap untuk isi"}
                        </span>
                      </Button>
                    </TableCell>
                    <TableCell className="border-r border-gray-200 dark:border-gray-700 p-2 sm:p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-auto min-h-9 text-xs sm:text-sm justify-start text-left p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700"
                        onClick={() =>
                          openEditDialog(idx, "deskripsi", entry.deskripsi)
                        }
                      >
                        <span className="whitespace-normal wrap-break-word line-clamp-3 w-full">
                          {entry.deskripsi || "Tap untuk isi"}
                        </span>
                      </Button>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      {isNoteEntry(entry) ? (
                        // No photo required for note entries
                        <div className="flex items-center justify-center text-xs text-muted-foreground italic">
                          <span>-</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 items-center">
                          {/* Upload & Camera Buttons */}
                          <div className="flex gap-1 sm:gap-2 w-full">
                            {/* Upload Button */}
                            <Label
                              htmlFor={`photo-upload-${idx}`}
                              className="cursor-pointer inline-flex items-center justify-center gap-1 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-150 active:scale-95 flex-1"
                            >
                              <ImageIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span className="hidden sm:inline">Upload</span>
                              <Input
                                id={`photo-upload-${idx}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  onChangePhoto(idx, e.target.files?.[0])
                                }
                              />
                            </Label>

                            {/* Camera Button - Opens native camera app on mobile */}
                            <Label
                              htmlFor={`camera-${idx}`}
                              className="cursor-pointer inline-flex items-center justify-center gap-1 text-xs font-medium rounded-lg border border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1.5 sm:py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-150 active:scale-95 flex-1"
                            >
                              <input
                                id={`camera-${idx}`}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    await onChangePhoto(idx, file);
                                    // Reset input so the same file can be selected again
                                    e.target.value = "";
                                  }
                                }}
                              />
                              <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span className="hidden sm:inline">Kamera</span>
                            </Label>
                          </div>

                          {/* Photo Preview */}
                          {entry.photoDataUrl && (
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                              <Image
                                src={entry.photoDataUrl}
                                alt={`Photo ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Missing Photo Warning */}
                          {!entry.photoDataUrl && missingPhotoIndex === idx && (
                            <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 mt-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>Foto wajib!</span>
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Total items:{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {entries.length}
            </span>
          </p>
          <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
              >
                Export PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  Konfirmasi Export PDF
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-xs sm:text-sm leading-relaxed space-y-3">
                    {/* Informasi Laporan */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg p-3 space-y-1.5">
                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        📋 Informasi Laporan
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gedung:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {building}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kode Gedung:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {kodeGedung || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Jenis:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formType}
                          </span>
                        </div>
                        {unitNumber && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Unit:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {unitNumber}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Periode:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {periodType === "Mingguan"
                              ? `Minggu ${week}`
                              : periodType === "Bulanan"
                              ? `Bulan ${
                                  month
                                    ? new Date(month).toLocaleDateString(
                                        "id-ID",
                                        { month: "long", year: "numeric" }
                                      )
                                    : "-"
                                }`
                              : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Tanggal Laporan:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {periodType === "Mingguan"
                              ? selectedDate
                                ? selectedDate.toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : new Date().toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                              : periodType === "Bulanan"
                              ? month
                                ? new Date(month).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : new Date().toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                              : new Date().toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="font-semibold text-amber-600 dark:text-amber-400">
                      ⚠️ Semua foto wajib diupload !
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entries.filter((e) => !e.photoDataUrl && !isNoteEntry(e)).length === 0 ? (
                        <span className="text-green-600 dark:text-green-400">
                          ✓ Semua foto sudah diupload
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">
                          ✗ Ada {entries.filter((e) => !e.photoDataUrl && !isNoteEntry(e)).length}{" "}
                          foto yang belum diupload
                        </span>
                      )}
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {/* Lokasi Gedung */}
                <div className="space-y-2">
                  <Label htmlFor="lokasiGedung" className="text-sm font-medium">
                    Lokasi Gedung
                  </Label>
                  <Input
                    id="lokasiGedung"
                    value={lokasiGedung}
                    onChange={(e) => setLokasiGedung(e.target.value)}
                    placeholder="Lokasi gedung"
                    className="text-sm"
                  />
                </div>
                
                {/* ID Perangkat */}
                <div className="space-y-2">
                  <Label htmlFor="idPerangkat" className="text-sm font-medium">
                    ID Perangkat (SIMA)
                  </Label>
                  <Input
                    id="idPerangkat"
                    value={idPerangkat}
                    onChange={(e) => setIdPerangkat(e.target.value)}
                    placeholder="Masukkan ID Perangkat"
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {idPerangkat ? "✓ Terisi otomatis dari data gedung" : "Kosongkan jika tidak ada"}
                  </p>
                </div>
                
                {/* Tanggal Tanda Tangan */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Tanggal Tanda Tangan
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal text-sm",
                          !signatureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {signatureDate
                          ? format(signatureDate, "dd MMM yyyy")
                          : "Pilih tanggal (default: hari ini)"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={signatureDate}
                        onSelect={setSignatureDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Tanda Tangan - Manar */}
                <div className="space-y-2">
                  <Label htmlFor="manar" className="text-sm font-medium">
                    Tanda Tangan - Manar
                  </Label>
                  <Select value={selectedManar} onValueChange={setSelectedManar}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Pilih nama Manar" />
                    </SelectTrigger>
                    <SelectContent>
                      {allSignatureNames.map((name) => (
                        <SelectItem key={name} value={name} className="text-sm">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Tanda Tangan - PIC/Teknisi */}
                <div className="space-y-2">
                  <Label htmlFor="pic" className="text-sm font-medium">
                    Tanda Tangan - PIC/Teknisi
                  </Label>
                  <Select value={selectedPic} onValueChange={setSelectedPic}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Pilih nama PIC/Teknisi" />
                    </SelectTrigger>
                    <SelectContent>
                      {allSignatureNames.map((name) => (
                        <SelectItem key={name} value={name} className="text-sm">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  className="transition-all duration-150"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={onExportPdf}
                  className="transition-all duration-150"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Export PDF
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      {/* Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) => {
          if (!open) handleCancelEdit();
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Edit {editDialog.field === "jawaban" ? "Jawaban" : "Deskripsi"}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Masukkan{" "}
              {editDialog.field === "jawaban" ? "jawaban" : "deskripsi"} untuk
              item checklist
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editDialog.value}
              onChange={(e) =>
                setEditDialog({ ...editDialog, value: e.target.value })
              }
              placeholder={`Masukkan ${editDialog.field}...`}
              className="min-h-[120px] text-sm sm:text-base resize-none"
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="transition-all duration-150"
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="transition-all duration-150"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Detail Dialog for Tolak Ukur */}
      <Dialog
        open={detailDialog.open}
        onOpenChange={(open) => setDetailDialog({ ...detailDialog, open })}
      >
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              {detailDialog.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {detailDialog.content}
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setDetailDialog({ ...detailDialog, open: false })}
              className="w-full sm:w-auto"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
