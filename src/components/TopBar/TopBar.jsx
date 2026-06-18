import { BackButton } from "../BackButton/BackButton";
import  './TopBar.css';

export const TopBar = ({title, bgColor = "primary", ftColor = "white", shouldShowBackBtn = false}) => {
    return <div className="Topbar_main" style={{backgroundColor: `var(--${bgColor})`, color: `var(--${ftColor})`}} >
        {
            shouldShowBackBtn && 
                <BackButton color={ftColor} />
        }
        <h3>{ title }</h3>
    </div>
};