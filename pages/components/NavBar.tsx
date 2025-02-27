import { NavBarTab } from "../misc/enums";
import Tab from "./lil_babies/Tab";

type NavBarProps = {
    selectTab: (tab: NavBarTab) => void
}

export default function NavBar(props: NavBarProps) {
    return <div className="navbar">
        <Tab text="Custom Season" onClick={() => props.selectTab(NavBarTab.CustomSeason)}/>
        <Tab text="Predef Season" onClick={() => props.selectTab(NavBarTab.PredefSeason)}/>
        <Tab text="Queen Stats" onClick={() => props.selectTab(NavBarTab.QueenStats)}/>
    </div>;
}
