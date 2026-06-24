import React from "react";
import { ButtonForm } from "@/components";
import { Navigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar/TopBar";
import { Switch } from "@/components/Switch/Switch";
import rutas from "@/data/rutas";
import { useTermsConditions } from "./useTermsConditions";

const TITLE_PAGE_NAME = "TÉRMINOS Y CONDICIONES DE USO";

export const TermsConditions = () => {
    const { isChecked, toggleCheck, handleSubmit, strings, isAcceptedTYC } = useTermsConditions();

    if ( isAcceptedTYC ) {
        return <Navigate to={rutas.SIGNUP} replace={true} />;
    }

    return (
        <div className="bg-white flex flex-col h-full justify-start px-8 pt-[100px]">
            <TopBar
                title={TITLE_PAGE_NAME}
                bgColor="white"
                ftColor="primary"
                shouldShowBackBtn={true}
            />
            <form
                className="flex flex-col justify-center gap-3"
                onSubmit={handleSubmit}
            >
                <div className="text-primary text-justify">
                    <p>{strings.TERMINOS_CONDICIONES}</p>
                    {strings.TERMINOS_CONDICIONES_CLAUSULAS?.map((item, index) => (
                        <React.Fragment key={index}>
                            <p>
                                <b>
                                    {index + 1}. {item.TITULO}
                                </b>
                            </p>
                            <p>{item.DESCRIPCION}</p>
                        </React.Fragment>
                    ))}
                    <div className="text-left">
                        {strings.CONTACTO?.map((item, index) => (
                            <p key={index}>
                                <b>{item.TITULO}</b> <br /> {item.DESCRIPCION}
                            </p>
                        ))}
                    </div>
                    <p>{strings.TERMINOS_CONDICIONES_ATENCION}</p>
                    <p className="text-right">AGRÍCOLA CAYALTÍ & SUBSIDIARIAS</p>
                </div>
                <div className="text-primary text-left flex items-center justify-center text-lg">
                    <div>{strings.TERMINOS_CONDICIONES_ETIQUETA}</div>
                    <Switch
                        value={isChecked}
                        onChange={toggleCheck}
                        options={[]}
                    />
                </div>
                <ButtonForm
                    disabled={!isChecked}
                    bgColor="secondary"
                    type="submit"
                >
                    {strings.PAGE_TERMSCONDITIONS_BTN_ACCEPT}
                </ButtonForm>
            </form>
        </div>
    );
};