'use client';

import Navbar from "@components/Navbar";
import useNoteActions from "@hooks/useNotActions";
import NoteContent from "@components/NoteContent";
import { useState } from "react";
import CreateNote from "@components/CreateNote";
import AllNotes from "@components/AllNotes";
import { useArchive } from "@context/ArchiveContext";
import { useToast } from "@context/ToastContext";
import { useNavHeader } from "@context/NavbarHeaderContext";
import IconDelete from "@components/svgIcons/IconDelete";
import IconArchive from "@components/svgIcons/IconArchive";
import IconRestore from "@components/svgIcons/IconRestore";

export default function Home() {

  const { deleteNote, setArchivedNotes } = useNoteActions();
  const { isArchiveOpen } = useArchive();
  const {navbarHeader} = useNavHeader();

  const { showToast } = useToast();

  const [activeNoteId, setActiveNoteId] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  // Delete and Archive actions are here...

  const handleDeleteNote = async (noteId: string) => {
    if (activeNoteId) {
      await deleteNote(noteId);
      // Give a success toast message here.
      showToast('Note deleted successfully!', 'success');
    }

    else {
      // Give a toast message here.
      showToast('Please select a note to delete!', 'warning');
    }
  };

  const handleArchiveNote = async (noteId: string) => {
    if (activeNoteId) {
      // Archive the note here.
      setArchivedNotes(noteId, !isArchiveOpen);
      // Give a success toast message here.
      showToast('Note archived successfully!', 'success');
    }
  }

  return (
    <div className="w-full max-h-full">
      <Navbar searchQuery={searchQuery} header={navbarHeader} setSearchQuery={setSearchQuery} />
      <div className="flex w-full h-full">
        <section className="notes-section flex flex-col items-center p-6 gap-4 w-3/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
          <button className="primary-btn w-full" onClick={() => setShowCreateNote(true)}>
            + Create New Note
          </button>

          <AllNotes searchQuery={searchQuery} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} setShowCreateNote={setShowCreateNote} />
        </section>

        {showCreateNote ? <CreateNote closeCreateMode={setShowCreateNote} /> : <NoteContent activeNoteId={activeNoteId} />}
        <section className="archive-section w-1/5 p-4 flex justify-center">
          <div className="buttons flex flex-col gap-4 w-full">
            <button onClick={() => handleArchiveNote(activeNoteId)} className="flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
              {isArchiveOpen ? <IconRestore props={{color : 'text-neutral-950 dark:text-neutral-100'}} /> : <IconArchive props={{color : 'text-neutral-950 dark:text-neutral-100'}} />}
              <p className="text-neutral-950 dark:text-neutral-100">{isArchiveOpen ? 'Restore Note' : 'Archive Note'}</p>
            </button>

            <button onClick={() => handleDeleteNote(activeNoteId)} className="flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 p-2 rounded-lg">
              <IconDelete props={{color : 'text-neutral-950 dark:text-neutral-100'}} />  
              <p className="text-neutral-950 dark:text-neutral-100">Delete Note</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
