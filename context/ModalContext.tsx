'use client';

import { createContext, useContext, useState } from "react";

interface ModalContextProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalContextProvider');
    }

    return context;
}

export default useModal;