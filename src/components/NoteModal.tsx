import { NoteCardProps } from "../types"
const NoteModal = ({title,content}:NoteCardProps) => {
  return (
    <div className="">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}

export default NoteModal
