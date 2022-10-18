import styles from './empty-state.module.scss';

type EmptyStateProps = {
  text: string;
}

export function EmptyState({ text }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <p className={styles.text}>{text}</p>
    </div>
  )
}