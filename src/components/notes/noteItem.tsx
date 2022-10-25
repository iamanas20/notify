import { NoteType, useApi } from "../../data";
import { Link } from "react-router-dom";
import styles from './notes.module.scss';
import { useMutation, useQueryClient } from "react-query";
import { Fragment, MouseEvent, useCallback } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "../modal";
import { Button } from "../button";

type NoteItemProps = {
  note: NoteType
}

export function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient();
  const api = useApi();
  const [isOpen, open, close] = Modal.useModalState();
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
    open();
    // deleteMutation.mutate(note.id);
  }


  return (
    <Fragment>
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
      {
        isOpen && (
          <Modal
            close={close}
            title="Delete Node"
            footer={
              <Fragment>
                <Button type="secondary" onClick={close}>
                  Cancel
                </Button>
                <Button type="danger" onClick={() => deleteMutation.mutate(note.id)}>
                  Delete note
                </Button>
              </Fragment>
            }
          >
            <p>Are you sure you want to delete this note?</p>
          </Modal>
        )
      }
    </Fragment>
  )
}