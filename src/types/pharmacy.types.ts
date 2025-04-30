import { Drug } from "./drug.types";
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
  startTime: TimeStructure;
  endTime: TimeStructure;
  name: string;
}

export interface TimeStructure {
  hour: number;
  minute?: number;
  second?: number;
  nano?: number;
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
