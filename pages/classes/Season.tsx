import Queen from "./Queen";

export default class Season {
    name: string;
    queens: Array<Queen>;
    // TODO add settings
    // do we need isCustom?

    constructor(name: string, queens: Array<Queen>) {
        this.name = name;
        this.queens = queens;
    }

    getName() {
        return this.name;
    }

    getQueens() {
        return this.queens;
    }
}
