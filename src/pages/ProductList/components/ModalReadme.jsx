import styles from './ModalReadme.module.css';
import {ButtonMain} from '@/components';
import { useUI } from '@/hooks';

export const ModalReadme = ({handleClose}) => {
    const { strings } = useUI();

    return <div className={styles.modal}>
                <div className={styles.modalDialog}>
                    <div className={styles.modalHeader}>
                        <h3 className={styles.title}>{strings.PAGE_PRODUCTLIST_MODALREADME_TITLE}</h3>
                        <span className={styles.modalClose} onClick={handleClose}>&times;</span>
                    </div>
                    <div className={styles.modalContent}>
                        {
                            [
                                strings.PAGE_PRODUCTLIST_MODALREADME_TEXT_BLOCK_01,
                            ].map( textBlock => (
                                <p key={textBlock}>{textBlock}</p>
                            ))
                        }
                    </div>
                    <div className={styles.modalFooter}>
                        <ButtonMain type={"button"} onClick={handleClose} bgColor={"secondary"}>{strings.PAGE_PRODUCTLIST_MODALREADME_BTN_OK}</ButtonMain>
                    </div>
                </div>
            </div>
}