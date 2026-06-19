import { useUI } from '../../hooks';

export const Loading = () => {
    const { strings } = useUI();
    
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">{strings.LOADING}</p>
            </div>
        </div>
    )
};