import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import React, { SetStateAction } from 'react'
import { Note } from '../types/notes';

interface ReactQuillProps {
    editMode?: boolean;
    formData: Partial<Note>;
    setFormData: React.Dispatch<SetStateAction<Partial<Note>>>;
    type: 'create' | 'edit';
}

export default function QuillEditor({ editMode, formData, setFormData, type }: ReactQuillProps) {
    return (
        <div className="content-itself">
            {type === 'edit' ? (
                editMode ? (
                    <ReactQuill value={formData.content} id='content' onChange={(content) => setFormData((prev) => ({ ...prev, content }))} theme='snow' className='w-full h-40 rounded-lg p-2' />
                ) : (
                    <p className="max-w-screen-sm dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
                )
            ) : (
                <ReactQuill value={formData.content} id='content' onChange={(content) => setFormData((prev) => ({ ...prev, content }))} theme='snow' className='w-full h-40 rounded-lg p-2' />
            )}

        </div>
    )
}