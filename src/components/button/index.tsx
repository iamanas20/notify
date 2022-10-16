import { MouseEvent, MouseEventHandler, ReactNode } from "react";
import styles from './button.module.scss';
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  className?: string;
  children: ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: boolean;
  to?: string;
  type: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const navigate = useNavigate();
  function navigateTo() {
    navigate(props.to || '');
  }

  function click(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.onClick!(event);
  }

  return (
    <button
      className={`${(props.className || '')} ${styles.button} ${styles[props.type]}`}
      onClick={
        props.link ? navigateTo : click
      }
    >
      {
        props.loading ?
        <Loading /> :
        props.children
      }
    </button>
  )
}

function Loading() {
  return (
    <div className={styles.loading}><div></div><div></div><div></div><div></div></div>
  )
}