import { useState } from "react";
import helper from "../helper/notes";

type AddNoteProps = {
  modalOpen: (value: boolean) => void;
};

const AddNoteModal = ({ modalOpen }: AddNoteProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [titleEmpty, setTitleEmpty] = useState<boolean>(false);
  const [contentEmpty, setContentEmpty] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async () => {
    modalOpen(false);
    if (title.length === 0) {
      setTitleEmpty(true);
      return;
    }
    if (content.length === 0) {
      setContentEmpty(true);
      return;
    }
    try {
      const response = await helper.createNote({ title, content });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full grid place-items-center absolute top-0 bg-black/50">
      <div className="relative bg-white rounded-xl pt-5 flex flex-col justify-start w-[50%]">
        <div className="absolute top-4 space-x-3 flex w-full justify-between px-5 bg-white">
          {titleEmpty && <p className="text-red-700">Title can't be empty</p>}
          <input
            type="text"
            className="border-b-2 border-black focus:outline-none w-[70%]"
            placeholder="Enter title of the note"
            onChange={handleTitleChange}
          />
          <div className="space-x-3">
            <button
              className="text-white bg-black p-2 cursor-pointer rounded-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button className="cursor-pointer" onClick={() => modalOpen(false)}>
              ❌
            </button>
          </div>
        </div>
        {contentEmpty && <p className="text-red-700">Content can't be empty</p>}
        <textarea
          className="p-4 pt-15 min-w-[600px] w-full min-h-[500px] focus:outline-none resize-none"
          placeholder="Type your notes here..."
          onChange={handleContentChange} 
        />
      </div>
    </div> 
  );
};

export default AddNoteModal;