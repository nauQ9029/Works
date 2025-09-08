import React, { useContext, createContext, useState } from "react";
// create context
const NameContext = createContext();
// provider component
const NameProvider = ({ children, name }) => {
  return <NameContext.Provider value={name}>{children}</NameContext.Provider>;
};

// component B using useContext
const Cha = () => {
  return <Con />;
};

// component C using useContext
const Con = () => {
  const name = useContext(NameContext);
  return <h1>{name}</h1>;
};

// parent component using the provider
const DemoWithContext = (props) => {
  return (
    <NameProvider name={props.name}>
      <Cha />
    </NameProvider>
  );
};

export default DemoWithContext;
