import array from 'lodash/array';
import lang from 'lodash/lang';
import { randomNumberWithMin } from "../utils/utils";

type Relationship = {
    queen: Queen,
    score: number
}

export default class Queen {
    /*trackRecord: string[] = [];
    friends = [];
    enemies = [];
    sisters = [];
    miniEpisode = [];
    tCaptain = [];
    voteHerstory = [];
    immuneEp = [];
    runwayScore = 0;
    lipsyncScore = 0;
    performanceScore = 0;
    finaleScore = 0;
    favoritism = 0;
    unfavoritism = 0;
    ppe = 0;
    stars = 0;
    episodesOn = 0;
    votes = 0;
    rankP = 0;
    retEp = 0;
    blocked = false;
    QueenDisqOrDept = false;
    customqueen = false;
    immune = false;
    chocolate = false;
    maxiT = false;*/
    
    name: string;
    actingStat: number;
    comedyStat: number;
    danceStat: number;
    designStat: number;
    improvStat: number;
    runwayStat: number;
    lipsyncStat: number;
    image: string;
    custom: boolean;
    sisters: Array<Relationship>;

    constructor(name: string, acting: number, comedy: number, dance: number, design: number, improv: number, runway: number, lipsync: number, image = "noimage", custom = false) {
        this.name = name;
        this.actingStat = acting;
        this.comedyStat = comedy;
        this.danceStat = dance;
        this.designStat = design;
        this.improvStat = improv;
        this.runwayStat = runway;
        this.lipsyncStat = lipsync;
        this.custom = custom;
        if (image == "noimage") {
            this.image = "image/noimage.jpg";
        }
        else if (custom == true) {
            this.image = image;
        }
        else {
            this.image = "/queens/" + image + ".webp";
        }

        this.sisters = [];
    }
    
    calculateScores(min: number, max: number, stat = 0) {
        let score = randomNumberWithMin(min, max);
        return score - stat;
    }

    initializeRelations(queens: Array<Queen>) {
        this.sisters = [];
        for (let i = 0; i < queens.length; i++) {
            let queen = queens[i];
            if (!this.isItMe(queen)) {
                let sis: Relationship = {queen: queen, score: 0};
                this.sisters.push(sis);
            }
        }
    }

    // adjusts the relationship witht the given queen the number of points (positive or negative)
    adjustRelationship(queen: Queen, adjustment: number) {
        let sisIndex = array.findIndex(this.sisters, function(s: Relationship) {
            return lang.isEqual(s.queen, queen);
        });
        this.sisters[sisIndex].score += adjustment;
    }

    // is given queen me? am I the drama?
    isItMe(q: Queen) {
        return lang.isEqual(this, q);
    }

    getFriends(): Array<Queen> {
        let friends: Array<Queen> = [];
        for (let i = 0; i < this.sisters.length; i++) {
            if (this.sisters[i].score >= 7) {
                friends.push(this.sisters[i].queen);
            }
        }
        return friends;
    }

    getEnemies(): Array<Queen> {
        let enemies: Array<Queen> = [];
        for (let i = 0; i < this.sisters.length; i++) {
            if (this.sisters[i].score <= -5) {
                enemies.push(this.sisters[i].queen);
            }
        }
        return enemies;
    }

    bestSister(): Queen | null {
        if(!this.sisters || this.sisters.length == 0) {
            return null;
        }
        let bestie = this.sisters[0];
        for (let i = 1; i < this.sisters.length; i++) {
            if (this.sisters[i].score > bestie.score) {
                bestie = this.sisters[i];
            }
        }
        return bestie.queen;
    }

    worstSister(): Queen | null {
        if(!this.sisters || this.sisters.length == 0) {
            return null;
        }
        let worstie = this.sisters[0];
        for (let i = 1; i < this.sisters.length; i++) {
            if (this.sisters[i].score < worstie.score) {
                worstie = this.sisters[i];
            }
        }
        return worstie.queen;
    }

    getName() {
        return this.name;
    }

    getActingStat() {
        return this.actingStat;
    }

    getComedyStat() {
        return this.comedyStat;
    }

    getDanceStat() {
        return this.danceStat;
    }

    getDesignStat() {
        return this.designStat;
    }

    getImprovStat() {
        return this.improvStat;
    }

    getRunwayStat() {
        return this.runwayStat;
    }

    getLipSyncStat() {
        return this.lipsyncStat;
    }

    getImage() {
        return this.image;
    }

    isCustom() {
        return this.custom;
    }
    /*
    getFinaleScore() {
        this.finaleScore = this.favoritism - this.unfavoritism;
    }

    rollActingScore() {
        this.performanceScore = this.calculateScores(15, 35, this.actingStat);
    }

    rollComedyScore() {
        this.performanceScore = this.calculateScores(15, 35, this.comedyStat);
    }

    rollMarketingScore() {
        this.performanceScore = this.calculateScores(25, 45, this.comedyStat + this.actingStat);
    }
    
    rollDanceScore() {
        this.performanceScore = this.calculateScores(15, 35, this.danceStat);
    }

    rollDesignScore() {
        this.performanceScore = this.calculateScores(15, 35, this.designStat);
    }

    rollRunwayScore() {
        this.performanceScore = this.calculateScores(15, 35, this.runwayStat);
    }

    rollImprovScore() {
        this.performanceScore = this.calculateScores(15, 35, this.improvStat);
    }

    rollSnatchScore() {
        this.performanceScore = this.calculateScores(25, 45, this.improvStat + this.comedyStat);
    }

    rollRusicalScore() {
        this.performanceScore = this.calculateScores(25, 45, this.danceStat + this.lipsyncStat);
    }

    rollBallScore() {
        this.performanceScore = this.calculateScores(25, 45, this.designStat + this.runwayStat);
    }

    rollRumixScore() {
        this.performanceScore = this.calculateScores(25, 45, this.danceStat + this.improvStat);
    }

    rollTalentScore() {
        this.performanceScore = this.calculateScores(15, 35, randomNumberWithMin(1, 35));
    }

    // TODO come back to this... this one is supposed to be the runway at the end and the other is when there's a runway CHALLENGE but I hate this whole system so I'm just doing this for now idfk
    rollRunwayScore2() {
        this.runwayScore = this.calculateScores(12, 35, this.runwayStat);
    }

    rollLipsyncScore() {
        this.lipsyncScore = this.calculateScores(0, this.lipsyncStat, this.unfavoritism) + this.favoritism;
    }

    rollASLipsyncScore() {
        this.lipsyncScore = this.calculateScores(0, this.lipsyncStat);
    }

    addToTrackRecord(placement: string) {
        this.trackRecord.push(placement);
    }
    
    editTrackRecord(added: string) {
        this.trackRecord[this.trackRecord.length - 1] += added;
    }*/
}
