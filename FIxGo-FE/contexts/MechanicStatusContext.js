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

export const useMechanicStatus = () => {
    const context = useContext(MechanicStatusContext);
    if (context === undefined) {
        // Return default values if context is not available
        console.warn('useMechanicStatus must be used within a MechanicStatusProvider. Using default values.');
        return { isOnline: false, setIsOnline: () => {} };
    }
    return context;
};
