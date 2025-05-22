import styles from './FilterBar.module.css';

function FilterBar({ filter, changeFilter, sortBy, changeSortBy }) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => changeFilter('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => changeFilter('active')}
        >
          Active
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => changeFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      <div className={styles.sortOptions}>
        <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
        <select
          id="sort-select"
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => changeSortBy(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="date">Date Added</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;