import { useState } from 'react'
import { Chat } from "../types";
import axios from "axios";
import Spinner from './Spinner';

interface AiChatProps {
    content: string;
  }

const AiChat = ({content}:AiChatProps) => {
  const [question, setQuestion] = useState<string>("");
  const [chat, setChat] = useState<Chat[]>([]);
  const [loading,setLoading] = useState<boolean>(false);

  const handleRequstGemini = async () => {
      setChat((prev) => [...prev, { question: true, value: question }]);
      setQuestion("");
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL_DEV}/generate-content`,
          {
            question: question,
            content: content,
          }
        );
        setChat((prev) => [...prev, { question: false, value: response.data }]);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-black text-white p-5 pb-10 h-full w-[50%] break-words overflow-y-scroll relative">
            <h2 className="text-xl font-bold pb-3">Ask your questions here</h2>
            {chat?.map((item, index) =>
              item.question === true ? (
                <div key={index} className="bg-black p-3 rounded border-2 border-white font-bold mb-5">
                  {item.value}
                </div>
              ) : (
                <p key={index} className="mb-5">{item.value}</p>
              )
            )}
            {loading && <Spinner/>}
            <div className="fixed bottom-[2vh] right-[2.5vw] bg-black w-[45%] h-10 flex justify-between items-center">
              <textarea
                className="w-[90%] h-12 overflow-y-scroll p-3 rounded-lg resize-none border-1 border-white focus:outline-0"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key === "Enter") handleRequstGemini()
                }}
              ></textarea>
              <button
                className="w-12 h-12 bg-white rounded-full flex justify-center items-center cursor-pointer"
                onClick={handleRequstGemini}
              >
                <img src="/send.png" className="h-6 w-6" />
              </button>
            </div>
          </div>
  )
}

export default AiChat
