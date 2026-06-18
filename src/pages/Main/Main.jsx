import { ButtonMain } from "../../components";
import { useNavigate } from "react-router-dom";
import styles from './Main.module.css'
import Logo from "./../../assets/logo-2.png";
import { ProfileButton } from "../../components/ProfileButton/ProfileButton";
import { TopBar } from "../../components/TopBar/TopBar";
import { useUI } from "../../hooks";

const TITLE_PAGE_NAME = "SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS";

export const Main = ()=> {
    const navigate = useNavigate();
    const { strings } = useUI();

    const handleGoTo = (route) => {
        navigate(route);
    }

    return  <div className={`${styles.container} background-gray background-imgmain`}>
                <TopBar bgColor={"white"} ftColor={"primary"} title={TITLE_PAGE_NAME} />
                <div className={`login-box-logo ${styles.logo}`}>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className={styles.actions}>
                    <ButtonMain fontSize={17.5} bgColor={"white"} ftColor="secondary" onClick={()=>{handleGoTo("/products")}}>{strings.PAGE_MAIN_SUBASTAS_ACTIVAS}</ButtonMain>
                    <ButtonMain fontSize={17.5} bgColor={"white"} ftColor="secondary" onClick={()=>{handleGoTo("/my-offers")}}>{strings.PAGE_MAIN_MIS_OFERTAS}</ButtonMain>
                </div>
                <ProfileButton />
            </div>
};