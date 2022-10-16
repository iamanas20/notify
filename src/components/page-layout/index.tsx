import { ReactNode } from "react";
import styles from './page-layout.module.scss';

type PageLayoutProps = {
  children: ReactNode; className?: string
};

export function PageLayout(props: PageLayoutProps) {
  return (
    <div className={styles.pageLayout}>
      {props.children}
    </div>
  )
}