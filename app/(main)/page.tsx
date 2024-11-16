'use client';

import Navbar from "@components/Navbar";
import useNoteActions from "@hooks/useNotActions";
import NoteContent from "@components/NoteContent";
import { useState } from "react";
import SvgIcon from "@components/reusables/SvgIcon";
import CreateNote from "@components/CreateNote";
import AllNotes from "@components/AllNotes";
import { useArchive } from "@context/ArchiveContext";

export default function Home() {

  const {deleteNote , setArchivedNotes} = useNoteActions();
  const {isArchiveOpen} = useArchive();

  const [activeNoteId, setActiveNoteId] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);

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

  const handleArchiveNote = async (noteId: string) => {
    if(activeNoteId) {
      // Archive the note here.
      setArchivedNotes(noteId , !isArchiveOpen);
      // Give a success toast message here.
      alert('Note archived successfully!');
    }
  }

  return (
    <div className="w-full max-h-full">
      <Navbar />
      <div className="flex w-full h-full">
        <section className="notes-section flex flex-col items-center p-6 gap-4 w-3/12 border-r border-neutral-300 h-full">
          <button className="flex items-center justify-center p-3 w-full bg-blue-500 text-neutral-50 rounded-lg" onClick={() => setShowCreateNote(true)}>
            + Create New Note
          </button>

          <AllNotes isArchive={isArchiveOpen} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setShowCreateNote={setShowCreateNote} />
        </section>

        {showCreateNote ? <CreateNote closeCreateMode={setShowCreateNote} /> : <NoteContent activeNoteId={activeNoteId} />}
        <section className="archive-section w-1/5 p-4 flex justify-center">
          <div className="buttons flex flex-col gap-4 w-full">
            <button onClick={() => handleArchiveNote(activeNoteId)} className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="archive" />
              <p>Archive Note</p>
            </button>

            <button onClick={() => handleDeleteNote(activeNoteId)} className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="delete" />
              <p>Delete Note</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
