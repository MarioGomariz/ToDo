import React from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp, IoCheckmarkCircle } from "react-icons/io5";

function ImportModal({ shareData, onImport, onClose }) {
    const { type, data } = shareData;

    const handleImport = () => {
        onImport(shareData);
        onClose();
    };

    return createPortal(
        <div className="modal-overlay fade-in" onClick={onClose}>
            <div
                className="modal-content scale-in"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '32rem' }}
            >
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">
                        📥 Importar {type === 'note' ? 'Nota' : 'Contenedor'}
                    </h2>
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
                    {type === 'note' ? (
                        // Vista previa de nota individual
                        <div className="import-preview">
                            <div className="import-preview-card">
                                <h3 className="import-preview-title">{data.title}</h3>
                                {data.description && (
                                    <p className="import-preview-description">{data.description}</p>
                                )}
                                <div className="import-preview-meta">
                                    <span className="import-preview-badge">
                                        {data.category === 'rapida' ? '📝 Nota Rápida' : '📋 Tarea'}
                                    </span>
                                    <span className="import-preview-category">
                                        → {getCategoryName(data.category)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Vista previa de contenedor
                        <div className="import-preview">
                            <div className="import-preview-header">
                                <h3>{data.containerName || 'Contenedor'}</h3>
                                <span className="trello-badge">{data.notes.length}</span>
                            </div>
                            <div className="import-preview-list">
                                {data.notes.slice(0, 3).map((note, index) => (
                                    <div key={index} className="import-preview-item">
                                        <span className="import-preview-bullet">•</span>
                                        <span>{note.title}</span>
                                    </div>
                                ))}
                                {data.notes.length > 3 && (
                                    <div className="import-preview-more">
                                        +{data.notes.length - 3} más
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="import-info">
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            marginTop: '1rem'
                        }}>
                            {type === 'note'
                                ? '¿Deseas importar esta nota a tu lista?'
                                : `¿Deseas importar ${data.notes.length} ${data.notes.length === 1 ? 'nota' : 'notas'}?`
                            }
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="trello-button trello-button-secondary"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleImport}
                        className="trello-button"
                    >
                        <IoCheckmarkCircle size={18} style={{ marginRight: '0.375rem' }} />
                        Importar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

function getCategoryName(category) {
    const names = {
        rapida: 'Notas Rápidas',
        tarea: 'Por Hacer',
        porHacer: 'En Progreso',
        finalizado: 'Completado'
    };
    return names[category] || category;
}

export default ImportModal;
