'use client';

import { createContext, useContext, useState } from "react";

interface ActiveSidebarTagContextProps {
    activeSidebarTag: string;
    setActiveSidebarTag: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveSidebarTagContext = createContext<ActiveSidebarTagContextProps | undefined>(undefined);

export const ActiveSidebarTagContextProvider = ({children} : {children: React.ReactNode}) => {
    const [activeSidebarTag, setActiveSidebarTag] = useState<string>('');

    return (
        <ActiveSidebarTagContext.Provider value={{activeSidebarTag , setActiveSidebarTag}}>
            {children}
        </ActiveSidebarTagContext.Provider>
    )
}

export const useActiveSidebarTag = () => {
    const context = useContext(ActiveSidebarTagContext);
    if(!context) {
        throw new Error('useFilteredNotes must be used within a FilteredContextProvider');
    }
    return context;
}