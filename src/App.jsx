import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import FilterBar from './components/FilterBar/FilterBar';
import EmptyState from './components/EmptyState/EmptyState';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('priority'); // Sort by priority or date
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    
    if (isFirstLoad.current){
      isFirstLoad.current = false;
      return;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];
    
    // Apply filter
    if (filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }
    
    // Apply sorting
    if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => priorityValues[b.priority] - priorityValues[a.priority]);
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredTasks(result);
  }, [tasks, filter, sortBy]);

  const addTask = (task) => {
    setTasks([...tasks, {
      id: Date.now().toString(),
      text: task.text,
      completed: false,
      priority: task.priority,
      createdAt: new Date().toISOString()
    }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, priority: newPriority } : task
    ));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const changeSortBy = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="container">
        <TaskForm addTask={addTask} />
        
        <FilterBar 
          filter={filter} 
          changeFilter={changeFilter} 
          sortBy={sortBy}
          changeSortBy={changeSortBy}
        />
        
        {filteredTasks.length > 0 ? (
          <TaskList 
            tasks={filteredTasks} 
            toggleComplete={toggleComplete} 
            deleteTask={deleteTask} 
            editTask={editTask} 
          />
        ) : (
          <EmptyState filter={filter} />
        )}
      </main>
    </div>
  );
}

export default App;