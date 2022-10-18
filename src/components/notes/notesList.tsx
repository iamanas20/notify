import { Fragment } from "react";
import { useData, NoteType, useApi } from "../../data";
import styles from './notes.module.scss';
import { useQuery } from 'react-query';
import { PageLoader } from "../page-loader";
import { NoteItem } from "./noteItem";
import { EmptyState } from "../empty-state";

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
        (
          data?.length ?
          (
            <div className={styles.notesList}>
            {
              data!.map(
                (note) => {
                  return (
                    <NoteItem note={note} key={note.id}/>
                  )
                }
              )
            }
            </div>
          ) :
          <EmptyState text="You don't have any notes yet, create some."/>
        )
      }
    </Fragment>
  )
}