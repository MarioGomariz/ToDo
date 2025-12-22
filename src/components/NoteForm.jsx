import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

function NoteForm({ addNote, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("rapida");

  // Prevenir scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Manejar ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addNote({
      title,
      description,
      category,
    });
    setTitle("");
    setDescription("");
  };

  const modalContent = (
    <div
      className="modal-overlay fade-in"
      onClick={onClose}
    >
      <div
        className="modal-content scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Agregar Nueva Tarea</h2>
          <button
            onClick={onClose}
            className="trello-icon-button"
            aria-label="Cerrar"
            type="button"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Título *
              </label>
              <input
                className="trello-input"
                id="title"
                maxLength="40"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Comprar café"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Descripción (opcional)
              </label>
              <textarea
                className="trello-input"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Añade más detalles..."
                style={{
                  minHeight: '120px',
                  resize: 'vertical',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                Tipo de tarea *
              </label>
              <div className="form-radio-group">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    className="trello-radio"
                    name="category"
                    value="rapida"
                    checked={category === "rapida"}
                    onChange={() => setCategory("rapida")}
                  />
                  <span>Nota Rápida</span>
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    className="trello-radio"
                    name="category"
                    value="tarea"
                    checked={category === "tarea"}
                    onChange={() => setCategory("tarea")}
                  />
                  <span>Tarea</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="trello-button trello-button-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="trello-button"
            >
              Añadir Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default NoteForm;
