function Header() {
  return (
    <header className="p-4 bg-slate-700 mt-4 rounded-md text-white ">
      <h1 className=" font-bold uppercase text-2xl text-center">
        TAREAS Y NOTAS
      </h1>
      <p className="text-center">
        Agrega notas rapidas o tareas que tiene que realizar.
      </p>
      <p className="text-start opacity-50">
        *desde PC puedes arrastrar las tareas a otra categoria.
      </p>
      <p className="opacity-25 text-end">
        Powered by <span className="mr-2">
        <a
          href="https://www.instagram.com/mariogomariz01/"
          target="_blank"
          rel="noopener noreferrer"
        >
        @MarioGomariz
        </a></span>
      </p>
    </header>
  );
}

export default Header;
