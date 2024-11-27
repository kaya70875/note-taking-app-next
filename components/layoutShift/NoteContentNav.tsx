import SvgIcon from '@components/reusables/SvgIcon'
import ArrowLeft from '@components/svgIcons/ArrowLeft'
import IconArchive from '@components/svgIcons/IconArchive'
import IconDelete from '@components/svgIcons/IconDelete'
import { useToast } from '@context/ToastContext'
import useNoteActions from '@hooks/useNotActions'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Back from './Back'

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

    const activeNoteId = params.id;

    const handleDeleteNote = async () => {
        if (activeNoteId) {
            await deleteNote(activeNoteId as string);
            // Give a success toast message here.
            showToast('Note deleted successfully!', 'success');
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

    return (
        <div className='flex w-full items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Back />
            </div>

            <div className='flex gap-4 items-center'>
                {navType === 'note' && (
                    <>
                        <div className="delete" onClick={handleDeleteNote}>
                            <IconDelete props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />
                        </div>
                        <div className="archive" onClick={handleArchiveNote}>
                            <IconArchive props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />
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
