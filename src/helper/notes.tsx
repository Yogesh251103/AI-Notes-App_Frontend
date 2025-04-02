import axios from "axios";
import { Note, CreateNoteProps } from "../types";

const helper = {
  createNote: async ({ title, content }: CreateNoteProps) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL_DEV}/notes`,
        { title, content }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getNotes: async (): Promise<Note[]> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL_DEV}/notes`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default helper;
