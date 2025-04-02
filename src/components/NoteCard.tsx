import { useState } from "react"
import { NoteCardProps } from "../types";
import NoteModal from "./NoteModal";
const NoteCard = ({title,content} : NoteCardProps) => {
  const [openNote,setOpenNote] = useState(false);
  return (
    <div className="border-2 border-black rounded-sm p-5 w-[80%] h-[30vh] space-y-5 break-words overflow-clip cursor-pointer" 
    onClick={()=>setOpenNote(true)}>
      {openNote && <NoteModal title={title} content={content}/>}
      <h2 className="font-bold text-xl line-clamp-1">{title}</h2>
      <p className="line-clamp-5">{content}</p>
    </div>
  )
}

export default NoteCard