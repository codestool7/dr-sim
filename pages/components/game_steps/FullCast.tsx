import React from 'react';
import Season from '../../classes/Season';
import BoldText from '../lil_babies/BoldText';
import Header from '../lil_babies/Header';
import QueenPic from '../lil_babies/QueenPic';

type FullCastProps = {
    season: Season | null
}

export default class FullCast extends React.Component<FullCastProps, {}> {
    render() {
        return <div>
            <Header
                text="Full Cast"
            />
            {this.props.season &&
                <div className="mainPart" id="MainBlock">
                    {this.props.season.queens.map(queen => (
                        <div key={queen.name + ' full cast section'}>
                            <QueenPic queen={queen} key={queen.name + ' full cast queen pic'}/>
                            <BoldText text={queen.name} key={queen.name + ' full cast bold text'}/>
                        </div>
                    ))}
                </div>
            }
        </div>;
    }
}
