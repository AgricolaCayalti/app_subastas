import { useUI } from "@/hooks";
import { TopBar } from "../TopBar/TopBar";

export const Layout = ({ children, title = "" }: { children: React.ReactNode; title?: string }) => {
    const { strings } = useUI();
    return (
        <div className="flex flex-col justify-center background-gray background-imgmain">
            <TopBar bgColor="white" ftColor="primary" title={title || strings.TITLE_PAGE_NAME} shouldShowBackBtn={true} />
            <div className="px-8 py-20">
                {children}
            </div>
        </div >
    );
};