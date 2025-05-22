import styles from './EmptyState.module.css';

function EmptyState({ filter }) {
  let message = '';
  
  switch (filter) {
    case 'active':
      message = 'None Active, Either you have completed or forgot to add.';
      break;
    case 'completed':
      message = 'None Completed, Check in Active/All to see if any remain.';
      break;
    default:
      message = 'None Found! Lets add some tasks, shall we?';
  }
  
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>📋</div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default EmptyState;