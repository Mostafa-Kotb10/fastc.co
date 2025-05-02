import { Shift } from "./pharmacy.types";

export type BaseEmployee = {
  id: number;
  age: number;
  gender: string;
  salary: number;
  shift: Shift;
};

