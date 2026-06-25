import { ButtonForm } from "@/components";
import { Layout } from "@/components/Layout/Layout";
import { Loading } from "@/components/Loading/Loading";

interface WizardProps {
    children: React.ReactNode;
    step: number;
    title: string;
    description: string;
    isLoading: boolean;
    handleSubmit?: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    titleButton: string;
}

export const Wizard = ({ children, step, title, description, isLoading, handleSubmit, titleButton }: WizardProps) => {
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

    return (
        <Layout>
            <div className="mx-auto mt-8 max-w-md">
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
                    className="mt-6 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    {children}

                    <ButtonForm
                        disabled={isLoading}
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        {titleButton}
                    </ButtonForm>
                </form>
            </div>
            {isLoading && <Loading />}
        </Layout>
    );
};