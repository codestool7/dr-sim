import React from 'react';
import Episode from '../../classes/Episode';
import { MiniType } from '../../misc/enums';
import BoldText from '../lil_babies/BoldText';
import Header from '../lil_babies/Header';
import QueenPic from '../lil_babies/QueenPic';
import QueenPicRow from '../lil_babies/QueenPicRow';
import Reads from '../sometimes_parts/Reads';

type MiniChallengeProps = {
    episode: Episode
}

export default class MiniChallenge extends React.Component<MiniChallengeProps, {}> {
    constructor(props: MiniChallengeProps) {
        super(props);
    }

    render() {
        return <div>
            <Header
                text="Mini Challenge!"
            />
            <div className="mainPart" id="MainBlock">
                <BoldText text={this.props.episode.miniChallenge.description}/>
                <hr />
                {this.props.episode.miniChallenge.type == MiniType.Reading &&
                    <Reads />
                }
                {this.props.episode.miniWinners.length == 1 &&
                    <div>
                        <QueenPic queen={this.props.episode.miniWinners[0]} color="royalblue"/>
                        <BoldText text={this.props.episode.miniWinners[0].name + " won the mini-challenge!"}/>
                    </div>
                }
                {this.props.episode.miniWinners.length == 2 &&
                    <div>
                        <QueenPicRow queens={this.props.episode.miniWinners} color="royalblue"/>
                        <BoldText text={this.props.episode.miniWinners[0].name + " and " + this.props.episode.miniWinners[1].name + " won the mini-challenge!"}/>
                    </div>
                }
            </div>
        </div>;
    }

    // TODO this component just needs to roll reads
}


/* 

function miniChallenge() {
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].miniWinner = false;
    }
    let miniChallengeScreen = new Scene();
    miniChallengeScreen.clean();
    miniChallengeScreen.createHeader("Mini-challenge!");
    if (premiereCounter == 3 && s14Premiere) {
        s14ElimReturn();
        premiereCounter++;
    }
    miniChallengeScreen.createBold("", "Description");
    miniChallengeScreen.createHorizontalLine();
    document.body.style.backgroundImage = "url('image/werkroom.webp')";
    let challenge = new MiniChallenge();
    challenge.generateDescription();
    challenge.rankPerformances();
    
}

function readingChallenge() {
    let screen = new Scene();
    for (let a = 0; a < currentCast.length; a++) {
        if (a == 0) {
            screen.createImage(currentCast[0].image, "black");
            screen.createBold("First up... " + currentCast[0].getName() + "!!");
        } else if (a == currentCast.length - 1) {
            screen.createImage(currentCast[a].image, "black");
            screen.createBold("And last but not least... " + currentCast[a].getName() + "!!");
        } else {
            screen.createImage(currentCast[a].image, "black");
            screen.createBold("Next is... " + currentCast[a].getName() + "!!");
        }
        let firstOne;
        let queenReaded;
        for (let i = 0; i < 2; i++) {
            if (firstOne == undefined) {
                queenReaded = pickRandomlyFromArray(currentCast);
                while (currentCast[a].getName() == queenReaded.getName()) {
                    queenReaded = pickRandomlyFromArray(currentCast);
                }
            } else {
                queenReaded = pickRandomlyFromArray(currentCast);
                while (currentCast[a].getName() == queenReaded.getName() || queenReaded.getName() == firstOne.getName()) {
                    queenReaded = pickRandomlyFromArray(currentCast);
                }
            }
            screen.createImage(queenReaded.image, "lightgreen");
            screen.createBold("to: " + queenReaded.getName());
            if (i == 0) {
                firstOne = queenReaded;
            }
            let read = queensReads.find((queens) => {
                return queens.queen == queenReaded.getName()
            });
            if (read != undefined) {
                if (read.reads.length < 1) {
                    read = queensReads.find((queens) => {
                        return queens.queen == "General"
                    });
                    screen.createBold(pickRandomlyFromArray(read.reads));
                } else {
                    screen.createBold(pickRandomlyFromArray(read.reads));
                }
            } else {
                read = queensReads.find((queens) => {
                    return queens.queen == "General"
                });
                screen.createBold(pickRandomlyFromArray(read.reads));
            }
            read.reads.splice(readNumber, 1);
            if (randomNumber(100) >= 99) {
                i--;
            }
        }
        screen.createHorizontalLine();
    }
}

let readingCheck = false;

let allReads = [...queensReads]; */