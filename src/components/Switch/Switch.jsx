import styles from './Switch.module.css';

export const Switch = ({name, required = false, options = ["SÍ", "NO"], value = undefined, onChange = null}) => {
    return  <div className={styles.main}>
                {
                    value !== undefined &&
                        <b>{options[value ? 0 : 1]}</b>
                }
                <label className={styles.switch}>
                    <input name = {name} required = { required} type="checkbox" checked={value} onChange={onChange}/>
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
}
            