export {};

/* function newEpisode() {
    if (episodeCount == 0 && !(porkchopPremiere || s14Premiere || s12Premiere || s6Premiere)) {
        currentCast.forEach((queen) => {
            for (let i = 0; i < currentCast.length; i++) {
                if (queen.getName() != currentCast[i].getName()) {
                    queen.sisters.push({queen: currentCast[i], relation: 0});
                }
            }
        });
        let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
        let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
        koffeDiv[0].classList.toggle("hide", true);
        koffeDivMovil[0].classList.toggle("hide", true);
    }
    if (s9Premiere && episodeCount == 0) {
        currentCast.splice(currentCast.indexOf(lateQueen), 1);
    }
    safeQueens = [];
    blockQueens = [];
    topQueens = [];
    bottomQueens = [];
    top2 = [];
    up2Block = [];
    episodeCount++;
    let queensRemainingScreen = new Scene();
    if (episodeCount == 1 || premiereCounter <= 2 && (s12Premiere || porkchopPremiere || s6Premiere || s14Premiere ) || episodeCount == 1 && (uk3Premiere || s9Premiere)) {
        queensRemainingScreen.clean();
        queensRemainingScreen.createHeader("Full cast");
        for (let i = 0; i < currentCast.length; i++) {
            queensRemainingScreen.createImage(currentCast[i].image);
            queensRemainingScreen.createBold(currentCast[i].getName());
        }
    }
    else {
        contestantProgress();
        queensRemainingScreen.createHorizontalLine();
        queensRemainingScreen.createButton("Download", "downloadTR()", "downloadTR");
    }
    if (currentCast.length == totalCastSize && team == true)
        queensRemainingScreen.createButton("Proceed", "teamsScreen()");
    else if ((s6Premiere || s12Premiere || s14Premiere) && episodeCount == 1)
        queensRemainingScreen.createButton("Proceed", "doublePremChoose()");
    else if (all_winners && currentCast.length <= 10 && episodeCount == 12)
        queensRemainingScreen.createButton("Proceed", "awFinale()");
    else if (all_winners && currentCast.length >= 10 && episodeCount == 15)
        queensRemainingScreen.createButton("Proceed", "awFinale()");
    else if (currentCast.length == 4 && top3)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if ((currentCast.length == 4 || currentCast.length == 5) && porkchopPremiere && premiereCounter < 3 )
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 5 && top5 || currentCast.length == 4 && top4 || currentCast.length == 3 && top3 || currentCast.length == 2 && top2 || currentCast.length == 4 && canFinale || currentCast.length == 4 && lftc || currentCast.length == 4 && allstars3Finale)
        queensRemainingScreen.createButton("Proceed", "reunion()");
    else if (currentCast.length > 4)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 4 && team)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 3 && team)
        queensRemainingScreen.createButton("Proceed", "miniChallenge()");
    else if (currentCast.length == 2 && team)
        queensRemainingScreen.createButton("Proceed", "finaleTeam()");
    else
        queensRemainingScreen.createButton("Proceed", "reunion()");
    //add an empty placement on eliminated queen's track records
    for (let i = 0; i < eliminatedCast.length; i++)
        eliminatedCast[i].addToTrackRecord('');
}

function contestantProgress() {
    let screen = new Scene();
    screen.clean();
    screen.createHeader("Contestant Progress");
    document.body.style.backgroundImage = "url('image/bg.png')";
    let main = document.querySelector("div#MainBlock");
    let centering = document.createElement("center");
    let trackRecords = document.createElement("table");
    trackRecords.setAttribute("id", "trackRecord");
    trackRecords.setAttribute("class", "trtable");
    trackRecords.setAttribute("border", "2");
    let header = document.createElement("tr");
    trackRecords.appendChild(header);
    let thr = document.createElement("th");
    thr.innerHTML = "Rank";
    thr.setAttribute("style", "font-weight: bold;");
    thr.setAttribute("rowspan", "2");
    header.appendChild(thr);
    let th = document.createElement("th");
    th.innerHTML = "Contestant";
    th.setAttribute("style", "font-weight: bold; width: 100px;");
    th.setAttribute("rowspan", "2");
    header.appendChild(th);
    let th_i = document.createElement("th");
    th_i.innerHTML = "Photo";
    th_i.setAttribute("style", "font-weight: bold;");
    th_i.setAttribute("rowspan", "2");
    header.appendChild(th_i);
    for (let i = 0; i < episodeChallenges.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = "Ep. " + (i+1);
        th.setAttribute("style", "font-weight: bold;");
        header.appendChild(th);
    }
    let header1 = document.createElement("tr");
    for (let i = 0; i < episodeChallenges.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = "<small>" + episodeChallenges[i] + "</small>";
        th.setAttribute("class", "episodeTR");
        header1.appendChild(th);
    }
    trackRecords.appendChild(header1);
    let th_2 = document.createElement("th");
    th_2.setAttribute("class", "ppeTR");
    th_2.setAttribute("rowspan", "2");
    if (all_winners) {
        th_2.innerHTML = "PPE - Stars";
    } else {
        th_2.innerHTML = "PPE";
    }
    header.appendChild(th_2);
    let winner = document.createElement("tr");
    let rank = document.createElement("td");
    rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
    rank.innerHTML = "1st<br><small>(Winner)</small>"
    winner.appendChild(rank);
    let name = document.createElement("td");
    name.setAttribute("class", "nameTR");
    if (onFinale) {
        let winnerQueen;
        if (!lftc)
            winnerQueen = currentCast[0];
        else if (onTop4Finale)
            winnerQueen = finalLS[0];
        else
            winnerQueen = currentCast[0];
        name.innerHTML = winnerQueen.getName();
        winner.appendChild(name);
        let photo = document.createElement("td");
        photo.setAttribute("style", "background: url("+ winnerQueen.image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
        photo.setAttribute("class", "placement");
        winner.appendChild(photo);
        for (let i = 0; i < winnerQueen.trackRecord.length + 1; i++) {
            let placement = document.createElement("td");
            placement.setAttribute("class", "placement");
            placement.innerHTML = winnerQueen.trackRecord[i];
            if (placement.innerHTML == "WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
            }
            else if (placement.innerHTML == "TOP 2") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 3") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 4") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP2") {
                placement.setAttribute("style", "background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
            }
            else if (placement.innerHTML == "LOW") {
                placement.setAttribute("style", "background-color: pink;");
            }
            else if (placement.innerHTML == "HIGH") {
                placement.setAttribute("style", "background-color: lightblue;");
            }
            else if (placement.innerHTML == "HIGH TEAM") {
                placement.setAttribute("style", "background-color: aquamarine;");
            }
            else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: #D66D73;");
                placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
            }
            else if (placement.innerHTML == "BTM2 ") {
                placement.setAttribute("style", "background-color: #FA8072;");
            }
            else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                placement.setAttribute("style", "background-color: tomato;");
            }
            else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
            }
            else if (placement.innerHTML == "CHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
            }
            else if (placement.innerHTML == "ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: red;");
            }
            else if (placement.innerHTML == "ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
            }
            else if (placement.innerHTML == " ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
            }
            else if (placement.innerHTML == " ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
            }
            else if (placement.innerHTML == "WINNER") {
                placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + winnerQueen.votes + " points) </small>";
            }
            else if (placement.innerHTML == "RUNNER UP") {
                placement.setAttribute("style", "font-weight: bold; background-color: silver;");
            }
            else if (placement.innerHTML == "ELIMINATED") {
                placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                placement.innerHTML = "ELIM";
            }
            else if (placement.innerHTML == "WINNER ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
            }
            else if (placement.innerHTML == "") {
                placement.setAttribute("style", "background-color: gray");
            }
            else if (placement.innerHTML == "WIN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "WIN TIE") {
                placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "  WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
            }
            else if (placement.innerHTML == "WIN+RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color: white;");
                placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
            }
            else if (placement.innerHTML == "SAFE") {
                placement.setAttribute("style", "background-color: white;");
            }
            else if (placement.innerHTML == "SAFE ") {
                    placement.setAttribute("style", "background-color: palegreen; color:#000;");
            }
            else if (placement.innerHTML == " SAFE ") {
                    placement.setAttribute("style", "background-color: #7D1935; color:#000;");
            }
            else if (placement.innerHTML == " SAFE") {
                placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                placement.setAttribute("style", "background-color: lightcoral; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                placement.setAttribute("style", "background-color: indianred; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                placement.setAttribute("style", "background-color: crimson; color: white;");
            }
            else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: red; font-weight: bold;");
                placement.innerHTML = "BLOCK";
            }
            else if (placement.innerHTML == "RUN") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "RUN ") {
                    placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
            }
            else if (placement.innerHTML == "OUT") {
                placement.setAttribute("style", "background-color: forestgreen; color:white;");
            }
            else if (placement.innerHTML == "OUT ") {
                    placement.setAttribute("style", "background-color: purple; color:white;");
            }
            else if (placement.innerHTML == " WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
            }
            else if (placement.innerHTML == "DISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
            }
            else if (placement.innerHTML == "DEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
            }
            else if (placement.innerHTML == "QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
            }
            else if (placement.innerHTML == "WIN+QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
            }
            else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                placement.setAttribute("style", "background-color:cornflowerblue;");
                placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
            }
            else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                placement.setAttribute("style", "background-color:#ee82ee;");
                placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
            }
            else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                placement.innerHTML = "WIN <br>+<br> CHOC";
            }
            else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                placement.innerHTML = "WIN <br>+<br> DISQ";
            }
            else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                placement.innerHTML = "WIN <br>+<br> DEPT";
            }
            else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                placement.innerHTML = "WIN <br>+<br> QUIT";
            }
            else if (placement.innerHTML == "RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
            }
            else if (placement.innerHTML == "RTRN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: orange;");
            }
            else if (placement.innerHTML == " WIN ") {
                placement.setAttribute("style", "background-color: lightskyblue;");
            }
            else if (placement.innerHTML == "QUIT ") {
                placement.setAttribute("style", "background-color: #C86666;");
            }
            else if (placement.innerHTML == "ADV") {
                placement.setAttribute("style", "background-color: #90ee90;");
            }
            else if (placement.innerHTML == "LOSS") {
                placement.setAttribute("style", "background-color: #ff9e9e;");
            }
            else if (placement.innerHTML == "LOSS ") {
                placement.setAttribute("style", "background-color: orange;");
            }
            else if (placement.innerHTML == "GUEST") {
                placement.setAttribute("style", "background-color: lightgrey;");
            }
            else if (placement.innerHTML == "MISS CON") {
                placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
            }
            else if (placement.innerHTML == "undefined" && all_winners) {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (winnerQueen.ppe / (winnerQueen.episodesOn)).toFixed(2) + " - " + winnerQueen.stars;
            }
            else if (placement.innerHTML == "undefined") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (winnerQueen.ppe / (winnerQueen.episodesOn)).toFixed(2);
            }
            if (winnerQueen.retEp == (i+1) && winnerQueen.retEp - winnerQueen.trackRecord.length <= 0 || winnerQueen.retEp != 0 && winnerQueen.retEp2 != undefined) {
                placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                    placement.setAttribute("style", "background-color: #ffb18a;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                    placement.setAttribute("style", "background-color: greenyellow;");
                }
            }
            if (winnerQueen.miniEpisode.indexOf((i+1)) != -1) {
                if (winnerQueen.tCaptain.indexOf((i+1)) != -1) {
                    placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                } else {
                    placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                }
            }
            if (winnerQueen.immuneEp.indexOf((i)) != -1 && i != winnerQueen.trackRecord.length) {
                placement.style.backgroundColor = "magenta";
                placement.style.color = "white";
            }
            winner.appendChild(placement);
        }
        trackRecords.appendChild(winner);
    }
    if (!onFinale) {
        for (let i = 0; i < currentCast.length; i++) {
            let contestant = document.createElement("tr");
            let rank = document.createElement("td");
            rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold;");
            rank.innerHTML = "TBA"
            contestant.appendChild(rank);
            let name = document.createElement("td");
            name.setAttribute("class", "nameTR");
            name.innerHTML = currentCast[i].getName();
            contestant.appendChild(name);
            let photo = document.createElement("td");
            photo.setAttribute("style", "background: url("+ currentCast[i].image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
            photo.setAttribute("class", "placement");
            contestant.appendChild(photo);
            for (let k = 0; k < currentCast[i].trackRecord.length + 1; k++) {
                let placement = document.createElement("td");
                placement.setAttribute("class", "placement");
                placement.innerHTML = currentCast[i].trackRecord[k];
                if (placement.innerHTML == "WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
                }
                else if (placement.innerHTML == "TOP 2") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP 3") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP 4") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
                }
                else if (placement.innerHTML == "TOP2") {
                    placement.setAttribute("style", "background-color: deepskyblue;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
                }
                else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
                }
                else if (placement.innerHTML == "LOW") {
                    placement.setAttribute("style", "background-color: pink;");
                }
                else if (placement.innerHTML == "HIGH") {
                    placement.setAttribute("style", "background-color: lightblue;");
                }
                else if (placement.innerHTML == "HIGH TEAM") {
                    placement.setAttribute("style", "background-color: aquamarine;");
                }
                else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                    placement.setAttribute("style", "background-color: #D66D73;");
                    placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
                }
                else if (placement.innerHTML == "BTM2 ") {
                    placement.setAttribute("style", "background-color: #FA8072;");
                }
                else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                    placement.setAttribute("style", "background-color: tomato;");
                }
                else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                    placement.setAttribute("style", "background-color: hotpink;");
                }
                else if (placement.innerHTML == "CHOC") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                }
                else if (placement.innerHTML == "ELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color: red;");
                }
                else if (placement.innerHTML == "ELIM ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
                }
                else if (placement.innerHTML == " ELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
                }
                else if (placement.innerHTML == " ELIM ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
                }
                else if (placement.innerHTML == "WINNER") {
                    placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
                }
                else if (placement.innerHTML == "RUNNER UP") {
                    placement.setAttribute("style", "font-weight: bold; background-color: silver;");
                }
                else if (placement.innerHTML == "ELIMINATED") {
                    placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                    placement.innerHTML = "ELIM";
                }
                else if (placement.innerHTML == "WINNER ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
                }
                else if (placement.innerHTML == "LOST 1ST ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
                }
                else if (placement.innerHTML == "LOST 1ST ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
                }
                else if (placement.innerHTML == "LOST 2ND ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
                }
                else if (placement.innerHTML == "LOST 2ND ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
                }
                else if (placement.innerHTML == "LOST 3RD ROUND") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
                }
                else if (placement.innerHTML == "LOST 3RD ROUND ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
                }
                else if (placement.innerHTML == "") {
                    placement.setAttribute("style", "background-color: gray");
                }
                else if (placement.innerHTML == "WIN ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
                }
                else if (placement.innerHTML == "WIN TIE") {
                    placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                    placement.innerHTML = "WIN";
                }
                else if (placement.innerHTML == "  WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
                }
                else if (placement.innerHTML == "WIN+RTRN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color:white;");
                    placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
                }
                else if (placement.innerHTML == "SAFE") {
                    placement.setAttribute("style", "background-color: white;");
                }
                else if (placement.innerHTML == "SAFE ") {
                        placement.setAttribute("style", "background-color: palegreen; color:#000;");
                }
                else if (placement.innerHTML == " SAFE ") {
                        placement.setAttribute("style", "background-color: #7D1935; color:#000;");
                }
                else if (placement.innerHTML == " SAFE") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                    placement.setAttribute("style", "background-color: lightcoral; color: white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                    placement.setAttribute("style", "background-color: indianred; color: white;");
                }
                else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                    placement.setAttribute("style", "background-color: crimson; color: white;");
                }
                else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                    placement.setAttribute("style", "background-color: red; font-weight: bold;");
                    placement.innerHTML = "BLOCK"
                }
                else if (placement.innerHTML == "RUN") {
                        placement.setAttribute("style", "background-color: magenta; color:white;");
                }
                else if (placement.innerHTML == "RUN ") {
                        placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
                }
                else if (placement.innerHTML == "OUT") {
                    placement.setAttribute("style", "background-color: forestgreen; color:white;");
                }
                else if (placement.innerHTML == "OUT ") {
                        placement.setAttribute("style", "background-color: purple; color:white;");
                }
                else if (placement.innerHTML == " WIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
                }
                else if (placement.innerHTML == "DISQ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                }
                else if (placement.innerHTML == "DEPT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                }
                else if (placement.innerHTML == "QUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                }
                else if (placement.innerHTML == "WIN+QUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                    placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
                }
                else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                    placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                    placement.innerHTML = "WIN";
                }
                else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                    placement.setAttribute("style", "background-color:cornflowerblue;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
                }
                else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                    placement.setAttribute("style", "background-color:#ee82ee;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
                }
                else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                    placement.setAttribute("style", "background-color:mediumorchid;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
                }
                else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                    placement.setAttribute("style", "background-color:mediumorchid;");
                    placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
                }
                else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                    placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                    placement.innerHTML = "WIN <br>+<br> ELIM";
                }
                else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                    placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                    placement.innerHTML = "WIN <br>+<br> ELIM";
                }
                else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                    placement.setAttribute("style", "background-color: hotpink;");
                    placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
                }
                else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                    placement.setAttribute("style", "background-color: hotpink;");
                    placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
                }
                else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                    placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                    placement.innerHTML = "WIN <br>+<br> CHOC";
                }
                else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                    placement.innerHTML = "WIN <br>+<br> DISQ";
                }
                else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                    placement.innerHTML = "WIN <br>+<br> DEPT";
                }
                else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                    placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                    placement.innerHTML = "WIN <br>+<br> QUIT";
                }
                else if (placement.innerHTML == "RTRN") {
                    placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
                }
                else if (placement.innerHTML == "RTRN ") {
                    placement.setAttribute("style", "font-weight: bold; background-color: orange;");
                }
                else if (placement.innerHTML == " WIN ") {
                    placement.setAttribute("style", "background-color: lightskyblue;");
                }
                else if (placement.innerHTML == "QUIT ") {
                    placement.setAttribute("style", "background-color: #C86666;");
                }
                else if (placement.innerHTML == "ADV") {
                    placement.setAttribute("style", "background-color: #90ee90;");
                }
                else if (placement.innerHTML == "LOSS") {
                    placement.setAttribute("style", "background-color: #ff9e9e;");
                }
                else if (placement.innerHTML == "LOSS ") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                else if (placement.innerHTML == "GUEST") {
                    placement.setAttribute("style", "background-color: lightgrey;");
                }
                else if (placement.innerHTML == "MISS CON") {
                    placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
                }
                else if (placement.innerHTML == "undefined" && all_winners) {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                    placement.innerHTML = (currentCast[i].ppe / (currentCast[i].episodesOn)).toFixed(2) + " - " + currentCast[i].stars;
                }
                else if (placement.innerHTML == "undefined") {
                    placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                    placement.innerHTML = (currentCast[i].ppe / (currentCast[i].episodesOn)).toFixed(2);
                }
                if (currentCast[i].retEp == (k+1) && currentCast[i].retEp - currentCast[i].trackRecord.length <= 0 || currentCast[i].retEp != 0 && currentCast[i].retEp2 != undefined) {
                    placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                        placement.setAttribute("style", "background-color: orange;");
                    }
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                        placement.setAttribute("style", "background-color: #ffb18a;");
                    }
                    if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                        placement.setAttribute("style", "background-color: greenyellow;");
                    }
                }
                if (currentCast[i].miniEpisode.indexOf(k+1) != -1) {
                    if (currentCast[i].tCaptain.indexOf((k+1)) != -1) {
                        placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                    } else {
                        placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                    }
                }
                if (currentCast[i].immuneEp.indexOf((k)) != -1 && k != currentCast[i].trackRecord.length) {
                    placement.style.backgroundColor = "magenta";
                    placement.style.color = "white";
                }
                contestant.appendChild(placement);
            }
            trackRecords.appendChild(contestant);
        }
    }
    let rankNumber = currentCast.length;
    for (let i = 0; i < eliminatedCast.length; i++) {
        let contestant = document.createElement("tr");
        let rank = document.createElement("td");
        rank.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; 50px;");
        if (eliminatedCast[i].rankP == 0) {
            rank.innerHTML = (rankNumber+1+i);
            if (rank.innerHTML == 3) {
                rank.innerHTML += "rd"
            } else {
                rank.innerHTML += "th";
            }
        } else if (eliminatedCast[i].rankP == 1) {
            rank.innerHTML += "1st<br><small>(Winner)</small>";
        } else if (eliminatedCast[i].rankP == 2) {
            rank.innerHTML += "2nd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 3) {
            rank.innerHTML += "3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 234) {
            rank.innerHTML += "2nd-4th<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 432) {
            rank.innerHTML += "3rd/4th<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 23) {
            rank.innerHTML += "2nd/3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 34) {
            rank.innerHTML += "3rd/4th";
        } else if (eliminatedCast[i].rankP == 32) {
            rank.innerHTML += "3rd<br><small>(Runner-Up)</small>";
        } else if (eliminatedCast[i].rankP == 345) {
            rank.innerHTML += "3rd-5th";
        } else if (eliminatedCast[i].rankP == 58) {
            rank.innerHTML += "5th-" + totalCastSize + "th";
        } else if (eliminatedCast[i].rankP == "tie1") {
            rank.innerHTML = (rankNumber+i) + "th";
            rank.innerHTML += "/" + (rankNumber+1+i) + "th";
        } else if (eliminatedCast[i].rankP == "tie2") {
            rank.innerHTML = (rankNumber+1+i) + "th";
            rank.innerHTML += "/" + (rankNumber+2+i) + "th";
        }
        contestant.appendChild(rank);
        let name = document.createElement("td");
        name.setAttribute("class", "nameTR");
        name.innerHTML = eliminatedCast[i].getName();
        contestant.appendChild(name);
        let photo = document.createElement("td");
        photo.setAttribute("style", "background: url("+ eliminatedCast[i].image +"); background-size: cover; background-position: center; background-repeat: no-repeat;");
        photo.setAttribute("class", "placement");
        contestant.appendChild(photo);
        for (let k = 0; k < eliminatedCast[i].trackRecord.length + 1; k++) {
            let placement = document.createElement("td");
            placement.setAttribute("class", "placement");
            placement.innerHTML = eliminatedCast[i].trackRecord[k];
            if (placement.innerHTML == "WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: royalblue; color: white;");
            }
            else if (placement.innerHTML == "TOP 2") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 3") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP 4") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgreen;");
            }
            else if (placement.innerHTML == "TOP2") {
                placement.setAttribute("style", "background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 1</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffd100; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 2</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ffae00; color: #000;");
            }
            else if (placement.innerHTML == "TOP 3<br><small>Win round 3</small>") {
                placement.setAttribute("style", "font-weight: bold; background-color: #ff7c00; color: #000;");
            }
            else if (placement.innerHTML == "LOW") {
                placement.setAttribute("style", "background-color: pink;");
            }
            else if (placement.innerHTML == "HIGH") {
                placement.setAttribute("style", "background-color: lightblue;");
            }
            else if (placement.innerHTML == "HIGH TEAM") {
                placement.setAttribute("style", "background-color: aquamarine;");
            }
            else if (placement.innerHTML == "HIGH+BLOCKED" || placement.innerHTML == "HIGH+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: #D66D73;");
                placement.innerHTML = "HIGH<br>+<br><b>BLOCK</b>"
            }
            else if (placement.innerHTML == "BTM2 ") {
                placement.setAttribute("style", "background-color: #FA8072;");
            }
            else if (placement.innerHTML == "BTM2" || placement.innerHTML == "BTM3" || placement.innerHTML == "BTM4" || placement.innerHTML == "BTM5" || placement.innerHTML == "BTM6" || placement.innerHTML == "BTM") {
                placement.setAttribute("style", "background-color: tomato;");
            }
            else if (placement.innerHTML == " BTM2" || placement.innerHTML == " BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
            }
            else if (placement.innerHTML == "CHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
            }
            else if (placement.innerHTML == "ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: red;");
            }
            else if (placement.innerHTML == "ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FC4545;");
            }
            else if (placement.innerHTML == " ELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color: deeppink;");
            }
            else if (placement.innerHTML == " ELIM ") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white");
            }
            else if (placement.innerHTML == "WINNER") {
                placement.setAttribute("style", "font-weight: bold; background-color: yellow;");
            }
            else if (placement.innerHTML == "RUNNER UP") {
                placement.setAttribute("style", "font-weight: bold; background-color: silver;");
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + eliminatedCast[i].votes + " points) </small>";
            }
            else if (placement.innerHTML == "ELIMINATED") {
                placement.setAttribute("style", "font-weight: bold; background-color: sienna; color: white;");
                placement.innerHTML = "ELIM";
                if (allstars3Finale)
                    placement.innerHTML += " <br><small> (" + eliminatedCast[i].votes + " points) </small>";
            }
            else if (placement.innerHTML == "WINNER ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #C7DDB5;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FF7C00;");
            }
            else if (placement.innerHTML == "LOST 1ST ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #75975E;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFAE00;");
            }
            else if (placement.innerHTML == "LOST 2ND ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #87AB69;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND") {
                placement.setAttribute("style", "font-weight: bold; background-color: #FFD100;");
            }
            else if (placement.innerHTML == "LOST 3RD ROUND ") {
                placement.setAttribute("style", "font-weight: bold; background-color: #A3C585;");
            }
            else if (placement.innerHTML == "") {
                placement.setAttribute("style", "background-color: gray");
            }
            else if (placement.innerHTML == "WIN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: deepskyblue;");
            }
            else if (placement.innerHTML == "WIN TIE") {
                placement.setAttribute("style", "font-weight: bold; background-color: steelblue; color: #fff;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "  WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: #2238B4; color: white;");
            }
            else if (placement.innerHTML == "WIN+RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: forestgreen; color:white;");
                placement.innerHTML = "<b>WIN<br>+<br> RTRN</b>";
            }
            else if (placement.innerHTML == "SAFE") {
                placement.setAttribute("style", "background-color: white;");
            }
            else if (placement.innerHTML == "SAFE ") {
                    placement.setAttribute("style", "background-color: palegreen; color:#000;");
            }
            else if (placement.innerHTML == " SAFE ") {
                    placement.setAttribute("style", "background-color: #7D1935; color:#000;");
            }
            else if (placement.innerHTML == " SAFE") {
                placement.setAttribute("style", "background-color: magenta; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 1</small>") {
                placement.setAttribute("style", "background-color: lightcoral; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 2</small>") {
                placement.setAttribute("style", "background-color: indianred; color: white;");
            }
            else if (placement.innerHTML == "SAFE<br><small>Round 3</small>") {
                placement.setAttribute("style", "background-color: crimson; color: white;");
            }
            else if (placement.innerHTML == "SAFE+BLOCKED" || placement.innerHTML == "SAFE+BLOCKED+BLOCKED") {
                placement.setAttribute("style", "background-color: red; font-weight: bold;");
                placement.innerHTML = "BLOCK"
            }
            else if (placement.innerHTML == "RUN") {
                    placement.setAttribute("style", "background-color: magenta; color:white;");
            }
            else if (placement.innerHTML == "RUN ") {
                    placement.setAttribute("style", "background-color: #D3FFB5; color:#000; font-weight: bold;");
            }
            else if (placement.innerHTML == "OUT") {
                placement.setAttribute("style", "background-color: forestgreen; color:white;");
            }
            else if (placement.innerHTML == "OUT ") {
                    placement.setAttribute("style", "background-color: purple; color:white;");
            }
            else if (placement.innerHTML == " WIN") {
                placement.setAttribute("style", "font-weight: bold; background-color: darkblue; color: white;");
            }
            else if (placement.innerHTML == "DISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
            }
            else if (placement.innerHTML == "DEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
            }
            else if (placement.innerHTML == "QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
            }
            else if (placement.innerHTML == "WIN+QUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color:#5920d4;");
                placement.innerHTML = "<b>WIN<br>+<br> QUIT</b>";
            }
            else if (placement.innerHTML == "WINWIN" || placement.innerHTML == " WINWIN") {
                placement.setAttribute("style", "font-weight: bold; background-color:mediumblue; color:white;");
                placement.innerHTML = "WIN";
            }
            else if (placement.innerHTML == "WINHIGH" || placement.innerHTML == " WINHIGH") {
                placement.setAttribute("style", "background-color:cornflowerblue;");
                placement.innerHTML = "<b>WIN</b><br>+<br> HIGH";
            }
            else if (placement.innerHTML == "WINLOW" || placement.innerHTML == " WINLOW") {
                placement.setAttribute("style", "background-color:#ee82ee;");
                placement.innerHTML = "<b>WIN</b><br>+<br> LOW";
            }
            else if (placement.innerHTML == "WINBTM2" || placement.innerHTML == " WINBTM2") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WINBTM3" || placement.innerHTML == " WINBTM3") {
                placement.setAttribute("style", "background-color:mediumorchid;");
                placement.innerHTML = "<b>WIN</b><br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINELIM" || placement.innerHTML == " WINELIM") {
                placement.setAttribute("style", "font-weight: bold; background-color:#9400d3; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN ELIM " || placement.innerHTML == " WIN ELIM ") { 
                placement.setAttribute("style", "font-weight: bold; background-color: darkred; color:white;");
                placement.innerHTML = "WIN <br>+<br> ELIM";
            }
            else if (placement.innerHTML == "WIN BTM2" || placement.innerHTML == " WIN BTM2") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM2";
            }
            else if (placement.innerHTML == "WIN BTM3" || placement.innerHTML == " WIN BTM3") {
                placement.setAttribute("style", "background-color: hotpink;");
                placement.innerHTML = "<b>WIN</b> <br>+<br> BTM3";
            }
            else if (placement.innerHTML == "WINCHOC" || placement.innerHTML == " WINCHOC") {
                placement.setAttribute("style", "font-weight: bold; background-color: #fcea7c;");
                placement.innerHTML = "WIN <br>+<br> CHOC";
            }
            else if (placement.innerHTML == "WINDISQ" || placement.innerHTML == " WINDISQ") {
                placement.setAttribute("style", "font-weight: bold; background-color: black; color: white;");
                placement.innerHTML = "WIN <br>+<br> DISQ";
            }
            else if (placement.innerHTML == "WINDEPT" || placement.innerHTML == " WINDEPT") {
                placement.setAttribute("style", "font-weight: bold; background-color: plum;");
                placement.innerHTML = "WIN <br>+<br> DEPT";
            }
            else if (placement.innerHTML == "WINQUIT" || placement.innerHTML == " WINQUIT") {
                placement.setAttribute("style", "font-weight: bold; background-color: palevioletred;");
                placement.innerHTML = "WIN <br>+<br> QUIT";
            }
            else if (placement.innerHTML == "RTRN") {
                placement.setAttribute("style", "font-weight: bold; background-color: magenta;");
            }
            else if (placement.innerHTML == "RTRN ") {
                placement.setAttribute("style", "font-weight: bold; background-color: orange;");
            }
            else if (placement.innerHTML == " WIN ") {
                placement.setAttribute("style", "background-color: lightskyblue;");
            }
            else if (placement.innerHTML == "QUIT ") {
                placement.setAttribute("style", "background-color: #C86666;");
            }
            else if (placement.innerHTML == "ADV") {
                placement.setAttribute("style", "background-color: #90ee90;");
            }
            else if (placement.innerHTML == "LOSS") {
                placement.setAttribute("style", "background-color: #ff9e9e;");
            }
            else if (placement.innerHTML == "LOSS ") {
                placement.setAttribute("style", "background-color: orange;");
            }
            else if (placement.innerHTML == "GUEST") {
                placement.setAttribute("style", "background-color: lightgrey;");
            }
            else if (placement.innerHTML == "MISS CON") {
                placement.setAttribute("style", "background-color: aqua; font-weight: bold;");
            }
            else if (placement.innerHTML == "undefined" && all_winners) {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (eliminatedCast[i].ppe / (eliminatedCast[i].episodesOn)).toFixed(2) + " - " + eliminatedCast[i].stars;
            }
            else if (placement.innerHTML == "undefined") {
                placement.setAttribute("style", "font-weight: bold; background-color: lightgray;");
                placement.innerHTML = (eliminatedCast[i].ppe / (eliminatedCast[i].episodesOn)).toFixed(2);
            }
            if (eliminatedCast[i].retEp == (k+1) && eliminatedCast[i].retEp - eliminatedCast[i].trackRecord.length <= 0 || eliminatedCast[i].retEp != 0 && eliminatedCast[i].retEp2 != undefined) {
                placement.innerHTML = "<b>RTRN</b><br>" + "+<br>" + placement.innerHTML;
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>SAFE") {
                    placement.setAttribute("style", "background-color: orange;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>LOW") {
                    placement.setAttribute("style", "background-color: #ffb18a;");
                }
                if (placement.innerHTML == "<b>RTRN</b><br>+<br>HIGH") {
                    placement.setAttribute("style", "background-color: greenyellow;");
                }
            }
            if (eliminatedCast[i].miniEpisode.indexOf((k+1)) != -1) {
                if (eliminatedCast[i].tCaptain.indexOf((k+1)) != -1) {
                    placement.innerHTML += "<br> <small> <i> Team Captain </i> </small>";
                } else {
                    placement.innerHTML += "<br> <small> <i> Mini Chall. Winner </i> </small>";
                }
            }
            if (eliminatedCast[i].immuneEp.indexOf((k)) != -1 && k != eliminatedCast[i].trackRecord.length) {
                placement.style.backgroundColor = "magenta";
                placement.style.color = "white";
            }
            contestant.appendChild(placement);
        }
        trackRecords.appendChild(contestant);
    }
    centering.appendChild(trackRecords);
    let br = document.createElement("br");
    centering.appendChild(br);

    if (chocolateBarTwist) {
        let titlec = document.createElement("big");
        titlec.innerHTML = "Chocolate Bar Twist";
        let chocolateTable = document.createElement("table");
        if (totalCastSize >= 12 && totalCastSize < 15)
            chocolateTable.setAttribute("style", "font-size: 85%;");
        if (totalCastSize >= 15)
            chocolateTable.setAttribute("style", "font-size: 75%");
        let headerc = document.createElement("tr");
        chocolateTable.appendChild(headerc);
        let number = Math.round((fullCast.length / 2));
        for (let i = 0; i < number ; i++) {
            let thc = document.createElement("th");
            thc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            img.src = fullCast[i].image;
            thc.appendChild(img);
            headerc.appendChild(thc);
        }
        let row1 = document.createElement("tr");
        chocolateTable.appendChild(row1);
        for (let i = 0; i < number ; i++) {
            let tdc = document.createElement("td");
            tdc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            for (let o = 0; o < eliminatedCast.length; o++) {
                if (fullCast[i].getName() == eliminatedCast[o].getName()) {
                    if (fullCast[i].chocolate == true) {
                        img.src = "image/ChocolateBarWithTicket.webp";
                    } else {
                        img.src = "image/ChocolateBarWithNoTicket.webp";
                    }
                }
            }
            for (let o = 0; o < currentCast.length; o++) {
                if (fullCast[i].getName() == currentCast[o].getName()) {
                    if (chocolateBarTwistCheck){
                        if (fullCast[i].chocolate == true) {
                            img.src = "image/ChocolateBarWithTicket.webp";
                        } else {
                            img.src = "image/ChocolateBarWithNoTicket.webp";
                        }
                    } else {
                        img.src = "image/ChocolateBarTBA.webp";
                    }
                }
            }
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            tdc.appendChild(img);
            row1.appendChild(tdc);
        }
        let row2 = document.createElement("tr");
        chocolateTable.appendChild(row2);
        for (let i = number ; i < fullCast.length ; i++) {
            let tdc = document.createElement("td");
            tdc.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img = document.createElement("img");
            img.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            img.src = fullCast[i].image;
            tdc.appendChild(img);
            row2.appendChild(tdc);
        }
        let row3 = document.createElement("tr");
        chocolateTable.appendChild(row3);
        for (let i = number ; i < fullCast.length ; i++) {
            let tdc1 = document.createElement("td");
            tdc1.setAttribute("style", "background-color: #f5ebf5; font-weight: bold; height: 50px; padding: 0px;");
            let img1 = document.createElement("img");
            for (let o = 0; o < eliminatedCast.length; o++) {
                if (fullCast[i].getName() == eliminatedCast[o].getName()) {
                    if (fullCast[i].chocolate == true) {
                        img1.src = "image/ChocolateBarWithTicket.webp";
                    } else {
                        img1.src = "image/ChocolateBarWithNoTicket.webp";
                    }
                }
            }
            for (let o = 0; o < currentCast.length; o++) {
                if (fullCast[i].getName() == currentCast[o].getName()) {
                    if (chocolateBarTwistCheck){
                        if (fullCast[i].chocolate == true) {
                            img1.src = "image/ChocolateBarWithTicket.webp";
                        } else {
                            img1.src = "image/ChocolateBarWithNoTicket.webp";
                        }
                    } else {
                        img1.src = "image/ChocolateBarTBA.webp";
                    }
                }
            }
            img1.setAttribute("style", `width: 75px; height: 75px; border-radius: 0px; border: 0px;`);
            tdc1.appendChild(img1);
            row3.appendChild(tdc1);
        }
        centering.appendChild(titlec);
        centering.appendChild(chocolateTable);
    }
    main.appendChild(centering);
    if (onFinale) {
        screen.createButton("Memorable Lipsyncs", "memLips()", "stat");
        if (lipsync_assassin) {
            screen.createButton("RuMocracy", "votingChart()", "stat");
        }
        if (lipsync_assassin || all_stars) {
            screen.createButton("Lipstick Choices", "lsticksChoices()", "stat");
        }
        screen.createHorizontalLine();
        screen.createButton("Simulate again!", "reSimulate()");
        screen.createButton("Download", "downloadTR()", "downloadTR");
        screen.createHorizontalLine();
        screen.createButton("Back to main page", "location.reload()");
        let koffeDiv = document.getElementsByClassName("floatingchat-container-wrap");
        let koffeDivMovil = document.getElementsByClassName("floatingchat-container-wrap-mobi");
        koffeDiv[0].classList.toggle("hide", false);
        koffeDivMovil[0].classList.toggle("hide", false);
    }
    let stats = document.querySelectorAll("#stat");
    for (let i = 0; i < stats.length; i++) {
        stats[i].setAttribute("class", "statistics");
    }
}

function downloadTR() {
    let table = document.getElementById("trackRecord");
    html2canvas(table).then((canvas) => {
        let img = canvas.toDataURL("image/png");
        let a = document.createElement('a');
        a.setAttribute("href", img);
        a.setAttribute("download","TrackRecord.png");
        a.click();
        a.remove();
    });
} */