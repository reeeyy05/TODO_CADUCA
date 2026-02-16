export interface Perfil {
  id_perfil: number;
  user_id: string;
  nombre_completo: string | null;
  email: string;
  fecha_registro: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre_completo?: string;
}