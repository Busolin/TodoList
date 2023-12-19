import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';
import styles from './Task.module.css';

export interface TaskProps {
  id: number;
  title: string;
  isCompleted: boolean;

  updateTaskCompletion: (id: number, isCompleted: boolean) => void;
  deleteTask: (id: number) => void;
}

export function Task({ id, title, isCompleted, updateTaskCompletion, deleteTask }: TaskProps) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);

  function handleTaskCompletion(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTaskCompleted(event.target.checked);
    updateTaskCompletion(id, event.target.checked);
  }

  function handleDeleteTask() {
    deleteTask(id);
  }

  return (
    <div className={`${styles.task} ${isTaskCompleted && styles.completedTask}`}>
      <label className={styles.container}>
        <input type="checkbox" onChange={handleTaskCompletion} checked={isTaskCompleted} />
        <span className={styles.checkmark}></span>
      </label>

      <p className={styles.taskTitle}>{title}</p>

      <button className={styles.deleteButton} onClick={handleDeleteTask}>
        <Trash size={20} className={styles.trashIcon} />
      </button>
    </div>
  )
}