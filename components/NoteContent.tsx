import React, { useEffect, useState } from 'react'
import SvgIcon from './reusables/SvgIcon';
import useNoteActions from '@hooks/useNotActions';
import { Note } from '../types/notes';

interface NoteContentProps {
  activeNoteId: string;
}

export default function NoteContent({activeNoteId}: NoteContentProps) {

    const {getRelevantNotes} = useNoteActions();

    const [notes , setNotes] = useState<Note>();

    useEffect(() => {
        const fetchNotes = async () => {
            if(activeNoteId) {
                const fetchedNotes = await getRelevantNotes(activeNoteId);
                console.log(fetchedNotes);
                setNotes(fetchedNotes);
            }
        }
        fetchNotes();
    } , [activeNoteId]);

  return (
    <div className="content-section w-full flex flex-col flex-1 gap-4 p-4">
        {notes ? (
            <header className='flex flex-col gap-4'>
            <h1>{notes?.title}</h1>
            <div className='flex flex-col gap-4'>
                <div className="memo-info flex items-center gap-8">
                    <div className="tags-section flex gap-2">
                        <SvgIcon path="tag" />
                        <p>Tags</p>
                    </div>
                    <div className="tags-section flex gap-4">
                        {notes.tags.map(tag => (
                            <p className='text-neutral-950' key={tag}>{tag}</p>
                        ))}
                    </div>
                </div>

                <div className="memo-info flex items-center gap-8">
                    <div className="tags-section flex gap-2">
                        <SvgIcon path="clock" />
                        <p>Last Edited</p>
                    </div>
                    <div className="tags-section flex gap-4">
                        <p>{notes.updatedAt ? new Date(notes.updatedAt).getFullYear() : ''}</p>
                    </div>
                </div>
            </div>
            <div className="line"></div>

            <div className="content-itself">
                <p className='max-w-screen-sm'>{notes.content}</p>
            </div>
        </header>
        ) : (
            <div className='flex flex-col items-center justify-center gap-4 pt-12'>
                <h2 className='text-2xl text-neutral-950'>Notes are shown here.</h2>
                <p>Choose a not to get started!</p>
            </div>
        )}
        
    </div>
  )
}
