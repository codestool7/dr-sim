export {};

/* function miniChallenge() {
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].miniWinner = false;
    }
    let miniChallengeScreen = new Scene();
    miniChallengeScreen.clean();
    miniChallengeScreen.createHeader("Mini-challenge!");
    if (premiereCounter == 3 && s14Premiere) {
        s14ElimReturn();
        premiereCounter++;
    }
    miniChallengeScreen.createBold("", "Description");
    miniChallengeScreen.createHorizontalLine();
    document.body.style.backgroundImage = "url('image/werkroom.webp')";
    let challenge = new MiniChallenge();
    challenge.generateDescription();
    challenge.rankPerformances();
    let challenges = ["actingChallenge()", "improvChallenge()", "marketingChallenge()", "danceChallenge()", "designChallenge()", "comedyChallenge()", "talentshow()"];
    //remove from possible challenges list:
    if (talentShowCounter || (all_stars || all_winners || lipsync_assassin))
        challenges.splice(challenges.indexOf("talentshow()"), 1);
    if (actingChallengeCounter == 3 && totalCastSize > 15 || actingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("actingChallenge()"), 1);
    if (comedyChallengeCounter == 3 && totalCastSize > 15 || comedyChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("comedyChallenge()"), 1);
    if (marketingChallengeCounter == 3 && totalCastSize > 15 || marketingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("marketingChallenge()"), 1);
    if (danceChallengeCounter == 2 && totalCastSize > 15 || danceChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("danceChallenge()"), 1);
    if (designChallengeCounter == 3 && totalCastSize > 15 || designChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("designChallenge()"), 1);
    if (improvChallengeCounter == 3&& totalCastSize > 15 || improvChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("improvChallenge()"), 1);
    createChallenge(challenges, miniChallengeScreen);
}

function readingChallenge() {
    let screen = new Scene();
    for (let a = 0; a < currentCast.length; a++) {
        if (a == 0) {
            screen.createImage(currentCast[0].image, "black");
            screen.createBold("First up... " + currentCast[0].getName() + "!!");
        } else if (a == currentCast.length - 1) {
            screen.createImage(currentCast[a].image, "black");
            screen.createBold("And last but not least... " + currentCast[a].getName() + "!!");
        } else {
            screen.createImage(currentCast[a].image, "black");
            screen.createBold("Next is... " + currentCast[a].getName() + "!!");
        }
        let firstOne;
        let queenReaded;
        for (let i = 0; i < 2; i++) {
            if (firstOne == undefined) {
                queenReaded = pickRandomlyFromArray(currentCast);
                while (currentCast[a].getName() == queenReaded.getName()) {
                    queenReaded = pickRandomlyFromArray(currentCast);
                }
            } else {
                queenReaded = pickRandomlyFromArray(currentCast);
                while (currentCast[a].getName() == queenReaded.getName() || queenReaded.getName() == firstOne.getName()) {
                    queenReaded = pickRandomlyFromArray(currentCast);
                }
            }
            screen.createImage(queenReaded.image, "lightgreen");
            screen.createBold("to: " + queenReaded.getName());
            if (i == 0) {
                firstOne = queenReaded;
            }
            let read = queensReads.find((queens) => {
                return queens.queen == queenReaded.getName()
            });
            if (read != undefined) {
                if (read.reads.length < 1) {
                    read = queensReads.find((queens) => {
                        return queens.queen == "General"
                    });
                    screen.createBold(pickRandomlyFromArray(read.reads));
                } else {
                    screen.createBold(pickRandomlyFromArray(read.reads));
                }
            } else {
                read = queensReads.find((queens) => {
                    return queens.queen == "General"
                });
                screen.createBold(pickRandomlyFromArray(read.reads));
            }
            read.reads.splice(readNumber, 1);
            if (randomNumber(100) >= 99) {
                i--;
            }
        }
        screen.createHorizontalLine();
    }
}

let readingCheck = false;

let allReads = [...queensReads]; */