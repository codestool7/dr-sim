import Competitor from "./Competitor";
import Queen from "./Queen";

export default class Team implements Competitor {
    queens: Array<Queen>;
    name: string;
    actingStat: number;
    comedyStat: number;
    danceStat: number;
    designStat: number;
    improvStat: number;
    runwayStat: number;
    lipsyncStat: number;

    constructor(queens: Array<Queen>) {
        // calculate and set
    }
}
