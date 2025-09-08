import React, { createContext, useState, useContext } from 'react';

const BackgroundColorContext = createContext();

// Create a provider component
export const BackgroundColorProvider = ({ children }) => {      // Every its children can use
  const [color, setColor] = useState('purple');                 // default = purple

  return (
    <BackgroundColorContext.Provider value={{ color, setColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => useContext(BackgroundColorContext);
