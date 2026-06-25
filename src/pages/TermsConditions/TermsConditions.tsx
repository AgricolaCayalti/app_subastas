import React from "react";
import { ButtonForm } from "@/components";
import { Navigate } from "react-router-dom";
import { Switch } from "@/components/Switch/Switch";
import rutas from "@/data/rutas";
import { useTermsConditions } from "./useTermsConditions";
import { Layout } from "@/components/Layout/Layout";

export const TermsConditions = () => {
    const { isChecked, toggleCheck, handleSubmit, strings, isAcceptedTYC } = useTermsConditions();

    if (isAcceptedTYC) {
        return <Navigate to={rutas.SIGNUP} replace={true} />;
    }

    return (
        <Layout title="TÉRMINOS Y CONDICIONES DE USO">
            <form
                className="flex flex-col justify-center gap-3"
                onSubmit={handleSubmit}
            >
                <div className="text-primary text-justify">
                    <p className="mb-4">{strings.TERMINOS_CONDICIONES}</p>
                    {strings.TERMINOS_CONDICIONES_CLAUSULAS?.map((item, index) => (
                        <React.Fragment key={index}>
                            <p className="mb-2">
                                <b>
                                    {index + 1}. {item.TITULO}
                                </b>
                            </p>
                            <p className="mb-4">{item.DESCRIPCION}</p>
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
        </Layout>
    );
};