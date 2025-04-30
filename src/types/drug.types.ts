import { User } from "./user.types";

export type Drug = {
    id: number;
    name: string;
    form: string;
    createdBy: User
    units: number;
    fullPrice: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  
