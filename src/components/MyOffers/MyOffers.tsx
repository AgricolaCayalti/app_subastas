import { FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";
import { useUI } from "../../hooks";
import { useMyOffersStore } from "@/store/useMyOffersStore";
import { Offers } from "../ProductOffers/types";

export const MyOffers = () => {
    const { strings } = useUI();
    const { data: ofertas } = useMyOffersStore();
    const totalOffers = ofertas?.length || 0;

    if (totalOffers === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {strings.PAGE_PRODUCTLIST_TITULO_BLOQUE_OFERTA}
                </h3>
                <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    TOTAL: {totalOffers}
                </span>
            </div>
            <div className="space-y-2.5">
                {ofertas.map((item: Offers, index: number) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-3 md:p-4 border  rounded-lg bg-gray-50/50 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <FaCalendarAlt className="font-bold text-sm text-orange-400" />
                                <span className="font-bold text-gray-800 text-sm md:text-base">
                                    {item.fechaHoraOfertado}
                                </span>
                            </div>

                            <div className="flex  items-center transition-colors gap-1.5">
                                <FaMoneyBillAlt className="font-bold text-sm text-emerald-500" />
                                <span className="font-bold text-gray-800 text-sm md:text-base">
                                    {item.precioOfertado}
                                </span>                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};