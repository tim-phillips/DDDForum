import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "../../modules/users/DTOs/userDTOs";

interface GlobalState {
  user?: UserDTO;
  setUser: (user: UserDTO) => void;
}

const initialState = {
  setUser: () => {
    throw new Error("setUser has not yet been initialized");
  },
};

export const GlobalStateContext = createContext<GlobalState>(initialState);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO>();

  return (
    <GlobalStateContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
