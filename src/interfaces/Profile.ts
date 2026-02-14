export type UUID = string;

export interface Profile {
  id: UUID // referencia a auth.users.id
  username: string
  avatar_url?: string
  role: 'user' | 'admin'
  /** ISO o cadena legible con la fecha de registro */
  registeredAt?: string
}

export interface RegisterData extends Profile {
  email: string
  password: string
}