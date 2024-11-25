import useNoteActions from '@hooks/useNotActions'
import React, { useState } from 'react'
import { useToast } from '@context/ToastContext';
import { useSession } from 'next-auth/react';
import TagSvg from './svgIcons/TagSvg';
import ClockSvg from './svgIcons/ClockSvg';
import { useRouter } from 'next/navigation';


export default function CreateNote() {

    const router = useRouter();

    const { createNote } = useNoteActions();
    const { showToast } = useToast();
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        title: 'Enter a title...',
        content: '',
        tags: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        if (formData.title && formData.content && formData.tags) {
            await createNote(formData, session?.user.id!);
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
        router.push('/notes');
    };
    return (
        <div className="content-section w-full flex flex-1 flex-col gap-4 p-4 border-r border-neutral-300 dark:border-e-neutral-700">
            <header className="flex flex-col h-full justify-between">
                <div className="content-top flex flex-col gap-6">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="text-lg font-bold rounded-lg p-2 border border-neutral-300 dark:border-neutral-700"
                    />
                    <div className="flex flex-col gap-4">
                        <div className="memo-info flex items-center gap-8">
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
                                    className="rounded-lg p-2 border border-neutral-300 dark:border-neutral-700"
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
                                <p className='text-neutral-950 dark:text-neutral-300'>Not Saved Yet...</p>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="content-itself">
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full h-40 rounded-lg p-2 border border-neutral-300 dark:border-neutral-700"
                            placeholder='Start typing your note here...'
                        />
                    </div>
                </div>

                <div className="content-buttons flex items-center gap-4 p-8 border-t border-neutral-300 w-full">
                    <>
                        <button
                            onClick={handleCreate}
                            className="flex items-center justify-center bg-blue-500 p-3 border-none text-neutral-50 rounded-lg"
                        >
                            Save Note
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center justify-center bg-neutral-200 p-3 border-none text-neutral-600 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>
                </div>
            </header>
        </div>
    )
}
