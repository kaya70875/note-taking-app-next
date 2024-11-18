import { Note } from "../types/notes";
import { createContext, useContext, useState } from "react";

interface FilteredNotesContextProps {
    filteredNotes: Note[];
    setFilteredNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const FilteredNotesContext = createContext<FilteredNotesContextProps | undefined>(undefined);

export const FilteredContextProvider = ({children} : {children: React.ReactNode}) => {
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    return (
        <FilteredNotesContext.Provider value={{filteredNotes, setFilteredNotes}}>
            {children}
        </FilteredNotesContext.Provider>
    )
}

export const useFilteredNotes = () => {
    const context = useContext(FilteredNotesContext);
    if(!context) {
        throw new Error('useFilteredNotes must be used within a FilteredContextProvider');
    }
    return context;
}