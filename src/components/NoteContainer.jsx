import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import Modal from "./Modal";

function NoteContainer({ title, bgColor, notes, category, moveNote, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("category", category);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newCategory) => {
    e.preventDefault();
    const index = e.dataTransfer.getData("index");
    const currentCategory = e.dataTransfer.getData("category");
    if (currentCategory !== newCategory) {
      moveNote(parseInt(index), currentCategory, newCategory);
    }
  };

  const handleDelete = (index) => {
    onDelete(index, category);
  };

  const handleNoteClick = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };



  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div
      className={`p-4 rounded-md ${bgColor}`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, category)}
    >
      <h1 className={`text-center font-bold text-lg mb-4 uppercase`}>
        {title}
      </h1>
      <div className="px-3">
        {notes.map((note, index) => (
          <div
            key={index}
            draggable={category !== "rapida"} // Disable dragging for "Notas Rápida"
            onDragStart={(e) => handleDragStart(e, index)}
            className="flex items-center mb-2"
          >
            <div
              className="mr-2 p-2 rounded-md bg-white cursor-pointer w-full"
              onClick={() => handleNoteClick(note.title, note.description)}
            >
              <h3 className="uppercase flex-1">{note.title}</h3>
            </div>
             
              <button
                className="bg-red-500 text-white rounded-full size-5 flex items-center justify-center w-auto"
                onClick={() => handleDelete(index)}
              >
                <TiDelete />
              </button>
            
          </div>
        ))}
      </div>
      


      {showModal && (
        <Modal
          title={modalContent.title}
          description={modalContent.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default NoteContainer;
