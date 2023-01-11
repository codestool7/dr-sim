import React from 'react';
import Queen from '../../classes/competitors/Queen';
import Episode from '../../classes/Episode';
import { queensReads } from '../../misc/constants';
import { MiniType } from '../../misc/enums';
import { pickRandomlyFromArray, pickRandomlyFromArrayExcluding } from '../../utils/utils';
import BoldText from '../lil_babies/BoldText';
import Header from '../lil_babies/Header';
import QueenPic from '../lil_babies/QueenPic';
import QueenPicRow from '../lil_babies/QueenPicRow';

type MiniChallengeProps = {
    episode: Episode,
    activeQueens: Array<Queen>
}

type MiniChallengeState = {
    allQueensReads: Array<QueensReads>
}

type QueensReads = {
    reader: Queen,
    reads: Array<Read>
}

type Read = {
    victim: Queen,
    read: string
}

export default class MiniChallenge extends React.Component<MiniChallengeProps, MiniChallengeState> {
    constructor(props: MiniChallengeProps) {
        super(props);
        this.state = { allQueensReads: this.rollReads() };
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
                    this.state.allQueensReads.map((queensreads) => (
                        <div>
                            <QueenPic queen={queensreads.reader} key={queensreads.reader.name + ' mini reader pic'}/>
                            <BoldText text={queensreads.reader.name} />
                            <QueenPic queen={queensreads.reads[0].victim} key={queensreads.reader.name + ' mini victim 1 pic'}/>
                            <BoldText text={queensreads.reads[0].victim.name} />
                            <BoldText text={queensreads.reads[0].read} />
                            <QueenPic queen={queensreads.reads[1].victim} key={queensreads.reader.name + ' mini victim 2 pic'}/>
                            <BoldText text={queensreads.reads[1].victim.name} />
                            <BoldText text={queensreads.reads[1].read} />
                            <hr />
                        </div>
                    ))
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

    rollReads() {
        const allQueensReads = new Array<QueensReads>;

        for (let i = 0; i < this.props.activeQueens.length; i++) {
            let reader = this.props.activeQueens[i];
            let readableQueens = this.props.activeQueens.filter(queen => queen.name != reader.name);

            let victim1 = pickRandomlyFromArray(readableQueens);
            let read1 = this.getRead(queensReads, victim1);

            let nowReadableQueens = readableQueens.filter(queen => queen.name != victim1.name);
            
            let victim2 = pickRandomlyFromArray(nowReadableQueens);
            let read2 = this.getRead(queensReads, victim2, read1);

            allQueensReads.push({
                reader: reader,
                reads: [
                    { victim: victim1, read: read1 },
                    { victim: victim2, read: read2 }
                ]
            });
        }

        return allQueensReads;
    }

    getRead(possibleReads: Array<{queen: string, reads: Array<string>}>, queen: Queen, exclude?: string): string {
        let options;
        if ((options = possibleReads.find(el => el.queen == queen.name)) || (options = possibleReads.find(el => el.queen == "General"))) {
            if (exclude) {
                return pickRandomlyFromArrayExcluding(options.reads, exclude);
            } else {
                return pickRandomlyFromArray(options.reads);
            }
        } else {
            throw new Error("no read found :(");
        }
    }
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