import { Constantes } from "../data/constantes";

export const getHoy = ()=>{
    return getDateFromJSDate(new Date());
};

export const getHora = ()=>{
    const d = new Date();
    let hora = d.getHours(),
        min = d.getMinutes(),
        seg = d.getSeconds();

    hora = (hora >= 10)  ? hora : (`0${hora}`);
    min = (min >= 10)  ? min : (`0${min}`);
    seg = (seg >= 10)  ? seg : (`0${seg}`);

    return  `${hora}:${min}:${seg}`;
};

export const getDateFromJSDate = (date) => {
    let anio = date.getFullYear(),
        mes = date.getMonth()+1,
        dia = date.getDate();

    mes = (mes >= 10)  ? mes : (`0${mes}`);
    dia = (dia >= 10)  ? dia : (`0${dia}`);

    return `${anio}-${mes}-${dia}`;
};


export const getDiasSemana = ()=>{
    return ['Domingo',"Lunes", "Martes", "Miércoles", "Jueves","Viernes","Sábado"];
}

export const getDiasFromNumDias = (cadenaNumDias)=>{
    const arregloNumDias = cadenaNumDias.split(",");
    const diasSemana = getDiasSemana();
    return arregloNumDias.map(numDia => {
        return diasSemana[parseInt(numDia)];
    }).join(", ");
};

export const formatStringDateToString = (dateString, separator = "-")=>{
    let [year, month, day] = dateString.split(separator);
    return `${day}/${month}/${year}`;
};

export const formatStringTimeToString = (timeString)=>{
    let [hours, minutes, seconds] = timeString.split(":");
    let timeStringFormatted = "";
    const hoursLeft = parseInt(hours) - 12;
    const hoursInteger = parseInt(hours);

    if (hoursLeft > 0){
        timeStringFormatted += `${ hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft }:${minutes}`;
    } else {
        timeStringFormatted += `${ hoursInteger < 10 ? `0${hoursInteger}` : hoursInteger }:${minutes}`;
    }

    if (seconds !== undefined){
        timeStringFormatted += `:${seconds}`;
    }

    timeStringFormatted += ` ${hoursInteger < 12 ? "AM" : "PM"}`;

    return timeStringFormatted;
};

export const getMonedaSimbolo = (id_tipo_moneda) => {
    switch (id_tipo_moneda) {
        case Constantes.TIPO_MONEDA_SOLES_ID:
            return Constantes.TIPO_MONEDA_SOLES_SIMBOLO;
        case Constantes.TIPO_MONEDA_DOLARES_ID:
            return Constantes.TIPO_MONEDA_DOLARES_SIMBOLO;
        case Constantes.TIPO_MONEDA_EUROS_ID:
            return Constantes.TIPO_MONEDA_EUROS_SIMBOLO;
        default:
            return "-";
    }
};
