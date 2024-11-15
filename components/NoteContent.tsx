import React, { useEffect, useState } from 'react';
import SvgIcon from './reusables/SvgIcon';
import useNoteActions from '@hooks/useNotActions';
import { Note } from '../types/notes';

interface NoteContentProps {
    activeNoteId: string;
}

export default function NoteContent({ activeNoteId }: NoteContentProps) {
    const { getRelevantNotes, updateNote } = useNoteActions();

    const [notes, setNotes] = useState<Note | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<Note>>({
        title: '',
        content: '',
        tags: [],
    });

    useEffect(() => {
        const fetchNotes = async () => {
            if (activeNoteId) {
                const fetchedNotes = await getRelevantNotes(activeNoteId);
                setNotes(fetchedNotes);
                setFormData({
                    title: fetchedNotes.title,
                    content: fetchedNotes.content,
                    tags: fetchedNotes.tags,
                });
            }
        };
        fetchNotes();
    }, [activeNoteId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (notes) {
            await updateNote(notes._id, formData);
            setNotes({ ...notes, ...formData });
            setEditMode(false);
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
        <div className="content-section w-full flex flex-1 flex-col gap-4 p-4 border-r border-neutral-300">
            {notes ? (
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
                            <h1 className="text-lg font-bold">{notes.title}</h1>
                        )}

                        <div className="flex flex-col gap-4">
                            <div className="memo-info flex items-center gap-8">
                                <div className="tags-section flex gap-2">
                                    <SvgIcon path="tag" />
                                    <p>Tags</p>
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
                                            <p className="text-neutral-950" key={tag}>
                                                {tag}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="memo-info flex items-center gap-8">
                                <div className="tags-section flex gap-2">
                                    <SvgIcon path="clock" />
                                    <p>Last Edited</p>
                                </div>
                                <div className="tags-section flex gap-4">
                                    <p>{new Date(notes.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>

                        <div className="content-itself">
                            {editMode ? (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full h-40 border rounded-lg p-2"
                                />
                            ) : (
                                <p className="max-w-screen-sm">{notes.content}</p>
                            )}
                        </div>
                    </div>

                    <div className="content-buttons flex items-center gap-4 p-8 border-t border-neutral-300 w-full">
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
                                    className="flex items-center justify-center bg-neutral-200 p-3 border-none text-neutral-600 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center justify-center bg-blue-500 p-3 border-none text-neutral-50 rounded-lg"
                            >
                                Edit Note
                            </button>
                        )}
                    </div>
                </header>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 pt-12">
                    <h2 className="text-2xl text-neutral-950">Notes are shown here.</h2>
                    <p>Choose a note to get started!</p>
                </div>
            )}
        </div>
    );
}
