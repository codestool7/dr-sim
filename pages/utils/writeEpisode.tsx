import Challenge from "../classes/Challenge";
import Queen from "../classes/competitors/Queen";
import Episode from "../classes/Episode";
import Season from "../classes/Season";
import { miniChallengeDescriptions1, miniChallengeDescriptions2 } from "../misc/constants";
import { MiniType } from "../misc/enums";
import { areQueensEqual, pickRandomlyFromArray, randomNumber } from "./utils";

export default function writeEpisode(season: Season): Episode {
    
    const mini: Challenge = generateMiniChallenge(season);
    const miniwinners: Array<Queen> = pickMiniWinners(season);

    
    return new Episode(mini, miniwinners);



}

function generateMiniChallenge(season: Season): Challenge {
    let type: MiniType;
    let description: string;
    if (season.getTotalQueenCount() >= 10 && season.getActiveQueenCount() == 7) {
        type = MiniType.Reading;
        description = "The library is open! In today's mini-challenge, the queens will read each other!";
    } else if (season.getTotalQueenCount() > 5 && season.getActiveQueenCount() == 5) {
        type = MiniType.Puppet;
        description = "Bring in the puppets! The queens will parody each other using puppets!";
    } else {
        type = MiniType.Standard;
        description = "In today's mini-challenge, the queens will " + pickRandomlyFromArray(miniChallengeDescriptions1) + " " + pickRandomlyFromArray(miniChallengeDescriptions2);
    }
    return new Challenge(type, description);
}

function pickMiniWinners(season: Season): Array<Queen> {
    let winners: Queen[] = [];
    if (randomNumber(100) < 90) {
        let winner: Queen = pickRandomlyFromArray(season.getActiveQueens());
        winners.push(winner);
    }else {
        let winner1: Queen = pickRandomlyFromArray(season.getActiveQueens());
        let winner2: Queen;
        do {
            winner2 = pickRandomlyFromArray(season.getActiveQueens());
        } while (areQueensEqual(winner1, winner2));
        winners.push(winner1);
        winners.push(winner2);
    }
    return winners;
}



















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

*/