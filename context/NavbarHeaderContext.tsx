'use client';

import { createContext, SetStateAction, useContext, useState } from "react";

interface NavbarHeaderContextProps {
    navbarHeader: 'All Notes' | 'Archived Notes' | 'Notes Tagged:' | 'Settings' | 'Showing Results For:';
    setNavbarHeader: React.Dispatch<SetStateAction<'All Notes' | 'Archived Notes' | 'Notes Tagged:' | 'Settings' | 'Showing Results For:'>>;
}

const NavbarHeaderContext = createContext<NavbarHeaderContextProps | undefined>(undefined);

export const NavbarHeaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [navbarHeader, setNavbarHeader] = useState<'All Notes' | 'Archived Notes' | 'Notes Tagged:' | 'Settings' | 'Showing Results For:'>('All Notes');

    return (
        <NavbarHeaderContext.Provider value={{ navbarHeader, setNavbarHeader }}>
            {children}
        </NavbarHeaderContext.Provider>
    );
};

export const useNavHeader = (): NavbarHeaderContextProps => {
    const context = useContext(NavbarHeaderContext);
    if (!context) {
        throw new Error('useNavHeader must be used within a NavbarHeaderProvider');
    }
    return context;
};
