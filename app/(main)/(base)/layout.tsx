'use client';

import AllNotes from "@components/AllNotes";
import Navbar from "@components/Navbar";
import IconArchive from "@components/svgIcons/IconArchive";
import IconDelete from "@components/svgIcons/IconDelete";
import IconRestore from "@components/svgIcons/IconRestore";
import { useToast } from "@context/ToastContext";
import useNoteActions from "@hooks/useNotActions";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type LayoutProps = {
    children: React.ReactNode,
}

export default function Layout({
    children,
}: LayoutProps) {

    const {showToast} = useToast();
    const {deleteNote , setArchivedNotes} = useNoteActions();
    
    const pathName = usePathname();
    const router = useRouter();

    const params = useParams();
    const activeNoteId = params.id; // Access dynamic route parameter like this in next 15.

    const [searchQuery, setSearchQuery] = useState('');

    const handleDeleteNote = async (noteId: string) => {
        if (activeNoteId) {
            await deleteNote(noteId);
            // Give a success toast message here.
            showToast('Note deleted successfully!', 'success');
            router.push('/notes');
        }

        else {
            // Give a toast message here.
            showToast('Please select a note to delete!', 'warning');
        }
    };

    const handleArchiveNote = async (noteId: string) => {
        if (activeNoteId) {
            // Archive the note here.
            setArchivedNotes(noteId, !isArchiveOpen());
            // Give a success toast message here.
            showToast('Note archived successfully!', 'success');
        }
    }
    
    const isArchiveOpen = () => {
        return pathName.includes('/archived');
    }   

    return (
        <div className="w-full max-h-full">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex w-full h-[89.5%] dark:bg-neutral-950">
                <section className="notes-section flex flex-col items-center p-6 xl:p-4 lg:p-2 gap-4 w-3/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
                    <button className="primary-btn w-full lg:text-sm" onClick={() => router.push('/create')}>
                        + Create New Note
                    </button>

                <AllNotes searchQuery={searchQuery} />
                </section>

                {children}
                <section className="archive-section w-1/5 p-4 lg:p-2 flex justify-center">
                    <div className="buttons flex flex-col gap-4 w-full">
                        <button onClick={() => handleArchiveNote(activeNoteId as string)} className="flex lg:flex-col items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
                            {isArchiveOpen() ? <IconRestore props={{ color: 'text-neutral-950 dark:text-neutral-100' }} /> : <IconArchive props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                            <p className="text-neutral-950 dark:text-neutral-100">{isArchiveOpen() ? 'Restore Note' : 'Archive Note'}</p>
                        </button>

                        <button onClick={() => handleDeleteNote(activeNoteId as string)} className="flex lg:flex-col items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
                            <IconDelete props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                            <p className="text-neutral-950 dark:text-neutral-100">Delete Note</p>
                        </button>
                    </div>
                </section>
            </div>
        </div>

    )
}