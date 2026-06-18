import { ButtonForm } from "@/components"
import styles from './TermsConditions.module.css'
import { Navigate } from "react-router-dom";
import { useUI } from "@/hooks";
import { TopBar } from "@/components/TopBar/TopBar";
import { useState } from "react";
import { Switch } from "@/components/Switch/Switch";
import rutas from "@/data/rutas";

const TITLE_PAGE_NAME = "TÉRMINOS Y CONDICIONES DE USO";

export const TermsConditions = () => {
    const [isChecked, setIsChecked ] = useState(false);
    const { strings, isAcceptedTYC, onActivateAcceptedTYC } = useUI();

    const handleSubmit = (e) => {
        e.preventDefault();
        onActivateAcceptedTYC();
    };

    if (isAcceptedTYC) {
        return <Navigate to={rutas.SIGNUP} replace={true} />
    }

    return  <div className={styles.signupBoxContainer}>
                <TopBar title={TITLE_PAGE_NAME} bgColor={"white"} ftColor={"primary"} shouldShowBackBtn={true}/>
                <form className={styles.signupFrmMain} onSubmit={handleSubmit}>
                    <div className={styles.conditions}>
                        <p>Al utilizar esta plataforma de subastas, usted acepta y se compromete a cumplir los presentes términos y condiciones de uso, en adelante los “Términos”, que regulan el acceso y uso del servicio de subastas provisto por Agrícola Cayaltí y subsidiarias, en adelante “la Empresa”.</p>
                        <b>1. ACEPTACIÓN DE LOS TÉRMINOS</b>
                        <p>Al registrarse, acceder o utilizar la plataforma, el usuario declara haber leído, entendido y aceptado estos Términos. Si no está de acuerdo con ellos, no debe utilizar la plataforma.</p>
                        <b>2. DESCRIPCIÓN DEL SERVICIO</b>
                        <p>La plataforma permite a los usuarios registrados participar en subastas electrónicas de diversos bienes, realizando pujas dentro del tiempo establecido para cada evento. </p>
                        <b>3. REGISTRO DE USUARIO</b>
                        <p>Para participar en las subastas, el usuario deberá registrarse proporcionando información veraz, exacta y actualizada. La Empresa se reserva el derecho de verificar los datos y rechazar o cancelar cuentas si se detecta información falsa o uso indebido.</p>
                        <b>4. PUJAS Y OFERTAS</b>
                        <p>Las pujas realizadas son vinculantes y no pueden ser retiradas.</p>
                        <p>El usuario que realice la puja más alta al finalizar la subasta será considerado ganador, sujeto a verificación y cumplimiento de los requisitos establecidos para cada subasta.</p>
                        <p>La Empresa no garantiza la adjudicación de un bien si existen errores técnicos o circunstancias extraordinarias.</p>
                        <b>5. OBLIGACIONES DEL USUARIO GANADOR</b>
                        <p>El usuario que gane una subasta se compromete a concretar la transacción bajo los términos establecidos (precio, forma de pago, condiciones de entrega). </p>
                        <p>En caso de incumplimiento y/o cometer acciones que atenten contra los intereses y bienestar de la empresa, se le sancionará suspendiendo su participación de forma temporal o permanente de las subastas y otras operaciones de la compañía.</p>
                        <p>El cliente ganador de la subasta debe abonar el 50% del total de la venta en un plazo máximo de 2 horas, como adelanto para confirmar y separar la carga. El monto restante lo abonará cuando recoja la fruta.</p>
                        <p>De no responder y/o no hacer el abono del adelanto en el plazo marcado, la empresa pasará a contactar al cliente con el siguiente mejor precio.</p>
                        <p>La empresa se reserva la facultad de rechazar la oferta en caso de no alcanzar las expectativas o condiciones mínimas esperadas.</p>
                        <p>La adjudicación del producto estará sujeta a la evaluación del precio ofertado. En caso el precio ganador no cumpla con las expectativas comerciales o mínimas establecidas por la empresa, esta se reserva el derecho de no concretar la venta, aun cuando dicho precio haya sido el mayor ofertado en la subasta.</p>
                        <b>6. RESPONSABILIDADES</b>
                        <p>La Empresa no se hace responsable de fallas técnicas, interrupciones del servicio o errores en la transmisión de datos.</p>
                        <b>7. PROTECCIÓN DE DATOS</b>
                        <p>La información personal proporcionada por los usuarios será tratada conforme a la Ley N.° 29733 - Ley de Protección de Datos Personales y su reglamento. El usuario autoriza el tratamiento de sus datos para fines relacionados con la prestación del servicio.</p>
                        <b>8. PROPIEDAD INTELECTUAL</b>
                        <p>Todos los derechos sobre la plataforma, incluyendo su contenido, diseño y código fuente, pertenecen a la Empresa. El uso indebido será sancionado conforme a la legislación vigente.</p>
                        <b>9. MODIFICACIONES</b>
                        <p>La Empresa se reserva el derecho de modificar los presentes Términos en cualquier momento. Los cambios serán publicados en la plataforma y entrarán en vigencia desde su publicación.</p>
                        <b>10. LEY APLICABLE Y JURISDICCIÓN</b>
                        <p>Estos Términos se rigen por las leyes de la República del Perú. En caso de controversia, las partes se someten a la jurisdicción de los tribunales del distrito judicial de Lima Metropolitana, renunciando a cualquier otro fuera que pudiera corresponderles.
                        Si tiene dudas sobre estos Términos y Condiciones, puede contactarnos a:</p>
                        
                        <div className="text-left">
                            <p><b>Correo electrónico:</b> <br /> echininin@yarabamba.pe</p>
                            <p><b>Teléfono de contacto:</b> <br /> 972721588</p>
                        </div>
                        <p>Atentamente: </p>
                        <p className="text-right">AGRÍCOLA CAYALTÍ & SUBSIDIARIAS</p>
                    </div>
                    <div className={styles.blkAcceptTYC}>
                        <div >Acepto los Términos y Condiciones</div>
                        <Switch value={isChecked} onChange={()=> setIsChecked( (prev) => !prev)} options={[]}/>
                    </div>
                    <ButtonForm disabled = {  !isChecked  } bgColor='secondary' type="submit">{strings.PAGE_TERMSCONDITIONS_BTN_ACCEPT}</ButtonForm>
                </form>
            </div>
}