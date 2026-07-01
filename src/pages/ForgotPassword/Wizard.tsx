import { ButtonForm } from "@/components";
import { Layout } from "@/components/Layout/Layout";
import { Loading } from "@/components/Loading/Loading";
import { useForgotPassword } from "./useForgotPassword";
import { MdOutlineTimer } from "react-icons/md";

interface WizardProps {
    children: React.ReactNode;
    form: string;
    step: number;
    title: string;
    description: string;
    isLoading: boolean;
    handleSubmit?: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    titleButton: string;
}

export const Wizard = ({ children, form, step, title, description, isLoading, handleSubmit, titleButton }: WizardProps) => {
    const { strings, clear, timeLeft } = useForgotPassword();
    const renderStepper = () => (
        <div className="flex items-center justify-center gap-2 mb-6">
            {[0, 1, 2].map((s) => (
                <div
                    key={s}
                    className={`h-2 w-12 rounded-full transition-colors ${s === step
                        ? 'bg-blue-600'
                        : s < step
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                />
            ))}
        </div>
    );

    const isExpired = timeLeft.includes('expirado');

    return (
        <Layout>
            <div className="m-7">
                {renderStepper()}
                <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {description}
                    </p>
                </div>
                <form
                    key={form}
                    className="mt-6 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    {
                        timeLeft && (
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <MdOutlineTimer size={25} color='blue' />
                                <span
                                    className={`text-lg font-semibold ${isExpired ? 'text-red-600' : 'text-blue-600'
                                        }`}
                                >
                                    {timeLeft || 'Cargando...'}
                                </span>
                            </div>
                        )
                    }
                    {children}
                    <ButtonForm
                        disabled={isLoading || isExpired}
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {titleButton}
                    </ButtonForm>
                </form>
                {isExpired && (
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={clear}
                            className="text-sm font-medium text-blue-600 underline transition hover:text-blue-800"
                        >
                            {strings.PAGE_FORGFOTPASSWORD_RESEND_CODE}
                        </button>
                    </div>
                )}
            </div>
            {isLoading && <Loading />}
        </Layout>
    );
};