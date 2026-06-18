import styles from './PageLayout.module.css';

export const PageLayout = ({children}) => {
    return <div className={styles.main}>
        {children}
    </div>
}