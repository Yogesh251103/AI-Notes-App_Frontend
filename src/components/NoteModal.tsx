import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
import { NoteModalProps } from "../types";
import axios from "axios";
const NoteModal = ({ title, content, closeNoteModal }: NoteModalProps) => {
  const [question, setQuestion] = useState<string>("");
  const [showAIView, setShowAIView] = useState<boolean>(false);
  const [geminiResponse, setGeminiResponse] = useState<string[]>([]);
  //logic to avoid background scrolling when modal is open
  useEffect(() => {
    console.log(showAIView);
    console.log("modal mounted");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRequstGemini = async () => {
    setGeminiResponse((prev) => [...prev, question]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL_DEV}/generate-content`,
        {
          question: question,
          content: content,
        }
      );
      setGeminiResponse((prev) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="bg-black text-white p-5 h-full w-[50%] break-words overflow-y-scroll relative">
            <h2 className="text-xl font-bold pb-3">Ask your questions here</h2>
            {geminiResponse?.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
            <div className="absolute bottom-[2vh] right-[2vw] bg-black h-10 w-[95%] left-5 flex justify-between items-center">
              <textarea
                className="w-[90%] h-12 overflow-y-scroll p-3 rounded-lg resize-none border-1 border-white focus:outline-0 "
                placeholder="Type your question here..."
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              <button
                className="w-12 h-12 bg-white rounded-full flex justify-center items-center cursor-pointer"
                onClick={handleRequstGemini}
              >
                <img src="/send.png" className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </ModalPortal>
  );
};

export default NoteModal;
