import useNoteActions from '@hooks/useNotActions'
import React, { useState } from 'react'
import { useToast } from '@context/ToastContext';
import { useSession } from 'next-auth/react';
import TagSvg from './svgIcons/TagSvg';
import ClockSvg from './svgIcons/ClockSvg';
import { useRouter } from 'next/navigation';
import NoteContentNav from './layoutShift/NoteContentNav';
import useScreenSize from '@hooks/useScreenSize';
import dynamic from '@node_modules/next/dynamic';
import { Note } from '../types/notes';

const DynamicTextEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

export default function CreateNote() {

    const router = useRouter();

    const { createNote } = useNoteActions();
    const { showToast } = useToast();

    const { isTablet } = useScreenSize();

    const { data: session } = useSession();

    const [formData, setFormData] = useState<Partial<Note>>({
        title: 'Enter a title...',
        content: '',
        tags: [],
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        if (formData.title && formData.content && formData.tags) {
            setLoading(true);
            await createNote(formData, session?.user.id!);
            setLoading(false);
            setFormData({
                title: '',
                content: '',
                tags: [],
            });
            // Give a success toast message here.
            showToast('Note created successfully!', 'success');
        }

        else {
            // Give a toast message here.
            showToast('Please fill in all the fields!', 'error');
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            content: '',
            tags: [],
        });
        router.prefetch('/notes');
    };
    return (
        <div className="content-section w-full flex flex-1 flex-col gap-4 p-4 xs:p-1 border-r lg:border-none border-neutral-300 dark:border-e-neutral-700">
            {isTablet && <NoteContentNav handleCancel={handleCancel} handleCreate={handleCreate} navType='create' />}
            {isTablet && <div className="line"></div>}
            <header className="flex flex-col h-[85%] justify-start gap-4">
                <div className="content-top flex flex-col gap-6">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="text-lg font-bold rounded-lg p-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900"
                    />
                    <div className="flex flex-col gap-4">
                        <div className="memo-info flex items-center gap-8 w-full">
                            <div className="tags-section flex gap-2">
                                <TagSvg props={{ color: 'text-neutral-950 dark:text-neutral-300' }} />
                                <p className='text-neutral-950 dark:text-neutral-300'>Tags</p>
                            </div>
                            <div className="tags-section flex gap-4">
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags && formData.tags.join(', ')}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            tags: e.target.value.split(',').map((tag) => tag.trim()) as never[],
                                        }))}
                                    className="rounded-lg p-2 border w-full border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900"
                                    placeholder='Enter tags'
                                />
                            </div>
                        </div>

                        <div className="memo-info flex items-center gap-8">
                            <div className="tags-section flex gap-2">
                                <ClockSvg props={{ color: 'text-neutral-950 dark:text-neutral-300' }} />
                                <p className='text-neutral-950 dark:text-neutral-300'>Last Edited</p>
                            </div>
                            <div className="tags-section flex gap-4">
                                <p className='text-neutral-950 dark:text-neutral-300 text-sm opacity-70'>Not Saved Yet...</p>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>

                    <DynamicTextEditor type='create' formData={formData} setFormData={setFormData} />
                </div>

                <div className="content-buttons flex items-center gap-4 border-t lg: border-none border-neutral-300 dark:border-neutral-700 w-full">
                    {!isTablet && (
                        <>
                            <button
                                onClick={handleCreate}
                                className="primary-btn w-1/4 md:w-1/6"
                                disabled={loading}
                            >
                                {loading ? 'Creating' : 'Create Note'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center justify-center border border-neutral-500 dark:border-neutral-700 p-3 dark:text-neutral-200 rounded-lg w-1/6 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-all duration-150"
                            >
                                Cancel
                            </button>
                        </>
                    )}

                </div>
            </header>
        </div>
    )
}
