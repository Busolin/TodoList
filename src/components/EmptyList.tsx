import { ClipboardText } from "@phosphor-icons/react/dist/ssr";
import styles from './EmptyList.module.css';

export function EmptyList() {
  return (
    <div className={styles.emptyListWrapper}>
      <ClipboardText size={56} color="#333333" />
      <p>
        <span>Você ainda não tem tarefas cadastradas</span>
        <br />
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}