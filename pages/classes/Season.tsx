const { array, lang } = require('lodash');
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

    addQueen(queen: Queen) {
        this.queens.push(queen);
    }

    removeQueen(queen: Queen) {
        let removed = array.remove(this.queens, function(q: Queen) {
            return lang.isEqual(q, queen);
        });
        if (!removed || removed.length < 1) {
            throw new Error("Failed to remove queen " + queen.getName() + " from season " + this.getName());
        }
        if (removed.length > 1) {
            throw new Error("Somehow removed multiple queens named " + queen.getName() + " from season " + this.getName() + "?? how did you do this bro");
        }
    }
}
