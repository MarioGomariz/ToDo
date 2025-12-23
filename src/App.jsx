import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteContainer from "./components/NoteContainer";
import Header from "./components/Header";
import { IoAddSharp } from "react-icons/io5";

function App() {
  const [notes, setNotes] = useState({
    rapida: [],
    tarea: [],
    porHacer: [],
    finalizado: [],
  });

  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const addNote = (note) => {
    const { category } = note;
    const updatedNotes = { ...notes, [category]: [...notes[category], note] };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setShowFormModal(false);
  };

  const moveNote = (index, currentCategory, newCategory) => {
    const noteToMove = notes[currentCategory][index];
    const updatedNotes = {
      ...notes,
      [currentCategory]: notes[currentCategory].filter((_, i) => i !== index),
      [newCategory]: [...notes[newCategory], noteToMove],
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (index, category) => {
    const updatedNotes = [...notes[category]];
    updatedNotes.splice(index, 1);
    setNotes({ ...notes, [category]: updatedNotes });
    localStorage.setItem(
      "notes",
      JSON.stringify({ ...notes, [category]: updatedNotes })
    );
  };

  const editNote = (index, category, updatedNote) => {
    const updatedNotes = [...notes[category]];
    updatedNotes[index] = { ...updatedNotes[index], ...updatedNote };
    setNotes({ ...notes, [category]: updatedNotes });
    localStorage.setItem(
      "notes",
      JSON.stringify({ ...notes, [category]: updatedNotes })
    );
  };

  const totalNotes = Object.values(notes).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="kanban-wrapper">
      {/* Header */}
      <Header totalNotes={totalNotes} />

      {/* Kanban Board */}
      <div className="kanban-board">
        <NoteContainer
          title="📝 Notas Rápidas"
          category="rapida"
          notes={notes.rapida}
          onDelete={deleteNote}
          onEdit={editNote}
        />

        <NoteContainer
          title="Por Hacer"
          category="tarea"
          notes={notes.tarea}
          moveNote={moveNote}
          onDelete={deleteNote}
          onEdit={editNote}
          statusColor="green"
        />

        <NoteContainer
          title="En Progreso"
          category="porHacer"
          notes={notes.porHacer}
          moveNote={moveNote}
          onDelete={deleteNote}
          onEdit={editNote}
          statusColor="yellow"
        />

        <NoteContainer
          title="Completado"
          category="finalizado"
          notes={notes.finalizado}
          moveNote={moveNote}
          onDelete={deleteNote}
          onEdit={editNote}
          statusColor="red"
        />
      </div>

      {/* Floating Add Button */}
      <button
        className="floating-button scale-in"
        onClick={() => setShowFormModal(true)}
        aria-label="Agregar nueva tarea"
      >
        <IoAddSharp />
      </button>

      {/* Form Modal */}
      {showFormModal && (
        <NoteForm
          addNote={addNote}
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}

export default App;
