/* function lipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    if (riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getASLipsync();
        }
    } else {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].getLipsync();
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore - bottomQueens[i].favoritism) + bottomQueens[i].unfavoritism;
        }
    }
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your lives! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(bottomQueens);
    if (event != false) {
        let eventQueen = bottomQueens.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = bottomQueens.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = bottomQueens.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(bottomQueens, song);
    if (!riggoryLipsync) {
        for (let i = 0; i < bottomQueens.length; i++) {
            bottomQueens[i].lipsyncScore = (bottomQueens[i].lipsyncScore + bottomQueens[i].favoritism) - bottomQueens[i].unfavoritism;
        }
    }
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "lipSync()");
}
function teamLipSyncDesc() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your lives! Good luck and don't fuck it up.");
    let wholipsyncs;
    let wholipsyncs1;
    if (randomNumber(100) <= 50) {
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenA;
        wholipsyncs = true;
    }
    else {
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenB;
        wholipsyncs = false;
    }
    if (randomNumber(100) <= 50) {
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenA;
        wholipsyncs1 = true;
    } else {
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenB;
        wholipsyncs1 = false;
    }
    screen.createImage(bottomQueens[0].lipsyncQueen.image);
    screen.createImage(bottomQueens[1].lipsyncQueen.image);
    screen.createBold(`${bottomQueens[0].lipsyncQueen.getName()} and ${bottomQueens[1].lipsyncQueen.getName()} will be lip-syncing`);
    let song = lsSong().toString();
    screen.createHorizontalLine();
    if (randomNumber(100) >= 98 && wholipsyncs) {
        screen.createImage(bottomQueens[0].QueenB.image, "red");
        screen.createBold("OMG!! " + bottomQueens[0].QueenB.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenB;
    } else if (randomNumber(100) >= 98 && !wholipsyncs) {
        screen.createImage(bottomQueens[0].QueenA.image, "red");
        screen.createBold("OMG!! " + bottomQueens[0].QueenA.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[0].lipsyncQueen = bottomQueens[0].QueenA;
    } else if (randomNumber(100) >= 98 && !wholipsyncs1) {
        screen.createImage(bottomQueens[1].QueenA.image, "red");
        screen.createBold("OMG!! " + bottomQueens[1].QueenA.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenA;
    } else if (randomNumber(100) >= 98 && wholipsyncs1) {
        screen.createImage(bottomQueens[1].QueenB.image, "red");
        screen.createBold("OMG!! " + bottomQueens[1].QueenB.getName() + " hits the she-mergency button and now she is going to lipsync!!");
        bottomQueens[1].lipsyncQueen = bottomQueens[1].QueenB;
    }
    if (riggoryLipsync) {
        bottomQueens[0].lipsyncQueen.getASLipsync();
        bottomQueens[1].lipsyncQueen.getASLipsync();
        bottomQueens[0].lipsyncScore = bottomQueens[0].lipsyncQueen.lipsyncScore
        bottomQueens[1].lipsyncScore = bottomQueens[1].lipsyncQueen.lipsyncScore
    } else {
        bottomQueens[0].lipsyncQueen.getLipsync();
        bottomQueens[1].lipsyncQueen.getLipsync();
        bottomQueens[0].lipsyncScore = bottomQueens[0].lipsyncQueen.lipsyncScore
        bottomQueens[1].lipsyncScore = bottomQueens[1].lipsyncQueen.lipsyncScore
        bottomQueens[0].lipsyncScore -= (bottomQueens[0].favoritism + bottomQueens[0].unfavoritism);
        bottomQueens[1].lipsyncScore -= (bottomQueens[1].favoritism + bottomQueens[1].unfavoritism);
    }
    toBlots(bottomQueens, song);
    bottomQueens.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
    screen.createButton("Show result", "teamLipSync()");
}
function asLipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    screen.createHeader("It's time...");
    screen.createBold("For you to lip-sync... for your legacy! Good luck, and don't fuck it up.");
    let song = lsSong().toString();
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "asLipSync()");
}
let assassin;
function lsaLipsyncDesc() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time to ruveal...");
    assassin = pickRandomlyFromArray(allQueens);
    bottomQueens.sort((a, b) => b.votes - a.votes);
    top2.push(assassin);
    screen.createImage(assassin.image, "royalblue");
    screen.createBold("The lip-sync assassin is... " + assassin.getName() + "!");
    screen.createParagraph("Now, it's time for you to lip-sync... for your legacy!");
    let song = lsSong().toString();
    for (let i = 0; i < top2.length; i++) {
        top2[i].getASLipsync();
    }
    screen.createHorizontalLine();
    let event = checkForLipsyncEvent(top2);
    if (event != false) {
        let eventQueen = top2.find( (q) => {
            return q.getName() == event.queen.getName()
        });
        eventQueen.lipsyncScore += event.points;
    }
    let slay = top2.filter(function (queen) { return queen.lipsyncScore > 11; });
    let great = top2.filter(function (queen) { return queen.lipsyncScore >= 8 && queen.lipsyncScore < 12; });
    let good = top2.filter(function (queen) { return queen.lipsyncScore >= 4 && queen.lipsyncScore < 8; });
    let bad = top2.filter(function (queen) { return queen.lipsyncScore >= 2 && queen.lipsyncScore < 4; });
    let flop = top2.filter(function (queen) { return queen.lipsyncScore >= -10 && queen.lipsyncScore < 2; });
    toBlots(top2, song);
    createLipsyncDesc(slay, great, good, bad, flop);
    screen.createButton("Show result", "lsaLipSync()");
}

function createLipsyncDesc(slay, great, good, bad, flop) {
    let screen = new Scene();
    let word = "lipsync";
    if (currentCast.length == 5 && top5) {
        word = "final performance";
    }
    if (slay.length !== 0) {
        for (let i = 0; i < slay.length; i++)
            screen.createImage(slay[i].image);
        screen.createBold("", "slay");
        let slayText = document.getElementById("slay");
        for (let i = 0; i < slay.length; i++)
            slayText.innerHTML += `${slay[i].getName()}, `;
        slayText.innerHTML += "slayed the " + word + "!!";
    }
    if (great.length !== 0) {
        for (let i = 0; i < great.length; i++)
            screen.createImage(great[i].image);
        screen.createBold("", "great");
        let greatText = document.getElementById("great");
        for (let i = 0; i < great.length; i++)
            greatText.innerHTML += `${great[i].getName()}, `;
        greatText.innerHTML += "had a great "+ word + "!";
    }
    if (good.length !== 0) {
        for (let i = 0; i < good.length; i++)
            screen.createImage(good[i].image);
        screen.createBold("", "good");
        let goodText = document.getElementById("good");
        for (let i = 0; i < good.length; i++)
            goodText.innerHTML += `${good[i].getName()}, `;
        goodText.innerHTML += "had a good " + word + ".";
    }
    if (bad.length !== 0) {
        for (let i = 0; i < bad.length; i++)
            screen.createImage(bad[i].image);
        screen.createBold("", "bad");
        let badText = document.getElementById("bad");
        for (let i = 0; i < bad.length; i++)
            badText.innerHTML += `${bad[i].getName()}, `;
        badText.innerHTML += "had a bad " + word + "...";
    }
    if (flop.length !== 0) {
        for (let i = 0; i < flop.length; i++)
            screen.createImage(flop[i].image);
        screen.createBold("", "flop");
        let flopText = document.getElementById("flop");
        for (let i = 0; i < flop.length; i++)
            flopText.innerHTML += `${flop[i].getName()}, `;
        flopText.innerHTML += "flopped the " + word + "...";
    }
}

function checkForLipsyncEvent(lipsyncContestants) {
    let screen = new Scene();
    if (randomNumber(1000) >= 900) {
        let queen = pickRandomlyFromArray(lipsyncContestants);
        let event = lipsyncsEventsBad[randomNumber(lipsyncsEventsBad.length - 1)]; // is this intentionally -2 instead of -1? // changed it but still not sure if it should be -1 or 0 TODO
        if (randomNumber(1000) == 777) {
            event = lipsyncsEventsBad[5];
        }
        screen.createImage(queen.image, "red");
        screen.createBold("Oh no! " + queen.getName() + " " + event.event);
        return {queen: queen, points: event.penalization}
    } else if (randomNumber(1000) >= 900) {
        let queen = pickRandomlyFromArray(lipsyncContestants);
        let event = pickRandomlyFromArray(lipsyncsEventsGood);
        screen.createImage(queen.image, "green");
        screen.createBold(queen.getName() + " " + event.event);
        return {queen: queen, points: event.points}
    } else {
        return false
    }
} */