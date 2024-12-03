import SvgIcon from '@components/reusables/SvgIcon'
import ArrowLeft from '@components/svgIcons/ArrowLeft'
import IconArchive from '@components/svgIcons/IconArchive'
import IconDelete from '@components/svgIcons/IconDelete'
import { useToast } from '@context/ToastContext'
import useNoteActions from '@hooks/useNotActions'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Back from './Back'
import Modal from '@components/Modal'
import IconRestore from '@components/svgIcons/IconRestore'

interface NoteContentNavProps {
    navType: 'note' | 'create';
    handleCreate: () => void;
    handleCancel: () => void;
    editMode?: boolean;
    setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteContentNav({ navType = 'note', handleCancel, handleCreate, setEditMode, editMode }: NoteContentNavProps) {
    const router = useRouter();
    const params = useParams();
    const pathName = usePathname();

    const { deleteNote, setArchivedNotes } = useNoteActions();
    const { showToast } = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const activeNoteId = params.id;

    const handleDeleteNote = async () => {
        if (activeNoteId) {
            setLoading(true);
            await deleteNote(activeNoteId as string);
            // Give a success toast message here.
            showToast('Note deleted successfully!', 'success');
            setLoading(false);
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
            showToast(`Note ${isArchiveOpen() ? 'restored' : 'archived'} successfully!`, 'success');
        }
    }

    const isArchiveOpen = () => {
        return pathName.includes('/archived');
    }

    return (
        <div className='flex w-full items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Back />
            </div>

            <div className='flex gap-4 items-center'>
                {navType === 'note' && (
                    <>
                        <div className="delete" onClick={() => setModalOpen(prev => !prev)}>
                            <IconDelete props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />
                        </div>
                        <div className="archive" onClick={handleArchiveNote}>
                            { !isArchiveOpen() ? (<IconArchive props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />) : (<IconRestore props={{color : 'text-neutral-950 dark:text-neutral-50'}} />) }
                        </div>

                        <div className={`modal-backdrop fixed top-0 left-0 w-full h-full bg-neutral-950 bg-opacity-50 z-10 ${modalOpen ? 'block' : 'hidden'}`}>
                            {modalOpen && <Modal onClose={setModalOpen} onDelete={handleDeleteNote} loading={isLoading} />}
                        </div>
                    </>
                )}

                <p onClick={handleCancel}>Cancel</p>
                {navType === 'create' ? (
                    <p className='text-blue-500' onClick={handleCreate}>Create Note</p>
                ) : (
                    <>
                        {editMode && <p className='text-blue-500' onClick={handleCreate}>Save Note</p>}
                        {!editMode && <p className='text-blue-500' onClick={() => setEditMode && setEditMode(true)}>Edit Note</p>}
                    </>
                )}

            </div>
        </div>
    )
}
