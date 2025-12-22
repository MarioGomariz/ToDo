import React, { useState, useEffect } from "react";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaRegTimesCircle,
} from "react-icons/fa";
import { RiInboxLine } from "react-icons/ri";
import Modal from "./Modal";

function NoteContainer({
  title,
  category,
  notes,
  moveNote,
  onDelete,
  onEdit,
  statusColor,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    index: null,
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

  const handleNoteClick = (note, index) => {
    setModalData({
      title: note.title,
      description: note.description,
      index: index,
    });
    setShowModal(true);
  };

  return (
    <div
      className="kanban-column slide-in"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, category)}
    >
      {/* Column Header */}
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          {statusColor && <span className={`status-dot ${statusColor}`}></span>}
          <h3>{title}</h3>
        </div>

        {notes.length > 0 && (
          <span className="trello-badge">{notes.length}</span>
        )}
      </div>

      {/* Column Body */}
      <div className="kanban-column-body">
        {notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <RiInboxLine />
            </div>
            <p className="empty-state-text">
              {category === 'rapida' ? 'Sin notas' : 'Sin tareas'}
            </p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              draggable={!isMobileView}
              onDragStart={(e) => handleDragStart(e, index)}
              className="slide-in"
            >
              <div className="trello-card">
                <div className="trello-card-header">
                  <h3
                    className="trello-card-title"
                    onClick={() => handleNoteClick(note, index)}
                  >
                    {note.title}
                  </h3>

                  <button
                    className="trello-icon-button delete"
                    onClick={() => handleDelete(index)}
                    aria-label="Eliminar"
                  >
                    <FaRegTimesCircle size={16} />
                  </button>
                </div>

                {note.description && (
                  <p
                    className="trello-card-description"
                    onClick={() => handleNoteClick(note, index)}
                  >
                    {note.description}
                  </p>
                )}

                {/* Mobile navigation buttons */}
                {isMobileView && moveNote && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    {category === "tarea" && (
                      <button
                        className="trello-button-secondary"
                        onClick={() => moveNote(index, category, "porHacer")}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.375rem 0.75rem',
                          flex: 1
                        }}
                      >
                        → En Progreso
                      </button>
                    )}

                    {category === "porHacer" && (
                      <>
                        <button
                          className="trello-button-secondary"
                          onClick={() => moveNote(index, category, "tarea")}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.375rem 0.75rem',
                            flex: 1
                          }}
                        >
                          ← Por Hacer
                        </button>
                        <button
                          className="trello-button-secondary"
                          onClick={() => moveNote(index, category, "finalizado")}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.375rem 0.75rem',
                            flex: 1
                          }}
                        >
                          → Completado
                        </button>
                      </>
                    )}

                    {category === "finalizado" && (
                      <button
                        className="trello-button-secondary"
                        onClick={() => moveNote(index, category, "porHacer")}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.375rem 0.75rem',
                          flex: 1
                        }}
                      >
                        ← En Progreso
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal
          title={modalData.title}
          description={modalData.description}
          index={modalData.index}
          category={category}
          onClose={() => setShowModal(false)}
          onSave={onEdit}
        />
      )}
    </div>
  );
}

export default NoteContainer;
