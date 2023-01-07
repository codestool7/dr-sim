import { sortQueensByName } from "../utils/utils";
import Queen from "./competitors/Queen";
import Episode from "./Episode";

export default class Season {
    name: string;
    queens: Array<Queen>;
    episodes: Array<Episode>;



    // TODO add settings
    // do we need isCustom?

    constructor(name: string, queens: Array<Queen>) {
        this.name = name;
        this.queens = sortQueensByName(queens);
        this.episodes = [];
        this.initializeAllRelations();
    }

    initializeAllRelations() {
        for (let i = 0; i < this.queens.length; i++) {
            this.queens[i].initializeRelations(this.queens);
        }
    }

    getActiveQueens(): Array<Queen> {
        let active: Queen[] = [];
        for (let i = 0; i < this.queens.length; i++) {
            if (this.queens[i].active) {
                active.push(this.queens[i]);
            }
        }
        return active;
    }
}
