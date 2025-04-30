import { Shift } from "./pharmacy.types";

export type Employee = {
  id: number;
  age: number;
  gender: string;
  salary: number;
  shift: Shift;
  role: string; 
};
