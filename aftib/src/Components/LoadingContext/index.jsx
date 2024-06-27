import React, { createContext, useState, useContext } from 'react';
import { Spin } from 'antd';
const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  return (
    <LoadingContext.Provider value={{ setLoading, setLoadingText }}>
        <Spin fullscreen tip={loadingText} spinning={loading}/>
        {children}
    </LoadingContext.Provider>
  );
};
