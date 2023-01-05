import React from 'react';
import Season from '../classes/Season';
import Header from './lilbabies/Header';

type SeasonProgressProps = {
    season: Season | null
}

export default class SeasonProgress extends React.Component<SeasonProgressProps, {}> {
    render() {
        return <div>
            <Header
                text="Season Progress"
            />
            {this.props.season &&
                <div className="mainPart" id="MainBlock">
                </div>
            }
        </div>;
    }
}