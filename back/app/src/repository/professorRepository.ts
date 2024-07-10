import { SupabaseClient } from "@supabase/supabase-js";
import { Class } from "../types/class";
import { Professor } from "../types/professor";

export interface ProfessorRepository {
  fetchProfessorClasses(professorId: number): Promise<Class[] | null>;
  fetchProfessorInfo(professorId: number): Promise<Professor | null>;
}

export class ProfessorRepositoryImpl {
  db: SupabaseClient;
  constructor(db: SupabaseClient) {
    this.db = db;
  }
  async fetchProfessorClasses(professorId: number): Promise<Class[] | null> {
    const { data, error } = await this.db
      .from("professor_class")
      .select(
        `
				professor_id,
				classes (
					*,
					professors (id, name,
						posts(name)
					)
				)
				`,
      )
      .eq("professor_id", professorId);
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    const classes: Class[] = [];
    data.forEach((d) => {
      classes.push(d.classes[0]);
    });
    return classes;
  }
  async fetchProfessorInfo(professorId: number): Promise<Professor | null> {
    const { data, error } = await this.db
      .from("professors")
      .select("*")
      .eq("id", professorId);
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    const p: Professor = {
      ...data[0],
    };
    return p;
  }
}
