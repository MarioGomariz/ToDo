function Header() {
  return (
    <header className="trello-header fade-in" style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Tareas y Notas
          </h1>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)'
          }}>
            Organiza tus tareas y notas de forma simple
          </p>
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
      </div>
    </header>
  );
}

export default Header;
