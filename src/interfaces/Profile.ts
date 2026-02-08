export type UUID = string;


export interface Profile {
  id: UUID;
  username: string;
  avatar_url?: string; 
  role: 'user' | 'admin';
}


export interface LoginData {
  username: string;
  password: string;
}

