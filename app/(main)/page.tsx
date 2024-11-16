'use client';

import Navbar from "@components/Navbar";
import useFetch from "@hooks/useFetch";
import useNoteActions from "@hooks/useNotActions";
import NoteContent from "@components/NoteContent";
import { useState } from "react";
import SvgIcon from "@components/reusables/SvgIcon";
import CreateNote from "@components/CreateNote";

export default function Home() {

  const {deleteNote} = useNoteActions();

  const { data: notes, loading, error } = useFetch() || [];
  const [activeNoteId, setActiveNoteId] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);

  if (error) return <div>error!</div>
  if (loading) return <div>Loading...</div>

  // Delete and Archive actions are here...

  const handleDeleteNote = async (noteId: string) => {
    if(activeNoteId) {
      await deleteNote(noteId);
      // Give a success toast message here.
      alert('Note deleted successfully!');
    }

    else {
      // Give a toast message here.
      alert('Please select a note to delete or archive.');
    }
  };

  return (
    <div className="w-full max-h-full">
      <Navbar />
      <div className="flex w-full h-full">
        <section className="notes-section flex flex-col items-center p-6 gap-4 w-3/12 border-r border-neutral-300 h-full">
          <button className="flex items-center justify-center p-3 w-full bg-blue-500 text-neutral-50 rounded-lg" onClick={() => setShowCreateNote(true)}>
            + Create New Note
          </button>

          <div className="note-cards flex flex-col gap-8 w-full p-2"> {/* All notes shown here */}
            {notes && notes.length > 0 && notes?.map(note => (
              <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 rounded-lg' : ''}`} key={note._id} onClick={() => {
                setActiveNoteId(note._id)
                setShowCreateNote(false);
              }}>
                <header className="flex flex-col gap-2" >
                  <h2 className="font-bold text-lg max-w-48">{note.title}</h2>
                  <div className="tag-wrapper flex gap-2 p-1">
                    {note.tags.map(tag => (
                      <p key={tag} className="bg-neutral-200 p-1 rounded-lg">{tag}</p>
                    ))}
                  </div>
                </header>
                <p className="text-neutral-600">
                  {note.createdAt.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {showCreateNote ? <CreateNote closeCreateMode={setShowCreateNote} /> : <NoteContent activeNoteId={activeNoteId} />}
        <section className="archive-section w-1/5 p-4 flex justify-center">
          <div className="buttons flex flex-col gap-4 w-full">
            <button className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="archive" />
              <p>Archive Note</p>
            </button>

            <button className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="delete" />
              <p onClick={() => handleDeleteNote(activeNoteId)}>Delete Note</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
