import { useEffect, useState } from "react";
import "./App.css";
import AddNoteModal from "./components/AddNoteModal";
import NoteCard from "./components/NoteCard";
import helper from "./helper/notes";
import { Note } from "./types";

function App() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

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
    <>
      <button
        className="text-white bg-black p-4 cursor-pointer block ml-auto font-poppins"
        onClick={() => setOpen(true)}
      >
        Create new note
      </button>
      {open && <AddNoteModal modalOpen={setOpen} />}
      <div className="w-full px-10 grid grid-cols-3 mt-5 gap-4">
        {notes.length > 0 &&
          notes.map((item) => (
            <NoteCard title={item.title} content={item.content} key={item.id} />
          ))}
      </div>
    </>
  );
}

export default App;
