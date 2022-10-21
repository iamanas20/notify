import { NoteType, useApi } from "../../data";
import { Link } from "react-router-dom";
import styles from './notes.module.scss';
import { useMutation, useQueryClient } from "react-query";
import { MouseEvent } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

type NoteItemProps = {
  note: NoteType
}

export function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient();
  const api = useApi();
  const deleteMutation = useMutation<AxiosResponse, Error, number>(async (noteId) => {
    return await api.delete(
      `notes/${noteId}`,
      noteId,
    )
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('notesListQuery');
      toast.success('Note deleted!');
    }
  });

  function deleteNote(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    deleteMutation.mutate(note.id);
  }

  return (
    <Link to={"/note/" + note.id}>
      <div
        className={styles.noteItem}
        style={{ background: note.color }}
      >
        <div className={styles.delete} onClick={deleteNote}>
          delete
        </div>
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