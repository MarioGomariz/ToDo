import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

function Modal({ title, description, onClose, onSave, index, category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "");

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
        if (isEditing) {
          handleCancelEdit();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isEditing, onClose]);

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) return;

    onSave(index, category, {
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
    onClose();
  };

  const handleCancelEdit = () => {
    setEditedTitle(title);
    setEditedDescription(description || "");
    setIsEditing(false);
  };

  const modalContent = (
    <div
      className="modal-overlay fade-in"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            {isEditing ? (
              <input
                className="trello-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Título"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}
                autoFocus
              />
            ) : (
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.4'
              }}>
                {title}
              </h2>
            )}
          </div>

          <button
            onClick={onClose}
            className="trello-icon-button"
            aria-label="Cerrar"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {isEditing && (
            <div className="edit-indicator" style={{ marginBottom: '1rem' }}>
              <FiEdit2 size={12} />
              Modo Edición
            </div>
          )}

          {isEditing ? (
            <textarea
              className="trello-input"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Añade una descripción..."
              style={{
                minHeight: '200px',
                resize: 'vertical',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          ) : (
            <div style={{
              fontSize: '0.9375rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word'
            }}>
              {description || <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Sin descripción</span>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="trello-button trello-button-secondary"
              >
                <FiX size={16} style={{ marginRight: '0.375rem' }} />
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="trello-button"
              >
                <FiSave size={16} style={{ marginRight: '0.375rem' }} />
                Guardar Cambios
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="trello-button"
            >
              <FiEdit2 size={16} style={{ marginRight: '0.375rem' }} />
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
