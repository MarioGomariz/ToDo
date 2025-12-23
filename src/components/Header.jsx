function Header({ totalNotes }) {
  return (
    <header className="kanban-header">
      <div className="kanban-header-left">
        <div>
          <h1 className="kanban-header-title">Mi Tablero</h1>
          <p className="kanban-header-subtitle">
            {totalNotes} {totalNotes === 1 ? 'tarea' : 'tareas'} en total
          </p>
        </div>
      </div>

      <a
        href="https://mario-gomariz-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--primary)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '600',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--primary-hover)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--primary)'}
      >
        @MarioGomariz
      </a>
    </header>
  );
}

export default Header;
