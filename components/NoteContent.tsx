'use client';

import ClockSvg from '@components/svgIcons/ClockSvg';
import TagSvg from '@components/svgIcons/TagSvg';
import { useToast } from '@context/ToastContext';
import useNoteActions from '@hooks/useNotActions';
import { CircularProgress } from '@mui/material';
import { Note } from '../types/notes';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NoteContentNav from '@components/layoutShift/NoteContentNav';

export default function page() {

    const { getRelevantNotes, updateNote } = useNoteActions();
    const { showToast } = useToast();

    const params = useParams();
    const id = params.id; // Access dynamic route parameter like this in next 15.

    const [notes, setNotes] = useState<Note | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<Note>>({
        title: '',
        content: '',
        tags: [],

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const fetchedNotes = await getRelevantNotes(id as string);
                    setNotes(fetchedNotes);
                    setFormData({
                        title: fetchedNotes.title,
                        content: fetchedNotes.content,
                        tags: fetchedNotes.tags,
                    });
                } catch (error) {
                    console.error('Failed to fetch note:', error);
                } finally {
                    setLoading(false); // Always stop loading
                }
            }
        };
        fetchNotes();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (notes) {
            await updateNote(notes._id, formData);
            setNotes({ ...notes, ...formData });
            setEditMode(false);
            showToast('Note updated successfully!', 'success');
        }
    };

    const handleCancel = () => {
        setFormData({
            title: notes?.title || '',
            content: notes?.content || '',
            tags: notes?.tags || [],
        });
        setEditMode(false);
    };

    return (
        <div className="content-section w-full flex flex-1 flex-col gap-4 p-4 border-r lg:border-none border-neutral-300 dark:border-neutral-700">
            <NoteContentNav />
            <div className="line"></div>
            {notes && !loading ? (
                <header className="flex flex-col h-full justify-between">
                    <div className="content-top flex flex-col gap-6">
                        {editMode ? (
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="text-lg font-bold border rounded-lg p-2"
                            />
                        ) : (
                            <h1 className="text-lg font-bold dark:text-neutral-50">{notes.title}</h1>
                        )}

                        <div className="flex flex-col gap-4">
                            <div className="memo-info flex items-center gap-8">
                                <div className="tags-section flex gap-2">
                                    <TagSvg props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />
                                    <p className='dark:text-neutral-300'>Tags</p>
                                </div>
                                <div className="tags-section flex gap-4">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags && formData.tags.join(', ')}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                                                }))
                                            }
                                            className="border rounded-lg p-2"
                                        />
                                    ) : (
                                        notes.tags.map((tag) => (
                                            <p className="text-neutral-950 dark:text-neutral-300" key={tag}>
                                                {tag}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="memo-info flex items-center gap-8">
                                <div className="tags-section flex gap-2">
                                    <ClockSvg props={{ color: 'text-neutral-950 dark:text-neutral-300' }} />
                                    <p className='text-neutral-950 dark:text-neutral-300'>Last Edited</p>
                                </div>
                                <div className="tags-section flex gap-4">
                                    <p className='dark:text-neutral-300'>{new Date(notes.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="line dark:bg-neutral-700"></div>

                        <div className="content-itself">
                            {editMode ? (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full h-40 border rounded-lg p-2"
                                />
                            ) : (
                                <p className="max-w-screen-sm dark:text-neutral-300">{notes.content}</p>
                            )}
                        </div>
                    </div>

                    <div className="content-buttons flex items-center gap-4 p-8 border-t lg:border-none border-neutral-300 dark:border-neutral-700 w-full">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center bg-blue-500 p-3 border-none text-neutral-50 rounded-lg"
                                >
                                    Save Note
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 p-3 border-none text-neutral-600 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center justify-center bg-blue-500 p-3 border-none text-neutral-50 rounded-lg lg:hidden"
                            >
                                Edit Note
                            </button>
                        )}
                    </div>
                </header>
            ) : (
                <div className='w-full h-full flex items-center justify-center'><CircularProgress /></div>
            )}
        </div>
    )
}
