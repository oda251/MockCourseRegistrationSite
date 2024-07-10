import { Professor } from "./professor";

export type Class = {
  id: number;
  professors: Professor[];
  name: string;
  day: number;
  period: number;
  semester: number;
  credits: number;
  summery: string | null;
};
