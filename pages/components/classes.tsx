import { pickRandomlyFromArray, pickBallTheme, randomNumber, randomNumberWithMin } from "../misc/utils";
import {queensReads, whoWhyCompetition, whoWhyRelation, lipsyncsEventsBad, lipsyncsEventsGood, miniChallengeDescriptions1, miniChallengeDescriptions2, actingChallengeDescriptions1, actingChallengeDescriptions2, comedyChallengeDescriptions1, comedyChallengeDescriptions2, marketingDescriptions1, marketingDescriptions2, danceDescriptions, designDescriptions, makeoverOptions, runwayDescriptions, improvDescriptions, rusicalDescriptions, themedBallDescriptions, ballDescriptions1, ballDescriptions2, ballDescriptions3, rumixDescriptions, girlGroupDescriptions, talentOptions, reasoningQueens, twoQueensRelation1, twoQueensRelation2, twoQueensRelation3, twoQueensRelation3_2, twoQueensRelation4, twoQueensRelation4_2, twoQueensRelation5, threeQueensRelation1, threeQueensRelation2, threeQueensRelation3, threeQueensRelation4, fourQueensRelation1, fourQueensRelation2, fourQueensRelation3, fourQueensRelation4, multipleQueensRelation} from "../misc/constants";

// TODO all of this scene logic is just manipulating dom, needs to be in body I think
export class Scene {
    constructor() {
        this._MainBlock = document.querySelector("div#MainBlock");
    }
    clean() {
        this._MainBlock.innerHTML = '';
        this.createRightClick();
        let scrollup = document.querySelector(".toTop");
        window.addEventListener("scroll", e => {
            if (window.scrollY > 100) {
                scrollup.classList.add("active");
            } else {
                scrollup.classList.remove("active");
            }
        });
    }
    createRightClick() {
        if (document.getElementById("inputRightKey") == undefined) {
            let text = document.createElement("input");
            text.setAttribute("class", "textRightClick");
            text.setAttribute("id", "inputRightKey");
            text.setAttribute("type", "text");
            text.setAttribute("readonly", "readonly");
            this._MainBlock.parentElement.appendChild(text);
        }
    }
    createHeader(text) {
        let title = document.getElementById("MainTitle");
        title.innerHTML = text;
    }
    createBigText(text) {
        let big = document.createElement("big");
        let p = document.createElement("p");
        big.innerHTML = text;
        p.appendChild(big);
        this._MainBlock.appendChild(p);
    }
    createParagraph(text, id = '') {
        let p = document.createElement("p");
        p.innerHTML = text;
        p.setAttribute("id", id);
        this._MainBlock.appendChild(p);
    }
    createBold(text, id = '', id1 = '') {
        let p = document.createElement("p");
        let bold = document.createElement("b");
        bold.innerHTML = text;
        bold.setAttribute("id", id);
        p.setAttribute("id", id1);
        p.appendChild(bold);
        this._MainBlock.appendChild(p);
    }
    createButton(text, method, id = '') {
        let button = document.createElement("button");
        button.innerHTML = text;
        button.setAttribute("onclick", method);
        button.setAttribute("id", id);
        this._MainBlock.appendChild(button);
        if (text == "Proceed" || text == "Show result") {
            let textField = document.getElementById("inputRightKey");
            textField.focus();
            textField.addEventListener("keydown", (e) => {
                let key = e.key;
                if (key === "ArrowRight" && document.querySelector("button[onclick='" + method + "']") == button) {
                    e.target.remove();
                    button.click();
                    this.goToTop();
                }
            }, {once: true});
            document.addEventListener("click", e => {
                if (e.target.matches('div#MainBlock') == false && e.target.matches('select') == false) {
                    textField.focus();
                }
            });
        }
    }
    createHorizontalLine() {
        let hr = document.createElement("hr");
        this._MainBlock.appendChild(hr);
    }
    createImage(source, color = "black") {
        let image = document.createElement("img");
        image.src = source;
        image.setAttribute("style", `border-color: ${color}; width: 105px; height: 105px;`);
        this._MainBlock.appendChild(image);
    }
    goToTop() {
        this._MainBlock.scrollIntoView({ 
            behavior: 'smooth'
          });
    }
}

export class MiniChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        //reading and puppet challenges:
        if (totalCastSize >= 10 && currentCast.length == 7 && !all_stars && !lipsync_assassin && !all_winners && episodeCount > 3 && !readingCheck || currentCast.length == totalCastSize && (all_stars || lipsync_assassin) && !readingCheck || episodeCount == 1 && all_winners && !readingCheck) {
            description.innerHTML = "The library is open! In today's mini-challenge, the queens will read each other!";
            readingCheck = true;
            readingChallenge();
        }
        else if (totalCastSize != 5 && currentCast.length == 5) {
            description.innerHTML = "Bring in the puppets! The queens will parody each other using puppets!";
        }
        else {
            description.innerHTML = "In today's mini-challenge, the queens will do " + pickRandomlyFromArray(miniChallengeDescriptions1) + " " + pickRandomlyFromArray(miniChallengeDescriptions2);
        }
    }
    rankPerformances() {
        let screen = new Scene();
        if (team) {
            let winner = pickRandomlyFromArray(currentCast);
            screen.createImage(winner.QueenA.image, "royalblue");
            screen.createImage(winner.QueenB.image, "royalblue");
            screen.createBold(`${winner.getName()} won the mini-challenge!`);
            winner.miniEpisode.push(episodeCount);
            winner.QueenA.miniEpisode.push(episodeCount);
            winner.QueenB.miniEpisode.push(episodeCount);
        } else {
            if (randomNumber(100) <= 90) {
                let winner = pickRandomlyFromArray(currentCast);
                screen.createImage(winner.image, "royalblue");
                screen.createBold(`${winner.getName()} won the mini-challenge!`);
                winner.miniEpisode.push(episodeCount);
                winner.miniWinner = true;
            }else {
                let winner = pickRandomlyFromArray(currentCast);
                let second;
                do{
                    second = pickRandomlyFromArray(currentCast);
                } while (second == winner);
                screen.createImage(winner.image, "royalblue");
                screen.createImage(second.image, "royalblue");
                screen.createBold(`${winner.getName()} and ${second.getName()} won the mini-challenge!`);
                winner.miniEpisode.push(episodeCount);
                second.miniEpisode.push(episodeCount);
                winner.miniWinner = true;
                second.miniWinner = true;
            }
        }
    }
}

export class ActingChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will act in a " + pickRandomlyFromArray(actingChallengeDescriptions1) + " named " + pickRandomlyFromArray(actingChallengeDescriptions2);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++) {
            currentCast[i].getActing();
        }
        sortPerformances(currentCast);
    }
}

export class ComedyChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        let whatChallengeIs;
        if (currentCast.length > 8) {
            whatChallengeIs = 0;
            episodeChallenges.push("Stand Up");
        } else {
            whatChallengeIs = 1;
            episodeChallenges.push("Roast");
        }
        description.innerHTML = "The queens will participate in " + pickRandomlyFromArray(comedyChallengeDescriptions1) + " about " + pickRandomlyFromArray(comedyChallengeDescriptions2);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getComedy();
        sortPerformances(currentCast);
    }
}

export class MarketingChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will participate in " + pickRandomlyFromArray(marketingDescriptions1) + " about " + pickRandomlyFromArray(marketingDescriptions2);
        episodeChallenges.push("Advert");
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getMarketing();
        sortPerformances(currentCast);
    }
}

export class DanceChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will participate in a dance number about " + pickRandomlyFromArray(danceDescriptions);
        if (randomNumber(100) >= 50) {
            episodeChallenges.push("Dance");
        } else {
            episodeChallenges.push("Choreo");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getDance();
        sortPerformances(currentCast);
    }
}

export class DesignChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        if (currentCast.length == 6 && makeoverCounter == false && team == false && currentCast != firstCast && currentCast != secondCast && !uk3Premiere && !s9Premiere && !conjoinedQueens) {
            
            description.innerHTML = "It's the makeover challenge! The queens will make "+ pickRandomlyFromArray(makeoverOptions) + " their drag sisters!";
        }
        else if (currentCast.length == totalCastSize && (uk3Premiere || s9Premiere) && !s9PremiereCheck && !uk3PremiereCheck) {
            description.innerHTML = "The queens will bring it to the runway and serve not one but two looks!";
        }
        else
            description.innerHTML = "The queens will do outfits with " + pickRandomlyFromArray(designDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getDesign();
        sortPerformances(currentCast);
    }
}

export class RunwayChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The queens will bring it to the runway! The category is: " + pickRandomlyFromArray(runwayDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRunwayChallenge();
        sortPerformances(currentCast);
    }
}

export class ImprovChallenge {
    generateDescription() {
        let description = document.querySelector("b#Description");
        let whatChallengeIs = randomNumber(13);
        description.innerHTML = "The queens will improvise in a " + pickRandomlyFromArray(improvDescriptions);
        if (whatChallengeIs == 0) {
            episodeChallenges.push("Political Debate");
        } else if (whatChallengeIs == 4) {
            episodeChallenges.push("The Bossy Rossy Show");
        } else if (whatChallengeIs == 6) {
            episodeChallenges.push("The Bitchelor");
        } else {
            episodeChallenges.push("Improv");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getImprov();
        sortPerformances(currentCast);
    }
}

export class SnatchGame {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... SNATCH GAME!! The queens will do funny celebrity impersonations!";
        if (randomNumber(100) >= 95) {
            episodeChallenges.push("Snatch Game of Love");
        } else {
            episodeChallenges.push("Snatch Game");
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getSnatch();
        sortPerformances(currentCast);
    }
}

export class Rusical {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... THE RUSICAL!! The queens were tasked to take part in " + pickRandomlyFromArray(rusicalDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRusical();
        sortPerformances(currentCast);
    }
}

export class Ball {
    generateDescription() {
        let description = document.querySelector("b#Description");
        if (randomNumber(100) >= 35) {
            let ballTheme = pickBallTheme(themedBallDescriptions);
            description.innerHTML = "Today's challenge is... THE BALL! The " + ballTheme.name + " Ball!! And the themes are: " + ballTheme.themes + ".";
        } else {
            description.innerHTML = "Today's challenge is... THE BALL! The queens will bring three looks to the runway! The themes are: " + pickRandomlyFromArray(ballDescriptions1) + ", " + pickRandomlyFromArray(ballDescriptions2) + ", and " + pickRandomlyFromArray(ballDescriptions3); 
        }
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getBall();
        sortPerformances(currentCast);
    }
}

export class Rumix {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "Today's challenge is... the rumix! The queens will make a verse and a choreography for " + pickRandomlyFromArray(rumixDescriptions);
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRumix();
        sortPerformances(currentCast);
    }
}

export class GirlGroup {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "The remaining queens will record vocals and perform in a Girl Group number for the original song " + pickRandomlyFromArray(girlGroupDescriptions) + ".";
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getRumix();
        sortPerformances(currentCast);
    }
}

export class TalentShow {
    generateDescription() {
        let description = document.querySelector("b#Description");
        description.innerHTML = "In this first challenge, the queens will prove themselves in a talent show, where they bring all they've got!";
    }
    rankPerformances() {
        for (let i = 0; i < currentCast.length; i++)
            currentCast[i].getTalentShow();
        sortPerformances(currentCast);
    }
}
