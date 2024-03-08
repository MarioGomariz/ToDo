import React, { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("rapida");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      title,
      description,
      category,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-sky-600 shadow-md rounded px-8 py-6"
    >
      <h2 className={`text-center font-bold text-lg mb-4 uppercase`}>
        agrega una nueva nota
      </h2>

      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="title">
          Título:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          maxLength="25"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese el título de la nota"
        />
      </div>

      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="description">
          Descripción:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese la descripción de la nota"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="category">
          Categoría:
        </label>
        <div className="flex justify-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="category"
              value="rapida"
              checked={category === "rapida"}
              onChange={() => setCategory("rapida")}
            />
            <span className="ml-2">Notas</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="category"
              value="tarea"
              checked={category === "tarea"}
              onChange={() => setCategory("tarea")}
            />
            <span className="ml-2">Tarea</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center ">
        <button
          className="rounded-full bg-sky-400 hover:bg-sky-800 uppercase font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
