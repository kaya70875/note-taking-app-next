import { mutate } from 'swr';
import { Note } from '../types/notes';

const useNoteActions =<T extends object> () => {
    /**
   * Adds a new note.
   *
   * @param {T} noteData - The data object for the notes to be added.
   * @param {string} userId - User ID of the user who is adding the note.
   */
    const createNote = async (noteData : T , userId : string) => {
        try {
            const response = await fetch('/api/noteMethods' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body  : JSON.stringify({
                    ...noteData,
                    userId,
                })
            })

            if(response.ok) {
                const result = await response.json();
                console.log(result.message);
                // Add mutate here.
            } else {
                console.log('Error creating note');
            }
        } catch {
            console.log('Error creating note');
        }
    }

    const updateNote = async (noteId : string , noteData : T) => {
        /**
   * Updates an existing note.
   *
   * @param {string} noteId - The ID of the note to be updated.
   * @param {T} noteData - The data object for the notes to be updated.
   */
        try {
            const response = await fetch('/api/noteMethods' , {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body  : JSON.stringify({
                    ...noteData,
                    noteId,
                })
            })

            if(response.ok) {
                const result = await response.json();
                console.log(result.message);
                mutate('/api/getData');
            } else {
                console.log('Error updating note');
            }
        } catch(e){
            console.log('Error updating note');
        }
    }

    const getRelevantNotes = async (noteId : string) : Promise<Note> => {
         /**
   * Gets relevant notes. This function fetches relevant notes based on the provided note ID. Should return a Promise.
   *
   * @param {string} noteId - The ID of the note to be fetched.
   */
        try {
            const response = await fetch('/api/getNoteDetails' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body  : JSON.stringify({
                    noteId,
                })
            })
            if(response.ok) {
                const result = await response.json();
                return result.data;
                // Add mutate here.
            } else {
                console.log('Error fetching note');
                throw new Error('Error fetching note');
            }
        }catch(e) {
            console.log(e);
            throw new Error('Error fetching note');
        }
    }
    return {createNote, updateNote, getRelevantNotes}
}

export default useNoteActions;