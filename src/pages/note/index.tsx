import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useData } from '../../data';
import styles from './note.module.scss';

export function Note() {
  const navigate = useNavigate();
  const { state, update } = useData();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  function save() {
    update({
      notes: [
        ...state.notes,
        {
          id: Math.random(), // this will come from the API
          title,
          text,
          color: 'white', // will add a color picker
        }
      ]
    });
    navigate('/');
  }

  return (
    <div className={styles.notePage}>
      <div className={styles.actionBar}>
        <Button type="secondary" link to="/">
          Cancel
        </Button>
        <Button type="primary" onClick={save}>
          Save
        </Button>
      </div>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write your note's title..."
      />

      <NoteInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Here goes the text of the note..."
      />
    </div>
  )
}

type InputProps<T> = {
  value: string;
  onChange: ChangeEventHandler<T>;
  placeholder?: string;
}

function TitleInput(props: InputProps<HTMLInputElement>) {
  return (
    <input
      className={styles.titleInput}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}

function NoteInput(props: InputProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className={styles.textInput}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}