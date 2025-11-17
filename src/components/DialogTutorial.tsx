import {
  FileText,
  CheckCircle,
  Camera,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

const DialogTutorial = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Card
      className={`border border-gray-200 dark:border-gray-700/50 flex flex-col shadow-sm transition-all duration-300 ${
        isCollapsed ? "h-auto" : "h-[600px] lg:h-[650px]"
      }`}
    >
      <CardHeader
        className={`bg-linear-to-b from-gray-50/50 to-transparent dark:from-gray-800/30 ${
          isCollapsed ? "" : "border-b border-gray-200 dark:border-gray-700/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Panduan Penggunaan
            </CardTitle>
            {!isCollapsed && (
              <CardDescription className="text-sm mt-1.5">
                Ikuti langkah-langkah berikut untuk menghasilkan laporan
              </CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              isCollapsed ? "Tampilkan panduan" : "Sembunyikan panduan"
            }
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="pt-6 flex-1 overflow-y-auto scrollbar-thin">
          <div className="space-y-5 pr-2">
            {/* Step 1 */}
            <div className="space-y-2 group">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm ring-2 ring-blue-200 dark:ring-blue-800">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
                    Pilih Gedung
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pilih lokasi gedung dari dropdown yang tersedia
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-2 group">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm ring-2 ring-blue-200 dark:ring-blue-800">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
                    Pilih Jenis Laporan
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tentukan jenis pemeriksaan yang akan dilakukan (Genset,
                    Trafo, MDP/SDP, dll)
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-2 group">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm ring-2 ring-blue-200 dark:ring-blue-800">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
                    Tentukan Periode
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pilih periode Mingguan atau Bulanan, lalu tentukan
                    minggu/bulan yang sesuai
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-2 group">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-300 ring-2 ring-green-200 dark:ring-green-800">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
                    Generate Form
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Klik tombol `&quot;Generate Form&quot;` untuk membuat
                    template checklist
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Camera className="w-4 h-4 text-primary" />
                Mengisi Form
              </h3>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Isi kolom{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      Jawaban
                    </strong>{" "}
                    sesuai hasil pemeriksaan
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Tambahkan{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      Deskripsi
                    </strong>{" "}
                    detail jika diperlukan
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Upload{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      Foto
                    </strong>{" "}
                    sebagai evidence (otomatis terkompress)
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Download className="w-4 h-4 text-primary" />
                Export ke PDF
              </h3>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Pastikan semua data sudah terisi dengan benar
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Klik tombol{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      `&quot;Export PDF&quot;`
                    </strong>
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Konfirmasi export, PDF akan otomatis terdownload
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Form akan otomatis dikosongkan setelah export berhasil
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg p-3 mt-4 shadow-sm">
              <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                <strong>💡 Tips:</strong> Foto akan otomatis dikompress untuk
                menghemat ruang penyimpanan tanpa mengurangi kualitas secara
                signifikan.
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DialogTutorial;
