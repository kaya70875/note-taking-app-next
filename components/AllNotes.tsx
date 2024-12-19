'use client'

import useFetch from '@hooks/useFetch';
import { NoteResponse } from '../types/notes';
import React, { useMemo } from 'react'
import convertDate from '@utils/helpers';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LoadingState } from './reusables/LoadingState';

interface AllNotesProps {
    searchQuery: string;
}

export default function AllNotes({ searchQuery }: AllNotesProps) {

    const { data, loading, error } = useFetch<NoteResponse>('/api/getData');
    const notes = data?.notes ?? [];

    const pathName = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const activeSidebarTag = searchParams.get('tag'); // Get active tag from query.
    const isArchiveOpen = pathName.includes('/archived'); // Check if path is includes archive or not.
    const activeNoteId = params.id; // Get active noteId from url.

    const filteredNotes = useMemo(() => {
        if (searchQuery) {
            return notes?.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())
                || note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLocaleLowerCase())));
        }

        else if (isArchiveOpen) {
            return notes?.filter(note => note.archived);
        }

        else if (activeSidebarTag) {
            return notes?.filter(note => note.tags.some(tag => tag.toLocaleLowerCase().includes(activeSidebarTag.toLocaleLowerCase())));
        }

        else {
            return notes?.filter(note => !note.archived);
        }
    }, [searchQuery, isArchiveOpen, data, activeSidebarTag]);

    return (
        <div className='flex flex-col justify-between items-end overflow-auto'>
            <div className="note-cards flex flex-col gap-3 lg:gap-4 w-full p-1"> {/* All notes shown here */}
                {loading && (<LoadingState />)}
                {isArchiveOpen && <p className='dark:text-neutral-50 lg:text-xs'>All your archived notes are stored here. You can restore or delete them anytime.</p>}
                {isArchiveOpen ? (filteredNotes?.map(note => (
                    <Link href={`/archived/${note._id}`} className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 dark:bg-neutral-700 rounded-lg' : ''}`} key={note._id} >
                        <header className="flex flex-col gap-2" >
                            <h2 className="font-bold text-lg lg:text-base">{note.title}</h2>
                            <div className="tag-wrapper flex flex-wrap lg:flex-nowrap gap-2 ">
                                {note.tags.map(tag => (
                                    <p key={tag} className="bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-50 p-1 rounded-lg text-sm">{tag}</p>
                                ))}
                            </div>
                        </header>
                        <div className='flex flex-col gap-2'>
                            <p className="text-neutral-600 dark:text-neutral-500 mt-2 lg:text-sm">
                                {note.createdAt && convertDate(note.createdAt)}
                            </p>
                            <div className="line dark:bg-neutral-700"></div>
                        </div>
                    </Link>
                ))) : (notes?.length > 0 ? filteredNotes?.map(note => (
                    <Link href={`/notes/${note._id}${activeSidebarTag ? `?tag=${activeSidebarTag}` : ''}`} className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 dark:bg-neutral-700 rounded-lg' : ''}`} key={note._id} >
                        <header className="flex flex-col gap-2" >
                            <h2 className="font-bold text-lg lg:text-base">{note.title}</h2>
                            <div className="tag-wrapper flex flex-wrap lg:flex-nowrap gap-2">
                                {note.tags.slice(0, 2).map(tag => (
                                    <p key={tag} className="bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-50 p-1 rounded-lg text-sm">{tag}</p>
                                ))}
                            </div>
                        </header>
                        <div className='flex flex-col gap-2'>
                            <p className="text-neutral-600 dark:text-neutral-500 mt-2 lg:text-sm">
                                {note.createdAt && convertDate(note.createdAt)}
                            </p>
                            <div className="line dark:bg-neutral-700"></div>
                        </div>

                    </Link>
                )) : (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        {!loading && <p className="text-neutral-600">No notes found.</p>}
                    </div>
                )
                )}
            </div>
            <Link href={'/create'} className='create-btn-ellipse hidden lg:flex items-center justify-center p-4 h-14 w-14 text-neutral-50 bg-blue-500 rounded-full absolute bottom-20 right-4' >+</Link>
        </div>


    )
}
