import { Shift } from "./pharmacy.types";

export type BaseEmployee = {
  id: number;
  age: number;
  gender: string;
  salary: number;
  shift: Shift;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: "OWNER" | "ADMIN" | "EMPLOYEE"; // add more roles as needed
  fbUser: boolean;
  managedUser: boolean;
  createdAt: string;
  updatedAt: string;
};

type Pharmacy = {
  id: number;
  name: string;
  owner: User;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isBranch: boolean;
  shifts: Shift[];
  expiryThreshold: number;
  mainBranch: number;
  createdAt: string;
  updatedAt: string;
};

export type Employee = {
  user: User;
  age: number;
  gender: "male" | "female";
  salary: number;
  shift: Shift;
  pharmacy: Pharmacy;
  createdAt: string;
  updatedAt: string;
};
