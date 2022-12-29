import React from 'react';
import { AppProps, AppState } from '../misc/types';
import Header from './Header';
import CastPicker from "./CastPicker";
import { pickRandomlyFromArray, pickBallTheme, randomNumber, randomNumberWithMin } from "../misc/utils";
import { Scene, MiniChallenge, ActingChallenge, ComedyChallenge, MarketingChallenge, DanceChallenge, DesignChallenge, RunwayChallenge, ImprovChallenge, SnatchGame, Rusical, Ball, Rumix, GirlGroup, TalentShow } from "./classes";
import {queensReads, whoWhyCompetition, whoWhyRelation, lipsyncsEventsBad, lipsyncsEventsGood, miniChallengeDescriptions1, miniChallengeDescriptions2, actingChallengeDescriptions1, actingChallengeDescriptions2, comedyChallengeDescriptions1, comedyChallengeDescriptions2, marketingDescriptions1, marketingDescriptions2, danceDescriptions, designDescriptions, makeoverOptions, runwayDescriptions, improvDescriptions, rusicalDescriptions, themedBallDescriptions, ballDescriptions1, ballDescriptions2, ballDescriptions3, rumixDescriptions, girlGroupDescriptions, talentOptions, reasoningQueens, twoQueensRelation1, twoQueensRelation2, twoQueensRelation3, twoQueensRelation3_2, twoQueensRelation4, twoQueensRelation4_2, twoQueensRelation5, threeQueensRelation1, threeQueensRelation2, threeQueensRelation3, threeQueensRelation4, fourQueensRelation1, fourQueensRelation2, fourQueensRelation3, fourQueensRelation4, multipleQueensRelation} from "../misc/constants";

export default class Sim extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
    }

    render() {
        return <div>
            <Header />
            <CastPicker/>
        </div>;
    }
}

//mini-challenge stuff:

//challenge modifiers:
let actingChallengeCounter = 0;
let comedyChallengeCounter = 0;
let marketingChallengeCounter = 0;
let danceChallengeCounter = 0;
let designChallengeCounter = 0;
let improvChallengeCounter = 0;
var isDesignChallenge = false;
let rusicalCounter = false;
let ballCounter = false;
let talentShowCounter = false;
let girlGroupCounter = false;
let makeoverCounter = false;
let snatchCounter = false;
let rumixCounter = false;
let lastChallenge = '';
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
//GENERAL CHALLENGES:
let team1 = [];
let team2 = [];
let team3 = [];
let team4 = [];
let team5 = [];
let isTeamChallenge = false;
let isPairChallenge = false;

function actingChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ActingChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    actingChallengeCounter++;
    isDesignChallenge = false;
    episodeChallenges.push("Acting");
    queensPerformances();
}

function comedyChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ComedyChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length == 10 && !isPairChallenge && regularFormat){
        isPairChallenge = true;
        pairMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    comedyChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function marketingChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new MarketingChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    marketingChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function danceChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new DanceChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 70 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    danceChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function designChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new DesignChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length == 10 && !isPairChallenge && regularFormat && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens && episodeCount > 1){
        isPairChallenge = true;
        pairMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    isDesignChallenge = true;
    queensPerformances();
    designChallengeCounter++;
    if ((currentCast.length == 6 || currentCast.length == 5)&& makeoverCounter == false && team == false && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens) {
        episodeChallenges.push("Make Over");
        makeoverCounter = true;
    }
    else if (currentCast.length == totalCastSize && (uk3Premiere || s9Premiere) && !s9PremiereCheck && !uk3PremiereCheck){
        episodeChallenges.push("Runway");
    }
    else if (currentCast.length == totalCastSize - 1 && s9Premiere && !s9PremiereCheck)
        episodeChallenges.push("Runway");
    else
        episodeChallenges.push("Design");
}

function runwayChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Runway-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new RunwayChallenge();
    challenge.generateDescription();
    challenge.rankPerformances();
    let slay = currentCast.filter(function (queen) { return queen.performanceScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.performanceScore >= 26; });
    createRunwayDesc(slay, great, good, bad);
    challengeScreen.createButton("Proceed", "judging()");
}

function improvChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ImprovChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    improvChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}
//SPECIAL CHALLENGES:

function snatchGame() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new SnatchGame();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    snatchCounter = true;
    queensPerformances();
}

function rusical() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Rusical();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    rusicalCounter = true;
    queensPerformances();
    episodeChallenges.push("Rusical");
}

function ball() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Ball();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = true;
    queensPerformances();
    ballCounter = true;
    episodeChallenges.push("Ball");
}

function rumix() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Rumix();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    episodeChallenges.push("Rumix");
    rumixCounter = true;
    queensPerformances();
}

function girlgroup() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new GirlGroup();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat && episodeCount > 3) {
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    isDesignChallenge = false;
    episodeChallenges.push("Girl Group");
    if (((s12Premiere || porkchopPremiere) && episodeCount <= 2)) {
        girlGroupCounter = false;
    } else {
        girlGroupCounter = true;
    }
    queensPerformances();
}

function talentshow() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new TalentShow();
    challenge.generateDescription();
    queenTalents();
    challenge.rankPerformances();
    isDesignChallenge = true;
    episodeChallenges.push("Talent Show");
    if (!(s14Premiere && episodeCount == 1)) {
        talentShowCounter = true;
    }
    queensPerformances();
}
//performance:
function queensPerformances() {
    let performanceScreen = new Scene();
    performanceScreen.createHorizontalLine();
    performanceScreen.createBigText("Queens' performances...");
    let slay = currentCast.filter(function (queen) { return queen.performanceScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.performanceScore >= 26 && queen.performanceScore < 31; });
    let flop = currentCast.filter(function (queen) { return queen.performanceScore >= 31 && queen.performanceScore < 50; });
    createPerformanceDesc(slay, great, good, bad, flop);
    if (isDesignChallenge == true || episodeChallenges[episodeChallenges.length - 1] == "Design") {
        performanceScreen.createButton("Proceed", "judging()");
    } else if (thailandFormat && isDesignChallenge == false) {
        if (s12Premiere && episodeCount < 3 || porkchopPremiere && episodeCount < 4) {
            performanceScreen.createButton("Proceed", "runway()", "button2");
        } else {
            performanceScreen.createButton("Proceed", "maxiWin()");
        }
    } else if (thailandFormat && isDesignChallenge == true) {
            performanceScreen.createButton("Proceed", "judgingThailand()");
    } else {
        performanceScreen.createButton("Proceed", "runway()", "button2");
    }
}
function maxiWin() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Maxi Challenge Winner!");
    screen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/werkroom.webp')";
    currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (currentCast[0].performanceScore == currentCast[1].performanceScore && randomNumber(100) < 60) {
        currentCast[0].addToTrackRecord(" WIN");
        currentCast[1].addToTrackRecord(" WIN");
        currentCast[0].favoritism += 4;
        currentCast[1].favoritism += 4;
        currentCast[0].maxiT = true;
        currentCast[1].maxiT = true;
        screen.createImage(currentCast[0].image, "darkblue");
        screen.createImage(currentCast[1].image, "darkblue");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", condragulations, You are the winners of this weeks Maxi Challenge!");
    } else {
        screen.createImage(currentCast[0].image, "cyan");
        screen.createBold(currentCast[0].getName() + ", condragulations! You are the winner of this weeks Maxi Challenge!");
        currentCast[0].addToTrackRecord("WIN");
        currentCast[0].favoritism += 4;
        currentCast[0].maxiT = true;
    }
    screen.createHorizontalLine();
    screen.createButton("Proceed", "runwayChallenge()");
}
function teamMaking() {
    let screen = new Scene();
    team1 = [];
    team2 = [];
    team3 = [];
    let teamCaptains = [];
    let twoOrThree = false;
    let castTeams = currentCast.slice();
    for (let i = 0; i < currentCast.length; i++) {
        if (currentCast[i].miniWinner != undefined && currentCast[i].miniWinner == true) {
            teamCaptains.push(currentCast[i]);
            currentCast[i].miniWinner = false;
            castTeams.splice(castTeams.indexOf(currentCast[i]), 1);
        }
    }
    if (teamCaptains.length == 1) {
        team1.push(teamCaptains[0]);
        screen.createImage(teamCaptains[0].image, "blue");
        if (currentCast.length <= 8) {
            screen.createBold(teamCaptains[0].getName() + ", as the winner of the mini challenge you get to decide your team for today's challenge");
            screen.createHorizontalLine();
            if (currentCast.length == 6) {
                for (let i = 0; i < 2; i++) {
                    let member = bestSister(teamCaptains[0], castTeams);
                    team1.push(member);
                    castTeams.splice(castTeams.indexOf(member), 1);
                }
            }
            if (currentCast.length == 7) {
                if (randomNumber(11) <= 5) {
                    for (let i = 0; i < 2; i++) {
                        let member = bestSister(teamCaptains[0], castTeams);
                        team1.push(member);
                        castTeams.splice(castTeams.indexOf(member), 1);
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        let member = bestSister(teamCaptains[0], castTeams);
                        team1.push(member);
                        castTeams.splice(castTeams.indexOf(member), 1);
                    }
                }
            }
            if (currentCast.length == 8) {
                for (let i = 0; i < 3; i++) {
                    let member = bestSister(teamCaptains[0], castTeams);
                    team1.push(member);
                    castTeams.splice(castTeams.indexOf(member), 1);
                }
            }
            team2 = [...castTeams];
        }
        if (currentCast.length >= 9) {
            twoOrThree = true;
            screen.createBold(teamCaptains[0].getName() + ", as the winner of the mini challenge you get to decide the teams for today's challenge");
            screen.createHorizontalLine();
            let number = Math.floor(castTeams.length / 3);
            for (let i = 0; i < number; i++) { 
                let member = bestSister(teamCaptains[0], castTeams);
                team1.push(member);
                castTeams.splice(castTeams.indexOf(member), 1);
            }
            shuffle(castTeams);
            team2 = castTeams.splice(0, Math.floor(castTeams.length / 2));
            team3 = [...castTeams];
        }
        screen.createBigText("Team 1");
        screen.createImage(team1[0].image, "blue");
        let membersText = " chose ";
        for (let i = 1; i < team1.length; i++) {
            if (i == team1.length - 1) {
                membersText +=  " and " + team1[i].getName();
            } else {
                membersText += team1[i].getName() + ", ";
            }
            screen.createImage(team1[i].image, "blue");
        }
        screen.createBold(team1[0].getName() + membersText + ". And that makes you Team 1!");
        if (currentCast.length <= 8) {screen.createParagraph("This means...");} else {screen.createParagraph("And these are the other teams...");}
        let names = "";
        screen.createBigText("Team 2");
        for (let i = 0; i < team2.length; i++) {
            screen.createImage(team2[i].image, "pink");
            if (i == team2.length - 1) {
                names += team2[i].getName() + ".";
            } else {
                names += team2[i].getName() + ", ";
            }
        }
        screen.createBold(names +" You are team 2!");
        names = "";
        if (twoOrThree) {
            screen.createBigText("Team 3");
            for (let i = 0; i < team3.length; i++) {
                screen.createImage(team3[i].image, "green");
                if (i == team3.length - 1) {
                    names += team3[i].getName() + ".";
                } else {
                    names += team3[i].getName() + ", ";
                }
            }
            screen.createBold(names +" You are team 3!");
        }
    }
    if (teamCaptains.length == 2) {
        team1.push(teamCaptains[0]);
        team2.push(teamCaptains[1]);
        teamCaptains[0].tCaptain.push(episodeCount);
        teamCaptains[1].tCaptain.push(episodeCount);
        screen.createImage(teamCaptains[0].image, "blue");
        screen.createImage(teamCaptains[1].image, "pink");
        screen.createBold(teamCaptains[0].getName() + " and " + teamCaptains[1].getName() + ", as the winners of the mini challenge you get to decide your team for today's challenge");
        screen.createHorizontalLine();
        let number;
        if (currentCast.length <= 8) {
            number = Math.floor(castTeams.length / 2);
        } else {
            number = Math.floor(castTeams.length / 3);
        }
        for (let i = 0; i < number; i++) { 
            let member = bestSister(teamCaptains[0], castTeams);
            team1.push(member);
            castTeams.splice(castTeams.indexOf(member), 1);
            screen.createImage(teamCaptains[0].image, "blue");
            screen.createImage(member.image, "blue");
            screen.createBold(teamCaptains[0].getName() + " chose " + member.getName() + "!");
            if (castTeams.length != 0) {
                member = bestSister(teamCaptains[1], castTeams);
                team2.push(member);
                castTeams.splice(castTeams.indexOf(member), 1);
                screen.createImage(teamCaptains[1].image, "pink");
                screen.createImage(member.image, "pink");
                screen.createBold(teamCaptains[1].getName() + " chose " + member.getName() + "!");
            }
        }
        let names = "";
        screen.createBigText("Team 1");
        for (let i = 0; i < team1.length; i++) {
            screen.createImage(team1[i].image, "blue");
            if (i == team1.length - 1) {
                names += team1[i].getName() + ".";
            } else {
                names += team1[i].getName() + ", ";
            }
        }
        screen.createBold(names +" You are team 1!");
        names = "";
        screen.createBigText("Team 2");
        for (let i = 0; i < team2.length; i++) {
            screen.createImage(team2[i].image, "pink");
            if (i == team2.length - 1) {
                names += team2[i].getName() + ".";
            } else {
                names += team2[i].getName() + ", ";
            }
        }
        screen.createBold(names +" You are team 2!");
        if (currentCast.length >= 9) {
            twoOrThree = true;
            team3 = [...castTeams];
            screen.createParagraph("Those who didn't get picked will form a team...");
            names = "";
            screen.createBigText("Team 3");
            for (let i = 0; i < team3.length; i++) {
                screen.createImage(team3[i].image, "green");
                if (i == team3.length - 1) {
                    names += team3[i].getName() + ".";
                } else {
                    names += team3[i].getName() + ", ";
                }
            }
            screen.createBold(names +" You are team 3!");
        }
    }
}
function pairMaking() {
    let screen = new Scene();
    team1 = [];
    team2 = [];
    team3 = [];
    team4 = [];
    team5 = [];
    let castPairs = currentCast.slice();
    if (currentCast.length == 10) {
        for (let i = 0; i < 2; i++) {
            let queen = pickRandomlyFromArray(castPairs);
            team1.push(queen);
            castPairs.splice(castPairs.indexOf(queen), 1);
            queen = pickRandomlyFromArray(castPairs);
            team2.push(queen);
            castPairs.splice(castPairs.indexOf(queen), 1);
            queen = pickRandomlyFromArray(castPairs);
            team3.push(queen);
            castPairs.splice(castPairs.indexOf(queen), 1);
            queen = pickRandomlyFromArray(castPairs);
            team4.push(queen);
            castPairs.splice(castPairs.indexOf(queen), 1);
            queen = pickRandomlyFromArray(castPairs);
            team5.push(queen);
            castPairs.splice(castPairs.indexOf(queen), 1);
        }
        screen.createBigText("Pairs");
        screen.createImage(team1[0].image);
        screen.createImage(team1[1].image);
        screen.createBold(team1[0].getName() + " and " + team1[1].getName() + " are paired together.");
        screen.createImage(team2[0].image);
        screen.createImage(team2[1].image);
        screen.createBold(team2[0].getName() + " and " + team2[1].getName() + " are paired together.");
        screen.createImage(team3[0].image);
        screen.createImage(team3[1].image);
        screen.createBold(team3[0].getName() + " and " + team3[1].getName() + " are paired together.");
        screen.createImage(team4[0].image);
        screen.createImage(team4[1].image);
        screen.createBold(team4[0].getName() + " and " + team4[1].getName() + " are paired together.");
        screen.createImage(team5[0].image);
        screen.createImage(team5[1].image);
        screen.createBold(team5[0].getName() + " and " + team5[1].getName() + " are paired together.");
    }
}
//runway:
function runway() {
    let runwayScreen = new Scene();
    runwayScreen.createHorizontalLine();
    let button2 = document.querySelector("button#button2");
    button2.remove();
    runwayScreen.createRightClick();
    runwayScreen.createBigText("Runway!");
    runwayScreen.createParagraph("The queens will bring it to the runway!");
    if (currentCast.length > 4)
        runwayScreen.createParagraph("The theme is: " + pickRandomlyFromArray(runwayDescriptions));
    else if (currentCast.length == 4 && top3 || currentCast.length == 4 && (top4 || lftc || canFinale || allstars3Finale) || currentCast.length == 5 && top5 || currentCast.length == 3 && top3 || currentCast.length == 2 && team)
        runwayScreen.createParagraph("The theme is... best drag!");
    for (let i = 0; i < currentCast.length; i++)
        currentCast[i].getRunway();
    let slay = currentCast.filter(function (queen) { return queen.runwayScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.runwayScore >= 6 && queen.runwayScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.runwayScore >= 16 && queen.runwayScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.runwayScore >= 26; });
    createRunwayDesc(slay, great, good, bad);
    if ((currentCast.length == 4 || currentCast.length == 5) && porkchopPremiere && premiereCounter < 3)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 5 && top5)
        runwayScreen.createButton("Proceed", "finaleTop5Judging()");
    else if (currentCast.length == 4 && top3)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length > 4)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 4 && teamsF)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 3 && teamsF)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 4 && (top4 || canFinale))
        runwayScreen.createButton("Proceed", "finaleTop4Judging()");
    else if (currentCast.length == 3 && (top3 || canFinale))
        runwayScreen.createButton("Proceed", "finaleTop3Judging()");
    else if (currentCast.length == 2 && top2)
        runwayScreen.createButton("Proceed", "finaleJudging()");
    else if (currentCast.length == 4 && (allstars3Finale))
        runwayScreen.createButton("Proceed", "finaleJuryAS()");
    else if (currentCast.length == 2 && team)
        runwayScreen.createButton("Proceed", "finaleTeamJudging()");
}
//helper functions
////create next challenge
function createChallenge(challenges, miniChallengeScreen) {
    for (let i = 0; i < currentCast.length; i++){
        currentCast[i].episodesOn++;
    }
    //first design challenge for regular seasons
    if (currentCast.length == totalCastSize && regularFormat && episodeCount == 1 && s6Premiere == false || currentCast.length == totalCastSize && thailandFormat && episodeCount == 1 && s6Premiere == false || currentCast.length == totalCastSize && team || currentCast == firstCast && s6Premiere || currentCast == secondCast && s6Premiere)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //girl group challenge for s12 or porkchop premiere
    else if (premiereCounter <= 2 && (s12Premiere || porkchopPremiere) || all_winners && episodeCount == 6)
        miniChallengeScreen.createButton("Proceed", "girlgroup()");
    //uk3 premiere
    else if (currentCast.length == totalCastSize && uk3Premiere && !uk3PremiereCheck)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //s9 premiere
    else if (currentCast.length == totalCastSize - 1 && s9Premiere && !s9PremiereCheck)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //talent show for all stars and s14 premiere and all winners
    else if (currentCast.length == totalCastSize && !talentShowCounter && (all_stars || lipsync_assassin) || currentCast == firstCast && s14Premiere || currentCast == secondCast && s14Premiere || all_winners && currentCast.length <= 10 && episodeCount == 11 || all_winners && currentCast.length > 10 && episodeCount == 14)
        miniChallengeScreen.createButton("Proceed", "talentshow()");
    //rumix
    else if (all_winners && episodeCount == 1 || currentCast.length == 5 && !rumixCounter && lftc)
        miniChallengeScreen.createButton("Proceed", "rumix()");
    //snatch game for +12 cast
    else if ( all_winners && episodeCount == 2 || totalCastSize >= 12 && (currentCast.length == 10 || currentCast.length == 8) && (lftc || canFinale || teamsF || top4 || top5 || allstars3Finale) && !snatchCounter && !team || totalCastSize >= 12 && currentCast.length == 9 && (top3 || allstars3Finale) && !snatchCounter)
        miniChallengeScreen.createButton("Proceed", "snatchGame()");
    //snatch game for -12 cast
    else if (totalCastSize < 12 && currentCast.length == 6 && !snatchCounter && (lipsync_assassin) || totalCastSize < 12 && currentCast.length == randomNumberWithMin(7, 9) && !snatchCounter && !team || totalCastSize < 12 && currentCast.length == 7 && !snatchCounter && !team || totalCastSize >= 6 && currentCast.length == 5 && team)
        miniChallengeScreen.createButton("Proceed", "snatchGame()");
    //the ball for +12 casts or all winners
    else if (all_winners && episodeCount == 3 || totalCastSize >= 12 && ((currentCast.length == totalCastSize - 3 || currentCast.length == totalCastSize - 4) && !ballCounter && (lftc || canFinale || teamsF || top5 || allstars3Finale) && !team || currentCast.length == 5 && top4 && !ballCounter || currentCast.length == 4 && top3 && !ballCounter) || currentCast.length == 3 && team)
        miniChallengeScreen.createButton("Proceed", "ball()");
    //the ball for -12 casts
    else if (totalCastSize < 12 && (currentCast.length == 8 && randomNumber(100) <= 10 && !ballCounter || currentCast.length == 5 && top4 && !ballCounter || currentCast.length == 4 && top3 && !ballCounter))
        miniChallengeScreen.createButton("Proceed", "ball()");
    //Girl Group
    else if (totalCastSize >= 12 && (currentCast.length == 8 || currentCast.length == 9) && !girlGroupCounter && randomNumber(100) >= 50 || totalCastSize < 12 && currentCast.length == 6 && !girlGroupCounter && !kittyGirlGroup && randomNumber(100) >= 50)
        miniChallengeScreen.createButton("Proceed", "girlgroup()");
    //rusical
    else if (totalCastSize >= 12 && (currentCast.length == 11 || currentCast.length == 9) && !rusicalCounter && randomNumber(100) >= 50 || totalCastSize < 12 && currentCast.length == 7 && !rusicalCounter  && randomNumber(100) >= 50 || currentCast.length > 5 && randomNumber(21) >= 19 && team && !rusicalCounter)
        miniChallengeScreen.createButton("Proceed", "rusical()");
    //makeover
    else if (currentCast.length == 6 && (lftc || canFinale || teamsF || top4 || top5 || allstars3Finale) && !makeoverCounter && !team  && (regularFormat || thailandFormat) || currentCast.length == 5 && top3 && !makeoverCounter)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //if no conditions apply, create random challenge
    else {
        let currentChallenge;
        if (currentCast.length >= 11 && currentCast.length < 16) {
            currentChallenge = challenges[randomNumber(5)];
        } else if (totalCastSize < 11 && currentCast.length >= 4 && currentCast.length < 11) {
            currentChallenge = pickRandomlyFromArray(challenges);
        } else if (currentCast.length >= 4 && currentCast.length < 11) {
            currentChallenge = pickRandomlyFromArray(challenges);
        } else {
            currentChallenge = pickRandomlyFromArray(challenges);
        }
        if (currentChallenge == lastChallenge && currentCast.length != totalCastSize) {
            while (currentChallenge == lastChallenge) {
                if (currentCast.length >= 16) {
                    currentChallenge = pickRandomlyFromArray(challenges);
                } else if (currentCast.length >= 11 && currentCast.length < 16) {
                    currentChallenge = challenges[randomNumber(3)];
                } else if (currentCast.length >= 4 && currentCast.length < 11) {
                    currentChallenge = pickRandomlyFromArray(challenges);
                }
            }
        }
        lastChallenge = currentChallenge;
        miniChallengeScreen.createButton("Proceed", currentChallenge);

    }
}
////create performance descriptions CREATE NEW DESCRIPTIONS FOR THIS
function createPerformanceDesc(slay, great, good, bad, flop) {
    let screen = new Scene();
    if (slay.length !== 0) {
        for (let i = 0; i < slay.length; i++)
            screen.createImage(slay[i].image, "darkblue");
        screen.createBold("", "slay");
        let slayText = document.getElementById("slay");
        for (let i = 0; i < slay.length; i++)
            slayText.innerHTML += `${slay[i].getName()}, `;
        slayText.innerHTML += "slayed the challenge!";
    }
    if (great.length !== 0) {
        for (let i = 0; i < great.length; i++)
            screen.createImage(great[i].image, "royalblue");
        screen.createBold("", "great");
        let greatText = document.getElementById("great");
        for (let i = 0; i < great.length; i++)
            greatText.innerHTML += `${great[i].getName()}, `;
        greatText.innerHTML += "had a great performance!";
    }
    if (good.length !== 0) {
        for (let i = 0; i < good.length; i++)
            screen.createImage(good[i].image);
        screen.createBold("", "good");
        let goodText = document.getElementById("good");
        for (let i = 0; i < good.length; i++)
            goodText.innerHTML += `${good[i].getName()}, `;
        goodText.innerHTML += "had a good performance.";
    }
    if (bad.length !== 0) {
        for (let i = 0; i < bad.length; i++)
            screen.createImage(bad[i].image, "pink");
        screen.createBold("", "bad");
        let badText = document.getElementById("bad");
        for (let i = 0; i < bad.length; i++)
            badText.innerHTML += `${bad[i].getName()}, `;
        badText.innerHTML += "had a bad performance...";
    }
    if (flop.length !== 0) {
        for (let i = 0; i < flop.length; i++)
            screen.createImage(flop[i].image, "tomato");
        screen.createBold("", "flop");
        let flopText = document.getElementById("flop");
        for (let i = 0; i < flop.length; i++)
            flopText.innerHTML += `${flop[i].getName()}, `;
        flopText.innerHTML += "flopped the challenge...";
    }
    CheckForSpecialEvents(slay, great, good, bad, flop);
}
let floppers = false;
let floppersCheck = false;
let slayers = false;
let slayersCheck = false;
let slayersSmack = 0;
let bottom6WayLipsync = false;
let bottom6WayLipsyncCheck = false;
let s14LaLaPaRUZa = false;
let s14LaLaPaRUZaCheck = false;

function CheckForSpecialEvents(slay, great, good, bad, flop) {
    if (slay.length === 0 && great.length === 0 && currentCast.length >= 8 && !floppersCheck && randomNumber(100) >= 80 && !conjoinedCheck)
        floppers = true;
    if (slay.length == currentCast.length && !slayersCheck && !conjoinedCheck)
        slayers = true;
    else if (slay.length + great.length == currentCast.length && !slayersCheck && randomNumber(100) >= 70 && !conjoinedCheck)
        slayers = true;
    if (flop.length + bad.length >= 5 && flop.length + bad.length < 7 && currentCast.length >= 9 && !bottom6WayLipsyncCheck && randomNumber(100) >= 70 && !conjoinedCheck)
        bottom6WayLipsync = true;
    if (flop.length + bad.length >= 7 && great.length + slay.length + good.length > 0 && currentCast.length > 7 && currentCast.length < 10 &&!s14LaLaPaRUZaCheck && randomNumber(100) >= 70 && !conjoinedCheck)
        s14LaLaPaRUZa = true;
}
function createRunwayDesc(slay, great, good, bad) {
    let screen = new Scene();
    if (slay.length !== 0) {
        for (let i = 0; i < slay.length; i++) {
            screen.createImage(slay[i].image, "darkblue");
            slay[i].runwayScore = 10;
        }
        screen.createBold("", "slayR");
        let slayText = document.getElementById("slayR");
        for (let i = 0; i < slay.length; i++)
            slayText.innerHTML += `${slay[i].getName()}, `;
        slayText.innerHTML += "slayed the runway!";
    }
    if (great.length !== 0) {
        for (let i = 0; i < great.length; i++) {
            screen.createImage(great[i].image, "royalblue");
            great[i].runwayScore = 5;
        }
        screen.createBold("", "greatR");
        let greatText = document.getElementById("greatR");
        for (let i = 0; i < great.length; i++)
            greatText.innerHTML += `${great[i].getName()}, `;
        greatText.innerHTML += "had a great runway!";
    }
    if (good.length !== 0) {
        for (let i = 0; i < good.length; i++) {
            screen.createImage(good[i].image);
            good[i].runwayScore = 0;
        }
        screen.createBold("", "goodR");
        let goodText = document.getElementById("goodR");
        for (let i = 0; i < good.length; i++)
            goodText.innerHTML += `${good[i].getName()}, `;
        goodText.innerHTML += "had a good runway.";
    }
    if (bad.length !== 0) {
        for (let i = 0; i < bad.length; i++) {
            screen.createImage(bad[i].image, "pink");
            bad[i].runwayScore = -3;
        }
        screen.createBold("", "badR");
        let badText = document.getElementById("badR");
        for (let i = 0; i < bad.length; i++)
            badText.innerHTML += `${bad[i].getName()}, `;
        badText.innerHTML += "had a bad runway...";
    }
}
if (document.location.pathname == "/custom.html") {
    let previewCustomPic = document.getElementById("url");
    previewCustomPic.addEventListener("change", () => {
        if (document.getElementById("nomasbb") != null) {
            let yahay = document.getElementById("nomasbb");
            yahay.src = previewCustomPic.value;
        } else {
            let b = document.createElement("b");
            b.innerHTML = "<br>Preview<br>";
            b.setAttribute("id", "bnomasbb");
            let image = document.createElement("img");
            image.src = previewCustomPic.value;
            image.setAttribute("style", `border-color: gold; width: 105px; height: 105px;`);
            image.setAttribute("id", "nomasbb");
            previewCustomPic.parentElement.append(b);
            previewCustomPic.parentElement.append(image);
        }
    },);
}
function addQueen() {
    let name = document.getElementById("queenName").value.trim();
    let acting = document.getElementById("actingStat").valueAsNumber;
    let comedy = document.getElementById("comedyStat").valueAsNumber;
    let dance = document.getElementById("danceStat").valueAsNumber;
    let design = document.getElementById("designStat").valueAsNumber;
    let improv = document.getElementById("improvStat").valueAsNumber;
    let runway = document.getElementById("runwayStat").valueAsNumber;
    let lipsync = document.getElementById("lipsyncStat").valueAsNumber;
    let image = document.getElementById("url").value.trim();
    if (acting < 0 || comedy < 0 || dance < 0 || design < 0 || improv < 0 || runway < 0 || lipsync < 0 || acting > 15 || comedy > 15 || dance > 15 || design > 15 || improv > 15 || runway > 15 || lipsync > 15) {
        window.alert("Queens' stats must be between 0 and 15!");
        return;
    }
    if (name == "" || isNaN((acting || comedy || dance || design || improv || runway || lipsync))) {
        window.alert("One of the boxes is empty!");
        return;
    }
    let extension = image.substring(image.lastIndexOf(".") + 1).toLowerCase();
    let noimagemaybe = false;
    if (extension == "png" || extension == "jpg"  || extension == "gif" || extension == ""){
        if (image == ""){
            image = "noimage";
            noimagemaybe = false;
        }else {
            noimagemaybe = true;
        }
    } else {
        window.alert("Invalid image extension! Use jpg, gif or png instead!");
        document.getElementById("url").value = "";
        return;
    }
    let customQueen = new Queen(name, acting, comedy, dance, design, improv, runway, lipsync, image, noimagemaybe);
    let sameName = false;
    for (let i = 0; i < allCustomQueens.length; i++)
        if (allCustomQueens[i].getName() == customQueen.getName()) {
            window.alert(`There's already a queen with the name ${customQueen.getName()}! Please use another name.`);
            sameName = true;
            break;
        }
    if (sameName == false) {
        allCustomQueens.push(customQueen);
        customQueen.customqueen = true;
        let announce = document.getElementById("announce-new");
        announce.innerHTML = `${customQueen.getName()} added to the queen list!`;
        localStorage.setItem("customQueens", JSON.stringify(allCustomQueens));
        setTimeout(() => {
            document.location.reload();
        }, 1500);
    }
}
function customQueenSelectList() {
    let select = document.getElementById("custom-remove");
    for (let i = 0; i < allCustomQueens.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = allCustomQueens[i].getName();
        option.value = i.toString();
        select.appendChild(option);
    }
}
function removeCustomQueen() {
    let select = document.getElementById("custom-remove");
    let index = parseInt(select.options[select.selectedIndex].value);
    let announce = document.getElementById("announce-remove");
    announce.innerHTML = `${allCustomQueens[index].getName()} removed from the queen list!`;
    allCustomQueens.splice(index, 1);
    localStorage.setItem("customQueens", JSON.stringify(allCustomQueens));
    setTimeout(() => {
        document.location.reload();
    }, 1500);
}
function editCustomQueen(){
    let editButton = document.getElementById("edit");
    let addButton = document.getElementById("add");
    let select = document.getElementById("custom-remove");
    let index = parseInt(select.options[select.selectedIndex].value);
    addButton.setAttribute("hidden", "hidden");
    editButton.removeAttribute("hidden");
    document.getElementById("queenName").value = allCustomQueens[index].getName();
    document.getElementById("actingStat").value = allCustomQueens[index]._actingStat;
    document.getElementById("comedyStat").value = allCustomQueens[index]._comedyStat;
    document.getElementById("danceStat").value = allCustomQueens[index]._danceStat;
    document.getElementById("designStat").value = allCustomQueens[index]._designStat;
    document.getElementById("improvStat").value = allCustomQueens[index]._improvStat;
    document.getElementById("runwayStat").value = allCustomQueens[index]._runwayStat;
    document.getElementById("lipsyncStat").value = allCustomQueens[index]._lipsyncStat;
    document.getElementById("url").value = allCustomQueens[index].image;
}
function updateCustomQueen(){
    let select = document.getElementById("custom-remove");
    let index = parseInt(select.options[select.selectedIndex].value);
    let name = document.getElementById("queenName").value.trim();
    let acting = document.getElementById("actingStat").valueAsNumber;
    let comedy = document.getElementById("comedyStat").valueAsNumber;
    let dance = document.getElementById("danceStat").valueAsNumber;
    let design = document.getElementById("designStat").valueAsNumber;
    let improv = document.getElementById("improvStat").valueAsNumber;
    let runway = document.getElementById("runwayStat").valueAsNumber;
    let lipsync = document.getElementById("lipsyncStat").valueAsNumber;
    let image = document.getElementById("url").value.trim();
    if ((acting || comedy || dance || design || improv || runway || lipsync) < 0 || (acting || comedy || dance || design || improv || runway || lipsync) > 15) {
        window.alert("Queens' stats must be between 0 and 15!");
        return;
    }
    if (name == "" || isNaN((acting || comedy || dance || design || improv || runway || lipsync))) {
        window.alert("One of the boxes is empty!");
        return;
    }
    let extension = image.substring(image.lastIndexOf(".") + 1).toLowerCase();
    let noimagemaybe = false;
    if (extension == "png" || extension == "jpg" || extension == "gif" || extension == ""){
        if (image == ""){
            image = "noimage";
            noimagemaybe = false;
        }else {
            noimagemaybe = true;
        }
    } else {
        window.alert("Invalid image extension! Use jpg, gif or png instead!");
        document.getElementById("url").value = "";
        return;
    }
    let customQueen = new Queen(name, acting, comedy, dance, design, improv, runway, lipsync, image, noimagemaybe);
    allCustomQueens.splice(index, 1);
    allCustomQueens.push(customQueen);
    customQueen.customqueen = true;
    customQueen.custom = true;
    let announce = document.getElementById("announce-new");
    announce.innerHTML = `${customQueen.getName()} updated!`;
    localStorage.setItem("customQueens", JSON.stringify(allCustomQueens));
    setTimeout(() => {
        document.location.reload();
    }, 1500);
}
function randomizeStats() {
    let stats = document.getElementsByClassName("stats");
    for (let i = 0; i < stats.length; i++) {
        stats[i].value = randomNumber(16).toString();
    }
}
let premiereCounter = 0;
let firstCast = [];
let secondCast = [];
function doublePremiere() {
    if (episodeCount == 0 && !porkchopPremiere) {
        currentCast.forEach((queen) => {
            for (let i = 0; i < currentCast.length; i++) {
                if (queen.getName() != currentCast[i].getName()) {
                    queen.sisters.push({queen: currentCast[i], relation: 0});
                }
            }
        });
    }
    if (premiereCounter == 0) {
        if (porkchopPremiere) {
            currentCast = firstCast;
            for (let i = 0; i < secondCast.length; i++)
                secondCast[i].addToTrackRecord("");
        }
        shuffle(currentCast);
        premiereCounter++;
        slayersCheck = true;
        s14LaLaPaRUZaCheck = true;
        newEpisode();
    }
    else if (premiereCounter == 1) {
        currentCast = secondCast;
        for (let i = 0; i < firstCast.length; i++)
            firstCast[i].addToTrackRecord("");
        premiereCounter++;
        slayersCheck = true;
        s14LaLaPaRUZaCheck = true;
        newEpisode();
    }
    else if (premiereCounter == 2 && s14Premiere) {
        currentCast = [...firstCast, ...secondCast];
        premiereCounter++;
        chocolateBarTwistCheck = false;
        slayersCheck = false;
        s14LaLaPaRUZaCheck = false;
        newEpisode();
    }
    else if (premiereCounter == 2) {
        currentCast = [...firstCast, ...secondCast];
        premiereCounter++;
        slayersCheck = false;
        s14LaLaPaRUZaCheck = false;
        newEpisode();
    }
}
function s14ElimReturn() {
    let screen = new Scene();
    let names = "";
    for (let i = 0; i < eliminatedCast.length; i++){
        let queen = eliminatedCast[i];
        if (!disqOrDept) {
            queen.trackRecord.splice(queen.trackRecord.length - 1, 1);
            if (queen.trackRecord.indexOf(" ELIM ") != -1) {
                queen.trackRecord.splice(queen.trackRecord.indexOf(" ELIM "), 1, " ELIM");
            }
            if (queen.trackRecord.indexOf("ELIM") != -1) {
                queen.trackRecord.splice(queen.trackRecord.indexOf("ELIM"), 1, " ELIM");
            }
            queen.retEp = episodeCount;
            screen.createImage(queen.image, "orange");
            names += queen.getName();
            queen.rankP = 0;
            currentCast.push(queen);
            eliminatedCast.splice(eliminatedCast.indexOf(queen), 1);
            i--;
        } else {
            if (queen.QueenDisqOrDept == false) {
                if (queen.trackRecord.indexOf(" ELIM ") != -1) {
                    queen.trackRecord.splice(queen.trackRecord.indexOf(" ELIM "), 1, " ELIM");
                }
                if (queen.trackRecord.indexOf("ELIM") != -1) {
                    queen.trackRecord.splice(queen.trackRecord.indexOf("ELIM"), 1, " ELIM");
                }
                queen.retEp = episodeCount;
                screen.createImage(queen.image, "orange");
                names += queen.getName();
                queen.rankP = 0;
                currentCast.push(queen);
                eliminatedCast.splice(eliminatedCast.indexOf(queen), 1);
                i--;
            }
        }
        if (eliminatedCast.length == 1) {
            names += " and ";
        } else if (eliminatedCast.length > 1) {
            names += ", ";
        }
    }
    screen.createBold(names + " are back to the competition!");
    screen.createHorizontalLine();
}
function porkchopLipsyncs() {
    currentCast.forEach((queen) => {
        for (let i = 0; i < currentCast.length; i++) {
            if (queen.getName() != currentCast[i].getName()) {
                queen.sisters.push({queen: currentCast[i], relation: 0});
            }
        }
    });
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createParagraph("After the queens enter the workroom, it's time for them to lip-sync... for their lives!");
    for (let i = 0; i < Math.floor(totalCastSize / 2); i++) {
        screen.createHorizontalLine();
        let queen1 = pickRandomlyFromArray(currentCast);
        currentCast.splice(currentCast.indexOf(queen1), 1);
        let queen2 = pickRandomlyFromArray(currentCast);
        currentCast.splice(currentCast.indexOf(queen2), 1);
        if (currentCast.length == 1) {
            let queen3 = pickRandomlyFromArray(currentCast);
            currentCast.splice(currentCast.indexOf(queen3), 1);
            screen.createImage(queen1.image, "royalblue");
            screen.createImage(queen2.image, "royalblue");
            screen.createImage(queen3.image, "royalblue");
            screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} will lipsync...`);
            lsSong();
            let lipSync = [queen1, queen2, queen3];
            for (let i = 0; i < lipSync.length; i++) {
                lipSync[i].getASLipsync();
            }
            lipSync.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
            queen1 = lipSync[0];
            queen2 = lipSync[1];
            queen3 = lipSync[2];
            screen.createImage(queen1.image, "green");
            screen.createBold(`${queen1.getName()}, shantay you stay!`);
            screen.createImage(queen2.image, "orange");
            screen.createImage(queen3.image, "orange");
            screen.createBold(`${queen2.getName()} and ${queen3.getName()}, you're getting the porkchop...`);
            queen1.addToTrackRecord(" WIN ");
            queen2.addToTrackRecord("LOSS");
            queen3.addToTrackRecord("LOSS");
            firstCast.push(queen1);
            secondCast.push(queen2, queen3);
        }
        else {
            screen.createImage(queen1.image, "royalblue");
            screen.createImage(queen2.image, "royalblue");
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} will lipsync...`);
            lsSong();
            let lipSync = [queen1, queen2];
            for (let i = 0; i < lipSync.length; i++) {
                lipSync[i].getASLipsync();
            }
            lipSync.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
            queen1 = lipSync[0];
            queen2 = lipSync[1];
            screen.createImage(queen1.image, "green");
            screen.createBold(`${queen1.getName()}, shantay you stay!`);
            screen.createImage(queen2.image, "orange");
            screen.createBold(`${queen2.getName()}, you're getting the porkchop...`);
            queen1.addToTrackRecord(" WIN ");
            queen2.addToTrackRecord("LOSS");
            firstCast.push(queen1);
            secondCast.push(queen2);
        }
    }
    screen.createHorizontalLine();
    screen.createBigText("The porkchop queens will vote out one of their group...");
    screen.createBold("The queens vote...");
    for (let i = 0; i < secondCast.length; i++) {
        secondCast[i].lipstick = pickRandomlyFromArray(secondCast);
        while (secondCast[i].lipstick.getName() == secondCast[i].getName()) {
            secondCast[i].lipstick = pickRandomlyFromArray(secondCast);
        }
        secondCast[i].lipstick.votes++;
        screen.createParagraph(`${secondCast[i].getName()} voted for ${secondCast[i].lipstick.getName()}!`);
    }
    screen.createHorizontalLine();
    screen.createBold("The results are in..!");
    for (let i = 0; i < secondCast.length; i++) {
        screen.createBold(`${secondCast[i].getName()}: ${secondCast[i].votes.toString()} votes`);
    }
    screen.createHorizontalLine();
    let queen = secondCast.sort((a, b) => b.votes - a.votes)[0];

    if (secondCast[0].votes == secondCast[1].votes) {
        screen.createBold("It is a tie, the queens must revote between " + secondCast[0].getName() + " and " + secondCast[1].getName() + "!!");
        secondCast[0].votes = 0;
        secondCast[1].votes = 0;
        for (let i = 0; i < secondCast.length; i++) {
            secondCast[i].lipstick = secondCast[randomNumber(2)];
            while (secondCast[i].lipstick.getName() == secondCast[i].getName()) {
                secondCast[i].lipstick = secondCast[randomNumber(2)];
            }
            secondCast[i].lipstick.votes++;
            screen.createParagraph(`${secondCast[i].getName()} voted for ${secondCast[i].lipstick.getName()}!`);
        }
        screen.createHorizontalLine();
        screen.createBold("The results are in..!");
        screen.createBold(`${secondCast[0].getName()}: ${secondCast[0].votes.toString()} votes`);
        screen.createBold(`${secondCast[1].getName()}: ${secondCast[1].votes.toString()} votes`);
        let tiebreaker = secondCast.sort((a, b) => b.votes - a.votes)[0];
        queen = tiebreaker;
        screen.createHorizontalLine();
    }
    screen.createImage(queen.image, "orange");
    screen.createBold(`The queen that's getting the porkchop is... ${queen.getName()}!`);
    firstCast.push(queen);
    secondCast.splice(secondCast.indexOf(queen), 1);
    queen.trackRecord.pop();
    queen.addToTrackRecord("LOSS ")
    episodeChallenges.push("Lipsync");
    for (let i = 0; i < secondCast.length; i++) {
        secondCast[i].votes = 0;
    }
    screen.createButton("Proceed", "doublePremiere()");
    episodeCount++;
}
function doublePremiereJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my girls!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    screen.createImage(topQueens[0].image, "cyan");
    screen.createImage(topQueens[1].image, "cyan");
    screen.createBold(`${topQueens[0].getName()}, ${topQueens[1].getName()}, condragulations, you're the Top 2 of the week!`);
    screen.createParagraph("Nobody is going home tonight!");
    screen.createHorizontalLine();
    screen.createBold("The Top 2 will now lip-sync... for the win!");
    let song = lsSong().toString();
    for (let i = 0; i < topQueens.length; i++) {
        topQueens[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let slay = topQueens.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = topQueens.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = topQueens.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = topQueens.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = topQueens.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(topQueens, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Proceed", "doublePremiereLipsync()");
}
function doublePremiereLipsync() {
    let screen = new Scene();
    screen.clean();
    topQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    screen.createHeader("I've made my decision.");
    screen.createImage(topQueens[0].image, "royalblue");
    screen.createBold(`${topQueens[0].getName()}, you're a winner baby!`);
    screen.createImage(topQueens[1].image, "deepskyblue");
    screen.createBold(`${topQueens[1].getName()}, you are safe.`);
    topQueens[0].addToTrackRecord("WIN");
    topQueens[0].favoritism += 5;
    topQueens[0].ppe += 2;
    topQueens[1].addToTrackRecord("TOP2");
    topQueens[1].favoritism += 2;
    topQueens[1].ppe += 1.5;
    screen.createButton("Proceed", "doublePremiere()");
}
function uk3PremiereJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my girls!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    screen.createImage(topQueens[2].image, "lightblue");
    topQueens[2].addToTrackRecord("HIGH");
    topQueens[2].favoritism += 1;
    topQueens[2].ppe += 4;
    screen.createParagraph("", "highs");
    let highs = document.getElementById("highs");
    highs.innerHTML += `${topQueens[2].getName()}, `;
    highs.innerHTML += "good job this week, you're safe.";
    topQueens.splice(2, 1);
    screen.createImage(topQueens[0].image, "cyan");
    screen.createImage(topQueens[1].image, "cyan");
    screen.createBold(`${topQueens[0].getName()}, ${topQueens[1].getName()}, condragulations, you're the Top 2 of the week!`);
    screen.createHorizontalLine();
    screen.createBold("The Top 2 will now lip-sync... for the win!");
    let song = lsSong().toString();
    for (let i = 0; i < topQueens.length; i++) {
        topQueens[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let slay = topQueens.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = topQueens.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = topQueens.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = topQueens.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = topQueens.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(topQueens, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Proceed", "uk3PremiereJudging2()");
}
function uk3PremiereJudging2() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision.");
    topQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    if (immunityTwist && giveImmunity()) {
        topQueens[0].immune = true;
        topQueens[0].immuneEp.push(episodeCount);
        screen.createImage(topQueens[0].image, "royalblue");
        screen.createBold(topQueens[0].getName() + ", you're a winner baby! And you also earned immunity for the next challenge!");
    } else {
        screen.createImage(topQueens[0].image, "royalblue");
        screen.createBold(`${topQueens[0].getName()}, you're a winner baby!`);
    }
    screen.createImage(topQueens[1].image, "deepskyblue");
    screen.createBold(`${topQueens[1].getName()}, you are safe.`);
    topQueens[0].addToTrackRecord("WIN");
    topQueens[0].favoritism += 5;
    topQueens[0].ppe += 5;
    topQueens[1].addToTrackRecord("TOP2");
    topQueens[1].favoritism += 2;
    topQueens[1].ppe += 4.5;
    topQueens.splice(0, 2);
    screen.createHorizontalLine();
    screen.createBold("Now...");
    if (bottomQueens.length >= 3) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createParagraph("", "bottom3");
        let bottom3 = document.getElementById("bottom3");
        for (let i = 0; i < bottomQueens.length; i++)
            bottom3.innerHTML += bottomQueens[i].getName() + ", ";
        bottom3.innerHTML += "you're the bottoms of the week...";
    }
    //do the same, but for the bottom queens:
    if (bottomQueens.length == 3) {
        for (let i = 0; i < topQueens.length; i++)
            bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore);
        bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
        bottomQueens[0].addToTrackRecord("LOW");
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createBold(bottomQueens[0].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens.splice(0, 1);
    }
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createBold("", "btm2");
    let btm2 = document.getElementById("btm2");
    for (let i = 0; i < bottomQueens.length; i++) {
        btm2.innerHTML += bottomQueens[i].getName() + ", ";
    }
    btm2.innerHTML += "I'm sorry my dears but you are up for elimination.";
    screen.createButton("Proceed", "lipsyncDesc()");
}
let currentCast = [];
let eliminatedCast = [];
let fullCast = [];
let safeQueens = [];
let blockQueens = [];
let topQueens = [];
let bottomQueens = [];
let top2 = [];
let up2Block = [];
let doubleShantay = false;
let doubleSashay = false;
let episodeChallenges = [];
let episodeCount = 0;
let returningQueen = false;
let immunityTwist = false;
let noDouble = false;
let riggory = false;
let riggoryLipsync = false;
let chocolateBarTwist = false;
let chocolateBarTwistCheck = false;
let chocolateBarTwistChoosable = false;
let s6Premiere = false;
let s12Premiere = false;
let s14Premiere = false;
let porkchopPremiere = false;
let firstPremiere = false;
let secondPremiere = false;
let uk3Premiere = false;
let s9Premiere = false;
//challenge seasons
let sweatshop = false;
let chaos = false;
function newEpisode() {
    if (episodeCount == 0 && !(porkchopPremiere || s14Premiere || s12Premiere || s6Premiere)) {
        currentCast.forEach((queen) => {
            for (let i = 0; i < currentCast.length; i++) {
                if (queen.getName() != currentCast[i].getName()) {
                    queen.sisters.push({queen: currentCast[i], relation: 0});
                }
            }
        });
        let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
        let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
        koffeDiv[0].classList.toggle("hide", true);
        koffeDivMovil[0].classList.toggle("hide", true);
    }
    if (s9Premiere && episodeCount == 0) {
        currentCast.splice(currentCast.indexOf(lateQueen), 1);
    }
    safeQueens = [];
    blockQueens = [];
    topQueens = [];
    bottomQueens = [];
    top2 = [];
    up2Block = [];
    episodeCount++;
    let queensRemainingScreen = new Scene();
    if (episodeCount == 1 || premiereCounter <= 2 && (s12Premiere || porkchopPremiere || s6Premiere || s14Premiere ) || episodeCount == 1 && (uk3Premiere || s9Premiere)) {
        queensRemainingScreen.clean();
        queensRemainingScreen.createHeader("Full cast");
        for (let i = 0; i < currentCast.length; i++) {
            queensRemainingScreen.createImage(currentCast[i].image);
            queensRemainingScreen.createBold(currentCast[i].getName());
        }
    }
    else {
        contestantProgress();
        queensRemainingScreen.createHorizontalLine();
        queensRemainingScreen.createButton("Download", "downloadTR()", "downloadTR");
    }
    if (currentCast.length == totalCastSize && team == true)
        queensRemainingScreen.createButton("Proceed", "teamsScreen()");
    else if ((s6Premiere || s12Premiere || s14Premiere) && episodeCount == 1)
        queensRemainingScreen.createButton("Proceed", "doublePremChoose()");
    else if (all_winners && currentCast.length <= 10 && episodeCount == 12)
        queensRemainingScreen.createButton("Proceed", "awFinale()");
    else if (all_winners && currentCast.length >= 10 && episodeCount == 15)
        queensRemainingScreen.createButton("Proceed", "awFinale()");
    else if (currentCast.length == 4 && top3)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if ((currentCast.length == 4 || currentCast.length == 5) && porkchopPremiere && premiereCounter < 3 )
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 5 && top5 || currentCast.length == 4 && top4 || currentCast.length == 3 && top3 || currentCast.length == 2 && top2 || currentCast.length == 4 && canFinale || currentCast.length == 4 && lftc || currentCast.length == 4 && allstars3Finale)
        queensRemainingScreen.createButton("Proceed", "reunion()");
    else if (currentCast.length > 4)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 4 && team)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 3 && team)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 2 && team)
        queensRemainingScreen.createButton("Proceed", "finaleTeam()");
    else
        queensRemainingScreen.createButton("Proceed", "reunion()");
    //add an empty placement on eliminated queen's track records
    for (let i = 0; i < eliminatedCast.length; i++)
        eliminatedCast[i].addToTrackRecord('');
}
function reSimulate() {
    loadSongs();
    queensReads = allReads;
    //add eliminated queens again to cast and clean it
    for (let i = 0; i < eliminatedCast.length; i++) {
        currentCast.push(eliminatedCast[i]);
    }
    if (lftc || canFinale || all_winners) {
        finalLS = [];
        firstLS = [];
        secondLS = [];
    }
    currentCast.sort((a, b) => a.getName().toLowerCase().localeCompare(b.getName().toLowerCase()));
    eliminatedCast = [];
    firstCast = [];
    secondCast = [];
    fullCast = [];
    premiereCounter = 0;
    episodeCount = 0;
    onFinale = false;
    onTop4Finale = false;
    totalCastSize = currentCast.length;
    disqOrDept = false;
    disqOrDeptFlag = false;
    gsFlag = false;
    threestars = false;
    flagThree = false;
    readingCheck = false;
    wht = [];
    teamList = [];
    qonfi = 0;
    homeTrigger = 0;
    //clean track records
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].trackRecord = [];
        currentCast[i].sisters = [];
        currentCast[i].enemies = [];
        currentCast[i].friends = [];
        currentCast[i].miniEpisode = [];
        currentCast[i].voteHerstory = [];
        currentCast[i].immuneEp = [];
        currentCast[i].favoritism = 0;
        currentCast[i].unfavoritism = 0;
        currentCast[i].finaleScore = 0;
        currentCast[i].votes = 0;
        currentCast[i].ppe = 0;
        currentCast[i].episodesOn = 0;
        currentCast[i].stars = 0;
        currentCast[i].winCount = 0;
        currentCast[i].rankP = 0;
        currentCast[i].retEp = 0;
        currentCast[i].QueenDisqOrDept = false;
        currentCast[i].chocolate = false;
        currentCast[i].blocked = false;
        currentCast[i].immune = false;
    }
    //clean challenges
    episodeChallenges = [];
    actingChallengeCounter = 0;
    comedyChallengeCounter = 0;
    marketingChallengeCounter = 0;
    danceChallengeCounter = 0;
    designChallengeCounter = 0;
    improvChallengeCounter = 0;
    rusicalCounter = false;
    ballCounter = false;
    talentShowCounter = false;
    girlGroupCounter = false;
    rumixCounter = false;
    makeoverCounter = false;
    snatchCounter = false;
    doubleShantay = false;
    doubleSashay = false;
    returningQueen = false;
    floppers = false;
    floppersCheck = false;
    slayers = false;
    slayersCheck = false;
    slayersSmack = 0;
    bottom6WayLipsync = false;
    bottom6WayLipsyncCheck = false;
    s14LaLaPaRUZa = false;
    s14LaLaPaRUZaCheck = false;
    assasintable = [];
    assasinlipstick = [];
    blots = [];
    decidingVote4Chart = [];
    votesTotal4Chart = [];
    elimKween4Chart = [];
    twinsMakeover = [];
    conjoinedCheck = false;
    s9PremiereCheck = false;
    uk3PremiereCheck = false;
    chocolateBarTwistCheck = false;
    lateQueen = '';
    //refill lip-sync songs and lsa
    lsSongs = allLsSongs;
    allQueens = allQueensCopy;
    if (chocolateBarTwist) {
        if (chocolateBarTwistChoosable){
            chooseGoldenBar();
        }else {
            giveChocolate();
        }
    }
    else if (s9Premiere)
        chooseLateQueen();
    else if (s6Premiere || s12Premiere || s14Premiere)
        doublePremiere();
    else if (porkchopPremiere) {
        porkchopLipsyncs();
    }
    else
        newEpisode();
}
let firstLS = [];
let secondLS = [];
let finalLS = [];
let onFinale = false;
let onTop4Finale = false;

function finaleLS() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    screen.createImage(currentCast[0].image, "royalblue");
    screen.createImage(currentCast[1].image, "royalblue");
    screen.createImage(currentCast[2].image, "royalblue");
    screen.createImage(currentCast[3].image, "royalblue");
    screen.createParagraph("Our Top 4 will participate in a lip-sync smackdown for the crown! The preliminaries will now be decided...");
    screen.createHorizontalLine();
    for (let i = 0; i < 2; i++) {
        let q1 = pickRandomlyFromArray(currentCast);
        firstLS.push(q1);
        currentCast.splice(currentCast.indexOf(q1), 1);
        let q2 = pickRandomlyFromArray(currentCast);
        secondLS.push(q2);
        currentCast.splice(currentCast.indexOf(q2), 1);
    }
    screen.createBigText("The preliminaries will be: ");
    screen.createImage(firstLS[0].image, "darkblue");
    screen.createImage(firstLS[1].image, "darkblue");
    screen.createBold(firstLS[0].getName() + " vs. " + firstLS[1].getName());
    screen.createParagraph("and");
    screen.createImage(secondLS[0].image, "darkred");
    screen.createImage(secondLS[1].image, "darkred");
    screen.createBold(secondLS[0].getName() + " vs. " + secondLS[1].getName());
    episodeChallenges.push("Finale");
    screen.createButton("Proceed", "finaleLipSyncsDesc1()");
}
let finaleof4gurl = false;
function finaleLipSyncs() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    firstLS.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    if (firstLS[0].lipsyncScore == firstLS[1].lipsyncScore && firstLS[0].lipsyncScore > 6 && firstLS[1].lipsyncScore > 6) {
        screen.createImage(firstLS[0].image, "silver");
        screen.createImage(firstLS[1].image, "silver");
        screen.createBold(firstLS[0].getName() + ", " + firstLS[1].getName() + ", shantay you both stay.");
        finalLS.push(firstLS[0]);
        finalLS.push(firstLS[1]);
        isThisA3Way = true;
    } else if (chocolateBarTwist  && !chocolateBarTwistCheck) {
        screen.createImage(firstLS[0].image, "silver");
        screen.createBold(firstLS[0].getName() + ", shantay you stay.");
        screen.createBold(firstLS[1].getName() + ", now your fate rests in the hands of the drag gods.");
        screen.createBold("If you have the golden chocolate bar, you will be safe.");
        finalLS.push(firstLS[0]);
        if (chocolateBarCheck(firstLS[1]) == true) {
            screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
            screen.createImage(firstLS[1].image, "gold");
            screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
            screen.createBold(firstLS[1].getName() + "!! Condragulations, you are safe to slay another day and you move on into the final lipsync!!");
            firstLS[1].unfavoritism += 3;
            finalLS.push(firstLS[1]);
            chocolateBarTwistCheck = true;
            isThisA3Way = true;
        } else {
            screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
            screen.createBold("It's chocolate.");
            if (shedadhh) {
                firstLS[1].addToTrackRecord("LOST 1ST ROUND ");
            } else {
                firstLS[1].addToTrackRecord("LOST 1ST ROUND");
                firstLS[1].rankP = 34;
            }
            eliminatedCast.unshift(firstLS[1]);
            screen.createImage(firstLS[1].image, "sienna");
            screen.createBold(firstLS[1].getName() + ", sashay away...");
        }
    } 
    else {
        finalLS.push(firstLS[0]);
        if (shedadhh) {
            firstLS[1].addToTrackRecord("LOST 1ST ROUND ");
        } else {
            firstLS[1].addToTrackRecord("LOST 1ST ROUND");
            firstLS[1].rankP = 34;
        }
        eliminatedCast.unshift(firstLS[1]);
        screen.createImage(firstLS[0].image, "silver");
        screen.createBold(firstLS[0].getName() + ", shantay you stay.");
        screen.createImage(firstLS[1].image, "sienna");
        screen.createBold(firstLS[1].getName() + ", sashay away...");
    }
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleLipSyncsDesc2()");
}
function finaleLipSyncs2() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    secondLS.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    if (secondLS[0].lipsyncScore == secondLS[1].lipsyncScore && secondLS[0].lipsyncScore > 6 && secondLS[1].lipsyncScore > 6) {
        screen.createImage(secondLS[0].image, "silver");
        screen.createImage(secondLS[1].image, "silver");
        screen.createBold(secondLS[0].getName() + ", " + secondLS[1].getName() + ", shantay you both stay.");
        finalLS.push(secondLS[0]);
        finalLS.push(secondLS[1]);
        if (!isThisA3Way) {
            isThisA3Way = true;
        } else {
            finaleof4gurl = true;
        }
    } else if (chocolateBarTwist  && !chocolateBarTwistCheck) {
        screen.createImage(secondLS[0].image, "silver");
        screen.createBold(secondLS[0].getName() + ", shantay you stay.");
        screen.createBold(secondLS[1].getName() + ", now your fate rests in the hands of the drag gods.");
        screen.createBold("If you have the golden chocolate bar, you will be safe.");
        finalLS.push(secondLS[0]);
        if (chocolateBarCheck(secondLS[1]) == true) {
            screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
            screen.createImage(secondLS[1].image, "gold");
            screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
            screen.createBold(secondLS[1].getName() + "!! Condragulations, you are safe to slay another day and you move on into the final lipsync!!");
            secondLS[1].unfavoritism += 3;
            chocolateBarTwistCheck = true;
            finalLS.push(secondLS[1]);
            if (!isThisA3Way) {
                isThisA3Way = true;
            } else {
                finaleof4gurl = true;
            }
            if (firstLS[1].trackRecord[firstLS[1].trackRecord.length - 1] == "LOST 1ST ROUND") {
                firstLS[1].rankP = 0;
            }
        } else {
            screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
            screen.createBold("It's chocolate.");
            if (shedadhh) {
                secondLS[1].addToTrackRecord("LOST 2ND ROUND ");
            } else {
                secondLS[1].addToTrackRecord("LOST 2ND ROUND");
                if (!isThisA3Way) {
                    secondLS[1].rankP = 34;
                }
            }
            eliminatedCast.unshift(secondLS[1]);
            screen.createImage(secondLS[1].image, "sienna");
            screen.createBold(secondLS[1].getName() + ", sashay away...");
        }
    }  
    else {
        finalLS.push(secondLS[0]);
        if (shedadhh) {
            secondLS[1].addToTrackRecord("LOST 2ND ROUND ");
        } else {
            secondLS[1].addToTrackRecord("LOST 2ND ROUND");
            if (!isThisA3Way) {
                secondLS[1].rankP = 34;
            }
        }
        eliminatedCast.unshift(secondLS[1]);
        screen.createImage(secondLS[0].image, "silver");
        screen.createBold(secondLS[0].getName() + ", shantay you stay.");
        screen.createImage(secondLS[1].image, "sienna");
        screen.createBold(secondLS[1].getName() + ", sashay away...");
    }
    screen.createButton("Proceed", "finaleLipSyncsDesc3()");
}
function finalLipSync() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Ladies, I've made my decision. The Next Drag Superstar is...");
    for (let i = 0; i < finalLS.length; i++) {
        finalLS[i].finaleScore += (finalLS[i].lipsyncScore/2);
    }
    finalLS.sort((a, b) => b.finaleScore - a.finaleScore);
    let winner = 0;
    if (finaleof4gurl) {
        if (randomNumber(100) >= 95) {
            winner = randomNumberWithMin(1, 3);
        }
        screen.createImage(finalLS[winner].image, "yellow");
        screen.createBigText(finalLS[winner].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        finalLS[winner].addToTrackRecord("WINNER");
        for (let i = 0; i < finalLS.length; i++) {
            if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                finalLS[i].addToTrackRecord("LOST 3RD ROUND");
                finalLS[i].rankP = 234;
                eliminatedCast.unshift(finalLS[i]);
            }
        }
        if (winner == 0) {
            finalLS.splice(1, 3);
        } else if (winner == 1) {
            finalLS.splice(2, 2);
            finalLS.splice(0, 1);
        } else if (winner == 2) {
            finalLS.splice(0, 2);
            finalLS.splice(1, 1);
        } else if (winner == 3) {
            finalLS.splice(0, 3);
        }
    }
    else if (isThisA3Way) {
        if (randomNumber(100) >= 95) {
            winner = randomNumberWithMin(1, 2);
        }
        screen.createImage(finalLS[winner].image, "yellow");
        screen.createBigText(finalLS[winner].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        finalLS[winner].addToTrackRecord("WINNER");
        for (let i = 0; i < finalLS.length; i++) {
            if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                finalLS[i].addToTrackRecord("LOST 3RD ROUND");
                finalLS[i].rankP = 23;
                eliminatedCast.unshift(finalLS[i]);
            }
        }
        if (winner == 0) {
            finalLS.splice(1, 2);
        } else if (winner == 1) {
            finalLS.splice(2, 1);
            finalLS.splice(0, 1);
        } else if (winner == 2) {
            finalLS.splice(0, 2);
        }
    } else {
        if (finalLS[0].finaleScore == finalLS[1].finaleScore && randomNumber(100) >= 50) {
            screen.createBold("For the FIRST TIME in Drag Race herstory, you are both winners, baby");
            screen.createImage(finalLS[0].image, "yellow");
            screen.createImage(finalLS[1].image, "yellow");
            screen.createBigText(finalLS[0].getName() + " and " + finalLS[1].getName() + "!!");
            screen.createBold("Now prance, my queens!");
            finalLS[0].addToTrackRecord("WINNER");
            finalLS[1].addToTrackRecord("WINNER");
            finalLS[1].rankP = 1;
            eliminatedCast.unshift(finalLS[1]);
            finalLS.splice(1, 1);
        }else{
            if (randomNumber(100) >= 95) {
                winner = 1;
            }
            screen.createImage(finalLS[winner].image, "yellow");
            screen.createBigText(finalLS[winner].getName() + "!!");
            screen.createBold("Now prance, my queen!");
            finalLS[winner].addToTrackRecord("WINNER");
            for (let i = 0; i < finalLS.length; i++) {
                if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                    if (runT5) {
                        finalLS[i].addToTrackRecord("RUNNER UP");
                    } else {
                        finalLS[i].addToTrackRecord("LOST 3RD ROUND");
                    }
                    finalLS[i].rankP = 2;
                    eliminatedCast.unshift(finalLS[i]);
                    finalLS.splice(i, 1);
                }
            }
        }
    }
    isThisA3Way = false;
    finaleof4gurl = false;
    currentCast.push(finalLS[0]);
    screen.createButton("Proceed", "contestantProgress()");
}
function shedadhhLipSync() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Ladies, I've made my decision. The Queen of She Done Already Done Had Herses is...");
    finalLS.sort((a, b) => b.lipsyncScore - a.lipsyncScore);
    let winner = 0;
    if (finaleof4gurl) {
        if (randomNumber(100) >= 95) {
            winner = randomNumberWithMin(1, 3);
        }
        screen.createImage(finalLS[winner].image, "#C7DDB5");
        screen.createBigText(finalLS[winner].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        finalLS[winner].addToTrackRecord("WINNER ");
        for (let i = 0; i < finalLS.length; i++) {
            if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                finalLS[i].addToTrackRecord("LOST 3RD ROUND ");
                eliminatedCast.unshift(finalLS[i]);
            }
        }
        if (winner == 0) {
            finalLS.splice(1, 3);
        } else if (winner == 1) {
            finalLS.splice(2, 2);
            finalLS.splice(0, 1);
        } else if (winner == 2) {
            finalLS.splice(0, 2);
            finalLS.splice(1, 1);
        } else if (winner == 3) {
            finalLS.splice(0, 3);
        }
    }
    else if (isThisA3Way) {
        if (randomNumber(100) >= 95) {
            winner = randomNumberWithMin(1, 2);
        }
        screen.createImage(finalLS[winner].image, "#C7DDB5");
        screen.createBigText(finalLS[winner].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        finalLS[winner].addToTrackRecord("WINNER ");
        for (let i = 0; i < finalLS.length; i++) {
            if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                finalLS[i].addToTrackRecord("LOST 3RD ROUND ");
                eliminatedCast.unshift(finalLS[i]);
            }
        }
        if (winner == 0) {
            finalLS.splice(1, 2);
        } else if (winner == 1) {
            finalLS.splice(2, 1);
            finalLS.splice(0, 1);
        } else if (winner == 2) {
            finalLS.splice(0, 2);
        }
    } else {
        if (randomNumber(100) >= 95) {
            winner = 1;
        }
        screen.createImage(finalLS[winner].image, "#C7DDB5");
        screen.createBigText(finalLS[winner].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        finalLS[winner].addToTrackRecord("WINNER ");
        for (let i = 0; i < finalLS.length; i++) {
            if (!(finalLS.indexOf(finalLS[i]) == winner)) {
                finalLS[i].addToTrackRecord("LOST 3RD ROUND ");
                eliminatedCast.unshift(finalLS[i]);
            }
        }
    }
    eliminatedCast.unshift(finalLS[0]);
    shedadhh = false;
    isThisA3Way = false;
    finaleof4gurl = false;
    firstLS = [];
    secondLS = [];
    finalLS = [];
    screen.createButton("Proceed", "finaleLS()");
}
function finale() {
    //sort queens by finale score:
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getFinale();
    }
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    for (let i = 0; i < currentCast.length; i++)
        screen.createImage(currentCast[i].image);
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    if (currentCast[0].finaleScore - currentCast[1].finaleScore <= 5 && randomNumber(100) <= 25) {
        currentCast[1].finaleScore = currentCast[0].finaleScore + 1;
    }
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    screen.createParagraph("Our Top "+ currentCast.length +" will participate in a music video for RuPaul's newest single!");
    screen.createButton("Proceed", "runway()", "button2");
}
function finaleTeam() {
    //sort queens by finale score:
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getFinale();
    }
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    screen.createImage(currentCast[0].image, "black");
    screen.createImage(currentCast[1].image, "black");
    screen.createImage(currentCast[2].image, "black");
    screen.createImage(currentCast[3].image, "black");
    screen.createParagraph("Our Top 4 will participate in a music video for RuPaul's newest single!");
    screen.createButton("Proceed", "finaleTeamJudging()", "button2");
}
function finaleT5() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    screen.createBold("The top 5 will perform individual show-stopping performances.");
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let slay = currentCast.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = currentCast.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = currentCast.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = currentCast.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = currentCast.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    createLipsyncDesc(slay, great, good, bad, flop);
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].lipsyncScore+= ((currentCast[i].favoritism - currentCast[i].unfavoritism)/3);
    }
    currentCast.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    episodeChallenges.push("Finale");
    screen.createButton("Proceed", "finaleTop5Judging()");
}
let isThisA3Way = false;
function finaleTop3Judging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The final minutes...");
    screen.createBold("Ladies, it's time to decide The Next Drag Superstar, and...");
    if (canFinale) {
        for (let i = 0; i < eliminatedCast.length; i++) {
            eliminatedCast[i].trackRecord[eliminatedCast[i].trackRecord.length - 1] = "GUEST";
        }
    } else {
        if (regularFormat || thailandFormat) {
            episodeChallenges.push("Music Video");
            for (let i = 0; i < eliminatedCast.length; i++) {
                eliminatedCast[i].trackRecord.splice(eliminatedCast[i].trackRecord.length - 1, 0, "");
            }
            for (let i = 0; i < currentCast.length; i++) {
                currentCast[i].addToTrackRecord("TOP " + currentCast.length);
            }
        }
    }
    screen.createHorizontalLine();
    if (currentCast[0].finaleScore - currentCast[2].finaleScore <= 5) {
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[1].image, "silver");
        screen.createImage(currentCast[2].image, "silver");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + " and " + currentCast[2].getName() + ", the three of you will lipsync for your lives!!");
        isThisA3Way = true;
    } else {
        screen.createImage(currentCast[2].image, "sienna");
        screen.createBold(currentCast[2].getName() + ", I'm sorry my dear, this is not your time... Now, sashay away..");
        currentCast[2].addToTrackRecord("ELIMINATED");
        eliminatedCast.unshift(currentCast[2]);
        currentCast.splice(2, 1);
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[1].image, "silver");
        screen.createBold(currentCast[0].getName() + " and " + currentCast[1].getName() + ",  you will lipsync for your lives!!");
        if (canFinale) {
            eliminatedCast[1].trackRecord[eliminatedCast[1].trackRecord.length - 2] = "ELIM";
        }
    }
    let song = lsSong().toString();
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(currentCast);
    if (event != false) {
        let eventQueen = currentCast.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = currentCast.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = currentCast.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = currentCast.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = currentCast.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = currentCast.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(currentCast, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleFinale()");
}
function finaleTop4Judging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The final minutes...");
    screen.createBold("Ladies, it's time to decide The Next Drag Superstar, and...");
    if (canFinale) {
        for (let i = 0; i < eliminatedCast.length; i++) {
            eliminatedCast[i].addToTrackRecord("GUEST");
        }
    } else if (regularFormat || thailandFormat || canFinale && (all_stars || lipsync_assassin)){
        for (let i = 0; i < eliminatedCast.length; i++) {
            eliminatedCast[i].trackRecord.splice(eliminatedCast[i].trackRecord.length - 1,0, "");
        }
    }
    if (currentCast[0].finaleScore - currentCast[3].finaleScore > 5){
        screen.createImage(currentCast[3].image, "sienna");
        screen.createBold(currentCast[3].getName() + ", I'm sorry my dear but it's not your time. I must ask you to sashay away...");
        currentCast[3].addToTrackRecord("ELIMINATED");
        if (regularFormat || thailandFormat){ 
            currentCast[3].addToTrackRecord("GUEST");
        }
        eliminatedCast.unshift(currentCast[3]);
        currentCast.splice(3, 1);
        screen.createHorizontalLine();
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[1].image, "silver");
        screen.createImage(currentCast[2].image, "silver");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + " and " + currentCast[2].getName() + ", this is your last chance to prove yourself. It's time for you to lipsync.. for the CROWN!!");
        isThisA3Way = true;
    } else {
        screen.createBold("For the first time in Drag Race herstory, we are breaking all the rules!");
        screen.createHorizontalLine();
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[1].image, "silver");
        screen.createImage(currentCast[2].image, "silver");
        screen.createImage(currentCast[3].image, "silver");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", " + currentCast[2].getName() + " and " + currentCast[3].getName() + ", the four of you will lipsync for your lives!!");
        finaleof4gurl = true;
    }
    if (regularFormat || thailandFormat || canFinale && (all_stars || lipsync_assassin)) {
        episodeChallenges.push("Music Video");
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].addToTrackRecord("TOP " + currentCast.length);
        }
    }
    let song = lsSong().toString();
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(currentCast);
    if (event != false) {
        let eventQueen = currentCast.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = currentCast.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = currentCast.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = currentCast.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = currentCast.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = currentCast.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(currentCast, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleFinale()");
}
let runT5 = false;
function finaleTop5Judging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The final minutes...");
    screen.createHorizontalLine();
    screen.createBigText("The ones moving on to the final lipsync are...");
    screen.createImage(currentCast[0].image, "silver");
    screen.createImage(currentCast[1].image, "silver");
    screen.createBold(currentCast[0].getName() + " and " + currentCast[1].getName() + ", condragulations, go prepare for your final lipsync.");
    screen.createImage(currentCast[2].image, "sienna");
    screen.createImage(currentCast[3].image, "sienna");
    screen.createImage(currentCast[4].image, "sienna");
    screen.createBold(currentCast[2].getName() + ", " + currentCast[3].getName() + " and " + currentCast[4].getName() + ", I'm sorry my dears but it's not your time. I must ask you to sashay away...");
    if (team) {
        for (let i = 2; i <= currentCast.length - 1; i++) {
            currentCast[i].QueenA.addToTrackRecord("ELIMINATED");
            currentCast[i].QueenB.addToTrackRecord("ELIMINATED");
            eliminatedCast.unshift(currentCast[i].QueenA);
            eliminatedCast.unshift(currentCast[i].QueenB);
        }
        firstLS.push(currentCast[0].QueenA);
        firstLS.push(currentCast[0].QueenB);
        secondLS.push(currentCast[1].QueenA);
        secondLS.push(currentCast[1].QueenB);
        screen.createButton("Proceed", "finaleLipSyncsDesc1()");
    } else {
        for (let i = 2; i <= currentCast.length - 1; i++) {
            currentCast[i].addToTrackRecord("ELIMINATED");
            currentCast[i].rankP = 345;
            eliminatedCast.unshift(currentCast[i]);
        }
        finalLS = [];
        finalLS.push(currentCast[0]);
        finalLS.push(currentCast[1]);
        screen.createButton("Proceed", "finaleLipSyncsDesc3()");
    }
    currentCast.splice(0, currentCast.length);
    runT5 = true;
}
function finaleTeamJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The final minutes...");
    screen.createBold("Ladies, it's time to decide The Next Drag Superstar, and...");
    if (team && randomNumber(100) >= 45) {
        screen.createImage(currentCast[1].image, "sienna");
        screen.createImage(currentCast[3].image, "sienna");
        screen.createBold(currentCast[1].getName() + ", " + currentCast[3].getName() + ". I'm sorry my dears but it's not your time. I must ask you both to sashay away...");
        screen.createHorizontalLine();
        currentCast[1].addToTrackRecord("ELIMINATED");
        currentCast[3].addToTrackRecord("ELIMINATED");
        currentCast[1].rankP = 34;
        currentCast[3].rankP = 34;
        eliminatedCast.unshift(currentCast[1]);
        eliminatedCast.unshift(currentCast[3]);
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[2].image, "silver");
        currentCast.splice(3, 1);
        currentCast.splice(1, 1);
        screen.createBold(currentCast[0].getName() + " and " + currentCast[1].getName() + ", this is your last chance to prove yourself. It's time for you to lipsync.. for the CROWN!!");
    } else {
        screen.createImage(currentCast[2].image, "sienna");
        screen.createImage(currentCast[3].image, "sienna");
        screen.createBold(currentCast[2].getName() + ", " + currentCast[3].getName() + ". I'm sorry my dears but it's not your time. I must ask you both to sashay away...");
        screen.createHorizontalLine();
        currentCast[2].addToTrackRecord("ELIMINATED");
        currentCast[3].addToTrackRecord("ELIMINATED");
        currentCast[2].rankP = 34;
        currentCast[3].rankP = 34;
        eliminatedCast.unshift(currentCast[2]);
        eliminatedCast.unshift(currentCast[3]);
        screen.createImage(currentCast[0].image, "silver");
        screen.createImage(currentCast[1].image, "silver");
        if (team && randomNumber(100) <= 80) {
            currentCast[1].finaleScore += 1;
        }
        currentCast.splice(2, 2);
        screen.createBold(currentCast[0].getName() + " and " + currentCast[1].getName() + ", this is your last chance to prove yourself. It's time for you to lipsync.. for the CROWN!!");
    }
    let song = lsSong().toString();
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(currentCast);
    if (event != false) {
        let eventQueen = currentCast.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = currentCast.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = currentCast.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = currentCast.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = currentCast.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = currentCast.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(currentCast, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleFinale()");
}
function finaleFinale() {
    onFinale = true;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The end.");
    screen.createBold("Ladies, I've made my decision. The Next Drag Superstar is...");
    chocolateBarTwistCheck = true;
    if (currentCast[0].finaleScore == currentCast[1].finaleScore && randomNumber(100) >= 50) {
        screen.createBold("For the FIRST TIME in Drag Race herstory, you are both winners, baby");
        screen.createImage(currentCast[0].image, "yellow");
        screen.createImage(currentCast[1].image, "yellow");
        currentCast[1].rankP = 1;
        screen.createBigText(currentCast[0].getName() + " and " + currentCast[1].getName() + "!!");
        screen.createBold("Now prance, my queens!");
        if (isThisA3Way) {
            currentCast[2].addToTrackRecord("RUNNER UP");
            currentCast[2].rankP = 32;
            eliminatedCast.unshift(currentCast[2]);
            currentCast.splice(2, 1);
        } else if (finaleof4gurl) {
            currentCast[2].addToTrackRecord("RUNNER UP");
            currentCast[2].rankP = 432;
            eliminatedCast.unshift(currentCast[2]);
            currentCast[3].addToTrackRecord("RUNNER UP");
            currentCast[3].rankP = 432;
            eliminatedCast.unshift(currentCast[3]);
            currentCast.splice(2, 2);
        }
        currentCast[0].addToTrackRecord("WINNER");
        currentCast[1].addToTrackRecord("WINNER");
        eliminatedCast.unshift(currentCast[1]);
        currentCast.splice(1, 1);
    }else{
        screen.createImage(currentCast[0].image, "yellow");
        screen.createBigText(currentCast[0].getName() + "!!");
        screen.createBold("Now prance, my queen!");
        currentCast[0].addToTrackRecord("WINNER");
        currentCast[1].addToTrackRecord("RUNNER UP");
        if (finaleof4gurl) {
            currentCast[2].addToTrackRecord("RUNNER UP");
            if (currentCast[3] != null) {
                currentCast[1].rankP = 234;
                currentCast[2].rankP = 234;
            } else {
                currentCast[1].rankP = 23;
                currentCast[2].rankP = 23;
            }
            eliminatedCast.unshift(currentCast[1]);
            eliminatedCast.unshift(currentCast[2]);
            currentCast.splice(1, 2);
            if (!allstars3Finale && !top2finaleAS && (all_stars || lipsync_assassin) || finaleof4gurl) {
                currentCast[1].addToTrackRecord("RUNNER UP");
                currentCast[1].rankP = 234;
                eliminatedCast.unshift(currentCast[1]);
                currentCast.splice(1, 1);
            }
        } else {
            if (currentCast[2] != null) {
                currentCast[1].rankP = 23;
            } else {
                currentCast[1].rankP = 2;
            }
            eliminatedCast.unshift(currentCast[1]);
            currentCast.splice(1, 1);
            if ((!allstars3Finale && !top2finaleAS && (all_stars || lipsync_assassin) || isThisA3Way) && currentCast.length == 2) {
                currentCast[1].addToTrackRecord("RUNNER UP");
                currentCast[1].rankP = 23;
                eliminatedCast.unshift(currentCast[1]);
                currentCast.splice(1, 1);
            }
        }
    }
    finaleof4gurl = false;
    isThisA3Way = false;
    top2finaleAS = false;
    episodeChallenges.push("Finale");
    screen.createButton("Proceed", "contestantProgress()");
}
function finaleAS() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    for (let i = 0; i < currentCast.length; i++)
        screen.createImage(currentCast[i].image);
    //sort queens by finale score:
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getFinale();
    }
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    screen.createParagraph("Our Top 4 will create verses and choreography for a new original song!");
    screen.createButton("Proceed", "runway()", "button2");
}
function finaleTop4() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The grand finale!");
    //sort queens by finale score and get images
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].getFinale();
        screen.createImage(currentCast[i].image);
    }
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    screen.createParagraph("Our Top 4 will star in the music video for RuPaul's song!");
    screen.createButton("Proceed", "runway()", "button2");
}
let top2finaleAS = false;
function finaleASJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The final minutes...");
    screen.createBold("Ladies, it's time to decide The Next Drag Superstar, and...");
    if (randomNumber(100) <= 90) {
        screen.createImage(currentCast[3].image, "sienna");
        screen.createBold(currentCast[3].getName() + ", I'm sorry my dear but it's not your time. I must ask you to sashay away...");
        currentCast[3].addToTrackRecord("ELIMINATED");
        eliminatedCast.unshift(currentCast[3]);
        currentCast.splice(3, 1);
        screen.createHorizontalLine();
        for (let i = 0; i < currentCast.length; i++)
            screen.createImage(currentCast[i].image, "silver");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", " + currentCast[2].getName() + ", this is your last chance to prove yourself. It's time for you to lipsync.. for the CROWN!!");
        lsSong();
    } else {
        screen.createImage(currentCast[2].image, "sienna");
        screen.createImage(currentCast[3].image, "sienna");
        screen.createBold(currentCast[2].getName() + ", " + currentCast[3].getName() + ", I'm sorry my dears but it's not your time. I must ask you both to sashay away...");
        currentCast[2].addToTrackRecord("ELIMINATED");
        currentCast[3].addToTrackRecord("ELIMINATED");
        currentCast[2].rankP = 34;
        currentCast[3].rankP = 34;
        eliminatedCast.unshift(currentCast[3]);
        eliminatedCast.unshift(currentCast[2]);
        currentCast.splice(2, 2);
        for (let i = 0; i < currentCast.length; i++)
            screen.createImage(currentCast[i].image, "silver");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", this is your last chance to prove yourself. It's time for you to lipsync.. for the CROWN!!");
        lsSong();
        top2finaleAS = true;
    }
    screen.createButton("Proceed", "finaleFinale()");
}
function finaleJuryAS() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The jury!");
    screen.createParagraph("The eliminated queens are coming back, back, back again!");
    screen.createHorizontalLine();
    let voting = [];
    for (let i = 0; i < currentCast.length; i++){
        screen.createImage(currentCast[i].image);
        currentCast[i].votes = 0;
    }
    screen.createBold("After the Top 4 had their meetings with the eliminated queens... The eliminated queens vote!!");
    for (let i = 0; i < eliminatedCast.length; i++) {
        voting = [...currentCast];
        eliminatedCast[i].lipstick = bestSister(eliminatedCast[i], voting);
        if (voting.find(q => { return q.getName() == eliminatedCast[i].lipstick.getName()}) == undefined) {
            eliminatedCast[i].lipstick = pickRandomlyFromArray(voting);
        }
        eliminatedCast[i].lipstick.votes += 2;
        voting.splice(voting.indexOf(eliminatedCast[i].lipstick), 1);
        screen.createImage(eliminatedCast[i].image , "black");
        screen.createImage(eliminatedCast[i].lipstick.image , "yellow");
        screen.createParagraph(`${eliminatedCast[i].getName()} voted for ${eliminatedCast[i].lipstick.getName()}! As their first option.`);
        eliminatedCast[i].lipstick = bestSister(eliminatedCast[i], voting);
        if (voting.find(q => { return q.getName() == eliminatedCast[i].lipstick.getName()}) == undefined) {
            eliminatedCast[i].lipstick = pickRandomlyFromArray(voting);
        }
        eliminatedCast[i].lipstick.votes += 1;
        screen.createImage(eliminatedCast[i].image , "black");
        screen.createImage(eliminatedCast[i].lipstick.image , "silver");
        screen.createParagraph(`${eliminatedCast[i].getName()} voted for ${eliminatedCast[i].lipstick.getName()}! As their second option.`);
    }
    screen.createHorizontalLine();
    screen.createBold("The results are in..!!");
    for (let i = 0; i < currentCast.length; i++) {
        screen.createBold(`${currentCast[i].getName()}: ${currentCast[i].votes.toString()} points`);
    }
    screen.createHorizontalLine();
    let queen = currentCast.sort((a, b) => b.votes - a.votes)[0];
    let queen1 = currentCast.sort((a, b) => b.votes - a.votes)[1];
    if (currentCast[1].votes == currentCast[2].votes) {
        screen.createBold("It is a tie, the queens must revote between " + currentCast[1].getName() + " and " + currentCast[2].getName() + "!!");
        let ogvote = currentCast[1].votes;
        currentCast[1].votes = 0;
        currentCast[2].votes = 0;
        for (let i = 0; i < eliminatedCast.length; i++) {
            voting = [currentCast[1], currentCast[2]];
            eliminatedCast[i].lipstick = bestSister(eliminatedCast[i], voting);
            if (voting.find(q => { return q.getName() == eliminatedCast[i].lipstick.getName()}) == undefined) {
                eliminatedCast[i].lipstick = pickRandomlyFromArray(voting);
            }
            eliminatedCast[i].lipstick.votes += 1;
            screen.createImage(eliminatedCast[i].image , "black");
            screen.createImage(eliminatedCast[i].lipstick.image , "yellow");
            screen.createParagraph(`${eliminatedCast[i].getName()} voted for ${eliminatedCast[i].lipstick.getName()}! to be in the finale!`);
        }
        screen.createHorizontalLine();
        screen.createBold("The results are in..!");
        for (let i = 0; i < voting.length; i++) {
            screen.createBold(`${voting[i].getName()}: ${voting[i].votes.toString()} points`);
        }
        let tiebreaker = voting.sort((a, b) => b.votes - a.votes)[0];
        screen.createBold(`${tiebreaker.getName()} moves into the finale!!`);
        tiebreaker.votes = ogvote;
        voting[1].votes = ogvote;
        queen1 = tiebreaker;
    }
    screen.createBold(`${queen.getName()} and ${queen1.getName()} are the Top 2 of the season!!`);
    if (queen1 == currentCast[1]) {
        currentCast[2].addToTrackRecord("ELIMINATED");
        currentCast[2].rankP = 34;
        currentCast[3].rankP = 34;
        eliminatedCast.unshift(currentCast[2]);
        currentCast[3].addToTrackRecord("ELIMINATED");
        eliminatedCast.unshift(currentCast[3]);
        currentCast.splice(2, 2);
    } else {
        currentCast[1].addToTrackRecord("ELIMINATED");
        currentCast[1].rankP = 34;
        currentCast[3].rankP = 34;
        eliminatedCast.unshift(currentCast[1]);
        currentCast[3].addToTrackRecord("ELIMINATED");
        eliminatedCast.unshift(currentCast[3]);
        currentCast.splice(1, 3);
        currentCast.push(queen1);
    }
    currentCast.sort((a, b) => (b.finaleScore - a.finaleScore));
    screen.createButton("Proceed", "finaleFinale()");
}
function awFinale() {
    onTop4Finale = true;
    onFinale = true;
    chocolateBarTwistCheck = true;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The end...");
    screen.createBold("The 4 queens with the most stars will advance to the grand finale!");
    screen.createHorizontalLine();
    currentCast.sort((a, b) => (b.stars - a.stars));
    let abcd = tiesInFinale();
    switch (abcd) {
        case 1:
            screen.createBold("As we have a tie... The queens I chose to go to the grand finale are...");
            break;
        case 2:
            screen.createBold(currentCast[0].getName() + ", you must choose which of your sisters you'd like to invite to the Grand Finale!");
            let queensTied = "";
            for (let i = 0; i < wht.length; i++) {
                if (i != wht.length - 1) { 
                    queensTied += wht[i].getName() + ", ";
                } else {
                    queensTied += " or " + wht[i].getName();
                }
            }
            screen.createBold("Will it be... " + queensTied);
            for (let i = qonfi; i < 4; i++) {
                currentCast[0].lipstick = bestSister(currentCast[0], wht);
                screen.createImage(currentCast[0].image, "black");
                screen.createImage(currentCast[0].lipstick.image, "black");
                screen.createBold(currentCast[0].getName() + " chose " + currentCast[0].lipstick.getName());
                wht.splice(wht.indexOf(currentCast[0].lipstick), 1);
                currentCast.splice(qonfi, 0, currentCast.splice(currentCast.indexOf(currentCast[0].lipstick), 1)[0]);
            }
            screen.createHorizontalLine();
            screen.createBold("The queens advancing to the grand finale are...");
            break;
        case 3:
            screen.createBold("The queens advancing to the grand finale are...");
            break;
        default:
            break;
    }
    for (let i = 0; i < 4; i++) {
        screen.createImage(currentCast[i].image, "gold");
        screen.createBold(currentCast[i].getName() + " with " + currentCast[i].stars + " stars!");
    }
    screen.createHorizontalLine();
    let p = currentCast.length - 1;
    while(currentCast.length != 4) {
        currentCast[p].rankP = 58; 
        if (p > 7) {
            currentCast[p].addToTrackRecord("ELIMINATED");
        }
        if (p <= 7) {
            sdadhh.push(currentCast[p]);
        } else {
            eliminatedCast.push(currentCast[p]);
        }
        screen.createImage(currentCast[p].image, "sienna");
        screen.createBold(currentCast[p].getName() + ", sashay away...");
        currentCast.splice(currentCast.indexOf(currentCast[p], 1));
        p--;
    }
    screen.createButton("Proceed", "sheDADHH()");
}
let wht = [];
let qonfi = 0;
function tiesInFinale() {
    let theOnes = [];
    let comparing = [];
    let pivot = 0;
    let tied = false;
    while (theOnes.length < 4 && tied == false) {
        comparing = [];
        comparing = currentCast.filter((queen) => {
            return queen.stars == (currentCast[0].stars - pivot);
        });
        if (comparing.length == 4 && theOnes.length == 0) {
            for (let i = 0; i < comparing.length; i++) {
                theOnes.push(comparing[i]);
            }
        } else if (comparing.length > 4 && theOnes.length == 0) {
            for (let i = 0; i < comparing.length; i++) {
                theOnes.push(comparing[i]);
            }
        } else if(4 - theOnes.length >= comparing.length) {
                    for (let i = 0; i < comparing.length; i++) {
                        theOnes.push(comparing[i]);
                    }
                    pivot++;
        } else {
            tied = true;
        }
    }
    if (theOnes.length > 4) { return 1}
    if (theOnes.length < 4) { wht = comparing; qonfi = theOnes.length; return 2}
    if (theOnes.length == 4) { return 3}
}
let shedadhh = false;
let sdadhh = [];
function sheDADHH() {
    shedadhh = true;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("She Done Already Done Had Herses");
    for (let i = 0; i < 4; i++) {
        screen.createImage(sdadhh[i].image, "#75975E");
    }
    if (sdadhh.length > 4) {
        screen.createParagraph("Our Top 4 eliminated queens will participate in a lip-sync smackdown for the crown! The preliminaries will now be decided...");
    } else {
        screen.createParagraph("Our eliminated queens will participate in a lip-sync smackdown for the crown! The preliminaries will now be decided...");
    }
    screen.createHorizontalLine();
    for (let i = 0; i < 2; i++) {
        let q1 = pickRandomlyFromArray(sdadhh);
        firstLS.push(q1);
        sdadhh.splice(sdadhh.indexOf(q1), 1);
        let q2 = pickRandomlyFromArray(sdadhh);
        secondLS.push(q2);
        sdadhh.splice(sdadhh.indexOf(q2), 1);
    }
    screen.createBigText("The preliminaries will be: ");
    screen.createImage(firstLS[0].image, "#87AB69");
    screen.createImage(firstLS[1].image, "#87AB69");
    screen.createBold(firstLS[0].getName() + " vs. " + firstLS[1].getName());
    screen.createParagraph("and");
    screen.createImage(secondLS[0].image, "#A3C585");
    screen.createImage(secondLS[1].image, "#A3C585");
    screen.createBold(secondLS[0].getName() + " vs. " + secondLS[1].getName());
    screen.createButton("Proceed", "finaleLipSyncsDesc1()");
}
function canadaS2Finale() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Our Top 4 is about to become a Top 3...");
    screen.createImage(currentCast[0].image, "royalblue");
    screen.createImage(currentCast[1].image, "royalblue");
    screen.createImage(currentCast[2].image, "royalblue");
    screen.createImage(currentCast[3].image, "royalblue");
    screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", " + currentCast[2].getName() + ", " + currentCast[3].getName() + ", you will all be competing in a lipsync batte royale!!");
    screen.createHorizontalLine();
    for (let i = 0; i < 2; i++) {
        let q1 = pickRandomlyFromArray(currentCast);
        firstLS.push(q1);
        currentCast.splice(currentCast.indexOf(q1), 1);
        let q2 = pickRandomlyFromArray(currentCast);
        secondLS.push(q2);
        currentCast.splice(currentCast.indexOf(q2), 1);
    }
    screen.createBigText("The lipsyncs will be: ");
    screen.createImage(firstLS[0].image, "darkblue");
    screen.createImage(firstLS[1].image, "darkblue");
    screen.createBold(firstLS[0].getName() + " vs. " + firstLS[1].getName());
    screen.createParagraph("and");
    screen.createImage(secondLS[0].image, "darkred");
    screen.createImage(secondLS[1].image, "darkred");
    screen.createBold(secondLS[0].getName() + " vs. " + secondLS[1].getName());
    episodeChallenges.push("Lipsync For The Finale");
    screen.createButton("Proceed", "finaleLipSyncsDesc1()");
}
function canadaS2LipSyncs1() {
    let screen = new Scene();
    screen.clean();
    firstLS.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    finalLS.push(firstLS[1]);
    firstLS[0].addToTrackRecord("TOP 3<br><small>Win round 1</small>");
    screen.createImage(firstLS[0].image, "silver");
    screen.createBold(firstLS[0].getName() + ", shantay you stay. We will see you at the finale!!");
    currentCast.unshift(firstLS[0]);
    screen.createImage(firstLS[1].image, "sienna");
    screen.createBold(firstLS[1].getName() + ", you will have one more chance to redeem yourself...");
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleLipSyncsDesc2()");
}
function canadaS2LipSyncs2() {
    let screen = new Scene();
    screen.clean();
    secondLS.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    finalLS.push(secondLS[1]);
    secondLS[0].addToTrackRecord("TOP 3<br><small>Win round 2</small>");
    screen.createImage(secondLS[0].image, "silver");
    screen.createBold(secondLS[0].getName() + ", shantay you stay. We will see you at the finale!!");
    currentCast.unshift(secondLS[0]);
    screen.createImage(secondLS[1].image, "sienna");
    screen.createBold(secondLS[1].getName() + ", you will have one more chance to redeem yourself...");
    screen.createHorizontalLine();
    screen.createButton("Proceed", "finaleCanadaLipsync()");
}
function  canadaS2LipSyncs3() {
    let screen = new Scene();
    screen.clean();
    finalLS.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    finalLS[0].addToTrackRecord("TOP 3<br><small>Win round 3</small>");
    screen.createImage(finalLS[0].image, "silver");
    screen.createBold(finalLS[0].getName() + ", shantay you stay. We will see you at the finale!!");
    currentCast.unshift(finalLS[0]);
    if (chocolateBarTwist  && !chocolateBarTwistCheck) {
        screen.createBold(finalLS[1].getName() + ", now your fate rests in the hands of the drag gods.");
        screen.createBold("If you have the golden chocolate bar, you will be safe.");
        if (chocolateBarCheck(finalLS[1]) == true) {
            screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
            screen.createImage(finalLS[1].image, "gold");
            screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
            screen.createBold(finalLS[1].getName() + "!! Condragulations, you are safe to slay another day and you move on into the finale!!");
            finalLS[1].addToTrackRecord("CHOC");
            finalLS[1].unfavoritism += 3;
            chocolateBarTwistCheck = true;
            currentCast.push(finalLS[1]);
        } else {
            screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
            screen.createBold("It's chocolate.");
            eliminatedCast.unshift(finalLS[1]);
            screen.createImage(finalLS[1].image, "sienna");
            screen.createBold(finalLS[1].getName() + ", sashay away...");
            finalLS[1].addToTrackRecord("ELIMINATED");
        }
    } else {
        eliminatedCast.unshift(finalLS[1]);
        screen.createImage(finalLS[1].image, "sienna");
        screen.createBold(finalLS[1].getName() + ", sashay away...");
        finalLS[1].addToTrackRecord("ELIMINATED");
    }
    episodeCount++;
    for (let i = 0; i < eliminatedCast.length; i++)
        eliminatedCast[i].addToTrackRecord('');
    screen.createButton("Proceed", "finale()");
}
let blots = [];
function memLips() {
    blots.sort((a, b) => (b.score - a.score));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Memorable Lipsyncs");
    screen.createBold("The best and worst lipsyncs of the season!");
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let trackRecords = document.createElement("table");
    trackRecords.setAttribute("id", "trackRecord");
    trackRecords.setAttribute("class", "trtable");
    trackRecords.setAttribute("border", "2");
    let header = document.createElement("tr");
    trackRecords.appendChild(header);
    let thr = document.createElement("th");
    thr.innerHTML = "Lipsync";
    thr.setAttribute("class", "nameTR");
    header.appendChild(thr);
    let th = document.createElement("th");
    th.innerHTML = "Lipsync Song";
    th.setAttribute("class", "nameTR");
    header.appendChild(th);
    if (blots.length == 0) {
        let row = document.createElement("tr");
        let lipsync = document.createElement("td");
        lipsync.setAttribute("class", "song");
        lipsync.setAttribute("colspan", "2");
        lipsync.innerHTML = "There was no memorable lipsyncs this season";
        row.appendChild(lipsync);
        trackRecords.appendChild(row);
    } else {
        for (let i = 0; i < blots.length; i++) {
            let row = document.createElement("tr");
            let lipsync = document.createElement("td");
            let song = document.createElement("td");
            lipsync.innerHTML = blots[i].queens;
            song.innerHTML = blots[i].lsSong;
            if (blots[i].score > 5) {
                lipsync.setAttribute("class", "song blue");
                song.setAttribute("class", "song blue");
            } else {
                lipsync.setAttribute("class", "song red");
                song.setAttribute("class", "song red");
            }
            row.appendChild(lipsync);
            row.appendChild(song);
            trackRecords.appendChild(row);
        }
    }
    centering.appendChild(trackRecords);
    let br = document.createElement("br");
    centering.appendChild(br);
    main.appendChild(centering);
    screen.createButton("Track Records", "contestantProgress()", "stat");
    if (lipsync_assassin) {
        screen.createButton("RuMocracy", "votingChart()", "stat");
    }
    if (lipsync_assassin || all_stars) {
        screen.createButton("Lipstick Choices", "lsticksChoices()", "stat");
    }
    let stats = document.querySelectorAll("#stat");
    for (let i = 0; i < stats.length; i++) {
        stats[i].setAttribute("class", "statistics");
    }
    screen.createHorizontalLine();
    screen.createButton("Simulate again!", "reSimulate()");
    screen.createButton("Download", "downloadTR()", "downloadTR");
    screen.createHorizontalLine();
    screen.createButton("Back to main page", "location.reload()");
    let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
    let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
    koffeDiv[0].classList.toggle("hide", false);
    koffeDivMovil[0].classList.toggle("hide", false);
}
let decidingVote4Chart = [];
let votesTotal4Chart = [];
let elimKween4Chart = [];
function votingChart() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("RuMocracy Voting Herstory");
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let trackRecords = document.createElement("table");
    trackRecords.setAttribute("id", "trackRecord");
    trackRecords.setAttribute("class", "trtable");
    trackRecords.setAttribute("border", "2");
    let header = document.createElement("tr");
    trackRecords.appendChild(header);
    let thr = document.createElement("th");
    thr.innerHTML = "Episode #";
    thr.setAttribute("style", "font-weight: bold;");
    header.appendChild(thr);
    for (let i = 0; i < episodeChallenges.length - 1; i++) {
        if (episodeChallenges[i] != "Lipsync Smackdown" && episodeChallenges[i] != "LaLaPaRUza" && episodeChallenges[i] != "Queens of Comedy" && episodeChallenges[i] != "Kitty Girl Group") {
            let th = document.createElement("th");
            th.innerHTML = "Ep. " + (i+1);
            th.setAttribute("style", "font-weight: bold;");
            header.appendChild(th);
        }
    }
    let decvote = document.createElement("tr");
    let thistext = document.createElement("td");
    thistext.innerHTML = "Deciding Vote";
    thistext.setAttribute("class", "nameTR");
    decvote.appendChild(thistext);
    for (let i = 0; i < decidingVote4Chart.length; i++) {
        let dv = document.createElement("td");
        dv.setAttribute("class", "rumocracy");
        dv.innerHTML = decidingVote4Chart[i];
        if (dv.innerHTML == "The Group") {
            dv.setAttribute("style", "background-color: deepskyblue;");
        } else if (dv.innerHTML.substring(0,16) == "The Group &amp; ") {
            dv.setAttribute("style", "background-color: steelblue;");
        } else if (dv.innerHTML.substring(dv.innerHTML.length - 16) == " &amp; The Group") {
            dv.setAttribute("style", "background-color: darkblue; color: white;");
        } else {
            dv.setAttribute("style", "font-weight: bold; background-color: royalblue;");
        }
        decvote.appendChild(dv);
    }
    trackRecords.appendChild(decvote);
    let line = document.createElement("tr");
    let linetd = document.createElement("td");
    linetd.setAttribute("style", "background-color: #F09C38;");
    linetd.setAttribute("colspan", episodeChallenges.length - 1);
    line.appendChild(linetd);
    trackRecords.appendChild(line);
    for (let i = 0; i < currentCast.length; i++) {
        let contestant = document.createElement("tr");
        let name = document.createElement("td");
        name.setAttribute("class", "nameTR");
        name.innerHTML = currentCast[i].getName();
        contestant.appendChild(name);
        for (let k = 0; k < currentCast[i].voteHerstory.length; k++) {
            let vote = document.createElement("td");
            vote.setAttribute("class", "rumocracy");
            vote.innerHTML = currentCast[i].voteHerstory[k];
            if (vote.innerHTML != '') {
                vote.setAttribute("style", "background-color: white;");
            } else {
                vote.setAttribute("style", "background-color: drakgray;");
            }
            contestant.appendChild(vote);
        }
        trackRecords.appendChild(contestant);
    }
    for (let i = 0; i < eliminatedCast.length; i++) {
        let contestant = document.createElement("tr");
        let name = document.createElement("td");
        name.setAttribute("class", "nameTR");
        name.innerHTML = eliminatedCast[i].getName();
        contestant.appendChild(name);
        for (let k = 0; k < eliminatedCast[i].voteHerstory.length; k++) {
            let vote = document.createElement("td");
            vote.setAttribute("class", "rumocracy");
            vote.innerHTML = eliminatedCast[i].voteHerstory[k];
            if (vote.innerHTML != '') {
                vote.setAttribute("style", "background-color: white;");
            } else {
                vote.setAttribute("style", "background-color: darkgray;");
            }
            contestant.appendChild(vote);
        }
        trackRecords.appendChild(contestant);
    }
    let line2 = document.createElement("tr");
    let linetd2 = document.createElement("td");
    linetd2.setAttribute("style", "background-color: #F09C38;");
    linetd2.setAttribute("colspan", episodeChallenges.length - 1);
    line2.appendChild(linetd2);
    trackRecords.appendChild(line2);
    
    let totalVotes = document.createElement("tr");
    let votesText = document.createElement("td");
    votesText.innerHTML = "The Group's <br>Votes";
    votesText.setAttribute("class", "nameTR");
    totalVotes.appendChild(votesText);
    for (let i = 0; i < votesTotal4Chart.length; i++) {
        let dv = document.createElement("td");
        dv.setAttribute("class", "rumocracy");
        dv.innerHTML = votesTotal4Chart[i];
        dv.setAttribute("style", "background-color: white;");
        totalVotes.appendChild(dv);
    }
    trackRecords.appendChild(totalVotes);
    let elimkween = document.createElement("tr");
    let elimText = document.createElement("td");
    elimText.innerHTML = "Eliminated <br>Contestant";
    elimText.setAttribute("class", "nameTR");
    elimkween.appendChild(elimText);
    for (let i = 0; i < elimKween4Chart.length; i++) {
        let dv = document.createElement("td");
        dv.setAttribute("class", "rumocracy");
        dv.innerHTML = elimKween4Chart[i].text;
        if (elimKween4Chart[i].type == 1) {
            dv.setAttribute("style", "background-color: deeppink;");
        } else if (elimKween4Chart[i].type == 2) {
            dv.setAttribute("style", "background-color: brown;");
        } else if (elimKween4Chart[i].type == 3) {
            dv.setAttribute("style", "background-color: darkred; color: white;");
        } else {
            dv.setAttribute("style", "font-weight: bold; background-color: red;");
        }
        elimkween.appendChild(dv);
    }
    trackRecords.appendChild(elimkween);
    centering.appendChild(trackRecords);
    let br = document.createElement("br");
    centering.appendChild(br);
    main.appendChild(centering);
    screen.createButton("Track Records", "contestantProgress()", "stat");
    screen.createButton("Memorable Lipsyncs", "memLips()", "stat");
    if (lipsync_assassin || all_stars) {
        screen.createButton("Lipstick Choices", "lsticksChoices()", "stat");
    }
    let stats = document.querySelectorAll("#stat");
    for (let i = 0; i < stats.length; i++) {
        stats[i].setAttribute("class", "statistics");
    }
    screen.createHorizontalLine();
    screen.createButton("Simulate again!", "reSimulate()");
    screen.createButton("Download", "downloadTR()", "downloadTR");
    screen.createHorizontalLine();
    screen.createButton("Back to main page", "location.reload()");
    let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
    let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
    koffeDiv[0].classList.toggle("hide", false);
    koffeDivMovil[0].classList.toggle("hide", false);
}
function contestantProgress() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Contestant Progress");
    document.body.style.backgroundImage = "url('image/bg.png')";
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let trackRecords = document.createElement("table");
    trackRecords.setAttribute("id", "trackRecord");
    trackRecords.setAttribute("class", "trtable");
    trackRecords.setAttribute("border", "2");
    let header = document.createElement("tr");
    trackRecords.appendChild(header);
    let thr = document.createElement("th");
    thr.innerHTML = "Rank";
    thr.setAttribute("style", "font-weight: bold;");
    thr.setAttribute("rowspan", "2");
    header.appendChild(thr);
    let th = document.createElement("th");
    th.innerHTML = "Contestant";
    th.setAttribute("style", "font-weight: bold; width: 100px;");
    th.setAttribute("rowspan", "2");
    header.appendChild(th);
    let th_i = document.createElement("th");
    th_i.innerHTML = "Photo";
    th_i.setAttribute("style", "font-weight: bold;");
    th_i.setAttribute("rowspan", "2");
    header.appendChild(th_i);
    for (let i = 0; i < episodeChallenges.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = "Ep. " + (i+1);
        th.setAttribute("style", "font-weight: bold;");
        header.appendChild(th);
    }
    let header1 = document.createElement("tr");
    for (let i = 0; i < episodeChallenges.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = "<small>" + episodeChallenges[i] + "</small>";
        th.setAttribute("class", "episodeTR");
        header1.appendChild(th);
    }
    trackRecords.appendChild(header1);
    let th_2 = document.createElement("th");
    th_2.setAttribute("class", "ppeTR");
    th_2.setAttribute("rowspan", "2");
    if (all_winners) {
        th_2.innerHTML = "PPE - Stars";
    } else {
        th_2.innerHTML = "PPE";
    }
    header.appendChild(th_2);
    let winner = document.createElement("tr");
    let rank = document.createElement("td");
    rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
    rank.innerHTML = "1st<br><small>(Winner)</small>"
    winner.appendChild(rank);
    let name = document.createElement("td");
    name.setAttribute("class", "nameTR");
    if (onFinale) {
        let winnerQueen;
        if (!lftc)
            winnerQueen = currentCast[0];
        else if (onTop4Finale)
            winnerQueen = finalLS[0];
        else
            winnerQueen = currentCast[0];
        name.innerHTML = winnerQueen.getName();
        winner.appendChild(name);
        let photo = document.createElement("td");
        photo.setAttribute("style", "background: url("+ winnerQueen.image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
        photo.setAttribute("class", "placement");
        winner.appendChild(photo);
        for (let i = 0; i < winnerQueen.trackRecord.length + 1; i++) {
            let placement = document.createElement("td");
            placement.setAttribute("class", "placement");
            placement.innerHTML = winnerQueen.trackRecord[i];
            if (placement.innerHTML == "WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
            }
            else if (placement.innerHTML == "TOP 2") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 3") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 4") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP2") {
                placement.setAttribute("style", "background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
            }
            else if (placement.innerHTML == "LOW") {
                placement.setAttribute("style", "background-color: pink;");
            }
            else if (placement.innerHTML == "HIGH") {
                placement.setAttribute("style", "background-color: lightblue;");
            }
            else if (placement.innerHTML == "HIGH TEAM") {
                placement.setAttribute("style", "background-color: aquamarine;");
            }
            else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: #D66D73;");
                placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
            }
            else if (placement.innerHTML == "BTM2 ") {
                placement.setAttribute("style", "background-color: #FA8072;");
            }
            else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                placement.setAttribute("style", "background-color: tomato;");
            }
            else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
            }
            else if (placement.innerHTML == "CHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
            }
            else if (placement.innerHTML == "ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: red;");
            }
            else if (placement.innerHTML == "ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
            }
            else if (placement.innerHTML == " ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
            }
            else if (placement.innerHTML == " ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
            }
            else if (placement.innerHTML == "WINNER") {
                placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + winnerQueen.votes + " points) </small>";
            }
            else if (placement.innerHTML == "RUNNER UP") {
                placement.setAttribute("style", "font-weight: bold; background-color: silver;");
            }
            else if (placement.innerHTML == "ELIMINATED") {
                placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                placement.innerHTML = "ELIM";
            }
            else if (placement.innerHTML == "WINNER ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
            }
            else if (placement.innerHTML == "") {
                placement.setAttribute("style", "background-color: gray");
            }
            else if (placement.innerHTML == "WIN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "WIN TIE") {
                placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "  WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
            }
            else if (placement.innerHTML == "WIN+RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color: white;");
                placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
            }
            else if (placement.innerHTML == "SAFE") {
                placement.setAttribute("style", "background-color: white;");
            }
            else if (placement.innerHTML == "SAFE ") {
                    placement.setAttribute("style", "background-color: palegreen; color:#000;");
            }
            else if (placement.innerHTML == " SAFE ") {
                    placement.setAttribute("style", "background-color: #7D1935; color:#000;");
            }
            else if (placement.innerHTML == " SAFE") {
                placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                placement.setAttribute("style", "background-color: lightcoral; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                placement.setAttribute("style", "background-color: indianred; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                placement.setAttribute("style", "background-color: crimson; color: white;");
            }
            else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: red; font-weight: bold;");
                placement.innerHTML = "BLOCK";
            }
            else if (placement.innerHTML == "RUN") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "RUN ") {
                    placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
            }
            else if (placement.innerHTML == "OUT") {
                placement.setAttribute("style", "background-color: forestgreen; color:white;");
            }
            else if (placement.innerHTML == "OUT ") {
                    placement.setAttribute("style", "background-color: purple; color:white;");
            }
            else if (placement.innerHTML == " WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
            }
            else if (placement.innerHTML == "DISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
            }
            else if (placement.innerHTML == "DEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
            }
            else if (placement.innerHTML == "QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
            }
            else if (placement.innerHTML == "WIN+QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
            }
            else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                placement.setAttribute("style", "background-color:cornflowerblue;");
                placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
            }
            else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                placement.setAttribute("style", "background-color:#ee82ee;");
                placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
            }
            else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                placement.innerHTML = "WIN <br>+<br> CHOC";
            }
            else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                placement.innerHTML = "WIN <br>+<br> DISQ";
            }
            else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                placement.innerHTML = "WIN <br>+<br> DEPT";
            }
            else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                placement.innerHTML = "WIN <br>+<br> QUIT";
            }
            else if (placement.innerHTML == "RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
            }
            else if (placement.innerHTML == "RTRN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: orange;");
            }
            else if (placement.innerHTML == " WIN ") {
                placement.setAttribute("style", "background-color: lightskyblue;");
            }
            else if (placement.innerHTML == "QUIT ") {
                placement.setAttribute("style", "background-color: #C86666;");
            }
            else if (placement.innerHTML == "ADV") {
                placement.setAttribute("style", "background-color: #90ee90;");
            }
            else if (placement.innerHTML == "LOSS") {
                placement.setAttribute("style", "background-color: #ff9e9e;");
            }
            else if (placement.innerHTML == "LOSS ") {
                placement.setAttribute("style", "background-color: orange;");
            }
            else if (placement.innerHTML == "GUEST") {
                placement.setAttribute("style", "background-color: lightgrey;");
            }
            else if (placement.innerHTML == "MISS CON") {
                placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
            }
            else if (placement.innerHTML == "undefined" && all_winners) {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (winnerQueen.ppe / (winnerQueen.episodesOn)).toFixed(2) + " - " + winnerQueen.stars;
            }
            else if (placement.innerHTML == "undefined") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (winnerQueen.ppe / (winnerQueen.episodesOn)).toFixed(2);
            }
            if (winnerQueen.retEp == (i+1) && winnerQueen.retEp - winnerQueen.trackRecord.length <= 0 || winnerQueen.retEp != 0 && winnerQueen.retEp2 != undefined) {
                placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                    placement.setAttribute("style", "background-color: #ffb18a;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                    placement.setAttribute("style", "background-color: greenyellow;");
                }
            }
            if (winnerQueen.miniEpisode.indexOf((i+1)) != -1) {
                if (winnerQueen.tCaptain.indexOf((i+1)) != -1) {
                    placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                } else {
                    placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                }
            }
            if (winnerQueen.immuneEp.indexOf((i)) != -1 && i != winnerQueen.trackRecord.length) {
                placement.style.backgroundColor = "magenta";
                placement.style.color = "white";
            }
            winner.appendChild(placement);
        }
        trackRecords.appendChild(winner);
    }
    if (!onFinale) {
        for (let i = 0; i < currentCast.length; i++) {
            let contestant = document.createElement("tr");
            let rank = document.createElement("td");
            rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
            rank.innerHTML = "TBA"
            contestant.appendChild(rank);
            let name = document.createElement("td");
            name.setAttribute("class", "nameTR");
            name.innerHTML = currentCast[i].getName();
            contestant.appendChild(name);
            let photo = document.createElement("td");
            photo.setAttribute("style", "background: url("+ currentCast[i].image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
            photo.setAttribute("class", "placement");
            contestant.appendChild(photo);
            for (let k = 0; k < currentCast[i].trackRecord.length + 1; k++) {
                let placement = document.createElement("td");
                placement.setAttribute("class", "placement");
                placement.innerHTML = currentCast[i].trackRecord[k];
                if (placement.innerHTML == "WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
                }
                else if (placement.innerHTML == "TOP 2") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP 3") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP 4") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP2") {
                    placement.setAttribute("style", "background-color: deepskyblue;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
                }
                else if (placement.innerHTML == "LOW") {
                    placement.setAttribute("style", "background-color: pink;");
                }
                else if (placement.innerHTML == "HIGH") {
                    placement.setAttribute("style", "background-color: lightblue;");
                }
                else if (placement.innerHTML == "HIGH TEAM") {
                    placement.setAttribute("style", "background-color: aquamarine;");
                }
                else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                    placement.setAttribute("style", "background-color: #D66D73;");
                    placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
                }
                else if (placement.innerHTML == "BTM2 ") {
                    placement.setAttribute("style", "background-color: #FA8072;");
                }
                else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                    placement.setAttribute("style", "background-color: tomato;");
                }
                else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                    placement.setAttribute("style", "background-color: hotpink;");
                }
                else if (placement.innerHTML == "CHOC") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                }
                else if (placement.innerHTML == "ELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color: red;");
                }
                else if (placement.innerHTML == "ELIM ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
                }
                else if (placement.innerHTML == " ELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
                }
                else if (placement.innerHTML == " ELIM ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
                }
                else if (placement.innerHTML == "WINNER") {
                    placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
                }
                else if (placement.innerHTML == "RUNNER UP") {
                    placement.setAttribute("style", "font-weight: bold; background-color: silver;");
                }
                else if (placement.innerHTML == "ELIMINATED") {
                    placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                    placement.innerHTML = "ELIM";
                }
                else if (placement.innerHTML == "WINNER ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
                }
                else if (placement.innerHTML == "LOST 1ST ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
                }
                else if (placement.innerHTML == "LOST 1ST ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
                }
                else if (placement.innerHTML == "LOST 2ND ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
                }
                else if (placement.innerHTML == "LOST 2ND ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
                }
                else if (placement.innerHTML == "LOST 3RD ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
                }
                else if (placement.innerHTML == "LOST 3RD ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
                }
                else if (placement.innerHTML == "") {
                    placement.setAttribute("style", "background-color: gray");
                }
                else if (placement.innerHTML == "WIN ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
                }
                else if (placement.innerHTML == "WIN TIE") {
                    placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                    placement.innerHTML = "WIN";
                }
                else if (placement.innerHTML == "  WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
                }
                else if (placement.innerHTML == "WIN+RTRN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color:white;");
                    placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
                }
                else if (placement.innerHTML == "SAFE") {
                    placement.setAttribute("style", "background-color: white;");
                }
                else if (placement.innerHTML == "SAFE ") {
                        placement.setAttribute("style", "background-color: palegreen; color:#000;");
                }
                else if (placement.innerHTML == " SAFE ") {
                        placement.setAttribute("style", "background-color: #7D1935; color:#000;");
                }
                else if (placement.innerHTML == " SAFE") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                    placement.setAttribute("style", "background-color: lightcoral; color: white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                    placement.setAttribute("style", "background-color: indianred; color: white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                    placement.setAttribute("style", "background-color: crimson; color: white;");
                }
                else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                    placement.setAttribute("style", "background-color: red; font-weight: bold;");
                    placement.innerHTML = "BLOCK"
                }
                else if (placement.innerHTML == "RUN") {
                        placement.setAttribute("style", "background-color: magenta; color:white;");
                }
                else if (placement.innerHTML == "RUN ") {
                        placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
                }
                else if (placement.innerHTML == "OUT") {
                    placement.setAttribute("style", "background-color: forestgreen; color:white;");
                }
                else if (placement.innerHTML == "OUT ") {
                        placement.setAttribute("style", "background-color: purple; color:white;");
                }
                else if (placement.innerHTML == " WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
                }
                else if (placement.innerHTML == "DISQ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                }
                else if (placement.innerHTML == "DEPT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                }
                else if (placement.innerHTML == "QUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                }
                else if (placement.innerHTML == "WIN+QUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                    placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
                }
                else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                    placement.innerHTML = "WIN";
                }
                else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                    placement.setAttribute("style", "background-color:cornflowerblue;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
                }
                else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                    placement.setAttribute("style", "background-color:#ee82ee;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
                }
                else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                    placement.setAttribute("style", "background-color:mediumorchid;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
                }
                else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                    placement.setAttribute("style", "background-color:mediumorchid;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
                }
                else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                    placement.innerHTML = "WIN <br>+<br> ELIM";
                }
                else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                    placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                    placement.innerHTML = "WIN <br>+<br> ELIM";
                }
                else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                    placement.setAttribute("style", "background-color: hotpink;");
                    placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
                }
                else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                    placement.setAttribute("style", "background-color: hotpink;");
                    placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
                }
                else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                    placement.innerHTML = "WIN <br>+<br> CHOC";
                }
                else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                    placement.innerHTML = "WIN <br>+<br> DISQ";
                }
                else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                    placement.innerHTML = "WIN <br>+<br> DEPT";
                }
                else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                    placement.innerHTML = "WIN <br>+<br> QUIT";
                }
                else if (placement.innerHTML == "RTRN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
                }
                else if (placement.innerHTML == "RTRN ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: orange;");
                }
                else if (placement.innerHTML == " WIN ") {
                    placement.setAttribute("style", "background-color: lightskyblue;");
                }
                else if (placement.innerHTML == "QUIT ") {
                    placement.setAttribute("style", "background-color: #C86666;");
                }
                else if (placement.innerHTML == "ADV") {
                    placement.setAttribute("style", "background-color: #90ee90;");
                }
                else if (placement.innerHTML == "LOSS") {
                    placement.setAttribute("style", "background-color: #ff9e9e;");
                }
                else if (placement.innerHTML == "LOSS ") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                else if (placement.innerHTML == "GUEST") {
                    placement.setAttribute("style", "background-color: lightgrey;");
                }
                else if (placement.innerHTML == "MISS CON") {
                    placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
                }
                else if (placement.innerHTML == "undefined" && all_winners) {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                    placement.innerHTML = (currentCast[i].ppe / (currentCast[i].episodesOn)).toFixed(2) + " - " + currentCast[i].stars;
                }
                else if (placement.innerHTML == "undefined") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                    placement.innerHTML = (currentCast[i].ppe / (currentCast[i].episodesOn)).toFixed(2);
                }
                if (currentCast[i].retEp == (k+1) && currentCast[i].retEp - currentCast[i].trackRecord.length <= 0 || currentCast[i].retEp != 0 && currentCast[i].retEp2 != undefined) {
                    placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                        placement.setAttribute("style", "background-color: orange;");
                    }
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                        placement.setAttribute("style", "background-color: #ffb18a;");
                    }
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                        placement.setAttribute("style", "background-color: greenyellow;");
                    }
                }
                if (currentCast[i].miniEpisode.indexOf(k+1) != -1) {
                    if (currentCast[i].tCaptain.indexOf((k+1)) != -1) {
                        placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                    } else {
                        placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                    }
                }
                if (currentCast[i].immuneEp.indexOf((k)) != -1 && k != currentCast[i].trackRecord.length) {
                    placement.style.backgroundColor = "magenta";
                    placement.style.color = "white";
                }
                contestant.appendChild(placement);
            }
            trackRecords.appendChild(contestant);
        }
    }
    let rankNumber = currentCast.length;
    for (let i = 0; i < eliminatedCast.length; i++) {
        let contestant = document.createElement("tr");
        let rank = document.createElement("td");
        rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; 50px;");
        if (eliminatedCast[i].rankP == 0) {
            rank.innerHTML = (rankNumber+1+i);
            if (rank.innerHTML == 3) {
                rank.innerHTML += "rd"
            } else {
                rank.innerHTML += "th";
            }
        } else if (eliminatedCast[i].rankP == 1) {
            rank.innerHTML += "1st<br><small>(Winner)</small>";
        } else if (eliminatedCast[i].rankP == 2) {
            rank.innerHTML += "2nd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 3) {
            rank.innerHTML += "3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 234) {
            rank.innerHTML += "2nd-4th<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 432) {
            rank.innerHTML += "3rd/4th<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 23) {
            rank.innerHTML += "2nd/3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 34) {
            rank.innerHTML += "3rd/4th";
        } else if (eliminatedCast[i].rankP == 32) {
            rank.innerHTML += "3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 345) {
            rank.innerHTML += "3rd-5th";
        } else if (eliminatedCast[i].rankP == 58) {
            rank.innerHTML += "5th-" + totalCastSize + "th";
        } else if (eliminatedCast[i].rankP == "tie1") {
            rank.innerHTML = (rankNumber+i) + "th";
            rank.innerHTML += "/" + (rankNumber+1+i) + "th";
        } else if (eliminatedCast[i].rankP == "tie2") {
            rank.innerHTML = (rankNumber+1+i) + "th";
            rank.innerHTML += "/" + (rankNumber+2+i) + "th";
        }
        contestant.appendChild(rank);
        let name = document.createElement("td");
        name.setAttribute("class", "nameTR");
        name.innerHTML = eliminatedCast[i].getName();
        contestant.appendChild(name);
        let photo = document.createElement("td");
        photo.setAttribute("style", "background: url("+ eliminatedCast[i].image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
        photo.setAttribute("class", "placement");
        contestant.appendChild(photo);
        for (let k = 0; k < eliminatedCast[i].trackRecord.length + 1; k++) {
            let placement = document.createElement("td");
            placement.setAttribute("class", "placement");
            placement.innerHTML = eliminatedCast[i].trackRecord[k];
            if (placement.innerHTML == "WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
            }
            else if (placement.innerHTML == "TOP 2") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 3") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 4") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP2") {
                placement.setAttribute("style", "background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
            }
            else if (placement.innerHTML == "LOW") {
                placement.setAttribute("style", "background-color: pink;");
            }
            else if (placement.innerHTML == "HIGH") {
                placement.setAttribute("style", "background-color: lightblue;");
            }
            else if (placement.innerHTML == "HIGH TEAM") {
                placement.setAttribute("style", "background-color: aquamarine;");
            }
            else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: #D66D73;");
                placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
            }
            else if (placement.innerHTML == "BTM2 ") {
                placement.setAttribute("style", "background-color: #FA8072;");
            }
            else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                placement.setAttribute("style", "background-color: tomato;");
            }
            else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
            }
            else if (placement.innerHTML == "CHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
            }
            else if (placement.innerHTML == "ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: red;");
            }
            else if (placement.innerHTML == "ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
            }
            else if (placement.innerHTML == " ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
            }
            else if (placement.innerHTML == " ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
            }
            else if (placement.innerHTML == "WINNER") {
                placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
            }
            else if (placement.innerHTML == "RUNNER UP") {
                placement.setAttribute("style", "font-weight: bold; background-color: silver;");
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + eliminatedCast[i].votes + " points) </small>";
            }
            else if (placement.innerHTML == "ELIMINATED") {
                placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                placement.innerHTML = "ELIM";
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + eliminatedCast[i].votes + " points) </small>";
            }
            else if (placement.innerHTML == "WINNER ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
            }
            else if (placement.innerHTML == "") {
                placement.setAttribute("style", "background-color: gray");
            }
            else if (placement.innerHTML == "WIN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "WIN TIE") {
                placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "  WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
            }
            else if (placement.innerHTML == "WIN+RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color:white;");
                placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
            }
            else if (placement.innerHTML == "SAFE") {
                placement.setAttribute("style", "background-color: white;");
            }
            else if (placement.innerHTML == "SAFE ") {
                    placement.setAttribute("style", "background-color: palegreen; color:#000;");
            }
            else if (placement.innerHTML == " SAFE ") {
                    placement.setAttribute("style", "background-color: #7D1935; color:#000;");
            }
            else if (placement.innerHTML == " SAFE") {
                placement.setAttribute("style", "background-color: magenta; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                placement.setAttribute("style", "background-color: lightcoral; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                placement.setAttribute("style", "background-color: indianred; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                placement.setAttribute("style", "background-color: crimson; color: white;");
            }
            else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: red; font-weight: bold;");
                placement.innerHTML = "BLOCK"
            }
            else if (placement.innerHTML == "RUN") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "RUN ") {
                    placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
            }
            else if (placement.innerHTML == "OUT") {
                placement.setAttribute("style", "background-color: forestgreen; color:white;");
            }
            else if (placement.innerHTML == "OUT ") {
                    placement.setAttribute("style", "background-color: purple; color:white;");
            }
            else if (placement.innerHTML == " WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
            }
            else if (placement.innerHTML == "DISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
            }
            else if (placement.innerHTML == "DEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
            }
            else if (placement.innerHTML == "QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
            }
            else if (placement.innerHTML == "WIN+QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
            }
            else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                placement.setAttribute("style", "background-color:cornflowerblue;");
                placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
            }
            else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                placement.setAttribute("style", "background-color:#ee82ee;");
                placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
            }
            else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                placement.innerHTML = "WIN <br>+<br> CHOC";
            }
            else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                placement.innerHTML = "WIN <br>+<br> DISQ";
            }
            else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                placement.innerHTML = "WIN <br>+<br> DEPT";
            }
            else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                placement.innerHTML = "WIN <br>+<br> QUIT";
            }
            else if (placement.innerHTML == "RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
            }
            else if (placement.innerHTML == "RTRN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: orange;");
            }
            else if (placement.innerHTML == " WIN ") {
                placement.setAttribute("style", "background-color: lightskyblue;");
            }
            else if (placement.innerHTML == "QUIT ") {
                placement.setAttribute("style", "background-color: #C86666;");
            }
            else if (placement.innerHTML == "ADV") {
                placement.setAttribute("style", "background-color: #90ee90;");
            }
            else if (placement.innerHTML == "LOSS") {
                placement.setAttribute("style", "background-color: #ff9e9e;");
            }
            else if (placement.innerHTML == "LOSS ") {
                placement.setAttribute("style", "background-color: orange;");
            }
            else if (placement.innerHTML == "GUEST") {
                placement.setAttribute("style", "background-color: lightgrey;");
            }
            else if (placement.innerHTML == "MISS CON") {
                placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
            }
            else if (placement.innerHTML == "undefined" && all_winners) {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (eliminatedCast[i].ppe / (eliminatedCast[i].episodesOn)).toFixed(2) + " - " + eliminatedCast[i].stars;
            }
            else if (placement.innerHTML == "undefined") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (eliminatedCast[i].ppe / (eliminatedCast[i].episodesOn)).toFixed(2);
            }
            if (eliminatedCast[i].retEp == (k+1) && eliminatedCast[i].retEp - eliminatedCast[i].trackRecord.length <= 0 || eliminatedCast[i].retEp != 0 && eliminatedCast[i].retEp2 != undefined) {
                placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                    placement.setAttribute("style", "background-color: #ffb18a;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                    placement.setAttribute("style", "background-color: greenyellow;");
                }
            }
            if (eliminatedCast[i].miniEpisode.indexOf((k+1)) != -1) {
                if (eliminatedCast[i].tCaptain.indexOf((k+1)) != -1) {
                    placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                } else {
                    placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                }
            }
            if (eliminatedCast[i].immuneEp.indexOf((k)) != -1 && k != eliminatedCast[i].trackRecord.length) {
                placement.style.backgroundColor = "magenta";
                placement.style.color = "white";
            }
            contestant.appendChild(placement);
        }
        trackRecords.appendChild(contestant);
    }
    centering.appendChild(trackRecords);
    let br = document.createElement("br");
    centering.appendChild(br);

    if (chocolateBarTwist) {
        let titlec = document.createElement("big");
        titlec.innerHTML = "Chocolate Bar Twist";
        let chocolateTable = document.createElement("table");
        if (totalCastSize >= 12 && totalCastSize < 15)
            chocolateTable.setAttribute("style", "font-size: 85%;");
        if (totalCastSize >= 15)
            chocolateTable.setAttribute("style", "font-size: 75%");
        let headerc = document.createElement("tr");
        chocolateTable.appendChild(headerc);
        let number = Math.round((fullCast.length / 2));
        for (let i = 0; i < number ; i++) {
            let thc = document.createElement("th");
            thc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            img.src = fullCast[i].image;
            thc.appendChild(img);
            headerc.appendChild(thc);
        }
        let row1 = document.createElement("tr");
        chocolateTable.appendChild(row1);
        for (let i = 0; i < number ; i++) {
            let tdc = document.createElement("td");
            tdc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            for (let o = 0; o < eliminatedCast.length; o++) {
                if (fullCast[i].getName() == eliminatedCast[o].getName()) {
                    if (fullCast[i].chocolate == true) {
                        img.src = "image/ChocolateBarWithTicket.webp";
                    } else {
                        img.src = "image/ChocolateBarWithNoTicket.webp";
                    }
                }
            }
            for (let o = 0; o < currentCast.length; o++) {
                if (fullCast[i].getName() == currentCast[o].getName()) {
                    if (chocolateBarTwistCheck){
                        if (fullCast[i].chocolate == true) {
                            img.src = "image/ChocolateBarWithTicket.webp";
                        } else {
                            img.src = "image/ChocolateBarWithNoTicket.webp";
                        }
                    } else {
                        img.src = "image/ChocolateBarTBA.webp";
                    }
                }
            }
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            tdc.appendChild(img);
            row1.appendChild(tdc);
        }
        let row2 = document.createElement("tr");
        chocolateTable.appendChild(row2);
        for (let i = number ; i < fullCast.length ; i++) {
            let tdc = document.createElement("td");
            tdc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            img.src = fullCast[i].image;
            tdc.appendChild(img);
            row2.appendChild(tdc);
        }
        let row3 = document.createElement("tr");
        chocolateTable.appendChild(row3);
        for (let i = number ; i < fullCast.length ; i++) {
            let tdc1 = document.createElement("td");
            tdc1.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img1 = document.createElement("img");
            for (let o = 0; o < eliminatedCast.length; o++) {
                if (fullCast[i].getName() == eliminatedCast[o].getName()) {
                    if (fullCast[i].chocolate == true) {
                        img1.src = "image/ChocolateBarWithTicket.webp";
                    } else {
                        img1.src = "image/ChocolateBarWithNoTicket.webp";
                    }
                }
            }
            for (let o = 0; o < currentCast.length; o++) {
                if (fullCast[i].getName() == currentCast[o].getName()) {
                    if (chocolateBarTwistCheck){
                        if (fullCast[i].chocolate == true) {
                            img1.src = "image/ChocolateBarWithTicket.webp";
                        } else {
                            img1.src = "image/ChocolateBarWithNoTicket.webp";
                        }
                    } else {
                        img1.src = "image/ChocolateBarTBA.webp";
                    }
                }
            }
            img1.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            tdc1.appendChild(img1);
            row3.appendChild(tdc1);
        }
        centering.appendChild(titlec);
        centering.appendChild(chocolateTable);
    }
    main.appendChild(centering);
    if (onFinale) {
        screen.createButton("Memorable Lipsyncs", "memLips()", "stat");
        if (lipsync_assassin) {
            screen.createButton("RuMocracy", "votingChart()", "stat");
        }
        if (lipsync_assassin || all_stars) {
            screen.createButton("Lipstick Choices", "lsticksChoices()", "stat");
        }
        screen.createHorizontalLine();
        screen.createButton("Simulate again!", "reSimulate()");
        screen.createButton("Download", "downloadTR()", "downloadTR");
        screen.createHorizontalLine();
        screen.createButton("Back to main page", "location.reload()");
        let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
        let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
        koffeDiv[0].classList.toggle("hide", false);
        koffeDivMovil[0].classList.toggle("hide", false);
    }
    let stats = document.querySelectorAll("#stat");
    for (let i = 0; i < stats.length; i++) {
        stats[i].setAttribute("class", "statistics");
    }
}
function lsticksChoices() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Lipsticks Choices");
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let lipassa = document.createElement("table");
    let headera = document.createElement("tr");
    lipassa.appendChild(headera);
    let tha = document.createElement("th");
    tha.innerHTML = "Winner";
    tha.setAttribute("style", "background-color: #e9dfe9; font-weight: bold; width: 170px;");
    headera.appendChild(tha);
    let tha1 = document.createElement("th");
    tha1.innerHTML = "Lipstick";
    tha1.setAttribute("style", "background-color: #e9dfe9; font-weight: bold; width: 170px;");
    headera.appendChild(tha1);
    let tha2 = document.createElement("th");
    tha2.innerHTML = "Loser";
    tha2.setAttribute("style", "background-color: #e9dfe9; font-weight: bold; width: 170px;");
    headera.appendChild(tha2);
    let tha3 = document.createElement("th");
    tha3.innerHTML = "Lipstick";
    tha3.setAttribute("style", "background-color: #e9dfe9; font-weight: bold; width: 170px;");
    headera.appendChild(tha3);
    for (let i = 0; i < assasintable.length; i++) {
        let contestanta = document.createElement("tr");
        let namea = document.createElement("td");
        let namea1 = document.createElement("td");
        let lipstickk = document.createElement("td");
        let lipstickkk = document.createElement("td");
        namea.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
        namea1.setAttribute("style", "background-color: #f5ebf5;");
        lipstickk.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
        lipstickkk.setAttribute("style", "background-color: #f5ebf5;");
        namea.innerHTML = assasintable[i];
        lipstickk.innerHTML = assasinlipstick[i];
        namea1.innerHTML = assasintable[i+1];
        lipstickkk.innerHTML = assasinlipstick[i+1];
        i++;
        if (namea1.innerHTML == " "){
            namea1.setAttribute("style", "background-color: gray;");
            lipstickkk.setAttribute("style", "background-color: gray;");
        }
        contestanta.appendChild(namea);
        contestanta.appendChild(lipstickk);
        contestanta.appendChild(namea1);
        contestanta.appendChild(lipstickkk);
        lipassa.appendChild(contestanta);

    }
    centering.appendChild(lipassa);
    main.appendChild(centering);
    screen.createHorizontalLine();
    screen.createButton("Track Records", "contestantProgress()", "stat");
    screen.createButton("Memorable Lipsyncs", "memLips()", "stat");
    if (lipsync_assassin) {
        screen.createButton("RuMocracy", "votingChart()", "stat");
    }
    screen.createHorizontalLine();
    screen.createButton("Simulate again!", "reSimulate()");
    screen.createButton("Download", "downloadTR()", "downloadTR");
    screen.createHorizontalLine();
    screen.createButton("Back to main page", "location.reload()");
    let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
    let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
    koffeDiv[0].classList.toggle("hide", false);
    koffeDivMovil[0].classList.toggle("hide", false);
    let stats = document.querySelectorAll("#stat");
    for (let i = 0; i < stats.length; i++) {
        stats[i].setAttribute("class", "statistics");
    }
}
let totalCastSize;
function sortPerformances(cast) {
    cast.sort((a, b) => (a.performanceScore - b.performanceScore));
}
//generate spaces to insert cast:
function generateSpace() {
    let castSize = document.querySelector("input#castSize").valueAsNumber;
    totalCastSize = castSize;
    let castSelection = document.querySelector("p#castSelection");
    castSelection.innerHTML = '';
    if (totalCastSize < 5)
        window.alert("Please, use at least 5 queens on your cast!");
    else if (totalCastSize > 20)
        window.alert("Please, use less than 20 queens in your cast!");
    else
        for (let i = 0; i < castSize; i++) {
            let select = document.createElement("select");
            select.setAttribute("class", "queenList");
            select.setAttribute("id", i.toString());
            select.setAttribute("onchange", "setImage()");
            let img = document.createElement("img");
            img.setAttribute("class", "images");
            img.setAttribute("id", "image" + i.toString());
            img.setAttribute("style", "width: 105px; height: 105px;")
            let p = document.createElement("p");
            p.appendChild(img);
            if (document.getElementById("onlyCustomQueens").checked == true){
                let customy = allQueens.filter(function (queen) { return queen.customqueen == true; });
                for (let k = 0; k < customy.length; k++) {
                    let option = document.createElement("option");
                    option.innerHTML = customy[k].getName();
                    option.value = customy[k].image;
                    select.add(option);
                }
                select.selectedIndex = randomNumber(customy.length);
            }
            else{
                for (let k = 0; k < allQueens.length; k++) {
                    let option = document.createElement("option");
                    option.innerHTML = allQueens[k].getName();
                    option.value = allQueens[k].image;
                    select.add(option);
                }
                select.selectedIndex = randomNumber(allQueens.length);
            }
            let br = document.createElement("br");
            castSelection.appendChild(p);
            castSelection.appendChild(select);
            castSelection.appendChild(br);
        }
    setImage();
}
function setImage() {
    let images = document.getElementsByClassName("images");
    for (let i = 0; i < images.length; i++) {
        let img = document.getElementById("image" + i.toString());
        let select = document.getElementById(i.toString());
        img.src = select.options[select.selectedIndex].value;
    }
}
let regularFormat = false;
let top3 = false;
let top4 = false;
let top5 = false;
let teamsF = false;
let canFinale = false;
let lftc = false;
let all_stars = false;
let allstars3Finale = false;
let lipsync_assassin = false;
let all_winners = false;
let thailandFormat = false;
let team = false;
function predefCast(cast, format, finale, premiere = '', returning = '') {
    currentCast = cast;
    totalCastSize = cast.length;
    if (format == "regular")
        regularFormat = true;
    else if (format == "thailand")
        thailandFormat = true;
    else if (format == "all-stars")
        all_stars = true;
    else if (format == "all-winners")
        all_winners = true;
    else if (format == "team")
        team = true;
    else if (format == "lipsync-assassin"){ 
        lipsync_assassin = true;
        allQueensCopy2 = [...allQueens];
        allQueens = allQueens.filter(function (queen) { return queen.getLipSyncStat() >= 11; });
        allQueens = allQueens.filter(function (queen) { return currentCast.indexOf(queen) == -1; });
        allQueensCopy = [...allQueens];
    }
    if (finale == "top5") {
        top5 = true;
    } else if (finale == "top4") {
        top4 = true;
    } else if (finale == "top3") {
        top3 = true;
    } else if (finale == "teams") {
        teamsF = true;
    } else if (finale == "LFTC") {
        lftc = true;
    } else if (finale == "LFTF") {
        canFinale = true;
    } else if (finale == "jury") {
        allstars3Finale = true;
    }
    if (premiere == "s6-premiere")
        s6Premiere = true;
    else if (premiere == "s9-premiere")
        s9Premiere = true;
    else if (premiere == "s12-premiere")
        s12Premiere = true;
    else if (premiere == "s14-premiere")
        s14Premiere = true;
    else if (premiere == "porkchop")
        porkchopPremiere = true;
    else if (premiere == "uk3-premiere")
        uk3Premiere = true;
    if (returning == "return")
        randomReturn = true;
    else if (returning == "choose")
        chooseReturn = true;
    else if (returning == "vote")
        voteReturn = true;
    else if (returning == "conjoined-queens")
        conjoinedQueens = true;
    else if (returning == "smackdown"){
        smackdown = true;
    }
    else if (returning == "lalaparuza")
        lalaparuza = true;
    else if (returning == "queensofcomedy")
        queensOfComedy = true;
    else if (returning == "kittygirlgroup")
        kittyGirlGroup = true;
    if (document.getElementById("immunity").checked == true)
        immunityTwist = true;
    if (document.getElementById("disableDouble").checked == true)
        noDouble = true;
    if (document.getElementById("riggory").checked == true)
        riggory = true;
    if (document.getElementById("riggoryLipsync").checked == true)
        riggoryLipsync = true;
    if (document.getElementById("chocolateBar").checked == true)
        chocolateBarTwist = true;
    else if (document.getElementById("chocolateBarChoosable").checked == true){
        chocolateBarTwist = true;
        chocolateBarTwistChoosable = true;
    }
    if (team && (chocolateBarTwist || immunityTwist)) {
        window.alert("The team format isn't supported with the chocolate bar twist or immunity, sorry!");
        team = false;
        smackdown = false;
        voteReturn = false;
        randomReturn = false;
        chooseReturn = false;
        lalaparuza = false;
        queensOfComedy = false;
        conjoinedQueens = false;
        kittyGirlGroup = false;
        s6Premiere = false;
        s9Premiere = false;
        s12Premiere = false;
        s14Premiere = false;
        porkchopPremiere = false;
        uk3Premiere = false;
        chocolateBarTwist = false;
        chocolateBarTwistChoosable = false;
        immunityTwist = false;
    }
    else if(all_winners && (smackdown || s14Premiere || s12Premiere || s9Premiere || s6Premiere || porkchopPremiere || uk3Premiere || voteReturn || conjoinedQueens || queensOfComedy || kittyGirlGroup || randomReturn || chooseReturn || lalaparuza || chocolateBarTwist)) {
        window.alert("The All Winners Format isn't avaliable with any combination of premiere, returning challenge or Chocolate Bar Twist, at this moment.");
        s14Premiere = false;
        s12Premiere = false;
        s9Premiere = false;
        s6Premiere = false;
        porkchopPremiere = false;
        uk3Premiere = false;
        top4 = false;
        top3 = false;
        regularFormat = false;
        thailandFormat = false;
        lftc = false;
        canFinale = false;
        lipsync_assassin = false;
        smackdown = false;
        all_stars = false;
        all_winners = false;
        allstars3Finale = false;
        smackdown = false;
        voteReturn = false;
        conjoinedQueens = false;
        queensOfComedy = false;
        kittyGirlGroup = false;
        randomReturn = false;
        chooseReturn = false;
        lalaparuza = false;
        chocolateBarTwist = false;
        chocolateBarTwistChoosable = false;
    }
    else if (chocolateBarTwist) {
        if (chocolateBarTwistChoosable){
            chooseGoldenBar();
        }else {
            giveChocolate();
        }
    }
    else if (s9Premiere) {
        chooseLateQueen();
    }
    else if (s6Premiere || s12Premiere || s14Premiere)
        doublePremiere();
    else if (porkchopPremiere) {
        porkchopLipsyncs();
    }
    else{
        newEpisode();
    }
}
function startSimulation(challenge = "") {
    totalCastSize = currentCast.length;
    if (currentCast.length == 0)
        window.alert("Your cast is empty!");
    else if (duplicateQueens(currentCast))
        window.alert("Please, only use one of each queen on your cast!");
    else {
        let select = document.getElementById("format");
        let select2 = document.getElementById("premiere-format");
        let select3 = document.getElementById("returning");
        let select4 = document.getElementById("finale");
        if (select.options[select.selectedIndex].value == "regular")
            regularFormat = true;
        else if (select.options[select.selectedIndex].value == "thailand")
            thailandFormat = true;
        else if (select.options[select.selectedIndex].value == "all-stars")
            all_stars = true;
        else if (select.options[select.selectedIndex].value == "all-winners") {
            all_winners = true;
        }
        else if (select.options[select.selectedIndex].value == "team")
            team = true;
        else if (select.options[select.selectedIndex].value == "lipsync-assassin") {
            lipsync_assassin = true;
            allQueensCopy2 = [...allQueens];
            allQueens = allQueens.filter(function (queen) { return queen.getLipSyncStat() >= 11; });
            allQueens = allQueens.filter(function (queen) { return currentCast.indexOf(queen) == -1; });
            allQueensCopy = [...allQueens];
        }
        if (select4.options[select4.selectedIndex].value == "top5")
            top5 = true;
        else if (select4.options[select4.selectedIndex].value == "top4")
            top4 = true;
        else if (select4.options[select4.selectedIndex].value == "top3")
            top3 = true;
        else if (select4.options[select4.selectedIndex].value == "teams")
            teamsF = true;
        else if (select4.options[select4.selectedIndex].value == "LFTC")
            lftc = true;
        else if (select4.options[select4.selectedIndex].value == "LFTF")
            canFinale = true;
        else if (select4.options[select4.selectedIndex].value == "jury")
            allstars3Finale = true;
        else if (select4.options[select4.selectedIndex].value == "randomFinale") {
            if (team) {
                window.alert("Random Finale is not compatible with Teams Format.");
                team = false;
                return
            } else {
                let randomNumberFinale = randomNumber(7);
                switch (randomNumberFinale) {
                    case 0:
                        top5 = true;
                        break;
                    case 1:
                        top4 = true;
                        break;
                    case 2:
                        top3 = true;
                        break;
                    case 3:
                        teamsF = true;
                        break;
                    case 4:
                        lftc = true;
                        break;
                    case 5:
                        canFinale = true;
                        break;
                    case 6:
                        allstars3Finale = true;
                        break;
                    default:
                        top3 = true;
                        break;
                }
            }
        }
        if (select2.options[select2.selectedIndex].value == "s6-premiere")
            s6Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s9-premiere")
            s9Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s12-premiere")
            s12Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s14-premiere")
            s14Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "porkchop")
            porkchopPremiere = true;
        else if (select2.options[select2.selectedIndex].value == "uk3-premiere")
            uk3Premiere = true;
        if (select3.options[select3.selectedIndex].value == "random")
            randomReturn = true;
        else if (select3.options[select3.selectedIndex].value == "choose")
            chooseReturn = true;
        else if (select3.options[select3.selectedIndex].value == "votes")
            voteReturn = true;
        else if (select3.options[select3.selectedIndex].value == "conjoined-queens")
            conjoinedQueens = true;
        else if (select3.options[select3.selectedIndex].value == "queensofcomedy")
            queensOfComedy = true;
        else if (select3.options[select3.selectedIndex].value == "kittygirlgroup")
            kittyGirlGroup = true;
        else if (select3.options[select3.selectedIndex].value == "lalaparuza")
            lalaparuza = true;
        else if (select3.options[select3.selectedIndex].value == "smackdown")
            smackdown = true;
        if (document.getElementById("immunity").checked == true)
            immunityTwist = true;
        if (document.getElementById("disableDouble").checked == true)
            noDouble = true;
        if (document.getElementById("riggory").checked == true)
            riggory = true;
        if (document.getElementById("riggoryLipsync").checked == true)
            riggoryLipsync = true;
        if (document.getElementById("chocolateBar").checked == true)
            chocolateBarTwist = true;
        else if (document.getElementById("chocolateBarChoosable").checked == true){
                chocolateBarTwist = true;
                chocolateBarTwistChoosable = true;
        }
        if (currentCast.length == 3 && lftc || currentCast.length == 3 && (all_stars || all_winners)) {
            window.alert("Lip-Sync For The Crown and All Star formats needs at least 4 queens!");
            lftc = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if (team == true && currentCast.length % 2 !== 0) {
            window.alert("Team format needs an even amout of queens!");
            team = false;
        }
        else if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) && currentCast.length < 10 ) {
            window.alert("Double Premiere formats needs at least 10 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) && top5 && currentCast.length < 12 ) {
            window.alert("Top 5 finale with double premiere formats needs at least 12 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if (uk3Premiere && currentCast.length < 6) {
            window.alert("Uk3 Premiere needs at least 6 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
            smackdown = false;
            voteReturn = false;
            conjoinedQueens = false;
            queensOfComedy = false;
            kittyGirlGroup = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
        }
        else if (s9Premiere && currentCast.length < 6) {
            window.alert("Normal Premiere (No Elimination) needs at least 6 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
            smackdown = false;
            voteReturn = false;
            conjoinedQueens = false;
            queensOfComedy = false;
            kittyGirlGroup = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
        }
        else if ((queensOfComedy || conjoinedQueens || kittyGirlGroup) && currentCast.length < 10) {
            window.alert("Queens of comedy, Kitty Girl Group and Conjoined Queens return challenges need at least 10 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
            smackdown = false;
            voteReturn = false;
            conjoinedQueens = false;
            queensOfComedy = false;
            kittyGirlGroup = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
        }
        else if (team && (smackdown || immunityTwist || voteReturn || randomReturn || chooseReturn || chocolateBarTwist || s9Premiere || s6Premiere || lalaparuza || queensOfComedy || kittyGirlGroup || conjoinedQueens || s12Premiere || porkchopPremiere || s14Premiere || uk3Premiere || top5 || top4 || top3 || lftc || canFinale || allstars3Finale)) {
            window.alert("The team format isn't supported with any special premiere, returning formats, immunity or a different finale that is not Teams Finale, sorry!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            team = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            smackdown = false;
            voteReturn = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
            queensOfComedy = false;
            conjoinedQueens = false;
            kittyGirlGroup = false;
            chocolateBarTwist = false;
            chocolateBarTwistChoosable = false;
            immunityTwist = false;
        }
        else if(all_winners && (smackdown || s14Premiere || s12Premiere || s9Premiere || s6Premiere || porkchopPremiere || uk3Premiere || voteReturn || conjoinedQueens || queensOfComedy || kittyGirlGroup || randomReturn || chooseReturn || lalaparuza || chocolateBarTwist || top5 || top4 || top3 || canFinale || allstars3Finale)) {
            window.alert("The All Winners Format isn't avaliable with any combination of premiere, returning challenge or Chocolate Bar Twist, at this moment. Finale format must be Lipsync for the Crown,");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
            lipsync_assassin = false;
            smackdown = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
            smackdown = false;
            voteReturn = false;
            conjoinedQueens = false;
            queensOfComedy = false;
            kittyGirlGroup = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
            chocolateBarTwist = false;
            chocolateBarTwistChoosable = false;
        }
        else if (chocolateBarTwist) {
            if (chocolateBarTwistChoosable){
                chooseGoldenBar();
            }else {
                giveChocolate();
            }
        }
        else if (s9Premiere) {
            chooseLateQueen();
        }
        else if (s6Premiere || s12Premiere || s14Premiere) {
            doublePremiere();
        }
        else if (porkchopPremiere) {
            porkchopLipsyncs();
        }
        else {
            newEpisode();
        }
    }
}
//see if there is two of the same queens:
function duplicateQueens(cast) {
    let valuesAlreadySeen = [];
    for (let i = 0; i < cast.length; i++) {
        let value = cast[i];
        if (valuesAlreadySeen.indexOf(value) !== -1) {
            currentCast = [];
            return true;
        }
        valuesAlreadySeen.push(value);
    }
    return false;
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
let s9PremiereCheck = false;
let uk3PremiereCheck = false;
function judging() {
    if ((s12Premiere || porkchopPremiere) && premiereCounter <= 2) {
        //add 2 queens to the top and the rest is safe
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        if (currentCast.length == 6) {
            currentCast[2].addToTrackRecord("HIGH");
            currentCast[3].addToTrackRecord("HIGH");
            currentCast[4].addToTrackRecord("LOW");
            currentCast[5].addToTrackRecord("LOW");
            currentCast[0].ppe += 3;
            currentCast[1].ppe += 3;
            currentCast[2].ppe += 4;
            currentCast[3].ppe += 4;
            currentCast[4].ppe += 2;
            currentCast[5].ppe += 2;
        } else if (currentCast.length > 6) {
            currentCast[2].addToTrackRecord("HIGH");
            currentCast[3].addToTrackRecord("HIGH");
            currentCast[currentCast.length - 2].addToTrackRecord("LOW");
            currentCast[currentCast.length - 1].addToTrackRecord("LOW");
            currentCast[0].ppe += 3;
            currentCast[1].ppe += 3;
            currentCast[2].ppe += 4;
            currentCast[3].ppe += 4;
            currentCast[currentCast.length - 2].ppe += 2;
            currentCast[currentCast.length - 1].ppe += 2;
            for (let i = 4; i < currentCast.length - 2; i++) {
                currentCast[i].addToTrackRecord("SAFE");
                currentCast[i].ppe += 3;
            }
        } else {
            for (let i = 0; i < currentCast.length; i++) {
                if (topQueens.indexOf(currentCast[i]) == -1)
                    currentCast[i].addToTrackRecord("SAFE");
                    currentCast[i].ppe += 3;
            }
        }
        doublePremiereJudging();
    }
    else if (currentCast.length <= 10 && all_winners) {
        //add 4 queens to the top and the others safe
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 4; i++) {
            topQueens.push(currentCast[i]);
        }
        winnersJudging();
    }
    else if (currentCast.length > 10 && all_winners) {
        //add 5 queens to the top and the others safe
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 5; i++) {
            topQueens.push(currentCast[i]);
        }
        winnersJudging();
    }
    else if (currentCast.length == totalCastSize && uk3Premiere && !uk3PremiereCheck) {
        //add 3 queens to the top and 3 to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        uk3PremiereCheck = true;
        judgingScreen();
    }
    else if (currentCast.length == totalCastSize - 1 && s9Premiere && !s9PremiereCheck) {
        //add 3 queens to the top and 0 to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
        }
        s9PremiereCheck = true;
        s9judgingScreen();
    }
    else if (currentCast.length > 5 && team) {
        //add 2 teams to the top and 3 teams to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].QueenB.episodesOn++;
            currentCast[i].QueenA.episodesOn++;
        }
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        bottomQueens.push(currentCast[currentCast.length - 1]);
        bottomQueens.push(currentCast[currentCast.length - 2]);
        bottomQueens.push(currentCast[currentCast.length - 3]);
        judgingScreen();
    }
    else if (currentCast.length == 5 && team) {
        //add 2 teams to the top and 3 teams to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].QueenB.episodesOn++;
            currentCast[i].QueenA.episodesOn++;
        }
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        bottomQueens.push(currentCast[currentCast.length - 1]);
        bottomQueens.push(currentCast[currentCast.length - 2]);
        bottomQueens.push(currentCast[currentCast.length - 3]);
        teamWinAndBtm2();
    }
    else if (currentCast.length == 4 && team) {
        //add 2 teams to the top and 2 teams to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].QueenB.episodesOn++;
            currentCast[i].QueenA.episodesOn++;
        }
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        bottomQueens.push(currentCast[currentCast.length - 1]);
        bottomQueens.push(currentCast[currentCast.length - 2]);
        teamWinAndBtm2();
    }
    else if (currentCast.length == 3 && team) {
        //add 1 team to the top and 2 teams to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].QueenB.episodesOn++;
            currentCast[i].QueenA.episodesOn++;
        }
        topQueens.push(currentCast[0]);
        bottomQueens.push(currentCast[currentCast.length - 1]);
        bottomQueens.push(currentCast[currentCast.length - 2]);
        teamWinAndBtm2();
    }
    else if (currentCast.length == 10 && isPairChallenge) {
        //add winning team to the top and bottom team to the bottom
        let team1Team = new TeamsForChallenges(team1);
        let team2Team = new TeamsForChallenges(team2);
        let team3Team = new TeamsForChallenges(team3);
        let team4Team = new TeamsForChallenges(team4);
        let team5Team = new TeamsForChallenges(team5);
        let teamArray = [team1Team, team2Team, team3Team, team4Team, team5Team];
        for (let i = 0; i < team1.length; i++) {
            team1Team.performanceScore += team1[i].performanceScore;
        }
        team1Team.performanceScore = team1Team.performanceScore / team1Team.queens.length;
        for (let i = 0; i < team2.length; i++) {
            team2Team.performanceScore += team2[i].performanceScore;
        }
        team2Team.performanceScore = team2Team.performanceScore / team2Team.queens.length;
        for (let i = 0; i < team3.length; i++) {
            team3Team.performanceScore += team3[i].performanceScore;
        }
        team3Team.performanceScore = team3Team.performanceScore / team3Team.queens.length;
        for (let i = 0; i < team4.length; i++) {
            team4Team.performanceScore += team4[i].performanceScore;
        }
        team4Team.performanceScore = team4Team.performanceScore / team4Team.queens.length;
        for (let i = 0; i < team5.length; i++) {
            team5Team.performanceScore += team5[i].performanceScore;
        }
        team5Team.performanceScore = team5Team.performanceScore / team5Team.queens.length;
        teamArray.sort((a, b) => (a.performanceScore - b.performanceScore));
        let topTeam = teamArray[0];
        let bottomTeam = teamArray[4];
        for (let i = 0; i < topTeam.queens.length; i++) {
            topQueens.push(topTeam.queens[i]);
            topQueens.push(teamArray[1].queens[i]);
        }
        for (let i = 0; i < bottomTeam.queens.length; i++) {
            bottomQueens.push(bottomTeam.queens[i]);
            bottomQueens.push(teamArray[3].queens[i]);
        }
        currentCast = [...team1, ...team2, ...team3, ...team4, ...team5];
        sortPerformances(currentCast);
        judgingScreen();
    }
    else if (currentCast.length >= 9 && isTeamChallenge) {
        //add winning team to the top and bottom team to the bottom
        let team1Team = new TeamsForChallenges(team1);
        let team2Team = new TeamsForChallenges(team2);
        let team3Team = new TeamsForChallenges(team3);
        let teamArray = [team1Team, team2Team, team3Team];
        for (let i = 0; i < team1.length; i++) {
            team1Team.performanceScore += team1[i].performanceScore;
        }
        team1Team.performanceScore = team1Team.performanceScore / team1Team.queens.length;
        for (let i = 0; i < team2.length; i++) {
            team2Team.performanceScore += team2[i].performanceScore;
        }
        team2Team.performanceScore = team2Team.performanceScore / team2Team.queens.length;
        for (let i = 0; i < team3.length; i++) {
            team3Team.performanceScore += team3[i].performanceScore;
        }
        team3Team.performanceScore = team3Team.performanceScore / team3Team.queens.length;
        teamArray.sort((a, b) => (a.performanceScore - b.performanceScore));
        let topTeam = teamArray[0];
        let bottomTeam = teamArray[2];
        for (let i = 0; i < topTeam.queens.length; i++) {
            topQueens.push(topTeam.queens[i]);
        }
        for (let i = 0; i < bottomTeam.queens.length; i++) {
            bottomQueens.push(bottomTeam.queens[i]);
        }
        currentCast = [...team1, ...team2, ...team3];
        sortPerformances(currentCast);
        judgingScreen();
    }
    else if (currentCast.length > 6 && isTeamChallenge) {
        //add winning team to the top and bottom team to the bottom
        let team1Team = new TeamsForChallenges(team1);
        let team2Team = new TeamsForChallenges(team2);
        let teamArray = [team1Team, team2Team];
        for (let i = 0; i < team1.length; i++) {
            team1Team.performanceScore += team1[i].performanceScore;
        }
        team1Team.performanceScore = team1Team.performanceScore / team1Team.queens.length;
        for (let i = 0; i < team2.length; i++) {
            team2Team.performanceScore += team2[i].performanceScore;
        }
        team2Team.performanceScore = team2Team.performanceScore / team2Team.queens.length;
        teamArray.sort((a, b) => (a.performanceScore - b.performanceScore));
        let topTeam = teamArray[0];
        let bottomTeam = teamArray[1];
        for (let i = 0; i < topTeam.queens.length; i++) {
            topQueens.push(topTeam.queens[i]);
        }
        for (let i = 0; i < bottomTeam.queens.length; i++) {
            bottomQueens.push(bottomTeam.queens[i]);
        }
        currentCast = [...team1, ...team2];
        sortPerformances(currentCast);
        judgingScreen();
    }
    else if (currentCast.length >= 10 && bottom6WayLipsync && regularFormat && !bottom6WayLipsyncCheck) {
        //add 3 queens to the top and 6 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
        }
        for (let i = 0; i < 6; i++) {
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        bottom6WayLipsync = false;
        judging6WayScreen();
    }
    else if (currentCast.length >= 8 && floppers && regularFormat && !floppersCheck) {
        //add 0 queens to the top and 3 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        floppers = false;
        judgingFloppersScreen();
    }
    else if (currentCast.length >= 6 && slayers && regularFormat && !slayersCheck) {
        //add all the queens to the top and 0 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < currentCast.length ; i++) {
            topQueens.push(currentCast[i]);
        }
        slayers = false;
        judgingSlayersScreen();
    }
    else if (currentCast.length >= 8 && currentCast.length < 10 && s14LaLaPaRUZa && regularFormat && !s14LaLaPaRUZaCheck && !smackdown) {
        //add all the queens to the top and 0 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        topQueens.push(currentCast[0]);
        for (let i = 1; i < currentCast.length ; i++) {
            bottomQueens.push(currentCast[i]);
        }
        s14LaLaPaRUZa = false;
        judgingS14LaLaPaRUZaScreen();
    }
    else if (currentCast.length > 13 && thailandFormat) {
        //add 4 queens to the top and 4 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 4; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        judgingThailand();
    }
    else if (currentCast.length > 13) {
        //add 4 queens to the top and 4 queens to the bottom
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 4; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        judgingScreen();
    }
    else if (currentCast.length > 6 && thailandFormat) {
        //add first 3 queens to the top and last 3 queens to the bottom:
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        judgingThailand();
    }
    else if (currentCast.length > 6) {
        //add first 3 queens to the top and last 3 queens to the bottom:
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        judgingScreen();
    }
    else if (currentCast.length <= 5 && lipsync_assassin) {
        //add 1 queen to the top and the rest to the btm
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        topQueens.push(currentCast[0]);
        for (let i = 0; i < currentCast.length; i++) {
            if (topQueens.indexOf(currentCast[i]) == -1) {
                bottomQueens.push(currentCast[i]);
            }
        }
        topAndBtm();
    }
    else if (currentCast.length == 6) {
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        for (let i = 0; i < 3; i++) {
            topQueens.push(currentCast[i]);
            bottomQueens.push(currentCast[currentCast.length - (i + 1)]);
        }
        if (regularFormat)
            winAndBtm2();
        else if (thailandFormat) 
            thaiWinBottom2();
        else if (all_stars)
            top2AndBtm();
        else if (lipsync_assassin)
            topAndBtm();
    }
    else if (currentCast.length == 5) {
        //add first 2 queens to the top and last 3 queens to the bottom:
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        if (currentCast[2].performanceScore >= 6 && currentCast[2].performanceScore < 16 && !all_stars)
            topQueens.push(currentCast[2]);
        else
            bottomQueens.push(currentCast[2]);
        bottomQueens.push(currentCast[3]);
        bottomQueens.push(currentCast[4]);
        if (regularFormat)
            winAndBtm2();
        else if (thailandFormat) 
            thaiWinBottom2();
        else if (all_stars)
            top2AndBtm();
        else if (lipsync_assassin)
            topAndBtm();
    }
    else if (currentCast.length == 4) {
        //add first 2 queens to the top and last 2 queens to the bottom:
        currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
        topQueens.push(currentCast[0]);
        topQueens.push(currentCast[1]);
        bottomQueens.push(currentCast[2]);
        bottomQueens.push(currentCast[3]);
        if (regularFormat)
            winAndBtm2();
        else if (thailandFormat) 
            thaiWinBottom2();
        else if (all_stars)
            top2AndBtm();
        else if (lipsync_assassin)
            topAndBtm();
    }
}
function judgingThailand() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createBold("Based on tonight's runway...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    if (topQueens.length > bottomQueens.length) {
        for (let i = 0; i < bottomQueens.length; i++) {
            screen.createImage(topQueens[i].image, "cyan");
            screen.createImage(bottomQueens[i].image, "cyan");
        }
        if (bottomQueens.length < topQueens.length) {
            screen.createImage(topQueens[bottomQueens.length].image, "cyan");
        }
    } else { 
        for (let i = 0; i < topQueens.length; i++) {
            screen.createImage(topQueens[i].image, "cyan");
            screen.createImage(bottomQueens[i].image, "cyan");
        }
        if (bottomQueens.length > topQueens.length) {
            screen.createImage(bottomQueens[topQueens.length].image, "cyan");
        }
    }
    screen.createBold("", "judged");
    let judged = document.getElementById("judged");
    if (topQueens.length > bottomQueens.length) {
        for (let i = 0; i < bottomQueens.length; i++) {
            judged.innerHTML += `${topQueens[i].getName()}, `;
            judged.innerHTML += `${bottomQueens[i].getName()}, `;
        }
        if (bottomQueens.length < topQueens.length) {
            judged.innerHTML += `${topQueens[bottomQueens.length].getName()}, `;
        }
    } else {
        for (let i = 0; i < topQueens.length; i++) {
            judged.innerHTML += `${topQueens[i].getName()}, `;
            judged.innerHTML += `${bottomQueens[i].getName()}, `;
        }
        if (bottomQueens.length > topQueens.length) {
            judged.innerHTML += `${bottomQueens[topQueens.length].getName()}, `;
        }
    }
    judged.innerHTML += "you represent the tops and bottoms of the week.";
    screen.createHorizontalLine();
    screen.createParagraph("", "safeQueens");
    let safeQueens = document.querySelector("p#safeQueens");
    //check if the queen is in the top or in the bottom, and if not put her as safe:
    for (let i = 0; i < currentCast.length; i++)
        if (topQueens.indexOf(currentCast[i]) == -1 && bottomQueens.indexOf(currentCast[i]) == -1) {
            safeQueens.innerHTML += currentCast[i].getName() + ", ";
            if (currentCast[i].maxiT == true) {
                currentCast[i].maxiT = false;
            } else {
                currentCast[i].addToTrackRecord("SAFE");
            }
            currentCast[i].ppe += 3;
        }
    safeQueens.innerHTML += "you are safe.";
    screen.createButton("Proceed", "thaiWinBottom2()");
}
function thaiWinBottom2() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my girls!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(100) < 60) {
        if (topQueens[0].maxiT == true) {
            topQueens[0].editTrackRecord("WIN");
            topQueens[0].maxiT = false;
        } else {
            topQueens[0].addToTrackRecord("WIN ");
        }
        if (topQueens[1].maxiT == true) {
            topQueens[1].editTrackRecord("WIN");
            topQueens[1].maxiT = false;
        } else {
            topQueens[1].addToTrackRecord("WIN ");
        }
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        topQueens[1].favoritism += 5;
        topQueens[1].ppe += 5;
        screen.createImage(topQueens[0].image, "darkblue");
        screen.createImage(topQueens[1].image, "darkblue");
        screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's runway!");
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(topQueens[0], topQueens[1]);
            conjoinedCheck = false;
        }
        topQueens.splice(0, 2);
    } else {
        if (topQueens[0].maxiT == true) {
            topQueens[0].editTrackRecord("WIN");
            topQueens[0].maxiT = false;
        } else {
            topQueens[0].addToTrackRecord("WIN ");
        }
        if (immunityTwist && giveImmunity()) {
            topQueens[0].immune = true;
            topQueens[0].immuneEp.push(episodeCount);
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's runway! And you also earned immunity for the next challenge");
        } else {
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's runway!");
        }
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(topQueens[0]);
            conjoinedCheck = false;
        }
        topQueens.splice(0, 1);
    }
    if (topQueens.length > 0) {
        for (let i = 0; i < topQueens.length; i++) {
            screen.createImage(topQueens[i].image, "lightblue");
            if (topQueens[i].maxiT == true) {
                topQueens[i].editTrackRecord("HIGH");
                topQueens[i].maxiT = false;
            } else {
                topQueens[i].addToTrackRecord("HIGH");
            }
            topQueens[i].favoritism += 1;
            topQueens[i].ppe += 4;
        }
        screen.createParagraph("", "highs");
        let highs = document.getElementById("highs");
        for (let i = 0; i < topQueens.length; i++)
            highs.innerHTML += `${topQueens[i].getName()}, `;
            highs.innerHTML += "good job this week, you're safe.";
    }
    screen.createHorizontalLine();
    if (bottomQueens.length >= 3) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createParagraph("", "bottom3");
        let bottom3 = document.getElementById("bottom3");
        for (let i = 0; i < bottomQueens.length; i++)
            bottom3.innerHTML += bottomQueens[i].getName() + ", ";
        bottom3.innerHTML += "you're the bottoms of the week...";
    }
    if (immunityTwist && stillImmune()) {
        for (let i = 0; i < bottomQueens.length; i++) {
            if (bottomQueens[i].immune && bottomQueens.length > 2) {
                screen.createImage(bottomQueens[i].image, "magenta");
                screen.createParagraph(bottomQueens[i].getName() + ", you have immunity, you are safe.");
                bottomQueens[i].addToTrackRecord("LOW");
                bottomQueens[i].unfavoritism += 1;
                bottomQueens[i].ppe += 2;
                bottomQueens[i].immune = false;
                bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                break;
            }
        }
    }
    if (bottomQueens.length == 4) {
        if (bottomQueens[0].maxiT == true) {
            bottomQueens[0].editTrackRecord("LOW");
            bottomQueens[0].maxiT = false;
        } else {
            bottomQueens[0].addToTrackRecord("LOW");
        }
        if (bottomQueens[1].maxiT == true) {
            bottomQueens[1].editTrackRecord("LOW");
            bottomQueens[1].maxiT = false;
        } else {
            bottomQueens[1].addToTrackRecord("LOW");
        }
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createImage(bottomQueens[1].image, "pink");
        screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens[1].unfavoritism += 1;
        bottomQueens[1].ppe += 2;
        bottomQueens.splice(0, 2);
    } else if (bottomQueens.length == 3 && bottomQueens[0].performanceScore >= 30 && currentCast.length > 5) {
        thirdqueen = true;
        screen.createBold("... no one is safe.");
    }
    else if (bottomQueens.length == 3) {
        if (bottomQueens[0].maxiT == true) {
            bottomQueens[0].editTrackRecord("LOW");
            bottomQueens[0].maxiT = false;
        } else {
            bottomQueens[0].addToTrackRecord("LOW");
        }
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createBold(bottomQueens[0].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens.splice(0, 1);
    }
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createBold("", "btm2");
    let btm2 = document.getElementById("btm2");
    for (let i = 0; i < bottomQueens.length; i++) {
        btm2.innerHTML += bottomQueens[i].getName() + ", ";
    }
    btm2.innerHTML += "I'm sorry my dears but you are up for elimination.";
    screen.createButton("Proceed", "lipsyncDesc()");
}
function judgingS14LaLaPaRUZaScreen() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    screen.createHorizontalLine();
    topQueens[0].addToTrackRecord("WIN");
    topQueens[0].favoritism += 5;
    topQueens[0].ppe += 5;
    screen.createImage(topQueens[0].image, "royalblue");
    screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
    screen.createHorizontalLine();
    if (bottomQueens.length >= 7) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createParagraph("", "bottom3");
        let bottom3 = document.getElementById("bottom3");
        for (let i = 0; i < bottomQueens.length; i++)
            bottom3.innerHTML += bottomQueens[i].getName() + ", ";
        bottom3.innerHTML += "I really expected more from you...";
        screen.createBold("I'm sorry my dears, but you are all up for elimination. I need to see you all lipsync...");
    }
    screen.createButton("Proceed", "lipsyncs14()");
    for (let i = 0; i < bottomQueens.length; i++) {
        bottomQueens[i].addToTrackRecord("BTM");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    for (let i = 0; i < eliminatedCast.length; i++) {
        eliminatedCast[i].addToTrackRecord("");
    }
}
function lipsyncs14() {
    s14LaLaPaRUZaCheck = true;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Lipsync LaLaPaRUza Smackdown!!");
    screen.createBold("If you win your lipsync, you will be safe from elimination... If you lose, you'll continue to face off until two queens remain... In the end, one of them will sashay away.");
    document.body.style.backgroundImage = "url('image/lalaparuzasmackdown.webp')";
    screen.createImage(topQueens[0].image);
    screen.createBold(topQueens[0].getName() + ", you are the exception. You are safe from elimination tonight!!");
    topQueens[0].addToTrackRecord(" SAFE");
    let notpair = false;
    if (bottomQueens.length % 2 != 0) {
        notpair = true;
    }
    screen.createBold("Now, let the Lipsync LaLaPaRUza Smackdown BEGIN!!");
    let lipsyncorder = bottomQueens.slice();
    shuffle(lipsyncorder);
    screen.createHorizontalLine();
    //Round 1
    for (let i = 0; i < bottomQueens.length; i++) {
        let queen1 = lipsyncorder[i];
        let queen2 = lipsyncorder[i+1];
        screen.createImage(queen1.image);
        screen.createImage(queen2.image);
        if (notpair && lipsyncorder[i+3] == undefined) {
            let queen3 = lipsyncorder[lipsyncorder.length - 1];
            screen.createImage(queen3.image);
            screen.createBold(queen1.getName() + ", " + queen2.getName() + " and " + queen3.getName() + " will lipsync...");
            screen.createBold("The time has come for you to lip-sync... for your life! Good luck, and don't fuck it up.");
            lsSong();
            screen.createBold("I've made my decision.");
            var lipSync = [queen1, queen2, queen3];
            for (var i_1 = 0; i_1 < lipSync.length; i_1++) {
                lipSync[i_1].getASLipsync();
            }
            lipSync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
            screen.createImage(lipSync[0].image, "royalblue");
            screen.createBold(lipSync[0].getName() + ", shantay you stay! ");
            screen.createBold(lipSync[1].getName() + ", " + lipSync[2].getName() + ", you are still up for eliminaton!!");
            lipSync[0].addToTrackRecord("SAFE<br><small>Round 1</small>");
            lipsyncorder.splice(lipsyncorder.indexOf(lipSync[0]), 1);
            i = bottomQueens.length;
        } else {
            screen.createBold(queen1.getName() + " and " + queen2.getName() + " will lipsync...");
            screen.createBold("The time has come for you to lip-sync... for your life! Good luck, and don't fuck it up.");
            lsSong();
            screen.createBold("I've made my decision.");
            var lipSync = [queen1, queen2];
            for (var i_1 = 0; i_1 < lipSync.length; i_1++) {
                lipSync[i_1].getASLipsync();
            }
            lipSync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
            screen.createImage(lipSync[0].image, "royalblue");
            screen.createBold(lipSync[0].getName() + ", shantay you stay! ");
            screen.createBold(lipSync[1].getName() + ", you are still up for eliminaton!! ");
            lipSync[0].addToTrackRecord("SAFE<br><small>Round 1</small>");
            lipsyncorder.splice(lipsyncorder.indexOf(lipSync[0]), 1);
            if (lipsyncorder[i+1] == undefined) {
                i = bottomQueens.length;
            }
        }
    }
    //Round 2
    shuffle(lipsyncorder);
    screen.createHorizontalLine();
    screen.createBold("Next round..!");
    for (let i = 0; i < bottomQueens.length; i++) {
        let queen1 = lipsyncorder[i];
        let queen2 = lipsyncorder[i+1];
        screen.createImage(queen1.image);
        screen.createImage(queen2.image);
        screen.createBold(queen1.getName() + " and " + queen2.getName() + " will lipsync...");
        screen.createBold("The time has come for you to lip-sync... for your life! Good luck, and don't fuck it up.");
        lsSong();
        screen.createBold("I've made my decision.");
        var lipSync = [queen1, queen2];
        for (var i_1 = 0; i_1 < lipSync.length; i_1++) {
            lipSync[i_1].getASLipsync();
        }
        lipSync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
        screen.createImage(lipSync[0].image, "royalblue");
        screen.createBold(lipSync[0].getName() + ", shantay you stay! ");
        screen.createBold(lipSync[1].getName() + ", you are still up for eliminaton!! ");
        lipSync[0].addToTrackRecord("SAFE<br><small>Round 2</small>");
        lipsyncorder.splice(lipsyncorder.indexOf(lipSync[0]), 1);
        if (lipsyncorder[i+1] == undefined) {
            i = bottomQueens.length;
        }
    }
    //Round 3
    shuffle(lipsyncorder);
    screen.createHorizontalLine();
    screen.createBold("Final round..!");
    for (let i = 0; i < bottomQueens.length; i++) {
        let queen1 = lipsyncorder[i];
        let queen2 = lipsyncorder[i+1];
        screen.createImage(queen1.image);
        screen.createImage(queen2.image);
        screen.createBold(queen1.getName() + " and " + queen2.getName() + " will lipsync...");
        screen.createBold("The time has come for you to lip-sync... for your life! Good luck, and don't fuck it up.");
        lsSong();
        screen.createBold("I've made my decision.");
        var lipSync = [queen1, queen2];
        for (var i_1 = 0; i_1 < lipSync.length; i_1++) {
            lipSync[i_1].getASLipsync();
        }
        lipSync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
        if (lipSync[0].lipsyncScore >= lipSync[1].lipsyncScore && lipSync[0].lipsyncScore > 7 && lipSync[1].lipsyncScore > 7) {
            screen.createImage(lipSync[0].image, "darkblue");
            screen.createImage(lipSync[1].image, "darkblue");
            screen.createBold("Shantay, you both stay baby!");
            queen1.addToTrackRecord("SAFE<br><small>Round 3</small>");
            queen2.addToTrackRecord("SAFE<br><small>Round 3</small>");
            lipsyncorder.splice(lipsyncorder.indexOf(queen1), 1);
            lipsyncorder.splice(lipsyncorder.indexOf(queen2), 1);
        } else {
            screen.createImage(lipSync[0].image, "royalblue");
            screen.createBold(lipSync[0].getName() + ", shantay you stay! ");
            lipSync[0].addToTrackRecord("SAFE<br><small>Round 3</small>");
            lipsyncorder.splice(lipsyncorder.indexOf(lipSync[0]), 1);
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(lipSync[1].getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(lipSync[1]) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(lipSync[1].getName() + "!! Condragulations, you are safe to slay another day!");
                    lipSync[1].addToTrackRecord("CHOC");
                    chocolateBarTwistCheck = true;
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(lipSync[1].getName() + ", sashay away...");
                    lipSync[1].addToTrackRecord(" ELIM ");
                    lipSync[1].unfavoritism += 2;
                    eliminatedCast.unshift(lipSync[1]);
                    currentCast.splice(currentCast.indexOf(lipSync[1]), 1);
                }
            } else {
                screen.createBold(lipSync[1].getName() + ", sashay away. ");
                lipSync[1].addToTrackRecord(" ELIM ");
                lipSync[1].unfavoritism += 2;
                eliminatedCast.unshift(lipSync[1]);
                currentCast.splice(currentCast.indexOf(lipSync[1]), 1);
            }
        }
        if (lipsyncorder[i+1] == undefined) {
            i = bottomQueens.length;
        }
    }
    episodeChallenges.push("LaLaPaRUZa Smackdown");
    episodeCount++;
    if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "newEpisode()");
}
let lateQueen = '';
function s9judgingScreen() { 
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createParagraph("In this premiere, for the first time in Drag Race herstory.. nobody is going home tonight!");
    screen.createBold("Now, based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    screen.createHorizontalLine();
    
    for (let i = 0; i < topQueens.length; i++) {
        screen.createImage(topQueens[i].image, "cyan");
    }
    screen.createBold("", "judged");
    let judged = document.getElementById("judged");
    for (let i = 0; i < topQueens.length; i++) {
        judged.innerHTML += `${topQueens[i].getName()}, `;
    }
    judged.innerHTML += "you represent the tops of the week.";
    screen.createHorizontalLine();
    screen.createBold("", "safeQueens");
    let safeQueens = document.querySelector("b#safeQueens");
    for (let i = 2; i < currentCast.length; i++) {
        if (topQueens.indexOf(currentCast[i]) == -1) {
            safeQueens.innerHTML += currentCast[i].getName() + ", ";
            currentCast[i].addToTrackRecord("SAFE");
            currentCast[i].ppe += 3;
        }
    }
    safeQueens.innerHTML += "you are safe..";
    screen.createHorizontalLine();
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(100) < 60) {
        topQueens[0].addToTrackRecord(" WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        topQueens[1].addToTrackRecord(" WIN");
        topQueens[1].favoritism += 5;
        topQueens[1].ppe += 5;
        screen.createImage(topQueens[0].image, "darkblue");
        screen.createImage(topQueens[1].image, "darkblue");
        screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's challenge!");
        topQueens.splice(0, 2);
    }
    else {
        topQueens[0].addToTrackRecord("WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        screen.createImage(topQueens[0].image, "royalblue");
        screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
        topQueens.splice(0, 1);
    }
    if (topQueens.length > 0) {
        for (let i = 0; i < topQueens.length; i++) {
            screen.createImage(topQueens[i].image, "lightblue");
            topQueens[i].addToTrackRecord("HIGH");
            topQueens[i].favoritism += 1;
            topQueens[i].ppe += 4;
        }
        screen.createParagraph("", "highs");
        let highs = document.getElementById("highs");
        for (let i = 0; i < topQueens.length; i++)
            highs.innerHTML += `${topQueens[i].getName()}, `;
        highs.innerHTML += "good job this week, you're safe.";
    }
    screen.createButton("Proceed", "lateQueenScreen()");
}
function lateQueenScreen() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Oh, wait a minute, wait a minute!!");
    screen.createBigText("I have one last announcement!");
    screen.createBold("The real competition is just about to begin... I'm introducing a new queen into the race!");
    screen.createBold('Please welcome to the race... ' + lateQueen.getName() + "!!");
    screen.createImage(lateQueen.image, "royalblue");
    screen.createHorizontalLine();
    currentCast.push(lateQueen);
    if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "newEpisode()");
}
function judging6WayScreen() {
    bottom6WayLipsyncCheck = true;
    let judgingScreen = new Scene();
    judgingScreen.clean();
    judgingScreen.createHeader("Judging!");
    judgingScreen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    let o = 0;
    for (let i = 0; i < topQueens.length; i++) {
        judgingScreen.createImage(topQueens[i].image, "cyan");
        judgingScreen.createImage(bottomQueens[o].image, "cyan");
        judgingScreen.createImage(bottomQueens[o+1].image, "cyan");
        o = o + 2;
    }
    o = 0;
    judgingScreen.createBold("", "judged");
    let judged = document.getElementById("judged");
    for (let i = 0; i < topQueens.length; i++) {
        judged.innerHTML += `${topQueens[i].getName()}, `;
        judged.innerHTML += `${bottomQueens[o].getName()}, `;
        judged.innerHTML += `${bottomQueens[o+1].getName()}, `;
        o = o + 2;
    }
    judged.innerHTML += "you represent the tops and bottoms of the week.";
    judgingScreen.createHorizontalLine();
    judgingScreen.createParagraph("", "safeQueens");
    let safeQueens = document.querySelector("p#safeQueens");
    for (let i = 0; i < currentCast.length; i++) {
        if (topQueens.indexOf(currentCast[i]) == -1 && bottomQueens.indexOf(currentCast[i]) == -1) {
            safeQueens.innerHTML += currentCast[i].getName() + ", ";
            currentCast[i].addToTrackRecord("SAFE");
            currentCast[i].ppe += 3;
        }
    }
    safeQueens.innerHTML += "you are safe.";
    judgingScreen.createButton("Proceed", "winAndBtm6()");
}
function winAndBtm6() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my girls!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (isTeamChallenge) {
        topQueens[0].addToTrackRecord("WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        if (immunityTwist && giveImmunity()) {
            topQueens[0].immune = true;
            topQueens[0].immuneEp.push(episodeCount);
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge! And you also earned immunity for the next challenge!");
        } else {
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
        }
        topQueens.splice(0, 1);
    }
    //double win:
    else if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(100) < 60) {
        topQueens[0].addToTrackRecord(" WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        topQueens[1].addToTrackRecord(" WIN");
        topQueens[1].favoritism += 5;
        topQueens[1].ppe += 5;
        screen.createImage(topQueens[0].image, "darkblue");
        screen.createImage(topQueens[1].image, "darkblue");
        screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's challenge!");
        topQueens.splice(0, 2);
    }
    else {
        topQueens[0].addToTrackRecord("WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        if (immunityTwist && giveImmunity()) {
            topQueens[0].immune = true;
            topQueens[0].immuneEp.push(episodeCount);
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge! And you also earned immunity for the next challenge!");
        } else {
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
        }
        topQueens.splice(0, 1);
    }
    if (topQueens.length > 0) {
        for (let i = 0; i < topQueens.length; i++) {
            screen.createImage(topQueens[i].image, "lightblue");
            topQueens[i].addToTrackRecord("HIGH");
            topQueens[i].favoritism += 1;
            topQueens[i].ppe += 4;
        }
        screen.createParagraph("", "highs");
        let highs = document.getElementById("highs");
        for (let i = 0; i < topQueens.length; i++)
            highs.innerHTML += `${topQueens[i].getName()}, `;
            highs.innerHTML += "good job this week, you're safe.";
    }
    screen.createHorizontalLine();
    if (immunityTwist && stillImmune()) {
        for (let i = 0; i < bottomQueens.length; i++) {
            if (bottomQueens[i].immune && bottomQueens.length > 2) {
                screen.createImage(bottomQueens[i].image, "magenta");
                screen.createParagraph(bottomQueens[i].getName() + ", you have immunity, you are safe.");
                bottomQueens[i].addToTrackRecord("LOW");
                bottomQueens[i].unfavoritism += 1;
                bottomQueens[i].ppe += 2;
                bottomQueens[i].immune = false;
                bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                break;
            }
        }
    }
    if (bottomQueens.length >= 3) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createParagraph("", "bottom3");
        let bottom3 = document.getElementById("bottom3");
        for (let i = 0; i < bottomQueens.length; i++)
            bottom3.innerHTML += bottomQueens[i].getName() + ", ";
        bottom3.innerHTML += "Y'all need to step your pussy up...";
    }
    screen.createBold("For the first time in Drag Race Herstory, all of you will be lipsyncing for your life.");
    screen.createButton("Proceed", "bottom6()");
}
function bottom6() {
    if (riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getASLipsync();
        }
    } else {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getLipsync();
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore - bottomQueens[i].favoritism) + bottomQueens[i].unfavoritism;
        }
    }
    bottomQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your lives! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(bottomQueens);
    if (event != false) {
        let eventQueen = bottomQueens.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = bottomQueens.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(bottomQueens, song);
    if (!riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore + bottomQueens[i].favoritism) - bottomQueens[i].unfavoritism;
        }
    }
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Proceed", "bottom6Judging()");
}
function bottom6Judging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision.");
    let score1 = bottomQueens[4].lipsyncScore;
    let score2 = bottomQueens[5].lipsyncScore;
    if (!riggoryLipsync) {
        score1 = bottomQueens[4].lipsyncScore - bottomQueens[4].favoritism + bottomQueens[4].unfavoritism;
        score2 = bottomQueens[5].lipsyncScore - bottomQueens[5].favoritism + bottomQueens[5].unfavoritism;
    }
    for (let i = 0; i <bottomQueens.length - 2; i++){
        screen.createImage(bottomQueens[i].image, "tomato");
        screen.createBold(bottomQueens[i].getName() + ", shantay you stay.");
        bottomQueens[i].addToTrackRecord("BTM6");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    if (score1 < 4 && score2 < 4 && randomNumber(100) <= 10 && !doubleSashay && currentCast.length > 6 && noDouble == false) {
        screen.createImage(bottomQueens[4].image, "darkred");
        screen.createImage(bottomQueens[5].image, "darkred");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold("Neither one of you survived that lipsync..." + bottomQueens[4].getName() + ", " + bottomQueens[5].getName() + ", now your fates rests in the hands of the drag gods.");
            screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
            if (chocolateBarCheck(bottomQueens[4], bottomQueens[5]) == 1) {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(bottomQueens[5].getName() + ", sashay away...");
                bottomQueens[5].addToTrackRecord("ELIM");
                bottomQueens[5].unfavoritism += 5;
                eliminatedCast.unshift(bottomQueens[5]);
                currentCast.splice(currentCast.indexOf(bottomQueens[5]), 1);
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(bottomQueens[4].getName() + "!! Condragulations, you are safe to slay another day!");
                bottomQueens[4].addToTrackRecord("CHOC");
                bottomQueens[4].unfavoritism += 3;
                bottomQueens[4].ppe += 1;
                chocolateBarTwistCheck = true;
                
            } else if (chocolateBarCheck(bottomQueens[4], bottomQueens[5]) == 2) {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(bottomQueens[4].getName() + ", sashay away...");
                bottomQueens[4].addToTrackRecord("ELIM");
                bottomQueens[4].unfavoritism += 5;
                eliminatedCast.unshift(bottomQueens[4]);
                currentCast.splice(currentCast.indexOf(bottomQueens[4]), 1);
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(bottomQueens[5].getName() + "!! Condragulations, you are safe to slay another day!");
                bottomQueens[5].addToTrackRecord("CHOC");
                bottomQueens[5].unfavoritism += 3;
                bottomQueens[5].ppe += 1;
                chocolateBarTwistCheck = true;
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(bottomQueens[4].getName() + ", sashay away...");
                bottomQueens[4].addToTrackRecord(" ELIM ");
                bottomQueens[4].unfavoritism += 5;
                bottomQueens[4].rankP = "tie1";
                eliminatedCast.unshift(bottomQueens[4]);
                currentCast.splice(currentCast.indexOf(bottomQueens[4]), 1);
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(bottomQueens[5].getName() + ", sashay away...");
                bottomQueens[5].addToTrackRecord(" ELIM ");
                bottomQueens[5].unfavoritism += 5;
                bottomQueens[5].rankP = "tie2";
                eliminatedCast.unshift(bottomQueens[5]);
                currentCast.splice(currentCast.indexOf(bottomQueens[5]), 1);
                
            }
        } else {
            screen.createBold("I'm sorry but none of you showed the fire it takes to stay. You must both... sashay away.");
            doubleSashay = true;
            bottomQueens[4].addToTrackRecord(" ELIM ");
            bottomQueens[4].unfavoritism += 5;
            bottomQueens[4].rankP = "tie1";
            eliminatedCast.unshift(bottomQueens[4]);
            currentCast.splice(currentCast.indexOf(bottomQueens[4]), 1);
            bottomQueens[5].addToTrackRecord(" ELIM ");
            bottomQueens[5].unfavoritism += 5;
            bottomQueens[5].rankP = "tie2";
            eliminatedCast.unshift(bottomQueens[5]);
            currentCast.splice(currentCast.indexOf(bottomQueens[5]), 1);
        }
    }else{
        screen.createImage(bottomQueens[4].image, "tomato");
        screen.createBold(bottomQueens[4].getName() + ", shantay you stay.");
        bottomQueens[4].addToTrackRecord("BTM6");
        bottomQueens[4].unfavoritism += 3;
        bottomQueens[4].ppe += 1;
        screen.createImage(bottomQueens[5].image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(bottomQueens[5].getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(bottomQueens[5]) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(bottomQueens[5].getName() + "!! Condragulations, you are safe to slay another day!");
                bottomQueens[5].addToTrackRecord("CHOC");
                bottomQueens[5].unfavoritism += 3;
                bottomQueens[5].ppe += 1;
                chocolateBarTwistCheck = true;
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(bottomQueens[5].getName() + ", sashay away...");
                bottomQueens[5].addToTrackRecord("ELIM");
                bottomQueens[5].unfavoritism += 5;
                eliminatedCast.unshift(bottomQueens[5]);
                currentCast.splice(currentCast.indexOf(bottomQueens[5]), 1);
                
            }
        } else {
            screen.createBold(bottomQueens[5].getName() + ", sashay away...");
            bottomQueens[5].addToTrackRecord("ELIM");
            bottomQueens[5].unfavoritism += 5;
            eliminatedCast.unshift(bottomQueens[5]);
            currentCast.splice(currentCast.indexOf(bottomQueens[5]), 1);
        }  
    }
    if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) == true && premiereCounter < 3)
        screen.createButton("Proceed", "doublePremiere()");
    else if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "newEpisode()");
}
function judgingSlayersScreen() {
    slayersCheck = true;
    slayersSmack = episodeCount;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    for (let i = 0; i < topQueens.length; i++) {
        screen.createImage(topQueens[i].image, "black");
    }
    screen.createHorizontalLine();
    if (currentCast.length > 8){
        screen.createBold("", "safeQueens");
        let safeQueens = document.querySelector("b#safeQueens");
        for (let i = 0; i < 3; i++) {
            safeQueens.innerHTML += topQueens[topQueens.length - (i + 1)].getName() + ", ";
            topQueens[topQueens.length - (i + 1)].addToTrackRecord("SAFE");
            topQueens[topQueens.length - (i + 1)].ppe += 3;
        }
        topQueens.splice(topQueens.length - 3, 3);
        safeQueens.innerHTML += "you are safe..";
        screen.createHorizontalLine();
    }
    for (let i = 0; i < topQueens.length; i++) {
        screen.createImage(topQueens[i].image, "cyan");
    }
    screen.createBold("", "judged");
    let judged = document.getElementById("judged");
    for (let i = 0; i < topQueens.length; i++) {
        judged.innerHTML += `${topQueens[i].getName()}, `;
    }
    judged.innerHTML += "you represent the tops of the week.";
    screen.createParagraph("Nobody is going home tonight!");
    screen.createHorizontalLine();

    for (let i = 0; i < topQueens.length; i++)
        topQueens[i].performanceScore -= (topQueens[i].runwayScore);
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    top2.push(topQueens[0]);
    top2.push(topQueens[1]);
    topQueens.splice(0, 2);
    screen.createImage(top2[0].image, "cyan");
    screen.createImage(top2[1].image, "cyan");
    screen.createBold(top2[0].getName() + ", " + top2[1].getName() + ", condragulations, you're the Top 2 of the week!");
    if (topQueens.length > 0) {
        for (let i = 0; i < topQueens.length; i++) {
            screen.createImage(topQueens[i].image, "lightblue");
            topQueens[i].addToTrackRecord("HIGH");
            topQueens[i].favoritism += 1;
            topQueens[i].ppe += 4;
        }
    }
    screen.createParagraph("", "highs");
    let highs = document.getElementById("highs");
    for (let i = 0; i < topQueens.length; i++) {
        highs.innerHTML += `${topQueens[i].getName()}, `;
    }
    highs.innerHTML += "good job this week, you're all safe.";
    screen.createHorizontalLine();
    screen.createBold("The Top 2 will now lip-sync... for the win!");
    let song = lsSong().toString();
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    screen.createImage(top2[0].image, "royalblue");
    screen.createBold(`${top2[0].getName()}, you're a winner baby!`);
    top2[0].addToTrackRecord("WIN");
    top2[0].favoritism += 5;
    top2[0].ppe += 5;
    top2[1].addToTrackRecord("TOP2");
    top2[1].favoritism += 2;
    top2[1].ppe += 4.5;
    toBlots(top2, song);
    if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "newEpisode()");
}
function judgingFloppersScreen() {
    floppersCheck = true;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createBold("Brace yourselves, cause Drag Race is about to get real..");
    screen.createBold("Based on tonight's performances... This week there will be no winners.");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    for (let i = 0; i < currentCast.length; i++) {
        screen.createImage(currentCast[i].image, "black");
    }
    screen.createBold("I'm really, really disappointed. No one is safe and two of you will lipsync for your life..", "judged");
    screen.createHorizontalLine();
    screen.createBold("", "safeQueens");
    let safeQueens = document.querySelector("b#safeQueens");
    for (let i = 0; i < currentCast.length; i++) {
        if (bottomQueens.indexOf(currentCast[i]) == -1) {
            safeQueens.innerHTML += currentCast[i].getName() + ", ";
            currentCast[i].addToTrackRecord("SAFE");
            currentCast[i].ppe += 3;
        }
    }
    safeQueens.innerHTML += "you are all safe. And as you step to the back of the stage, keep one thing on mind. STEP YOUR PUSSIES UP.";
    screen.createHorizontalLine();
    for (let i = 0; i < bottomQueens.length; i++)
        bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore);
    bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    bottomQueens[0].addToTrackRecord("LOW");
    screen.createImage(bottomQueens[0].image, "pink");
    screen.createBold(bottomQueens[0].getName() + "... you are safe.");
    bottomQueens[0].unfavoritism += 1;
    bottomQueens[0].ppe += 2;
    bottomQueens.splice(0, 1);
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createBold("", "btm2");
    let btm2 = document.getElementById("btm2");
    for (let i = 0; i < bottomQueens.length; i++) {
        btm2.innerHTML += bottomQueens[i].getName() + ", ";
    }
    btm2.innerHTML += "I'm sorry my dears but you are up for elimination.";
    screen.createButton("Proceed", "lipsyncDesc()");
}
function winnersJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    screen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    for (let i = 0; i < topQueens.length; i++) {
        screen.createImage(topQueens[i].image, "cyan");
    }
    screen.createBold("", "judged");
    let judged = document.getElementById("judged");
    for (let i = 0; i < topQueens.length; i++) {
        judged.innerHTML += `${topQueens[i].getName()}, `;
    }
    judged.innerHTML += "you represent the tops of the week.";
    screen.createHorizontalLine();
    for (let i = 0; i < currentCast.length; i++) {
        if (topQueens.indexOf(currentCast[i]) == -1) {
            currentCast[i].addToTrackRecord("SAFE");
            currentCast[i].ppe += 3;
            blockQueens.push(currentCast[i]);
        }
    }
    screen.createButton("Proceed", "top2AndBlocked()");
}
let homeTrigger = 0;
function judgingScreen() {
    let judgingScreen = new Scene();
    judgingScreen.clean();
    judgingScreen.createHeader("Judging!");
    judgingScreen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    if (team == true) {
        judgingScreen.createImage(topQueens[0].QueenA.image, "cyan");
        judgingScreen.createImage(topQueens[1].QueenA.image, "cyan");
        judgingScreen.createImage(topQueens[0].QueenB.image, "cyan");
        judgingScreen.createImage(topQueens[1].QueenB.image, "cyan");
        judgingScreen.createImage(bottomQueens[0].QueenB.image, "cyan");
        judgingScreen.createImage(bottomQueens[1].QueenB.image, "cyan");
        judgingScreen.createImage(bottomQueens[2].QueenB.image, "cyan");
        judgingScreen.createImage(bottomQueens[0].QueenA.image, "cyan");
        judgingScreen.createImage(bottomQueens[1].QueenA.image, "cyan");
        judgingScreen.createImage(bottomQueens[2].QueenA.image, "cyan");
        judgingScreen.createBold(`${topQueens[0].getName()}, ${topQueens[1].getName()}, ${bottomQueens[0].getName()}, ${bottomQueens[1].getName()}, ${bottomQueens[2].getName()}, you represent the tops and bottoms of the week.`);
    }
    else {
        if (topQueens.length > bottomQueens.length) {
            for (let i = 0; i < bottomQueens.length; i++) {
                judgingScreen.createImage(topQueens[i].image, "cyan");
                judgingScreen.createImage(bottomQueens[i].image, "cyan");
            }
            if (bottomQueens.length < topQueens.length) {
                judgingScreen.createImage(topQueens[bottomQueens.length].image, "cyan");
            }
        } else { 
            for (let i = 0; i < topQueens.length; i++) {
                judgingScreen.createImage(topQueens[i].image, "cyan");
                judgingScreen.createImage(bottomQueens[i].image, "cyan");
            }
            if (bottomQueens.length > topQueens.length) {
                judgingScreen.createImage(bottomQueens[topQueens.length].image, "cyan");
            }
        }
        judgingScreen.createBold("", "judged");
        let judged = document.getElementById("judged");
        if (topQueens.length > bottomQueens.length) {
            for (let i = 0; i < bottomQueens.length; i++) {
                judged.innerHTML += `${topQueens[i].getName()}, `;
                judged.innerHTML += `${bottomQueens[i].getName()}, `;
            }
            if (bottomQueens.length < topQueens.length) {
                judged.innerHTML += `${topQueens[bottomQueens.length].getName()}, `;
            }
        } else {
            for (let i = 0; i < topQueens.length; i++) {
                judged.innerHTML += `${topQueens[i].getName()}, `;
                judged.innerHTML += `${bottomQueens[i].getName()}, `;
            }
            if (bottomQueens.length > topQueens.length) {
                judged.innerHTML += `${bottomQueens[topQueens.length].getName()}, `;
            }
        }
        judged.innerHTML += "you represent the tops and bottoms of the week.";
    }
    judgingScreen.createHorizontalLine();
    judgingScreen.createParagraph("", "safeQueens");
    let safeQueens = document.querySelector("p#safeQueens");
    //check if the queen is in the top or in the bottom, and if not put her as safe:
    for (let i = 0; i < currentCast.length; i++)
        if (topQueens.indexOf(currentCast[i]) == -1 && bottomQueens.indexOf(currentCast[i]) == -1) {
            safeQueens.innerHTML += currentCast[i].getName() + ", ";
            if (team == false)
                currentCast[i].addToTrackRecord("SAFE");
                currentCast[i].ppe += 3;
            if (team == true) {
                currentCast[i].addToTrackRecord("SAFE");
                currentCast[i].QueenA.addToTrackRecord("SAFE");
                currentCast[i].QueenA.ppe += 3;
                currentCast[i].QueenB.addToTrackRecord("SAFE");
                currentCast[i].QueenB.ppe += 3;
            }
        }
    if (isTeamChallenge && currentCast.length <= 8) {
        safeQueens.innerHTML += "";
    } else {
        safeQueens.innerHTML += "you are safe.";
    }
    if (currentCast.length <= 10 && episodeCount > 3 && (regularFormat || thailandFormat) || currentCast.length <= 10 && (all_stars || lipsync_assassin) && episodeCount > 2) {
        if (currentCast.length <= 10 && randomNumber(11) == 7 && homeTrigger < 2 && !team || homeTrigger == 0) {
            homeTrigger++;
            whoShouldGoHomeTonight();
        }
    }
    if (uk3Premiere && episodeCount == 1)
        judgingScreen.createButton("Proceed", "uk3PremiereJudging()");
    else if (regularFormat)
        judgingScreen.createButton("Proceed", "winAndBtm2()");
    else if (all_stars)
        judgingScreen.createButton("Proceed", "top2AndBtm()");
    else if (lipsync_assassin)
        judgingScreen.createButton("Proceed", "topAndBtm()");
    else if (team)
        judgingScreen.createButton("Proceed", "teamWinAndBtm2()");
}
function whoShouldGoHomeTonight() {
    let screen = new Scene();
    screen.createHorizontalLine();
    screen.createBold("All right. I wanna hear from you. Who should go home tonight? And why?", "txt");
    let txt = document.getElementById("txt");
    txt.setAttribute("style", "font-size: 20px");
    let whoAll = [...topQueens, ...bottomQueens];
    shuffle(whoAll);
    if (team) {

    } else {
        for (let i = 0; i < whoAll.length; i++) {
            if (randomNumber(11) == 7) {
                whoAll[i].lipstick = worstSister(whoAll[i], currentCast);
            } else {
                whoAll[i].lipstick = worstSister(whoAll[i], bottomQueens);
            }
            if (bottomQueens.find(q => { return q.getName() == whoAll[i].lipstick.getName()}) == undefined) {
                whoAll[i].lipstick = pickRandomlyFromArray(bottomQueens);
            }
            screen.createImage(whoAll[i].image, "black");
            screen.createImage(whoAll[i].lipstick.image, "red");
            screen.createBold(whoAll[i].getName() + " said " + whoAll[i].lipstick.getName() + " because ", whoAll[i].getName(), "whoHomeVP");
            let reason = document.getElementById(whoAll[i].getName());
            if (isEnemy(whoAll[i], whoAll[i].lipstick)) {
                reason.innerHTML += pickRandomlyFromArray(whoWhyRelation) + ".";
            } else if (randomNumber(100) >= 95) {
                reason.innerHTML += pickRandomlyFromArray(whoWhyRelation) + ".";
            } else {
                reason.innerHTML += pickRandomlyFromArray(whoWhyCompetition) + ".";
            }
            if (whoAll[i].lipstick.getName() != whoAll[i].getName()) {
                if (randomNumber(100) >= 80) {
                    modRelation(2, 4, whoAll[i], whoAll[i].lipstick);
                    screen.createParagraph("<i>" + whoAll[i].lipstick.getName() + " felt very upset. </i>");
                } else {
                    modRelation(2, 3, whoAll[i], whoAll[i].lipstick);
                    screen.createParagraph("<i>" + whoAll[i].lipstick.getName() + " took it great, they weren't too mad.</i>");
                }
            }
        }
    }
}
let thirdqueen = false;
function winAndBtm2() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my girls!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (isTeamChallenge) {
        if (episodeChallenges[episodeChallenges.length - 1] == "Girl Group" && randomNumber(100) >= 50) {
            let names = "";
            for (let i = 0; i < topQueens.length; i++) {
                topQueens[i].addToTrackRecord(" WIN");
                topQueens[i].favoritism += 5;
                topQueens[i].ppe += 5;
                screen.createImage(topQueens[i].image, "royalblue");
                if (i == topQueens.length - 1) {
                    names += topQueens[i].getName() + ".";
                } else {
                    names += topQueens[i].getName() + ", ";
                }
            }
            screen.createBold(names +" Condragulations, you're the winning team of today's challenge!");
            topQueens.splice(0);
            isTeamChallenge = false;
        } else if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(100) < 60) {
            topQueens[0].addToTrackRecord(" WIN");
            topQueens[0].favoritism += 5;
            topQueens[0].ppe += 5;
            topQueens[1].addToTrackRecord(" WIN");
            topQueens[1].favoritism += 5;
            topQueens[1].ppe += 5;
            screen.createImage(topQueens[0].image, "darkblue");
            screen.createImage(topQueens[1].image, "darkblue");
            screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's challenge!");
            topQueens.splice(0, 2);
        }else {
            topQueens[0].addToTrackRecord("WIN");
            topQueens[0].favoritism += 5;
            topQueens[0].ppe += 5;
            if (immunityTwist && giveImmunity()) {
                topQueens[0].immune = true;
                topQueens[0].immuneEp.push(episodeCount);
                screen.createImage(topQueens[0].image, "royalblue");
                screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge! And you also earned immunity for the next challenge!");
            } else {
                screen.createImage(topQueens[0].image, "royalblue");
                screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
            }
            topQueens.splice(0, 1);
        }
    }//double win:
    else if (topQueens[0].performanceScore == topQueens[1].performanceScore && randomNumber(100) < 60 || isPairChallenge && randomNumber(100) < 85) {
        topQueens[0].addToTrackRecord(" WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        topQueens[1].addToTrackRecord(" WIN");
        topQueens[1].favoritism += 5;
        topQueens[1].ppe += 5;
        screen.createImage(topQueens[0].image, "darkblue");
        screen.createImage(topQueens[1].image, "darkblue");
        screen.createBold(topQueens[0].getName() + ", " + topQueens[1].getName() + ", condragulations, you're the winners of today's challenge!");
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(topQueens[0], topQueens[1]);
            conjoinedCheck = false;
        }
        topQueens.splice(0, 2);
    }
    else {
        topQueens[0].addToTrackRecord("WIN");
        topQueens[0].favoritism += 5;
        topQueens[0].ppe += 5;
        if (immunityTwist && giveImmunity()) {
            topQueens[0].immune = true;
            topQueens[0].immuneEp.push(episodeCount);
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge! And you also earned immunity for the next challenge!");
        } else {
            screen.createImage(topQueens[0].image, "royalblue");
            screen.createBold(topQueens[0].getName() + ", condragulations, you're the winner of today's challenge!");
        }
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(topQueens[0]);
            conjoinedCheck = false;
        }
        topQueens.splice(0, 1);
    }
    if (topQueens.length > 0) {
        if (isPairChallenge) {
            isPairChallenge = false;
        }
        if (isTeamChallenge){
            isTeamChallenge = false;
            for (let i = 0; i < topQueens.length; i++) {
                screen.createImage(topQueens[i].image, "aquamarine");
                topQueens[i].addToTrackRecord("HIGH TEAM");
                topQueens[i].favoritism += 1;
                topQueens[i].ppe += 4;
            }
        }else{
            for (let i = 0; i < topQueens.length; i++) {
                screen.createImage(topQueens[i].image, "lightblue");
                topQueens[i].addToTrackRecord("HIGH");
                topQueens[i].favoritism += 1;
                topQueens[i].ppe += 4;
            }
        }
        screen.createParagraph("", "highs");
        let highs = document.getElementById("highs");
        for (let i = 0; i < topQueens.length; i++)
            highs.innerHTML += `${topQueens[i].getName()}, `;
            highs.innerHTML += "good job this week, you're safe.";
    }
    screen.createHorizontalLine();
    if (bottomQueens.length >= 3) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createParagraph("", "bottom3");
        let bottom3 = document.getElementById("bottom3");
        for (let i = 0; i < bottomQueens.length; i++)
            bottom3.innerHTML += bottomQueens[i].getName() + ", ";
        bottom3.innerHTML += "you're the bottoms of the week...";
    }
    //do the same, but for the bottom queens:
    for (let i = 0; i < bottomQueens.length; i++)
        bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore);
    bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (immunityTwist && stillImmune()) {
        for (let i = 0; i < bottomQueens.length; i++) {
            if (bottomQueens[i].immune && bottomQueens.length > 2) {
                screen.createImage(bottomQueens[i].image, "magenta");
                screen.createParagraph(bottomQueens[i].getName() + ", you have immunity, you are safe.");
                bottomQueens[i].addToTrackRecord("LOW");
                bottomQueens[i].unfavoritism += 1;
                bottomQueens[i].ppe += 2;
                bottomQueens[i].immune = false;
                bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                break;
            }
        }
    }
    if (bottomQueens.length == 5) {
        bottomQueens[0].addToTrackRecord("LOW");
        bottomQueens[1].addToTrackRecord("LOW");
        bottomQueens[2].addToTrackRecord("LOW");
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createImage(bottomQueens[1].image, "pink");
        screen.createImage(bottomQueens[2].image, "pink");
        screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + ", " + bottomQueens[2].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens[1].unfavoritism += 1;
        bottomQueens[1].ppe += 2;
        bottomQueens[2].unfavoritism += 1;
        bottomQueens[2].ppe += 2;
        bottomQueens.splice(0, 3);
    }
    else if (bottomQueens.length == 4) {
        bottomQueens[0].addToTrackRecord("LOW");
        bottomQueens[1].addToTrackRecord("LOW");
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createImage(bottomQueens[1].image, "pink");
        screen.createBold(bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens[1].unfavoritism += 1;
        bottomQueens[1].ppe += 2;
        bottomQueens.splice(0, 2);
    } else if (bottomQueens.length == 3 && bottomQueens[0].performanceScore >= 30 && currentCast.length > 5) {
        thirdqueen = true;
        screen.createBold("... no one is safe.");
    }
    else if (bottomQueens.length == 3) {
        bottomQueens[0].addToTrackRecord("LOW");
        screen.createImage(bottomQueens[0].image, "pink");
        screen.createBold(bottomQueens[0].getName() + "... you are safe.");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens.splice(0, 1);
    }
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createBold("", "btm2");
    let btm2 = document.getElementById("btm2");
    for (let i = 0; i < bottomQueens.length; i++) {
        btm2.innerHTML += bottomQueens[i].getName() + ", ";
    }
    btm2.innerHTML += "I'm sorry my dears but you are up for elimination.";
    screen.createButton("Proceed", "lipsyncDesc()");
}
function teamWinAndBtm2() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my All Stars!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    topQueens[0].QueenA.addToTrackRecord("WIN");
    topQueens[0].QueenB.addToTrackRecord("WIN");
    topQueens[0].addToTrackRecord("WIN");
    topQueens[0].favoritism += 5;
    topQueens[0].QueenA.favoritism += 5;
    topQueens[0].QueenB.favoritism += 5;
    topQueens[0].QueenA.ppe += 5;
    topQueens[0].QueenB.ppe += 5;
    topQueens[0].ppe += 5;
    screen.createImage(topQueens[0].QueenB.image, "royalblue");
    screen.createImage(topQueens[0].QueenA.image, "royalblue");
    screen.createBold(topQueens[0].getName() + ", condragulations you're the winners of this week's challenge!");
    if (topQueens.length > 1) {
        topQueens[1].QueenA.addToTrackRecord("HIGH");
        topQueens[1].QueenB.addToTrackRecord("HIGH");
        topQueens[1].addToTrackRecord("HIGH");
        topQueens[1].favoritism += 1;
        topQueens[1].ppe += 4;
        topQueens[1].QueenA.favoritism += 1;
        topQueens[1].QueenA.ppe += 4;
        topQueens[1].QueenB.favoritism += 1;
        topQueens[1].QueenB.ppe += 4;
        screen.createImage(topQueens[1].QueenB.image, "cyan");
        screen.createImage(topQueens[1].QueenA.image, "cyan");
        screen.createParagraph(topQueens[1].getName() + ", good work this week, you're safe.");
    }
    screen.createHorizontalLine();
    if (bottomQueens.length > 2) {
        screen.createParagraph(`${bottomQueens[0].getName()}, ${bottomQueens[1].getName()}, ${bottomQueens[2].getName()}, you're the bottoms of the week...`);
        for (let i = 0; i < topQueens.length; i++)
            bottomQueens[i].performanceScore -= (bottomQueens[i].runwayScore);
        bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
        bottomQueens[0].QueenA.addToTrackRecord("LOW");
        bottomQueens[0].QueenB.addToTrackRecord("LOW");
        bottomQueens[0].addToTrackRecord("LOW");
        bottomQueens[0].unfavoritism += 1;
        bottomQueens[0].ppe += 2;
        bottomQueens[0].QueenA.unfavoritism += 1;
        bottomQueens[0].QueenA.ppe += 2;
        bottomQueens[0].QueenB.unfavoritism += 1;
        bottomQueens[0].QueenB.ppe += 2;
        screen.createImage(bottomQueens[0].QueenB.image, "pink");
        screen.createImage(bottomQueens[0].QueenA.image, "pink");
        screen.createBold(bottomQueens[0].getName() + ", you are safe.");
        bottomQueens.splice(0, 1);
    }
    screen.createImage(bottomQueens[0].QueenB.image, "tomato");
    screen.createImage(bottomQueens[0].QueenA.image, "tomato");
    screen.createImage(bottomQueens[1].QueenB.image, "tomato");
    screen.createImage(bottomQueens[1].QueenA.image, "tomato");
    screen.createBold(`${bottomQueens[0].getName()}, ${bottomQueens[1].getName()}, I'm sorry my dears but you are up for elimination.`);
    screen.createButton("Proceed", "teamLipSyncDesc()");
}
function top2AndBtm() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my All Stars!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    top2.push(topQueens[0]);
    top2.push(topQueens[1]);
    topQueens.splice(0, 2);
    screen.createImage(top2[0].image, "cyan");
    screen.createImage(top2[1].image, "cyan");
    screen.createBold(top2[0].getName() + ", " + top2[1].getName() + ", condragulations, you're the Top 2 of the week!");
    for (let i = 0; i < topQueens.length; i++)
        screen.createImage(topQueens[i].image, "lightblue");
    screen.createParagraph("", "highs");
    let highs = document.querySelector("p#highs");
    for (let i = 0; i < topQueens.length; i++) {
        highs.innerHTML += topQueens[i].getName() + ", ";
        topQueens[i].addToTrackRecord("HIGH");
        topQueens[i].favoritism += 1;
        topQueens[i].ppe += 4;
    }
    if (topQueens.length > 0)
        highs.innerHTML += "good work this week, you're safe.";
    screen.createHorizontalLine();
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createBold("", "bottoms");
    let bottoms = document.querySelector("b#bottoms");
    for (let i = 0; i < bottomQueens.length; i++) {
        bottoms.innerHTML += bottomQueens[i].getName() + ", ";
    }
    bottoms.innerHTML += "I'm sorry my dears but you're the bottoms of the week.";
    bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (immunityTwist && stillImmune()) {
        for (let i = 0; i < bottomQueens.length; i++) {
            if (bottomQueens[i].immune && bottomQueens.length > 2) {
                screen.createImage(bottomQueens[i].image, "magenta");
                screen.createParagraph(bottomQueens[i].getName() + ", you have immunity, you are safe.");
                bottomQueens[i].addToTrackRecord("LOW");
                bottomQueens[i].unfavoritism += 1;
                bottomQueens[i].ppe += 2;
                bottomQueens[i].immune = false;
                bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                break;
            }
        }
    }
    if (allstars3Finale) {
        if (bottomQueens.length >= 3 && currentCast.length > 5){
            bottomQueens[0].addToTrackRecord("LOW");
            screen.createImage(bottomQueens[0].image, "pink");
            screen.createParagraph(bottomQueens[0].getName() + "... you are safe.");
            bottomQueens[0].unfavoritism += 1;
            bottomQueens[0].ppe += 2;
            bottomQueens.splice(0, 1);
        }
    } else {
        for (let i = 0; i < bottomQueens.length; i++) {
            if (bottomQueens[i].performanceScore >= 0 && bottomQueens[i].performanceScore < 16 && bottomQueens.length > 2) {
                screen.createImage(bottomQueens[i].image, "pink");
                screen.createParagraph(bottomQueens[i].getName() + ", you are safe.");
                bottomQueens[i].addToTrackRecord("LOW");
                bottomQueens[i].unfavoritism += 1;
                bottomQueens[i].ppe += 2;
                bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                break;
            }
        }
    }
    screen.createHorizontalLine();
    screen.createBigText("After deliberation...");
    for (let i = 0; i < top2.length; i++) {
        top2[i].lipstick = worstSister(top2[i], bottomQueens);
        if (bottomQueens.find(q => { return q.getName() == top2[i].lipstick.getName()}) == undefined) {
            top2[i].lipstick = pickRandomlyFromArray(bottomQueens);
        }
        for (let o = 0; o < bottomQueens.length; o++) {
            if (top2[i].lipstick != bottomQueens[o]) {
                modRelation(2, 1, top2[i], bottomQueens[o]);
            }
        }
        screen.createImage(top2[i].image, "cyan");
        screen.createImage(top2[i].lipstick.image, "red");
        screen.createBold(top2[i].getName() + " chose " + top2[i].lipstick.getName() + "'s lipstick!", "winV", "winVP");
        if (randomNumber(100) >= 80) {
            modRelation(2, 4, top2[i], top2[i].lipstick);
            screen.createBold("<i>" + top2[i].lipstick.getName() + " felt very upset.</i>", "winV", "winVP");
        } else {
            modRelation(2, 3, top2[i], top2[i].lipstick);
            screen.createBold("<i>" + top2[i].lipstick.getName() + " took it great, they weren't too mad.</i>","winV", "winVP");
        }
    }
    if (top2[0].lipstick == top2[1].lipstick){
        let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
        imageVoted.setAttribute("hidden", "hidden");
        let imageVotedd = document.querySelectorAll("img[src='" + top2[1].lipstick.image +"']")[2];
        imageVotedd.setAttribute("hidden", "hidden");
        mismovoto = true;
    }else{
        let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
        imageVoted.setAttribute("hidden", "hidden");
        let imageVotedd = document.querySelectorAll("img[src='" + top2[1].lipstick.image +"']")[1];
        imageVotedd.setAttribute("hidden", "hidden");
        mismovoto = false;
    }
    let winV = document.querySelectorAll("p#winVP");
    winV[0].setAttribute("hidden", "hidden");
    winV[1].setAttribute("hidden", "hidden");
    let main = document.querySelector("div#MainBlock");
    let div = document.createElement("div");
    div.setAttribute("id", "votes");
    div.setAttribute("hidden", "hidden");
    for (let i = 0; i < winV.length; i++){
        div.appendChild(winV[i]);
    }
    main.appendChild(div);
    let br = document.createElement("br");
    main.appendChild(br);
    screen.createButton("Show lipsticks", "showvotes()", "showvotes");
    screen.createButton("Proceed", "asLipsyncDesc()");
}
function topAndBtm() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my All Stars!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    top2.push(topQueens[0]);
    topQueens.splice(0, 1);
    if (immunityTwist && giveImmunity()) {
        top2[0].immune = true;
        top2[0].immuneEp.push(episodeCount);
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", condragulations, you're the Top All Star of the week! And you have also earned immunity for the next challenge!");
    } else {
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", condragulations, you're the Top All Star of the week!");
    }
    if (conjoinedQueens && conjoinedCheck){
        conjoinedReturn(top2[0]);
        conjoinedCheck = false;
    }
    for (let i = 0; i < topQueens.length; i++)
        screen.createImage(topQueens[i].image, "lightblue");
    screen.createParagraph("", "highs");
    let highs = document.querySelector("p#highs");
    for (let i = 0; i < topQueens.length; i++) {
        highs.innerHTML += topQueens[i].getName() + ", ";
        topQueens[i].addToTrackRecord("HIGH");
        topQueens[i].favoritism += 1;
        topQueens[i].ppe += 4;
    }
    if (topQueens.length > 0)
        highs.innerHTML += "good work this week, you're safe.";
    screen.createHorizontalLine();
    if (currentCast.length > 5) {
        for (let i = 0; i < bottomQueens.length; i++)
            screen.createImage(bottomQueens[i].image, "tomato");
        screen.createBold("", "bottoms");
        let bottoms = document.querySelector("b#bottoms");
        for (let i = 0; i < bottomQueens.length; i++) {
            bottoms.innerHTML += bottomQueens[i].getName() + ", ";
        }
        bottoms.innerHTML += "I'm sorry my dears but you're the bottoms of the week.";
        bottomQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
        if (immunityTwist && stillImmune()) {
            for (let i = 0; i < bottomQueens.length; i++) {
                if (bottomQueens[i].immune && bottomQueens.length > 2) {
                    screen.createImage(bottomQueens[i].image, "magenta");
                    screen.createParagraph(bottomQueens[i].getName() + ", you have immunity, you are safe.");
                    bottomQueens[i].addToTrackRecord("LOW");
                    bottomQueens[i].unfavoritism += 1;
                    bottomQueens[i].ppe += 2;
                    bottomQueens[i].immune = false;
                    bottomQueens.splice(bottomQueens.indexOf(bottomQueens[i]), 1);
                    break;
                }
            }
        }
        if (bottomQueens.length >= 3 && currentCast.length > 4){
            bottomQueens[0].addToTrackRecord("LOW");
            screen.createImage(bottomQueens[0].image, "pink");
            screen.createBold(bottomQueens[0].getName() + "... you are safe.");
            bottomQueens[0].unfavoritism += 1;
            bottomQueens[0].ppe += 2;
            bottomQueens.splice(0, 1);
        }
    }
    for (let i = 0; i < bottomQueens.length; i++)
        screen.createImage(bottomQueens[i].image, "tomato");
    screen.createParagraph("", "btms");
    let btms = document.getElementById("btms");
    for (let i = 0; i < bottomQueens.length; i++)
        btms.innerHTML += `${bottomQueens[i].getName()}, `;
    btms.innerHTML += " you're up for elimination.";
    screen.createHorizontalLine();
    screen.createBigText("After deliberation...");
    top2[0].lipstick = worstSister(top2[0], bottomQueens);
    if (bottomQueens.find(q => { return q.getName() == top2[0].lipstick.getName()}) == undefined) {
        top2[0].lipstick = pickRandomlyFromArray(bottomQueens);
    }
    for (let o = 0; o < bottomQueens.length; o++) {
        if (top2[0].lipstick != bottomQueens[o]) {
            modRelation(2, 1, top2[0], bottomQueens[o]);
        }
    }
    screen.createImage(top2[0].image, "cyan");
    screen.createImage(top2[0].lipstick.image, "red");
    screen.createBold(top2[0].getName() + " chose " + top2[0].lipstick.getName() + "'s lipstick!", "winV", "winVP");
    if (randomNumber(100) <= 80) {
        modRelation(2, 4, top2[0], top2[0].lipstick);
        screen.createBold("<i>" + top2[0].lipstick.getName() + " felt very upset.</i>", "winV", "winVP");
    } else {
        modRelation(2, 3, top2[0], top2[0].lipstick);
        screen.createBold("<i>" + top2[0].lipstick.getName() + " took it great, they weren't too mad.</i>","winV", "winVP");
    }
    if (currentCast.length <= 5){
        let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
        imageVoted.setAttribute("hidden", "hidden");
    }else{
        let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[2];
        imageVoted.setAttribute("hidden", "hidden");
    }
    let winV = document.querySelectorAll("p#winVP");
    for (let i = 0; i < winV.length; i++) {
        winV[i].setAttribute("hidden", "hidden");
    }
    screen.createHorizontalLine();
    let main = document.querySelector("div#MainBlock");
    let div = document.createElement("div");
    div.setAttribute("id", "votes");
    div.setAttribute("hidden", "hidden");
    screen.createBigText("The queens pick a lipstick...");
    for (let i = 0; i < currentCast.length; i++) {
        if (top2.indexOf(currentCast[i]) == -1) {
            currentCast[i].lipstick = worstSister(currentCast[i], bottomQueens);
            if (bottomQueens.find(q => { return q.getName() == currentCast[i].lipstick.getName()}) == undefined) {
                currentCast[i].lipstick = pickRandomlyFromArray(bottomQueens);
            }
            for (let o = 0; o < bottomQueens.length; o++) {
                if (randomNumber(100) <= 60 && currentCast[i].lipstick.getName() != bottomQueens[o].getName()) {
                    modRelation(2, 1, currentCast[i], bottomQueens[o]);
                }
            }
            screen.createBold(currentCast[i].getName() + " voted for " + currentCast[i].lipstick.getName() + "!", "votes", "votesP");
            currentCast[i].lipstick.votes++;
            currentCast[i].voteHerstory.push(currentCast[i].lipstick.getName());
            if (randomNumber(100) >= 90) {
                modRelation(2, 4, currentCast[i], currentCast[i].lipstick);
                screen.createBold("<i>" + currentCast[i].lipstick.getName() + " felt very upset.</i>", "votes", "votesP");
            } else {
                modRelation(2, 3, currentCast[i], currentCast[i].lipstick);
                screen.createBold("<i>" + currentCast[i].lipstick.getName() + " took it great, they weren't too mad.</i>","votes", "votesP");
            }
        }
    }
    for (let i = 0; i < eliminatedCast.length; i++) {
        eliminatedCast[i].voteHerstory.push('');
    }
    let votesToDiv = document.querySelectorAll("p#votesP");
    for (let i = 0; i < votesToDiv.length; i++){
        div.appendChild(votesToDiv[i]);
    }
    main.appendChild(div);
    screen.createButton("Show lipsticks", "showvotes()", "showvotes");
    screen.createHorizontalLine();
    let add2chart = "";
    for (let i = 0; i < bottomQueens.length; i++) {
        screen.createImage(bottomQueens[i].image, "red");
        screen.createBold(bottomQueens[i].getName() + ": " + bottomQueens[i].votes.toString() + " votes", "total", "totalP");
        add2chart += bottomQueens[i].votes + ": " + bottomQueens[i].getName() + "<br>";
    }
    votesTotal4Chart.push(add2chart);
    let resultVotes = document.querySelectorAll("p#totalP");
    for (let i = 0; i < resultVotes.length; i++){
        resultVotes[i].setAttribute("hidden", "hidden");
    }
    bottomQueens.sort((a, b) => b.votes - a.votes);
    let br = document.createElement("br");
    main.appendChild(br);
    screen.createButton("Proceed", "lsaLipsyncDesc()");
}
let mismovoto = false;
function showvotes() {
    let button = document.querySelector("button#showvotes");
    let div = document.querySelector("div#votes");
    button.remove();
    if (lipsync_assassin){
        let winV = document.querySelectorAll("p#winVP");
        if (currentCast.length <= 5){
            let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
            imageVoted.removeAttribute("hidden");
        }else{
            let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[2];
            imageVoted.removeAttribute("hidden");
        }
        for (let i = 0; i < winV.length; i++) {
            winV[i].removeAttribute("hidden");
        }
        div.removeAttribute("hidden");
        let resultVotes = document.querySelectorAll("p#totalP");
        for (let i = 0; i < resultVotes.length; i++){
            resultVotes[i].removeAttribute("hidden");
        }
    }else if (all_stars){
        let winV = document.querySelectorAll("p#winVP");
        for (let i = 0; i < winV.length; i++){
            winV[i].removeAttribute("hidden");
        }
        div.removeAttribute("hidden");
        if (mismovoto == true){
            let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
            imageVoted.removeAttribute("hidden");
            let imageVotedd = document.querySelectorAll("img[src='" + top2[1].lipstick.image +"']")[2];
            imageVotedd.removeAttribute("hidden");
        }else{
            let imageVoted = document.querySelectorAll("img[src='" + top2[0].lipstick.image +"']")[1];
            imageVoted.removeAttribute("hidden");
            let imageVotedd = document.querySelectorAll("img[src='" + top2[1].lipstick.image +"']")[1];
            imageVotedd.removeAttribute("hidden");
        }
    }
    
}
let threestars = false;
let flagThree = false;
let gs = false;
let gsFlag = false;
function top2AndBlocked() {
    gs = false;
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Bring back my winners!");
    screen.createBold("Ladies, I've made some decisions...");
    document.body.style.backgroundImage = "url('image/stage.webp')";
    if (randomNumber(100) >= 98) {gs = true;}
    if (gs || (episodeCount == 5 && !gsFlag)) {
        gs = true;
        gsFlag = true;
        screen.createImage("image/star.webp", "gold");
        screen.createBold("This week the top 2 will give away a star to one of them fellow contestants...");
    }
    if ((episodeCount == 11 && episodeChallenges[10] == "Talent Show") || (episodeCount == 14 && episodeChallenges[13] == "Talent Show") && !flagThree) {
        screen.createImage("image/star.webp", "gold");
        screen.createBold("This week the top 2 will get 3 stars instead of 1...");
        threestars = true;
    }
    //sort the top queens now taking runway and favoritism in consideration:
    if (riggory) {
        for (let i = 0; i < topQueens.length; i++) {
            topQueens[i].performanceScore -= (topQueens[i].runwayScore);
        }
    } else {
        for (let i = 0; i < topQueens.length; i++)
            topQueens[i].performanceScore -= (topQueens[i].runwayScore - topQueens[i].favoritism);
    }
    topQueens.sort((a, b) => (a.performanceScore - b.performanceScore));
    top2.push(topQueens[0]);
    top2.push(topQueens[1]);
    topQueens.splice(0, 2);
    screen.createImage(top2[0].image, "cyan");
    screen.createImage(top2[1].image, "cyan");
    screen.createBold(top2[0].getName() + ", " + top2[1].getName() + ", condragulations, you're the Top 2 of the week!");
    for (let i = 0; i < topQueens.length; i++)
        screen.createImage(topQueens[i].image, "lightblue");
    screen.createParagraph("", "highs");
    let highs = document.querySelector("p#highs");
    for (let i = 0; i < topQueens.length; i++) {
        highs.innerHTML += topQueens[i].getName() + ", ";
        topQueens[i].addToTrackRecord("HIGH");
        topQueens[i].favoritism += 1;
        topQueens[i].ppe += 4;
        blockQueens.push(topQueens[i]);
    }
    if (topQueens.length > 0)
        highs.innerHTML += "good work this week, you're safe.";
    screen.createHorizontalLine();
    if (top2[0].blocked == true && top2[1].blocked == true) {
        screen.createImage(top2[0].image, "red");
        screen.createImage(top2[1].image, "red");
        screen.createBold(top2[0].getName() + " and " + top2[1].getName() + " will not recieve a star because they are blocked.");
    }
    if (top2[0].blocked == true && top2[1].blocked == false) {
        screen.createImage(top2[0].image, "red");
        screen.createImage(top2[1].image, "pink");
        screen.createBold(top2[0].getName() + " will not recieve a star because they are blocked. While " + top2[1].getName() + " does get a star!");
        if (threestars && !flagThree) {
            top2[1].stars += 3;
            flagThree = true;
        } else {
            top2[1].stars++;
        }
    }
    if (top2[0].blocked == false && top2[1].blocked == true) {
        screen.createImage(top2[1].image, "red");
        screen.createImage(top2[0].image, "pink");
        screen.createBold(top2[1].getName() + " will not recieve a star because they are blocked. While " + top2[0].getName() + " does get a star!");
        if (threestars && !flagThree) {
            top2[0].stars += 3;
            flagThree = true;
        } else {
            top2[0].stars++;
        }
    }
    if (top2[0].blocked == false && top2[1].blocked == false) {
        screen.createImage(top2[0].image, "pink");
        screen.createImage(top2[1].image, "pink");
        screen.createBold(top2[0].getName() + " and " + top2[1].getName() +" will recieve a star!");
        if (threestars && !flagThree) {
            top2[0].stars += 3;
            top2[1].stars += 3;
            flagThree = true;
        } else {
            top2[0].stars++;
            top2[1].stars++;
        }
    }
    screen.createHorizontalLine();
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].blocked = false;
        if (top2.indexOf(currentCast[i]) == -1)
            up2Block.push(currentCast[i]);
    }
    screen.createButton("Proceed", "awLipsync()");
}
let disqOrDept = false;
let disqOrDeptFlag = false;
function lipSync() {
    let screen = new Scene();
    screen.clean();
    bottomQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    screen.createHeader("I've made my decision.");
    let score1 = bottomQueens[0].lipsyncScore - bottomQueens[0].favoritism + bottomQueens[0].unfavoritism;
    let score2 = bottomQueens[1].lipsyncScore - bottomQueens[1].favoritism + bottomQueens[1].unfavoritism;
    if (thirdqueen && currentCast.length > 5) {
        thirdqueen = false;
        if (score1 > 5 && score2 > 5 && randomNumber(100) <= 50 && noDouble == false && currentCast.length > 5) {
            screen.createImage(bottomQueens[0].image, "tomato");
            screen.createBold(bottomQueens[0].getName() + ", shantay you stay.");
            screen.createImage(bottomQueens[1].image, "tomato");
            screen.createBold(bottomQueens[1].getName() + ", shantay you stay.");
            bottomQueens[0].addToTrackRecord("BTM3");
            bottomQueens[0].unfavoritism += 3;
            bottomQueens[0].ppe += 1;
            bottomQueens[1].addToTrackRecord("BTM3");
            bottomQueens[1].unfavoritism += 3;
            bottomQueens[1].ppe += 1;
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(bottomQueens[2].getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(bottomQueens[2]) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[2].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[2].addToTrackRecord("CHOC");
                    bottomQueens[2].unfavoritism += 3;
                    bottomQueens[2].ppe += 1;
                    chocolateBarTwistCheck = true;
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[2].getName() + ", sashay away...");
                    bottomQueens[2].addToTrackRecord("ELIM");
                    bottomQueens[2].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[2]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[2]), 1);
                }
            } else {
                screen.createImage(bottomQueens[2].image, "red");
                screen.createBold(bottomQueens[2].getName() + ", sashay away...");
                bottomQueens[2].addToTrackRecord("ELIM");
                bottomQueens[2].unfavoritism += 5;
                eliminatedCast.unshift(bottomQueens[2]);
                currentCast.splice(currentCast.indexOf(bottomQueens[2]), 1);
            }
        } else {
            screen.createImage(bottomQueens[0].image, "tomato");
            screen.createBold(bottomQueens[0].getName() + ", shantay you stay.");
            bottomQueens[0].addToTrackRecord("BTM3");
            bottomQueens[0].unfavoritism += 3;
            bottomQueens[0].ppe += 1;
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold("Neither one of you survived that lipsync..." + bottomQueens[1].getName() + ", " + bottomQueens[2].getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(bottomQueens[1], bottomQueens[2]) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[2].getName() + ", sashay away...");
                    bottomQueens[2].addToTrackRecord("ELIM");
                    bottomQueens[2].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[2]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[2]), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[1].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[1].addToTrackRecord("CHOC");
                    bottomQueens[1].unfavoritism += 3;
                    bottomQueens[1].ppe += 1;
                    chocolateBarTwistCheck = true;
                } else if (chocolateBarCheck(bottomQueens[1], bottomQueens[2]) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                    bottomQueens[1].addToTrackRecord("ELIM");
                    bottomQueens[1].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[1]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[2].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[2].addToTrackRecord("CHOC");
                    bottomQueens[2].unfavoritism += 3;
                    bottomQueens[2].ppe += 1;
                    chocolateBarTwistCheck = true;
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                    bottomQueens[1].addToTrackRecord(" ELIM ");
                    bottomQueens[1].unfavoritism += 5;
                    bottomQueens[1].rankP = "tie1";
                    eliminatedCast.unshift(bottomQueens[1]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[2].getName() + ", sashay away...");
                    bottomQueens[2].addToTrackRecord(" ELIM ");
                    bottomQueens[2].unfavoritism += 5;
                    bottomQueens[2].rankP = "tie2";
                    eliminatedCast.unshift(bottomQueens[2]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[2]), 1);
                    doubleSashay = true;
                }
            } else {
                screen.createImage(bottomQueens[1].image, "red");
                screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                screen.createImage(bottomQueens[2].image, "red");
                screen.createBold(bottomQueens[2].getName() + ", sashay away...");
                bottomQueens[1].addToTrackRecord(" ELIM ");
                bottomQueens[1].unfavoritism += 5;
                bottomQueens[1].rankP = "tie1";
                bottomQueens[2].addToTrackRecord(" ELIM ");
                bottomQueens[2].unfavoritism += 5;
                bottomQueens[2].rankP = "tie2";
                eliminatedCast.unshift(bottomQueens[1]);
                currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                eliminatedCast.unshift(bottomQueens[2]);
                currentCast.splice(currentCast.indexOf(bottomQueens[2]), 1);
            }
        }
    } else {
        if (score1 > 7 && score2 > 7 && randomNumber(100) <= 50 && !doubleShantay && !noDouble && currentCast.length > 5) {
            if (randomNumber(100) >= 95) {
                screen.createImage(bottomQueens[0].image, "tomato");
                screen.createBold(bottomQueens[0].getName() + ", shantay you stay.");
                screen.createImage(bottomQueens[1].image, "red");
                screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                screen.createImage(bottomQueens[1].image, "pink");
                screen.createBold("WAIT!!, wait, " + bottomQueens[1].getName() + ", I'm not ready for you to go home... shantay you stay.");
                bottomQueens[0].addToTrackRecord(" BTM2");
                bottomQueens[0].unfavoritism += 3;
                bottomQueens[0].ppe += 1;
                bottomQueens[1].addToTrackRecord(" BTM2");
                bottomQueens[1].unfavoritism += 3;
                bottomQueens[1].ppe += 1;
                doubleShantay = true;
            } else {
                screen.createImage(bottomQueens[0].image, "magenta");
                screen.createImage(bottomQueens[1].image, "magenta");
                screen.createBold("Condragulations, shantay you both stay!!");
                bottomQueens[0].addToTrackRecord(" BTM2");
                bottomQueens[0].unfavoritism += 3;
                bottomQueens[0].ppe += 1;
                bottomQueens[1].addToTrackRecord(" BTM2");
                bottomQueens[1].unfavoritism += 3;
                bottomQueens[1].ppe += 1;
                doubleShantay = true;
            }
        }
        else if (score1 < 3 && score2 < 3 && randomNumber(100) <= 10 && !doubleSashay && currentCast.length > 6 && noDouble == false) {
            screen.createImage(bottomQueens[0].image, "darkred");
            screen.createImage(bottomQueens[1].image, "darkred");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold("Neither one of you survived that lipsync..." + bottomQueens[0].getName() + ", " + bottomQueens[1].getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(bottomQueens[0], bottomQueens[1]) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                    bottomQueens[1].addToTrackRecord("ELIM");
                    bottomQueens[1].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[1]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[0].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[0].addToTrackRecord("CHOC");
                    bottomQueens[0].unfavoritism += 3;
                    bottomQueens[0].ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else if (chocolateBarCheck(bottomQueens[0], bottomQueens[1]) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[0].getName() + ", sashay away...");
                    bottomQueens[0].addToTrackRecord("ELIM");
                    bottomQueens[0].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[0]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[0]), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[1].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[1].addToTrackRecord("CHOC");
                    bottomQueens[1].unfavoritism += 3;
                    bottomQueens[1].ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[0].getName() + ", sashay away...");
                    bottomQueens[0].addToTrackRecord(" ELIM ");
                    bottomQueens[0].unfavoritism += 5;
                    bottomQueens[0].rankP = "tie1";
                    eliminatedCast.unshift(bottomQueens[0]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[0]), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                    bottomQueens[1].addToTrackRecord(" ELIM ");
                    bottomQueens[1].unfavoritism += 5;
                    bottomQueens[1].rankP = "tie2";
                    eliminatedCast.unshift(bottomQueens[1]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                    doubleSashay = true;
                }
            } else {
                screen.createBold("I'm sorry but none of you showed the fire it takes to stay. You must both... sashay away.");
                doubleSashay = true;
                bottomQueens[0].addToTrackRecord(" ELIM ");
                bottomQueens[0].unfavoritism += 5;
                bottomQueens[0].rankP = "tie1";
                eliminatedCast.unshift(bottomQueens[0]);
                currentCast.splice(currentCast.indexOf(bottomQueens[0]), 1);
                bottomQueens[1].addToTrackRecord(" ELIM ");
                bottomQueens[1].unfavoritism += 5;
                bottomQueens[1].rankP = "tie2";
                eliminatedCast.unshift(bottomQueens[1]);
                currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
            }
        }
        else if (randomNumber(1000) >= 999 && disqOrDept == false) {
            let quitterQueen = pickRandomlyFromArray(bottomQueens);
            screen.createImage(quitterQueen.image, "red");
            screen.createBold(quitterQueen.getName() + ", shockingly has left the runway, they decided that they won't lipsync.");
            if (quitterQueen.getName() == bottomQueens[0].getName()) {
                bottomQueens[0].addToTrackRecord("QUIT");
                bottomQueens[0].unfavoritism += 5;
                bottomQueens[0].QueenDisqOrDept = true;
                bottomQueens[1].addToTrackRecord("BTM2");
                bottomQueens[1].unfavoritism += 3;
                bottomQueens[1].ppe += 1;
            } else {
                bottomQueens[0].addToTrackRecord("BTM2");
                bottomQueens[0].unfavoritism += 3;
                bottomQueens[0].ppe += 1;
                bottomQueens[1].addToTrackRecord("QUIT");
                bottomQueens[1].unfavoritism += 5;
                bottomQueens[1].QueenDisqOrDept = true;
            }
            eliminatedCast.unshift(quitterQueen);
            currentCast.splice(currentCast.indexOf(quitterQueen), 1);
            disqOrDept = true;
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                if (chocolateBarCheck(quitterQueen) == true) {
                    chocolateBarTwistCheck = true;
                }
            }
        }
        else if (randomNumber(1000) >= 999 && disqOrDept == false) {
            let disqualifiedQueen = pickRandomlyFromArray(currentCast);
            screen.createImage(disqualifiedQueen.image, "red");
            screen.createBold(disqualifiedQueen.getName() + ", it has come to my attention that you have broken the rules of this competition. I must ask you to sashay away.");
            if (disqualifiedQueen.getName() == bottomQueens[0].getName()) {
                bottomQueens[1].addToTrackRecord("BTM2");
            } else if (disqualifiedQueen.getName() == bottomQueens[1].getName()) {
                bottomQueens[0].addToTrackRecord("BTM2");
            }else {
                bottomQueens[0].addToTrackRecord(" BTM2");
                bottomQueens[1].addToTrackRecord(" BTM2");
                disqualifiedQueen.trackRecord.pop();
            }
            bottomQueens[0].unfavoritism += 3;
            bottomQueens[0].ppe += 1;
            bottomQueens[1].unfavoritism += 3;
            bottomQueens[1].ppe += 1;
            disqualifiedQueen.addToTrackRecord("DISQ");
            disqualifiedQueen.QueenDisqOrDept = true;
            eliminatedCast.unshift(disqualifiedQueen);
            currentCast.splice(currentCast.indexOf(disqualifiedQueen), 1);
            disqOrDept = true;
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                if (chocolateBarCheck(disqualifiedQueen) == true) {
                    chocolateBarTwistCheck = true;
                }
            }
        }
        else if (randomNumber(1000) >= 999 && disqOrDept == false) {
            let injuredQueen = pickRandomlyFromArray(currentCast);
            screen.createImage(injuredQueen.image, "red");
            screen.createBold(injuredQueen.getName() + ", would you please step forward.");
            screen.createBold("We've been in touch with the doctor. You need time to heal. I cannot allow you to continue in the competition.");
            screen.createBold("I must ask you to sashay away.");
            if (injuredQueen.getName() == bottomQueens[0].getName()) {
                bottomQueens[1].addToTrackRecord("BTM2");
            } else if (injuredQueen.getName() == bottomQueens[1].getName()) {
                bottomQueens[0].addToTrackRecord("BTM2");
            }else {
                bottomQueens[0].addToTrackRecord(" BTM2");
                bottomQueens[1].addToTrackRecord(" BTM2");
                injuredQueen.trackRecord.pop();
            }
            bottomQueens[0].unfavoritism += 3;
            bottomQueens[0].ppe += 1;
            bottomQueens[1].unfavoritism += 3;
            bottomQueens[1].ppe += 1;
            injuredQueen.addToTrackRecord("DEPT");
            injuredQueen.QueenDisqOrDept = true;
            eliminatedCast.unshift(injuredQueen);
            currentCast.splice(currentCast.indexOf(injuredQueen), 1);
            disqOrDept = true;
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                if (chocolateBarCheck(injuredQueen) == true) {
                    chocolateBarTwistCheck = true;
                }
            }
        } else {
            screen.createImage(bottomQueens[0].image, "tomato");
            screen.createBold(bottomQueens[0].getName() + ", shantay you stay.");
            bottomQueens[0].addToTrackRecord("BTM2");
            bottomQueens[0].unfavoritism += 3;
            bottomQueens[0].ppe += 1;
            screen.createImage(bottomQueens[1].image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(bottomQueens[1].getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(bottomQueens[1]) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(bottomQueens[1].getName() + "!! Condragulations, you are safe to slay another day!");
                    bottomQueens[1].addToTrackRecord("CHOC");
                    bottomQueens[1].unfavoritism += 3;
                    bottomQueens[1].ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                    bottomQueens[1].addToTrackRecord("ELIM");
                    bottomQueens[1].unfavoritism += 5;
                    eliminatedCast.unshift(bottomQueens[1]);
                    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
                    
                }
            } else {
                screen.createBold(bottomQueens[1].getName() + ", sashay away...");
                bottomQueens[1].addToTrackRecord("ELIM");
                bottomQueens[1].unfavoritism += 5;
                eliminatedCast.unshift(bottomQueens[1]);
                currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
            }
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens[i].maxiT == true) {
            bottomQueens[i].trackRecord[bottomQueens[i].trackRecord.length - 2] += bottomQueens[i].trackRecord[bottomQueens[i].trackRecord.length - 1];
            bottomQueens[i].trackRecord.splice([bottomQueens[i].trackRecord.length - 1], 1);
            bottomQueens[i].maxiT = false;
        }
    }
    if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) == true && premiereCounter < 3)
        screen.createButton("Proceed", "doublePremiere()");
    else if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "untucked()");
}
function teamLipSync() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Ladies, I've made my decision...");
    screen.createImage(bottomQueens[0].lipsyncQueen.image, "pink");
    screen.createBold(bottomQueens[0].lipsyncQueen.getName() + ", shantay you stay.");
    screen.createImage(bottomQueens[1].lipsyncQueen.image, "red");
    screen.createBold(bottomQueens[1].lipsyncQueen.getName() + ", you will always be an All Star, now, sashay away...");
    if (bottomQueens[0].lipsyncQueen.getName() == bottomQueens[0].QueenA.getName()) {
        bottomQueens[0].QueenA.addToTrackRecord("BTM2 ");
        bottomQueens[0].QueenB.addToTrackRecord("BTM2");
    } else {
        bottomQueens[0].QueenA.addToTrackRecord("BTM2");
        bottomQueens[0].QueenB.addToTrackRecord("BTM2 ");
    }
    bottomQueens[0].addToTrackRecord("BTM2");
    bottomQueens[0].unfavoritism += 3;
    bottomQueens[0].ppe += 1;
    bottomQueens[0].QueenA.unfavoritism += 3;
    bottomQueens[0].QueenB.unfavoritism += 3;
    bottomQueens[0].QueenA.ppe += 1;
    bottomQueens[0].QueenB.ppe += 1;
    if (bottomQueens[1].lipsyncQueen.getName() == bottomQueens[1].QueenA.getName()) {
        bottomQueens[1].QueenA.addToTrackRecord("ELIM");
        bottomQueens[1].QueenB.addToTrackRecord("ELIM ");
        bottomQueens[1].QueenA.rankP = "tie1";
        bottomQueens[1].QueenB.rankP = "tie2";
    } else {
        bottomQueens[1].QueenA.addToTrackRecord("ELIM ");
        bottomQueens[1].QueenB.addToTrackRecord("ELIM");
        bottomQueens[1].QueenA.rankP = "tie1";
        bottomQueens[1].QueenB.rankP = "tie2";
    }
    bottomQueens[1].unfavoritism += 5;
    bottomQueens[1].QueenA.unfavoritism += 5;
    bottomQueens[1].QueenB.unfavoritism += 5;
    eliminatedCast.unshift(bottomQueens[1].QueenA);
    eliminatedCast.unshift(bottomQueens[1].QueenB);
    currentCast.splice(currentCast.indexOf(bottomQueens[1]), 1);
    if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "newEpisode()");
}
function asLipSync() {
    let screen = new Scene();
    screen.clean();
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    let btm3Flag = false;
    screen.createHeader("Ladies, I've made my decision...");
    if (top2[0].lipsyncScore == top2[1].lipsyncScore && top2[0].lipsyncScore > 6 && top2[1].lipsyncScore > 6 && currentCast.length > 6 && !noDouble) {
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[0].addToTrackRecord(" WIN");
        top2[1].addToTrackRecord(" WIN");
        screen.createHorizontalLine();
        assasintable.push(top2[0].getName() + " & " + top2[1].getName());
        assasintable.push(" ");
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(top2[0], top2[1]);
            conjoinedCheck = false;
        }
        if (top2[0].lipstick == top2[1].lipstick) {
            assasinlipstick.push(top2[0].lipstick.getName());
            assasinlipstick.push(" ");
            screen.createImage(top2[0].lipstick.image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(top2[0].lipstick) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
            }
        }
        else {
            screen.createImage(top2[0].lipstick.image, "red");
            screen.createImage(top2[1].lipstick.image, "red");
            assasinlipstick.push(top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName());
            assasinlipstick.push(" ");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", " + top2[1].lipstick.getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    chocolateBarTwistCheck = true;
                    
                } else if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[1].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[1].lipstick.addToTrackRecord("CHOC");
                    top2[1].lipstick.unfavoritism += 3;
                    top2[1].lipstick.ppe += 1;
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord(" ELIM ");
                    top2[0].lipstick.unfavoritism += 5;
                    top2[0].lipstick.rankP = "tie1";
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord(" ELIM ");
                    top2[1].lipstick.unfavoritism += 5;
                    top2[1].lipstick.rankP = "tie2";
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    doubleSashay = true;
                    btm3Flag = true;
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord(" ELIM ");
                top2[0].lipstick.unfavoritism += 5;
                top2[0].lipstick.rankP = "tie1";
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                top2[1].lipstick.addToTrackRecord(" ELIM ");
                top2[1].lipstick.unfavoritism += 5;
                top2[1].lipstick.rankP = "tie2";
                eliminatedCast.unshift(top2[1].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                doubleSashay = true;
                btm3Flag = true;
            }
        }
    }
    else if (randomNumber(1000) >= 995 && disqOrDept == false && currentCast.length > 6 && !smackdown) {
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(top2[0]);
            conjoinedCheck = false;
        }
        screen.createImage(top2[1].image, "cyan");
        screen.createParagraph(top2[1].getName() + ", you are safe.");
        screen.createHorizontalLine();
        screen.createImage(top2[0].image, "#5920d4");
        screen.createBold("Ru, I'm going home.");
        screen.createBold(top2[0].getName() + ", you will always be an All Star, now, sashay away...");
        top2[0].addToTrackRecord("WIN+QUIT");
        top2[0].QueenDisqOrDept = true;
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[1].addToTrackRecord("WIN ");
        top2[1].favoritism += 4;
        top2[1].ppe += 5;
        eliminatedCast.unshift(top2[0]);
        currentCast.splice(currentCast.indexOf(top2[0]), 1);
        disqOrDept = true;
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            if (chocolateBarCheck(top2[0]) == true) {
                chocolateBarTwistCheck = true;
            }
        }
        assasintable.push(top2[0].getName());
        assasinlipstick.push(top2[0].getName());
        assasintable.push(top2[1].getName());
        assasinlipstick.push(top2[1].lipstick.getName());
    }
    else {
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].addToTrackRecord("WIN");
        if (immunityTwist && giveImmunity()) {
            top2[0].immune = true;
            top2[0].immuneEp.push(episodeCount);
            screen.createImage(top2[0].image, "royalblue");
            screen.createBold(top2[0].getName() + ", you're a winner, baby! You have also earned immunity for next week's challenge.");
        } else {
            screen.createImage(top2[0].image, "royalblue");
            screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        }
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(top2[0]);
            conjoinedCheck = false;
        }
        top2[1].addToTrackRecord("WIN ");
        top2[1].favoritism += 4;
        top2[1].ppe += 5;
        assasintable.push(top2[0].getName());
        assasinlipstick.push(top2[0].lipstick.getName());
        assasintable.push(top2[1].getName());
        assasinlipstick.push(top2[1].lipstick.getName());
        screen.createImage(top2[1].image, "cyan");
        screen.createParagraph(top2[1].getName() + ", you are safe.");
        screen.createHorizontalLine();
        screen.createImage(top2[0].lipstick.image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(top2[0].lipstick) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                top2[0].lipstick.addToTrackRecord("CHOC");
                top2[0].lipstick.unfavoritism += 3;
                top2[0].lipstick.ppe += 1;
                chocolateBarTwistCheck = true;
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                
            }
        } else {
            screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");
            top2[0].lipstick.addToTrackRecord("ELIM");
            top2[0].lipstick.unfavoritism += 5;
            eliminatedCast.unshift(top2[0].lipstick);
            bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens.length == 3 && !disqOrDept || bottomQueens.length == 3 && disqOrDeptFlag)
            bottomQueens[i].addToTrackRecord("BTM4");
        else if (bottomQueens.length == 2 && !disqOrDept || bottomQueens.length == 2 && disqOrDeptFlag || bottomQueens.length == 2 && currentCast.length == 4 || bottomQueens.length == 1 && btm3Flag)
            bottomQueens[i].addToTrackRecord("BTM3");
        else if (disqOrDept && bottomQueens.length == 2 && !disqOrDeptFlag) {
            bottomQueens[i].addToTrackRecord(" BTM2");
            if (i == bottomQueens.length - 1) {
                disqOrDeptFlag = true;
            }
        }
        else if (disqOrDept && bottomQueens.length == 3 && !disqOrDeptFlag) {
            bottomQueens[i].addToTrackRecord(" BTM3");
            if (i == bottomQueens.length - 1) {
                disqOrDeptFlag = true;
            }
        }
        else
            bottomQueens[i].addToTrackRecord("BTM2");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) == true && premiereCounter < 3)
        screen.createButton("Proceed", "doublePremiere()");
    else if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "untucked()");
}
let assasintable = [];
let assasinlipstick = [];
function lsaLipSync() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    let backToWinner = false;
    if (bottomQueens[0].votes == bottomQueens[1].votes) {
        backToWinner = true;
        for (let i = 0; i < bottomQueens.length; i++) {
            if (top2[0].lipstick.getName() == bottomQueens[i].getName()) {
                assassin.lipstick = bottomQueens[i];
            }
        }
    } else {
        assassin.lipstick = bottomQueens[0];
    }
    if (top2[0] != assassin) {
        top2[0].voteHerstory.push(top2[0].lipstick.getName());
    } else {
        top2[1].voteHerstory.push(top2[1].lipstick.getName());
    }
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    if (top2[0].lipsyncScore >= top2[1].lipsyncScore && top2[0].lipsyncScore > 7 && top2[1].lipsyncScore > 7 && currentCast.length > 6 && !noDouble && !doubleSashay) {
        backToWinner = false;
        decidingVote4Chart.push();
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[0].addToTrackRecord(" WIN");
        top2[1].addToTrackRecord(" WIN");
        screen.createHorizontalLine();
        assasintable.push(top2[0].getName() + " & " + top2[1].getName());
        assasintable.push(" ");
        if (top2[0] != assassin) {
            decidingVote4Chart.push("<b>" + top2[0].getName() + "</b> & The Group");
        } else {
            decidingVote4Chart.push("<b>" + top2[1].getName() + "</b> & The Group");
        }
        if (conjoinedQueens && conjoinedCheck){
            conjoinedReturn(top2[0], top2[1]);
            conjoinedCheck = false;
        }
        if (top2[0].lipstick == top2[1].lipstick) {
            assasinlipstick.push(top2[0].lipstick.getName());
            assasinlipstick.push(" ");
            elimKween4Chart.push({text: "<b>" + top2[0].lipstick.getName(), type: 3});
            screen.createImage(top2[0].lipstick.image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(top2[0].lipstick) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
            }
        } else {
            screen.createImage(top2[0].lipstick.image, "red");
            screen.createImage(top2[1].lipstick.image, "red");
            assasinlipstick.push(top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName());
            assasinlipstick.push(" ");
            elimKween4Chart.push({text: "<b>" + top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName(), type: 3});
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", " + top2[1].lipstick.getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    chocolateBarTwistCheck = true;
                } else if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[1].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[1].lipstick.addToTrackRecord("CHOC");
                    top2[1].lipstick.unfavoritism += 3;
                    top2[1].lipstick.ppe += 1;
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    chocolateBarTwistCheck = true;
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord(" ELIM ");
                    top2[0].lipstick.unfavoritism += 5;
                    top2[0].lipstick.rankP = "tie1";
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord(" ELIM ");
                    top2[1].lipstick.unfavoritism += 5;
                    top2[1].lipstick.rankP = "tie2";
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    doubleSashay = true;
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord(" ELIM ");
                top2[0].lipstick.unfavoritism += 5;
                top2[0].lipstick.rankP = "tie1";
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                top2[1].lipstick.addToTrackRecord(" ELIM ");
                top2[1].lipstick.unfavoritism += 5;
                top2[1].lipstick.rankP = "tie2";
                eliminatedCast.unshift(top2[1].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                doubleSashay = true;
            }
        }
    } else {
        screen.createImage(top2[0].image, "darkblue");
        screen.createBold(top2[0].getName() + ", you're a winner baby!");
        if (top2[0] == assassin) {
            screen.createImage(top2[1].image, "cyan");
            screen.createParagraph(top2[1].getName() + ", you're safe.");
            top2[1].addToTrackRecord("WIN ");
            top2[1].favoritism += 5;
            top2[1].ppe += 5;
            assasintable.push(top2[0].getName());
            assasinlipstick.push(top2[0].lipstick.getName());
            assasintable.push(top2[1].getName());
            assasinlipstick.push(top2[1].lipstick.getName());
            decidingVote4Chart.push("The Group");
            elimKween4Chart.push({text: "<b>" + top2[0].lipstick.getName(), type: 1});
        }
        else {
            screen.createImage(top2[1].image, "cyan");
            screen.createParagraph(top2[1].getName() + ", thanks for participating.");
            top2[0].addToTrackRecord("WIN");
            top2[0].favoritism += 5;
            top2[0].ppe += 5;
            assasintable.push(top2[0].getName());
            assasinlipstick.push(top2[0].lipstick.getName());
            assasintable.push(top2[1].getName());
            assasinlipstick.push(top2[1].lipstick.getName());
            decidingVote4Chart.push(top2[0].getName());
            elimKween4Chart.push({text: "<b>" + top2[0].lipstick.getName(), type: 4});
        }
        if (backToWinner && top2[0].getName() == assassin.getName()) {
            screen.createBold("As there was a tie in the voting, the power returns to the challenge winner!");
            top2[1].editTrackRecord("TIE");
            decidingVote4Chart[decidingVote4Chart.length - 1] = "The Group & " + top2[1].getName();
            elimKween4Chart[elimKween4Chart.length - 1] = {text: "<b>" + top2[0].lipstick.getName(), type: 2};
        }
        allQueens.splice(allQueens.indexOf(assassin), 1);
        screen.createHorizontalLine();
        screen.createImage(top2[0].lipstick.image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(top2[0].lipstick) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                top2[0].lipstick.addToTrackRecord("CHOC");
                top2[0].lipstick.unfavoritism += 3;
                top2[0].lipstick.ppe += 1;
                top2[0].lipstick.votes = 0;
                chocolateBarTwistCheck = true;
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                top2[0].lipstick.votes = 0;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                
            }
        } else {
            screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");
            top2[0].lipstick.addToTrackRecord("ELIM");
            top2[0].lipstick.unfavoritism += 5;
            top2[0].lipstick.votes = 0;
            eliminatedCast.unshift(top2[0].lipstick);
            bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1); 
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens.length == 4)
            bottomQueens[i].addToTrackRecord("BTM5");
        else if (bottomQueens.length == 3)
            bottomQueens[i].addToTrackRecord("BTM4");
        else if (bottomQueens.length == 2)
            bottomQueens[i].addToTrackRecord("BTM3");
        else
            bottomQueens[i].addToTrackRecord("BTM2");
        bottomQueens[i].unfavoritism += 2;
        bottomQueens[i].ppe += 1;
        bottomQueens[i].votes = 0;
    }
    if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) == true && premiereCounter < 3)
        screen.createButton("Proceed", "doublePremiere()");
    else if (CheckForReturning() == true)
        screen.createButton("Proceed", "returningQueenScreen()");
    else
        screen.createButton("Proceed", "untucked()");
}
let dragBlocked;
let dragGive;
function awLipsync() {
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your legacy! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Proceed", "awLipsyncJudging(gs)");
}
function awLipsyncJudging(giveAway) {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    if (top2[0].lipsyncScore >= top2[1].lipsyncScore && top2[0].lipsyncScore > 7 && top2[1].lipsyncScore > 7 && currentCast.length > 5) {
        dragBlocked = worstSister(top2[0], blockQueens);
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[0].addToTrackRecord(" WIN");
        top2[1].addToTrackRecord(" WIN");
        screen.createHorizontalLine();
        if (episodeCount == 10 && currentCast.length <= 10 || episodeCount == 11 && currentCast.length <= 10 || episodeCount == 13 && currentCast.length > 10 || episodeCount == 14 && currentCast.length > 10) {
            screen.createBold("No one is getting blocked tonight!");
        } else {
            screen.createImage(top2[0].image, "darkblue");
            screen.createImage(dragBlocked.image, "red");
            screen.createBold(top2[0].getName() + " has given the platinum plunger to... " + dragBlocked.getName());
            dragBlocked.blocked = true;
            dragBlocked.editTrackRecord("+BLOCKED");
            if (randomNumber(100) >= 80) {
                modRelation(2, 4, top2[0], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " felt very upset. </i>");
            } else {
                modRelation(2, 3, top2[0], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " took it great, they weren't too mad.</i>");
            }
            dragBlocked = worstSister(top2[1], blockQueens);
            screen.createImage(top2[1].image, "darkblue");
            screen.createImage(dragBlocked.image, "red");
            screen.createBold(top2[1].getName() + " has given the platinum plunger to... " + dragBlocked.getName());
            dragBlocked.blocked = true;
            dragBlocked.editTrackRecord("+BLOCKED");
            if (randomNumber(100) >= 80) {
                modRelation(2, 4, top2[1], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " felt very upset.</i>");
            } else {
                modRelation(2, 3, top2[1], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " took it great, they weren't too mad.</i>");
            }
        }
    } else {
        dragBlocked = worstSister(top2[0], blockQueens);
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].addToTrackRecord("WIN");
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        top2[1].addToTrackRecord("WIN ");
        top2[1].favoritism += 4;
        top2[1].ppe += 5;
        screen.createImage(top2[1].image, "cyan");
        screen.createParagraph(top2[1].getName() + ", you are safe.");
        screen.createHorizontalLine();
        if (episodeCount == 10 && currentCast.length <= 10 || episodeCount == 11 && currentCast.length <= 10 || episodeCount == 13 && currentCast.length > 10 || episodeCount == 14 && currentCast.length > 10) {
            screen.createBold("No one is getting blocked tonight!");
        } else {
            screen.createImage(top2[0].image, "darkblue");
            screen.createImage(dragBlocked.image, "red");
            screen.createBold(top2[0].getName() + " has given the platinum plunger to... " + dragBlocked.getName());
            dragBlocked.blocked = true;
            dragBlocked.editTrackRecord("+BLOCKED");
            if (randomNumber(100) >= 80) {
                modRelation(2, 4, top2[0], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " felt very upset.</i>");
            } else {
                modRelation(2, 3, top2[0], dragBlocked);
                screen.createBold("<i>" + dragBlocked.getName() + " took it great, they weren't too mad.</i>");
            }
        }
    }
    if (giveAway) {
        dragGive = bestSister(top2[0], blockQueens);
        screen.createHorizontalLine();
        screen.createImage(top2[0].image, "deepskyblue");
        screen.createImage(dragGive.image, "gold");
        screen.createBold(top2[0].getName() + " has given the star to... " + dragGive.getName());
        dragGive.stars++;
        if (randomNumber(100) >= 80) {
            modRelation(2, 2, top2[0], dragGive);
            screen.createBold(dragGive.getName() + " felt very grateful.");
        } else {
            modRelation(2, 1, top2[0], dragGive);
            screen.createBold(dragGive.getName() + " said thank you.");
        }
        dragGive = bestSister(top2[1], blockQueens);
        screen.createImage(top2[1].image, "deepskyblue");
        screen.createImage(dragGive.image, "gold");
        screen.createBold(top2[1].getName() + " has given the star to... " + dragGive.getName());
        dragGive.stars++
        if (randomNumber(100) >= 80) {
            modRelation(2, 2, top2[1], dragGive);
            screen.createBold(dragGive.getName() + " felt very grateful.");
        } else {
            modRelation(2, 1, top2[1], dragGive);
            screen.createBold(dragGive.getName() + " said thank you.");
        }
    }
    screen.createButton("Proceed", "untucked()");
}

//QUEENS:
//SEASON 1: 
let akashia = new Queen("Akashia", 3, 2, 7, 3, 2, 7, 11, "Akashia");
let bebe = new Queen("BeBe Zahara Benet", 6, 7, 8, 12, 6, 10, 9, "BeBe");
let jade = new Queen("Jade Sotomayor", 3, 3, 8, 7, 3, 7, 7, "Jade");
let ninaf = new Queen("Nina Flowers", 7, 5, 5, 11, 6, 10, 6, "NinaFlowers");
let ongina = new Queen("Ongina", 9, 8, 7, 9, 10, 9, 8, "Ongina");
let rebecca = new Queen("Rebecca Glasscock", 3, 3, 6, 4, 2, 6, 5, "Rebecca");
let shannel = new Queen("Shannel", 5, 5, 5, 9, 4, 11, 7, "Shannel");
let tammie = new Queen("Tammie Brown", 6, 7, 5, 7, 6, 7, 6, "Tammie");
let victoria = new Queen("Victoria 'Porkchop' Parker", 3, 6, 4, 3, 6, 5, 4, "Victoria");
let us_season1 = [akashia, bebe, jade, ninaf, ongina, rebecca, shannel, tammie, victoria];
//SEASON 2:       acting, comedy, dance, design, improv, runway, lipsync
let jessica = new Queen("Jessica Wild", 8, 6, 9, 7, 8, 8, 10, "Jessica");
let jujubee = new Queen("Jujubee", 9, 11, 7, 8, 12, 6, 12, "Jujubee");
let morgan = new Queen("Morgan McMichaels", 6, 6, 10, 9, 5, 10, 10, "Morgan");
let mystique = new Queen("Mystique Summers", 4, 5, 3, 3, 3, 5, 6, "Mystique");
let nicole = new Queen("Nicole Paige Brooks", 4, 4, 4, 6, 4, 7, 6, "Nicole");
let pandora = new Queen("Pandora Boxx", 12, 11, 6, 8, 10, 8, 7, "Pandora");
let raven = new Queen("Raven", 5, 8, 9, 10, 5, 8, 11, "Raven");
let sahara = new Queen("Sahara Davenport", 6, 6, 10, 4, 6, 7, 10, "Sahara");
let shangela = new Queen("Shangela", 14, 13, 10, 3, 9, 9, 12, "Shangela");
let sonique = new Queen("Kylie Sonique Love", 11, 9, 10, 9, 8, 11, 11, "Kylie");
let tatianna = new Queen("Tatianna", 8, 11, 8, 8, 10, 8, 10, "Tatianna");
let tyra = new Queen("King Tyra", 11, 7, 8, 11, 8, 9, 10, "Tyra");
let us_season2 = [jessica, jujubee, morgan, mystique, nicole, pandora, raven, sahara, shangela, sonique, tatianna, tyra];
//SEASON 3:
let alexis = new Queen("Alexis Mateo", 14, 12, 9, 7, 10, 8, 12, "Alexis");
let carmen = new Queen("Carmen Carrera", 3, 8, 6, 4, 3, 7, 7, "Carmen");
let delta = new Queen("Delta Work", 4, 6, 5, 5, 5, 7, 7, "Delta");
let india = new Queen("India Ferrah", 6, 4, 8, 6, 3, 10, 9, "India");
let manila = new Queen("Manila Luzon", 12, 11, 7, 14, 10, 13, 11, "Manila");
let mariah = new Queen("Mariah Paris Balenciaga", 6, 4, 7, 8, 4, 9, 8, "Mariah");
let mimi = new Queen("Mimi Imfurst", 11, 6, 6, 10, 7, 8, 6, "Mimi");
let phoenix = new Queen("Phoenix", 3, 3, 6, 5, 3, 5, 4, "Phoenix");
let raja = new Queen("Raja", 11, 13, 6, 14, 12, 14, 9, "Raja");
let stacey = new Queen("Stacy Layne Matthews", 6, 7, 5, 4, 10, 5, 6, "Stacy");
let venus = new Queen("Venus D-Lite", 4, 5, 8, 2, 3, 5, 2, "Venus");
let yara = new Queen("Yara Sofia", 11, 9, 9, 13, 7, 10, 8, "Yara");
let us_season3 = [alexis, carmen, delta, india, manila, mariah, mimi, phoenix, raja, shangela, stacey, venus, yara];
//SEASON 4:
let alisa = new Queen("Alisa Summers", 4, 4, 5, 2, 3, 5, 4, "Alisa");
let chad = new Queen("Chad Michaels", 11, 10, 8, 9, 12, 10, 8, "Chad");
let dida = new Queen("Dida Ritz", 8, 7, 8, 5, 7, 7, 12, "Dida");
let jiggly = new Queen("Jiggly Caliente", 4, 6, 9, 4, 4, 7, 10, "Jiggly");
let kenya = new Queen("Kenya Olivera", 9, 6, 6, 6, 8, 7, 8, "Kenya");
let leshauwn = new Queen("Lashauwn Beyond", 4, 4, 6, 11, 5, 7, 7, "Lashauwn");
let latrice = new Queen("Latrice Royale", 11, 8, 9, 8, 7, 9, 13, "Latrice");
let madame = new Queen("Madame LaQueer", 4, 7, 6, 5, 9, 7, 6, "Madame");
let milan = new Queen("Milan", 4, 5, 9, 7, 5, 8, 10, "Milan");
let phiphi = new Queen("Jaremi Carey", 13, 9, 8, 10, 10, 10, 8, "PhiPhi");
let princess = new Queen("The Princess", 4, 4, 5, 7, 4, 7, 7, "Princess");
let willam = new Queen("Willam", 10, 8, 7, 10, 10, 9, 8, "Willam");
let us_season4 = [alisa, chad, dida, jiggly, kenya, leshauwn, latrice, madame, milan, phiphi, princess, willam];
//ALL STARS 1:
let allstars_1 = [alexis, chad, jujubee, latrice, manila, mimi, ninaf, pandora, raven, shannel, tammie, yara];
//SEASON 5:   acting, comedy, dance, design, improv, runway, lipsync
let alaska = new Queen("Alaska", 15, 14, 7, 8, 14, 10, 11, "Alaska");
let alyssa = new Queen("Alyssa Edwards", 4, 6, 15, 6, 10, 9, 12, "Alyssa");
let coco = new Queen("Coco Montrese", 10, 10, 11, 9, 7, 9, 15, "Coco");
let detox = new Queen("Detox", 10, 9, 9, 9, 8, 12, 11, "Detox");
let honey = new Queen("Honey Mahogany", 10, 3, 3, 6, 6, 8, 4, "Honey");
let ivy = new Queen("Ivy Winters", 11, 4, 8, 12, 7, 10, 7, "Ivy");
let jadejolie = new Queen("Jade Jolie", 5, 7, 8, 7, 8, 7, 8, "JadeJ");
let jinkx = new Queen("Jinkx Monsoon", 15, 15, 9, 8, 15, 9, 8, "Jinkx");
let lineysha = new Queen("Lineysha Sparx", 10, 4, 7, 11, 5, 9, 8, "Lineysha");
let monica = new Queen("Monica Beverly Hillz", 4, 4, 6, 6, 3, 8, 8, "Monica");
let penny = new Queen("Penny Tration", 4, 5, 4, 5, 5, 5, 4, "Penny");
let roxxxy = new Queen("Roxxxy Andrews", 7, 4, 7, 11, 8, 10, 12, "Roxxxy");
let serena = new Queen("Serena ChaCha", 3, 3, 7, 4, 5, 5, 8, "Serena");
let vivienne = new Queen("Vivienne Pinay", 7, 3, 4, 5, 3, 6, 4, "Vivienne");
let us_season5 = [alaska, alyssa, coco, detox, honey, ivy, jadejolie, jinkx, lineysha, monica, penny, roxxxy, serena, vivienne];
//SEASON 6:
let adore = new Queen("Adore Delano", 9, 11, 9, 6, 9, 8, 11, "Adore");
let april = new Queen("April Carrión", 5, 5, 6, 9, 5, 9, 8, "April");
let bendelacreme = new Queen("BenDeLaCreme", 12, 12, 11, 10, 15, 10, 9, "Bendelacreme");
let bianca = new Queen("Bianca Del Rio", 11, 15, 7, 13, 15, 10, 5, "Bianca");
let courtney = new Queen("Courtney Act", 11, 8, 10, 10, 10, 12, 9, "Courtney");
let darienne = new Queen("Darienne Lake", 11, 8, 7, 4, 9, 8, 13, "Darienne");
let gia = new Queen("Gia Gunn", 10, 4, 8, 8, 4, 8, 9, "Gia");
let joslyn = new Queen("Joslyn Fox", 6, 7, 8, 6, 8, 8, 11, "Joslyn");
let kelly = new Queen("Kelly Mantle", 6, 6, 5, 5, 4, 7, 4, "Kellu");
let laganja = new Queen("Laganja Estranja", 9, 5, 14, 8, 6, 10, 15, "Laganja");
let magnolia = new Queen("Magnolia Crawford", 4, 5, 6, 4, 5, 7, 4, "Magnolia");
let milk = new Queen("Milk", 6, 6, 7, 8, 8, 7, 7, "Milk");
let trinityk = new Queen("Trinity K. Bonet", 9, 9, 13, 12, 4, 10, 15, "TrinityKB");
let vivacious = new Queen("Vivacious", 4, 5, 5, 4, 4, 7, 7, "Vivacious");
let us_season6 = [adore, april, bendelacreme, bianca, courtney, darienne, gia, joslyn, kelly, laganja, magnolia, milk, trinityk, vivacious];
//SEASON 7: 
let ginger = new Queen("Ginger Minj", 14, 12, 8, 9, 15, 7, 12, "Ginger");
let jaidynn = new Queen("Jaidynn Diore Fierce", 9, 7, 8, 6, 6, 7, 11, "Jaidynn");
let jasmine = new Queen("Jasmine Masters", 3, 4, 6, 5, 2, 7, 6, "Jasmine");
let kandy = new Queen("Kandy Ho", 4, 4, 7, 5, 4, 7, 10, "KandyH");
let katya = new Queen("Katya", 9, 12, 9, 7, 12, 10, 10, "Katya");
let kennedy = new Queen("Kennedy Davenport", 9, 8, 10, 8, 11, 10, 14, "Kennedy");
let max = new Queen("Max", 10, 7, 5, 8, 4, 8, 5, "Max");
let fame = new Queen("Miss Fame", 8, 4, 5, 11, 3, 10, 5, "MissFame");
let kasha = new Queen("Mrs. Kasha Davis", 11, 8, 9, 8, 6, 8, 7, "Kasha");
let pearl = new Queen("Pearl", 7, 10, 8, 9, 10, 9, 5, "Pearl");
let sashab = new Queen("Frisbee Jenkins", 6, 6, 4, 4, 6, 6, 4, "SashaB");
let tempest = new Queen("Tempest DuJour", 6, 6, 5, 3, 6, 7, 4, "Tempest");
let trixie = new Queen("Trixie Mattel", 13, 10, 6, 10, 11, 10, 5, "Trixie");
let violet = new Queen("Violet Chachki", 6, 7, 8, 15, 8, 13, 8, "Violet");
let us_season7 = [ginger, jaidynn, jasmine, kandy, katya, kennedy, max, fame, kasha, pearl, sashab, tempest, trixie, violet];
//SEASON 8:  acting, comedy, dance, design, improv, runway, lipsync
let acid = new Queen("Acid Betty", 9, 4, 7, 10, 5, 11, 7, "Acid");
let bob = new Queen("Bob The Drag Queen", 15, 15, 8, 9, 15, 8, 12, "Bob");
let chichi = new Queen("Chi Chi DeVayne", 8, 4, 13, 8, 6, 8, 13, "ChiChi");
let cynthia = new Queen("Cynthia Lee Fontaine", 4, 4, 7, 6, 4, 7, 6, "Cynthia");
let dax = new Queen("Dax ExclamationPoint", 5, 6, 6, 5, 6, 5, 4, "Dax");
let derrick = new Queen("Derrick Barry", 7, 7, 8, 8, 9, 7, 8, "Derrick");
let kim = new Queen("Kim Chi", 10, 7, 4, 15, 8, 13, 4, "Kim");
let laila = new Queen("Laila McQueen", 6, 6, 4, 7, 6, 8, 7, "Laila");
let naomi = new Queen("Naomi Smalls", 9, 7, 10, 14, 10, 12, 11, "Naomi");
let naysha = new Queen("Naysha Lopez", 6, 4, 4, 4, 3, 6, 7, "Naysga");
let robbie = new Queen("Robbie Turner", 4, 5, 6, 4, 3, 6, 6, "Robbie");
let thorgy = new Queen("Thorgy Thor", 14, 9, 6, 9, 13, 9, 8, "Thorgy");
let us_season8 = [acid, bob, chichi, cynthia, dax, derrick, kim, laila, naomi, naysha, robbie, thorgy];
//ALL STARS 2:
let allstars_2 = [adore, alaska, alyssa, coco, detox, ginger, katya, phiphi, roxxxy, tatianna];
//SEASON 9: 
let aja = new Queen("Aja LaBeija", 4, 8, 12, 11, 9, 10, 11, "Aja");
let alexism = new Queen("Alexis Michelle", 8, 7, 9, 7, 13, 6, 10, "AlexisM");
let charlie = new Queen("Charlie Hides", 10, 6, 5, 7, 4, 9, 2, "Charlie");
let eureka = new Queen("Eureka!", 9, 11, 8, 10, 13, 10, 12, "Eureka");
let farrah = new Queen("Farrah Moan", 9, 4, 7, 3, 6, 8, 7, "Farrah");
let jaymes = new Queen("Jaymes Mansfield", 6, 6, 3, 6, 5, 7, 6, "Jaymes");
let kimora = new Queen("Kimora Blac", 5, 5, 4, 6, 5, 8, 7, "Kimora");
let ninab = new Queen("Nina Bo'Nina Brown", 4, 8, 10, 9, 10, 10, 11, "NinaBB");
let peppermint = new Queen("Peppermint", 11, 9, 10, 9, 4, 7, 13, "Peppermint");
let sasha = new Queen("Sasha Velour", 9, 10, 8, 10, 11, 13, 11, "Sasha");
let shea = new Queen("Shea Couleé", 11, 12, 15, 12, 11, 15, 15, "Shea");
let trinity = new Queen("Trinity The Tuck", 13, 11, 9, 15, 10, 13, 11, "TrinityTT");
let valentina = new Queen("Valentina", 11, 7, 10, 9, 9, 9, 10, "Valentina");
let us_season9 = [aja, alexism, charlie, cynthia, eureka, farrah, jaymes, kimora, ninab, peppermint, sasha, shea, trinity, valentina];
//ALL STARS 3:
let allstars_3 = [aja, bebe, bendelacreme, chichi, kennedy, milk, morgan, shangela, thorgy, trixie];
//SEASON 10: 
let aquaria = new Queen("Aquaria", 6, 11, 8, 15, 12, 14, 11, "Aquaria");
let asia = new Queen("Asia O'Hara", 11, 9, 6, 6, 7, 9, 9, "Asia");
let blair = new Queen("Blair St. Clair", 9, 8, 6, 10, 8, 8, 7, "Blair");
let dusty = new Queen("Dusty Ray Bottoms", 8, 8, 6, 7, 6, 7, 6, "Dusty");
let kalorie = new Queen("Kalorie K. Williams", 6, 6, 6, 5, 7, 7, 8, "Kalorie");
let kameron = new Queen("Kameron Michaels", 5, 8, 14, 10, 8, 8, 15, "Kameron");
let mayhem = new Queen("Mayhem Miller", 4, 8, 9, 13, 7, 9, 10, "Mayhem");
let miz = new Queen("Miz Cracker", 13, 11, 5, 12, 15, 9, 8, "Miz");
let monet = new Queen("Monét X Change", 11, 11, 14, 9, 10, 10, 15, "Monet");
let monique = new Queen("Mo Heart", 12, 8, 6, 10, 13, 12, 10, "Monique");
let vanessa = new Queen("Vanessa 'Vanjie' Mateo", 9, 6, 8, 6, 9, 7, 11, "Vanjie");
let vixen = new Queen("The Vixen", 5, 4, 12, 9, 3, 8, 12, "Vixen");
let yuhua = new Queen("Yuhua Hamasaki", 4, 4, 6, 9, 6, 7, 7, "Yuhua");
let us_season10 = [aquaria, asia, blair, dusty, eureka, kalorie, kameron, mayhem, miz, monet, monique, vanessa, vixen, yuhua];
//ALL STARS 4:
let allstars_4 = [farrah, gia, jasmine, latrice, manila, monet, monique, naomi, trinity, valentina];
//SEASON 11:  acting, comedy, dance, design, improv, runway, lipsync
let akeria = new Queen("A'keria C. Davenport", 11, 9, 11, 8, 10, 13, 10, "Akeria");
let ariel = new Queen("Ariel Versace", 8, 6, 8, 5, 8, 8, 8, "Ariel");
let brooke = new Queen("Brooke Lynn Hytes", 8, 8, 13, 12, 8, 10, 13, "Brooke");
let honeyd = new Queen("Honey Davenport", 4, 6, 5, 7, 4, 9, 4, "HoneyD");
let kahanna = new Queen("Kahanna Montrese", 4, 5, 5, 4, 5, 6, 8, "Kahanna");
let mercedes = new Queen("Mercedes Iman Diamond", 4, 6, 4, 6, 6, 8, 8, "Mercedes");
let ninaw = new Queen("Nina West", 12, 11, 6, 8, 11, 8, 6, "NinaW");
let plastique = new Queen("Plastique Tiara", 10, 7, 8, 11, 8, 10, 9, "Plastique");
let rajah = new Queen("Ra'Jah O'Hara", 8, 8, 11, 12, 9, 12, 13, "Rajah");
let scarlet = new Queen("Scarlet Envy", 13, 7, 6, 13, 8, 10, 7, "Scarlet");
let shuga = new Queen("Shuga Cain", 10, 9, 7, 6, 7, 10, 7, "Shuga");
let silky = new Queen("Silky Nutmeg Ganache", 10, 10, 9, 8, 10, 10, 12, "Silky");
let yvie = new Queen("Yvie Oddly", 12, 7, 13, 12, 9, 12, 15, "Yvie");
let us_season11 = [akeria, ariel, brooke, honeyd, kahanna, mercedes, ninaw, plastique, rajah, scarlet, shuga, silky, vanessa, yvie];
//SEASON 12: 
let aiden = new Queen("Aiden Zhane", 9, 3, 6, 4, 3, 6, 6, "Aiden");
let brita = new Queen("Brita", 7, 8, 7, 4, 6, 8, 11, "Brita");
let crystal = new Queen("Crystal Methyd", 6, 8, 8, 9, 8, 12, 6, "CrystalM");
let dahlia = new Queen("Dahlia Sin", 4, 4, 6, 5, 5, 10, 4, "Dahlia");
let gigi = new Queen("Gigi Goode", 10, 11, 11, 13, 9, 12, 8, "Gigi");
let heidi = new Queen("Heidi N Closet", 6, 9, 11, 6, 12, 7, 13, "Heidi");
let jackie = new Queen("Jackie Cox", 11, 12, 6, 6, 13, 9, 11, "Jackie");
let jaida = new Queen("Jaida Essence Hall", 8, 5, 10, 15, 8, 13, 12, "Jaida");
let jan = new Queen("Jan", 8, 4, 12, 9, 5, 10, 9, "Jan");
let nicky = new Queen("Nicky Doll", 4, 4, 5, 12, 3, 11, 5, "Nicky");
let rock = new Queen("Rock M. Sakura", 6, 6, 6, 4, 8, 8, 7, "Rock");
let widow = new Queen("Widow Von'Du", 11, 7, 13, 8, 11, 10, 15, "Widow");
let us_season12 = [aiden, brita, crystal, dahlia, gigi, heidi, jackie, jaida, jan, nicky, rock, widow];
//ALL STARS 5
let allstars_5 = [alexis, blair, derrick, india, jujubee, mariah, mayhem, miz, ongina, shea];
//SEASON 13
let denali = new Queen("Denali", 4, 8, 14, 9, 10, 11, 13, "Denali");
let elliott = new Queen("Elliott With 2 Ts", 5, 5, 12, 9, 3, 8, 11, "Elliott");
let mik = new Queen("Gottmik", 8, 11, 6, 13, 12, 13, 6, "Gottmik");
let joey = new Queen("Joey Jay", 6, 7, 6, 5, 5, 7, 7, "Joey");
let kahmora = new Queen("Kahmora Hall", 3, 4, 3, 5, 4, 12, 4, "Kahmora");
let kandym = new Queen("Kandy Muse", 9, 10, 5, 6, 7, 8, 14, "KandyM");
let lala = new Queen("LaLa Ri", 5, 7, 10, 2, 6, 9, 14, "Lala");
let olivia = new Queen("Olivia Lux", 11, 5, 11, 10, 8, 11, 8, "Olivia");
let rose = new Queen("Rosé", 12, 11, 13, 8, 10, 10, 6, "Rose");
let symone = new Queen("Symone", 14, 7, 7, 9, 12, 13, 13, "Symone");
let tamisha = new Queen("Tamisha Iman", 7, 6, 7, 5, 6, 7, 7, "Tamisha");
let tina = new Queen("Tina Burner", 6, 6, 10, 5, 6, 8, 9, "TinaB");
let utica = new Queen("Utica Queen", 7, 4, 6, 15, 5, 12, 11, "Utica");
let us_season13 = [denali, elliott, mik, joey, kahmora, kandym, lala, olivia, rose, symone, tamisha, tina, utica];
//ALL STARS 6
let allstars_6 = [akeria, eureka, ginger, jan, jiggly, pandora, rajah, scarlet, serena, silky, sonique, trinityk, yara];
//SEASON 14:  acting, comedy, dance, design, improv, runway, lipsync
let alyssaH = new Queen("Alyssa Hunter", 5, 6, 7, 10, 7, 13, 8, "AlyssaH");
let angeria = new Queen("Angeria Paris VanMicheals", 11, 6, 9, 12, 8, 11, 8, "Angeria");
let bosco = new Queen("Bosco", 11, 12, 6, 7, 12, 11, 6, "Bosco");
let daya = new Queen("Daya Betty", 9, 8, 9, 9, 10, 10, 8, "DayaBetty");
let deja = new Queen("DeJa Skye", 9, 7, 9, 8, 13, 8, 8, "DeJa");
let jasmineK = new Queen("Jasmine Kennedie", 7, 6, 13, 7, 6, 10, 14, "JasmineK");
let jorgeous = new Queen("Jorgeous", 5, 5, 13, 10, 5, 10, 15, "Jorgeous");
let june = new Queen("June Jambalaya", 5, 6, 6, 4, 5, 6, 6, "June");
let kerri = new Queen("Kerri Colby", 6, 6, 5, 5, 6, 9, 6, "Kerri");
let kornbread = new Queen("Kornbread Jeté", 6, 7, 6, 6, 7, 8, 7, "Kornbread");
let cadmen = new Queen("Lady Camden", 12, 11, 12, 11, 7, 10, 11, "LadyCamden");
let maddy = new Queen("Maddy Morphosis", 8, 7, 6, 5, 6, 9, 7, "Maddy");
let orion = new Queen("Orion Story", 4, 6, 6, 5, 6, 6, 5, "Orion");
let willow = new Queen("Willow Pill", 11, 8, 7, 10, 10, 12, 8, "Willow");
let us_season14 = [alyssaH, angeria, bosco, daya, deja, jasmineK, jorgeous, june, kerri, kornbread, cadmen, maddy, orion, willow];
//SEASON 15
let amethyst = new Queen("Amethyst", 7, 7, 7, 7, 7, 7, 7, "Amethyst");
let anetra = new Queen("Anetra", 7, 7, 7, 7, 7, 7, 7, "Anetra");
let auraMayari = new Queen("Aura Mayari", 7, 7, 7, 7, 7, 7, 7, "AuraMayari");
let irene = new Queen("Irene Dubois", 7, 7, 7, 7, 7, 7, 7, "IreneDubois");
let jax = new Queen("Jax", 7, 7, 7, 7, 7, 7, 7, "Jax");
let loosey = new Queen("Loosey LaDuca", 7, 7, 7, 7, 7, 7, 7, "LooseyLaDuca");
let luxx = new Queen("Luxx Noir London", 7, 7, 7, 7, 7, 7, 7, "LuxxNoirLondon");
let malaysia = new Queen("Malaysia Babydoll Foxx", 7, 7, 7, 7, 7, 7, 7, "MalaysiaBabydollFoxx");
let marcia = new Queen("Marcia Marcia Marcia", 7, 7, 7, 7, 7, 7, 7, "MarciaMarciaMarcia");
let mistress = new Queen("Mistress Isabelle Brooks", 7, 7, 7, 7, 7, 7, 7, "MistressIsabelleBrooks");
let poppy = new Queen("Princess Poppy", 7, 7, 7, 7, 7, 7, 7, "PrincessPoppy");
let robin = new Queen("Robin Fierce", 7, 7, 7, 7, 7, 7, 7, "RobinFierce");
let salina = new Queen("Salina EsTitties", 7, 7, 7, 7, 7, 7, 7, "SalinaEsTitties");
let sashaColby = new Queen("Sasha Colby", 7, 7, 7, 7, 7, 7, 7, "SashaColby");
let spice = new Queen("Spice", 7, 7, 7, 7, 7, 7, 7, "Spice");
let sugar = new Queen("Sugar", 7, 7, 7, 7, 7, 7, 7, "Sugar");
let us_season15 = [amethyst, anetra, auraMayari, irene, jax, loosey, luxx, malaysia, marcia, mistress, poppy, robin, salina, sashaColby, spice, sugar];
//DRUK SEASON 1 
let baga = new Queen("Baga Chipz", 13, 12, 5, 5, 13, 8, 7, "Baga");
let blu = new Queen("Blu Hydrangea", 5, 9, 8, 10, 10, 12, 9, "Blu");
let cheryl = new Queen("Cheryl Hole", 5, 5, 9, 5, 7, 7, 9, "Cheryl");
let crystaluk = new Queen("Crystal", 6, 5, 6, 9, 4, 8, 6, "Crystal");
let divina = new Queen("Divina De Campo", 11, 6, 9, 12, 9, 9, 9, "Divina");
let gothy = new Queen("Gothy Kendoll", 4, 5, 4, 3, 5, 6, 4, "Gothy");
let scaredy = new Queen("Scaredy Kat", 3, 5, 6, 4, 4, 7, 4, "Scaredy");
let sumting = new Queen("Sum Ting Wong", 8, 6, 6, 7, 6, 9, 8, "Sum");
let viv = new Queen("The Vivienne", 12, 13, 8, 10, 14, 11, 12, "TVivienne");
let vinegar = new Queen("Vinegar Strokes", 7, 6, 6, 4, 4, 6, 6, "Vinegar");
let uk_season1 = [baga, blu, cheryl, crystaluk, divina, gothy, scaredy, sumting, viv, vinegar];
// ALL STARS 7
let allstars_7 = [raja, jinkx, yvie, jaida, trinity, monet, shea, viv];
//DRUK SEASON 2
let awhora = new Queen("A'Whora", 7, 5, 8, 15, 10, 10, 8, "Awhora");
let asttina = new Queen("Asttina Mandella", 6, 6, 13, 8, 6, 10, 12, "Asttina");
let bimini = new Queen("Bimini", 11, 14, 10, 7, 11, 11, 11, "Bimini");
let cherry = new Queen("Cherry Valentine", 5, 6, 5, 7, 6, 11, 4, "Cherry");
let ellie = new Queen("Ellie Diamond", 10, 6, 7, 11, 8, 9, 8, "Ellie");
let ginny = new Queen("Ginny Lemon", 6, 6, 5, 5, 5, 8, 4, "Ginny");
let joe = new Queen("Joe Black", 5, 5, 4, 5, 4, 8, 5, "Joe");
let lawrence = new Queen("Lawrence Chaney", 13, 12, 5, 12, 9, 11, 10, "Lawrence");
let sister = new Queen("Sister Sister", 6, 8, 6, 4, 7, 8, 9, "Sister");
let tayce = new Queen("Tayce", 10, 9, 10, 5, 9, 12, 14, "Tayce");
let tia = new Queen("Tia Kofi", 7, 9, 9, 5, 8, 5, 10, "Tia");
let veronica = new Queen("Veronica Green", 6, 6, 10, 6, 5, 7, 8, "Veronica");
let uk_season2 = [awhora, asttina, bimini, cherry, ellie, ginny, joe, lawrence, sister, tayce, tia, veronica];
//DRUK SEASON 3    
let anubis = new Queen("Anubis", 5, 5, 5, 4, 5, 4, 4, "Anubis");
let charity = new Queen("Charity Kase", 8, 7, 4, 10, 6, 13, 8, "Charity");
let choriza = new Queen("Choriza May", 9, 9, 6, 7, 7, 8, 5, "Choriza");
let elektraF = new Queen("Elektra Fence", 5, 6, 11, 4, 5, 8, 13, "ElektraF");
let ella = new Queen("Ella Vaday", 9, 14, 8, 10, 12, 9, 8, "Ella");
let kitty = new Queen("Kitty Scott-Claus", 12, 11, 7, 8, 9, 9, 7, "Kitty");
let krystal = new Queen("Krystal Versace", 8, 8, 11, 12, 8, 14, 12, "Krystal");
let river = new Queen("River Medway", 8, 6, 5, 9, 5, 7, 5, "River");
let scarlett = new Queen("Scarlett Harlett", 7, 7, 8, 8, 6, 8, 7, "ScarlettH");
let vanity = new Queen("Vanity Milan", 8, 6, 12, 7, 8, 8, 12, "Vanity");
let victoriaS = new Queen("Victoria Scone", 11, 10, 8, 10, 8, 10, 10, "VictoriaS");
let uk_season3 = [anubis, charity, choriza, elektraF, ella, kitty, krystal, river, scarlett, vanity, victoriaS, veronica];
//DRUK SEASON 4         acting, comedy, dance, design, improv, runway, lipsync
let baby = new Queen("Baby", 6, 6, 9, 10, 4, 9, 11, "Baby");
let black = new Queen("Black Peppa", 5, 4, 8, 4, 6, 13, 13, "BlackPeppa");
let cheddar = new Queen("Cheddar Gorgeous", 12, 9, 9, 8, 13, 14, 8, "Cheddar");
let copper = new Queen("Copper Topp", 5, 4, 9, 7, 6, 7, 8, "Copper");
let dakota = new Queen("Dakota Schiffer", 6, 9, 9, 10, 9, 11, 10, "Dakota");
let danny = new Queen("Danny Beard", 12, 10, 11, 8, 11, 13, 9, "Danny");
let jonbers = new Queen("Jonbers Blonde", 5, 10, 8, 7, 9, 9, 9, "Jonbers");
let just = new Queen("Just May", 4, 4, 4, 4, 4, 4, 4, "JustMay");
let leFil = new Queen("Le Fil", 6, 5, 8, 9, 5, 12, 9, "LeFil");
let pixie = new Queen("Pixie Polite", 7, 5, 9, 8, 8, 9, 9, "PixiePolite");
let sminty = new Queen("Sminty Drop", 5, 6, 5, 9, 4, 14, 8, "Sminty");
let starlet = new Queen("Starlet", 4, 4, 4, 4, 4, 13, 5, "Starlet");
let uk_season4 = [baby, black, cheddar, copper, dakota, danny, jonbers, just, leFil, pixie, sminty, starlet];
//CAN SEASON 1 
let anastarzia = new Queen("Anastarzia Anaquway", 7, 6, 4, 12, 6, 8, 7, "Starzy");
let boa = new Queen("BOA", 6, 6, 5, 5, 6, 7, 7, "BOA");
let ilona = new Queen("Ilona Verley", 5, 8, 5, 8, 9, 10, 10, "Ilona");
let jimbo = new Queen("Jimbo", 10, 13, 2, 13, 15, 11, 2, "Jimbo");
let juice = new Queen("Juice Boxx", 6, 6, 6, 4, 6, 6, 7, "Juice");
let kiara = new Queen("Kiara", 10, 6, 8, 11, 6, 9, 11, "Kiara");
let kyne = new Queen("Kyne", 8, 6, 6, 7, 6, 6, 7, "Kyne");
let lemon = new Queen("Lemon", 10, 11, 12, 6, 11, 13, 11, "Lemon");
let priyanka = new Queen("Priyanka", 14, 9, 12, 8, 6, 10, 13, "Priyanka");
let rita = new Queen("Rita Baga", 11, 10, 9, 9, 8, 10, 12, "Rita");
let bobo = new Queen("Scarlett BoBo", 6, 8, 9, 9, 9, 10, 9, "Scarlett");
let tynomi = new Queen("Tynomi Banks", 5, 6, 5, 7, 5, 7, 10, "Tynomi");
let can_season1 = [anastarzia, boa, ilona, jimbo, juice, kiara, kyne, lemon, priyanka, rita, bobo, tynomi];
//CAN SEASON 2
let adriana = new Queen("Adriana", 9, 6, 7, 6, 6, 8, 5, "Adriana");
let beth = new Queen("Beth", 5, 5, 6, 3, 6, 5, 4, "Beth");
let eve = new Queen("Eve 6000", 10, 5, 5, 6, 6, 8, 8, "Eve");
let giametric = new Queen("Gia Metric", 9, 6, 10, 6, 6, 9, 10, "Giametric");
let icesis = new Queen("Icesis Couture", 8, 11, 9, 12, 10, 14, 12, "Icesis");
let kendall = new Queen("Kendall Gender", 7, 9, 8, 6, 7, 8, 10, "Kendall");
let kimoraA = new Queen("Kimora Amour", 6, 5, 5, 6, 7, 7, 5, "KimoraA");
let oceane = new Queen("Océane Aqua-Black", 6, 7, 4, 7, 7, 7, 5, "Oceane");
let pythia = new Queen("Pythia", 8, 7, 8, 12, 9, 12, 7, "Pythia");
let stephanie = new Queen("Stephanie Prince", 6, 5, 6, 10, 5, 11, 6, "Stephanie");
let suki = new Queen("Suki Doll", 8, 7, 6, 9, 5, 9, 5, "Suki");
let synthia = new Queen("Synthia Kiss", 6, 8, 10, 7, 9, 7, 9, "Synthia");
let can_season2 = [adriana, beth, eve, giametric, icesis, kendall, kimoraA, oceane, pythia, stephanie, suki, synthia];
//CAN SEASON 2
let bombae = new Queen("Bombae", 5, 7, 6, 8, 6, 7, 7, "Bombae");
let chelazon = new Queen("Chelazon Leroux", 4, 9, 4, 7, 5, 7, 6, "Chelazon");
let gisele = new Queen("Gisèle Lullaby", 6, 10, 8, 11, 10, 12, 9, "Gisele");
let halal = new Queen("Halal Bae", 4, 4, 3, 3, 4, 7, 5, "Halal");
let irma = new Queen("Irma Gerd", 5, 7, 7, 8, 10, 9, 7, "Irma");
let jadashada = new Queen("Jada Shada Hudson", 9, 7, 9, 8, 7, 10, 12, "JadaShada");
let kaos = new Queen("Kaos", 5, 7, 5, 5, 5, 9, 9, "Kaos");
let kimmy = new Queen("Kimmy Couture", 7, 7, 12, 9, 6, 11, 12, "Kimmy");
let boomboom = new Queen("Lady Boom Boom", 5, 8, 9, 9, 6, 10, 9, "BoomBoom");
let fiercalicious = new Queen("Miss Fiercalicious", 9, 9, 8, 7, 7, 11, 9, "Fiercalicious");
let moco = new Queen("Miss Moço", 5, 4, 6, 4, 4, 7, 9, "Moco");
let vanderpuss = new Queen("Vivian Vanderpuss", 9, 9, 9, 7, 8, 9, 8, "Vanderpuss");
let can_season3 = [bombae, chelazon, gisele, halal, irma, jadashada, kaos, kimmy, boomboom, fiercalicious, moco, vanderpuss];
//DRAG RACE HOLLAND SEASON 1
let chelsea = new Queen("Chelsea Boy", 9, 10, 7, 7, 10, 12, 6, "Chelsea");
let envy = new Queen("Envy Peru", 11, 11, 11, 8, 11, 13, 11, "Envy");
let janey = new Queen("Janey Jacké", 7, 6, 13, 11, 6, 11, 12, "Janey");
let madamem = new Queen("Madame Madness", 8, 6, 5, 6, 5, 8, 7, "MadameM");
let mama = new Queen("Ma'Ma Queen", 9, 6, 5, 6, 6, 10, 7, "Mama");
let megan = new Queen("Megan Schoonbrood", 7, 6, 6, 5, 6, 9, 8, "Megan");
let abby = new Queen("Miss Abby OMG", 5, 6, 11, 6, 5, 8, 10, "Abby");
let patty = new Queen("Patty Pam-Pam", 5, 6, 6, 6, 5, 9, 7, "Patty");
let roem = new Queen("Roem", 6, 6, 5, 5, 5, 6, 5, "Roem");
let sederginne = new Queen("Sederginne", 7, 6, 6, 7, 5, 13, 5, "Sederginne");
let hol_season1 = [chelsea, envy, janey, madamem, mama, megan, abby, patty, roem, sederginne];
//DRAG RACE HOLLAND SEASON 2
let ivyelise = new Queen("Ivy-Elyse", 6, 8, 5, 4, 8, 5, 10, "IvyE");
let juicy = new Queen("Juicy Kouture", 5, 6, 5, 5, 4, 4, 5, "Juicy");
let keta = new Queen("Keta Minaj", 9, 12, 9, 7, 12, 11, 9, "Keta");
let love = new Queen("Love Masisi", 6, 5, 6, 8, 5, 10, 7, "Love");
let mlp = new Queen("My Little Puny", 10, 10, 10, 7, 9, 10, 10, "MLP");
let reggy = new Queen("Reggy B", 6, 6, 6, 5, 6, 8, 8, "Reggy");
let tabitha = new Queen("Tabitha", 6, 7, 8, 6, 5, 7, 8, "Tabitha");
let countess = new Queen("The Countess", 7, 5, 4, 10, 6, 12, 5, "Countess");
let vanessaC = new Queen("Vanessa Van Cartier", 7, 5, 6, 8, 5, 12, 8, "VanessaC");
let vivaldi = new Queen("Vivaldi", 8, 8, 8, 7, 8, 12, 8, "Vivaldi");
let hol_season2 = [ivyelise, juicy, keta, love, mlp, reggy, tabitha, countess, vanessaC, vivaldi];
//DRT SEASON 1
let amadiva = new Queen("Amadiva", 7, 6, 7, 9, 4, 9, 8, "Amadiva");
let annee = new Queen("Anneé Maywong", 10, 9, 7, 12, 8, 11, 9, "Annee");
let b = new Queen("B Ella", 11, 7, 6, 7, 7, 7, 7, "B");
let bunny = new Queen("Bunny Be Fly", 6, 5, 5, 7, 5, 6, 5, "Bunny");
let dearis = new Queen("Dearis Doll", 8, 11, 7, 8, 10, 10, 10, "Dearis");
let jaja = new Queen("JAJA", 7, 5, 7, 6, 5, 9, 9, "Jaja");
let meannie = new Queen("Meannie Minaj", 5, 5, 5, 4, 5, 5, 4, "Meannie");
let morrigan = new Queen("Morrigan", 5, 4, 6, 4, 6, 7, 6, "Morrigan");
let natalia = new Queen("Natalia Pliacam", 8, 12, 7, 9, 12, 10, 9, "Natalia");
let petchra = new Queen("Petchra", 6, 5, 6, 8, 6, 7, 8, "Petchra");
let drt_season1 = [amadiva, annee, b, bunny, dearis, jaja, meannie, morrigan, natalia, petchra];
//DRT SEASON 2
let angele = new Queen("Angele Anang", 8, 8, 9, 11, 9, 9, 12, "Angele");
let bandit = new Queen("Bandit", 7, 8, 7, 8, 7, 8, 7, "Bandit");
let genie = new Queen("Genie", 10, 7, 7, 7, 8, 8, 7, "Genie");
let kana = new Queen("Kana Warrior", 9, 7, 8, 6, 8, 7, 12, "Kana");
let kandyz = new Queen("Kandy Zyanide", 7, 7, 10, 8, 9, 10, 8, "KandyZ");
let katy = new Queen("Katy Killer", 6, 6, 7, 6, 7, 9, 6, "Katy");
let m = new Queen("M Stranger Fox", 5, 6, 5, 6, 6, 5, 5, "M");
let maya = new Queen("Maya B'Haro", 5, 6, 6, 8, 7, 8, 7, "Maya");
let mocha = new Queen("Mocha Diva", 9, 9, 6, 8, 9, 7, 9, "Mocha");
let gimhuay = new Queen("Miss Gimhuay", 8, 7, 7, 9, 8, 11, 8, "Gimhuay");
let silver = new Queen("Silver Sonic", 5, 5, 6, 6, 5, 7, 6, "Silver");
let srimala = new Queen("Srimala", 7, 10, 8, 8, 7, 7, 8, "Srimala");
let tormai = new Queen("Tormai", 6, 5, 5, 6, 5, 7, 7, "Tormai");
let vanda = new Queen("Vanda Miss Joaquim", 11, 10, 8, 8, 9, 9, 9, "Vanda");
let drt_season2 = [angele, bandit, genie, kana, kandyz, katy, m, maya, mocha, gimhuay, silver, srimala, tormai, vanda];
//DRAG RACE DOWN UNDER SEASON 1
let anita = new Queen("Anita Wigl'it", 6, 9, 8, 6, 10, 8, 5, "Anita");
let art = new Queen("Art Simone", 6, 4, 5, 8, 4, 10, 4, "Art");
let cocoj = new Queen("Coco Jumbo", 6, 5, 6, 6, 5, 8, 10, "CocoJ");
let elektra = new Queen("Elektra Shock", 10, 6, 12, 8, 4, 7, 11, "Elektra");
let etc = new Queen("Etcetera Etcetera", 5, 8, 8, 7, 8, 8, 8, "Etc");
let jojo = new Queen("Jojo Zaho", 5, 5, 5, 5, 5, 6, 6, "Jojo");
let karen = new Queen("Karen From Finance", 5, 6, 5, 5, 7, 7, 5, "Karen");
let kita = new Queen("Kita Mean", 9, 9, 7, 7, 9, 9, 8, "Kita");
let maxi = new Queen("Maxi Shield", 6, 6, 5, 9, 7, 8, 8, "Maxi");
let drdu_season1 = [anita, art, cocoj, elektra, etc, jojo, karen, kita, maxi];
//DRAG RACE DOWN UNDER SEASON 2
let aubrey = new Queen("Aubrey Haive", 5, 4, 5, 7, 4, 8, 7, "Aubrey");
let beverly = new Queen("Beverly Kills", 8, 4, 10, 9, 5, 9, 10, "Beverly");
let faux = new Queen("Faúx Fúr", 4, 5, 4, 5, 4, 5, 6, "Faux");
let hannah = new Queen("Hannah Conda", 11, 10, 8, 9, 9, 11, 8, "Hannah");
let kweenKong = new Queen("Kween Kong", 5, 9, 10, 5, 8, 10, 11, "Kween");
let minnie = new Queen("Minnie Cooper", 9, 8, 5, 6, 6, 9, 7, "Minnie");
let molly = new Queen("Molly Poppinz", 8, 7, 6, 9, 7, 10, 9, "Molly");
let pomara = new Queen("Pomara Fifth", 8, 5, 5, 7, 5, 9, 8, "Pomara");
let spankie = new Queen("Spankie Jackzon", 11, 11, 8, 5, 8, 7, 9, "Spankie");
let yuri = new Queen("Yuri Guaii", 6, 11, 6, 12, 9, 13, 7, "Yuri");
let drdu_season2 = [aubrey, beverly, faux, hannah, kweenKong, minnie, molly, pomara, spankie, yuri];
//DRAG RACE ESPAÑA 1
let arantxa = new Queen("Arantxa Castilla La Mancha", 6, 8, 6, 7, 8, 9, 7, "Arantxa");
let carmenf = new Queen("Carmen Farala", 10, 10, 10, 14, 8, 13, 10, "CarmenF");
let dovima = new Queen("Dovima Nurmi", 8, 7, 5, 7, 8, 10, 6, "Dovima");
let drag = new Queen("Drag Vulcano", 6, 6, 5, 7, 6, 9, 6, "Drag");
let hugaceo = new Queen("Hugáceo Crujiente", 5, 5, 5, 12, 6, 12, 8, "Hugaceo");
let inti = new Queen("Inti", 6, 6, 6, 7, 5, 11, 6, "Inti");
let killer = new Queen("Killer Queen", 6, 10, 8, 9, 11, 9, 8, "Killer");
let pupi = new Queen("Pupi Poisson", 10, 11, 7, 5, 11, 6, 7, "Puppy");
let sagittaria = new Queen("Sagittaria", 7, 8, 8, 9, 7, 10, 8, "Sagittaria");
let macarena = new Queen("The Macarena", 5, 5, 6, 4, 5, 5, 5, "Macarena");
let dres_season1 = [arantxa, carmenf, dovima, drag, hugaceo, inti, killer, pupi, sagittaria, macarena];
// DRAG RACE ESPAÑA 2
let arielRec = new Queen("Ariel Rec", 5, 5, 7, 4, 5, 9, 5, "ArielRec");
let diamante = new Queen("Diamante Merybrown", 7, 6, 10, 5, 5, 8, 11, "Diamante");
let sethlas = new Queen("Drag Sethlas", 7, 5, 9, 10, 5, 11, 7, "DragSethlas");
let estrella = new Queen("Estrella Xtravaganza", 10, 7, 7, 5, 9, 8, 8, "Estrella");
let jota = new Queen("Jota Carajota", 4, 5, 6, 4, 4, 8, 7, "Jota");
let juriji = new Queen("Juriji Der Klee", 8, 9, 7, 9, 10, 10, 9, "Juriji");
let marina = new Queen("Marina", 6, 10, 8, 7, 7, 8, 11, "Marina");
let marisa = new Queen("Marisa Prisa", 4, 4, 3, 2, 4, 4, 4, "Marisa");
let onyx = new Queen("Onyx", 6, 6, 7, 7, 6, 13, 7, "Onyx");
let samantha = new Queen("Samantha Ballentines", 4, 4, 5, 5, 5, 5, 3, "Samantha");
let sharonne = new Queen("Sharonne", 12, 10, 8, 8, 12, 10, 9, "Sharonne");
let venedita = new Queen("Venedita Von Däsh", 9, 9, 9, 9, 9, 10, 9, "Venedita");
let dres_season2 = [arielRec, diamante, sethlas, estrella, jota, juriji, marina, marisa, onyx, samantha, sharonne, venedita];
//DRAG RACE ITALIA S1
let ava = new Queen("Ava Hangar", 8, 7, 5, 5, 6, 6, 6, "Ava");
let divinity = new Queen("Divinity", 9, 6, 8, 7, 6, 8, 7, "Divinity");
let elecktra = new Queen("Elecktra Bionic", 7, 8, 8, 8, 9, 9, 8, "Elecktra");
let enorma = new Queen("Enorma Jean", 8, 8, 6, 6, 8, 7, 6, "Enorma");
let farida = new Queen("Farida Kant", 7, 6, 8, 11, 5, 11, 8, "Farida");
let ivana = new Queen("Ivana Vamp", 6, 5, 6, 6, 6, 6, 5, "Ivana");
let riche = new Queen("Le Riche", 6, 8, 6, 8, 9, 8, 7, "Riche");
let luquisha = new Queen("Luquisha Lubamba", 7, 6, 6, 5, 7, 6, 7, "Luquisha");
let drita = [ava, divinity, elecktra, enorma, farida, ivana, riche, luquisha];
//DRAG RACE ITALIA 2 acting, comedy, dance, design, improv, runway, lipsync
let aura = new Queen("Aura Eternal", 11, 9, 9, 6, 5, 9, 8, "Aura");
let gioffre = new Queen("Gioffré", 6, 8, 5, 7, 5, 8, 8, "Gioffre");
let diamond = new Queen("La Diamond", 10, 12, 8, 12, 11, 13, 9, "LaDiamond");
let petite = new Queen("La Petite Noire", 10, 5, 10, 8, 7, 11, 11, "Petite");
let narciso = new Queen("Narciso", 4, 4, 4, 4, 4, 4, 4, "Narciso");
let nehellenia = new Queen("Nehellenia", 8, 10, 10, 8, 10, 12, 9, "Nehellenia");
let obama = new Queen("Obama", 5, 9, 6, 8, 9, 8, 8, "Obama");
let panthera = new Queen("Panthera Virus", 7, 5, 6, 6, 5, 8, 9, "Panthera");
let skandalove = new Queen("Skandalove", 9, 7, 8, 8, 7, 9, 9, "Skandalove");
let tanissa = new Queen("Tanissa Yoncè", 5, 6, 6, 10, 6, 9, 7, "Tanissa");
let drita_season2 = [aura, gioffre, diamond, petite, narciso, nehellenia, obama, panthera, skandalove, tanissa];
//DRAG RACE FRANCE
let elips = new Queen("Elips", 7, 9, 8, 8, 8, 8, 7, "Elips");
let kam = new Queen("Kam Hugh", 7, 5, 6, 9, 4, 13, 7, "Kam");
let bigbertha = new Queen("La Big Bertha", 7, 6, 7, 6, 6, 8, 9, "BigBertha");
let briochee = new Queen("La Briochée", 6, 6, 6, 5, 6, 8, 5, "LaBriochee");
let grandedame = new Queen("La Grande Dame", 11, 10, 8, 12, 8, 11, 8, "GrandeDame");
let kahena = new Queen("La Kahena", 5, 6, 5, 3, 5, 6, 5, "Kahena");
let lolita = new Queen("Lolita Banana", 9, 7, 13, 11, 6, 9, 12, "LolitaBanana");
let lova = new Queen("Lova Ladiva", 5, 5, 6, 4, 6, 6, 5, "Lova");
let paloma = new Queen("Paloma", 11, 11, 6, 7, 9, 9, 8, "Paloma");
let soa = new Queen("Soa de Muse", 9, 10, 10, 8, 8, 9, 10, "Soa");
let drfr = [elips, kam, bigbertha, briochee, grandedame, kahena, lolita, lova, paloma, soa];
//DRAG RACE PHILIPPINES
let brigiding = new Queen("Brigiding", 6, 5, 8, 8, 4, 9, 10, "Brigiding");
let corazon = new Queen("Corazon", 4, 5, 4, 3, 4, 7, 5, "Corazon");
let eva = new Queen("Eva Le Queen", 6, 9, 8, 7, 8, 10, 8, "EvaLeQueen");
let gigiEra = new Queen("Gigi Era", 5, 5, 4, 5, 5, 6, 7, "GigiEra");
let morgana = new Queen("Lady Morgana", 6, 6, 7, 7, 5, 8, 11, "LadyMorgana");
let marinaSummers = new Queen("Marina Summers", 6, 9, 12, 9, 10, 12, 10, "MarinaSummers");
let minty = new Queen("Minty Fresh", 6, 5, 4, 12, 4, 11, 9, "MintyFresh");
let precious = new Queen("Precious Paula Nicole", 8, 8, 10, 7, 9, 9, 9, "PreciousPaulaNicole");
let prince = new Queen("Prince", 4, 4, 4, 4, 4, 7, 4, "Prince");
let turing = new Queen("Turing", 6, 6, 9, 6, 6, 7, 9, "Turing");
let vinas = new Queen("Viñas DeLuxe", 6, 8, 8, 10, 8, 11, 7, "VinasDeLuxe");
let xilhouete = new Queen("Xilhouete", 6, 10, 6, 8, 11, 10, 8, "Xilhouete");
let drph = [brigiding, corazon, eva, gigiEra, morgana, marinaSummers, minty, precious, prince, turing, vinas, xilhouete];
//SPECIAL 
let pangina = new Queen("Pangina Heals", 9, 7, 14, 11, 8, 13, 14, "Pangina");
let ukvstw = [baga, blu, cheryl, janey, jimbo, jujubee, lemon, monique, pangina];
let canvstw = [anita, icesis, kendall, rajah, rita, silky, stephanie, victoriaS, vanity];
//all possible queens:
let allCustomQueens = [];
if (localStorage.getItem("customQueens") != null)
    allCustomQueens = JSON.parse(localStorage.getItem("customQueens") || "{}");
let customLength = allCustomQueens.length;
for (let i = 0; i < customLength; i++) {
    let queen = new Queen('', 0, 0, 0, 0, 0, 0, 0, '');
    Object.assign(queen, allCustomQueens[i]);
    allCustomQueens.push(queen);
}
allCustomQueens.splice(0, customLength);
let allQueens = [
    akashia, bebe, jade, ninaf, ongina, rebecca, shannel, tammie, victoria,
    jessica, jujubee, morgan, mystique, nicole, pandora, raven, sahara, shangela, sonique, tatianna, tyra,
    alexis, carmen, delta, india, manila, mariah, mimi, phoenix, raja, stacey, venus, yara,
    alisa, chad, dida, jiggly, kenya, leshauwn, latrice, madame, milan, phiphi, princess, willam,
    alaska, alyssa, coco, detox, honey, ivy, jadejolie, jinkx, lineysha, monica, penny, roxxxy, serena, vivienne,
    adore, april, bendelacreme, bianca, courtney, darienne, gia, joslyn, kelly, laganja, magnolia, milk, trinityk, vivacious,
    ginger, jaidynn, jasmine, kandy, katya, kennedy, max, fame, kasha, pearl, sashab, tempest, trixie, violet,
    acid, bob, chichi, cynthia, dax, derrick, kim, laila, naomi, naysha, robbie, thorgy,
    aja, alexism, charlie, eureka, farrah, jaymes, kimora, ninab, peppermint, sasha, shea, trinity, valentina,
    aquaria, asia, blair, dusty, kalorie, kameron, mayhem, miz, monet, monique, vanessa, vixen, yuhua,
    akeria, ariel, brooke, honeyd, kahanna, mercedes, ninaw, plastique, rajah, scarlet, shuga, silky, yvie,
    aiden, brita, crystal, dahlia, gigi, heidi, jackie, jaida, jan, nicky, rock, widow,
    denali, elliott, mik, joey, kahmora, kandym, lala, olivia, rose, symone, tamisha, tina, utica,
    alyssaH, angeria, bosco, daya, deja, jasmineK, jorgeous, june, kerri, kornbread, cadmen, maddy, orion, willow,
    amethyst, anetra, auraMayari, irene, jax, loosey, luxx, malaysia, marcia, mistress, poppy, robin, salina, sashaColby, spice, sugar,
    baga, blu, cheryl, crystaluk, divina, gothy, scaredy, sumting, viv, vinegar,
    awhora, asttina, bimini, cherry, ellie, ginny, joe, lawrence, sister, tayce, tia, veronica,
    anubis, charity, choriza, elektraF, ella, kitty, krystal, river, scarlett, vanity, victoriaS,
    baby, black, cheddar, copper, dakota, danny, jonbers, just, leFil, pixie, sminty, starlet,
    anastarzia, boa, ilona, jimbo, juice, kiara, kyne, lemon, priyanka, rita, bobo, tynomi,
    adriana, beth, eve, giametric, icesis, kendall, kimoraA, oceane, pythia, stephanie, suki, synthia,
    bombae, chelazon, gisele, halal, irma, jadashada, kaos, kimmy, boomboom, fiercalicious, moco, vanderpuss,
    chelsea, envy, janey, madamem, mama, megan, abby, patty, roem, sederginne,
    ivyelise, juicy, keta, love, mlp, reggy, tabitha, countess, vanessaC, vivaldi,
    amadiva, annee, b, bunny, dearis, jaja, meannie, morrigan, natalia, petchra,
    angele, bandit, genie, kana, kandyz, katy, m, maya, mocha, gimhuay, silver, srimala, tormai, vanda,
    anita, art, cocoj, elektra, etc, jojo, karen, kita, maxi,
    aubrey, beverly, faux, hannah, kweenKong, minnie, molly, pomara, spankie, yuri,
    arantxa, carmenf, dovima, drag, hugaceo, inti, killer, pupi, sagittaria, macarena,
    arielRec, diamante, sethlas, estrella, jota, juriji, marina, marisa, onyx, samantha, sharonne, venedita,
    ava, divinity, elecktra, enorma, farida, ivana, riche, luquisha,
    aura, gioffre, diamond, petite, narciso, nehellenia, obama, panthera, skandalove, tanissa,
    elips, kam, bigbertha, briochee, grandedame, kahena, lolita, lova, paloma, soa,
    brigiding, corazon, eva, gigiEra, morgana, marinaSummers, minty, precious, prince, turing, vinas, xilhouete,
    pangina
].concat(allCustomQueens).sort((a, b) => a.getName().toLowerCase().localeCompare(b.getName().toLowerCase()));
let allQueensCopy = [];
let allQueensCopy2 = [];
let randomReturn = false;
let chooseReturn = false;
let voteReturn = false;
let conjoinedQueens = false;
let queensOfComedy = false;
let kittyGirlGroup = false;
let lalaparuza = false;
let smackdown = false;
function CheckForReturning() {
    if ((randomReturn || chooseReturn || voteReturn) && currentCast.length < totalCastSize - 3 && returningQueen == false && eliminatedCast.length > 0) {
        if (randomNumber(100) < 5 * episodeCount || currentCast.length == 5) {
            returningQueen = true;
            return true;
        }
        return false;
    }
    if (smackdown && currentCast.length == 4 && (top4 || lftc || canFinale || allstars3Finale || teamsF) && returningQueen == false || smackdown && currentCast.length == 3 && returningQueen == false && top3 || smackdown && currentCast.length == 2 && returningQueen == false && top2 || smackdown && currentCast.length == 5 && returningQueen == false && top5) {
        returningQueen = true;
        return true;
    }
    if (lalaparuza && !returningQueen && (currentCast.length - eliminatedCast.length) >= 0 && (currentCast.length - eliminatedCast.length) < 3 && !all_stars || lalaparuza && !returningQueen && (currentCast.length - eliminatedCast.length) >= 1 && (currentCast.length - eliminatedCast.length) < 3 && all_stars) {
        returningQueen = true;
        return true;
    }
    if (queensOfComedy && currentCast.length == Math.round((totalCastSize / 2)) && returningQueen == false && totalCastSize > 8){
        returningQueen = true;
        return true;
    }
    if (kittyGirlGroup && currentCast.length == Math.round((totalCastSize / 2)) && returningQueen == false && totalCastSize > 8){
        returningQueen = true;
        return true;
    }
    if (conjoinedQueens && currentCast.length == Math.round((totalCastSize / 2)) && returningQueen == false && totalCastSize > 8){
        returningQueen = true;
        return true;
    }
    return false;
}
function returningQueenScreen() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("A lovely surprise...");
    if (randomReturn && returningQueen)
        queenReturns(returningQueen);
    if (chooseReturn && returningQueen)
        queenReturnsChoose(returningQueen);
    if (voteReturn && returningQueen)
        queenReturnsVote(returningQueen);
    if (conjoinedQueens && returningQueen)
        queensConjoined(returningQueen);
    if (smackdown && returningQueen)
        lipsyncSmackdown(returningQueen);
    if (lalaparuza && returningQueen)
        LaLaPaRUza(returningQueen);
    if (queensOfComedy && returningQueen)
        queensofComedy(returningQueen);
    if (kittyGirlGroup && returningQueen)
        kittygirlGroup(returningQueen);
    screen.createButton("Proceed", "newEpisode()");
    if ((randomReturn || chooseReturn) && document.querySelector("button[onclick='fijarReturningQueen()']") || queensOfComedy && document.querySelector("button[onclick='queensofComedyJudging(pairQOF, qofcomedy)']") || kittyGirlGroup && document.querySelector("button[onclick='kittygirlGroupJudging()']")){
        let button = document.querySelector("button[onclick='newEpisode()']");
        button.setAttribute("hidden", "hidden");
    }
}
function queenReturnsChoose(mal = "") {
    if (mal) {
        contestantProgress();
        let screen = new Scene();
        screen.createBold("I've decided that one of my queens have gone a bit too soon... I'd like to welcome back...");
        let main = document.querySelector("div#MainBlock");
        let castSelection = document.createElement("p");
        castSelection.setAttribute("id", "castSelection");
        castSelection.innerHTML = '';
        let select = document.createElement("select");
        select.setAttribute("id", "queenList");
        select.setAttribute("onchange", "returnImg()");
        let img = document.createElement("img");
        img.setAttribute("id", "images");
        img.setAttribute("style", "width: 105px; height: 105px;");
        let p = document.createElement("p");
        p.appendChild(img);
        for (let k = 0; k < eliminatedCast.length; k++) {
            let option = document.createElement("option");
            option.innerHTML = eliminatedCast[k].getName();
            option.value = eliminatedCast[k].image;
            select.add(option);
        }
        select.selectedIndex = randomNumber(eliminatedCast.length);
        let br = document.createElement("br");
        castSelection.appendChild(p);
        castSelection.appendChild(select);
        castSelection.appendChild(br);
        main.appendChild(castSelection);
        returnImg();
        screen.createButton("Lock Queen", "fijarReturningQueen()", "fijar");
    }
}
function queenReturns(pass = "") {
    if (pass) {
        contestantProgress();
        let screen = new Scene();
        screen.createBold("I've decided that one of my queens have gone a bit too soon... I'd like to welcome back...");
        let queen = pickRandomlyFromArray(eliminatedCast);
        while (queen.QueenDisqOrDept != false) {
            queen = pickRandomlyFromArray(eliminatedCast);
        }
        currentCast.push(queen);
        eliminatedCast.splice(eliminatedCast.indexOf(queen), 1);
        screen.createImage(queen.image, "aquamarine");
        screen.createBold(queen.getName());
        if (s14Premiere && queen.retEp != 0) {
            queen.retEp2 = episodeCount+1;
        } else {
            queen.retEp = episodeCount+1;
        }
        quitarDoubleElim(queen);
    }
}
function fijarReturningQueen() {
    let screen = new Scene();
    let select = document.getElementById("queenList");
    let value = select.options[select.selectedIndex].text;
    let button = document.getElementById("fijar");
    let newEpisodeB = document.querySelector("button[onclick='newEpisode()']");
    let queen;
    for (let k = 0; k < eliminatedCast.length; k++) {
        if (value == eliminatedCast[k].getName()){
            queen = eliminatedCast[k];
        }
    }
    button.remove();
    select.remove();
    screen.createBold(queen.getName());
    newEpisodeB.removeAttribute("hidden");
    currentCast.push(queen);
    eliminatedCast.splice(eliminatedCast.indexOf(queen), 1);
    if (s14Premiere && queen.retEp != 0) {
        queen.retEp2 = episodeCount+1;
    } else {
        queen.retEp = episodeCount+1;
    }
    quitarDoubleElim(queen);
}
function quitarDoubleElim(queen) {
    let otherTie;
    if (queen.rankP == "tie1") {
        otherTie = eliminatedCast.find(elimQ => {
            return elimQ.rankP == "tie2"
        });
        otherTie.rankP = 0;
    }
    if (queen.rankP == "tie2") {
        otherTie = eliminatedCast.find(elimQ => {
            return elimQ.rankP == "tie1"
        });
        otherTie.rankP = 0;
    }
    queen.rankP = 0;
}
function returnImg() {
    let images = document.getElementById("images");
    //let img = document.getElementById("image" + i.toString());
    let select = document.getElementById("queenList");
    images.src = select.options[select.selectedIndex].value;
}
function queenReturnsVote(contra = "") {
    if (contra) {
        let screen = new Scene();
        for (let i = 0; i < eliminatedCast.length; i++) {
            eliminatedCast[i].votes = 0;
        }
        screen.createParagraph("I've decided that one of my queens deserve a second chance... you'll vote for which of the eliminated queens will come back!");
        screen.createHorizontalLine();
        screen.createBold("The queens vote...");
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].lipstick = bestSister(currentCast[i], eliminatedCast);
            screen.createImage(currentCast[i].image, "black");
            screen.createImage(currentCast[i].lipstick.image, "black");
            currentCast[i].lipstick.votes++;
            screen.createBold(`${currentCast[i].getName()} voted for ${currentCast[i].lipstick.getName()}!`);
        }
        for (let i = 0; i < eliminatedCast.length; i++) {
            screen.createBold(`${eliminatedCast[i].getName()}: ${eliminatedCast[i].votes.toString()} votes`);
        }
        screen.createHorizontalLine();
        let queen = [...eliminatedCast].sort((a, b) => b.votes - a.votes)[0];
        screen.createImage(queen.image);
        screen.createBold(`${queen.getName()} returns to the competition!`);
        currentCast.push(queen);
        eliminatedCast.splice(eliminatedCast.indexOf(queen), 1);
        if (s14Premiere && queen.retEp != 0) {
            queen.retEp2 = episodeCount+1;
        } else {
            queen.retEp = episodeCount+1;
        }
        queen.votes = 0;
        quitarDoubleElim(queen);
        screen.createButton("Proceed", "newEpisode()");
    }
}
function lipsyncSmackdown(word = "") {
    if (word) {
        let screen = new Scene();
        screen.clean();
        document.body.style.backgroundImage = "url('image/smackdown.webp')";
        screen.createHeader("Let the Lipsync Smackdown begin!!");
        screen.createParagraph("The eliminated contestants are back to compete in an epic Lipsync Smackdown and a chance to return to the competition.");
        let smack = eliminatedCast.slice();
        let wholeCastSmack = [...currentCast, ...eliminatedCast];
        let double = false;
        let lipsync = [];
        let pivot = 100;
        let chocPiv = 100;
        let quitPiv = 100;
        for (let i = 0; i < wholeCastSmack.length; i++) {
            if (wholeCastSmack[i].trackRecord.find(track => {return track == " BTM2"}) != undefined) {
                pivot = wholeCastSmack[i].trackRecord.indexOf(" BTM2");
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "WIN BTM2"}) != undefined) {
                pivot = wholeCastSmack[i].trackRecord.indexOf("WIN BTM2");
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "CHOC"}) != undefined) {
                chocPiv = wholeCastSmack[i].trackRecord.indexOf("CHOC");
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "WINCHOC"}) != undefined) {
                chocPiv = wholeCastSmack[i].trackRecord.indexOf("WINCHOC");
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "QUIT"}) != undefined) {
                quitPiv = wholeCastSmack[i].trackRecord.indexOf("QUIT");
                smack.splice(smack.indexOf(wholeCastSmack[i]), 1);
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "DISQ"}) != undefined) {
                quitPiv = wholeCastSmack[i].trackRecord.indexOf("DISQ");
                smack.splice(smack.indexOf(wholeCastSmack[i]), 1);
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "DEPT"}) != undefined) {
                quitPiv = wholeCastSmack[i].trackRecord.indexOf("DEPT");
                smack.splice(smack.indexOf(wholeCastSmack[i]), 1);
            }
            if (wholeCastSmack[i].trackRecord.find(track => {return track == "WIN+QUIT"}) != undefined) {
                quitPiv = wholeCastSmack[i].trackRecord.indexOf("WIN+QUIT");
                smack.splice(smack.indexOf(wholeCastSmack[i]), 1);
            }
            if (s14Premiere || s12Premiere || s6Premiere || porkchopPremiere) {
                if (s6Premiere && wholeCastSmack[i] == eliminatedCast[eliminatedCast.length - 1] && eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "ELIM") {
                    //nothing
                } else {
                    wholeCastSmack[i].trackRecord[wholeCastSmack[i].trackRecord.indexOf('')] = "icon";
                }
            }
            if (s9Premiere && wholeCastSmack[i] == lateQueen) {
                wholeCastSmack[i].trackRecord[wholeCastSmack[i].trackRecord.indexOf('')] = "icon";
            }
        }
        if (eliminatedCast[eliminatedCast.length - 1].trackRecord[0] != " ELIM ") {
            eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf('')] = "icon";
        }
        if (eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "QUIT" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "DISQ" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "DEPT" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "WIN+QUIT") {
            eliminatedCast[eliminatedCast.length - 2].trackRecord[eliminatedCast[eliminatedCast.length - 2].trackRecord.indexOf('')] = "icon";
        }
        if (slayersSmack != 0) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[slayersSmack] == '') {
                    eliminatedCast[i].trackRecord[slayersSmack] = "icon";
                }
            }
            if (slayersSmack == 2) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf('')] = "icon";
            }
        }
        if (pivot != 100 && pivot != quitPiv) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[pivot] == '' || eliminatedCast[i].trackRecord[chocPiv] == " WIN ") {
                    eliminatedCast[i].trackRecord[pivot + 1] = "icon";
                }
            }
            if (pivot == 1 || pivot == 2 && s9Premiere || pivot == 3 && (s12Premiere || s14Premiere) || pivot == 4 && porkchopPremiere) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf('')] = "icon";
            }
        }
        if (chocPiv != 100) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[chocPiv] == '' || eliminatedCast[i].trackRecord[chocPiv] == " WIN ") {
                    eliminatedCast[i].trackRecord[chocPiv + 1] = "icon";
                }
            }
            if (chocPiv == 1 || chocPiv == 2 && s9Premiere || chocPiv == 3 && (s12Premiere || s14Premiere) || chocPiv == 4 && porkchopPremiere) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf('')] = "icon";
            }
        }
        if (quitPiv != 100) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[quitPiv] == '' || eliminatedCast[i].trackRecord[quitPiv] == " WIN ") {
                    eliminatedCast[i].trackRecord[quitPiv + 1] = "icon";
                }
            }
            if (quitPiv == 1 || quitPiv == 2 && s9Premiere || quitPiv == 3 && (s12Premiere || s14Premiere) || quitPiv == 4 && porkchopPremiere) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf('')] = "icon";
            }
        }
        for (let i = 0; i < eliminatedCast.length - 1; i++) {
            screen.createHorizontalLine();
            let queen1;
            let queen2;
            let queen3;
            if (quitPiv != 100) {i++;}
            if (smack.length == 2) {
                queen1 = smack[1];
                queen2 = smack[0];
            }else{
                queen1 = smack[smack.length - 1];
                queen2 = smack[smack.length - 2];
                if (queen2.trackRecord.find(track => {return track == " ELIM "}) != undefined && i != 0 || queen1.trackRecord.find(track => {return track == " ELIM "}) == undefined && queen2.trackRecord.find(track => {return track == " ELIM "}) != undefined && i == 0) {
                    if (queen1.trackRecord[queen1.trackRecord.indexOf(" ELIM ") + 1] == '' || queen2.trackRecord[queen2.trackRecord.indexOf(" ELIM ") + 1] == '') {
                        queen3 = smack[smack.length - 3];
                    }
                }
            }
            screen.createImage(queen1.image);
            screen.createImage(queen2.image);
            if (queen3 != undefined) {
                screen.createImage(queen3.image);
                screen.createBold(queen1.getName() + ", " + queen2.getName() + " and " + queen3.getName() + " will lipsync...");
                lipsync = [queen1, queen2, queen3];
            } else {
                screen.createBold(queen1.getName() + " and " + queen2.getName() + " will lipsync...");
                lipsync = [queen1, queen2];
            }
            if (randomNumber(1000) >= 999 && !disqOrDept && queen3 == undefined) {
                disqOrDept = true;
                screen.createBold(queen1.getName() + ", it appears that last week's eliminated contestant, " + queen2.getName() +", has turned down the invitation to return for their Rudemption.");
                screen.createImage(queen1.image, "#90ee90");
                screen.createBold(queen1.getName() + ", you will advance in the rudemption smackdown for the crown.");
                if (randomNumber(1000) >= 950) {
                    screen.createImage(queen1.image, "#90ee90");
                    screen.createBold(queen1.getName() + " will still lipsync solo.");
                    queen1.trackRecord[queen1.trackRecord.indexOf('')] = "SOLO";
                } else {
                    queen1.trackRecord[queen1.trackRecord.indexOf('')] = "ADV";
                }
                queen2.trackRecord[queen2.trackRecord.indexOf('')] = "QUIT ";
                smack.splice(smack.indexOf(queen2), 1);
            } else {
                screen.createBold("The time has come for you to lip-sync... for your rudemption! Good luck, and don't fuck it up.");
                let song = lsSong().toString();
                screen.createHorizontalLine();
                let event = checkForLipsyncEvent(lipsync);
                if (event != false) {
                    let eventQueen = lipsync.find( (q) => {
                        return q.getName() == event.queen.getName()
                    });
                    eventQueen.lipsyncScore += event.points;
                }
                toBlots(lipsync, song);
                screen.createBold("I've made my decision.");
                for (let i_1 = 0; i_1 < lipsync.length; i_1++) {
                    lipsync[i_1].getASLipsync();
                }
                lipsync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
                if (lipsync[0].lipsyncScore >= lipsync[1].lipsyncScore && lipsync[0].lipsyncScore > 7 && lipsync[1].lipsyncScore > 7 && smack.length <= 2) {
                    screen.createImage(lipsync[0].image, "darkblue");
                    screen.createImage(lipsync[1].image, "darkblue");
                    screen.createBold("Shantay, you both stay, baby!");
                    double = true;
                } else {
                    screen.createImage(lipsync[0].image, "royalblue");
                    screen.createBold(lipsync[0].getName() + ", shantay you stay! ");
                    if (eliminatedCast.length - i != 2) {
                        lipsync[0].trackRecord[lipsync[0].trackRecord.indexOf('')] = " WIN ";
                        lipsync[1].trackRecord[lipsync[1].trackRecord.indexOf('')] = "LOSS";
                        if (queen3 != undefined) {
                            lipsync[2].trackRecord[lipsync[2].trackRecord.indexOf('')] = "LOSS";
                            screen.createImage(lipsync[2].image, "#FF9E9E");
                            screen.createBold(lipsync[2].getName() + ", sashay away. ");
                            smack.splice(smack.indexOf(lipsync[2]), 1);
                            i++
                        }
                    }
                    screen.createImage(lipsync[1].image, "#FF9E9E");
                    screen.createBold(lipsync[1].getName() + ", sashay away. ");
                }
                smack.splice(smack.indexOf(lipsync[1]), 1);
            }
        }
        for (let o = 0; o <= currentCast.length - 1; o++) {
            currentCast[o].addToTrackRecord("RUN ");
        }
        if (s14Premiere || s12Premiere || s6Premiere || porkchopPremiere || s9Premiere) {
            for (let i = 0; i < wholeCastSmack.length; i++) {
                if (s6Premiere && wholeCastSmack[i] == eliminatedCast[eliminatedCast.length - 1] && eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "ELIM" && !s9Premiere) {
                    //nothing
                } else if (s9Premiere && wholeCastSmack[i] == lateQueen) {
                    wholeCastSmack[i].trackRecord[wholeCastSmack[i].trackRecord.indexOf("icon")] = '';
                } else if (!s9Premiere) {
                    wholeCastSmack[i].trackRecord[wholeCastSmack[i].trackRecord.indexOf("icon")] = '';
                }
            }
        }
        eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf("icon")] = '';
        if (eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "QUIT" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "DISQ" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "DEPT" || eliminatedCast[eliminatedCast.length - 1].trackRecord[0] == "WIN+QUIT") {
            eliminatedCast[eliminatedCast.length - 2].trackRecord[eliminatedCast[eliminatedCast.length - 2].trackRecord.indexOf("icon")] = '';
        }
        if (slayersSmack != 0) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[slayersSmack] == "icon") {
                    eliminatedCast[i].trackRecord[slayersSmack] = '';
                }
            }
            if (slayersSmack == 2) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf("icon")] = '';
            }
        }
        if (pivot != 100 && pivot != quitPiv) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[pivot + 1] == "icon") {
                    eliminatedCast[i].trackRecord[pivot + 1] = '';
                }
            }
            if (pivot == 1) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf("icon")] = '';
            }
        }
        if (chocPiv != 100) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[chocPiv + 1] == "icon") {
                    eliminatedCast[i].trackRecord[chocPiv + 1] = '';
                }
            }
            if (chocPiv == 1) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf("icon")] = '';
            }
        }
        if (quitPiv != 100) {
            for (let i = 0; i < eliminatedCast.length; i++) {
                if (eliminatedCast[i].trackRecord[quitPiv + 1] == "icon") {
                    eliminatedCast[i].trackRecord[quitPiv + 1] = '';
                }
            }
            if (quitPiv == 1) {
                eliminatedCast[eliminatedCast.length - 1].trackRecord[eliminatedCast[eliminatedCast.length - 1].trackRecord.indexOf("icon")] = '';
            }
        }
        if (double) {
            currentCast.push(lipsync[0]);
            currentCast.push(lipsync[1]);
            lipsync[0].addToTrackRecord("RTRN ");
            lipsync[1].addToTrackRecord("RTRN ");
            eliminatedCast.splice(eliminatedCast.indexOf(lipsync[0]), 1);
            eliminatedCast.splice(eliminatedCast.indexOf(lipsync[1]), 1);
            quitarDoubleElim(lipsync[0]);
            quitarDoubleElim(lipsync[1]);
            for (let i = 0; i <= eliminatedCast.length - 1; i++) {
                eliminatedCast[i].addToTrackRecord("OUT ");
            }
        } else {
            lipsync[0].addToTrackRecord("RTRN ");
            currentCast.push(lipsync[0]);
            eliminatedCast.splice(eliminatedCast.indexOf(lipsync[0]), 1);
            quitarDoubleElim(lipsync[0]);
            for (let i = 0; i <= eliminatedCast.length - 1; i++) {
                eliminatedCast[i].addToTrackRecord("OUT ");
            }
        }
        episodeChallenges.push("Lipsync Smackdown");
        episodeCount++;
    }
}
function LaLaPaRUza(sena = "") {
    if (sena) {
        let screen = new Scene();
        screen.clean();
        document.body.style.backgroundImage = "url('image/lalaparuza.webp')";
        screen.createHeader("LaLaPaRUza!!");
        screen.createParagraph("All of the eliminated contestants get a chance to return to the competition. But first they have to send home a competing contestant in a mid season lipsync smackdown.");
        let smack = eliminatedCast.slice();
        let smack1 = currentCast.slice();
        for (let i = 0; i < smack1.length; i++){
            let trds = smack1[i].trackRecord.length - 1;
            if (all_stars || lipsync_assassin) {
                if (smack1[i].trackRecord[trds] == "WIN" || smack1[i].trackRecord[trds] == "WIN " || smack1[i].trackRecord[trds] == " WIN") {
                    screen.createImage(smack1[i].image, "magenta");
                    screen.createBold(smack1[i].getName() + ", as the winner of last week's challenge, you have immunity.");
                    smack1[i].addToTrackRecord("RUN");
                    smack1.splice(i, 1);
                    i--;
                }
            } else if (regularFormat) {
                if (smack1[i].trackRecord[trds] == "WIN" || smack1[i].trackRecord[trds] == " WIN") {
                    screen.createImage(smack1[i].image, "magenta");
                    screen.createBold(smack1[i].getName() + ", as the winner of last week's challenge, you have immunity.");
                    smack1[i].addToTrackRecord("RUN");
                    smack1.splice(i, 1);
                    i--;
                }
            } else if (thailandFormat) {
                if (smack1[i].trackRecord[trds] == " WIN" || smack1[i].trackRecord[trds] == " WINWIN" || smack1[i].trackRecord[trds] == "WINWIN") {
                    screen.createImage(smack1[i].image, "magenta");
                    screen.createBold(smack1[i].getName() + ", as the winner of last week's challenge, you have immunity.");
                    smack1[i].addToTrackRecord("RUN");
                    smack1.splice(i, 1);
                    i--;
                }
            }
        }
        for (let i = 0; i < smack.length; i++) {
            screen.createHorizontalLine();
            if (smack[i].QueenDisqOrDept == true) {
                smack[i].addToTrackRecord('');
                smack.splice(i, 1);
            }
            let queen1 = smack[i];
            let queen2 = worstSister(smack[i], smack1);
            screen.createImage(queen1.image);
            screen.createImage(queen2.image);
            if (smack1.length == 1 && smack[i + 1] != undefined || smack1.length > 1 && smack[i + 1] == undefined) {
                let queen3;
                if (smack1.length > 1 && smack[i + 1] == undefined) {
                    do {
                        queen3 = pickRandomlyFromArray(smack1);
                    } while (queen3 == queen2 || queen3 == undefined);
                } else {
                    queen3 = smack[i+1];
                }
                screen.createImage(queen3.image);
                screen.createBold(queen1.getName() + ", " + queen2.getName() + " and " + queen3.getName() + " will lipsync...");
                lsSong();
                let lipSync_1 = [queen1, queen2, queen3];
                for (let i_1 = 0; i_1 < lipSync_1.length; i_1++) {
                    lipSync_1[i_1].getASLipsync();
                }
                queen1.lipsyncScore -= 4;
                if (smack1.length > 1 && smack[i + 1] == undefined) {
                    lipSync_1.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
                    if (lipSync_1[0].lipsyncScore >= lipSync_1[1].lipsyncScore && lipSync_1[0].lipsyncScore > 7 && lipSync_1[1].lipsyncScore > 7 && lipSync_1[2].lipsyncScore > 7) {
                        screen.createImage(queen1.image, "darkblue");
                        screen.createImage(queen2.image, "darkblue");
                        screen.createImage(queen3.image, "darkblue");
                        screen.createBold("Shantay, you three stay, baby!");
                        currentCast.push(queen1);
                        queen1.addToTrackRecord("RTRN ");
                        quitarDoubleElim(queen1);
                        eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                        queen2.addToTrackRecord("SAFE ");
                        queen3.addToTrackRecord("SAFE ");
                    } else {
                        screen.createImage(lipSync_1[0].image, "royalblue");
                        screen.createImage(lipSync_1[1].image, "royalblue");
                        screen.createBold(lipSync_1[0].getName() + " and " + lipSync_1[1].getName() + ", shantay you stay!");
                        if (queen1 == lipSync_1[2]) {
                            lipSync_1[0].addToTrackRecord("SAFE ");
                            lipSync_1[1].addToTrackRecord("SAFE ");
                            queen1.addToTrackRecord("OUT ");
                        } else {
                            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                                screen.createBold(lipSync_1[2].getName() + ", now your fate rests in the hands of the drag gods.");
                                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                                if (chocolateBarCheck(lipSync_1[2]) == true) {
                                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                                    screen.createImage(lipSync_1[2].image, "gold");
                                    screen.createBold(lipSync_1[2].getName() + "!! Condragulations, you are safe to slay another day!");
                                    lipSync_1[2].addToTrackRecord("CHOC");
                                    lipSync_1[2].unfavoritism += 3;
                                    chocolateBarTwistCheck = true;
                                    if (queen2 != lipSync_1[2]) {
                                        queen2.addToTrackRecord("SAFE ");
                                    }
                                    if (queen3 != lipSync_1[2]) {
                                        queen3.addToTrackRecord("SAFE ");
                                    }
                                } else {
                                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                                    screen.createBold("It's chocolate.");
                                    screen.createImage(lipSync_1[2].image, "red");
                                    screen.createBold(lipSync_1[2].getName() + ", sashay away...");
                                    lipSync_1[2].addToTrackRecord("ELIM");
                                    eliminatedCast.unshift(lipSync_1[2]);
                                    currentCast.splice(currentCast.indexOf(lipSync_1[2]), 1);
                                    lipSync_1[2].unfavoritism += 5;
                                    if (queen2 != lipSync_1[2]) {
                                        queen2.addToTrackRecord("SAFE ");
                                    }
                                    if (queen3 != lipSync_1[2]) {
                                        queen3.addToTrackRecord("SAFE ");
                                    }
                                }
                                currentCast.push(queen1);
                                queen1.addToTrackRecord("RTRN ");
                                eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                                quitarDoubleElim(queen1);
                            } else {
                                screen.createImage(lipSync_1[2].image, "red");
                                screen.createBold(lipSync_1[2].getName() + ", sashay away...");
                                currentCast.push(queen1);
                                queen1.addToTrackRecord("RTRN ");
                                eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                                quitarDoubleElim(queen1);
                                lipSync_1[2].addToTrackRecord("ELIM");
                                eliminatedCast.unshift(lipSync_1[2]);
                                currentCast.splice(currentCast.indexOf(lipSync_1[2]), 1);
                                lipSync_1[2].unfavoritism += 5;
                                if (queen2 != lipSync_1[2]) {
                                    queen2.addToTrackRecord("SAFE ");
                                }
                                if (queen3 != lipSync_1[2]) {
                                    queen3.addToTrackRecord("SAFE ");
                                }
                            }
                        }
                    }
                } else {
                    queen3.lipsyncScore -= 4;
                    lipSync_1.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
                    if (lipSync_1[0].lipsyncScore >= lipSync_1[1].lipsyncScore && lipSync_1[0].lipsyncScore > 7 && lipSync_1[1].lipsyncScore > 7 && lipSync_1[2].lipsyncScore > 7) {
                        screen.createImage(queen1.image, "darkblue");
                        screen.createImage(queen2.image, "darkblue");
                        screen.createImage(queen3.image, "darkblue");
                        screen.createBold("Shantay, the three of you stay, baby!");
                        currentCast.push(queen1);
                        queen1.addToTrackRecord("RTRN ");
                        quitarDoubleElim(queen1);
                        eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                        queen2.addToTrackRecord("SAFE ");
                        currentCast.push(queen3);
                        queen3.addToTrackRecord("RTRN ");
                        quitarDoubleElim(queen3);
                        eliminatedCast.splice(eliminatedCast.indexOf(queen3), 1);
                        i++;
                    } else if (lipSync_1[0].lipsyncScore >= lipSync_1[1].lipsyncScore && lipSync_1[0].lipsyncScore > 7 && lipSync_1[1].lipsyncScore > 7) {
                        screen.createImage(lipSync_1[0].image, "darkblue");
                        screen.createImage(lipSync_1[1].image, "darkblue");
                        screen.createBold(lipSync_1[0].getName() + ", " + lipSync_1[1].getName() + ". Shantay, you both stay, baby!");
                        if (queen2 == lipSync_1[2]) {
                            currentCast.push(lipSync_1[0]);
                            lipSync_1[0].addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(lipSync_1[0]), 1);
                            currentCast.push(lipSync_1[1]);
                            lipSync_1[1].addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(lipSync_1[1]), 1);
                            quitarDoubleElim(lipSync_1[0]);
                            quitarDoubleElim(lipSync_1[1]);
                            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                                screen.createBold(lipSync_1[2].getName() + ", now your fate rests in the hands of the drag gods.");
                                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                                if (chocolateBarCheck(lipSync_1[2]) == true) {
                                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                                    screen.createImage(lipSync_1[2].image, "gold");
                                    screen.createBold(lipSync_1[2].getName() + "!! Condragulations, you are safe to slay another day!");
                                    lipSync_1[2].addToTrackRecord("CHOC");
                                    lipSync_1[2].unfavoritism += 3;
                                    chocolateBarTwistCheck = true;
                                } else {
                                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                                    screen.createBold("It's chocolate.");
                                    screen.createImage(lipSync_1[2].image, "red");
                                    screen.createBold(lipSync_1[2].getName() + ", sashay away...");
                                    lipSync_1[2].addToTrackRecord("ELIM");
                                    eliminatedCast.unshift(lipSync_1[2]);
                                    currentCast.splice(currentCast.indexOf(lipSync_1[2]), 1);
                                    lipSync_1[2].unfavoritism += 5;
                                }
                            } else {
                                screen.createImage(lipSync_1[2].image, "red");
                                screen.createBold(lipSync_1[2].getName() + ", sashay away...");
                                queen2.addToTrackRecord("ELIM");
                                eliminatedCast.unshift(queen2);
                                currentCast.splice(currentCast.indexOf(queen2), 1);
                                queen2.unfavoritism += 5;
                            }
                        } else if (queen3 == lipSync_1[2]){
                            currentCast.push(queen1);
                            queen1.addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                            queen2.addToTrackRecord("SAFE ");
                            queen3.addToTrackRecord("OUT ");
                        } else {
                            currentCast.push(queen3);
                            queen3.addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(queen3), 1);
                            queen2.addToTrackRecord("SAFE ");
                            queen1.addToTrackRecord("OUT ");
                        }
                        quitarDoubleElim(lipSync_1[0]);
                        quitarDoubleElim(lipSync_1[1]);
                        i++;
                    } else {
                        screen.createImage(lipSync_1[0].image, "royalblue");
                        screen.createBold(lipSync_1[0].getName() + ", shantay you stay!");
                        if (queen1 == lipSync_1[0]) {
                            currentCast.push(lipSync_1[0]);
                            lipSync_1[0].addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(lipSync_1[0]), 1);
                            screen.createImage(queen3.image, "red");
                            screen.createBold(queen3.getName() + ", sashay away...");
                            queen3.addToTrackRecord("OUT ");
                            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                                screen.createBold(queen2.getName() + ", now your fate rests in the hands of the drag gods.");
                                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                                if (chocolateBarCheck(queen2) == true) {
                                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                                    screen.createImage(queen2.image, "gold");
                                    screen.createBold(queen2.getName() + "!! Condragulations, you are safe to slay another day!");
                                    queen2.addToTrackRecord("CHOC");
                                    queen2.unfavoritism += 3;
                                    chocolateBarTwistCheck = true;
                                } else {
                                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                                    screen.createBold("It's chocolate.");
                                    screen.createImage(queen2.image, "red");
                                    screen.createBold(queen2.getName() + ", sashay away...");
                                    queen2.addToTrackRecord("ELIM");
                                    eliminatedCast.unshift(queen2);
                                    currentCast.splice(currentCast.indexOf(queen2), 1);
                                    queen2.unfavoritism += 5;
                                }
                            } else {
                                screen.createImage(queen2.image, "red");
                                screen.createBold(queen2.getName() + ", sashay away...");
                                queen2.addToTrackRecord("ELIM");
                                eliminatedCast.unshift(queen2);
                                currentCast.splice(currentCast.indexOf(queen2), 1);
                                queen2.unfavoritism += 5;
                            }
                        }else if (queen3 == lipSync_1[0]){
                            currentCast.push(lipSync_1[0]);
                            lipSync_1[0].addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(lipSync_1[0]), 1);
                            queen1.addToTrackRecord("OUT ");
                            screen.createImage(queen1.image, "red");
                            screen.createBold(queen1.getName() + ", sashay away...");
                            queen1.addToTrackRecord("OUT ");
                            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                                screen.createBold(queen2.getName() + ", now your fate rests in the hands of the drag gods.");
                                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                                if (chocolateBarCheck(queen2) == true) {
                                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                                    screen.createImage(queen2.image, "gold");
                                    screen.createBold(queen2.getName() + "!! Condragulations, you are safe to slay another day!");
                                    queen2.addToTrackRecord("CHOC");
                                    queen2.unfavoritism += 3;
                                    chocolateBarTwistCheck = true;
                                } else {
                                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                                    screen.createBold("It's chocolate.");
                                    screen.createImage(queen2.image, "red");
                                    screen.createBold(queen2.getName() + ", sashay away...");
                                    queen2.addToTrackRecord("ELIM");
                                    eliminatedCast.unshift(queen2);
                                    currentCast.splice(currentCast.indexOf(queen2), 1);
                                    queen2.unfavoritism += 5;
                                }
                            } else {
                                queen2.addToTrackRecord("ELIM");
                                eliminatedCast.unshift(queen2);
                                currentCast.splice(currentCast.indexOf(queen2), 1);
                                queen2.unfavoritism += 5;
                            }
                        } else {
                            lipSync_1[0].addToTrackRecord("SAFE ");
                            queen1.addToTrackRecord("OUT ");
                            queen3.addToTrackRecord("OUT ");
                        }
                        quitarDoubleElim(lipSync_1[0]);
                        i++;
                    }
                }
            }else{
                screen.createBold(queen1.getName() + " and " + queen2.getName() + " will lipsync...");
                screen.createBold("The time has come for you to lip-sync... for your lives! Good luck, and don't fuck it up.");
                lsSong();
                screen.createBold("I've made my decision.");
                let lipSync = [queen1, queen2];
                for (let i_1 = 0; i_1 < lipSync.length; i_1++) {
                    lipSync[i_1].getASLipsync();
                }
                queen1.lipsyncScore -= 4;
                lipSync.sort(function (a, b) { return (b.lipsyncScore - a.lipsyncScore); });
                if (lipSync[0].lipsyncScore >= lipSync[1].lipsyncScore && lipSync[0].lipsyncScore > 7 && lipSync[1].lipsyncScore > 7) {
                    screen.createImage(queen1.image, "darkblue");
                    screen.createImage(queen2.image, "darkblue");
                    screen.createBold("Shantay, you both stay baby!");
                    currentCast.push(queen1);
                    queen1.addToTrackRecord("RTRN ");
                    quitarDoubleElim(queen1);
                    eliminatedCast.splice(eliminatedCast.indexOf(queen1), 1);
                    queen2.addToTrackRecord("SAFE ");
                } else {
                    screen.createImage(lipSync[0].image, "royalblue");
                    screen.createBold(lipSync[0].getName() + ", shantay you stay! ");
                    if (queen1 == lipSync[0]) {
                        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                            screen.createBold(lipSync[1].getName() + ", now your fate rests in the hands of the drag gods.");
                            screen.createBold("If you have the golden chocolate bar, you will be safe.");
                            if (chocolateBarCheck(lipSync[1]) == true) {
                                currentCast.push(lipSync[0]);
                                lipSync[0].addToTrackRecord("RTRN ");
                                eliminatedCast.splice(eliminatedCast.indexOf(lipSync[0]), 1);
                                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                                screen.createImage(lipSync[1].image, "gold");
                                screen.createBold(lipSync[1].getName() + "!! Condragulations, you are safe to slay another day!");
                                lipSync[1].addToTrackRecord("CHOC");
                                lipSync[1].unfavoritism += 3;
                                chocolateBarTwistCheck = true;
                            } else {
                                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                                screen.createBold("It's chocolate.");
                                screen.createImage(lipSync[1].image, "red");
                                screen.createBold(lipSync[1].getName() + ", sashay away. ");
                                currentCast.push(lipSync[0]);
                                lipSync[0].addToTrackRecord("RTRN ");
                                eliminatedCast.splice(eliminatedCast.indexOf(lipSync[0]), 1);
                                lipSync[1].addToTrackRecord("ELIM");
                                eliminatedCast.unshift(lipSync[1]);
                                currentCast.splice(currentCast.indexOf(lipSync[1]), 1);
                                lipSync[1].unfavoritism += 5;
                                
                            }
                        } else {
                            screen.createImage(lipSync[1].image, "red");
                            screen.createBold(lipSync[1].getName() + ", sashay away. ");
                            currentCast.push(lipSync[0]);
                            lipSync[0].addToTrackRecord("RTRN ");
                            eliminatedCast.splice(eliminatedCast.indexOf(lipSync[0]), 1);
                            lipSync[1].addToTrackRecord("ELIM");
                            eliminatedCast.unshift(lipSync[1]);
                            currentCast.splice(currentCast.indexOf(lipSync[1]), 1);
                            lipSync[1].unfavoritism += 5;
                        }
                        quitarDoubleElim(lipSync[0]);
                    }else{
                        screen.createImage(lipSync[1].image, "red");
                        screen.createBold(lipSync[1].getName() + ", sashay away. ");
                        lipSync[0].addToTrackRecord("SAFE ");
                        lipSync[1].addToTrackRecord("OUT ");
                    }
                }
            }
            smack1.splice(smack1.indexOf(queen2), 1);
        }
        episodeChallenges.push("LaLaPaRUza");
        episodeCount++;
    }
}
let pairQOF = [];
let qofcomedy = [];
function queensofComedy(pord = "") {
    if (pord) {
        pairQOF = [];
        qofcomedy = [];
        episodeCount++;
        for (var i = 0; i < currentCast.length; i++){
            currentCast[i].episodesOn++;
        }
        episodeChallenges.push("Queens of Comedy");
        top2 = [];
        bottomQueens = [];
        let screen = new Scene();
        screen.clean();
        document.body.style.backgroundImage = "url('image/queensofcomedy.webp')";
        qofcomedy = currentCast.slice();
        let allofthem = [...currentCast, ...eliminatedCast];
        screen.createHeader("Queens of Comedy!!");
        screen.createParagraph("All of the eliminated All Stars get a chance to return to the competition. The queens must perform a live stand-up comedy act in front of an audience of judgmental drag queens!!");
        screen.createHorizontalLine();
        screen.createBold("The returning queens get to choose their partner... Starting with the last queen eliminated...");
        for (let i = 0; i < eliminatedCast.length; i++){
            if (eliminatedCast[i].QueenDisqOrDept == true){
                eliminatedCast[i].addToTrackRecord("");
            } else {
                screen.createImage(eliminatedCast[i].image);
                let queen = bestSister(eliminatedCast[i], qofcomedy);
                if (qofcomedy.find(q => { return q.getName() == queen.getName()}) == undefined) {
                    queen = pickRandomlyFromArray(qofcomedy);
                }
                qofcomedy.splice(qofcomedy.indexOf(queen), 1);
                screen.createImage(queen.image);
                screen.createBold(eliminatedCast[i].getName() + " chose " + queen.getName());
                eliminatedCast[i].getComedy();
                queen.getComedy();
                let sumComedy = eliminatedCast[i].performanceScore + queen.performanceScore;
                let team = new Team(eliminatedCast[i], queen);
                team.performanceScore = sumComedy;
                pairQOF.push(team);
            }
        }
        if (qofcomedy.length == 1) {
            screen.createImage(qofcomedy[0].image);
            screen.createBold("That means " + qofcomedy[0].getName() + " will work solo as the emcee of the show.");
            qofcomedy[0].getComedy();
        }
        screen.createHorizontalLine();
        sortPerformances(pairQOF);
        screen.createBigText("Queens' performances...");
        let slay = allofthem.filter(function (queen) { return queen.performanceScore < 6; });
        let great = allofthem.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
        let good = allofthem.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
        let bad = allofthem.filter(function (queen) { return queen.performanceScore >= 26 && queen.performanceScore < 31; });
        let flop = allofthem.filter(function (queen) { return queen.performanceScore >= 31 && queen.performanceScore < 50; });
        createPerformanceDesc(slay, great, good, bad, flop);
        comedyChallengeCounter++;
        screen.createHorizontalLine();
        screen.createButton("Proceed", "queensofComedyJudging(pairQOF, qofcomedy)");
    }
}
function queensofComedyJudging(pairs, qofcomedy) {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging");
    screen.createImage(pairs[0].QueenA.image, "aquamarine");
    screen.createImage(pairs[0].QueenB.image, "aquamarine");
    screen.createImage(pairs[1].QueenA.image, "aquamarine");
    screen.createImage(pairs[1].QueenB.image, "aquamarine");
    screen.createBold(pairs[0].QueenA.getName() + ", " + pairs[0].QueenB.getName() + " and " + pairs[1].QueenA.getName() + ", " + pairs[1].QueenB.getName() + ". You are the top All Stars of the week.");
    top2.push(pairs[0].QueenA);
    top2.push(pairs[1].QueenA);
    pairs[0].QueenB.addToTrackRecord("  WIN");
    pairs[0].QueenB.favoritism += 5;
    pairs[0].QueenB.ppe += 5;
    pairs[1].QueenB.addToTrackRecord("  WIN");
    pairs[1].QueenB.favoritism += 5;
    pairs[1].QueenB.ppe += 5;
    // comparar solo queen to the worst duos.
    if (qofcomedy.length == 1 && qofcomedy[0].performanceScore > pairs[pairs.length - 2].QueenB.performanceScore){
        let asecond = pairs[pairs.length - 2].QueenB;
        pairs[pairs.length - 2].QueenB = qofcomedy[0];
        qofcomedy[0] = asecond;
    }
    for (let i = 2; i < pairs.length - 2; i++){
        screen.createImage(pairs[i].QueenB.image, "black");
        pairs[i].QueenB.addToTrackRecord("SAFE");
        pairs[i].QueenA.addToTrackRecord("OUT ");
        pairs[i].QueenB.ppe += 3;
    }
    if (qofcomedy.length == 1) {
        screen.createImage(qofcomedy[0].image, "black");
        qofcomedy[0].addToTrackRecord("SAFE");
        qofcomedy[0].ppe += 3;
    }
    screen.createBold("", "safe");
    let safe = document.querySelector("b#safe");
    for (let i = 2; i < pairs.length - 2; i++){
        safe.innerHTML += pairs[i].QueenB.getName() + ", ";
    }
    if (qofcomedy.length == 1) {
        safe.innerHTML +=  qofcomedy[0].getName() + ", you are safe.";
    }else{
        safe.innerHTML +=  "you are safe.";
    }
    screen.createImage(pairs[pairs.length - 1].QueenB.image, "red");
    screen.createImage(pairs[pairs.length - 2].QueenB.image, "red");
    screen.createBold(pairs[pairs.length - 1].QueenB.getName() + ", " + pairs[pairs.length - 2].QueenB.getName() + "...", "bottom");
    pairs[pairs.length - 1].QueenA.addToTrackRecord("OUT ");
    pairs[pairs.length - 2].QueenA.addToTrackRecord("OUT ");
    bottomQueens.push(pairs[pairs.length - 1].QueenB);
    bottomQueens.push(pairs[pairs.length - 2].QueenB);
    let bottom = document.querySelector("b#bottom");
    bottom.innerHTML += " I'm sorry my dears but you are up for elimination.";
    screen.createHorizontalLine();
    screen.createBigText("After deliberation...");
    for (let i = 0; i < 2; i++) {
        if (randomNumber(100) <= 45)
            pairs[i].QueenA.lipstick = pairs[pairs.length - 1].QueenB;
        else
            pairs[i].QueenA.lipstick = pairs[randomNumberWithMin(pairs.length - 2, pairs.length - 1)].QueenB; // what is this TODO
        screen.createImage(pairs[i].QueenA.image, "cyan");
        screen.createImage(pairs[i].QueenA.lipstick.image, "red");
        screen.createBold(pairs[i].QueenA.getName() + " chose " + pairs[i].QueenA.lipstick.getName() + "'s lipstick!", "winV", "winVP");
    }
    screen.createHorizontalLine();
    screen.createButton("Proceed", "returnLipsync()");
}
function returnLipsync() {
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your LIFE!!! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    if (queensOfComedy) {
        screen.createButton("Show result", "queensOfComedyLipsynJudging()");
    } else if (kittyGirlGroup) {
        screen.createButton("Show result", "topKittyWinLipsyncJudging()");
    }
}
function queensOfComedyLipsynJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Ladies, I've made my decision...");
    if (top2[0].lipsyncScore == top2[1].lipsyncScore && top2[0].lipsyncScore > 6 && top2[1].lipsyncScore > 6 && currentCast.length > 5) {
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].episodesOn++;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[1].episodesOn++;
        top2[0].addToTrackRecord("WIN+RTRN");
        currentCast.unshift(top2[0]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[0]), 1);
        quitarDoubleElim(top2[0]);
        top2[1].addToTrackRecord("WIN+RTRN");
        currentCast.unshift(top2[1]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[1]), 1);
        quitarDoubleElim(top2[1]);
        screen.createHorizontalLine();
        assasintable.push(top2[0].getName() + " & " + top2[1].getName());
        assasintable.push(" ");
        if (top2[0].lipstick == top2[1].lipstick) {
            assasinlipstick.push(top2[0].lipstick.getName());
            assasinlipstick.push(" ");
            screen.createImage(top2[0].lipstick.image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(top2[0].lipstick) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
            }
        }
        else {
            screen.createImage(top2[0].lipstick.image, "red");
            screen.createImage(top2[1].lipstick.image, "red");
            assasinlipstick.push(top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName());
            assasinlipstick.push(" ");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", " + top2[1].lipstick.getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else if (chocolateBarCheck(bottomQueens[0], bottomQueens[1]) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[1].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[1].lipstick.addToTrackRecord("CHOC");
                    top2[1].lipstick.unfavoritism += 3;
                    top2[1].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    top2[0].lipstick.rankP = "tie1";
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    top2[1].lipstick.rankP = "tie2";
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                top2[0].lipstick.rankP = "tie1";
                top2[1].lipstick.addToTrackRecord("ELIM");
                top2[1].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[1].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                top2[1].lipstick.rankP = "tie2";
            }
        }
    }
    else {
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].episodesOn++;
        top2[0].addToTrackRecord("WIN+RTRN");
        currentCast.unshift(top2[0]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[0]), 1);
        quitarDoubleElim(top2[0]);
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        top2[1].addToTrackRecord("OUT");
        top2[1].ppe += 5;
        top2[1].episodesOn++;
        assasintable.push(top2[0].getName());
        assasinlipstick.push(top2[0].lipstick.getName());
        assasintable.push(top2[1].getName());
        assasinlipstick.push(top2[1].lipstick.getName());
        screen.createImage(top2[1].image, "red");
        screen.createParagraph(top2[1].getName() + ", sashay away.");
        screen.createHorizontalLine();
        screen.createImage(top2[0].lipstick.image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(top2[0].lipstick) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                top2[0].lipstick.addToTrackRecord("CHOC");
                top2[0].lipstick.unfavoritism += 3;
                top2[0].lipstick.ppe += 1;
                chocolateBarTwistCheck = true;
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                
            }
        } else {
            screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");
            top2[0].lipstick.addToTrackRecord("ELIM");
            top2[0].lipstick.unfavoritism += 5;
            eliminatedCast.unshift(top2[0].lipstick);
            bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens.length >= 6)
            bottomQueens[i].addToTrackRecord("BTM");
        else if (bottomQueens.length == 5)
            bottomQueens[i].addToTrackRecord("BTM6");
        else if (bottomQueens.length == 4)
            bottomQueens[i].addToTrackRecord("BTM5");
        else if (bottomQueens.length == 3)
            bottomQueens[i].addToTrackRecord("BTM4");
        else if (bottomQueens.length == 2)
            bottomQueens[i].addToTrackRecord("BTM3");
        else
            bottomQueens[i].addToTrackRecord("BTM2");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    screen.createButton("Proceed", "newEpisode()");
}
let dragUpYourLife = [];
let sittingOnASecret = [];
function kittygirlGroup(cena = "") {
    if (cena) {
        episodeCount++;
        for (var i = 0; i < currentCast.length; i++){
            currentCast[i].episodesOn++;
        }
        episodeChallenges.push("Kitty Girl Group");
        top2 = [];
        bottomQueens = [];
        let screen = new Scene();
        screen.clean();
        document.body.style.backgroundImage = "url('image/mainstage.webp')";
        dragUpYourLife = currentCast.slice();
        sittingOnASecret = eliminatedCast.slice();
        let allofthem = [...currentCast, ...eliminatedCast];
        screen.createHeader("Handmaids to Kitty Girls!!");
        screen.createParagraph("The eliminated queens return to the competition for revenge. But first the queens must audition for RuPaul's new girl group, the Kitty Girls!!");
        screen.createBold("Group 1: Top " + dragUpYourLife.length);
        for (let i = 0; i < dragUpYourLife.length; i++) {
            dragUpYourLife[i].getRumix();
            screen.createImage(dragUpYourLife[i].image, "black");
        }
        screen.createBold("Group 2: Eliminated Queens");
        for (let i = 0; i < sittingOnASecret.length; i++) {
            if (sittingOnASecret[i].QueenDisqOrDept == true){
                allofthem.splice(allofthem.indexOf(sittingOnASecret[i]), 1);
                sittingOnASecret[i].addToTrackRecord("");
                sittingOnASecret.splice(i, 1);
                i--;
            } else {
                sittingOnASecret[i].getRumix();
                screen.createImage(sittingOnASecret[i].image, "black");
            }
        }
        screen.createHorizontalLine();
        screen.createBigText("Queens' performances...");
        let slay = allofthem.filter(function (queen) { return queen.performanceScore < 6; });
        let great = allofthem.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
        let good = allofthem.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
        let bad = allofthem.filter(function (queen) { return queen.performanceScore >= 26 && queen.performanceScore < 31; });
        let flop = allofthem.filter(function (queen) { return queen.performanceScore >= 31 && queen.performanceScore < 50; });
        createPerformanceDesc(slay, great, good, bad, flop);
        screen.createHorizontalLine();
        screen.createButton("Proceed", "kittygirlGroupJudging()");
    }
}
function kittygirlGroupJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Judging!");
    sortPerformances(dragUpYourLife);
    sortPerformances(sittingOnASecret);
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < dragUpYourLife.length; i++) {
        sum1 += dragUpYourLife[i].performanceScore;
    }
    for (let i = 0; i < sittingOnASecret.length; i++) {
        sum2 += sittingOnASecret[i].performanceScore;
    }
    if (sum1 <= sum2) { 
        screen.createBold("My Top " + dragUpYourLife.length + " queens, condragulations, you're the winning team!!");
        screen.createImage(dragUpYourLife[0].image, "cyan");
        screen.createImage(dragUpYourLife[1].image, "cyan");
        screen.createBold(dragUpYourLife[0].getName() + " and " + dragUpYourLife[1].getName()+ ", you are the Top 2 All Stars of the week.");
        top2.push(dragUpYourLife[0]);
        top2.push(dragUpYourLife[1]);
        if (totalCastSize > 10) {
            for (let i = 2; i < dragUpYourLife.length - 2; i++){
                screen.createImage(dragUpYourLife[i].image, "black");
                dragUpYourLife[i].addToTrackRecord("SAFE");
                dragUpYourLife[i].ppe += 3;
            }
            screen.createBold("", "safe");
            let safe = document.querySelector("b#safe");
            for (let i = 2; i < dragUpYourLife.length - 2; i++){
                safe.innerHTML += dragUpYourLife[i].getName() + ", ";
            }
            safe.innerHTML +=  "you are safe.";
            screen.createImage(dragUpYourLife[dragUpYourLife.length - 1].image, "red");
            screen.createImage(dragUpYourLife[dragUpYourLife.length - 2].image, "red");
            screen.createBold(dragUpYourLife[dragUpYourLife.length - 1].getName() + ", " + dragUpYourLife[dragUpYourLife.length - 2].getName() + "...", "bottom");
            bottomQueens.push(dragUpYourLife[dragUpYourLife.length - 1]);
            bottomQueens.push(dragUpYourLife[dragUpYourLife.length - 2]);
        } else {
            let names = "";
            for (let i = 2; i < dragUpYourLife.length; i++) {
                screen.createImage(dragUpYourLife[i].image, "red");
                names += dragUpYourLife[i].getName() + ", ";
                bottomQueens.push(dragUpYourLife[i]);
            }
            screen.createBold(names, "bottom");
        }
        let bottom = document.querySelector("b#bottom");
        bottom.innerHTML += " I'm sorry my dears but you are up for elimination.";
        screen.createHorizontalLine();
        screen.createBigText("After deliberation...");
        for (let i = 0; i < 2; i++) {
            if (randomNumber(100) <= 45)
                dragUpYourLife[i].lipstick = dragUpYourLife[dragUpYourLife.length - 1];
            else
                dragUpYourLife[i].lipstick = dragUpYourLife[randomNumberWithMin(dragUpYourLife.length - 2, dragUpYourLife.length - 1)];
            screen.createImage(dragUpYourLife[i].image, "cyan");
            screen.createImage(dragUpYourLife[i].lipstick.image, "red");
            screen.createBold(dragUpYourLife[i].getName() + " chose " + dragUpYourLife[i].lipstick.getName() + "'s lipstick!", "winV", "winVP");
        }
        screen.createHorizontalLine();
        screen.createButton("Proceed", "returnLipsync()");
    } else {
        screen.createBold("My Eliminated queens, condragulations, you're the winning team");
        screen.createImage(sittingOnASecret[0].image, "cyan");
        screen.createImage(sittingOnASecret[1].image, "cyan");
        screen.createBold(sittingOnASecret[0].getName() + " and " + sittingOnASecret[1].getName()+ ", you are the Top 2 All Stars of the week.");
        top2.push(sittingOnASecret[0]);
        top2.push(sittingOnASecret[1]);
        for (let i = 2; i < sittingOnASecret.length; i++){
            sittingOnASecret[i].addToTrackRecord("OUT ");
        }
        for (let i = 0; i < dragUpYourLife.length; i++) {
            screen.createImage(dragUpYourLife[i].image, "red");
            bottomQueens.push(dragUpYourLife[i]);
        }
        screen.createBold("You are all up for elimination.");
        screen.createHorizontalLine();
        screen.createBigText("After deliberation...");
        for (let i = 0; i < 2; i++) {
            if (randomNumber(100) <= 45)
                sittingOnASecret[i].lipstick = dragUpYourLife[dragUpYourLife.length - 1];
            else
                sittingOnASecret[i].lipstick = pickRandomlyFromArray(dragUpYourLife);
            screen.createImage(sittingOnASecret[i].image, "cyan");
            screen.createImage(sittingOnASecret[i].lipstick.image, "red");
            screen.createBold(sittingOnASecret[i].getName() + " chose " + sittingOnASecret[i].lipstick.getName() + "'s lipstick!", "winV", "winVP");
        }
        screen.createHorizontalLine();
        screen.createButton("Proceed", "eliminatedKittyWinLipsync()");
    }
}
function eliminatedKittyWinLipsync() {
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    top2.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your legacy!!! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Proceed", "eliminatedKittyWinLipsyncJudging()");
}
function topKittyWinLipsyncJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    if (top2[0].lipsyncScore == top2[1].lipsyncScore && top2[0].lipsyncScore > 6 && top2[1].lipsyncScore > 6) {
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[0].addToTrackRecord(" WIN");
        top2[1].addToTrackRecord(" WIN");
        screen.createHorizontalLine();
        assasintable.push(top2[0].getName() + " & " + top2[1].getName());
        assasintable.push(" ");
        if (top2[0].lipstick == top2[1].lipstick) {
            assasinlipstick.push(top2[0].lipstick.getName());
            assasinlipstick.push(" ");
            screen.createImage(top2[0].lipstick.image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(top2[0].lipstick) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
            }
        }
        else {
            screen.createImage(top2[0].lipstick.image, "red");
            screen.createImage(top2[1].lipstick.image, "red");
            assasinlipstick.push(top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName());
            assasinlipstick.push(" ");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", " + top2[1].lipstick.getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else if (chocolateBarCheck(bottomQueens[0], bottomQueens[1]) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[1].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[1].lipstick.addToTrackRecord("CHOC");
                    top2[1].lipstick.unfavoritism += 3;
                    top2[1].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord(" ELIM ");
                    top2[0].lipstick.unfavoritism += 5;
                    top2[0].lipstick.rankP = "tie1";
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord(" ELIM ");
                    top2[1].lipstick.unfavoritism += 5;
                    top2[1].lipstick.rankP = "tie2";
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord(" ELIM ");
                top2[0].lipstick.unfavoritism += 5;
                top2[0].lipstick.rankP = "tie1";
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                top2[1].lipstick.addToTrackRecord(" ELIM ");
                top2[1].lipstick.unfavoritism += 5;
                top2[1].lipstick.rankP = "tie2";
                eliminatedCast.unshift(top2[1].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
            }
        }
        screen.createHorizontalLine();
        screen.createBold("Now... Which queen have you both chosen to bring back to the competition?");
        for (let i = 0; i < 2; i++) {
            top2[i].lipstick = bestSister(top2[i], sittingOnASecret);
            if (sittingOnASecret.find(q => { return q.getName() == top2[i].lipstick.getName()}) == undefined) {
                top2[i].lipstick = pickRandomlyFromArray(sittingOnASecret);
            }
            screen.createImage(top2[i].image, "cyan");
            screen.createImage(top2[i].lipstick.image, "green");
            screen.createBold(top2[i].getName() + " chose " + top2[i].lipstick.getName() + " to return to the competition!!");
        }
        if (top2[0].lipstick == top2[1].lipstick) {
            top2[0].lipstick.addToTrackRecord("RTRN ");
            currentCast.unshift(top2[0].lipstick);
            eliminatedCast.splice(eliminatedCast.indexOf(top2[0].lipstick), 1);
            sittingOnASecret.splice(sittingOnASecret.indexOf(top2[0].lipstick), 1);
            quitarDoubleElim(top2[0].lipstick);
            for (let i = 0; i < sittingOnASecret.length; i++){
                sittingOnASecret[i].addToTrackRecord("OUT ");
            }
        } else {
            top2[0].lipstick.addToTrackRecord("RTRN ");
            top2[1].lipstick.addToTrackRecord("RTRN ");
            currentCast.unshift(top2[0].lipstick);
            currentCast.unshift(top2[1].lipstick);
            eliminatedCast.splice(eliminatedCast.indexOf(top2[0].lipstick), 1);
            eliminatedCast.splice(eliminatedCast.indexOf(top2[1].lipstick), 1);
            sittingOnASecret.splice(sittingOnASecret.indexOf(top2[0].lipstick), 1);
            sittingOnASecret.splice(sittingOnASecret.indexOf(top2[1].lipstick), 1);
            quitarDoubleElim(top2[0].lipstick);
            quitarDoubleElim(top2[1].lipstick);
            for (let i = 0; i < sittingOnASecret.length; i++){
                sittingOnASecret[i].addToTrackRecord("OUT ");
            }
        }
    }
    else {
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].addToTrackRecord("WIN");
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        top2[1].addToTrackRecord("WIN ");
        top2[1].ppe += 5;
        assasintable.push(top2[0].getName());
        assasinlipstick.push(top2[0].lipstick.getName());
        assasintable.push(top2[1].getName());
        assasinlipstick.push(top2[1].lipstick.getName());
        screen.createHorizontalLine();
        screen.createImage(top2[0].lipstick.image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(top2[0].lipstick) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                top2[0].lipstick.addToTrackRecord("CHOC");
                top2[0].lipstick.unfavoritism += 3;
                top2[0].lipstick.ppe += 1;
                chocolateBarTwistCheck = true;
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                
            }
        } else {
            screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");
            top2[0].lipstick.addToTrackRecord("ELIM");
            top2[0].lipstick.unfavoritism += 5;
            eliminatedCast.unshift(top2[0].lipstick);
            bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
        } 
        screen.createHorizontalLine();
        screen.createBold("Now... Which queen have you chosen to bring back to the competition?");
        top2[0].lipstick = bestSister(top2[0], sittingOnASecret);
        if (sittingOnASecret.find(q => { return q.getName() == top2[0].lipstick.getName()}) == undefined) {
            top2[0].lipstick = pickRandomlyFromArray(sittingOnASecret);
        }
        screen.createImage(top2[0].image, "cyan");
        screen.createImage(top2[0].lipstick.image, "green");
        screen.createBold(top2[0].getName() + " chose " + top2[0].lipstick.getName() + " to return to the competition!!");
        top2[0].lipstick.addToTrackRecord("RTRN ");
        currentCast.unshift(top2[0].lipstick);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[0].lipstick), 1);
        sittingOnASecret.splice(sittingOnASecret.indexOf(top2[0].lipstick), 1);
        quitarDoubleElim(top2[0].lipstick);
        for (let i = 0; i < sittingOnASecret.length; i++){
            sittingOnASecret[i].addToTrackRecord("OUT ");
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens.length >= 6)
            bottomQueens[i].addToTrackRecord("BTM");
        else if (bottomQueens.length == 5)
            bottomQueens[i].addToTrackRecord("BTM6");
        else if (bottomQueens.length == 4)
            bottomQueens[i].addToTrackRecord("BTM5");
        else if (bottomQueens.length == 3)
            bottomQueens[i].addToTrackRecord("BTM4");
        else if (bottomQueens.length == 2)
            bottomQueens[i].addToTrackRecord("BTM3");
        else
            bottomQueens[i].addToTrackRecord("BTM2");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    screen.createButton("Proceed", "newEpisode()");
}
function eliminatedKittyWinLipsyncJudging() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("I've made my decision...");
    if (top2[0].lipsyncScore == top2[1].lipsyncScore && top2[0].lipsyncScore > 6 && top2[1].lipsyncScore > 6) {
        screen.createImage(top2[0].image, "darkblue");
        screen.createImage(top2[1].image, "darkblue");
        screen.createBold("Condragulations, you're both winners baby!");
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].episodesOn++;
        top2[1].favoritism += 5;
        top2[1].ppe += 5;
        top2[1].episodesOn++;
        top2[0].addToTrackRecord("WIN+RTRN");
        currentCast.unshift(top2[0]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[0]), 1);
        quitarDoubleElim(top2[0]);
        top2[1].addToTrackRecord("WIN+RTRN");
        currentCast.unshift(top2[1]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[1]), 1);
        quitarDoubleElim(top2[1]);
        screen.createHorizontalLine();
        assasintable.push(top2[0].getName() + " & " + top2[1].getName());
        assasintable.push(" ");
        if (top2[0].lipstick == top2[1].lipstick) {
            assasinlipstick.push(top2[0].lipstick.getName());
            assasinlipstick.push(" ");
            screen.createImage(top2[0].lipstick.image, "red");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
                screen.createBold("If you have the golden chocolate bar, you will be safe.");
                if (chocolateBarCheck(top2[0].lipstick) == true) {
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    
                }
            } else {
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
            }
        }
        else {
            screen.createImage(top2[0].lipstick.image, "red");
            screen.createImage(top2[1].lipstick.image, "red");
            assasinlipstick.push(top2[0].lipstick.getName() + " & " + top2[1].lipstick.getName());
            assasinlipstick.push(" ");
            if (chocolateBarTwist  && !chocolateBarTwistCheck) {
                screen.createBold(top2[0].lipstick.getName() + ", " + top2[1].lipstick.getName() + ", now your fates rests in the hands of the drag gods.");
                screen.createBold("If one of you have the golden chocolate bar, that queen will be safe.");
                if (chocolateBarCheck(top2[0].lipstick, top2[1].lipstick) == 1) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord("ELIM");
                    top2[1].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[0].lipstick.addToTrackRecord("CHOC");
                    top2[0].lipstick.unfavoritism += 3;
                    top2[0].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else if (chocolateBarCheck(bottomQueens[0], bottomQueens[1]) == 2) {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord("ELIM");
                    top2[0].lipstick.unfavoritism += 5;
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                    screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                    screen.createBold(top2[1].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                    top2[1].lipstick.addToTrackRecord("CHOC");
                    top2[1].lipstick.unfavoritism += 3;
                    top2[1].lipstick.ppe += 1;
                    chocolateBarTwistCheck = true;
                    
                } else {
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[0].lipstick.addToTrackRecord(" ELIM ");
                    top2[0].lipstick.unfavoritism += 5;
                    top2[0].lipstick.rankP = "tie1";
                    eliminatedCast.unshift(top2[0].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                    screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                    screen.createBold("It's chocolate.");
                    top2[1].lipstick.addToTrackRecord(" ELIM ");
                    top2[1].lipstick.unfavoritism += 5;
                    top2[1].lipstick.rankP = "tie2";
                    eliminatedCast.unshift(top2[1].lipstick);
                    bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                    currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
                    
                }
            } else { 
                screen.createBold(`${top2[0].lipstick.getName()}, ${top2[1].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord(" ELIM ");
                top2[0].lipstick.unfavoritism += 5;
                top2[0].lipstick.rankP = "tie1";
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                top2[1].lipstick.addToTrackRecord(" ELIM ");
                top2[1].lipstick.unfavoritism += 5;
                top2[1].lipstick.rankP = "tie2";
                eliminatedCast.unshift(top2[1].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[1].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[1].lipstick), 1);
            }
        }
    }
    else {
        top2[0].favoritism += 5;
        top2[0].ppe += 5;
        top2[0].episodesOn++;
        top2[0].addToTrackRecord("WIN+RTRN");
        quitarDoubleElim(top2[0]);
        currentCast.unshift(top2[0]);
        eliminatedCast.splice(eliminatedCast.indexOf(top2[0]), 1);
        screen.createImage(top2[0].image, "royalblue");
        screen.createBold(top2[0].getName() + ", you're a winner, baby!");
        top2[1].addToTrackRecord("OUT");
        top2[1].ppe += 5;
        top2[1].episodesOn++;
        assasintable.push(top2[0].getName());
        assasinlipstick.push(top2[0].lipstick.getName());
        assasintable.push(top2[1].getName());
        assasinlipstick.push(top2[1].lipstick.getName());
        screen.createImage(top2[1].image, "red");
        screen.createParagraph(top2[1].getName() + ", sashay away.");
        screen.createHorizontalLine();
        screen.createImage(top2[0].lipstick.image, "red");
        if (chocolateBarTwist  && !chocolateBarTwistCheck) {
            screen.createBold(top2[0].lipstick.getName() + ", now your fate rests in the hands of the drag gods.");
            screen.createBold("If you have the golden chocolate bar, you will be safe.");
            if (chocolateBarCheck(top2[0].lipstick) == true) {
                screen.createImage("image/ChocolateBarWithTicket.webp", "gold");
                screen.createBold("You've got the GOLD BAR!!!! The gods have spoken!");
                screen.createBold(top2[0].lipstick.getName() + "!! Condragulations, you are safe to slay another day!");
                top2[0].lipstick.addToTrackRecord("CHOC");
                top2[0].lipstick.unfavoritism += 3;
                top2[0].lipstick.ppe += 1;
                chocolateBarTwistCheck = true;
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                
            } else {
                screen.createImage("image/ChocolateBarWithNoTicket.webp", "brown");
                screen.createBold("It's chocolate.");
                screen.createBold(`${top2[0].lipstick.getName()}, you will always be an All Star, now, sashay away...`);
                top2[0].lipstick.addToTrackRecord("ELIM");
                top2[0].lipstick.unfavoritism += 5;
                eliminatedCast.unshift(top2[0].lipstick);
                bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
                currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
                
            }
        } else {
            screen.createBold(top2[0].lipstick.getName() + ", you will always be an All Star, now, sashay away...");
            top2[0].lipstick.addToTrackRecord("ELIM");
            top2[0].lipstick.unfavoritism += 5;
            eliminatedCast.unshift(top2[0].lipstick);
            bottomQueens.splice(bottomQueens.indexOf(top2[0].lipstick), 1);
            currentCast.splice(currentCast.indexOf(top2[0].lipstick), 1);
        }
    }
    for (let i = 0; i < bottomQueens.length; i++) {
        if (bottomQueens.length >= 6)
            bottomQueens[i].addToTrackRecord("BTM");
        else if (bottomQueens.length == 5)
            bottomQueens[i].addToTrackRecord("BTM6");
        else if (bottomQueens.length == 4)
            bottomQueens[i].addToTrackRecord("BTM5");
        else if (bottomQueens.length == 3)
            bottomQueens[i].addToTrackRecord("BTM4");
        else if (bottomQueens.length == 2)
            bottomQueens[i].addToTrackRecord("BTM3");
        else
            bottomQueens[i].addToTrackRecord("BTM2");
        bottomQueens[i].unfavoritism += 3;
        bottomQueens[i].ppe += 1;
    }
    screen.createButton("Proceed", "newEpisode()");
}
let twinsMakeover = [];
let conjoinedCheck = false;
function queensConjoined(wass = "") { 
    if (wass) {
        episodeCount++;
        for (var i = 0; i < currentCast.length; i++){
            currentCast[i].episodesOn++;
        }
        episodeChallenges.push("Conjoined Makeover");
        safeQueens = [];
        topQueens = [];
        bottomQueens = [];
        top2 = [];
        let screen = new Scene();
        screen.clean();
        conjoinedCheck = true;
        document.body.style.backgroundImage = "url('image/mainstage.webp')";
        let conjoined = eliminatedCast.slice();
        screen.createHeader("Conjoined Queens!!");
        screen.createParagraph("The eliminated queens will pair up with current contestants in a conjoined drag twin challenge, fighting for a chance to get back in the game.!!");
        screen.createHorizontalLine();
        screen.createBold("The current contestants get to choose their partner...");
        for (let i = 0; i < conjoined.length; i++) {
            if (conjoined[i].QueenDisqOrDept == true){
                conjoined[i].addToTrackRecord("");
                conjoined.splice(i, 1);
            }
        }
        for (let i = 0; i < currentCast.length; i++){
            if (conjoined.length == 0) {
                screen.createImage(currentCast[i].image);
                screen.createBold("That means " + currentCast[i].getName() + " will makeover one of the pitcrew member.");
                currentCast[i].getDesign();
                twinsMakeover.push(currentCast[i]);
            } else { 
                screen.createImage(currentCast[i].image);
                let queen = bestSister(currentCast[i], conjoined);
                if (conjoined.find(q => { return q.getName() == queen.getName()}) == undefined) {
                    queen = pickRandomlyFromArray(conjoined);
                }
                conjoined.splice(conjoined.indexOf(queen), 1);
                screen.createImage(queen.image);
                screen.createBold(currentCast[i].getName() + " chose " + queen.getName());
                currentCast[i].getDesign();
                twinsMakeover.push(currentCast[i], queen);
            }
        }
        if (conjoined.length >= 1) {
            for (let i = 0; i < conjoined.length; i++)
                conjoined[i].addToTrackRecord("");
        }
        screen.createHorizontalLine();
        sortPerformances(currentCast);
        screen.createBigText("Queens' performances...");
        let slay = currentCast.filter(function (queen) { return queen.performanceScore < 6; });
        let great = currentCast.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
        let good = currentCast.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
        let bad = currentCast.filter(function (queen) { return queen.performanceScore >= 26 && queen.performanceScore < 31; });
        let flop = currentCast.filter(function (queen) { return queen.performanceScore >= 31 && queen.performanceScore < 50; });
        createPerformanceDesc(slay, great, good, bad, flop);
        makeoverCounter = true;
        screen.createHorizontalLine();
        screen.createButton("Proceed", "judging()");
        let button = document.querySelector("button[onclick='newEpisode()']");
        button.remove();
    }
}
function conjoinedReturn(winner, secondWinner = "") {
    let screen = new Scene();
    if (secondWinner == "") {
        for (let i = 0; i < twinsMakeover.length - 1; i++) {
            if (winner == twinsMakeover[i]){
                screen.createImage(twinsMakeover[i+1].image, "orange");
                screen.createBold(twinsMakeover[i+1].getName() + ", you are back in the competition");
                twinsMakeover[i+1].addToTrackRecord("RTRN ");
                currentCast.push(twinsMakeover[i+1]);
                eliminatedCast.splice(eliminatedCast.indexOf(twinsMakeover[i+1]), 1);
                quitarDoubleElim(twinsMakeover[i+1]);
            }
        }
    } else { 
        for (let i = 0; i < twinsMakeover.length - 1; i++) {
            if (winner == twinsMakeover[i]){
                screen.createImage(twinsMakeover[i+1].image, "orange");
                screen.createBold(twinsMakeover[i+1].getName() + ", you are back in the competition");
                twinsMakeover[i+1].addToTrackRecord("RTRN ");
                currentCast.push(twinsMakeover[i+1])
                eliminatedCast.splice(eliminatedCast.indexOf(twinsMakeover[i+1]), 1);
                quitarDoubleElim(twinsMakeover[i+1]);
            }
            if (secondWinner == twinsMakeover[i]){
                screen.createImage(twinsMakeover[i+1].image, "orange");
                screen.createBold(twinsMakeover[i+1].getName() + ", you are back in the competition");
                twinsMakeover[i+1].addToTrackRecord("RTRN ");
                currentCast.push(twinsMakeover[i+1])
                eliminatedCast.splice(eliminatedCast.indexOf(twinsMakeover[i+1]), 1);
                quitarDoubleElim(twinsMakeover[i+1]);
            }
        }
    }
    for (let i = 0; i < eliminatedCast.length; i++) {
        if (eliminatedCast[i].QueenDisqOrDept == true){
            //do nothing
        } else {
            eliminatedCast[i].addToTrackRecord("OUT ");
        }
    }
}
function giveChocolate() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/chocolate.webp')";
    let title = document.querySelector("h1#MainTitle");
    let goldenChecker = false;
    title.innerHTML = "Chocolate Bar Selection";
    screen.createBold("For this season, we're doing things a little differently, and when it comes to saving queens, I'm leaving it up to the Drag Gods.")
    screen.createBold("Now, you all may pick a bar one at a time.");
    for (let i = 0; i < currentCast.length; i++) {
        screen.createImage(currentCast[i].image , "gold");
        screen.createImage("image/ChocolateBarTBA.webp", "grey")
        screen.createBold(currentCast[i].getName() + " picks their Chocolate bar...");
        fullCast.push(currentCast[i]);
        if (randomNumber(100) >= 90) {
            if (!goldenChecker) {
                currentCast[i].chocolate = true;
                goldenChecker = true;
            } else {
                currentCast[i].chocolate = false;
            }
        } else {
            currentCast[i].chocolate = false;
        }
    }
    if (!goldenChecker) {
        let number = randomNumber(currentCast.length);
        currentCast[number].chocolate = true;
        goldenChecker = true;
    }
    if (s14Premiere) {
        chocolateBarTwistCheck = true;
    }
    if (s6Premiere || s12Premiere || s14Premiere) {
        screen.createButton("Proceed", "doublePremiere()");
    }
    else if (s9Premiere) {
        chooseLateQueen();
    }
    else if (porkchopPremiere) {
        screen.createButton("Proceed", "porkchopLipsyncs()");
    }
    else {
        screen.createButton("Proceed", "newEpisode()");
    }
}
function chooseGoldenBar() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/chocolate.webp')";
    let title = document.querySelector("h1#MainTitle");
    title.innerHTML = "Chocolate Bar Selection";
    screen.createBold("For this season, we're doing things a little differently, and when it comes to saving queens, I'm leaving it up to the Drag Gods.")
    screen.createBold("Select which queen will recieve the Golden Chocolate Bar.");
    let main = document.querySelector("div#MainBlock");
    let castSelection = document.createElement("p");
    castSelection.setAttribute("id", "castSelection");
    castSelection.innerHTML = '';
    let select = document.createElement("select");
    select.setAttribute("id", "queenList");
    select.setAttribute("onchange", "returnImg()");
    let img = document.createElement("img");
    img.setAttribute("id", "images");
    img.setAttribute("style", "width: 105px; height: 105px;");
    let p = document.createElement("p");
    p.appendChild(img);
    for (let k = 0; k < currentCast.length; k++) {
        let option = document.createElement("option");
        option.innerHTML = currentCast[k].getName();
        option.value = currentCast[k].image;
        select.add(option);
    }
    select.selectedIndex = randomNumber(currentCast.length);
    let br = document.createElement("br");
    castSelection.appendChild(p);
    castSelection.appendChild(select);
    castSelection.appendChild(br);
    main.appendChild(castSelection);
    returnImg();
    screen.createButton("Choose Queen", "fijarGoldenQueen()", "fijar");
    for (let i = 0; i < currentCast.length; i++) {
        fullCast.push(currentCast[i]);
    }
}
function fijarGoldenQueen() {
    let screen = new Scene();
    let select = document.getElementById("queenList");
    let value = select.options[select.selectedIndex].text;
    let button = document.getElementById("fijar");
    let queen;
    for (let k = 0; k < currentCast.length; k++) {
        if (value == currentCast[k].getName()){
            queen = currentCast[k];
        }
    }
    button.remove();
    select.remove();
    screen.createBold(queen.getName());
    queen.chocolate = true;
    if (s14Premiere) {
        chocolateBarTwistCheck = true;
    }
    if (s6Premiere || s12Premiere || s14Premiere) {
        screen.createButton("Proceed", "doublePremiere()");
    }
    else if (s9Premiere) {
        chooseLateQueen();
    }
    else if (porkchopPremiere) {
        screen.createButton("Proceed", "porkchopLipsyncs()");
    }
    else {
        screen.createButton("Proceed", "newEpisode()");
    }
}
function chocolateBarCheck(queen, queen2 = "") {
    if (queen2 == "") {
        if (queen.chocolate == true) {
            return true;
        } else { 
            return false;
        }
    } else {
        if (queen.chocolate == true) {
            return 1;
        } else if (queen2.chocolate == true) { 
            return 2;
        } else {
            return false;
        }
    }
}

function lsSong() {
    let screen = new Scene();
    let song = randomNumber(lsSongs.length);
    while (song == "") {
        song = randomNumber(lsSongs.length);
    }
    screen.createBold(`The lip-sync song is... ${lsSongs[song]}!`);
    return lsSongs.splice(song, 1);
}
let allLsSongs = [];
function loadSongs() {
    fetch('textFiles/songs.txt')
    .then( (response) => {
        return response.text()
    })
    .then( (data) => {
        let songs = data.toString().replace(/"/gi, '').split(/,\r\n|\r|\n/);
        allLsSongs = songs;
        lsSongs = [...allLsSongs]
    });
}
loadSongs()
let lsSongs = [];

let teamList = [];
function teamsScreen() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Pair time!");
    screen.createParagraph("After all the queens enter the werkroom, they now have to choose their pairs!");
    screen.createHorizontalLine();
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let select = document.createElement("select");
    select.setAttribute("class", "queenList");
    select.setAttribute("id", "0");
    select.setAttribute("onchange", "setImage()");
    let img = document.createElement("img");
    img.setAttribute("class", "images");
    img.setAttribute("id", "image0");
    img.setAttribute("style", "width: 105px; height: 105px;")
    let p = document.createElement("p");
    p.appendChild(img);
    for (let k = 0; k < currentCast.length; k++) {
        let option = document.createElement("option");
        option.innerHTML = currentCast[k].getName();
        option.value = currentCast[k].image;
        select.add(option);
    }
    select.selectedIndex = randomNumber(currentCast.length);
    let br = document.createElement("br");
    centering.appendChild(p);
    centering.appendChild(select);

    let select1 = document.createElement("select");
    select1.setAttribute("class", "queenList");
    select1.setAttribute("id", "1");
    select1.setAttribute("onchange", "setImage()");
    let img1 = document.createElement("img");
    img1.setAttribute("class", "images");
    img1.setAttribute("id", "image1");
    img1.setAttribute("style", "width: 105px; height: 105px;")
    let p1 = document.createElement("p");
    p1.appendChild(img1);
    for (let k = 0; k < currentCast.length; k++) {
        let option1 = document.createElement("option");
        option1.innerHTML = currentCast[k].getName();
        option1.value = currentCast[k].image;
        select1.add(option1);
    }
    select1.selectedIndex = randomNumber(currentCast.length);
    centering.appendChild(p1);
    centering.appendChild(select1);
    centering.appendChild(br);
    centering.appendChild(br);
    main.appendChild(centering);
    main.appendChild(br);
    setImage();
    if (currentCast.length != 2) {
        screen.createButton("Team Up","", "createTeam");
        let createTeam = document.getElementById("createTeam");
        createTeam.addEventListener("click", () => {
        let value = select.options[select.selectedIndex].text;
        let value1 = select1.options[select1.selectedIndex].text;
        let QueenA;
        let QueenB;
        for (let k = 0; k < currentCast.length; k++) {
            if (value == currentCast[k].getName()) {
                QueenA = currentCast[k];
            }
            if (value1 == currentCast[k].getName()) {
                QueenB = currentCast[k];
            }
        }
        if (QueenA.getName() == QueenB.getName()) {
            window.alert("Choose different contestants.");
        } else {
            let team = new Team(QueenA, QueenB);
            teamList.push(team);
            currentCast.splice(currentCast.indexOf(QueenA), 1);
            currentCast.splice(currentCast.indexOf(QueenB), 1);
            teamsScreen()
        }
    });
    } else if (currentCast.length == 2) {
        screen.createButton("Proceed", "", "createTeam");
        let createTeam = document.getElementById("createTeam");
        createTeam.addEventListener("click", () => {
        let value = select.options[select.selectedIndex].text;
        let value1 = select1.options[select1.selectedIndex].text;
        let QueenA;
        let QueenB;
        for (let k = 0; k < currentCast.length; k++) {
            if (value == currentCast[k].getName()) {
                QueenA = currentCast[k];
            }
            if (value1 == currentCast[k].getName()) {
                QueenB = currentCast[k];
            }
        }
        if (QueenA.getName() == QueenB.getName()) {
            window.alert("Choose different contestants.");
        } else {
            let team = new Team(QueenA, QueenB);
            teamList.push(team);
            currentCast.splice(currentCast.indexOf(QueenA), 1);
            currentCast.splice(currentCast.indexOf(QueenB), 1);
            currentCast = [...teamList];
            totalCastSize = currentCast.length;
            miniChallenge()
        }
    });
    }
}

function queenTalents() {
    let screen = new Scene();
    screen.createHorizontalLine();
    screen.createBigText("The queens will perform...");
    for (let i = 0; i < currentCast.length; i++) {
        screen.createImage(currentCast[i].image);
        screen.createBold(`${currentCast[i].getName()} will do a ${pickRandomlyFromArray(talentOptions)} performance!!`);
    }
}

function chooseReasoning(winQueen, elimQueen) {
    let screen = new Scene();
    screen.createBold(`${winQueen} chose ${elimQueen} because ${pickRandomlyFromArray(reasoningQueens)}`);
}

//UNTUCKED
function untucked() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/untucked.webp')";
    screen.createHeader("Untucked!!");
    screen.createBold("At the end of the episode the queens go to sit and talk about their feelings in this episode.");
    screen.createHorizontalLine();
    let howManyInteractions = 0;
    if (currentCast.length < 21) {howManyInteractions = randomNumberWithMin(3, 7);}
    if (currentCast.length < 12) {howManyInteractions = randomNumberWithMin(2, 5);}
    if (currentCast.length < 6) {howManyInteractions = randomNumberWithMin(2, 3);}
    for (let i = 0; i < howManyInteractions; i++) {
        let howManyQueens = randomNumber(100);
        if (howManyQueens <= 75) {
            howManyQueens = 2;
        }
        if (howManyQueens > 75 && howManyQueens <= 95) {
            howManyQueens = 3;
        }
        if (howManyQueens > 95) {
            howManyQueens = 4;
        }
        if (currentCast.length < 6) {howManyQueens = randomNumberWithMin(2, 3);}
        let flag = false;
        if (howManyQueens == 2){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            interactions(2, queen1, queen2);
        }
        if (howManyQueens == 3){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            let queen3 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen3 != queen1) {
                    if (queen3 != queen2) {
                        flag = true;
                    } else {
                        queen3 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen3 = pickRandomlyFromArray(currentCast);
                }
            }
            interactions(3, queen1, queen2, queen3);
        }
        if (howManyQueens == 4){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            let queen3 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen3 != queen1) {
                    if (queen3 != queen2) {
                        flag = true;
                    } else {
                        queen3 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen3 = pickRandomlyFromArray(currentCast);
                }
            }
            flag = false;
            let queen4 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen4 != queen1) {
                    if (queen4 != queen2) {
                        if (queen4 != queen3) {
                            flag = true;
                        } else {
                            queen4 = pickRandomlyFromArray(currentCast);
                        }
                    } else {
                        queen4 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen4 = pickRandomlyFromArray(currentCast);
                }
            }
            interactions(4, queen1, queen2, queen3, queen4);
        }
    }
    areRelations()
    screen.createButton("Proceed", "newEpisode()");
}
function interactions(howmany, queen1, queen2, queen3 = '', queen4 = '') {
    switch(howmany) {
        case 2:
            twoQueensUntucked(queen1, queen2);
            break;
        case 3:
            threeQueensUntucked(queen1, queen2, queen3);
            break;
        case 4:
            fourQueensUntucked(queen1, queen2, queen3, queen4);
            break;
        case 5:
            allVOneUntucked();
            break;
        default:
            break;
    }
}

function twoQueensUntucked(queen1, queen2) {
    let screen = new Scene();
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    let eventType = twoTypeEvent(queen1, queen2);
    let typeEvent = randomNumber(2);
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation1)}`);
        modRelation(2, 1, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation2)}`);
        modRelation(2, 2, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 3) {
        if (typeEvent == 0) {
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation3)}`);
        }
        if (typeEvent == 1) {
            screen.createBold(`${queen1.getName()} ${pickRandomlyFromArray(twoQueensRelation3_2)} ${queen2.getName()} `);
        }
        modRelation(2, 3, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 4) {
        if (typeEvent == 0) {
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation4)}`);
        }
        if (typeEvent == 1) {
            screen.createBold(`${queen1.getName()} ${pickRandomlyFromArray(twoQueensRelation4_2)} ${queen2.getName()} `);
        }
        modRelation(2, 4, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 5) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation5)}`);
        modRelation(2, 5, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
}
function twoTypeEvent(queen1, queen2) {
    let eventType = 0;
    let random = randomNumber(11);
    let queenFound = queen1.sisters.find((sis) => {
        return sis.queen == queen2
    });
    if (queenFound.relation >= 6) {
        if (random >= 6) {
            eventType = 1;
        } else if (random >= 3 && random < 6) {
            eventType = 2;
        } else if (random == 2) {
            eventType = 3;
        } else if (random == 1) {
            eventType = 4;
        } else if (random == 0) {
            eventType = 5;
        }  
    } else if (queenFound.relation >= 2) {
        if (random >= 7) {
            eventType = 1;
        } else if (random >= 5 && random < 7) {
            eventType = 2;
        } else if (random >= 2 && random < 5) {
            eventType = 3;
        } else if (random == 1) {
            eventType = 4;
        } else if (random == 0) {
            eventType = 5;
        }  
    } else if (queenFound.relation < 2 && queenFound.relation >= -1) {
        if (random >= 8) {
            eventType = 1;
        } else if (random >= 6 && random < 8) {
            eventType = 2;
        } else if (random >= 3 && random < 6) {
            eventType = 3;
        } else if (random >= 1 && random < 3) {
            eventType = 4;
        } else if (random == 0) {
            eventType = 5;
        }  
    } else if (queenFound.relation < -1 && queenFound.relation >= -5) {
        if (random >= 9) {
            eventType = 1;
        } else if (random == 8) {
            eventType = 2;
        } else if (random >= 3 && random < 8) {
            eventType = 3;
        } else if (random >= 1 && random < 3) {
            eventType = 4;
        } else if (random == 0) {
            eventType = 5;
        }  
    } else if (queenFound.relation < -5) {
        if (random == 10) {
            eventType = 1;
        } else if (random == 9) {
            eventType = 2;
        } else if (random >= 4 && random < 9) {
            eventType = 3;
        } else if (random >= 1 && random < 4) {
            eventType = 4;
        } else if (random == 0) {
            eventType = 5;
        }  
    }
    return eventType
}
function threeQueensUntucked(queen1, queen2, queen3) {
    let screen = new Scene();
    let eventType = randomNumber(4);
    let event = randomNumber(2);
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    screen.createImage(queen3.image);
    if (eventType == 0) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation1[event]}`);
        modRelation(3, 1, queen1, queen2, queen3);
    }
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation2[event]}`);
        modRelation(3, 2, queen1, queen2, queen3);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation3[event]}`);
        modRelation(3, 3, queen1, queen2, queen3);
    }
    if (eventType == 3) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation4[event]}`);
        modRelation(3, 4, queen1, queen2, queen3);
    }
}
function fourQueensUntucked(queen1, queen2, queen3, queen4) {
    let screen = new Scene();
    let eventType = randomNumber(4);
    let event = randomNumber(2);
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    screen.createImage(queen3.image);
    screen.createImage(queen4.image);
    if (eventType == 0) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation1[event]}`);
        modRelation(4, 1, queen1, queen2, queen3, queen4);
    }
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation2[event]}`);
        modRelation(4, 2, queen1, queen2, queen3, queen4);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation3[event]}`);
        modRelation(4, 3, queen1, queen2, queen3, queen4);
    }
    if (eventType == 3) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation4[event]}`);
        modRelation(4, 4, queen1, queen2, queen3, queen4);
    }
}
function modRelation(hm, type, queen1, queen2, queen3 = '', queen4 = '') {
    switch(true) {
        //********************************* INICIA 2 QUEENS *********************************
        case ((hm == 2) && (type == 1)):
            //Mejora relación poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation +=1;
                }
            }
            break;
        case ((hm == 2) && (type == 2)):
            //Mejora relación mucho.
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation += 3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation += 3;
                }
            }
            break;
        case ((hm == 2) && (type == 3)):
            //Empeora relation poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=1;
                }
            }
            break;
        case ((hm == 2) && (type == 4)):
            //Empeora relation mucho
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=3;
                }
            }
            break;
        case ((hm == 2) && (type == 5)):
            //La relación no se ve afectada
            break;
        //********************************* INICIA 3 QUEENS *********************************
        case ((hm == 3) && (type == 1)):
            //Mejora relación poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation +=1;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation +=1;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation +=1;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation +=1;
                }
            }
            break;
        case ((hm == 3) && (type == 2)):
            //Mejora relación MUCHO
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation +=3;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation +=3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation +=3;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation +=3;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation +=3;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation +=3;
                }
            }
            break;
        case ((hm == 3) && (type == 3)):
            //Empeora relación poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=1;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=1;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation -=1;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation -=1;
                }
            }
            break;
        case ((hm == 3) && (type == 4)):
            //Empeora relación MUCHO
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=3;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=3;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation -=3;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation -=3;
                }
            }
            break;
        //********************************* INICIA 4 QUEENS *********************************
        case ((hm == 4) && (type == 1)):
            //Mejora relación poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation +=1;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation +=1;
                }
                if (queen1.sisters[i].queen == queen4) {
                    queen1.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation +=1;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation +=1;
                }
                if (queen2.sisters[i].queen == queen4) {
                    queen2.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation +=1;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation +=1;
                }
                if (queen3.sisters[i].queen == queen4) {
                    queen3.sisters[i].relation +=1;
                }
            }
            for (let i = 0; i < queen4.sisters.length; i++) {
                if (queen4.sisters[i].queen == queen1) {
                    queen4.sisters[i].relation +=1;
                }
                if (queen4.sisters[i].queen == queen2) {
                    queen4.sisters[i].relation +=1;
                }
                if (queen4.sisters[i].queen == queen3) {
                    queen4.sisters[i].relation +=1;
                }
            }
            break;
        case ((hm == 4) && (type == 2)):
            //Mejora relación MUCHO
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation +=3;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation +=3;
                }
                if (queen1.sisters[i].queen == queen4) {
                    queen1.sisters[i].relation +=3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation +=3;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation +=3;
                }
                if (queen2.sisters[i].queen == queen4) {
                    queen2.sisters[i].relation +=3;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation +=3;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation +=3;
                }
                if (queen3.sisters[i].queen == queen4) {
                    queen3.sisters[i].relation +=3;
                }
            }
            for (let i = 0; i < queen4.sisters.length; i++) {
                if (queen4.sisters[i].queen == queen1) {
                    queen4.sisters[i].relation +=3;
                }
                if (queen4.sisters[i].queen == queen2) {
                    queen4.sisters[i].relation +=3;
                }
                if (queen4.sisters[i].queen == queen3) {
                    queen4.sisters[i].relation +=3;
                }
            }
            break;
        case ((hm == 4) && (type == 3)):
            //Empeora relación poco
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=1;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation -=1;
                }
                if (queen1.sisters[i].queen == queen4) {
                    queen1.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=1;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation -=1;
                }
                if (queen2.sisters[i].queen == queen4) {
                    queen2.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation -=1;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation -=1;
                }
                if (queen3.sisters[i].queen == queen4) {
                    queen3.sisters[i].relation -=1;
                }
            }
            for (let i = 0; i < queen4.sisters.length; i++) {
                if (queen4.sisters[i].queen == queen1) {
                    queen4.sisters[i].relation -=1;
                }
                if (queen4.sisters[i].queen == queen2) {
                    queen4.sisters[i].relation -=1;
                }
                if (queen4.sisters[i].queen == queen3) {
                    queen4.sisters[i].relation -=1;
                }
            }
            break;
        case ((hm == 4) && (type == 4)):
            //Empeora relación mucho
            for (let i = 0; i < queen1.sisters.length; i++) {
                if (queen1.sisters[i].queen == queen2) {
                    queen1.sisters[i].relation -=3;
                }
                if (queen1.sisters[i].queen == queen3) {
                    queen1.sisters[i].relation -=3;
                }
                if (queen1.sisters[i].queen == queen4) {
                    queen1.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen2.sisters.length; i++) {
                if (queen2.sisters[i].queen == queen1) {
                    queen2.sisters[i].relation -=3;
                }
                if (queen2.sisters[i].queen == queen3) {
                    queen2.sisters[i].relation -=3;
                }
                if (queen2.sisters[i].queen == queen4) {
                    queen2.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen3.sisters.length; i++) {
                if (queen3.sisters[i].queen == queen1) {
                    queen3.sisters[i].relation -=3;
                }
                if (queen3.sisters[i].queen == queen2) {
                    queen3.sisters[i].relation -=3;
                }
                if (queen3.sisters[i].queen == queen4) {
                    queen3.sisters[i].relation -=3;
                }
            }
            for (let i = 0; i < queen4.sisters.length; i++) {
                if (queen4.sisters[i].queen == queen1) {
                    queen4.sisters[i].relation -=3;
                }
                if (queen4.sisters[i].queen == queen2) {
                    queen4.sisters[i].relation -=3;
                }
                if (queen4.sisters[i].queen == queen3) {
                    queen4.sisters[i].relation -=3;
                }
            }
            break;
        default:
            break;
    }
}
function isFriend(queen1, queen2) {
    if (queen1.friends.find((queen) => {
        return queen == queen2
    }) == queen2) {
        return true;
    } else {
        false
    }
}
function isEnemy(queen1, queen2) {
    if (queen1.enemies.find((queen) => {
        return queen == queen2
    }) == queen2) {
        return true;
    } else {
        false
    }
}
function CheckFriend(queen1, queen2) {
    let index = 0;
    for (let i = 0; i < queen1.sisters.length; i++) {
        if (queen1.sisters[i].queen == queen2) {
            index = i;
        }
    }
    if (queen1.sisters[index].relation >= 7) {
        queen1.friends.push(queen2);
        queen2.friends.push(queen1);
    } else if (queen1.sisters[index].relation <= -5) {
        queen1.enemies.push(queen2);
        queen2.enemies.push(queen1);
    } else {
        return
    }
}
function stillFriend(queen1, queen2) {
    let screen = new Scene();
    let queenFound = queen1.sisters.find((sis) => {
        return sis.queen == queen2
    });
    if (queenFound.relation < 7) {
        queen1.friends.splice(queen1.friends.indexOf(queen2), 1);
        queen2.friends.splice(queen2.friends.indexOf(queen1), 1);
        screen.createImage(queen1.image, "lightgreen");
        screen.createImage(queen2.image, "lightgreen");
        screen.createBold(queen1.getName() + " and " + queen2.getName() + " are no longer friends!");
    }
}
function stillEnemy(queen1, queen2) {
    let screen = new Scene();
    let queenFound = queen1.sisters.find((sis) => {
        return sis.queen == queen2
    });
    if (queenFound.relation > -5) {
        queen1.enemies.splice(queen1.enemies.indexOf(queen2), 1);
        queen2.enemies.splice(queen2.enemies.indexOf(queen1), 1);
        screen.createImage(queen1.image, "lightred");
        screen.createImage(queen2.image, "lightred");
        screen.createBold(queen1.getName() + " and " + queen2.getName() + " are no longer enemies!");
    }
}
function queenRelations(queen) {
    for (let i = 0; i < queen.sisters.length; i++) {
        if (isFriend(queen, queen.sisters[i].queen)) {
            stillFriend(queen, queen.sisters[i].queen);
        } else if (isEnemy(queen, queen.sisters[i].queen)) {
            stillEnemy(queen, queen.sisters[i].queen);
        } else {
            CheckFriend(queen, queen.sisters[i].queen); 
        }
    }
}
function worstSister(queen, cast) {
    let bff = queen.sisters.find(sister => {
        if (queen.getName() == cast[0].getName()) {
            return sister.queen.getName() == cast[1].getName()
        } else {
            return sister.queen.getName() == cast[0].getName()
        }
    });
    for (let i = 0; i < queen.sisters.length; i++) {
        for (let k = 0; k < cast.length; k++) {
            if (queen.sisters[i].queen.getName() == cast[k].getName()) {
                if (bff.relation == queen.sisters[i].relation) {
                    if (randomNumber(100) <= 50) {
                        bff = queen.sisters[i];
                    }
                } else if (bff.relation > queen.sisters[i].relation) {
                    bff = queen.sisters[i];
                }
            }
        }
    }
    if (bff.relation > -3) {
        let newBff;
        do {
        if (randomNumber(100) >= 96) {
            newBff = cast.sort((a, b) => b.favoritism - a.favoritism)[0];
        } else if (randomNumber(100) >= 50) {
            newBff = cast.sort((a, b) => b.unfavoritism - a.unfavoritism)[0];
        } else {
            newBff = pickRandomlyFromArray(cast);
        }
        } while(queen == newBff);
        bff = queen.sisters.find(sister => {
            return sister.queen.getName() == newBff.getName()
        });
    }
    return bff.queen
}
function bestSister(queen, cast) {
    let bff = queen.sisters.find(sister => {
        if (queen.getName() == cast[0].getName()) {
            return sister.queen.getName() == cast[1].getName()
        } else {
            return sister.queen.getName() == cast[0].getName()
        }
    });
    for (let i = 0; i < queen.sisters.length; i++) {
        for (let k = 0; k < cast.length; k++) {
            if (queen.sisters[i].queen.getName() == cast[k].getName()) {
                if (bff.relation == queen.sisters[i].relation) {
                    if (randomNumber(100) <= 50) {
                        bff = queen.sisters[i];
                    }
                } else if (bff.relation < queen.sisters[i].relation) {
                    bff = queen.sisters[i];
                }
            }
        }
    }
    return bff.queen
}
function areRelations() {
    let screen = new Scene();
    let flag = false;
    for (let i = 0; i < currentCast.length; i++) {
        for (let o = 0; o < currentCast[i].sisters.length; o++) {
            if (isEnemy(currentCast[i], currentCast[i].sisters[o].queen)) {
                if (flag == false) {
                    screen.createHorizontalLine();
                    screen.createBigText("Relationships");
                }
                let check = document.getElementById(currentCast[i].sisters[o].queen.getName()+currentCast[i].getName());
                if (check != null) {
                    //nothing
                } else {
                    screen.createImage(currentCast[i].image, "red");
                    screen.createImage(currentCast[i].sisters[o].queen.image, "red");
                    screen.createBold(currentCast[i].getName() + " and " + currentCast[i].sisters[o].queen.getName() + " are enemies!", currentCast[i].getName() + currentCast[i].sisters[o].queen.getName());
                    flag = true;
                }
            }
            if (isFriend(currentCast[i], currentCast[i].sisters[o].queen)) {
                if (flag == false) {
                    screen.createHorizontalLine();
                    screen.createBigText("Relationships");
                }
                let check = document.getElementById(currentCast[i].sisters[o].queen.getName()+currentCast[i].getName());
                if (check != null) {
                    //nothing
                } else {
                    screen.createImage(currentCast[i].image, "green");
                    screen.createImage(currentCast[i].sisters[o].queen.image, "green");
                    screen.createBold(currentCast[i].getName() + " and " + currentCast[i].sisters[o].queen.getName() + " are friends!", currentCast[i].getName() + currentCast[i].sisters[o].queen.getName());
                    flag = true;
                }
            }
        }
    }
    return flag;
}

function missCong() {
    let screen = new Scene();
    screen.createBigText("The contestants will vote for Miss Congeniality!");
    let wholeCast = [...currentCast, ...eliminatedCast];
    shuffle(wholeCast);
    for (let i = 0; i < eliminatedCast.length; i++) {
        eliminatedCast[i].votes = 0;
        eliminatedCast[i].trackRecord[eliminatedCast[i].trackRecord.length - 1] = "GUEST";
    }
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].votes = 0;
    }
    for (let i = 0; i < wholeCast.length; i++) {
        wholeCast[i].lipstick = bestSister(wholeCast[i], eliminatedCast);
        screen.createImage(wholeCast[i].image, "black");
        screen.createImage(wholeCast[i].lipstick.image, "aqua");
        screen.createBold(wholeCast[i].getName() + " voted for " + wholeCast[i].lipstick.getName() + " to be Miss Congeniality!", "votes", "votesP");
        wholeCast[i].lipstick.votes++; 
    }
    screen.createHorizontalLine();
    wholeCast.sort((a, b) => (b.votes - a.votes));
    screen.createImage(wholeCast[0].image, "aqua");
    screen.createBold("The winner of this season's Miss Congeniality is... " + wholeCast[0].getName() + "!!!");
    wholeCast[0].trackRecord[wholeCast[0].trackRecord.length - 1] = "MISS CON";
    screen.createHorizontalLine();
}
let readingCheck = false;
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

function downloadTR() {
    let table = document.getElementById("trackRecord");
    html2canvas(table).then((canvas) => {
        let img = canvas.toDataURL("image/png");
        let a = document.createElement('a');
        a.setAttribute("href", img);
        a.setAttribute("download","TrackRecord.png");
        a.click();
        a.remove();
    });
}


let allReads = [...queensReads];

function toBlots(lipsyncers, song) {
    let totalLipsync = 0;
    let lipsyncQueens = "";
    for (let i = 0; i < lipsyncers.length; i++) {
        totalLipsync += lipsyncers[i].lipsyncScore;
        if (team) {
            lipsyncQueens += "<b>" + lipsyncers[i].lipsyncQueen.getName() + "</b>";
        } else {
            lipsyncQueens += "<b>" + lipsyncers[i].getName() + "</b>";
        }
        if (i != lipsyncers.length - 1) {
            lipsyncQueens += "<br><small> vs </small><br>";
        }
    }
    let songBy = song.slice(song.indexOf(" by "));
    let songName = song.slice(0, song.indexOf(" by "));
    if (totalLipsync / lipsyncers.length >= 8 || totalLipsync / lipsyncers.length <= 1) {
        blots.push({queens: lipsyncQueens, lsSong: songName + "<br><small>" + songBy + "</small>", score: totalLipsync / lipsyncers.length});
    }
}
function lipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    if (riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getASLipsync();
        }
    } else {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getLipsync();
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore - bottomQueens[i].favoritism) + bottomQueens[i].unfavoritism;
        }
    }
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your lives! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(bottomQueens);
    if (event != false) {
        let eventQueen = bottomQueens.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = bottomQueens.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(bottomQueens, song);
    if (!riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore + bottomQueens[i].favoritism) - bottomQueens[i].unfavoritism;
        }
    }
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "lipSync()");
}
function teamLipSyncDesc() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your lives! Good luck and don't fuck it up.");
    let wholipsyncs;
    let wholipsyncs1;
    if (randomNumber(100) <= 50) {
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenA;
        wholipsyncs = true;
    }
    else {
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenB;
        wholipsyncs = false;
    }
    if (randomNumber(100) <= 50) {
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenA;
        wholipsyncs1 = true;
    } else {
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenB;
        wholipsyncs1 = false;
    }
    screen.createImage(bottomQueens[0].lipsyncQueen.image);
    screen.createImage(bottomQueens[1].lipsyncQueen.image);
    screen.createBold(`${bottomQueens[0].lipsyncQueen.getName()} and ${bottomQueens[1].lipsyncQueen.getName()} will be lip-syncing`);
    let song = lsSong().toString();
    screen.createHorizontalLine();
    if (randomNumber(100) >= 98 && wholipsyncs) {
        screen.createImage(bottomQueens[0].QueenB.image, "red");
        screen.createBold("OMG!! " + bottomQueens[0].QueenB.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenB;
    } else if (randomNumber(100) >= 98 && !wholipsyncs) {
        screen.createImage(bottomQueens[0].QueenA.image, "red");
        screen.createBold("OMG!! " + bottomQueens[0].QueenA.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenA;
    } else if (randomNumber(100) >= 98 && !wholipsyncs1) {
        screen.createImage(bottomQueens[1].QueenA.image, "red");
        screen.createBold("OMG!! " + bottomQueens[1].QueenA.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenA;
    } else if (randomNumber(100) >= 98 && wholipsyncs1) {
        screen.createImage(bottomQueens[1].QueenB.image, "red");
        screen.createBold("OMG!! " + bottomQueens[1].QueenB.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenB;
    }
    if (riggoryLipsync) {
        bottomQueens[0].lipsyncQueen.getASLipsync();
        bottomQueens[1].lipsyncQueen.getASLipsync();
        bottomQueens[0].lipsyncScore = bottomQueens[0].lipsyncQueen.lipsyncScore
        bottomQueens[1].lipsyncScore = bottomQueens[1].lipsyncQueen.lipsyncScore
    } else {
        bottomQueens[0].lipsyncQueen.getLipsync();
        bottomQueens[1].lipsyncQueen.getLipsync();
        bottomQueens[0].lipsyncScore = bottomQueens[0].lipsyncQueen.lipsyncScore
        bottomQueens[1].lipsyncScore = bottomQueens[1].lipsyncQueen.lipsyncScore
        bottomQueens[0].lipsyncScore -= (bottomQueens[0].favoritism + bottomQueens[0].unfavoritism);
        bottomQueens[1].lipsyncScore -= (bottomQueens[1].favoritism + bottomQueens[1].unfavoritism);
    }
    toBlots(bottomQueens, song);
    bottomQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    screen.createButton("Show result", "teamLipSync()");
}
function asLipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your legacy! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "asLipSync()");
}
let assassin;
function lsaLipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time to ruveal...");
    assassin = pickRandomlyFromArray(allQueens);
    bottomQueens.sort((a, b) => b.votes - a.votes);
    top2.push(assassin);
    screen.createImage(assassin.image, "royalblue");
    screen.createBold("The lip-sync assassin is... " + assassin.getName() + "!");
    screen.createParagraph("Now, it's time for you to lip-sync... for your legacy!");
    let song = lsSong().toString();
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "lsaLipSync()");
}

function finaleLipSyncsDesc1() {
    let screen = new Scene();
    screen.clean();
    for (let i = 0; i < firstLS.length; i++) {
        firstLS[i].getASLipsync();
    }
    if (canFinale) {
        screen.createHeader("Let the battle begin!!");
        screen.createBold(firstLS[0].getName() + " and " + firstLS[1].getName() + " will lip-sync for the finale...!");
    } else {
        screen.createHeader("The Lip-Syncs...");
        screen.createBold(firstLS[0].getName() + " and " + firstLS[1].getName() + " lip-sync...");
    }
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(firstLS);
    if (event != false) {
        let eventQueen = firstLS.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = firstLS.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = firstLS.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = firstLS.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = firstLS.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = firstLS.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(firstLS, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    if (canFinale) {
        screen.createButton("Show result", "canadaS2LipSyncs1()");
    } else {
        screen.createButton("Show result", "finaleLipSyncs()");
    }
}

function finaleLipSyncsDesc2() {
    let screen = new Scene();
    screen.clean();
    for (let i = 0; i < secondLS.length; i++) {
        secondLS[i].getASLipsync();
    }
    screen.createHeader("The Lip-Syncs...");
    if (canFinale) {
        screen.createBold(secondLS[0].getName() + " and " + secondLS[1].getName() + " will lip-sync for the finale...!");
    } else {
        screen.createBold(secondLS[0].getName() + " and " + secondLS[1].getName() + " lip-sync...");
    }
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(secondLS);
    if (event != false) {
        let eventQueen = secondLS.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = secondLS.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = secondLS.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = secondLS.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = secondLS.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = secondLS.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(secondLS, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    if (canFinale) {
        screen.createButton("Show result", "canadaS2LipSyncs2()");
    } else {
        screen.createButton("Show result", "finaleLipSyncs2()");
    }
}

function finaleLipSyncsDesc3() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("The end...");
    for (let i = 0; i < finalLS.length; i++) {
        finalLS[i].getASLipsync();
        finalLS[i].getFinale();
    }
    if (finaleof4gurl) {
        screen.createBold(finalLS[0].getName() + ", " + finalLS[1].getName() + ", " + finalLS[2].getName() + " and " + finalLS[3].getName() + " will lip-sync for the crown...!");
        screen.createImage(finalLS[0].image);
        screen.createImage(finalLS[1].image);
        screen.createImage(finalLS[2].image);
        screen.createImage(finalLS[3].image);
    } else if (isThisA3Way) {
        screen.createBold(finalLS[0].getName() + ", " + finalLS[1].getName() + " and " + finalLS[2].getName() + " will lip-sync for the crown...!");
        screen.createImage(finalLS[0].image);
        screen.createImage(finalLS[1].image);
        screen.createImage(finalLS[2].image);
    } else {
        screen.createBold(finalLS[0].getName() + " and " + finalLS[1].getName() + " will lip-sync for the crown...!");
        screen.createImage(finalLS[0].image);
        screen.createImage(finalLS[1].image);
    }
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(finalLS);
    if (event != false) {
        let eventQueen = finalLS.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = finalLS.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = finalLS.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = finalLS.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = finalLS.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = finalLS.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(finalLS, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    if (shedadhh) {
        screen.createButton("Show result", "shedadhhLipSync()");
        shedadhh = false;
    } else {
        screen.createButton("Show result", "finalLipSync()");
        onTop4Finale = true;
        onFinale = true;
        chocolateBarTwistCheck = true;
    }
}
function finaleCanadaLipsync() {
    let screen = new Scene();
    screen.clean();
    for (let i = 0; i < secondLS.length; i++) {
        finalLS[i].getASLipsync();
    }
    screen.createHeader("The Lip-Syncs...");
    screen.createBold(finalLS[0].getName() + " and " + finalLS[1].getName() + " will lip-sync for the finale...!");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(finalLS);
    if (event != false) {
        let eventQueen = finalLS.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = finalLS.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = finalLS.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = finalLS.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = finalLS.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = finalLS.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(finalLS, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "canadaS2LipSyncs3()");
}

function createLipsyncDesc(slay, great, good, bad, flop) {
    let screen = new Scene();
    let word = "lipsync";
    if (currentCast.length == 5 && top5) {
        word = "final performance";
    }
    if (slay.length !== 0) {
        for (let i = 0; i < slay.length; i++)
            screen.createImage(slay[i].image);
        screen.createBold("", "slay");
        let slayText = document.getElementById("slay");
        for (let i = 0; i < slay.length; i++)
            slayText.innerHTML += `${slay[i].getName()}, `;
        slayText.innerHTML += "slayed the " + word + "!!";
    }
    if (great.length !== 0) {
        for (let i = 0; i < great.length; i++)
            screen.createImage(great[i].image);
        screen.createBold("", "great");
        let greatText = document.getElementById("great");
        for (let i = 0; i < great.length; i++)
            greatText.innerHTML += `${great[i].getName()}, `;
        greatText.innerHTML += "had a great "+ word + "!";
    }
    if (good.length !== 0) {
        for (let i = 0; i < good.length; i++)
            screen.createImage(good[i].image);
        screen.createBold("", "good");
        let goodText = document.getElementById("good");
        for (let i = 0; i < good.length; i++)
            goodText.innerHTML += `${good[i].getName()}, `;
        goodText.innerHTML += "had a good " + word + ".";
    }
    if (bad.length !== 0) {
        for (let i = 0; i < bad.length; i++)
            screen.createImage(bad[i].image);
        screen.createBold("", "bad");
        let badText = document.getElementById("bad");
        for (let i = 0; i < bad.length; i++)
            badText.innerHTML += `${bad[i].getName()}, `;
        badText.innerHTML += "had a bad " + word + "...";
    }
    if (flop.length !== 0) {
        for (let i = 0; i < flop.length; i++)
            screen.createImage(flop[i].image);
        screen.createBold("", "flop");
        let flopText = document.getElementById("flop");
        for (let i = 0; i < flop.length; i++)
            flopText.innerHTML += `${flop[i].getName()}, `;
        flopText.innerHTML += "flopped the " + word + "...";
    }
}
function reunion() {
    let screen = new Scene();
    if (team) {
        for (let i = 0; i < currentCast.length; i++) {
            if (currentCast[i].QueenA != undefined) {
                currentCast.push(currentCast[i].QueenA);
                currentCast.push(currentCast[i].QueenB);
                currentCast.splice(i,1);
                i--;
            }
        }
    }
    screen.clean();
    screen.createHeader("The Reunion!");
    missCong();
    if (currentCast.length == 4 && canFinale)
        screen.createButton("Proceed", "canadaS2Finale()");
    else if (currentCast.length == 5 && top5)
        screen.createButton("Proceed", "finaleT5()");
    else if (currentCast.length == 4 && teamsF)
        screen.createButton("Proceed", "finaleTeam()");
    else if (currentCast.length == 4 && lftc)
        screen.createButton("Proceed", "finaleLS()");
    else if (currentCast.length == 4 && top4)
        screen.createButton("Proceed", "finaleTop4()");
    else if (currentCast.length == 4 && allstars3Finale)
        screen.createButton("Proceed", "finaleAS()");
    else
        screen.createButton("Proceed", "finale()");
}
const queenCardTemplate = document.querySelector("[data-drag-template]");
const queenCardContainer = document.querySelector("[data-drag-cards-container]");
const searchInput = document.querySelector("[data-search]");
let chosenKweensContainer = document.getElementById("chosenKweens");

function moreKweens() {
    let button = document.getElementById("randomK");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomKC");
    if (currentCast.length < 20) {
        button.classList.toggle("hide", false);
        button1.classList.toggle("hide", true);
        button2.classList.toggle("hide", false);
        searchInput.removeAttribute("readonly");
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "Type a name..");
    } else {
        window.alert("Remove one contestant of your current cast..");
    }
}

let showingQueens = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    showingQueens.forEach(queen => {
        const isVisible = queen.name.toLowerCase().includes(value);
        if (value == "") {
            queen.element.classList.toggle("hide", isVisible);
        } else {
            queen.element.classList.toggle("hide", !isVisible);
        }
    });
});

showingQueens = allQueens.map(queen => {
    const card = queenCardTemplate.content.cloneNode(true).children[0];
    const cardImage = card.querySelector("[data-image]");
    const header = card.querySelector("[data-header]");
    let image = document.createElement("img");
    image.src = queen.image;
    image.setAttribute("style", `border-color: black; width: 105px; height: 105px;`);
    cardImage.appendChild(image);
    header.textContent = queen._name;
    card.setAttribute("id", queen._name);
    cardImage.setAttribute("id", queen._name);
    header.setAttribute("id", queen._name);
    image.setAttribute("id", queen._name);
    queenCardContainer.append(card);
    return { name: queen._name, element: card}
});

queenCardContainer.addEventListener("click", e => {
    if (e.target && (e.target.matches("div.card") || e.target.parentNode.matches("div.card") || e.target.matches("img") ) ) {
        let id;
        if (e.target.matches("div.card")) {
            id = e.target.id
        } else if (e.target.parentNode.matches("div.card")) {
            id = e.target.parentNode.id
        } else if (e.target.matches("img")) {
            id = e.target.parentNode.parentNode.id
        }
        let queenFound = allQueens.find((queen) => {
            return queen._name == id
        });
        //get selected names and compare them to the all queens list:
        for (let k = 0; k < allQueens.length; k++) {
            if (queenFound.getName() == allQueens[k].getName()) {
                currentCast.push(allQueens[k]);
                break;
            }
        }
        updateCast();
        resetSearch();
        let button = document.getElementById("randomK");
        let button1 = document.getElementById("moreK");
        if (currentCast.length == 20) {
            searchInput.setAttribute("readonly", true);
            searchInput.removeAttribute("placeholder");
            searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
            button.classList.toggle("hide", true);
            button1.classList.toggle("hide", false);
        }
        let big = document.getElementById("castBig");
        if (currentCast.length != 0) {
            big.classList.toggle("hide", false);
            big.innerHTML = "Current Cast: " + currentCast.length;
        }
    }
})

function updateCast() {
    chosenKweensContainer.innerHTML = "";
    currentCast.forEach(queen => {
        chosenKweensContainer.innerHTML += addKween(queen);
    });
}

function addKween(queen) {
    return `<div  class="card">
        <div class="data-image">
            <img src="`+queen.image+`" style= "border-color: black; width: 105px; height: 105px;"/>
        </div>
        <div class="data-header">`+queen._name+`</div>
        <div class="data-body" id="`+queen._name+`"><button id="remove">X</button></div>
        </div>`
}

function resetSearch() {
    searchInput.value = "";
    showingQueens.forEach(queen => {
        queen.element.classList.toggle("hide", true);
    });
}

chosenKweensContainer.addEventListener("click",function(e) {
    if (e.target && e.target.matches("button#remove")) {
        let id = e.target.parentNode.id;
        let queenFound = currentCast.find((queen) => {
            return queen._name == id
        });
        currentCast.splice(currentCast.indexOf(queenFound), 1);
        updateCast();
        let big = document.getElementById("castBig");
        big.innerHTML = "Current Cast: " + currentCast.length;
        if (currentCast.length == 0) {
            big.classList.toggle("hide", true);
        }
    }
})
function chooseLateQueen() {
    let screen = new Scene();
    screen.clean();
    let title = document.querySelector("h1#MainTitle");
    title.innerHTML = "Choose the contestant that will miss the premiere";
    let main = document.querySelector("div#MainBlock");
    let castSelection = document.createElement("p");
    castSelection.setAttribute("id", "castSelection");
    castSelection.innerHTML = '';
    let select = document.createElement("select");
    select.setAttribute("id", "queenList");
    select.setAttribute("onchange", "returnImg()");
    let img = document.createElement("img");
    img.setAttribute("id", "images");
    img.setAttribute("style", "width: 105px; height: 105px;");
    let p = document.createElement("p");
    p.appendChild(img);
    for (let k = 0; k < currentCast.length; k++) {
        let option = document.createElement("option");
        option.innerHTML = currentCast[k].getName();
        option.value = currentCast[k].image;
        select.add(option);
    }
    select.selectedIndex = randomNumber(currentCast.length);
    let br = document.createElement("br");
    castSelection.appendChild(p);
    castSelection.appendChild(select);
    castSelection.appendChild(br);
    main.appendChild(castSelection);
    returnImg();
    screen.createButton("Choose", "fijarLateQueen()", "fijar");
}
function fijarLateQueen() {
    let screen = new Scene();
    let select = document.getElementById("queenList");
    let value = select.options[select.selectedIndex].text;
    let button = document.getElementById("fijar");
    for (let k = 0; k < currentCast.length; k++) {
        if (value == currentCast[k].getName()){
            lateQueen = currentCast[k];
        }
    }
    button.remove();
    select.remove();
    screen.createBold(lateQueen.getName());
    lateQueen.addToTrackRecord('');
    screen.createButton("Proceed", "newEpisode()");
}

function addRandomContestant() {
    let button = document.getElementById("randomK");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomKC");
    let noCustom = allQueens.filter(queen => { return queen.customqueen == false });
    let randomContestant = pickRandomlyFromArray(noCustom);
    while (currentCast.find( (queen) => {
        return queen.getName() == randomContestant.getName()
    })) {
        randomContestant = pickRandomlyFromArray(noCustom);
    }
    currentCast.push(randomContestant);
    updateCast();
    if (currentCast.length >= 20) {
        searchInput.setAttribute("readonly", true);
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
        button.classList.toggle("hide", true);
        button1.classList.toggle("hide", false);
        button2.classList.toggle("hide", true);
    }
    let big = document.getElementById("castBig");
    if (currentCast.length != 0) {
        big.classList.toggle("hide", false);
        big.innerHTML = "Current Cast: " + currentCast.length;
    }
}
function addRandomCustomContestant() {
    let button = document.getElementById("randomKC");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomK");
    let noCustom = allQueens.filter(queen => { return queen.customqueen == true });
    let randomContestant = pickRandomlyFromArray(noCustom);
    while (currentCast.find( (queen) => {
        return queen.getName() == randomContestant.getName()
    })) {
        randomContestant = pickRandomlyFromArray(noCustom);
    }
    currentCast.push(randomContestant);
    updateCast();
    if (currentCast.length >= 20) {
        searchInput.setAttribute("readonly", true);
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
        button.classList.toggle("hide", true);
        button1.classList.toggle("hide", false);
        button2.classList.toggle("hide", true);
    }
    let big = document.getElementById("castBig");
    if (currentCast.length != 0) {
        big.classList.toggle("hide", false);
        big.innerHTML = "Current Cast: " + currentCast.length;
    }
}
function doublePremChoose() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Premieres!");
    screen.createParagraph("Choose the contestants entering in the first premiere!");
    screen.createHorizontalLine();
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let br = document.createElement("br");
    for (let i = 0; i < currentCast.length / 2; i++) {
        let select = document.createElement("select");
        select.setAttribute("class", "queenList");
        select.setAttribute("id", i);
        select.setAttribute("onchange", "setImage()");
        let img = document.createElement("img");
        img.setAttribute("class", "images");
        img.setAttribute("id", "image" + i);
        img.setAttribute("style", "width: 105px; height: 105px;")
        let p = document.createElement("p");
        p.appendChild(img);
        for (let k = 0; k < currentCast.length; k++) {
            let option = document.createElement("option");
            option.innerHTML = currentCast[k].getName();
            option.value = currentCast[k].image;
            select.add(option);
        }
        select.selectedIndex = randomNumber(currentCast.length);
        centering.appendChild(p);
        centering.appendChild(select);
        centering.appendChild(br);
        centering.appendChild(br);
    }
    main.appendChild(centering);
    main.appendChild(br);
    setImage();
    if (currentCast.length % 2 == 0) {
        screen.createButton("Proceed","", "createTeam");
        let createTeam = document.getElementById("createTeam");
        createTeam.addEventListener("click", () => {
            for (let i = 0; i < currentCast.length / 2; i++) {
                let select = document.getElementById(i.toString());
                let value = select.options[select.selectedIndex].text;
                let queen;
                for (let k = 0; k < currentCast.length; k++) {
                    if (value == currentCast[k].getName()) {
                        queen = currentCast[k];
                    }
                }
                if (firstCast.find( (q) => {
                    return q.getName() == queen.getName()
                })) {
                    window.alert("Choose different contestants.");
                    firstCast = [];
                    break;
                } else {
                    firstCast.push(queen);
                    if (i == (currentCast.length / 2) - 1) {
                        for (let a = 0; a < firstCast.length; a++) {
                            currentCast.splice(currentCast.indexOf(firstCast[a]), 1);
                        }
                        secondCast = [...currentCast];
                        currentCast = firstCast;
                        for (let i = 0; i < secondCast.length; i++) {
                            secondCast[i].addToTrackRecord("");
                        }
                        miniChallenge();
                    }
                }
            }
        });
    }
    if (currentCast.length % 2 == 1) {
        screen.createButton("Proceed","", "createTeam");
        let createTeam = document.getElementById("createTeam");
        createTeam.addEventListener("click", () => {
            for (let i = 0; i < Math.floor(currentCast.length / 2); i++) {
                let select = document.getElementById(i.toString());
                let value = select.options[select.selectedIndex].text;
                let queen;
                for (let k = 0; k < currentCast.length; k++) {
                    if (value == currentCast[k].getName()) {
                        queen = currentCast[k];
                    }
                }
                if (firstCast.find( (q) => {
                    return q.getName() == queen.getName()
                })) {
                    window.alert("Choose different contestants.");
                    firstCast = [];
                    break;
                } else {
                    firstCast.push(queen);
                    if (i == Math.floor(currentCast.length / 2) - 1) {
                        for (let a = 0; a < firstCast.length; a++) {
                            currentCast.splice(currentCast.indexOf(firstCast[a]), 1);
                        }
                        secondCast = [...currentCast];
                        currentCast = firstCast;
                        for (let i = 0; i < secondCast.length; i++) {
                            secondCast[i].addToTrackRecord("");
                        }
                        miniChallenge();
                    }
                }
            }
        });
    }

}
function checkForLipsyncEvent(lipsyncContestants) {
    let screen = new Scene();
    if (randomNumber(1000) >= 900) {
        let queen = pickRandomlyFromArray(lipsyncContestants);
        let event = lipsyncsEventsBad[randomNumber(lipsyncsEventsBad.length - 1)]; // is this intentionally -2 instead of -1? // changed it but still not sure if it should be -1 or 0 TODO
        if (randomNumber(1000) == 777) {
            event = lipsyncsEventsBad[5];
        }
        screen.createImage(queen.image, "red");
        screen.createBold("Oh no! " + queen.getName() + " " + event.event);
        return {queen: queen, points: event.penalization}
    } else if (randomNumber(1000) >= 900) {
        let queen = pickRandomlyFromArray(lipsyncContestants);
        let event = pickRandomlyFromArray(lipsyncsEventsGood);
        screen.createImage(queen.image, "green");
        screen.createBold(queen.getName() + " " + event.event);
        return {queen: queen, points: event.points}
    } else {
        return false
    }
}
function stillImmune() {
    if ((s14Premiere || s6Premiere) && premiereCounter <= 2) {
        return false
    } else if (totalCastSize <= 10 && episodeCount < 5 || totalCastSize > 10 && totalCastSize <= 15 && episodeCount < 6 || totalCastSize > 15 && episodeCount < 7) {
        return true
    } else {
        return false
    }
}
function giveImmunity() {
    if ((s14Premiere || s6Premiere) && premiereCounter <= 2) {
        return false
    } else if (totalCastSize <= 10 && episodeCount < 4 || totalCastSize > 10 && totalCastSize <= 15 && episodeCount < 5 || totalCastSize > 15 && episodeCount < 6) { 
        for (let i = 0; i < currentCast.length; i++) {
            if (currentCast[i].immuneEp.find(ep => {
                return ep == episodeCount - 1
            }) == undefined) {
                currentCast[i].immune = false;
            }
        }
        return true
    } else {
        return false
    }
}
