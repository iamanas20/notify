import { Button, NotesList, PageLayout } from '../../components';
import styles from './home.module.scss';

export function Home() {
  return (
    <PageLayout>
      <div className={styles.pageTitleContainer}>
        <h1 className={styles.pageTitle}>
          Your notes
        </h1>
        <Button link to="/note/new" type="primary">
          New note
        </Button>
      </div>
      <NotesList />
    </PageLayout>
  );
}