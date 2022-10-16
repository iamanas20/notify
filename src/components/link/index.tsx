import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './link.module.scss';

type LinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
}

export function Link(props: LinkProps) {
  return (
    <RouterLink to={props.to} className={`${styles.link} ${props.className || ''}`}>
      {props.children}
    </RouterLink>
  )
}