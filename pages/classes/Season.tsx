import { sortQueens } from "../utils/utils";
import Queen from "./Queen";

export default class Season {
    name: string;
    queens: Array<Queen>;
    // TODO add settings
    // do we need isCustom?

    constructor(name: string, queens: Array<Queen>) {
        this.name = name;
        this.queens = sortQueens(queens);
        this.initializeAllRelations();
    }

    initializeAllRelations() {
        for (let i = 0; i < this.queens.length; i++) {
            this.queens[i].initializeRelations(this.queens);
        }
    }

    getName() {
        return this.name;
    }

    getQueens() {
        return this.queens;
    }
}
