import { createContext, useContext, useState } from "react";

const MechanicStatusContext = createContext();

export const MechanicStatusProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(false);

    return (
        <MechanicStatusContext.Provider value={{ isOnline, setIsOnline }}>
            {children}
        </MechanicStatusContext.Provider>
    );
};

export const useMechanicStatus = () => useContext(MechanicStatusContext);
