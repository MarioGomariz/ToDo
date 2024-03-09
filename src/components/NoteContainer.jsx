import React, { useState, useEffect } from "react";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaRegTimesCircle,
} from "react-icons/fa";
import Modal from "./Modal";

function NoteContainer({
  title,
  bgColor,
  notes,
  category,
  moveNote,
  onDelete,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            draggable={!isMobileView} // Disable dragging for mobile view
            onDragStart={(e) => handleDragStart(e, index)}
            className="flex items-center mb-2"
          >
            {isMobileView && (
              <div>
                {category === "tarea" && (
                  <button
                    className="bg-black text-white rounded-full flex items-center justify-center w-auto mb-1"
                    onClick={() => moveNote(index, category, "porHacer")}
                  >
                    <FaArrowAltCircleDown />
                  </button>
                )}

                {category === "porHacer" && (
                  <>
                    <button
                      className="bg-black text-white rounded-full  flex items-center justify-center w-auto mb-1"
                      onClick={() => moveNote(index, category, "tarea")}
                    >
                      <FaArrowAltCircleUp />
                    </button>
                    <button
                      className="bg-black text-white rounded-full flex items-center justify-center "
                      onClick={() => moveNote(index, category, "finalizado")}
                    >
                      <FaArrowAltCircleDown />
                    </button>
                  </>
                )}

                {category === "finalizado" && (
                  <button
                    className="bg-black text-white rounded-full flex items-center justify-center "
                    onClick={() => moveNote(index, category, "porHacer")}
                  >
                    <FaArrowAltCircleUp />
                  </button>
                )}
              </div>
            )}

            <div
              className="mx-2 p-2 rounded-md bg-white cursor-pointer w-full"
              onClick={() => handleNoteClick(note.title, note.description)}
            >
              <h3 className="uppercase flex-1">{note.title}</h3>
            </div>

            <button
              className="bg-red-500 text-white rounded-full  flex items-center justify-center"
              onClick={() => handleDelete(index)}
            >
              <FaRegTimesCircle />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          title={modalContent.title}
          description={modalContent.description}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default NoteContainer;
