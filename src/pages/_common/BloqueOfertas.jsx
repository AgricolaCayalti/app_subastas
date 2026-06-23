import { FaCalendarAlt, FaMoneyBillAlt, FaUserCheck } from "react-icons/fa"
import { useUI } from "../../hooks";
import styles from "./BloqueOfertas.module.css";

export const BloqueOfertas = ({titulo = "", subasta}) => {
    const { strings } = useUI();

    if (subasta?.ofertas?.length <= 0){
        return false;
    }

    return  <div>
        <p>AAA</p>
                <p className={styles.varietyOfferTitle}>{titulo} ({subasta.ofertas.length})</p>
                <table className={styles.varietyOfferTable}>
                    <thead>
                        <tr>
                            <td><FaCalendarAlt/> {strings.COMP_BLOCK_OFFERS_FECHA}</td>
                            <td><FaMoneyBillAlt/> {strings.COMP_BLOCK_OFFERS_PRECIO}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subasta?.ofertas?.map( item => {
                                return <tr key={item.id}>
                                    <td>{item.isFromUser && <FaUserCheck />} {item.fechaHoraOfertado}</td>
                                    <td className='text-right'>{subasta?.tipoMoneda} {item.precioOfertado}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
}