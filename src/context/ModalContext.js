import { createContext, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const closeModal = () => {
    setInput("");
    setIsOpen(false);
  };

  const deleteProject = async (id) => {
    try {
      const res = await axiosInstance.delete(`projects/${id}`);
      closeModal();
      console.log("projekat obrisan");
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, closeModal, input, setInput, deleteProject }}
    >
      {children}
    </ModalContext.Provider>
  );
};
