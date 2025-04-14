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
  onClick : ()=>void;
};

export type NoteModalProps = {
  title: string;
  content: string;
  closeNoteModal : () => void;
};

export type Chat = {
  question: boolean;
  value: string;
}
