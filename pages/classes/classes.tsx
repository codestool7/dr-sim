export {};

/*

export class ActingChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will act in a " + pickRandomlyFromArray(actingChallengeDescriptions1) + " named " + pickRandomlyFromArray(actingChallengeDescriptions2);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].getActing();
        }
        sortPerformances(currentCast);
    }
}

export class ComedyChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        let whatChallengeIs;
        if (currentCast.length > 8) {
            whatChallengeIs = comedyChallengeDescriptions1[0];
            episodeChallenges.push("Stand Up");
        } else {
            whatChallengeIs = comedyChallengeDescriptions1[1];
            episodeChallenges.push("Roast");
        }
        description.innerHTML = "The queens will participate in " + whatChallengeIs + " about " + pickRandomlyFromArray(comedyChallengeDescriptions2);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getComedy();
        sortPerformances(currentCast);
    }
}

export class MarketingChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will participate in " + pickRandomlyFromArray(marketingDescriptions1) + " about " + pickRandomlyFromArray(marketingDescriptions2);
        episodeChallenges.push("Advert");
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getMarketing();
        sortPerformances(currentCast);
    }
}

export class DanceChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will participate in a dance number about " + pickRandomlyFromArray(danceDescriptions);
        if (randomNumber(100) >= 50) {
            episodeChallenges.push("Dance");
        } else {
            episodeChallenges.push("Choreo");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getDance();
        sortPerformances(currentCast);
    }
}

export class DesignChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        if (currentCast.length == 6 && makeoverCounter == false && team == false && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens) {
            
            description.innerHTML = "It's the makeover challenge! The queens will make "+ pickRandomlyFromArray(makeoverOptions) + " their drag sisters!";
        }
        else if (currentCast.length == totalCastSize && (uk3Premiere || s9Premiere) && !s9PremiereCheck && !uk3PremiereCheck) {
            description.innerHTML = "The queens will bring it to the runway and serve not one but two looks!";
        }
        else
            description.innerHTML = "The queens will do outfits with " + pickRandomlyFromArray(designDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getDesign();
        sortPerformances(currentCast);
    }
}

export class RunwayChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will bring it to the runway! The category is: " + pickRandomlyFromArray(runwayDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRunwayChallenge();
        sortPerformances(currentCast);
    }
}

export class ImprovChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        let whatChallengeIs = randomNumber(13);
        description.innerHTML = "The queens will improvise in a " + pickRandomlyFromArray(improvDescriptions);
        if (whatChallengeIs == 0) {
            episodeChallenges.push("Political Debate");
        } else if (whatChallengeIs == 4) {
            episodeChallenges.push("The Bossy Rossy Show");
        } else if (whatChallengeIs == 6) {
            episodeChallenges.push("The Bitchelor");
        } else {
            episodeChallenges.push("Improv");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getImprov();
        sortPerformances(currentCast);
    }
}

export class SnatchGameChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... SNATCH GAME!! The queens will do funny celebrity impersonations!";
        if (randomNumber(100) >= 95) {
            episodeChallenges.push("Snatch Game of Love");
        } else {
            episodeChallenges.push("Snatch Game");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getSnatch();
        sortPerformances(currentCast);
    }
}

export class RusicalChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... THE RUSICAL!! The queens were tasked to take part in " + pickRandomlyFromArray(rusicalDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRusical();
        sortPerformances(currentCast);
    }
}

export class BallChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        if (randomNumber(100) >= 35) {
            let ballTheme = pickBallTheme(themedBallDescriptions);
            description.innerHTML = "Today's challenge is... THE BALL! The " + ballTheme.name + " Ball!! And the themes are: " + ballTheme.themes + ".";
        } else {
            description.innerHTML = "Today's challenge is... THE BALL! The queens will bring three looks to the runway! The themes are: " + pickRandomlyFromArray(ballDescriptions1) + ", " + pickRandomlyFromArray(ballDescriptions2) + ", and " + pickRandomlyFromArray(ballDescriptions3); 
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getBall();
        sortPerformances(currentCast);
    }
}

export class RumixChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... the rumix! The queens will make a verse and a choreography for " + pickRandomlyFromArray(rumixDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRumix();
        sortPerformances(currentCast);
    }
}

export class GirlGroupChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The remaining queens will record vocals and perform in a Girl Group number for the original song " + pickRandomlyFromArray(girlGroupDescriptions) + ".";
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRumix();
        sortPerformances(currentCast);
    }
}

export class TalentShowChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "In this first challenge, the queens will prove themselves in a talent show, where they bring all they've got!";
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getTalentShow();
        sortPerformances(currentCast);
    }
}
 */



// here shall be the team classes that I partially changed but think I want to revamp further:

/*

import math from 'lodash/math';
import { teamNames } from "../misc/constants";
import Queen from "./Queen";

export default class Team extends Queen {
    queens: Array<Queen>;
    teamName: string;

    constructor(queenA: Queen, queenB: Queen) {
        let queens = [queenA, queenB];
        queens.sort((a, b) => a.getName().toLocaleLowerCase().localeCompare(b.getName().toLocaleLowerCase()));
        let queen1 = queens[0];
        let queen2 = queens[1];
        let name = getPredeterminedTeamName(queen1, queen2);
        if (!name) {
            let queen1NamePieces = queen1.getName().split(' ');
            let queen2NamePieces = queen2.getName().split(' ');
            // idrk what this section is doing but I'm gonna leave it for now...
            if (queen1NamePieces[0].length == 3 && queen2NamePieces[0].length > 3)
                name = "Team " + queen1NamePieces[0] + queen2NamePieces[0].slice(queen2NamePieces[0].length - 4, queen2NamePieces[0].length);
            else if (queen1NamePieces[0].length > 3 && queen2NamePieces[0].length == 3)
                name = "Team " + queen1NamePieces[0].slice(0, 4) + queen2NamePieces[0];
            else if (queen1NamePieces[0].length == 3 && queen2NamePieces[0].length == 3)
                name = "Team " + queen1NamePieces[0] + queen2NamePieces[0];
            else
                name = "Team " + queen1NamePieces[0].slice(0, 4) + queen2NamePieces[0].slice(queen2NamePieces[0].length - 4, queen2NamePieces[0].length);
        }
        // set team lip sync score to 0 bc we'll use the score of the queen who's lipsyncing
        super(name, math.mean(queen1.getActingStat(), queen2.getActingStat()), math.mean(queen1.getComedyStat(), queen2.getComedyStat()), math.mean(queen1.getDanceStat(), queen2.getDanceStat()), math.mean(queen1.getDesignStat(), queen2.getDesignStat()), math.mean(queen1.getImprovStat(), queen2.getImprovStat()), math.mean(queen1.getRunwayStat(), queen2.getRunwayStat()), 0);
        this.queens = queens;
        this.teamName = name;
    }

    getQueens() {
        return this.queens;
    }

    getTeamName() {
        return this.teamName;
    }
}

function getPredeterminedTeamName(q1: Queen, q2: Queen): string {
    if (q1.getName() == "Mrs. Kasha Davis") {
        return "Team Mrs. " + q2.getName().split(" ")[0] + " Davis";
    }
    else if (q2.getName() == "Mrs. Kasha Davis") {
        return "Team Mrs. " + q1.getName().split(" ")[0] + " Davis";
    }
    else {
        for (var entry of teamNames) {
            if (entry.queenNames[0] == q1.getName() && entry.queenNames[1] == q2.getName()) {
                return "Team " + entry.teamName;
            }
        }
    }
    return "";
}


*/


/*

import Queen from "./Queen";

export default class TeamForChallenge extends Queen {
    constructor (Queens: Array<Queen>){
        super(Queens[0].getName(), Queens[0]._actingStat, Queens[0]._comedyStat, Queens[0]._danceStat, Queens[0]._designStat, Queens[0]._improvStat, Queens[0]._runwayStat, 0);
        this.queens = Queens;
    }
}


*/