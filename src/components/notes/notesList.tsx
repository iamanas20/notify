import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useData, NoteType, useApi } from "../../data";
import styles from './notes.module.scss';
import { useQuery } from 'react-query';
import { PageLoader } from "../page-loader";

export function NotesList() {
  const { state } = useData();
  const api = useApi();
  const { data, isFetching } = useQuery<NoteType[], Error>('notesListQuery', async () => {
    const { data } = await api
    .get(
      'notes',
    );
    return data.sort((a: NoteType, b: NoteType) => a.created_at > b.created_at);
  });

  return (
    <Fragment>
      <p className={styles.listTitle}>Notes list</p>
      {
        isFetching ? <PageLoader /> :
        <div className={styles.notesList}>
        {
          data!.map(
            (note) => {
              return (
                <Link
                  key={note.id}
                  to={"/note/" + note.id}
                >
                  <div
                    className={styles.noteItem}
                    style={{ background: note.color }}
                  >
                    <h4 className={styles.title}>
                      {note.title}
                    </h4>
                    <p className={styles.text}>
                      {note.text}
                    </p>
                  </div>
                </Link>
              )
            }
          )
        }
        </div>
      }
    </Fragment>
  )
}