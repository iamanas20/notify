import { Button, NotesList } from '../../components';
import styles from './home.module.scss';

export function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.pageTitleContainer}>
        <h1 className={styles.pageTitle}>
          Your notes
        </h1>
        <Button link to="/note" type="primary">
          New note
        </Button>
      </div>
      <NotesList />
    </div>
  );
}