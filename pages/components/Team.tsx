const { collection, math } = require('lodash');
import { teamNames } from "../misc/constants";
import Queen from "./Queen";

export default class Team extends Queen {
    queens: Array<Queen>;
    teamName: string;

    constructor(queenA: Queen, queenB: Queen) {
        let queens = [queenA, queenB];
        let sortedQueens = collection.orderBy(queens, [queen => queen.getName()], ['asc']); // TODO how to add queen type?

        let queen1 = sortedQueens[0];
        let queen2 = sortedQueens[1];
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
        this.queens = sortedQueens;
        this.teamName = name;
    }
}

function getPredeterminedTeamName(q1: Queen, q2: Queen): string {
    if (q1.getName() === "Mrs. Kasha Davis") {
        return "Team Mrs. " + q2.getName().split(" ")[0] + " Davis";
    }
    else if (q2.getName() === "Mrs. Kasha Davis") {
        return "Team Mrs. " + q1.getName().split(" ")[0] + " Davis";
    }
    else {
        for (var entry in teamNames) { // TODO why doesnt it recognize entry fields did I do the for in wrong
            if (entry.queens[0] === q1.getName() && entry.queens[1] === q2.getName()) {
                return "Team " + entry.teamName;
            }
        }
    }
    return "";
}
