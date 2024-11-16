import useFetch from '@hooks/useFetch';
import React from 'react'

interface AllNotesProps {
    isArchive?: boolean;
    activeNoteId: string;
    setActiveNoteId: React.Dispatch<React.SetStateAction<string>>;
    setShowCreateNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllNotes({ isArchive, activeNoteId, setActiveNoteId, setShowCreateNote }: AllNotesProps) {

    const { data: notes, loading, error } = useFetch() || [];

    const archivedNotes = notes?.filter(note => note.archived);
    const unarchivedNotes = notes?.filter(note => !note.archived);

    return (
        <div className="note-cards flex flex-col gap-8 w-full p-2"> {/* All notes shown here */}
            {isArchive && <p>All your archived notes are stored here. You can restore or delete them anytime.</p>}
            {isArchive ? (archivedNotes?.map(note => (
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
                notes.length > 0 ? unarchivedNotes?.map(note => (
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
