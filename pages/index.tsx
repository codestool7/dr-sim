import React from 'react';
import Queen from './classes/Queen';
import Season from './classes/Season';
import NavBar from './components/NavBar';
import QueenStats from './components/QueenStats';
import Sim from './components/Sim';
import ToTop from './components/ToTop';
import { NavBarTab } from './misc/enums';
import fetchData from './utils/fetchData';

type AppState = {
    queens: Array<Queen>,
    seasons: Array<Season>,
    selectedTab: NavBarTab
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        let data = fetchData();
        this.state = {queens: data.queens, seasons: data.seasons, selectedTab: NavBarTab.CustomSeason};
    }

    selectTab = (tab: NavBarTab) => {
        this.setState({selectedTab: tab});
    }

    render() {
        return (
            <div>
                <NavBar selectTab={this.selectTab}/>
                {this.state.selectedTab == NavBarTab.CustomSeason && <Sim queens={this.state.queens}/>}
                {this.state.selectedTab == NavBarTab.PredefSeason && <Sim queens={this.state.queens} seasons={this.state.seasons}/>}
                {this.state.selectedTab == NavBarTab.QueenStats && <QueenStats queens={this.state.queens}/>}
                <ToTop />
            </div>
        );
    }
}
