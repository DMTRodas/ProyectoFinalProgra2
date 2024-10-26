import React, { createContext, useState, useContext } from 'react';

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const cerrarSesion = () => {
    setCliente(null);  
    localStorage.removeItem('clienteId');  
  };
  return (
    <ClienteContext.Provider value={{ cliente, setCliente, cerrarSesion }}>
      {children}
    </ClienteContext.Provider>);
};
export const useCliente = () => {
  return useContext(ClienteContext);
};
