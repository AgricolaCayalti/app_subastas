import { useUI } from '../../hooks';

export const Loading = () => {
    const { strings } = useUI();

    return (        
        <div className = "absolute inset-0 bg-black/30 flex items-center justify-center z-900 backdrop-blur-sm gap-2">
            <div className="flex flex-col items-center space-y-4">  
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium text-white">{strings.LOADING}</p>
            </div>
        </div >
    )
}