import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../@types/user";

export class UserRepositoryImpl {
  db: SupabaseClient;
  constructor(db: SupabaseClient) {
    this.db = db;
  }
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.db
      .from("students")
      .select("*")
      .eq("email", email);
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    return data[0];
  }
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}
