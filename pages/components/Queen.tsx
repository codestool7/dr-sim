import { randomNumberWithMin } from "../misc/utils";

export default class Queen {
    trackRecord = [];
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
    maxiT = false;
    name: string;
    actingStat: number;
    comedyStat: number;
    danceStat: number;
    designStat: number;
    improvStat: number;
    runwayStat: number;
    lipsyncStat: number;
    image: string;

    constructor(name: string, acting: number, comedy: number, dance: number, design: number, improv: number, runway: number, lipsync: number, image = "noimage", custom = false) {
        this.name = name;
        this.actingStat = acting;
        this.comedyStat = comedy;
        this.danceStat = dance;
        this.designStat = design;
        this.improvStat = improv;
        this.runwayStat = runway;
        this.lipsyncStat = lipsync;
        if (image == "noimage")
            this.image = "image/queens/noimage.jpg";
        else if (custom == true)
            this.image = image;
        else
            this.image = "image/queens/" + image + ".webp";
    }
    
    calculateScores(min: number, max: number, stat = 0) {
        let score = randomNumberWithMin(min, max);
        return score - stat;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
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

    rollFinaleScore() {
        this.finaleScore = this.favoritism - this.unfavoritism;
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

    addToTrackRecord(placement) {
        this.trackRecord.push(placement);
    }

    editTrackRecord(added) {
        this.trackRecord[this.trackRecord.length - 1] += added;
    }
}
