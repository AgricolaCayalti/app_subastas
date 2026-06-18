import { FaListAlt } from 'react-icons/fa';
import styles from './BlockVacio.module.css';

export const BlockVacio = ( { height= 350, title = 'Sin Datos', color = "gray" })=>{
    return  <div className={styles.main} style={{height: `${height}px`, color}}>
                <FaListAlt size={30}/>
                <div>{title}</div>
            </div>
}