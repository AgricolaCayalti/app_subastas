import { useUI } from "@/hooks";
import { ProductDetail } from "@/store/useProductDetailStore";

export function CollapsibleSubProductNative({ descripcion, precioBaseKg, cantidadKg }: ProductDetail) {
  const { strings } = useUI();

  return (
    <div className="max-w-2xl mx-auto my-4 space-y-2">
      <details className="group border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <summary className="flex items-center justify-between gap-3 px-4 py-3 min-h-[44px] font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 cursor-pointer select-none list-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <span>{descripcion}</span>
          <svg
            className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </summary>
        <div className="px-4 py-3 text-gray-700 leading-relaxed space-y-1">
          <div>
            <span className="font-semibold">{strings.PAGE_PRODUCTLIST_PRECIO_BASE}:</span>{" "}
            {precioBaseKg}
          </div>
          <div>
            <span className="font-semibold">{strings.PAGE_PRODUCTLIST_CANTIDAD}:</span>{" "}
            {cantidadKg} KG
          </div>
        </div>
      </details>
    </div>
  );
}