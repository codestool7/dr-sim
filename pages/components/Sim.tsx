import React from 'react';
import collection from 'lodash/collection';
import { AppProps, AppState } from '../misc/types';
import Header from './lilbabies/Header';
import CastPicker from "./CastPicker";
import { pickRandomlyFromArray, pickBallTheme, randomNumber, randomNumberWithMin } from "../utils/utils";
//import { Scene, MiniChallenge, ActingChallenge, ComedyChallenge, MarketingChallenge, DanceChallenge, DesignChallenge, RunwayChallenge, ImprovChallenge, SnatchGame, Rusical, Ball, Rumix, GirlGroup, TalentShow } from "./classes";
import {queensReads, whoWhyCompetition, whoWhyRelation, lipsyncsEventsBad, lipsyncsEventsGood, miniChallengeDescriptions1, miniChallengeDescriptions2, actingChallengeDescriptions1, actingChallengeDescriptions2, comedyChallengeDescriptions1, comedyChallengeDescriptions2, marketingDescriptions1, marketingDescriptions2, danceDescriptions, designDescriptions, makeoverOptions, runwayDescriptions, improvDescriptions, rusicalDescriptions, themedBallDescriptions, ballDescriptions1, ballDescriptions2, ballDescriptions3, rumixDescriptions, girlGroupDescriptions, talentOptions, reasoningQueens, twoQueensRelation1, twoQueensRelation2, twoQueensRelation3, twoQueensRelation3_2, twoQueensRelation4, twoQueensRelation4_2, twoQueensRelation5, threeQueensRelation1, threeQueensRelation2, threeQueensRelation3, threeQueensRelation4, fourQueensRelation1, fourQueensRelation2, fourQueensRelation3, fourQueensRelation4, multipleQueensRelation} from "../misc/constants";
import Queen from '../classes/Queen';
import Season from '../classes/Season';
import { fetchQueensAndSeasons } from '../utils/queenUtils';

export default class Sim extends React.Component<AppProps, AppState> {
    allQueens: Array<Queen>;
    allSeasons: Array<Season>;

    constructor(props: AppProps) {
        super(props);
        this.state = {};
        let data = fetchQueensAndSeasons();
        this.allQueens = data.queens;
        this.allSeasons = data.seasons;
    }
    
    componentDidMount() {
        
    }
    
    componentWillUnmount() {
    }

    render() {
        return <div>
            <Header
                text="Drag Race Simulator!"
            />
            <CastPicker
                queens={this.allQueens}
            />
        </div>;
    }
}

/* 
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

//GENERAL CHALLENGES:
let team1 = [];
let team2 = [];
let team3 = [];
let team4 = [];
let team5 = [];
let isTeamChallenge = false;
let isPairChallenge = false;


//performance:


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
            castTeams = collection.shuffle(castTeams);
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
function canadaS2LipSyncs3() {
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

let s9PremiereCheck = false;
let uk3PremiereCheck = false;

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
    lipsyncorder = collection.shuffle(lipsyncorder);
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
    lipsyncorder = collection.shuffle(lipsyncorder);
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
    lipsyncorder = collection.shuffle(lipsyncorder);
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
 */