import array from 'lodash/array';
import { MiniType } from '../misc/enums';
import { sortQueensByName } from "../utils/utils";
import Queen from "./competitors/Queen";
import Episode from "./Episode";

export default class Season {
    name: string;
    private queens: Array<Queen>;
    private episodes: Array<Episode>;

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

    getAllQueens(): Array<Queen> {
        return this.queens;
    }

    getTotalQueenCount(): number {
        return this.getAllQueens().length;
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

    getActiveQueenCount(): number {
        return this.getActiveQueens().length;
    }

    addEpisode(ep: Episode) {
        this.episodes.push(ep);
    }

    getAllEpisodes(): Array<Episode> {
        return this.episodes;
    }

    getEpisodeCount(): number {
        return this.episodes.length;
    }

    getCurrentEpisode(): Episode {
        return array.last(this.episodes);
    }

    readingChallengeDone(): boolean {
        for (let i = 0; i < this.episodes.length; i++) {
            if (this.episodes[i].miniChallenge.type == MiniType.Reading) {
                return true;
            }
        }
        return false;
    }
}
