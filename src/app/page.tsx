"use client";
import { ClipboardList } from "lucide-react";
import * as React from "react";
import ReportFormNew from "@/components/ReportFormNew";
import ReportTable from "@/components/ReportTable";
import DialogTutorial from "@/components/DialogTutorial";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { FormEntry, FormType } from "@/types/form";

export default function Home() {
  const [generated, setGenerated] = React.useState<{
    building: string;
    formType: FormType;
    periodType: "Mingguan" | "Bulanan" | "";
    week: string;
    month: string;
    entries: FormEntry[];
  } | null>(null);
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 mb-3 sm:mb-4 rounded-2xl bg-primary/10 ring-1 ring-primary/20 shadow-sm">
            <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-3 bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Form Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
            Generate and manage your inspection reports with ease. Take photos,
            fill in details, and export to PDF in minutes.
          </p>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
          {/* Form & Tutorial Combined - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[600px] lg:h-[650px]">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700/50 flex flex-col items-center text-center bg-linear-to-b from-gray-50/50 to-transparent dark:from-gray-800/30 p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  Generate Report Form
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">
                  Select the building and type of report you want to generate.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6 flex-1 min-h-0 overflow-y-auto scrollbar-thin">
                <ReportFormNew
                  renderTableExternally
                  onGenerated={(p) => setGenerated(p)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Tutorial Section - Takes 1 column on desktop */}
          <div className="lg:col-span-1">
            <DialogTutorial />
          </div>
        </div>

        {/* Table Section - Always visible with empty state */}
        <div className="animate-in fade-in duration-500">
          {generated && generated.entries.length > 0 ? (
            <ReportTable
              building={generated.building}
              formType={generated.formType}
              periodType={generated.periodType}
              week={generated.week}
              month={generated.month}
              entries={generated.entries}
              onEntriesChange={(next) =>
                setGenerated({ ...generated, entries: next })
              }
              onExported={() => setGenerated(null)}
            />
          ) : (
            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
                  <ClipboardList className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                  Checklist Belum Dibuat
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-md leading-relaxed">
                  Lengkapi pilihan di atas dan tekan tombol{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    &quot;Generate Form&quot;
                  </span>{" "}
                  untuk memunculkan checklist yang siap diisi.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Section
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Easy Form Generation",
              description:
                "Select building and form type to instantly generate inspection forms.",
              icon: "📋",
            },
            {
              title: "Photo Integration",
              description:
                "Capture and compress photos directly from your device camera.",
              icon: "📸",
            },
            {
              title: "PDF Export",
              description:
                "Export your completed forms to PDF format with one click.",
              icon: "📄",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="border-2 border-gray-200 dark:border-gray-700"
            >
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div> */}
      </main>
    </div>
  );
}
