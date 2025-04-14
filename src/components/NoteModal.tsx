import { useEffect, useState } from "react";
import AiChat from './AiChat'
import ModalPortal from "./ModalPortal";
import { NoteModalProps } from "../types";

const NoteModal = ({ title, content, closeNoteModal }: NoteModalProps) => {
  const [showAIView, setShowAIView] = useState<boolean>(false);
  //logic to avoid background scrolling when modal is open
  useEffect(() => {
    console.log(showAIView);
    console.log("modal mounted");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 bg-black/50 h-screen w-screen flex">
        <div className="bg-white rounded p-5 pt-0 h-full w-[50%] break-words overflow-y-scroll">
          <div className="flex w-full justify-between px-3 pt-5 items-center sticky top-0 bg-white">
            <h1 className="font-poppins font-bold text-3xl pb-3">{title}</h1>
            <div className="space-x-4">
              <button
                className="text-white bg-black p-3 rounded cursor-pointer"
                onClick={() => setTimeout(() => setShowAIView(true), 10)}
              >
                Ask AI
              </button>
              <button
                className="cursor-pointer text-xl"
                onClick={() => {
                  console.log("Close button clicked");
                  setTimeout(closeNoteModal, 10);
                }}
              >
                ❌
              </button>
            </div>
          </div>
          <p>{content}</p>
        </div>
        {showAIView ? (
          <AiChat content={content}/>
        ) : (
          <></>
        )}
      </div>
    </ModalPortal>
  );
};

export default NoteModal;
