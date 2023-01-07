import React from 'react';
import Season from '../../classes/Season';
import Header from '../lil_babies/Header';

type SeasonProgressProps = {
    season: Season | null
}

export default class SeasonProgress extends React.Component<SeasonProgressProps, {}> {
    render() { // TODO do this later
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
