import { useUI } from "@/hooks";

export function CollapsibleIndications({ comentarios }: { comentarios: string | null }) {
  const { strings } = useUI();


  return (
    
    < div className = "max-w-2xl mx-auto my-4 space-y-2" >
      <details className="group border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <summary className="flex items-center justify-between gap-3 px-4 py-3 min-h-[44px] font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 cursor-pointer select-none list-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <span>{strings.PAGE_PRODUCTLIST_MOSTRAR_INDICACIONES}</span>
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
            {comentarios}
          </div>
        </div>
      </details>
    </div >
  );
}

{/* <div className="max-w-[640px] mx-auto my-3">
      <details className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
        <summary className="flex items-center gap-2.5 px-3 py-2 min-h-[44px] font-semibold bg-primary text-white rounded-xl w-fit cursor-pointer select-none [-webkit-tap-highlight-color:transparent] [&::-webkit-details-marker]:hidden [&::marker]:hidden after:content-['▶'] after:text-[0.65rem] after:ml-1 after:transition-transform after:duration-200 group-open:after:rotate-90 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2">
          {strings.PAGE_PRODUCTLIST_MOSTRAR_INDICACIONES}
        </summary>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-open:grid-rows-[1fr]">
          <div className="overflow-hidden px-4 py-2.5 text-gray-700 dark:text-gray-200 leading-relaxed">
            {comentarios}
          </div>
        </div>
      </details>
    </div> */}