import { InputProps } from "./partial";
import styles from './inputs.module.scss';

export function TextInput(props: InputProps<HTMLInputElement>) {
  return (
    <input
      className={styles.textInput}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}