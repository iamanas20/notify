import { ChangeEventHandler, useState } from 'react';
import styles from './note.module.scss';

export function Note() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <div className={styles.notePage}>
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