import Challenge from "./Challenge";
import Queen from "./competitors/Queen";

export default class Episode {
    miniChallenge: Challenge;
    miniWinners: Array<Queen>;
    //maxiChallenge: Challenge;
    //maxiWinners: Array<Queen>;
    
    constructor(miniChallenge: Challenge, miniWinners: Array<Queen>/*, maxiChallenge: Challenge, maxiWinners: Array<Queen>*/) {
        this.miniChallenge = miniChallenge;
        this.miniWinners = miniWinners;
        //this.maxiChallenge = maxiChallenge;
        //this.maxiWinners = maxiWinners;
        // other placements, lipsync, elim
        // everything else that needs to be rolled or determined
    }
}
