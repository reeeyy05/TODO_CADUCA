import { createContext, useState, type ReactNode } from "react";

interface User {
  username: string;
  registeredAt: string;
}

interface UserContextType {
  user: User;
  setUser: (u: User) => void;
}

const defaultUser: User = {
  username: "",
  registeredAt: "",
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
