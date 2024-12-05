import React, { createContext, useState , useContext} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: null,
    id: null,
    email: null,
    name: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir el contexto
export const useUser = () => useContext(UserContext);
