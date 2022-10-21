import { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Link, NoteInput, PageLoader, TitleInput } from '../../components';
import { ChromePicker } from 'react-color';
import styles from './note.module.scss';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NoteType, useApi } from "../../data";
import { toast } from 'react-hot-toast';

export function Note() {
  return (
    <Routes>
      <Route index element={<NewNote />}/>
      <Route path="new" element={<NewNote />}/>
      <Route path=":id" element={<EditNote />}/>
    </Routes>
  )
}

type NewNoteProps = {
  note?: NoteType;
};

type FormNoteData = {
  title: string;
  text: string;
  color: string;
}

function NewNote(props: NewNoteProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = useApi();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  
  const [noteData, setNoteData] = useState<NoteType | FormNoteData>(props.note || {
    title: '',
    text: '',
    color: '#F3F7FE',
  });
  
  function invalidateNotesList(type: string) {
    queryClient.invalidateQueries('notesListQuery');
    toast.success('Note successfully ' + type + '!');
    navigate('/');
  }

  function togglePicker() {
    setIsPickerOpen(!isPickerOpen);
  }

  const editMutation = useMutation<void, Error, FormNoteData>(async (noteData) => {
    await api.post(
      `notes/${props.note!.id}`,
      noteData,
    )
  }, {
    onSuccess: () => invalidateNotesList('updated'),
  });
  const addMutation = useMutation<void, Error, FormNoteData>(async (noteData) => {
    await api.post(
      'notes',
      noteData,
    )
  }, {
    onSuccess: () => invalidateNotesList('created'),
  });

  function save() {
    if(props.note) {
      // update
      editMutation.mutate({
        title: noteData.title,
        text: noteData.text,
        color: noteData.color,
      });
    } else {
      // create
      addMutation.mutate(noteData);
    }
  }

  return (
    <div className={styles.notePage}>
      <div className={styles.actionBar}>
        <Link to="/">
          ← Back
        </Link>
        <div className={styles.buttonContainer}>
          {
            isPickerOpen &&
            <div className={styles.pickerContainer}>
              <div className={styles.cover} onClick={togglePicker}/>
              <ChromePicker
                className={styles.picker}
                color={noteData.color}
                onChange={
                  (color) => setNoteData({ ...noteData, color: color.hex })
                }
              />
            </div>
          }
          <div className={styles.colorLabel} onClick={togglePicker}>
            <div className={styles.label}>
              Note's Color:
            </div>
            <div
              className={styles.noteColor}
              style={{ background: noteData.color }}
            />
          </div>
          <span>|</span>
          <Button type="secondary" link to="/">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={save}
            loading={editMutation.isLoading || addMutation.isLoading}
          >
            Save
          </Button>
        </div>
      </div>
      <TitleInput
        value={noteData.title}
        onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        placeholder="Write your note's title..."
      />

      <NoteInput
        value={noteData.text}
        onChange={(e) => setNoteData({ ...noteData, text: e.target.value })}
        placeholder="Here goes the text of the note..."
      />
    </div>
  )
}

function EditNote() {
  const navigate = useNavigate();
  const api = useApi();
  const { id } = useParams();
  const { data, isFetching } = useQuery<NoteType, Error>('noteQuery', async () => {
    const { data } = await api.get(
      `notes/${id}`,
    );
    return data;
  }, {
    onError: () => {
      navigate('/');
    }
  });

  return isFetching ? <PageLoader /> : <NewNote note={data}/>;
}