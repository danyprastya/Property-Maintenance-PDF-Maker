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

export interface BuildingData {
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
