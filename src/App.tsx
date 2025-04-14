import { useEffect, useState } from "react";
import "./App.css";
import AddNoteModal from "./components/AddNoteModal";
import NoteCard from "./components/NoteCard";
import helper from "./helper/notes";
import { Note } from "./types";
import NoteModal from "./components/NoteModal";

function App() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  console.log(selectedNote);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await helper.getNotes();
        setNotes(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="]">
      <button
        className="text-white bg-black p-4 cursor-pointer block ml-auto font-poppins"
        onClick={() => setOpen(true)}
      >
        Create new note
      </button>
      {open && <AddNoteModal modalOpen={setOpen} />}
      <div className="w-full px-10 grid grid-cols-3 mt-5 gap-4">
        {notes.length > 0 &&
          notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              onClick={() => {
                console.log('note card clicked')
                setSelectedNote(note)}
              }
            />
          ))}
      </div>
      {selectedNote && (
        <NoteModal
          title={selectedNote.title}
          content={selectedNote.content}
          closeNoteModal={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
}

export default App;
