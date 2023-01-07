import React from 'react';
import Season from '../../classes/Season';
import { miniChallengeDescriptions1, miniChallengeDescriptions2 } from '../../misc/constants';
import { MiniType } from '../../misc/enums';
import { pickRandomlyFromArray } from '../../utils/utils';
import BoldText from '../lil_babies/BoldText';
import Header from '../lil_babies/Header';
import QueenPic from '../lil_babies/QueenPic';
import Reads from '../sometimes_parts/Reads';

type MiniChallengeProps = {
    season: Season | null
}

type MiniChallengeState = {
    type: MiniType,
    description: string
}

export default class MiniChallenge extends React.Component<MiniChallengeProps, MiniChallengeState> {
    constructor(props: MiniChallengeProps) {
        super(props);
        this.generateChallenge();
    }

    generateChallenge() {
        let type;
        let description;
        if (false) { // TODO add logic
            type = MiniType.Reading;
            description = "The library is open! In today's mini-challenge, the queens will read each other!";
        } else if (false) {
            type = MiniType.Puppet;
            description = "Bring in the puppets! The queens will parody each other using puppets!";
        } else {
            type = MiniType.Standard;
            description = "In today's mini-challenge, the queens will " + pickRandomlyFromArray(miniChallengeDescriptions1) + " " + pickRandomlyFromArray(miniChallengeDescriptions2);
        }
        this.state = { type: type, description: description };
    }

    render() {
        return <div>
            <Header
                text="Mini Challenge!"
            />
            {this.props.season &&
                <div className="mainPart" id="MainBlock">
                    <BoldText text={this.state.description}/>
                    <hr />
                    {this.state.type == MiniType.Reading &&
                        <Reads />
                    }
                    {/* queenpic of winner */}
                    {/* boldtext of winner */}
                </div>
            }
        </div>;
    }
}


/* 

/*

export class MiniChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        //reading and puppet challenges:
        if (totalCastSize >= 10 && currentCast.length == 7 && !all_stars && !lipsync_assassin && !all_winners && episodeCount > 3 && !readingCheck || currentCast.length == totalCastSize && (all_stars || lipsync_assassin) && !readingCheck || episodeCount == 1 && all_winners && !readingCheck) {
            description.innerHTML = "The library is open! In today's mini-challenge, the queens will read each other!";
            readingCheck = true;
            readingChallenge();
        }
        else if (totalCastSize != 5 && currentCast.length == 5) {
            description.innerHTML = "Bring in the puppets! The queens will parody each other using puppets!";
        }
        else {
            description.innerHTML = "In today's mini-challenge, the queens will do " + pickRandomlyFromArray(miniChallengeDescriptions1) + " " + pickRandomlyFromArray(miniChallengeDescriptions2);
        }
    }
    rankPerformances() {
        let screen = new Scene();
        if (team) {
            let winner = pickRandomlyFromArray(currentCast);
            screen.createImage(winner.QueenA.image, "royalblue");
            screen.createImage(winner.QueenB.image, "royalblue");
            screen.createBold(`${winner.getName()} won the mini-challenge!`);
            winner.miniEpisode.push(episodeCount);
            winner.QueenA.miniEpisode.push(episodeCount);
            winner.QueenB.miniEpisode.push(episodeCount);
        } else {
            if (randomNumber(100) <= 90) {
                let winner = pickRandomlyFromArray(currentCast);
                screen.createImage(winner.image, "royalblue");
                screen.createBold(`${winner.getName()} won the mini-challenge!`);
                winner.miniEpisode.push(episodeCount);
                winner.miniWinner = true;
            }else {
                let winner = pickRandomlyFromArray(currentCast);
                let second;
                do{
                    second = pickRandomlyFromArray(currentCast);
                } while (second == winner);
                screen.createImage(winner.image, "royalblue");
                screen.createImage(second.image, "royalblue");
                screen.createBold(`${winner.getName()} and ${second.getName()} won the mini-challenge!`);
                winner.miniEpisode.push(episodeCount);
                second.miniEpisode.push(episodeCount);
                winner.miniWinner = true;
                second.miniWinner = true;
            }
        }
    }
}



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
    let challenges = ["actingChallenge()", "improvChallenge()", "marketingChallenge()", "danceChallenge()", "designChallenge()", "comedyChallenge()", "talentshow()"];
    //remove from possible challenges list:
    if (talentShowCounter || (all_stars || all_winners || lipsync_assassin))
        challenges.splice(challenges.indexOf("talentshow()"), 1);
    if (actingChallengeCounter == 3 && totalCastSize > 15 || actingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("actingChallenge()"), 1);
    if (comedyChallengeCounter == 3 && totalCastSize > 15 || comedyChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("comedyChallenge()"), 1);
    if (marketingChallengeCounter == 3 && totalCastSize > 15 || marketingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("marketingChallenge()"), 1);
    if (danceChallengeCounter == 2 && totalCastSize > 15 || danceChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("danceChallenge()"), 1);
    if (designChallengeCounter == 3 && totalCastSize > 15 || designChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("designChallenge()"), 1);
    if (improvChallengeCounter == 3&& totalCastSize > 15 || improvChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("improvChallenge()"), 1);
    createChallenge(challenges, miniChallengeScreen);
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