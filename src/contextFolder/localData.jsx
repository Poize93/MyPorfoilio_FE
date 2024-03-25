import { createContext, useContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <DataContext.Provider value={{ storeTokenInLS }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
