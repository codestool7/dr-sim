export {};

/* function createChallenge(challenges, miniChallengeScreen) {
    for (let i = 0; i < currentCast.length; i++){
        currentCast[i].episodesOn++;
    }
    //first design challenge for regular seasons
    if (currentCast.length == totalCastSize && regularFormat && episodeCount == 1 && s6Premiere == false || currentCast.length == totalCastSize && thailandFormat && episodeCount == 1 && s6Premiere == false || currentCast.length == totalCastSize && team || currentCast == firstCast && s6Premiere || currentCast == secondCast && s6Premiere)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //girl group challenge for s12 or porkchop premiere
    else if (premiereCounter <= 2 && (s12Premiere || porkchopPremiere) || all_winners && episodeCount == 6)
        miniChallengeScreen.createButton("Proceed", "girlgroup()");
    //uk3 premiere
    else if (currentCast.length == totalCastSize && uk3Premiere && !uk3PremiereCheck)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //s9 premiere
    else if (currentCast.length == totalCastSize - 1 && s9Premiere && !s9PremiereCheck)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //talent show for all stars and s14 premiere and all winners
    else if (currentCast.length == totalCastSize && !talentShowCounter && (all_stars || lipsync_assassin) || currentCast == firstCast && s14Premiere || currentCast == secondCast && s14Premiere || all_winners && currentCast.length <= 10 && episodeCount == 11 || all_winners && currentCast.length > 10 && episodeCount == 14)
        miniChallengeScreen.createButton("Proceed", "talentshow()");
    //rumix
    else if (all_winners && episodeCount == 1 || currentCast.length == 5 && !rumixCounter && lftc)
        miniChallengeScreen.createButton("Proceed", "rumix()");
    //snatch game for +12 cast
    else if ( all_winners && episodeCount == 2 || totalCastSize >= 12 && (currentCast.length == 10 || currentCast.length == 8) && (lftc || canFinale || teamsF || top4 || top5 || allstars3Finale) && !snatchCounter && !team || totalCastSize >= 12 && currentCast.length == 9 && (top3 || allstars3Finale) && !snatchCounter)
        miniChallengeScreen.createButton("Proceed", "snatchGame()");
    //snatch game for -12 cast
    else if (totalCastSize < 12 && currentCast.length == 6 && !snatchCounter && (lipsync_assassin) || totalCastSize < 12 && currentCast.length == randomNumberWithMin(7, 9) && !snatchCounter && !team || totalCastSize < 12 && currentCast.length == 7 && !snatchCounter && !team || totalCastSize >= 6 && currentCast.length == 5 && team)
        miniChallengeScreen.createButton("Proceed", "snatchGame()");
    //the ball for +12 casts or all winners
    else if (all_winners && episodeCount == 3 || totalCastSize >= 12 && ((currentCast.length == totalCastSize - 3 || currentCast.length == totalCastSize - 4) && !ballCounter && (lftc || canFinale || teamsF || top5 || allstars3Finale) && !team || currentCast.length == 5 && top4 && !ballCounter || currentCast.length == 4 && top3 && !ballCounter) || currentCast.length == 3 && team)
        miniChallengeScreen.createButton("Proceed", "ball()");
    //the ball for -12 casts
    else if (totalCastSize < 12 && (currentCast.length == 8 && randomNumber(100) <= 10 && !ballCounter || currentCast.length == 5 && top4 && !ballCounter || currentCast.length == 4 && top3 && !ballCounter))
        miniChallengeScreen.createButton("Proceed", "ball()");
    //Girl Group
    else if (totalCastSize >= 12 && (currentCast.length == 8 || currentCast.length == 9) && !girlGroupCounter && randomNumber(100) >= 50 || totalCastSize < 12 && currentCast.length == 6 && !girlGroupCounter && !kittyGirlGroup && randomNumber(100) >= 50)
        miniChallengeScreen.createButton("Proceed", "girlgroup()");
    //rusical
    else if (totalCastSize >= 12 && (currentCast.length == 11 || currentCast.length == 9) && !rusicalCounter && randomNumber(100) >= 50 || totalCastSize < 12 && currentCast.length == 7 && !rusicalCounter  && randomNumber(100) >= 50 || currentCast.length > 5 && randomNumber(21) >= 19 && team && !rusicalCounter)
        miniChallengeScreen.createButton("Proceed", "rusical()");
    //makeover
    else if (currentCast.length == 6 && (lftc || canFinale || teamsF || top4 || top5 || allstars3Finale) && !makeoverCounter && !team  && (regularFormat || thailandFormat) || currentCast.length == 5 && top3 && !makeoverCounter)
        miniChallengeScreen.createButton("Proceed", "designChallenge()");
    //if no conditions apply, create random challenge
    else {
        let currentChallenge;
        if (currentCast.length >= 11 && currentCast.length < 16) {
            currentChallenge = challenges[randomNumber(5)];
        } else if (totalCastSize < 11 && currentCast.length >= 4 && currentCast.length < 11) {
            currentChallenge = pickRandomlyFromArray(challenges);
        } else if (currentCast.length >= 4 && currentCast.length < 11) {
            currentChallenge = pickRandomlyFromArray(challenges);
        } else {
            currentChallenge = pickRandomlyFromArray(challenges);
        }
        if (currentChallenge == lastChallenge && currentCast.length != totalCastSize) {
            while (currentChallenge == lastChallenge) {
                if (currentCast.length >= 16) {
                    currentChallenge = pickRandomlyFromArray(challenges);
                } else if (currentCast.length >= 11 && currentCast.length < 16) {
                    currentChallenge = challenges[randomNumber(3)];
                } else if (currentCast.length >= 4 && currentCast.length < 11) {
                    currentChallenge = pickRandomlyFromArray(challenges);
                }
            }
        }
        lastChallenge = currentChallenge;
        miniChallengeScreen.createButton("Proceed", currentChallenge);

    }
}

function actingChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ActingChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    actingChallengeCounter++;
    isDesignChallenge = false;
    episodeChallenges.push("Acting");
    queensPerformances();
}

function comedyChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ComedyChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length == 10 && !isPairChallenge && regularFormat){
        isPairChallenge = true;
        pairMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    comedyChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function marketingChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new MarketingChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    marketingChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function danceChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new DanceChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 70 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    danceChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}

function designChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new DesignChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 60 && currentCast.length == 10 && !isPairChallenge && regularFormat && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens && episodeCount > 1){
        isPairChallenge = true;
        pairMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    isDesignChallenge = true;
    queensPerformances();
    designChallengeCounter++;
    if ((currentCast.length == 6 || currentCast.length == 5)&& makeoverCounter == false && team == false && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens) {
        episodeChallenges.push("Make Over");
        makeoverCounter = true;
    }
    else if (currentCast.length == totalCastSize && (uk3Premiere || s9Premiere) && !s9PremiereCheck && !uk3PremiereCheck){
        episodeChallenges.push("Runway");
    }
    else if (currentCast.length == totalCastSize - 1 && s9Premiere && !s9PremiereCheck)
        episodeChallenges.push("Runway");
    else
        episodeChallenges.push("Design");
}

function runwayChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Runway-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new RunwayChallenge();
    challenge.generateDescription();
    challenge.rankPerformances();
    let slay = currentCast.filter(function (queen) { return queen.performanceScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.performanceScore >= 26; });
    createRunwayDesc(slay, great, good, bad);
    challengeScreen.createButton("Proceed", "judging()");
}

function improvChallenge() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new ImprovChallenge();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat){
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    improvChallengeCounter++;
    isDesignChallenge = false;
    queensPerformances();
}
//SPECIAL CHALLENGES:

function snatchGame() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new SnatchGame();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    snatchCounter = true;
    queensPerformances();
}

function rusical() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Rusical();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    rusicalCounter = true;
    queensPerformances();
    episodeChallenges.push("Rusical");
}

function ball() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Ball();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = true;
    queensPerformances();
    ballCounter = true;
    episodeChallenges.push("Ball");
}

function rumix() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new Rumix();
    challenge.generateDescription();
    challenge.rankPerformances();
    isDesignChallenge = false;
    episodeChallenges.push("Rumix");
    rumixCounter = true;
    queensPerformances();
}

function girlgroup() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new GirlGroup();
    challenge.generateDescription();
    if (randomNumber(100) >= 50 && currentCast.length >= 6 && currentCast.length <= 15 && !isTeamChallenge && regularFormat && episodeCount > 3) {
        isTeamChallenge = true;
        teamMaking();
        challenge.rankPerformances();
    } else {
        challenge.rankPerformances();
    }
    isDesignChallenge = false;
    episodeChallenges.push("Girl Group");
    if (((s12Premiere || porkchopPremiere) && episodeCount <= 2)) {
        girlGroupCounter = false;
    } else {
        girlGroupCounter = true;
    }
    queensPerformances();
}

function talentshow() {
    let challengeScreen = new Scene();
    challengeScreen.clean();
    challengeScreen.createHeader("Maxi-challenge!");
    challengeScreen.createBold("", "Description");
    let challenge = new TalentShow();
    challenge.generateDescription();
    queenTalents();
    challenge.rankPerformances();
    isDesignChallenge = true;
    episodeChallenges.push("Talent Show");
    if (!(s14Premiere && episodeCount == 1)) {
        talentShowCounter = true;
    }
    queensPerformances();
}

function queensPerformances() {
    let performanceScreen = new Scene();
    performanceScreen.createHorizontalLine();
    performanceScreen.createBigText("Queens' performances...");
    let slay = currentCast.filter(function (queen) { return queen.performanceScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.performanceScore >= 6 && queen.performanceScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.performanceScore >= 16 && queen.performanceScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.performanceScore >= 26 && queen.performanceScore < 31; });
    let flop = currentCast.filter(function (queen) { return queen.performanceScore >= 31 && queen.performanceScore < 50; });
    createPerformanceDesc(slay, great, good, bad, flop);
    if (isDesignChallenge == true || episodeChallenges[episodeChallenges.length - 1] == "Design") {
        performanceScreen.createButton("Proceed", "judging()");
    } else if (thailandFormat && isDesignChallenge == false) {
        if (s12Premiere && episodeCount < 3 || porkchopPremiere && episodeCount < 4) {
            performanceScreen.createButton("Proceed", "runway()", "button2");
        } else {
            performanceScreen.createButton("Proceed", "maxiWin()");
        }
    } else if (thailandFormat && isDesignChallenge == true) {
            performanceScreen.createButton("Proceed", "judgingThailand()");
    } else {
        performanceScreen.createButton("Proceed", "runway()", "button2");
    }
}

function runway() {
    let runwayScreen = new Scene();
    runwayScreen.createHorizontalLine();
    let button2 = document.querySelector("button#button2");
    button2.remove();
    runwayScreen.createRightClick();
    runwayScreen.createBigText("Runway!");
    runwayScreen.createParagraph("The queens will bring it to the runway!");
    if (currentCast.length > 4)
        runwayScreen.createParagraph("The theme is: " + pickRandomlyFromArray(runwayDescriptions));
    else if (currentCast.length == 4 && top3 || currentCast.length == 4 && (top4 || lftc || canFinale || allstars3Finale) || currentCast.length == 5 && top5 || currentCast.length == 3 && top3 || currentCast.length == 2 && team)
        runwayScreen.createParagraph("The theme is... best drag!");
    for (let i = 0; i < currentCast.length; i++)
        currentCast[i].getRunway();
    let slay = currentCast.filter(function (queen) { return queen.runwayScore < 6; });
    let great = currentCast.filter(function (queen) { return queen.runwayScore >= 6 && queen.runwayScore < 16; });
    let good = currentCast.filter(function (queen) { return queen.runwayScore >= 16 && queen.runwayScore < 26; });
    let bad = currentCast.filter(function (queen) { return queen.runwayScore >= 26; });
    createRunwayDesc(slay, great, good, bad);
    if ((currentCast.length == 4 || currentCast.length == 5) && porkchopPremiere && premiereCounter < 3)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 5 && top5)
        runwayScreen.createButton("Proceed", "finaleTop5Judging()");
    else if (currentCast.length == 4 && top3)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length > 4)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 4 && teamsF)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 3 && teamsF)
        runwayScreen.createButton("Proceed", "judging()");
    else if (currentCast.length == 4 && (top4 || canFinale))
        runwayScreen.createButton("Proceed", "finaleTop4Judging()");
    else if (currentCast.length == 3 && (top3 || canFinale))
        runwayScreen.createButton("Proceed", "finaleTop3Judging()");
    else if (currentCast.length == 2 && top2)
        runwayScreen.createButton("Proceed", "finaleJudging()");
    else if (currentCast.length == 4 && (allstars3Finale))
        runwayScreen.createButton("Proceed", "finaleJuryAS()");
    else if (currentCast.length == 2 && team)
        runwayScreen.createButton("Proceed", "finaleTeamJudging()");
}

function maxiWin() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Maxi Challenge Winner!");
    screen.createBold("Based on tonight's performances...");
    document.body.style.backgroundImage = "url('image/werkroom.webp')";
    currentCast.sort((a, b) => (a.performanceScore - b.performanceScore));
    if (currentCast[0].performanceScore == currentCast[1].performanceScore && randomNumber(100) < 60) {
        currentCast[0].addToTrackRecord(" WIN");
        currentCast[1].addToTrackRecord(" WIN");
        currentCast[0].favoritism += 4;
        currentCast[1].favoritism += 4;
        currentCast[0].maxiT = true;
        currentCast[1].maxiT = true;
        screen.createImage(currentCast[0].image, "darkblue");
        screen.createImage(currentCast[1].image, "darkblue");
        screen.createBold(currentCast[0].getName() + ", " + currentCast[1].getName() + ", condragulations, You are the winners of this weeks Maxi Challenge!");
    } else {
        screen.createImage(currentCast[0].image, "cyan");
        screen.createBold(currentCast[0].getName() + ", condragulations! You are the winner of this weeks Maxi Challenge!");
        currentCast[0].addToTrackRecord("WIN");
        currentCast[0].favoritism += 4;
        currentCast[0].maxiT = true;
    }
    screen.createHorizontalLine();
    screen.createButton("Proceed", "runwayChallenge()");
} */