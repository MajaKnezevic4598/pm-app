import { useQuery } from "react-query";
import axiosInstance from "../helpers/axiosInstance";

const fetchSingleNote = async (id) => {
  try {
    const response = await axiosInstance.get(`notes/${id}`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const useNoteData = (id) => {
  return useQuery(
    ["note-data", id],
    () => {
      return fetchSingleNote(id);
    },
    {
      keepPreviousData: true,
    }
  );
};
