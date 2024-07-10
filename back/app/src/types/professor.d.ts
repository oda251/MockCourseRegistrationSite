import { Class } from "./class";
import { Post } from "./post";

export type Professor = {
  id: number;
  name: string;
  post: Post[];
};

export type ProfessorData = {
  professor: Professor;
  classes: Class[];
};
