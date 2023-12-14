import logo from './assets/logo.svg';
import styles from './App.module.css';
import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { EmptyList } from './components/EmptyList';

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.headerNewTaskWrapper}>
          <input type="text" className={styles.headerNewTaskInput} placeholder="Adicione uma nova tarefa" />
          <button className={styles.headerNewTaskButton}>
            Criar
            <PlusCircle size={16} />
          </button>
        </div>

      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTasksCreated}>
            <span>Tarefas criadas</span>
            <span>0</span>
          </p>

          <p className={styles.sectionTasksCompleted}>
            <span>Concluídas</span>
            <span>0</span>
          </p>
        </div>

        <div>
          {tasks.length === 0
            ?
            <div className="">
              <EmptyList />
            </div>

            :

            <div className="">
              <p>suck not empty</p>
            </div>
          }
        </div>
      </section>
    </main>
  )
}

export default App;
