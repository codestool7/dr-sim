import { NavBarTab } from "../misc/enums";
import Tab from "./lilbabies/Tab";

type NavBarProps = {
    selectTab: (tab: NavBarTab) => void
}

export default function NavBar(props: NavBarProps) {
    return <div className="navbar">
        <Tab text="Custom Season" onClick={() => props.selectTab(NavBarTab.CustomSeason)}/>
        <Tab text="Queen Stats" onClick={() => props.selectTab(NavBarTab.QueenStats)}/>
    </div>;
}
