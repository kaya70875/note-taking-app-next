import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import React, { SetStateAction } from 'react';
import { Note } from '../types/notes';

interface ReactQuillProps {
    editMode?: boolean;
    formData: Partial<Note>;
    setFormData: React.Dispatch<SetStateAction<Partial<Note>>>;
    type: 'create' | 'edit';
}

export default function QuillEditor({ editMode, formData, setFormData, type }: ReactQuillProps) {
    const editorWrapperClasses = `
        w-full flex flex-col 
        
        /* Toolbar Styling */
        [&_.ql-toolbar]:border-neutral-200 dark:[&_.ql-toolbar]:border-neutral-800 
        [&_.ql-toolbar]:bg-neutral-50 dark:[&_.ql-toolbar]:bg-neutral-900
        [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:font-sans [&_.ql-toolbar]:transition-colors
        
        /* Container Styling */
        [&_.ql-container]:border-neutral-200 dark:[&_.ql-container]:border-neutral-800
        [&_.ql-container]:rounded-b-xl [&_.ql-container]:bg-white dark:[&_.ql-container]:bg-neutral-950
        [&_.ql-container]:font-sans [&_.ql-container]:transition-colors
        
        /* Editor Area Styling */
        [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-base
        [&_.ql-editor]:text-neutral-900 dark:[&_.ql-editor]:text-neutral-100
        
        /* Placeholder Text Styling */
        [&_.ql-editor.ql-blank::before]:text-neutral-400 dark:[&_.ql-editor.ql-blank::before]:text-neutral-600
        [&_.ql-editor.ql-blank::before]:font-style-normal
        
        /* Toolbar Icons - Default & Dark Mode Fixes */
        [&_.ql-stroke]:stroke-neutral-600 dark:[&_.ql-stroke]:stroke-neutral-300 
        [&_.ql-fill]:fill-neutral-600 dark:[&_.ql-fill]:fill-neutral-300
        [&_.ql-picker]:text-neutral-600 dark:[&_.ql-picker]:text-neutral-300
        dark:[&_.ql-picker-options]:bg-neutral-900 dark:[&_.ql-picker-options]:border-neutral-800
        
        /* Toolbar Icons - Hover States */
        [&_button:hover_.ql-stroke]:stroke-blue-500 dark:[&_button:hover_.ql-stroke]:stroke-blue-400
        [&_button:hover_.ql-fill]:fill-blue-500 dark:[&_button:hover_.ql-fill]:fill-blue-400
        [&_.ql-picker-label:hover]:text-blue-500 dark:[&_.ql-picker-label:hover]:text-blue-400
        [&_.ql-picker-label:hover_.ql-stroke]:stroke-blue-500 dark:[&_.ql-picker-label:hover_.ql-stroke]:stroke-blue-400
        
        /* Toolbar Icons - Active States (Bold, Italic, etc.) forced with !important */
        [&_.ql-active_.ql-stroke]:!stroke-blue-600 dark:[&_.ql-active_.ql-stroke]:!stroke-blue-400
        [&_.ql-active_.ql-fill]:!fill-blue-600 dark:[&_.ql-active_.ql-fill]:!fill-blue-400
        [&_.ql-active]:!text-blue-600 dark:[&_.ql-active]:!text-blue-400
        [&_.ql-picker-item.ql-selected]:!text-blue-600 dark:[&_.ql-picker-item.ql-selected]:!text-blue-400
    `;

    const readOnlyClasses = `
        p-2 w-full text-neutral-900 dark:text-neutral-100
        [&>p]:mb-4 
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3
        [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 
        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
        [&>a]:text-blue-500 hover:[&>a]:text-blue-600 [&>a]:underline
    `;

    const renderEditor = () => (
        <div className={editorWrapperClasses}>
            <ReactQuill
                value={formData.content}
                id='content'
                onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                theme='snow'
                placeholder="Start typing your note..."
            />
        </div>
    );

    return (
        <div className="content-itself w-full">
            {type === 'edit' && !editMode ? (
                <div
                    className={readOnlyClasses}
                    dangerouslySetInnerHTML={{ __html: formData.content || '' }}
                />
            ) : (
                renderEditor()
            )}
        </div>
    );
}