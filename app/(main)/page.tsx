'use client';

import Navbar from "@components/Navbar";
import useFetch from "@hooks/useFetch";
import useNoteActions from "@hooks/useNotActions";
import NoteContent from "@components/NoteContent";
import { useState } from "react";
import SvgIcon from "@components/reusables/SvgIcon";

export default function Home() {

  const { createNote } = useNoteActions();

  const { data: notes, loading, error } = useFetch() || [];
  const [activeNoteId , setActiveNoteId] = useState('');

  if (error) return <div>error!</div>
  if (loading) return <div>Loading...</div>

  const handleCreateNewNote = () => {
    // Check if the user is logged in.
    // Check if every field is filled.

    // Create a new note.
    createNote({
      title: "React Performance Optimization 2",
      content: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
      tags: ["React", "Optimization"],
      userId: "650505650505650505650506",
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, "650505650505650505650506");
  }

  return (
    <div className="w-full max-h-full">
      <Navbar />
      <div className="flex w-full h-full">
        <section className="notes-section flex flex-col items-center p-6 gap-4 w-3/12 border-r border-neutral-300 h-full">
          <button className="flex items-center justify-center p-3 w-full bg-blue-500 text-neutral-50 rounded-lg" onClick={handleCreateNewNote}>
            + Create New Note
          </button>

          <div className="note-cards flex flex-col gap-8 w-full p-2"> {/* All notes shown here */}
            {notes && notes.length > 0 && notes?.map(note => (
              <div className={`note-action cursor-pointer p-2 ${activeNoteId === note._id ? 'bg-neutral-100 rounded-lg' : ''}`} key={note._id} onClick={() => setActiveNoteId(note._id)}>
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

        <NoteContent activeNoteId={activeNoteId} />
        <section className="archive-section w-1/5 p-4 flex justify-center">
          <div className="buttons flex flex-col gap-4 w-full">
            <button className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="archive" />
              <p>Archive Note</p>
            </button>

            <button className="flex items-center gap-2 border border-neutral-300 p-2 rounded-lg">
              <SvgIcon path="delete" />
              <p>Delete Note</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
