import { useUI } from "@/hooks";
import { TopBar } from "../TopBar/TopBar";
import clsx from "clsx";
 import { useCapacitorJS } from "@/hooks/useCapacitorJS";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    bgColor?: string;
    ftColor?: string;
    shouldShowBackBtn?: boolean;
}

export const Layout = ({
    children,
    title = "",
    bgColor = "primary",
    ftColor = "white",
    shouldShowBackBtn = true,
}: LayoutProps) => {
    const { strings } = useUI();
useCapacitorJS('/main');
    return (
        <div
            className={clsx(
                "flex flex-col",
                "h-dvh", // Altura dinámica (excluye barras del sistema)
                "overflow-hidden",
            )}
        >
            <TopBar
                bgColor={bgColor}
                ftColor={ftColor}
                title={title || strings?.TITLE_PAGE_NAME || "App"}
                shouldShowBackBtn={shouldShowBackBtn}
            />

            <main
                className={clsx(
                    "flex-1",
                    "overflow-y-auto",
                    "background-imgmain",
                    // Padding superior: altura del TopBar (3.5rem) + safe area superior
                    "pt-[calc(env(safe-area-inset-top)+3.5rem)]",
                    // Padding inferior: safe area inferior (para la barra del sistema)
                    "pb-[env(safe-area-inset-bottom)]",
                    // Padding lateral para notch (opcional)
                    "px-[env(safe-area-inset-left)]",
                    "pr-[env(safe-area-inset-right)]"
                )}
            >
                {children}
            </main>
        </div>
    );
};