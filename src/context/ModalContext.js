import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const closeModal = () => {
    setInput("");
    setIsOpen(false);
    console.log("pozvano iz konteksta");
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, closeModal, input, setInput }}
    >
      {children}
    </ModalContext.Provider>
  );
};
