import { ButtonMain } from "../../components";
import Logo from "./../../assets/logo-2.png";
import { ProfileButton } from "../../components/ProfileButton/ProfileButton";
import { useMain } from "./useMain";
import { Loading } from "@/components/Loading/Loading";
import { Layout } from "@/components/Layout/Layout";

export const Main = () => {
    const { strings, handleGoTo, isLoading } = useMain();

    return (
        <Layout title="SUBASTA AGRÍCOLA CAYALTÍ Y SUBSIDIARIAS" shouldShowBackBtn={false}>
            {isLoading && <Loading />}
            <div className="flex flex-col justify-center items-center py-17 space-y-7">
                <div className="login-box-log">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="bg-white rounded-full shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-[var(--terciary)]"
                    />
                </div>
                <ButtonMain
                    fontSize={17.5}
                    bgColor="white"
                    ftColor="secondary"
                    onClick={() => handleGoTo("/products")}
                >
                    {strings.PAGE_MAIN_SUBASTAS_ACTIVAS}
                </ButtonMain>
                <ButtonMain
                    fontSize={17.5}
                    bgColor="white"
                    ftColor="secondary"
                    onClick={() => handleGoTo("/my-offers")}
                >
                    {strings.PAGE_MAIN_MIS_OFERTAS}
                </ButtonMain>
            </div>
            <ProfileButton />
        </Layout>
    );
};