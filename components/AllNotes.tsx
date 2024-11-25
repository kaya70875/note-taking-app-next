'use client'

import useFetch from '@hooks/useFetch';
import { NoteResponse, Note } from '../types/notes';
import React, { useEffect, useState } from 'react'
import { useActiveSidebarTag } from '@context/ActiveSidebarTagContext';
import convertDate from '@utils/helpers';
import { CircularProgress } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface AllNotesProps {
    searchQuery: string;
}

export default function AllNotes({ searchQuery }: AllNotesProps) {

    const { data, loading, error } = useFetch<NoteResponse>('/api/getData');
    const notes = data?.notes ?? [];

    const pathName = usePathname();
    const isArchiveOpen = pathName.includes('/archived');

    const params = useParams();
    const activeNoteId = params.id;

    const router = useRouter();
    
    const {activeSidebarTag} = useActiveSidebarTag();

    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        if (searchQuery) {
            const filteredNotes = notes?.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())
                || note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLocaleLowerCase())));
            setFilteredNotes(filteredNotes ?? []);
        }

        else if (isArchiveOpen) {
            const archivedNotes = notes?.filter(note => note.archived);
            setFilteredNotes(archivedNotes ?? []);
        }

        else if(activeSidebarTag) {
            const filteredByTag = notes?.filter(note => note.tags.some(tag => tag.toLocaleLowerCase().includes(activeSidebarTag.toLocaleLowerCase())));
            setFilteredNotes(filteredByTag ?? []);
        }

        else {
            const unarchivedNotes = notes?.filter(note => !note.archived);
            setFilteredNotes(unarchivedNotes ?? []);
        }
    }, [searchQuery, isArchiveOpen, notes , activeSidebarTag]);

    return (
        <div className="note-cards flex flex-col gap-8 lg:gap-2 w-full"> {/* All notes shown here */}
            {loading && (<div className='flex items-center justify-center'><CircularProgress /></div>)}
            {isArchiveOpen && <p className='dark:text-neutral-50 lg:text-center lg:text-xs'>All your archived notes are stored here. You can restore or delete them anytime.</p>}
            {isArchiveOpen ? (filteredNotes?.map(note => (
                <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 dark:bg-neutral-700 rounded-lg' : ''}`} key={note._id} onClick={() => {
                    router.push(`/archived/${note._id}`);
                }}>
                    <header className="flex flex-col gap-2" >
                        <h2 className="font-bold text-lg lg:text-base max-w-48">{note.title}</h2>
                        <div className="tag-wrapper flex flex-wrap lg:flex-nowrap gap-2 ">
                            {note.tags.map(tag => (
                                <p key={tag} className="bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-50 p-1 rounded-lg text-sm">{tag}</p>
                            ))}
                        </div>
                    </header>
                    <p className="text-neutral-600 dark:text-neutral-500 mt-2 lg:text-sm">{note.createdAt && convertDate(note.createdAt)}</p>
                </div>
            ))) : (notes?.length > 0 ? filteredNotes?.map(note => (
                    <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 dark:bg-neutral-700 rounded-lg' : ''}`} key={note._id} onClick={() => {
                        router.push(`/notes/${note._id}`);
                    }}>
                        <header className="flex flex-col gap-2" >
                            <h2 className="font-bold text-lg lg:text-base max-w-48">{note.title}</h2>
                            <div className="tag-wrapper flex flex-wrap lg:flex-nowrap gap-2">
                                {note.tags.slice(0 , 2).map(tag => (
                                    <p key={tag} className="bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-50 p-1 rounded-lg text-sm">{tag}</p>
                                ))}
                            </div>
                        </header>
                        <p className="text-neutral-600 dark:text-neutral-500 mt-2 lg:text-sm">
                            {note.createdAt && convertDate(note.createdAt)}
                        </p>
                    </div>
                )) : (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        {!loading && <p className="text-neutral-600">No notes found.</p>}
                    </div>
                )
            )}
        </div>
    )
}
