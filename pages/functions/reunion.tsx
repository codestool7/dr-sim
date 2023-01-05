export {};

/* const { collection } = require('lodash');

function reunion() {
    let screen = new Scene();
    if (team) {
        for (let i = 0; i < currentCast.length; i++) {
            if (currentCast[i].QueenA != undefined) {
                currentCast.push(currentCast[i].QueenA);
                currentCast.push(currentCast[i].QueenB);
                currentCast.splice(i,1);
                i--;
            }
        }
    }
    screen.clean();
    screen.createHeader("The Reunion!");
    missCong();
    if (currentCast.length == 4 && canFinale)
        screen.createButton("Proceed", "canadaS2Finale()");
    else if (currentCast.length == 5 && top5)
        screen.createButton("Proceed", "finaleT5()");
    else if (currentCast.length == 4 && teamsF)
        screen.createButton("Proceed", "finaleTeam()");
    else if (currentCast.length == 4 && lftc)
        screen.createButton("Proceed", "finaleLS()");
    else if (currentCast.length == 4 && top4)
        screen.createButton("Proceed", "finaleTop4()");
    else if (currentCast.length == 4 && allstars3Finale)
        screen.createButton("Proceed", "finaleAS()");
    else
        screen.createButton("Proceed", "finale()");
}

function missCong() {
    let screen = new Scene();
    screen.createBigText("The contestants will vote for Miss Congeniality!");
    let wholeCast = [...currentCast, ...eliminatedCast];
    wholeCast = collection.shuffle(wholeCast);
    for (let i = 0; i < eliminatedCast.length; i++) {
        eliminatedCast[i].votes = 0;
        eliminatedCast[i].trackRecord[eliminatedCast[i].trackRecord.length - 1] = "GUEST";
    }
    for (let i = 0; i < currentCast.length; i++) {
        currentCast[i].votes = 0;
    }
    for (let i = 0; i < wholeCast.length; i++) {
        wholeCast[i].lipstick = bestSister(wholeCast[i], eliminatedCast);
        screen.createImage(wholeCast[i].image, "black");
        screen.createImage(wholeCast[i].lipstick.image, "aqua");
        screen.createBold(wholeCast[i].getName() + " voted for " + wholeCast[i].lipstick.getName() + " to be Miss Congeniality!", "votes", "votesP");
        wholeCast[i].lipstick.votes++; 
    }
    screen.createHorizontalLine();
    wholeCast.sort((a, b) => (b.votes - a.votes));
    screen.createImage(wholeCast[0].image, "aqua");
    screen.createBold("The winner of this season's Miss Congeniality is... " + wholeCast[0].getName() + "!!!");
    wholeCast[0].trackRecord[wholeCast[0].trackRecord.length - 1] = "MISS CON";
    screen.createHorizontalLine();
} */