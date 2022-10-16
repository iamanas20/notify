import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Link, NoteInput, PageLoader, TitleInput } from '../../components';
import { useData } from '../../data/context';
import { ChromePicker } from 'react-color';
import styles from './note.module.scss';
import { NoteType } from '../../data/state';
import axios from 'axios';

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

function NewNote(props: NewNoteProps) {
  const navigate = useNavigate();
  const { state, update } = useData();
  const [loading, setLoading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [noteData, setNoteData] = useState(props.note || {
    title: '',
    text: '',
    color: '#F3F7FE',
  });

  function togglePicker() {
    setIsPickerOpen(!isPickerOpen);
  }

  function save() {
    if(props.note) {
      // update
      setLoading(true);
      axios.post(
        process.env.REACT_APP_API_URL + `notes/${props.note.id}`,
        {
          title: noteData.title,
          text: noteData.text,
          color: noteData.color,
        },
        {
          headers: { Authorization: `Bearer ${state.token}` }
        }
      )
      .then(
        response => {
          const note = response.data;
          update({
            notes: state.notes.map(n => n.id === note.id ? note : n)
          });
          navigate('/');
        }
      )
      .finally(
        () => {
          setLoading(false);
        }
      )
    } else {
      // create
      setLoading(true);
      axios.post(
        process.env.REACT_APP_API_URL + 'notes',
        noteData,
        {
          headers: { Authorization: `Bearer ${state.token}` }
        }
      )
      .then(
        response => {
          const note = response.data;
          update({
            notes: [
              ...state.notes,
              note
            ]
          });
          navigate('/');
        }
      )
      .finally(
        () => {
          setLoading(false);
        }
      )
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
          <Button type="primary" onClick={save} loading={loading}>
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
  const [note, setNote] = useState();
  const navigate = useNavigate();
  const {state} = useData();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      axios.get(
        process.env.REACT_APP_API_URL + `notes/${id}`,
        {
          headers: { Authorization: `Bearer ${state.token}` }
        }
      )
      .then(
        response => {
          setNote(response.data);
        }
      )
      .catch(
        () => {
          navigate('/');
        }
      )
      .finally(
        () => {
          setLoading(false);
        }
      )
    }, [id]
  );

  return loading ? <PageLoader /> : <NewNote note={note}/>;
}