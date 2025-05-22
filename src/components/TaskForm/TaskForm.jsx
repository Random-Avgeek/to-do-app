import { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate task text
    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }

    // Add the task
    addTask({ 
      text: taskText.trim(),
      priority
    });
    
    // Reset form
    setTaskText('');
    setPriority('medium');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          placeholder="Add a new task..."
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-label="Task description"
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
          aria-label="Task priority"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <button 
          type="submit" 
          className={styles.addButton}
          aria-label="Add task"
        >
          ➕
        </button>
      </div>
      
      {error && <p className={styles.errorText}>{error}</p>}
    </form>
  );
}

export default TaskForm;