import { InputProps } from "./partial";
import styles from './inputs.module.scss';

export function NoteInput(props: InputProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className={styles.noteInput}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}