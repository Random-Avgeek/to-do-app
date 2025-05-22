import styles from './Header.module.css';

function Header({ darkMode, toggleTheme }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>To Do App</h1>
        
        <button 
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '🔆' : '🌒'}
        </button>
      </div>
    </header>
  );
}

export default Header;