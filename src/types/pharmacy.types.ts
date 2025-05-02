import { Drug } from "./drug.types";
import { BaseEmployee } from "./employee.types";
import { User } from "./user.types";

export interface Pharmacy {
  id: number;
  name: string;
  owner?: User;
  address?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  isBranch?: boolean;
  shifts?: Shift[];
  expiryThreshold?: number;
  mainBranch?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Shift {
  id: number;
  startTime: string;
  endTime: string;
  name: string;
}

export interface PharmacyDrug {
  drug: Drug;
  pharmacy: Pharmacy;
  addedBy: User;
  stock: number;
  price: number;
  expiryDate: string; // "YYYY-MM-DD"
  createdAt: string;
  updatedAt: string;
}

export type PharmacyEmployee = Omit<BaseEmployee, "id"> & {
  user: User;
  pharmacy: Pharmacy;
};
