export type UUID = string;

export interface Profile {
  id: UUID // referencia a auth.users.id
  username: string
  avatar_url?: string
  role: 'user' | 'admin'
}

export interface RegisterData extends Profile {
  email: string
  password: string
}