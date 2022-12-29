import React from 'react';
import { AppProps, AppState } from '../misc/types';

export default class ClassPicker extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
    }

    render() {
        return <div className="mainPart" id="MainBlock">
            <p><big>This is your chance to simulate a drag race season with all your favorite contestants!</big></p>
            <div className="search-wrapper">
                <big><label /*for="search"*/>Choose your contestants:</label></big>
                <input type="search" id="search" className="searchInput" placeholder="Type a name.." data-search></input>
            </div>
            <div>
                <button onClick={addRandomContestant} id="randomK">Random</button>
            </div>
            <div className="drag-cards" data-drag-cards-container></div>
            <template data-drag-template>
                <div className="card hide">
                    <div className="data-image" data-image></div>
                    <div className="header" data-header></div>
                </div>
            </template>
            <hr></hr>
            <big className="hide" id="castBig">Current Cast: <br></br></big>
            <div id="chosenKweens" className="drag-cards"></div>
        </div>;
    }
}
