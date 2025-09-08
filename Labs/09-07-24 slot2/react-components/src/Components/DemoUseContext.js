import React, { useContext, createContext } from 'react';
// Create a Context
const NameContext = createContext();
// Provider component
const NameProvider = ({ children, name }) => {
    return (
      <NameContext.Provider value={name}>
        {children}
      </NameContext.Provider>
    );
  }
// Component B using useContext
const B = () => {
    return (
      <C />  // No need to pass name here
    );
  }  
  // Component C using useContext
const C = () => {
    const name = useContext(NameContext);  // Access name directly from the context
    return <h1>{name}</h1>;
}
// Parent Component using the Provider
const DemoUseContext = (props) => {
    return (
      <NameProvider name={props.name}>
        <B />
      </NameProvider>
    );
  }
export default DemoUseContext;