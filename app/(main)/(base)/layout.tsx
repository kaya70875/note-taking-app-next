'use client';

import AllNotes from "@components/AllNotes";
import BottomNavbar from "@components/layoutShift/BottomNavbar";
import TabletLayout from "@components/layoutShift/TabletLayout";
import Modal from "@components/Modal";
import Navbar from "@components/Navbar";
import IconArchive from "@components/svgIcons/IconArchive";
import IconDelete from "@components/svgIcons/IconDelete";
import IconRestore from "@components/svgIcons/IconRestore";
import LogoSvg from "@components/svgIcons/LogoSvg";
import { useToast } from "@context/ToastContext";
import useNoteActions from "@hooks/useNotActions";
import useScreenSize from "@hooks/useScreenSize";
import { CircularProgress } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type LayoutProps = {
    children: React.ReactNode,
}

export default function Layout({
    children,
}: LayoutProps) {

    const { showToast } = useToast();
    const { deleteNote, setArchivedNotes } = useNoteActions();
    const { isTablet, isLoading } = useScreenSize();

    const pathName = usePathname();
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    const params = useParams();
    const activeNoteId = params.id; // Access dynamic route parameter like this in next 15.

    const [searchQuery, setSearchQuery] = useState('');
    const [loading , setLoading] = useState(false);

    const handleDeleteNote = async () => {
        if (activeNoteId) {
            setLoading(true);
            await deleteNote(activeNoteId as string);
            // Give a success toast message here.
            showToast('Note deleted successfully!', 'success');
            setLoading(false);
            setModalOpen(false);
            router.push('/notes');
        }

        else {
            // Give a toast message here.
            showToast('Please select a note to delete!', 'warning');
        }
    };

    const handleArchiveNote = async () => {
        if (activeNoteId) {
            // Archive the note here.
            setArchivedNotes(activeNoteId as string, !isArchiveOpen());
            // Give a success toast message here.
            showToast('Note archived successfully!', 'success');
        }
    }

    const isArchiveOpen = () => {
        return pathName.includes('/archived');
    }

    if (isLoading) {
        return <div className="flex items-center justify-center w-full h-full"><CircularProgress /></div>
    }

    return (
        <div className="w-full h-full ">
            {isTablet ? (
                <div className="flex flex-col justify-between h-full bg-neutral-200 dark:bg-neutral-900">
                    <div className="logo px-4 xs:px-2 py-6 xs:py-3">
                        <LogoSvg props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />
                    </div>
                    <TabletLayout>
                        {children}
                    </TabletLayout>

                    <div className="bottom-navbar bg-neutral-100 dark:bg-neutral-950">
                        <BottomNavbar />
                    </div>
                </div>
            ) : (
                <>
                    <Navbar setSearchQuery={setSearchQuery} />
                    <div className="flex w-full dark:bg-neutral-950">
                        <section className="notes-section flex flex-col p-6 xl:p-4 lg:p-2 gap-4 w-3/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
                            <button className="primary-btn w-full lg:text-sm" onClick={() => router.push('/create')}>
                                + Create New Note
                            </button>

                            <AllNotes searchQuery={searchQuery} />
                        </section>

                        {children}
                        <section className="archive-section w-1/5 p-4 lg:p-2 flex justify-center">
                            <div className="buttons flex flex-col gap-4 w-full">
                                <button onClick={() => handleArchiveNote} className="flex lg:flex-col items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
                                    {isArchiveOpen() ? <IconRestore props={{ color: 'text-neutral-950 dark:text-neutral-100' }} /> : <IconArchive props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                                    <p className="text-neutral-950 dark:text-neutral-100">{isArchiveOpen() ? 'Restore Note' : 'Archive Note'}</p>
                                </button>

                                <button onClick={() => setModalOpen(prev => !prev)} className="flex lg:flex-col items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
                                    <IconDelete props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                                    <p className="text-neutral-950 dark:text-neutral-100">Delete Note</p>
                                </button>

                                <div className={`modal-backdrop fixed top-0 left-0 w-full h-full bg-neutral-950 bg-opacity-50 z-10 ${modalOpen ? 'block' : 'hidden'}`}>
                                    {modalOpen && <Modal onClose={setModalOpen} onDelete={handleDeleteNote} loading={loading}/>}
                                </div>

                            </div>
                        </section>
                    </div>
                </>
            )}

        </div>

    )
}