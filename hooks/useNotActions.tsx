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

    return {createNote}
}

export default useNoteActions;