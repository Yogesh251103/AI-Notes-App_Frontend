export type Note = {
  id: number;
  title: string;
  content: string;
};

export type CreateNoteProps = {
  title: string;
  content: string;
};

export type NoteCardProps = {
  title: string;
  content: string;
};
