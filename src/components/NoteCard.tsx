import { NoteCardProps } from "../types";
const NoteCard = ({title,content,onClick} : NoteCardProps) => {

  return (
    <div className="border-2 border-black rounded-sm p-5 w-[80%] h-[30vh] space-y-5 break-words overflow-clip cursor-pointer" 
    onClick={onClick}>
      <h2 className="font-bold text-xl line-clamp-1">{title}</h2>
      <p className="line-clamp-5">{content}</p>
    </div>
  )
}

export default NoteCard