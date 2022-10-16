import axios from "axios";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../data/context";
import styles from './notes.module.scss';

export function NotesList() {
  const { state, update } = useData();
  useEffect(
    () => {
      axios.get(
        process.env.REACT_APP_API_URL + 'notes',
        {
          headers: { Authorization: `Bearer ${state.token}` }
        }
      )
      .then(
        response => {
          update({
            notes: response.data
          })
        }
      )
    }, []
  );

  return (
    <Fragment>
      <p className={styles.listTitle}>Notes list</p>
      <div className={styles.notesList}>
        {
          state.notes.map(
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
    </Fragment>
  )
}