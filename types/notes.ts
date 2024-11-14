export interface Note {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    userId: string;
    archived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoteElement {
    note : Note[];
}
