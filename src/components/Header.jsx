function Header() {
  return (
    <header className="p-4 mx-4 bg-slate-700 mt-4 rounded-md md:flex md:items-center text-white">
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 self-center "
      >
        @MarioGomariz
      </a>
      <h1 className="flex-auto font-bold uppercase text-2xl text-center md:text-left">
        TAREAS Y NOTAS
      </h1>
    </header>
  );
}

export default Header;
