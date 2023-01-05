export {};

/* function predefCast(cast, format, finale, premiere = '', returning = '') {
    currentCast = cast;
    totalCastSize = cast.length;
    if (format == "regular")
        regularFormat = true;
    else if (format == "thailand")
        thailandFormat = true;
    else if (format == "all-stars")
        all_stars = true;
    else if (format == "all-winners")
        all_winners = true;
    else if (format == "team")
        team = true;
    else if (format == "lipsync-assassin"){ 
        lipsync_assassin = true;
        allQueensCopy2 = [...allQueens];
        allQueens = allQueens.filter(function (queen) { return queen.getLipSyncStat() >= 11; });
        allQueens = allQueens.filter(function (queen) { return currentCast.indexOf(queen) == -1; });
        allQueensCopy = [...allQueens];
    }
    if (finale == "top5") {
        top5 = true;
    } else if (finale == "top4") {
        top4 = true;
    } else if (finale == "top3") {
        top3 = true;
    } else if (finale == "teams") {
        teamsF = true;
    } else if (finale == "LFTC") {
        lftc = true;
    } else if (finale == "LFTF") {
        canFinale = true;
    } else if (finale == "jury") {
        allstars3Finale = true;
    }
    if (premiere == "s6-premiere")
        s6Premiere = true;
    else if (premiere == "s9-premiere")
        s9Premiere = true;
    else if (premiere == "s12-premiere")
        s12Premiere = true;
    else if (premiere == "s14-premiere")
        s14Premiere = true;
    else if (premiere == "porkchop")
        porkchopPremiere = true;
    else if (premiere == "uk3-premiere")
        uk3Premiere = true;
    if (returning == "return")
        randomReturn = true;
    else if (returning == "choose")
        chooseReturn = true;
    else if (returning == "vote")
        voteReturn = true;
    else if (returning == "conjoined-queens")
        conjoinedQueens = true;
    else if (returning == "smackdown"){
        smackdown = true;
    }
    else if (returning == "lalaparuza")
        lalaparuza = true;
    else if (returning == "queensofcomedy")
        queensOfComedy = true;
    else if (returning == "kittygirlgroup")
        kittyGirlGroup = true;
    if (document.getElementById("immunity").checked == true)
        immunityTwist = true;
    if (document.getElementById("disableDouble").checked == true)
        noDouble = true;
    if (document.getElementById("riggory").checked == true)
        riggory = true;
    if (document.getElementById("riggoryLipsync").checked == true)
        riggoryLipsync = true;
    if (document.getElementById("chocolateBar").checked == true)
        chocolateBarTwist = true;
    else if (document.getElementById("chocolateBarChoosable").checked == true){
        chocolateBarTwist = true;
        chocolateBarTwistChoosable = true;
    }
    if (team && (chocolateBarTwist || immunityTwist)) {
        window.alert("The team format isn't supported with the chocolate bar twist or immunity, sorry!");
        team = false;
        smackdown = false;
        voteReturn = false;
        randomReturn = false;
        chooseReturn = false;
        lalaparuza = false;
        queensOfComedy = false;
        conjoinedQueens = false;
        kittyGirlGroup = false;
        s6Premiere = false;
        s9Premiere = false;
        s12Premiere = false;
        s14Premiere = false;
        porkchopPremiere = false;
        uk3Premiere = false;
        chocolateBarTwist = false;
        chocolateBarTwistChoosable = false;
        immunityTwist = false;
    }
    else if(all_winners && (smackdown || s14Premiere || s12Premiere || s9Premiere || s6Premiere || porkchopPremiere || uk3Premiere || voteReturn || conjoinedQueens || queensOfComedy || kittyGirlGroup || randomReturn || chooseReturn || lalaparuza || chocolateBarTwist)) {
        window.alert("The All Winners Format isn't avaliable with any combination of premiere, returning challenge or Chocolate Bar Twist, at this moment.");
        s14Premiere = false;
        s12Premiere = false;
        s9Premiere = false;
        s6Premiere = false;
        porkchopPremiere = false;
        uk3Premiere = false;
        top4 = false;
        top3 = false;
        regularFormat = false;
        thailandFormat = false;
        lftc = false;
        canFinale = false;
        lipsync_assassin = false;
        smackdown = false;
        all_stars = false;
        all_winners = false;
        allstars3Finale = false;
        smackdown = false;
        voteReturn = false;
        conjoinedQueens = false;
        queensOfComedy = false;
        kittyGirlGroup = false;
        randomReturn = false;
        chooseReturn = false;
        lalaparuza = false;
        chocolateBarTwist = false;
        chocolateBarTwistChoosable = false;
    }
    else if (chocolateBarTwist) {
        if (chocolateBarTwistChoosable){
            chooseGoldenBar();
        }else {
            giveChocolate();
        }
    }
    else if (s9Premiere) {
        chooseLateQueen();
    }
    else if (s6Premiere || s12Premiere || s14Premiere)
        doublePremiere();
    else if (porkchopPremiere) {
        porkchopLipsyncs();
    }
    else{
        newEpisode();
    }
}

function reSimulate() {
    loadSongs();
    queensReads = allReads;
    //add eliminated queens again to cast and clean it
    for (let i = 0; i < eliminatedCast.length; i++) {
        currentCast.push(eliminatedCast[i]);
    }
    if (lftc || canFinale || all_winners) {
        finalLS = [];
        firstLS = [];
        secondLS = [];
    }
    currentCast.sort((a, b) => a.getName().toLowerCase().localeCompare(b.getName().toLowerCase()));
    eliminatedCast = [];
    firstCast = [];
    secondCast = [];
    fullCast = [];
    premiereCounter = 0;
    episodeCount = 0;
    onFinale = false;
    onTop4Finale = false;
    totalCastSize = currentCast.length;
    disqOrDept = false;
    disqOrDeptFlag = false;
    gsFlag = false;
    threestars = false;
    flagThree = false;
    readingCheck = false;
    wht = [];
    teamList = [];
    qonfi = 0;
    homeTrigger = 0;
    //clean track records
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].trackRecord = [];
        currentCast[i].sisters = [];
        currentCast[i].enemies = [];
        currentCast[i].friends = [];
        currentCast[i].miniEpisode = [];
        currentCast[i].voteHerstory = [];
        currentCast[i].immuneEp = [];
        currentCast[i].favoritism = 0;
        currentCast[i].unfavoritism = 0;
        currentCast[i].finaleScore = 0;
        currentCast[i].votes = 0;
        currentCast[i].ppe = 0;
        currentCast[i].episodesOn = 0;
        currentCast[i].stars = 0;
        currentCast[i].winCount = 0;
        currentCast[i].rankP = 0;
        currentCast[i].retEp = 0;
        currentCast[i].QueenDisqOrDept = false;
        currentCast[i].chocolate = false;
        currentCast[i].blocked = false;
        currentCast[i].immune = false;
    }
    //clean challenges
    episodeChallenges = [];
    actingChallengeCounter = 0;
    comedyChallengeCounter = 0;
    marketingChallengeCounter = 0;
    danceChallengeCounter = 0;
    designChallengeCounter = 0;
    improvChallengeCounter = 0;
    rusicalCounter = false;
    ballCounter = false;
    talentShowCounter = false;
    girlGroupCounter = false;
    rumixCounter = false;
    makeoverCounter = false;
    snatchCounter = false;
    doubleShantay = false;
    doubleSashay = false;
    returningQueen = false;
    floppers = false;
    floppersCheck = false;
    slayers = false;
    slayersCheck = false;
    slayersSmack = 0;
    bottom6WayLipsync = false;
    bottom6WayLipsyncCheck = false;
    s14LaLaPaRUZa = false;
    s14LaLaPaRUZaCheck = false;
    assasintable = [];
    assasinlipstick = [];
    blots = [];
    decidingVote4Chart = [];
    votesTotal4Chart = [];
    elimKween4Chart = [];
    twinsMakeover = [];
    conjoinedCheck = false;
    s9PremiereCheck = false;
    uk3PremiereCheck = false;
    chocolateBarTwistCheck = false;
    lateQueen = '';
    //refill lip-sync songs and lsa
    lsSongs = allLsSongs;
    allQueens = allQueensCopy;
    if (chocolateBarTwist) {
        if (chocolateBarTwistChoosable){
            chooseGoldenBar();
        }else {
            giveChocolate();
        }
    }
    else if (s9Premiere)
        chooseLateQueen();
    else if (s6Premiere || s12Premiere || s14Premiere)
        doublePremiere();
    else if (porkchopPremiere) {
        porkchopLipsyncs();
    }
    else
        newEpisode();
} */