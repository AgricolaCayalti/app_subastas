import { TopBar } from "../TopBar/TopBar";

export const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
        <div className="flex flex-col justify-center background-gray background-imgmain">
            <TopBar bgColor="white" ftColor="primary" title={title} shouldShowBackBtn={true} />
            <div className="px-8 py-20">
                {children}
            </div>
        </div >
    );
};