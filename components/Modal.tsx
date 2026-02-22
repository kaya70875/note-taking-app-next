import React from 'react'
import IconDelete from './svgIcons/IconDelete'

interface ModalProps {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: () => void;
    loading: boolean;
}

export default function Modal({ onClose, onDelete, loading }: ModalProps) {

    return (
        <div className='flex flex-col w-1/2 md:w-3/4 xs:w-[90%] max-w-xl gap-4 p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-50 dark:bg-neutral-700 border'>
            <header className="modal-header flex gap-4">
                <div className="trash bg-neutral-100 flex items-center justify-center dark:bg-neutral-600 p-2 h-10 rounded-lg">
                    <IconDelete props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Delete Note</h2>
                    <p className='max-w-96 xxs:text-sm'>Are you sure you want to delete this note. This action cannot be undone.</p>
                </div>
            </header>

            <div className="line dark:bg-neutral-500"></div>

            <div className='buttons w-full flex justify-end gap-4'>
                <button onClick={() => onClose(false)} className='flex items-center justify-center p-3 rounded-lg bg-neutral-200 dark:bg-neutral-600 hover:bg-opacity-80 transition-all duration-150'>
                    <p>Cancel</p>
                </button>

                <button onClick={onDelete} className='flex items-center justify-center p-3 rounded-lg bg-red-500 active:opacity-80 disabled:opacity-50 hover:bg-opacity-80 transition-all duration-150' disabled={loading}>
                    <p className='text-neutral-200'>{loading ? 'Deleting...' : 'Delete Note'}</p>
                </button>
            </div>
        </div>
    )
}
