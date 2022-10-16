import { ReactNode } from "react";
import styles from './inputs.module.scss'

type FormFieldProps = {
  label: string;
  children: ReactNode;
}

export function FormField(props: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <label>{props.label}</label>
      {props.children}
    </div>
  )
}