import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/schema";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

export default supabase;
