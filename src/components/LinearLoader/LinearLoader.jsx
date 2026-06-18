import styles from './LinearLoader.module.css';

export const LinearLoader = ({color = "secondary", maxWidth = 300, marginTop = 16, marginBottom = 16}) => {
    return  <div>
                <div style={{backgroundColor: `var(--${color})`, maxWidth: `${maxWidth}px`, marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px`}} className={styles.main}></div>
            </div> 
}