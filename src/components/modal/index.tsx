import { useState } from "react";
import { Fragment } from "react";
import { createPortal } from "react-dom"
import styles from './modal.module.scss';

const modalsRoot = document.getElementById('modals') as Element;

type ModalProps = {
  title: string;
  children: JSX.Element | string;
  footer: JSX.Element;
  close: () => void;
}

export function Modal(props: ModalProps) {
  return (
    createPortal(
      <ModalRenderer {...props} />,
      modalsRoot
    )
  )
}

function ModalRenderer(props: ModalProps) {
  return (
    <Fragment>
      <div className={styles.overlay} onClick={props.close}/>
      <div className={styles.modal}>
        <div className={styles.title}>
          <div className={styles.titleText}>{props.title}</div>
          <div className={styles.close} onClick={props.close}>
            Close
          </div>
        </div>
        <div className={styles.body}>
          {props.children}
        </div>
        <div className={styles.footer}>
          {props.footer}
        </div>
      </div>
    </Fragment>
  )
}

Modal.useModalState = function(): [boolean, () => void, () => void] {
  const [state, setState] = useState(false);
  const open = () => setState(true);
  const close = () => setState(false);

  return [
    state,
    open,
    close,
  ]
}