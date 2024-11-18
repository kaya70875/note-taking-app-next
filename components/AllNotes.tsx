import useFetch from '@hooks/useFetch';
import { NoteResponse , Note } from '../types/notes';
import React, { useEffect, useState } from 'react'
import { useArchive } from '@context/ArchiveContext';

interface AllNotesProps {
    activeNoteId: string;
    searchQuery: string;
    setActiveNoteId: React.Dispatch<React.SetStateAction<string>>;
    setShowCreateNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllNotes({activeNoteId, setActiveNoteId, setShowCreateNote , searchQuery}: AllNotesProps) {

    const { data , loading, error } = useFetch<NoteResponse>('api/getData');
    const { isArchiveOpen , setIsArchiveOpen} = useArchive();

    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const notes = data?.notes ?? [];
    
    useEffect(() => {
        if(searchQuery) {
            const filteredNotes = notes?.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            || note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLocaleLowerCase())));
            setFilteredNotes(filteredNotes ?? []);
            setIsArchiveOpen(false);
        }

        else if(isArchiveOpen) {
            const archivedNotes = notes?.filter(note => note.archived);
            setFilteredNotes(archivedNotes ?? []);
        }

        else {
            const unarchivedNotes = notes?.filter(note => !note.archived);
            setFilteredNotes(unarchivedNotes ?? []);
        }
    } , [searchQuery , isArchiveOpen , notes]);

    return (
        <div className="note-cards flex flex-col gap-8 w-full p-2"> {/* All notes shown here */}
            {isArchiveOpen && <p>All your archived notes are stored here. You can restore or delete them anytime.</p>}
            {isArchiveOpen ? (filteredNotes?.map(note => (
                <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 rounded-lg' : ''}`} key={note._id} onClick={() => {
                    setActiveNoteId(note._id)
                    setShowCreateNote(false);
                }}>
                    <header className="flex flex-col gap-2" >
                        <h2 className="font-bold text-lg max-w-48">{note.title}</h2>
                        <div className="tag-wrapper flex gap-2 p-1">
                            {note.tags.map(tag => (
                                <p key={tag} className="bg-neutral-200 p-1 rounded-lg">{tag}</p>
                            ))}
                        </div>
                    </header>
                    <p className="text-neutral-500 text-sm max-w-48">{note.content}</p>
                </div>
            ))) : (
                notes && notes?.length > 0 ? filteredNotes?.map(note => (
                    <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 rounded-lg' : ''}`} key={note._id} onClick={() => {
                        setActiveNoteId(note._id)
                        setShowCreateNote(false);
                    }}>
                        <header className="flex flex-col gap-2" >
                            <h2 className="font-bold text-lg max-w-48">{note.title}</h2>
                            <div className="tag-wrapper flex gap-2 p-1">
                                {note.tags.map(tag => (
                                    <p key={tag} className="bg-neutral-200 p-1 rounded-lg">{tag}</p>
                                ))}
                            </div>
                        </header>
                        <p className="text-neutral-600">
                            {note.createdAt.toLocaleString()}
                        </p>
                    </div>
                )) : (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-neutral-600">No notes found.</p>
                    </div>
                )
            )}
        </div>
    )
}
