import { FaCalendarAlt, FaMoneyBillAlt, FaUserCheck } from "react-icons/fa";
import { useUI } from "../../hooks";
import { useMyOffersStore } from "@/store/useMyOffersStore";

export const MyOffers = () => {
    const { strings } = useUI();
    const { data: ofertas } = useMyOffersStore();
    const totalOffers = ofertas?.length || 0;

    if (totalOffers === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            {/* Header con contador */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {strings.PAGE_PRODUCTLIST_TITULO_BLOQUE_OFERTA}
                </h3>
                <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {totalOffers}
                </span>
            </div>
            <div className="space-y-2.5">
                {ofertas.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-3 md:p-4 border  rounded-lg bg-gray-50/50 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                    >
                        {/* Lado izquierdo: Fecha */}
                        <div className="flex items-center gap-2.5">
                            {item.isFromUser && (
                                <span
                                    className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full"
                                    title="Tu oferta"
                                >
                                    <FaUserCheck className="text-green-600" />
                                </span>
                            )}
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <FaCalendarAlt className="text-sm text-gray-400" />
                                <span className="text-sm text-gray-700">
                                    {item.fechaHoraOfertado}
                                </span>
                            </div>
                        </div>

                        {/* Lado derecho: Precio */}
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors">
                            <FaMoneyBillAlt className="text-sm text-emerald-500" />
                            <span className="font-bold text-gray-800 text-sm md:text-base">
                                {item.precioOfertado}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};