import type { User } from "@supabase/supabase-js";
import type { Perfil } from "./Perfil";

export interface SessionUser {
  user: User;
  profile: Perfil;
}