export type UUID = string;

export interface Profile {
  id: UUID;
  username: string;
  avatar_url?: string;
  role: 'user' | 'admin';
}

export interface RegisterData {
  id: UUID;
  username: string;
  password: string;
  email: string;
  avatar_url?: string;
  role: 'user' | 'admin';
}
