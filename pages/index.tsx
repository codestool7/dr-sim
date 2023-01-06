import React from 'react';
import NavBar from './components/NavBar';
import Sim from './components/Sim';
import ToTop from './components/ToTop';
import { NavBarTab } from './misc/enums';

type AppState = {
    selectedTab: NavBarTab
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {selectedTab: NavBarTab.CustomSeason};
    }

    selectTab = (tab: NavBarTab) => {
        this.setState({selectedTab: tab});
    }

    render() {
        return (
            <div>
                <NavBar selectTab={this.selectTab}/>
                {this.state.selectedTab == NavBarTab.CustomSeason && <Sim />}
                {this.state.selectedTab == NavBarTab.QueenStats && <div />}
                <ToTop />
            </div>
        );
    }
}
