import { InputProps } from "./partial";
import styles from './inputs.module.scss';

export function TitleInput(props: InputProps<HTMLInputElement>) {
  return (
    <input
      className={styles.titleInput}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}