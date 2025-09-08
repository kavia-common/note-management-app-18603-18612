export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toStored(note: Note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

export function fromStored(s: {
  id: string; title: string; content: string; createdAt: string; updatedAt: string;
}): Note {
  return {
    id: s.id,
    title: s.title,
    content: s.content,
    createdAt: new Date(s.createdAt),
    updatedAt: new Date(s.updatedAt),
  };
}
