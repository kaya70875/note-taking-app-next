'use client';

import { createContext, useContext, useState } from "react";

interface ArchiveContextType {
    isArchiveOpen: boolean;
    setIsArchiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    return(
        <ArchiveContext.Provider value={{isArchiveOpen, setIsArchiveOpen}}>
            {children}
        </ArchiveContext.Provider>
    )
}

export const useArchive = () => {
    const context = useContext(ArchiveContext);
    if(!context) {
        throw new Error("useArchive must be used within an ArchiveProvider");
    }
    return context;
}