"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon, Loader2, Calendar as CalendarIcon, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { cn, compressImage, getFormTemplate, checkTemplateAvailability, TemplateNotAvailableError, formTypeLabels } from "@/lib/utils";
import { buildings } from "@/config/constants";
import { formTypes } from "@/config/form-types";
import { format } from "date-fns";
import type {
  FormEntry,
  FormState,
  FormTemplate,
  FormType,
} from "@/types/form";

type GeneratePayload = {
  building: string;
  formType: FormType;
  periodType: "Mingguan" | "Bulanan" | "";
  week: string;
  month: string;
  entries: FormEntry[];
  unitNumber?: string; // Untuk Genset 1/2 atau Trafo 1/2 di GD Menara Risti Idex
};

export default function ReportFormNew({
  renderTableExternally = false,
  onGenerated,
  selectedDate,
  onSelectedDateChange,
}: {
  renderTableExternally?: boolean;
  onGenerated?: (payload: GeneratePayload) => void;
  selectedDate?: Date;
  onSelectedDateChange?: (date: Date | undefined) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>({
    building: buildings[0],
    formType: "",
    periodType: "",
    week: "",
    month: "",
    entries: [],
  });

  // Dua variabel terpisah untuk gedung
  const [selectedPresetBuilding, setSelectedPresetBuilding] = useState<string>(
    buildings[0]
  ); // Dari dropdown
  const [manualBuildingInput, setManualBuildingInput] = useState<string>(""); // Dari input manual
  const [isBuildingDropdownOpen, setIsBuildingDropdownOpen] = useState(false);

  // Computed value: Prioritas manual input, fallback ke preset
  const finalBuildingName = manualBuildingInput || selectedPresetBuilding;

  // State untuk unit number (khusus GD Menara Risti Idex - Genset 1/2 atau Trafo 1/2)
  const [unitNumber, setUnitNumber] = useState<string>("");

  // Cek apakah perlu menampilkan pilihan unit
  const showUnitSelection = 
    finalBuildingName === "GD Menara Risti Idex" && 
    (formState.formType === "Genset" || formState.formType === "Trafo");

  // Load form template when type changes
  async function onGenerateForm(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.formType) {
      toast.error("Pilih jenis laporan terlebih dahulu");
      return;
    }
    if (!formState.periodType) {
      toast.error("Pilih periode laporan terlebih dahulu");
      return;
    }
    
    // Validasi unit number untuk GD Menara Risti Idex
    if (showUnitSelection && !unitNumber) {
      toast.error(`Pilih nomor ${formState.formType} terlebih dahulu (1 atau 2)`);
      return;
    }

    setIsLoading(true);
    try {
      // Compose activity + period into a FormType key used to fetch the template
      const activity = formState.formType;
      const period = formState.periodType;
      
      // Cek ketersediaan template sebelum fetch
      if (activity !== "COSATFAMF" && period) {
        const isAvailable = checkTemplateAvailability(activity, period);
        if (!isAvailable) {
          const label = formTypeLabels[activity] || activity;
          toast.error(
            `Template ${period} tidak tersedia untuk laporan ${label}. Silakan pilih periode Bulanan.`,
            { duration: 5000 }
          );
          setIsLoading(false);
          return;
        }
      }
      
      const composed: FormType = (
        activity === "COSATFAMF" || !period ? activity : `${activity}_${period}`
      ) as FormType;

      const template = await getFormTemplate(composed);
      const entries = (template as FormTemplate).checklist.map((item) => ({
        no: item.no,
        "Item Checklist": item["Item Checklist"],
        "Tolak Ukur": item["Tolak Ukur"],
        jawaban: "",
        deskripsi: "",
        photo: undefined,
        photoDataUrl: "",
      }));
      setFormState((prev) => ({ ...prev, entries }));

      // Debug: Log building value sebelum dikirim
      console.log("🏢 Generate Form - Manual Input:", manualBuildingInput);
      console.log(
        "🏢 Generate Form - Preset Selected:",
        selectedPresetBuilding
      );
      console.log("🏢 Generate Form - Final Building:", finalBuildingName);

      onGenerated?.({
        building: finalBuildingName, // Gunakan computed value
        formType: composed,
        periodType: formState.periodType,
        week: formState.week,
        month: formState.month,
        entries,
        unitNumber: showUnitSelection ? unitNumber : undefined, // Kirim unit number jika ada
      });
      toast.success("Form berhasil di-generate");
    } catch (error) {
      console.error(error);
      if (error instanceof TemplateNotAvailableError) {
        toast.error(error.message, { duration: 5000 });
      } else {
        toast.error("Gagal memuat template form. Pastikan kombinasi laporan dan periode tersedia.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function onChangePhoto(index: number, file?: File) {
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setFormState((prev) => {
          const next = { ...prev };
          next.entries[index] = {
            ...next.entries[index],
            photo: compressed,
            photoDataUrl: dataUrl,
          };
          return next;
        });
      };
      reader.readAsDataURL(compressed);
      toast.success("Foto berhasil dikompresi dan ditambahkan");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengkompresi foto");
    }
  }

  function onChangeEntry(index: number, field: keyof FormEntry, value: string) {
    setFormState((prev) => {
      const next = { ...prev };
      next.entries[index] = { ...next.entries[index], [field]: value };
      return next;
    });
  }

  async function onExportPdf() {
    if (!previewRef.current) return;
    setShowConfirm(false);
    setIsLoading(true);

    try {
      // TODO: Replace with jsPDF implementation like in ReportTable
      // const element = previewRef.current;
      // const opt = {
      //   margin: 10,
      //   filename: `${formState.building}_${
      //     formState.formType
      //   }_${new Date().toISOString()}.pdf`,
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { scale: 2, useCORS: true },
      //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      // };
      // const html2pdfModule = await import("html2pdf.js");
      // const html2pdf = html2pdfModule?.default || html2pdfModule;
      // await html2pdf().set(opt).from(element).save();

      toast.error(
        "Export PDF belum diimplementasi di ReportFormNew. Gunakan ReportTable."
      );

      // Clear form after successful export
      setFormState({
        building: buildings[0],
        formType: "",
        periodType: "",
        week: "",
        month: "",
        entries: [],
      });
      toast.success("PDF berhasil di-generate dan di-download");
    } catch (err) {
      console.error(err);
      toast.error("Gagal generate PDF. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full">
      <form
        onSubmit={onGenerateForm}
        className="space-y-4 sm:space-y-6 w-full h-full"
      >
        <Card className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700/50 h-full shadow-sm">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="building"
                className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Gedung
              </Label>
              <Select
                value={selectedPresetBuilding}
                onValueChange={(v) => {
                  setSelectedPresetBuilding(v);
                  setManualBuildingInput(""); // Clear manual when preset selected
                  setUnitNumber(""); // Reset unit number when building changes
                }}
                open={isBuildingDropdownOpen}
                onOpenChange={setIsBuildingDropdownOpen}
              >
                <SelectTrigger className="h-9 sm:h-10 text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500">
                  {finalBuildingName ? (
                    <span className="text-sm">{finalBuildingName}</span>
                  ) : (
                    <SelectValue placeholder="Pilih gedung" />
                  )}
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {/* Input Manual - Always visible at top */}
                  <div
                    className="px-2 py-2 border-b border-gray-200 dark:border-gray-700"
                    onKeyDown={(e) => {
                      // Prevent Select component from handling keyboard events
                      e.stopPropagation();
                    }}
                  >
                    <Label className="text-xs text-muted-foreground mb-1.5 block">
                      Input Manual
                    </Label>
                    <Input
                      type="text"
                      placeholder="Ketik nama gedung & tekan Enter..."
                      value={manualBuildingInput}
                      onChange={(e) => {
                        setManualBuildingInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        // Stop propagation agar Select tidak handle keyboard
                        e.stopPropagation();

                        if (e.key === "Enter" && manualBuildingInput.trim()) {
                          e.preventDefault();

                          console.log(
                            "🔑 Enter pressed - Manual Input:",
                            manualBuildingInput.trim()
                          );

                          setIsBuildingDropdownOpen(false); // Close dropdown
                          toast.success(
                            `Gedung "${manualBuildingInput.trim()}" berhasil dipilih`
                          );
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                      className="h-8 text-sm"
                    />
                  </div>

                  {/* Predefined Building Options */}
                  {buildings.map((b) => (
                    <SelectItem
                      key={b}
                      value={b}
                      className="cursor-pointer text-sm"
                    >
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="formType"
                className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Jenis Laporan
              </Label>
              <Select
                value={formState.formType}
                onValueChange={(v) => {
                  setFormState((prev) => ({
                    ...prev,
                    formType: v as FormType,
                  }));
                  // Reset unit number ketika ganti jenis laporan
                  setUnitNumber("");
                }}
              >
                <SelectTrigger className="h-9 sm:h-10 text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500">
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  {formTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="cursor-pointer text-sm"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown untuk Unit Number (khusus GD Menara Risti Idex - Genset/Trafo) */}
            {showUnitSelection && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label
                  htmlFor="unitNumber"
                  className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Nomor {formState.formType}
                </Label>
                <Select
                  value={unitNumber}
                  onValueChange={setUnitNumber}
                >
                  <SelectTrigger className="h-9 sm:h-10 text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500">
                    <SelectValue placeholder={`Pilih ${formState.formType} 1 atau 2`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1" className="cursor-pointer text-sm">
                      {formState.formType} 1
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer text-sm">
                      {formState.formType} 2
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="periodType"
                className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Periode
              </Label>
              <Select
                value={formState.periodType}
                onValueChange={(v: "Mingguan" | "Bulanan") => {
                  setFormState((prev) => ({
                    ...prev,
                    periodType: v,
                    // Reset week/month when period type changes
                    week: "",
                    month: "",
                  }));
                  // Reset selectedDate saat ganti periode
                  onSelectedDateChange?.(undefined);
                }}
              >
                <SelectTrigger className="h-9 sm:h-10 text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500">
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Mingguan"
                    className="cursor-pointer text-sm"
                  >
                    Mingguan
                  </SelectItem>
                  <SelectItem
                    value="Bulanan"
                    className="cursor-pointer text-sm"
                  >
                    Bulanan
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Warning jika kombinasi tidak tersedia */}
              {formState.formType && formState.periodType && 
                !checkTemplateAvailability(formState.formType, formState.periodType) && (
                <div className="flex items-start gap-2 p-2 mt-2 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Template {formState.periodType} tidak tersedia untuk {formTypeLabels[formState.formType] || formState.formType}. 
                    Silakan pilih periode <strong>Bulanan</strong>.
                  </p>
                </div>
              )}
            </div>

            {formState.periodType === "Mingguan" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label
                  htmlFor="week"
                  className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Minggu
                </Label>
                <Select
                  value={formState.week}
                  onValueChange={(v) =>
                    setFormState((prev) => ({ ...prev, week: v }))
                  }
                >
                  <SelectTrigger className="h-9 sm:h-10 text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500">
                    <SelectValue placeholder="Pilih minggu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1" className="cursor-pointer text-sm">
                      Minggu 1
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer text-sm">
                      Minggu 2
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer text-sm">
                      Minggu 3
                    </SelectItem>
                    <SelectItem value="4" className="cursor-pointer text-sm">
                      Minggu 4
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formState.periodType === "Mingguan" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label
                  htmlFor="selectedDate"
                  className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Tanggal (Opsional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-9 sm:h-10 justify-start text-left font-normal text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {selectedDate
                        ? format(selectedDate, "dd MMM yyyy")
                        : "Gunakan tanggal hari ini"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        onSelectedDateChange?.(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {formState.periodType === "Bulanan" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label
                  htmlFor="month"
                  className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Bulan
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-9 sm:h-10 justify-start text-left font-normal text-sm transition-all duration-150 hover:border-gray-400 dark:hover:border-gray-500",
                        !formState.month && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {formState.month
                        ? format(new Date(formState.month), "dd MMM yyyy")
                        : "Pilih bulan"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formState.month ? new Date(formState.month) : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          setFormState((prev) => ({
                            ...prev,
                            month: date.toISOString(),
                          }));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 sm:flex-initial transition-all duration-200 hover:shadow-md active:scale-95"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Form
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormState({
                  building: buildings[0],
                  formType: "",
                  periodType: "",
                  week: "",
                  month: "",
                  entries: [],
                });
                setSelectedPresetBuilding(buildings[0]);
                setManualBuildingInput("");
                setUnitNumber(""); // Reset unit number
                onSelectedDateChange?.(undefined); // Reset tanggal
              }}
              className="flex-1 sm:flex-initial transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Clear
            </Button>
          </div>
        </Card>

        {!renderTableExternally && formState.entries.length > 0 && (
          <Card className="p-6 border-2 border-gray-200 dark:border-gray-700 w-full">
            <div className="rounded-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <TableHead className="w-[50px] font-semibold">No</TableHead>
                    <TableHead className="font-semibold">
                      Item Checklist
                    </TableHead>
                    <TableHead className="font-semibold">Tolak Ukur</TableHead>
                    <TableHead className="font-semibold">Jawaban</TableHead>
                    <TableHead className="font-semibold">Deskripsi</TableHead>
                    <TableHead className="font-semibold">Foto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formState.entries.map((entry, idx) => (
                    <TableRow key={entry.no}>
                      <TableCell>{entry.no}</TableCell>
                      <TableCell>{entry["Item Checklist"]}</TableCell>
                      <TableCell>{entry["Tolak Ukur"]}</TableCell>
                      <TableCell>
                        <Input
                          value={entry.jawaban}
                          onChange={(e) =>
                            onChangeEntry(idx, "jawaban", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={entry.deskripsi}
                          onChange={(e) =>
                            onChangeEntry(idx, "deskripsi", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Label
                            htmlFor={`photo-${idx}`}
                            className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium rounded-lg border px-3 py-2 hover:bg-accent"
                          >
                            <ImageIcon className="h-4 w-4" />
                            Upload Foto
                            <Input
                              id={`photo-${idx}`}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={(e) =>
                                onChangePhoto(idx, e.target.files?.[0])
                              }
                            />
                          </Label>
                          {entry.photoDataUrl && (
                            <div className="relative w-24 h-24">
                              <Image
                                src={entry.photoDataUrl}
                                alt={`Photo ${idx + 1}`}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6">
              <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                  >
                    Export PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Konfirmasi Export PDF</DialogTitle>
                    <DialogDescription>
                      Pastikan semua data sudah terisi dengan benar sebelum
                      melanjutkan. Form akan dikosongkan setelah export
                      berhasil.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirm(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={onExportPdf}
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
        )}
      </form>

      {/* PDF Preview (off-screen) */}
      <div
        ref={previewRef}
        className="fixed left-[-9999px] p-4 bg-white"
        style={{ width: "210mm" }}
      >
        <h2 className="text-lg font-semibold">
          Laporan{" "}
          {formTypes.find((t) => t.value === (formState.formType as FormType))
            ?.label ?? ""}
        </h2>
        <div className="text-sm space-y-1">
          <div>Gedung: {finalBuildingName}</div>
          <div>
            Periode:{" "}
            {formState.periodType === "Mingguan"
              ? `Minggu ${formState.week}`
              : formState.periodType === "Bulanan"
              ? `Bulan ${formState.month}`
              : "-"}
          </div>
          <div>Tanggal: {format(new Date(), "dd MMMM yyyy")}</div>
        </div>

        <div className="mt-4">
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2">No</th>
                <th className="border p-2">Item Checklist</th>
                <th className="border p-2">Tolak Ukur</th>
                <th className="border p-2">Jawaban</th>
                <th className="border p-2">Deskripsi</th>
                <th className="border p-2">Foto</th>
              </tr>
            </thead>
            <tbody>
              {formState.entries.map((entry, i) => (
                <tr key={i}>
                  <td className="border p-2">{entry.no}</td>
                  <td className="border p-2">{entry["Item Checklist"]}</td>
                  <td className="border p-2">{entry["Tolak Ukur"]}</td>
                  <td className="border p-2">{entry.jawaban}</td>
                  <td className="border p-2">{entry.deskripsi}</td>
                  <td className="border p-2">
                    {entry.photoDataUrl && (
                      <div className="w-24">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={entry.photoDataUrl}
                          alt={`Foto ${i + 1}`}
                          className="w-full"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
