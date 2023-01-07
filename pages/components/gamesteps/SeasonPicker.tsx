import React from "react";
import Season from "../../classes/Season";
import Button from "../lilbabies/Button";
import Header from "../lilbabies/Header";

type SeasonPickerProps = {
    seasons: Array<Season>,
    startSeason: (season: Season) => void
}

export default class SeasonPicker extends React.Component<SeasonPickerProps, {}> {
    constructor(props: SeasonPickerProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Header
                text="Drag Race Simulator!"
            />
            <div className="mainPart" id="MainBlock">
                {this.props.seasons.map(season => (
                    <Button text={season.getName()} onClick={() => this.props.startSeason(season)} key={season.getName() + ' predef selection'}/>
                ))}
            </div>
        </div>
    }
}
