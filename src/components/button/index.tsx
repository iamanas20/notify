import { MouseEventHandler, ReactNode } from "react";
import styles from './button.module.scss';
import { useNavigate } from "react-router-dom";

type ButtonPropsType = {
  className?: string;
  children: ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: boolean;
  to?: string;
  type: 'primary' | 'secondary' | 'danger';
}

export function Button(props: ButtonPropsType) {
  const navigate = useNavigate();
  function navigateTo() {
    navigate(props.to || '');
  }

  return (
    <button
      className={`${(props.className || '')} ${styles.button} ${styles[props.type]}`}
      onClick={
        props.link ? navigateTo : props.onClick
      }
    >
      {props.children}
    </button>
  )
}