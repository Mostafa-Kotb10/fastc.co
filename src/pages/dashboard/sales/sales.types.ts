import { Drug } from "@/types/drug.types";
import { User } from "@/types/user.types";
import { Shift } from "../pharmacy/pharmacy.types";

export type ReportItem = {
  drug: Drug;
  cashier: User;
  quantity: number;
  revenue: number;
  profit: number;
  type: "RECEIPT_ISSUED" | string;
  status: "COMPLETED" | "PENDING" | "CANCELLED" | string;
};

export type ReceiptItem = {
  drugName: string;
  units: number;
  pack: number;
  discount: number;
  amountDue: number;
  status: "SATISFIED" | "RETURNED" | "REPLACED"; // you can expand this union based on your domain
};

export type Receipt = {
  id: number;
  items: ReceiptItem[];
  cashier: User;
  shift: Shift;
  total: number;
  status: "ISSUED" | "CANCELLED" | "COMPLETED"; // update based on your possible statuses
  createdAt: string;
  updatedAt: string;
};

export type ReceiptResponse = Receipt[];
