import { useUI } from "@/hooks";
import { TopBar } from "../TopBar/TopBar";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    bgColor?: string;
    ftColor?: string;
    shouldShowBackBtn?: boolean;
}

export const Layout = ({ children, title = "", bgColor = "white", ftColor = "primary", shouldShowBackBtn = true }: LayoutProps) => {
    const { strings } = useUI();
    return (
        <div className="flex flex-col justify-center background-gray">
            <TopBar bgColor={bgColor} ftColor={ftColor} title={title || strings.TITLE_PAGE_NAME} shouldShowBackBtn={shouldShowBackBtn} />
            <div className="background-imgmain h-screen mt-15">
                {children}
            </div>
        </div >
    );
};

// background-imgmain