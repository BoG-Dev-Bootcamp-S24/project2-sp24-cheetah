import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [contextName, setUserName] = useState(null);
  const [contextId, setUserId] = useState(null);
  const [contextAdmin, setAdmin] = useState(null);

  const contextLogin = (name, id, admin) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
    localStorage.setItem('admin', admin);
    setUserName(name);
    setUserId(id);
    setAdmin(admin);
  }

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    setUserName(null);
    setUserId(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ contextLogin, logout, contextName, contextId, contextAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;