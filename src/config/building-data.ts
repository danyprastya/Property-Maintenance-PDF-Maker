/**
 * Building Data Mapping
 * Berisi informasi lengkap untuk setiap gedung termasuk kode SIMA, lokasi, ID perangkat, dan tanda tangan
 */

export interface BuildingEquipmentData {
  kodeGedung: string;
  lokasiGedung: string;
  idPerangkat: string; // Ambil yang setelah "/" jika ada
  manar: string;
  pic: string;
}

export type AreaType = "Bandung" | "Priangan Barat" | "Priangan Timur";

export interface BuildingData {
  area: AreaType;
  kodeGedung: string;
  lokasiGedung: string;
  manar: string;
  pic: string;
  equipment: {
    Genset?: {
      Mingguan?: BuildingEquipmentData | Record<string, BuildingEquipmentData>; // Untuk multiple units
      Bulanan?: BuildingEquipmentData | Record<string, BuildingEquipmentData>;
    };
    MDPSDP?: {
      Mingguan?: BuildingEquipmentData;
      Bulanan?: BuildingEquipmentData;
    };
    Penyalur_Petir?: {
      Bulanan?: BuildingEquipmentData;
    };
    Trafo?: {
      Bulanan?: BuildingEquipmentData | Record<string, BuildingEquipmentData>; // Untuk multiple units
    };
    COSATFAMF?: {
      Bulanan?: BuildingEquipmentData;
    };
    Capacitor_Bank?: {
      Bulanan?: BuildingEquipmentData | Record<string, BuildingEquipmentData>; // Untuk multiple units
    };
    CubicleSwitch_Gear?: {
      Bulanan?: BuildingEquipmentData;
    };
  };
}

export const buildingDataMap: Record<string, BuildingData> = {
  "TCU 1": {
    area: "Bandung",
    kodeGedung: "1611",
    lokasiGedung: "TCU 1",
    manar: "AMIRUDDIN",
    pic: "HERRIYANTO",
    equipment: {
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161803LV01-71540",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161803LV01-71540",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Genset: {
        Mingguan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161103GS01-71627",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161103GS01-71627",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161103GS01-71538",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1611",
          lokasiGedung: "TCU 1",
          idPerangkat: "161103PP01-71499",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
    },
  },
  "TCU 2": {
    area: "Bandung",
    kodeGedung: "1618",
    lokasiGedung: "TCU 2",
    manar: "AMIRUDDIN",
    pic: "HERRIYANTO",
    equipment: {
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "162003LV01-71543",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "162003LV01-71543",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Genset: {
        Mingguan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "161803GS01-71539",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "161803GS01-71539",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "161803GS01-71541",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1618",
          lokasiGedung: "TCU 2",
          idPerangkat: "161803PP01-71498",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
    },
  },
  "TCU 3": {
    area: "Bandung",
    kodeGedung: "1608",
    lokasiGedung: "TCU 3",
    manar: "AMIRUDDIN",
    pic: "HERRIYANTO",
    equipment: {
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803LV03-71546",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803LV03-71546",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Genset: {
        Mingguan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803GS03-71542",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803GS03-71542",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803GS03-71545",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803PP03-71497",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Trafo: {
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803TR03-71543",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "160803MV03-71544",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Capacitor_Bank: {
        Bulanan: {
          kodeGedung: "1608",
          lokasiGedung: "TCU 3",
          idPerangkat: "",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
    },
  },
  "GD Menara Risti Idex": {
    area: "Bandung",
    kodeGedung: "1547",
    lokasiGedung: "GD Menara Risti Idex",
    manar: "AMIRUDDIN",
    pic: "HERRIYANTO",
    equipment: {
      Trafo: {
        Bulanan: {
          "1": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703TR01-71535",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
          "2": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703TR01-71534",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
        },
      },
      Genset: {
        Mingguan: {
          "1": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703GS01-71807",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
          "2": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703GS01-71821",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
        },
        Bulanan: {
          "1": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703GS01-71807",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
          "2": {
            kodeGedung: "1547",
            lokasiGedung: "GD Menara Risti Idex",
            idPerangkat: "154703GS01-71821",
            manar: "AMIRUDDIN",
            pic: "HERRIYANTO",
          },
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703MV01-71525",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703LV01-71527",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
        Bulanan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703LV01-71527",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703PP01-71496",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      Capacitor_Bank: {
        Bulanan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703KB01-71618",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1547",
          lokasiGedung: "GD Menara Risti Idex",
          idPerangkat: "154703GS01-71610",
          manar: "AMIRUDDIN",
          pic: "HERRIYANTO",
        },
      },
    },
  },
  "Telkom Cisanggarung": {
    area: "Bandung",
    kodeGedung: "1231",
    lokasiGedung: "Telkom Cisanggarung",
    manar: "AMIRUDDIN",
    pic: "GUNAWAN",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103GS01-71467",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
        Bulanan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103GS01-71467",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103GS01-34259",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103LV03-71466",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
        Bulanan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103LV03-71466",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      Capacitor_Bank: {
        Bulanan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103KB03-34271",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1231",
          lokasiGedung: "Telkom Cisanggarung",
          idPerangkat: "123103PP01-71468",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
    },
  },
  "Assessment Center Indonesia 71": {
    area: "Bandung",
    kodeGedung: "01599",
    lokasiGedung: "JL. HEGARMANAH NO. 71 BANDUNG",
    manar: "AMIRUDDIN",
    pic: "SIGIT RULLY",
    equipment: {
      MDPSDP: {
        Mingguan: {
          kodeGedung: "01599",
          lokasiGedung: "JL. HEGARMANAH NO. 71 BANDUNG",
          idPerangkat: "159903LV01-71480",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
        Bulanan: {
          kodeGedung: "01599",
          lokasiGedung: "JL. HEGARMANAH NO. 71 BANDUNG",
          idPerangkat: "159903LV01-71480",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "01599",
          lokasiGedung: "JL. HEGARMANAH NO. 71 BANDUNG",
          idPerangkat: "159903PP01-71481",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
    },
  },
  "Assessment Center Indonesia Tendean": {
    area: "Bandung",
    kodeGedung: "01598",
    lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
    manar: "AMIRUDDIN",
    pic: "SIGIT RULLY",
    equipment: {
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803GS01-71816",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803PP01-71819",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803LV01-71477",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
        Bulanan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803LV01-71477",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      Genset: {
        Mingguan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803GS01-71814",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
        Bulanan: {
          kodeGedung: "01598",
          lokasiGedung: "JL. KAPTEN TENDEAN NO. 1 BANDUNG",
          idPerangkat: "159803GS01-71814",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
    },
  },
  "GT Lembong": {
    area: "Bandung",
    kodeGedung: "01329",
    lokasiGedung: "GEDUNG KANTOR TELKOM LEMBONG GD. E JL. LEMBONG NO 11-15 BANDUNG",
    manar: "AMIRUDDIN",
    pic: "RANDI ROMDONI",
    equipment: {
      Trafo: {
        Bulanan: {
          "1": {
            kodeGedung: "01329",
            lokasiGedung: "GEDUNG KANTOR TELKOM LEMBONG GD. E JL. LEMBONG NO 11-15 BANDUNG",
            idPerangkat: "132903TR01-71623",
            manar: "AMIRUDDIN",
            pic: "RANDI ROMDONI",
          },
          "2": {
            kodeGedung: "01329",
            lokasiGedung: "GEDUNG KANTOR TELKOM LEMBONG GD. E JL. LEMBONG NO 11-15 BANDUNG",
            idPerangkat: "132903TR01-71624",
            manar: "AMIRUDDIN",
            pic: "RANDI ROMDONI",
          },
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "01329",
          lokasiGedung: "GEDUNG KANTOR TELKOM LEMBONG GD. E JL. LEMBONG NO 11-15 BANDUNG",
          idPerangkat: "132903MV01-71450",
          manar: "AMIRUDDIN",
          pic: "RANDI ROMDONI",
        },
      },
    },
  },
  "STO Cicadas": {
    area: "Bandung",
    kodeGedung: "1296",
    lokasiGedung: "Jl. A. Yani No.698, Cicaheum, Kec. Kiaracondong, Kota Bandung",
    manar: "AMIRUDDIN",
    pic: "SIGIT RULLY",
    equipment: {
      Trafo: {
        Bulanan: {
          kodeGedung: "1296",
          lokasiGedung: "Jl. A. Yani No.698, Cicaheum, Kec. Kiaracondong, Kota Bandung",
          idPerangkat: "129603TR01-71614",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1296",
          lokasiGedung: "Jl. A. Yani No.698, Cicaheum, Kec. Kiaracondong, Kota Bandung",
          idPerangkat: "160103MV01-71613",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
    },
  },
  "GMP Bandung": {
    area: "Bandung",
    kodeGedung: "1212",
    lokasiGedung: "GMP Bandung",
    manar: "AMIRUDDIN",
    pic: "AANG CEPI",
    equipment: {
      Genset: {
        Mingguan: {
          "DEUTZ": {
            kodeGedung: "1212",
            lokasiGedung: "GMP JAPATI",
            idPerangkat: "121203GSBS-28158",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
          "MTU": {
            kodeGedung: "1212",
            lokasiGedung: "GMP JAPATI",
            idPerangkat: "121203GSBS-28157",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
        },
        Bulanan: {
          "DEUTZ": {
            kodeGedung: "1212",
            lokasiGedung: "GMP JAPATI",
            idPerangkat: "121203GSBS-28158",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
          "MTU": {
            kodeGedung: "1212",
            lokasiGedung: "GMP JAPATI",
            idPerangkat: "121203GSBS-28157",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
        },
      },
      Trafo: {
        Bulanan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP JAPATI",
          idPerangkat: "121203TR01-65830",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP BANDUNG",
          idPerangkat: "121203GS09-71449",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP Bandung",
          idPerangkat: "121203MV10-71446",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP BANDUNG",
          idPerangkat: "121203LV09-71448",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
        Bulanan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP BANDUNG",
          idPerangkat: "121203LV09-71448",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
      },
      Capacitor_Bank: {
        Bulanan: {
          "1": {
            kodeGedung: "1212",
            lokasiGedung: "GMP BANDUNG",
            idPerangkat: "121203KBBS-28160",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
          "2": {
            kodeGedung: "1212",
            lokasiGedung: "GMP BANDUNG",
            idPerangkat: "121203KBBS-65824",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
          "3": {
            kodeGedung: "1212",
            lokasiGedung: "GMP BANDUNG",
            idPerangkat: "121203KBBS-65825",
            manar: "AMIRUDDIN",
            pic: "AANG CEPI",
          },
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1212",
          lokasiGedung: "GMP Bandung",
          idPerangkat: "121203PP09-71447",
          manar: "AMIRUDDIN",
          pic: "AANG CEPI",
        },
      },
    },
  },
  "GT Rajawali": {
    area: "Bandung",
    kodeGedung: "1552",
    lokasiGedung: "GT. RAJAWALI GEDUNG B WITEL BANDUNG BARAT",
    manar: "AMIRUDDIN",
    pic: "RANDI ROMDONI",
    equipment: {
      Trafo: {
        Bulanan: {
          kodeGedung: "1552",
          lokasiGedung: "GT. RAJAWALI GEDUNG B WITEL BANDUNG BARAT",
          idPerangkat: "155203TR01-71817",
          manar: "AMIRUDDIN",
          pic: "RANDI ROMDONI",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1552",
          lokasiGedung: "GT. RAJAWALI GEDUNG B WITEL BANDUNG BARAT",
          idPerangkat: "155203MV01-71818",
          manar: "AMIRUDDIN",
          pic: "RANDI ROMDONI",
        },
      },
    },
  },
  "Plasa Supratman": {
    area: "Bandung",
    kodeGedung: "1323",
    lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
    manar: "AMIRUDDIN",
    pic: "GUNAWAN",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303GS01-71504",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
        Bulanan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303GS01-71504",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303GS01-71507",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303LV01-71505",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
        Bulanan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303LV01-71505",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1323",
          lokasiGedung: "JL. SUPRATMAN NO. 62 BANDUNG",
          idPerangkat: "132303PP01-71509",
          manar: "AMIRUDDIN",
          pic: "GUNAWAN",
        },
      },
    },
  },
  "STO Gegerkalong": {
    area: "Bandung",
    kodeGedung: "01601",
    lokasiGedung: "JL. GEGERKALONG HILIR NO. 65",
    manar: "AMIRUDDIN",
    pic: "SIGIT RULLY",
    equipment: {
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "01601",
          lokasiGedung: "JL. GEGERKALONG HILIR NO. 65",
          idPerangkat: "160103MV01-71613",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
      Trafo: {
        Bulanan: {
          kodeGedung: "01601",
          lokasiGedung: "JL. GEGERKALONG HILIR NO. 65",
          idPerangkat: "160103TR01-71612",
          manar: "AMIRUDDIN",
          pic: "SIGIT RULLY",
        },
      },
    },
  },
  "Plasa Cimahi": {
    area: "Bandung",
    kodeGedung: "01556",
    lokasiGedung: "PLASA BAROS CIMAHI",
    manar: "AMIRUDDIN",
    pic: "ASEP SOLEH",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "01556",
          lokasiGedung: "PLASA BAROS CIMAHI",
          idPerangkat: "155603GS01-34073",
          manar: "AMIRUDDIN",
          pic: "ASEP SOLEH",
        },
        Bulanan: {
          kodeGedung: "01556",
          lokasiGedung: "PLASA BAROS CIMAHI",
          idPerangkat: "155603GS01-34073",
          manar: "AMIRUDDIN",
          pic: "ASEP SOLEH",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "01556",
          lokasiGedung: "GT. BAROS / PLASA CIMAHI",
          idPerangkat: "155603GS01-34076",
          manar: "AMIRUDDIN",
          pic: "ASEP SOLEH",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "01556",
          lokasiGedung: "PLASA BAROS CIMAHI",
          idPerangkat: "155603LV01-34077",
          manar: "AMIRUDDIN",
          pic: "ASEP SOLEH",
        },
        Bulanan: {
          kodeGedung: "01556",
          lokasiGedung: "PLASA BAROS CIMAHI",
          idPerangkat: "155603LV01-34077",
          manar: "AMIRUDDIN",
          pic: "ASEP SOLEH",
        },
      },
    },
  },
  // ============= AREA PRIANGAN TIMUR =============
  "Kantor Witel Jabar Timur": {
    area: "Priangan Timur",
    kodeGedung: "1247",
    lokasiGedung: "KANTOR WITEL JABAR TIMUR",
    manar: "MAHSUN EFFENDI",
    pic: "MUHAMMAD ADRIANSYAH",
    equipment: {
      Trafo: {
        Bulanan: {
          kodeGedung: "1247",
          lokasiGedung: "KANTOR WITEL JABAR TIMUR",
          idPerangkat: "124703TR01-71452",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1247",
          lokasiGedung: "KANTOR WITEL JABAR TIMUR",
          idPerangkat: "124703MV01-71451",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
    },
  },
  "Plasa Cirebon": {
    area: "Priangan Timur",
    kodeGedung: "1246",
    lokasiGedung: "PLASA CIREBON (PLASA SILIWANGI CIREBON)",
    manar: "MAHSUN EFFENDI",
    pic: "MUHAMMAD ADRIANSYAH",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1246",
          lokasiGedung: "PLASA CIREBON (PLASA SILIWANGI CIREBON)",
          idPerangkat: "124603GS01-71611",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
        Bulanan: {
          kodeGedung: "1246",
          lokasiGedung: "PLASA CIREBON (PLASA SILIWANGI CIREBON)",
          idPerangkat: "124603GS01-71611",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1246",
          lokasiGedung: "PLASA CIREBON (PLASA SILIWANGI CIREBON)",
          idPerangkat: "124603GS01-71456",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
    },
  },
  "Plasa Indramayu": {
    area: "Priangan Timur",
    kodeGedung: "1198",
    lokasiGedung: "PLASA INDRAMAYU",
    manar: "MAHSUN EFFENDI",
    pic: "MUHAMMAD ADRIANSYAH",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803GS01-66124",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
        Bulanan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803GS01-66124",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803LV01-71471",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
        Bulanan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803LV01-71471",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803GS01-71472",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1198",
          lokasiGedung: "PLASA INDRAMAYU",
          idPerangkat: "119803PP01-71473",
          manar: "MAHSUN EFFENDI",
          pic: "MUHAMMAD ADRIANSYAH",
        },
      },
    },
  },
  "Plasa Ciamis": {
    area: "Priangan Timur",
    kodeGedung: "1253",
    lokasiGedung: "PLASA CIAMIS",
    manar: "MAHSUN EFFENDI",
    pic: "DENI HAMDANI",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303GS01-8868",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
        Bulanan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303GS01-8868",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303LV01-71513",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
        Bulanan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303LV01-71513",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303GS01-71515",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1253",
          lokasiGedung: "PLASA CIAMIS",
          idPerangkat: "125303PP01-71512",
          manar: "MAHSUN EFFENDI",
          pic: "DENI HAMDANI",
        },
      },
    },
  },
  "Garut Centrum Pramuka": {
    area: "Priangan Timur",
    kodeGedung: "1341",
    lokasiGedung: "GARUT CENTRUM PRAMUKA",
    manar: "MAHSUN EFFENDI",
    pic: "RUDI SEPTIANA",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103GS01-49264",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
        Bulanan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103GS01-49264",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103LV01-11276",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
        Bulanan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103LV01-11276",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103GS01-71460",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1341",
          lokasiGedung: "GARUT CENTRUM PRAMUKA",
          idPerangkat: "134103PP01-71461",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
    },
  },
  "GT Plasa Telkom Tasikmalaya": {
    area: "Priangan Timur",
    kodeGedung: "1269",
    lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
    manar: "MAHSUN EFFENDI",
    pic: "SAMSUL WIRAHMANA",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903GS01-28593",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
        Bulanan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903GS01-28593",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903LV01-28594",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
        Bulanan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903LV01-28594",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903GS01-71489",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1269",
          lokasiGedung: "GT PLASA TELKOM TASIKMALAYA",
          idPerangkat: "126903PP02-28595",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
    },
  },
  "STO Tasikmalaya": {
    area: "Priangan Timur",
    kodeGedung: "1265",
    lokasiGedung: "STO TASIKMALAYA",
    manar: "MAHSUN EFFENDI",
    pic: "SAMSUL WIRAHMANA",
    equipment: {
      Trafo: {
        Bulanan: {
          kodeGedung: "1265",
          lokasiGedung: "STO TASIKMALAYA",
          idPerangkat: "126503TR01-71462",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1265",
          lokasiGedung: "STO TASIKMALAYA",
          idPerangkat: "126503MV01-71463",
          manar: "MAHSUN EFFENDI",
          pic: "SAMSUL WIRAHMANA",
        },
      },
    },
  },
  "Plasa Telkom Garut": {
    area: "Priangan Timur",
    kodeGedung: "1340",
    lokasiGedung: "PLASA TELKOM GARUT",
    manar: "MAHSUN EFFENDI",
    pic: "RUDI SEPTIANA",
    equipment: {
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1340",
          lokasiGedung: "PLASA TELKOM GARUT",
          idPerangkat: "134003LV01-71458",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
        Bulanan: {
          kodeGedung: "1340",
          lokasiGedung: "PLASA TELKOM GARUT",
          idPerangkat: "134003LV01-71458",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1340",
          lokasiGedung: "PLASA TELKOM GARUT",
          idPerangkat: "134003PP01-71459",
          manar: "MAHSUN EFFENDI",
          pic: "RUDI SEPTIANA",
        },
      },
    },
  },
  // ============= AREA PRIANGAN BARAT =============
  "GT Cianjur STO Centrum": {
    area: "Priangan Barat",
    kodeGedung: "1520",
    lokasiGedung: "GT CIANJUR STO CENTRUM",
    manar: "NANANG EKO P",
    pic: "MULYADI DININGRAT",
    equipment: {
      Trafo: {
        Bulanan: {
          kodeGedung: "1520",
          lokasiGedung: "GT CIANJUR STO CENTRUM",
          idPerangkat: "152003TR01-71464",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
      CubicleSwitch_Gear: {
        Bulanan: {
          kodeGedung: "1520",
          lokasiGedung: "GT CIANJUR STO CENTRUM",
          idPerangkat: "152003MV01-71465",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
    },
  },
  "Datel Cianjur": {
    area: "Priangan Barat",
    kodeGedung: "1522",
    lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
    manar: "NANANG EKO P",
    pic: "MULYADI DININGRAT",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203GS01-8756",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
        Bulanan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203GS01-8756",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203LV01-11277",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
        Bulanan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203LV01-11277",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203GS01-71469",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1522",
          lokasiGedung: "DATEL CIANJUR (GT PLAZA CIANJUR)",
          idPerangkat: "152203PP01-71470",
          manar: "NANANG EKO P",
          pic: "MULYADI DININGRAT",
        },
      },
    },
  },
  "Kantor Witel Jabar Selatan": {
    area: "Priangan Barat",
    kodeGedung: "1534",
    lokasiGedung: "KANTOR WITEL JABAR SELATAN",
    manar: "NANANG EKO P",
    pic: "JUANDI",
    equipment: {
      Genset: {
        Mingguan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "153403GS01-66298",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
        Bulanan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "153403GS01-66298",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
      },
      MDPSDP: {
        Mingguan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "153403LV01-71474",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
        Bulanan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "153403LV01-71474",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
      },
      COSATFAMF: {
        Bulanan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "311600",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
      },
      Penyalur_Petir: {
        Bulanan: {
          kodeGedung: "1534",
          lokasiGedung: "KANTOR WITEL JABAR SELATAN",
          idPerangkat: "153403PP01-71476",
          manar: "NANANG EKO P",
          pic: "JUANDI",
        },
      },
    },
  },
};

// Type untuk period data yang bisa single atau multiple units
type PeriodData = BuildingEquipmentData | Record<string, BuildingEquipmentData>;

// Type untuk equipment dengan period types
type EquipmentPeriods = {
  Mingguan?: PeriodData;
  Bulanan?: PeriodData;
};

/**
 * Helper function untuk mendapatkan data perangkat berdasarkan gedung, jenis, periode, dan unit
 */
export function getBuildingEquipmentData(
  building: string,
  formType: string,
  periodType: "Mingguan" | "Bulanan",
  unitNumber?: string
): BuildingEquipmentData | null {
  const buildingData = buildingDataMap[building];
  if (!buildingData) return null;

  const equipmentType = buildingData.equipment[formType as keyof typeof buildingData.equipment] as EquipmentPeriods | undefined;
  if (!equipmentType) return null;

  const periodData = equipmentType[periodType];
  if (!periodData) return null;

  // Jika ada unitNumber dan periodData adalah object dengan multiple units
  if (unitNumber && typeof periodData === "object" && !("kodeGedung" in periodData)) {
    return (periodData as Record<string, BuildingEquipmentData>)[unitNumber] || null;
  }

  // Jika periodData langsung BuildingEquipmentData
  if ("kodeGedung" in periodData) {
    return periodData as BuildingEquipmentData;
  }

  return null;
}

/**
 * Helper function untuk mendapatkan daftar unit yang tersedia untuk suatu perangkat
 */
export function getAvailableUnits(
  building: string,
  formType: string,
  periodType: "Mingguan" | "Bulanan"
): string[] {
  const buildingData = buildingDataMap[building];
  if (!buildingData) return [];

  const equipmentType = buildingData.equipment[formType as keyof typeof buildingData.equipment] as EquipmentPeriods | undefined;
  if (!equipmentType) return [];

  const periodData = equipmentType[periodType];
  if (!periodData) return [];

  // Jika periodData adalah object dengan multiple units
  if (typeof periodData === "object" && !("kodeGedung" in periodData)) {
    return Object.keys(periodData);
  }

  return [];
}

/**
 * Helper function untuk mendapatkan daftar gedung berdasarkan area
 */
export function getBuildingsByArea(area: AreaType): string[] {
  return Object.entries(buildingDataMap)
    .filter(([, data]) => data.area === area)
    .map(([name]) => name)
    .sort();
}

/**
 * Helper function untuk mendapatkan semua area yang tersedia
 */
export function getAvailableAreas(): AreaType[] {
  return ["Bandung", "Priangan Barat", "Priangan Timur"];
}

/**
 * Helper function untuk mendapatkan data gedung
 */
export function getBuildingData(building: string): BuildingData | null {
  return buildingDataMap[building] || null;
}
