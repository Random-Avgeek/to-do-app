import { useState } from 'react';
import styles from './TaskItem.module.css';

function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
    setEditPriority(task.priority);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editTask(task.id, editText, editPriority);
      setIsEditing(false);
    }
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      case 'low': return styles.priorityLow;
      default: return '';
    }
  };

  return (
    <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className={styles.editSelect}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <div className={styles.editActions}>
            <button 
              onClick={handleSaveEdit}
              className={styles.saveButton}
              aria-label="Save changes"
            >
              Save
            </button>
            <button 
              onClick={handleCancelEdit}
              className={styles.cancelButton}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.taskMain}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                id={`task-${task.id}`}
                className={styles.checkbox}
              />
              <label 
                htmlFor={`task-${task.id}`}
                className={styles.checkboxLabel}
              ></label>
            </div>
            
            <div className={styles.taskContent}>
              <p className={styles.taskText}>{task.text}</p>
              <div className={`${styles.priorityBadge} ${getPriorityClass()}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </div>
            </div>
          </div>
          
          <div className={styles.taskActions}>
            <button 
              onClick={handleEdit}
              className={styles.editButton}
              aria-label="Edit task"
              disabled={task.completed}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTask(task.id)}
              className={styles.deleteButton}
              aria-label="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;