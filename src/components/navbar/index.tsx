import { useUser } from "../../data";
import { Logo } from "../logo";
import styles from './navbar.module.scss';

export function Navbar() {
  const { logout } = useUser();
  return(
    <header className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <Logo />
        <div className={styles.logout} onClick={logout}>
          Logout
        </div>
      </div>
    </header>
  )
}