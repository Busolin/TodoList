import logo from './assets/logo.svg';
import styles from './App.module.css';
import { PlusCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { EmptyList } from './components/EmptyList';
import { Task, TaskProps } from './components/Task';

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<TaskProps[]>([]);

  // Getting from localStorage
  useEffect(() => {
    const storedTasks: TaskProps[] | null = JSON.parse(localStorage.getItem('@todoList:tasks') || '[]');
    if (storedTasks?.length === 0) { return }

    setTasks(storedTasks || []);
  }, []);

  function handleNewTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  async function generateNewTask() {
    if (newTaskTitle === '') {
      return;
    }

    const newTask: TaskProps = {
      id: Math.random(),
      title: newTaskTitle,
      isCompleted: false,
      deleteTask: handleDeleteTaskClick,
      updateTaskCompletion: handleTaskCompletion
    }

    await setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  useEffect(() => {
    updateLocalStorage();
  }, [tasks]);

  function updateLocalStorage() {
    localStorage.setItem('@todoList:tasks', JSON.stringify(tasks));
  }

  function handleDeleteTaskClick(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleTaskCompletion(id: number, isCompleted: boolean) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    setCompletedTasks(completedTasks);
  }, [tasks]);


  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.headerNewTaskWrapper}>
          <input type="text" className={styles.headerNewTaskInput} placeholder="Adicione uma nova tarefa" value={newTaskTitle}
            onChange={handleNewTaskChange} />
          <button className={styles.headerNewTaskButton} onClick={generateNewTask}>
            Criar
            <PlusCircle size={16} />
          </button>
        </div>

      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTasksCreated}>
            <span>Tarefas criadas</span>
            <span>{tasks.length}</span>
          </p>

          <p className={styles.sectionTasksCompleted}>
            <span>Concluídas</span>
            <span>
              {completedTasks.length !== 0
                ?
                `${completedTasks.length} de ${tasks.length}`
                :
                0
              }
            </span>
          </p>
        </div>

        <div>
          {tasks.length === 0
            ?
            <EmptyList />
            :

            <div className={styles.tasksWrapper}>
              {
                tasks.map(task => (
                  <Task key={task.id}
                    id={task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    deleteTask={handleDeleteTaskClick}
                    updateTaskCompletion={handleTaskCompletion}
                  />
                ))
              }
            </div>
          }
        </div>
      </section>
    </main>
  )
}

export default App;
