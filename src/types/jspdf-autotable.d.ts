/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  export interface CellHookData {
    cell: any;
    row: any;
    column: any;
    section: 'head' | 'body' | 'foot';
  }

  export interface PageHookData {
    pageNumber: number;
    pageCount: number;
    settings: any;
    table: any;
    doc: jsPDF;
  }

  export interface UserOptions {
    head?: (string | number)[][];
    body?: (string | number)[][];
    foot?: (string | number)[][];
    theme?: 'striped' | 'grid' | 'plain';
    startY?: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    styles?: CellStyles;
    headStyles?: CellStyles;
    bodyStyles?: CellStyles;
    footStyles?: CellStyles;
    alternateRowStyles?: CellStyles;
    columnStyles?: { [key: string]: CellStyles };
    didDrawPage?: (data: PageHookData) => void;
    didParseCell?: (data: CellHookData) => void;
    willDrawCell?: (data: CellHookData) => void;
    didDrawCell?: (data: CellHookData) => void;
  }

  export interface CellStyles {
    fillColor?: number | string | [number, number, number];
    textColor?: number | string | [number, number, number];
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    fontSize?: number;
    cellPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    lineColor?: number | string | [number, number, number];
    lineWidth?: number;
    minCellHeight?: number;
    cellWidth?: 'auto' | 'wrap' | number;
    overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
  }

  export default function autoTable(doc: jsPDF, options: UserOptions): jsPDF;
}
