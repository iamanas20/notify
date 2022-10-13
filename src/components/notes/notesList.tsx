import { Fragment } from "react";
import { useData } from "../../data";
import styles from './notes.module.scss';

export function NotesList() {
  const { state } = useData();
  return (
    <Fragment>
      <p className={styles.listTitle}>Notes list</p>
      <div className={styles.notesList}>
        {
          state.notes.map(
            (note) => {
              return (
                <div
                  key={note.id}
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
              )
            }
          )
        }
      </div>
    </Fragment>
  )
}