import React from 'react';
import Season from '../../classes/Season';
import Header from '../lilbabies/Header';

type MaxiChallengeProps = {
    season: Season | null
}

export default class MaxiChallenge extends React.Component<MaxiChallengeProps, {}> {
    render() {
        return <div>
            <Header
                text="Maxi Challenge!"
            />
            {this.props.season &&
                <div className="mainPart" id="MainBlock">
                    
                </div>
            }
        </div>;
    }
}