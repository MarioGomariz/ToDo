import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteContainer from "./components/NoteContainer";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState({
    rapida: [],
    tarea: [],
    porHacer: [],
    realizando: [],
    finalizado: [],
  });

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

  return (
    <>
      <Header />
      <main>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <NoteForm addNote={addNote} />
          <NoteContainer
            title="Notas Rápida"
            bgColor="bg-green-700"
            category="rapida"
            notes={notes.rapida}
            onDelete={deleteNote}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <NoteContainer
            title="Iniciando"
            bgColor="bg-green-600"
            category="tarea"
            notes={notes.tarea}
            moveNote={moveNote}
            onDelete={deleteNote}
          />
          <NoteContainer
            title="Realizando"
            bgColor="bg-yellow-400"
            category="porHacer"
            notes={notes.porHacer}
            moveNote={moveNote}
            onDelete={deleteNote}
          />
          <NoteContainer
            title="Finalizado"
            bgColor="bg-red-500"
            category="finalizado" // Corrected category
            notes={notes.finalizado} // Corrected notes object key
            moveNote={moveNote}
            onDelete={deleteNote}
          />
        </div>
      </main>
    </>
  );
}

export default App;
