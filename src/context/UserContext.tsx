import { createContext, useState, type ReactNode } from "react";

interface User {
  username: string;
  email: string;
  registeredAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
