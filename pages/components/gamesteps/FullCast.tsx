import React from 'react';
import Season from '../../classes/Season';
import BoldText from '../lilbabies/BoldText';
import Header from '../lilbabies/Header';
import QueenPic from '../lilbabies/QueenPic';

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
                    {this.props.season.getQueens().map(queen => (
                        <div>
                            <QueenPic queen={queen}/>
                            <BoldText text={queen.getName()} />
                        </div>
                    ))}
                </div>
            }
        </div>;
    }
}
