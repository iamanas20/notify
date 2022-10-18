import { Link } from "react-router-dom";
import styles from './logo.module.scss';

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      Notify
    </Link>
  )
}