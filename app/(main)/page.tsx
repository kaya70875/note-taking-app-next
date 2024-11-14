'use client';

import Navbar from "@components/Navbar";
import useFetch from "@hooks/useFetch";
import useNoteActions from "@hooks/useNotActions";
import { Note } from "../../types/notes";
import NoteContent from "@components/NoteContent";

export default function Home() {

  const { createNote } = useNoteActions();

  const { data: notes, loading, error } = useFetch() || [];

  if (error) return <div>error!</div>
  if (loading) return <div>Loading...</div>

  const handleCreateNewNote = () => {
    // Check if the user is logged in.
    // Check if every field is filled.

    // Create a new note.
    createNote({
      title: "React Performance Optimization",
      content: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
      tags: ["React", "Performance", "Optimization"],
      userId: "650505650505650505650505",
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, "650505650505650505650505");
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex w-full h-full gap-4">
        <section className="notes-section flex flex-col items-center p-6 gap-4 w-3/12 border-r border-neutral-300 h-full">
          <button className="flex items-center justify-center p-3 w-full bg-blue-500 text-neutral-50 rounded-lg" onClick={handleCreateNewNote}>
            + Create New Note
          </button>
          <div className="note-card flex flex-col w-full gap-2 p-2 bg-neutral-100 rounded-lg">
            {notes && notes.length > 0 && notes?.map(note => (
              <div key={note._id}>
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
        <NoteContent content="dawlkdopwaldplwapdaw" tags={["React", "Performance", "Optimization"]} title="React Performance Optimization" />
        <section className="archive-section"></section>
      </div>
    </div>
  );
}
