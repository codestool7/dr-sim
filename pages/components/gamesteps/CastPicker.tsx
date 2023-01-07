import React from 'react';
import Queen from '../../classes/Queen';
import BigText from '../lilbabies/BigText';
import Button from '../lilbabies/Button';
import NormalText from '../lilbabies/NormalText';
import QueenCard from '../lilbabies/QueenCard';
import { addQueenToArray, addQueenToArrayAndSort, pickRandomlyFromArray, removeQueenFromArray } from '../../utils/utils';
import Season from '../../classes/Season';
import Header from '../lilbabies/Header';

type CastPickerProps = {
    queens: Array<Queen>,
    startSeason: (season: Season) => void
}

type CastPickerState = {
    // queens you can search for
    searchableQueens: Array<Queen>,
    // queens showing under search box that you can select
    showingQueens: Array<Queen>,
    // queens currently selected and in cast list
    selectedQueens: Array<Queen>,
    // text value of search box
    searchValue: string
}

export default class CastPicker extends React.Component<CastPickerProps, CastPickerState> {
    constructor(props: CastPickerProps) {
        super(props);
        this.state = {searchableQueens: props.queens, showingQueens: [], selectedQueens: [], searchValue: ""};
    }

    addRandomStandardContestant = () => {
        let queen = pickRandomlyFromArray(this.state.searchableQueens);
        this.selectQueen(queen);
    }
    
    // TODO implement this and update standard one to filter once I implement custom shit
    addRandomCustomContestant() {
    }
    
    // idk what this does and I don't care rn
    moreKweens() {
    }
    
    updateShowingQueens = (event) => {
        if (this.canAddMoreQueens()) {
            const searchString = event.target.value.toLocaleLowerCase();
            if (searchString.length == 0) {
                this.setState({
                    showingQueens: [],
                    searchValue: ""
                });
            } else {
                let nowShowing = this.state.searchableQueens.filter(queen => {
                    return queen.getName().toLocaleLowerCase().includes(searchString);
                });
                this.setState({
                    showingQueens: nowShowing,
                    searchValue: searchString
                });
            }
        }
    }

    selectQueen = (queen) => {
        if (this.canAddMoreQueens()) {
            let nowSelected = addQueenToArray(this.state.selectedQueens, queen);
            let nowSearchable = removeQueenFromArray(this.state.searchableQueens, queen);
            this.setState({
                selectedQueens: nowSelected,
                searchableQueens: nowSearchable,
                showingQueens: [],
                searchValue: ""
            })
        }
    }

    removeQueen = (queen) => {
        let nowSelected = removeQueenFromArray(this.state.selectedQueens, queen);
        let nowSearchable = addQueenToArrayAndSort(this.state.searchableQueens, queen);
        this.setState({
            selectedQueens: nowSelected,
            searchableQueens: nowSearchable
        })
    }

    canAddMoreQueens = () => {
        if (this.state.selectedQueens.length < 20) {
            return true;
        } else {
            return false;
        }
    }

    checkSettingsAndGo = () => {
        // I'm just gonna say the only requirement rn is at least 8 queens
        // but later we'll check all the options and shit here
        // we shouldn't need to check for dupes bc it shouldn't have been possible to add any? but ig we could add that check if we really wanna be thorough?
        if (this.state.selectedQueens.length < 8) {
            window.alert("gotta have at least 8 queens hentina");
        } else {
            let season = new Season("customSeason1", this.state.selectedQueens);
            this.props.startSeason(season);
        }
    }

    render() {
        return <div>
            <Header
                text="Drag Race Simulator!"
            />
            <div className="mainPart" id="MainBlock">
                <BigText text="This is your chance to simulate a drag race season with all your favorite contestants!" />
                <div className="search-wrapper">
                    <BigText text="Choose your contestants:" noBreak/>
                    <input type="search" className="searchInput" placeholder={this.canAddMoreQueens() ? "Type a name.." : "You can't choose more than 20 contestants"} value={this.state.searchValue} onChange={this.updateShowingQueens}></input>
                </div>
                <div>
                    {(this.state.searchableQueens.length > 0 && this.canAddMoreQueens) &&
                        <Button text="Random" onClick={this.addRandomStandardContestant}/>
                    }
                    {/*<Button text="Random Customs" onClick={this.addRandomCustomContestant}/>*/}
                    {/*<Button text="Choose More Contestants" onClick={this.moreKweens}/>*/}
                </div>
                <div className="drag-cards">
                    {this.state.showingQueens.map(queen => (
                        <QueenCard queen={queen} key={queen.getName() + ' showing card'} onSelect={() => this.selectQueen(queen)}/>
                    ))}
                </div>
                <hr />
                {this.state.selectedQueens.length > 0 && 
                    <div>
                        <BigText text={"Current Cast: " + this.state.selectedQueens.length} noBreak/>
                        <div className="drag-cards">
                        {this.state.selectedQueens.map(queen => (
                            <QueenCard queen={queen} key={queen.getName() + ' selected card'} onRemove={() => this.removeQueen(queen)}/>
                        ))}
                        </div>
                    </div>
                }
                {/*<div>
                    <NormalText text="Choose your premiere format:"/>
                    <select id="premiere-format">
                        <option>Normal premiere</option>
                        <option value="s6-premiere">Double Premiere</option>
                        <option value="s9-premiere">Normal Premiere (No Elimination)</option>
                        <option value="s12-premiere">Double Premiere (No Elimination)</option>
                        <option value="porkchop">Porkchop Premiere</option>
                        <option value="uk3-premiere">UK3 Premiere</option>
                        <option value="s14-premiere">Double Premiere (Talent Show)</option>
                    </select>
                </div>
                <div>
                    <NormalText text="Choose your season format:"/>
                    <select id="format">
                        <option value="regular">Regular Format</option>
                        <option value="thailand">Thailand's Format</option>
                        <option value="team">Teams Format</option>
                        <option value="all-stars">Lipsync For Your Legacy Format</option>
                        <option value="lipsync-assassin">Lipsync Assassin Format</option>
                        <option value="all-winners">All Winners Format</option>
                    </select>
                </div>
                <div>
                    <NormalText text="Choose your returning format:"/>
                    <select id="returning">
                        <option>None</option>
                        <option value="choose">Choose who returns</option>
                        <option value="random">Random queen returns</option>
                        <option value="votes">Remaining queens vote</option>
                        <option value="conjoined-queens">Conjoined Queens Makeover</option>
                        <option value="queensofcomedy">Queens of Comedy</option>
                        <option value="kittygirlgroup">Kitty Girl Group</option>
                        <option value="smackdown">Lip-Sync Smackdown</option>
                        <option value="lalaparuza">LaLaPaRuZa</option>
                    </select>
                </div>
                <div>
                    <NormalText text="Choose your finale format:"/>
                    <select id="finale">
                        <option value="top5">Top 5</option>
                        <option value="top4">Top 4</option>
                        <option value="top3">Top 3</option>
                        <option value="teams">Teams Finale</option>
                        <option value="LFTC">Lip-Sync For The Crown</option>
                        <option value="LFTF">Lip Sync for the Finale</option>
                        <option value="jury">Jury Vote</option>
                        <option value="randomFinale">Random Finale</option>
                    </select>
                </div>
                <br />*/}
                <div>
                    <Button text="Simulate now!" onClick={this.checkSettingsAndGo}/>
                </div>
                {/*<hr />
                <div>
                    <BigText text="Options:" noBreak/> <br />
                    <input type="checkbox" id="immunity"></input> Add immunity<br />
                    <input type="checkbox" id="disableDouble"></input> Disable double shantays and sashays<br />
                    <input type="checkbox" id="riggory"></input> Disable Challenge Riggory<br />
                    <input type="checkbox" id="riggoryLipsync"></input> Disable Lipsync Riggory
                    <NormalText text="Chocolate Bar Twist:"/>
                    <input type="checkbox" id="chocolateBar"></input> Random
                    <input type="checkbox" id="chocolateBarChoosable"></input> Choosable
                </div>*/}
            </div>
        </div>;
    }
}

/*
// first button onclick
function addRandomContestant() {
    let button = document.getElementById("randomK");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomKC");
    let noCustom = allQueens.filter(queen => { return queen.customqueen == false });
    let randomContestant = pickRandomlyFromArray(noCustom);
    while (currentCast.find( (queen) => {
        return queen.getName() == randomContestant.getName()
    })) {
        randomContestant = pickRandomlyFromArray(noCustom);
    }
    currentCast.push(randomContestant);
    updateCast();
    if (currentCast.length >= 20) {
        searchInput.setAttribute("readonly", true);
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
        button.classList.toggle("hide", true);
        button1.classList.toggle("hide", false);
        button2.classList.toggle("hide", true);
    }
    let big = document.getElementById("castBig");
    if (currentCast.length != 0) {
        big.classList.toggle("hide", false);
        big.innerHTML = "Current Cast: " + currentCast.length;
    }
}

// second button onclick
function addRandomCustomContestant() {
    let button = document.getElementById("randomKC");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomK");
    let noCustom = allQueens.filter(queen => { return queen.customqueen == true });
    let randomContestant = pickRandomlyFromArray(noCustom);
    while (currentCast.find( (queen) => {
        return queen.getName() == randomContestant.getName()
    })) {
        randomContestant = pickRandomlyFromArray(noCustom);
    }
    currentCast.push(randomContestant);
    updateCast();
    if (currentCast.length >= 20) {
        searchInput.setAttribute("readonly", true);
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
        button.classList.toggle("hide", true);
        button1.classList.toggle("hide", false);
        button2.classList.toggle("hide", true);
    }
    let big = document.getElementById("castBig");
    if (currentCast.length != 0) {
        big.classList.toggle("hide", false);
        big.innerHTML = "Current Cast: " + currentCast.length;
    }
}

// third button onclick
function moreKweens() {
    let button = document.getElementById("randomK");
    let button1 = document.getElementById("moreK");
    let button2 = document.getElementById("randomKC");
    if (currentCast.length < 20) {
        button.classList.toggle("hide", false);
        button1.classList.toggle("hide", true);
        button2.classList.toggle("hide", false);
        searchInput.removeAttribute("readonly");
        searchInput.removeAttribute("placeholder");
        searchInput.setAttribute("placeholder", "Type a name..");
    } else {
        window.alert("Remove one contestant of your current cast..");
    }
}

function startSimulation(challenge = "") {
    totalCastSize = currentCast.length;
    if (currentCast.length == 0)
        window.alert("Your cast is empty!");
    else if (duplicateQueens(currentCast))
        window.alert("Please, only use one of each queen on your cast!");
    else {
        let select = document.getElementById("format");
        let select2 = document.getElementById("premiere-format");
        let select3 = document.getElementById("returning");
        let select4 = document.getElementById("finale");
        if (select.options[select.selectedIndex].value == "regular")
            regularFormat = true;
        else if (select.options[select.selectedIndex].value == "thailand")
            thailandFormat = true;
        else if (select.options[select.selectedIndex].value == "all-stars")
            all_stars = true;
        else if (select.options[select.selectedIndex].value == "all-winners") {
            all_winners = true;
        }
        else if (select.options[select.selectedIndex].value == "team")
            team = true;
        else if (select.options[select.selectedIndex].value == "lipsync-assassin") {
            lipsync_assassin = true;
            allQueensCopy2 = [...allQueens];
            allQueens = allQueens.filter(function (queen) { return queen.getLipSyncStat() >= 11; });
            allQueens = allQueens.filter(function (queen) { return currentCast.indexOf(queen) == -1; });
            allQueensCopy = [...allQueens];
        }
        if (select4.options[select4.selectedIndex].value == "top5")
            top5 = true;
        else if (select4.options[select4.selectedIndex].value == "top4")
            top4 = true;
        else if (select4.options[select4.selectedIndex].value == "top3")
            top3 = true;
        else if (select4.options[select4.selectedIndex].value == "teams")
            teamsF = true;
        else if (select4.options[select4.selectedIndex].value == "LFTC")
            lftc = true;
        else if (select4.options[select4.selectedIndex].value == "LFTF")
            canFinale = true;
        else if (select4.options[select4.selectedIndex].value == "jury")
            allstars3Finale = true;
        else if (select4.options[select4.selectedIndex].value == "randomFinale") {
            if (team) {
                window.alert("Random Finale is not compatible with Teams Format.");
                team = false;
                return
            } else {
                let randomNumberFinale = randomNumber(7);
                switch (randomNumberFinale) {
                    case 0:
                        top5 = true;
                        break;
                    case 1:
                        top4 = true;
                        break;
                    case 2:
                        top3 = true;
                        break;
                    case 3:
                        teamsF = true;
                        break;
                    case 4:
                        lftc = true;
                        break;
                    case 5:
                        canFinale = true;
                        break;
                    case 6:
                        allstars3Finale = true;
                        break;
                    default:
                        top3 = true;
                        break;
                }
            }
        }
        if (select2.options[select2.selectedIndex].value == "s6-premiere")
            s6Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s9-premiere")
            s9Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s12-premiere")
            s12Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "s14-premiere")
            s14Premiere = true;
        else if (select2.options[select2.selectedIndex].value == "porkchop")
            porkchopPremiere = true;
        else if (select2.options[select2.selectedIndex].value == "uk3-premiere")
            uk3Premiere = true;
        if (select3.options[select3.selectedIndex].value == "random")
            randomReturn = true;
        else if (select3.options[select3.selectedIndex].value == "choose")
            chooseReturn = true;
        else if (select3.options[select3.selectedIndex].value == "votes")
            voteReturn = true;
        else if (select3.options[select3.selectedIndex].value == "conjoined-queens")
            conjoinedQueens = true;
        else if (select3.options[select3.selectedIndex].value == "queensofcomedy")
            queensOfComedy = true;
        else if (select3.options[select3.selectedIndex].value == "kittygirlgroup")
            kittyGirlGroup = true;
        else if (select3.options[select3.selectedIndex].value == "lalaparuza")
            lalaparuza = true;
        else if (select3.options[select3.selectedIndex].value == "smackdown")
            smackdown = true;
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
        if (currentCast.length == 3 && lftc || currentCast.length == 3 && (all_stars || all_winners)) {
            window.alert("Lip-Sync For The Crown and All Star formats needs at least 4 queens!");
            lftc = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if (team == true && currentCast.length % 2 !== 0) {
            window.alert("Team format needs an even amout of queens!");
            team = false;
        }
        else if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) && currentCast.length < 10 ) {
            window.alert("Double Premiere formats needs at least 10 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if ((s6Premiere || s12Premiere || porkchopPremiere || s14Premiere) && top5 && currentCast.length < 12 ) {
            window.alert("Top 5 finale with double premiere formats needs at least 12 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
            all_stars = false;
            all_winners = false;
            allstars3Finale = false;
        }
        else if (uk3Premiere && currentCast.length < 6) {
            window.alert("Uk3 Premiere needs at least 6 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
            lipsync_assassin = false;
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
        }
        else if (s9Premiere && currentCast.length < 6) {
            window.alert("Normal Premiere (No Elimination) needs at least 6 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
            lipsync_assassin = false;
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
        }
        else if ((queensOfComedy || conjoinedQueens || kittyGirlGroup) && currentCast.length < 10) {
            window.alert("Queens of comedy, Kitty Girl Group and Conjoined Queens return challenges need at least 10 queens!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            lipsync_assassin = false;
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
        }
        else if (team && (smackdown || immunityTwist || voteReturn || randomReturn || chooseReturn || chocolateBarTwist || s9Premiere || s6Premiere || lalaparuza || queensOfComedy || kittyGirlGroup || conjoinedQueens || s12Premiere || porkchopPremiere || s14Premiere || uk3Premiere || top5 || top4 || top3 || lftc || canFinale || allstars3Finale)) {
            window.alert("The team format isn't supported with any special premiere, returning formats, immunity or a different finale that is not Teams Finale, sorry!");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            team = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            lftc = false;
            canFinale = false;
            smackdown = false;
            voteReturn = false;
            randomReturn = false;
            chooseReturn = false;
            lalaparuza = false;
            queensOfComedy = false;
            conjoinedQueens = false;
            kittyGirlGroup = false;
            chocolateBarTwist = false;
            chocolateBarTwistChoosable = false;
            immunityTwist = false;
        }
        else if(all_winners && (smackdown || s14Premiere || s12Premiere || s9Premiere || s6Premiere || porkchopPremiere || uk3Premiere || voteReturn || conjoinedQueens || queensOfComedy || kittyGirlGroup || randomReturn || chooseReturn || lalaparuza || chocolateBarTwist || top5 || top4 || top3 || canFinale || allstars3Finale)) {
            window.alert("The All Winners Format isn't avaliable with any combination of premiere, returning challenge or Chocolate Bar Twist, at this moment. Finale format must be Lipsync for the Crown,");
            s6Premiere = false;
            s9Premiere = false;
            s12Premiere = false;
            s14Premiere = false;
            porkchopPremiere = false;
            uk3Premiere = false;
            top5 = false;
            top4 = false;
            top3 = false;
            teamsF = false;
            regularFormat = false;
            thailandFormat = false;
            canFinale = false;
            lftc = false;
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
        else if (s6Premiere || s12Premiere || s14Premiere) {
            doublePremiere();
        }
        else if (porkchopPremiere) {
            porkchopLipsyncs();
        }
        else {
            newEpisode();
        }
    }
}

function giveChocolate() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/chocolate.webp')";
    let title = document.querySelector("h1#MainTitle");
    let goldenChecker = false;
    title.innerHTML = "Chocolate Bar Selection";
    screen.createBold("For this season, we're doing things a little differently, and when it comes to saving queens, I'm leaving it up to the Drag Gods.")
    screen.createBold("Now, you all may pick a bar one at a time.");
    for (let i = 0; i < currentCast.length; i++) {
        screen.createImage(currentCast[i].image , "gold");
        screen.createImage("image/ChocolateBarTBA.webp", "grey")
        screen.createBold(currentCast[i].getName() + " picks their Chocolate bar...");
        fullCast.push(currentCast[i]);
        if (randomNumber(100) >= 90) {
            if (!goldenChecker) {
                currentCast[i].chocolate = true;
                goldenChecker = true;
            } else {
                currentCast[i].chocolate = false;
            }
        } else {
            currentCast[i].chocolate = false;
        }
    }
    if (!goldenChecker) {
        let number = randomNumber(currentCast.length);
        currentCast[number].chocolate = true;
        goldenChecker = true;
    }
    if (s14Premiere) {
        chocolateBarTwistCheck = true;
    }
    if (s6Premiere || s12Premiere || s14Premiere) {
        screen.createButton("Proceed", "doublePremiere()");
    }
    else if (s9Premiere) {
        chooseLateQueen();
    }
    else if (porkchopPremiere) {
        screen.createButton("Proceed", "porkchopLipsyncs()");
    }
    else {
        screen.createButton("Proceed", "newEpisode()");
    }
}
function chooseGoldenBar() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/chocolate.webp')";
    let title = document.querySelector("h1#MainTitle");
    title.innerHTML = "Chocolate Bar Selection";
    screen.createBold("For this season, we're doing things a little differently, and when it comes to saving queens, I'm leaving it up to the Drag Gods.")
    screen.createBold("Select which queen will recieve the Golden Chocolate Bar.");
    let main = document.querySelector("div#MainBlock");
    let castSelection = document.createElement("p");
    castSelection.setAttribute("id", "castSelection");
    castSelection.innerHTML = '';
    let select = document.createElement("select");
    select.setAttribute("id", "queenList");
    select.setAttribute("onchange", "returnImg()");
    let img = document.createElement("img");
    img.setAttribute("id", "images");
    img.setAttribute("style", "width: 105px; height: 105px;");
    let p = document.createElement("p");
    p.appendChild(img);
    for (let k = 0; k < currentCast.length; k++) {
        let option = document.createElement("option");
        option.innerHTML = currentCast[k].getName();
        option.value = currentCast[k].image;
        select.add(option);
    }
    select.selectedIndex = randomNumber(currentCast.length);
    let br = document.createElement("br");
    castSelection.appendChild(p);
    castSelection.appendChild(select);
    castSelection.appendChild(br);
    main.appendChild(castSelection);
    returnImg();
    screen.createButton("Choose Queen", "fijarGoldenQueen()", "fijar");
    for (let i = 0; i < currentCast.length; i++) {
        fullCast.push(currentCast[i]);
    }
}

function chooseLateQueen() {
    let screen = new Scene();
    screen.clean();
    let title = document.querySelector("h1#MainTitle");
    title.innerHTML = "Choose the contestant that will miss the premiere";
    let main = document.querySelector("div#MainBlock");
    let castSelection = document.createElement("p");
    castSelection.setAttribute("id", "castSelection");
    castSelection.innerHTML = '';
    let select = document.createElement("select");
    select.setAttribute("id", "queenList");
    select.setAttribute("onchange", "returnImg()");
    let img = document.createElement("img");
    img.setAttribute("id", "images");
    img.setAttribute("style", "width: 105px; height: 105px;");
    let p = document.createElement("p");
    p.appendChild(img);
    for (let k = 0; k < currentCast.length; k++) {
        let option = document.createElement("option");
        option.innerHTML = currentCast[k].getName();
        option.value = currentCast[k].image;
        select.add(option);
    }
    select.selectedIndex = randomNumber(currentCast.length);
    let br = document.createElement("br");
    castSelection.appendChild(p);
    castSelection.appendChild(select);
    castSelection.appendChild(br);
    main.appendChild(castSelection);
    returnImg();
    screen.createButton("Choose", "fijarLateQueen()", "fijar");
}

function doublePremiere() {
    if (episodeCount == 0 && !porkchopPremiere) {
        currentCast.forEach((queen) => {
            for (let i = 0; i < currentCast.length; i++) {
                if (queen.getName() != currentCast[i].getName()) {
                    queen.sisters.push({queen: currentCast[i], relation: 0});
                }
            }
        });
    }
    if (premiereCounter == 0) {
        if (porkchopPremiere) {
            currentCast = firstCast;
            for (let i = 0; i < secondCast.length; i++)
                secondCast[i].addToTrackRecord("");
        }
        currentCast = collection.shuffle(currentCast);
        premiereCounter++;
        slayersCheck = true;
        s14LaLaPaRUZaCheck = true;
        newEpisode();
    }
    else if (premiereCounter == 1) {
        currentCast = secondCast;
        for (let i = 0; i < firstCast.length; i++)
            firstCast[i].addToTrackRecord("");
        premiereCounter++;
        slayersCheck = true;
        s14LaLaPaRUZaCheck = true;
        newEpisode();
    }
    else if (premiereCounter == 2 && s14Premiere) {
        currentCast = [...firstCast, ...secondCast];
        premiereCounter++;
        chocolateBarTwistCheck = false;
        slayersCheck = false;
        s14LaLaPaRUZaCheck = false;
        newEpisode();
    }
    else if (premiereCounter == 2) {
        currentCast = [...firstCast, ...secondCast];
        premiereCounter++;
        slayersCheck = false;
        s14LaLaPaRUZaCheck = false;
        newEpisode();
    }
}

function porkchopLipsyncs() {
    currentCast.forEach((queen) => {
        for (let i = 0; i < currentCast.length; i++) {
            if (queen.getName() != currentCast[i].getName()) {
                queen.sisters.push({queen: currentCast[i], relation: 0});
            }
        }
    });
    let screen = new Scene();
    screen.clean();
    screen.createHeader("It's time...");
    screen.createParagraph("After the queens enter the workroom, it's time for them to lip-sync... for their lives!");
    for (let i = 0; i < Math.floor(totalCastSize / 2); i++) {
        screen.createHorizontalLine();
        let queen1 = pickRandomlyFromArray(currentCast);
        currentCast.splice(currentCast.indexOf(queen1), 1);
        let queen2 = pickRandomlyFromArray(currentCast);
        currentCast.splice(currentCast.indexOf(queen2), 1);
        if (currentCast.length == 1) {
            let queen3 = pickRandomlyFromArray(currentCast);
            currentCast.splice(currentCast.indexOf(queen3), 1);
            screen.createImage(queen1.image, "royalblue");
            screen.createImage(queen2.image, "royalblue");
            screen.createImage(queen3.image, "royalblue");
            screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} will lipsync...`);
            lsSong();
            let lipSync = [queen1, queen2, queen3];
            for (let i = 0; i < lipSync.length; i++) {
                lipSync[i].getASLipsync();
            }
            lipSync.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
            queen1 = lipSync[0];
            queen2 = lipSync[1];
            queen3 = lipSync[2];
            screen.createImage(queen1.image, "green");
            screen.createBold(`${queen1.getName()}, shantay you stay!`);
            screen.createImage(queen2.image, "orange");
            screen.createImage(queen3.image, "orange");
            screen.createBold(`${queen2.getName()} and ${queen3.getName()}, you're getting the porkchop...`);
            queen1.addToTrackRecord(" WIN ");
            queen2.addToTrackRecord("LOSS");
            queen3.addToTrackRecord("LOSS");
            firstCast.push(queen1);
            secondCast.push(queen2, queen3);
        }
        else {
            screen.createImage(queen1.image, "royalblue");
            screen.createImage(queen2.image, "royalblue");
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} will lipsync...`);
            lsSong();
            let lipSync = [queen1, queen2];
            for (let i = 0; i < lipSync.length; i++) {
                lipSync[i].getASLipsync();
            }
            lipSync.sort((a, b) => (b.lipsyncScore - a.lipsyncScore));
            queen1 = lipSync[0];
            queen2 = lipSync[1];
            screen.createImage(queen1.image, "green");
            screen.createBold(`${queen1.getName()}, shantay you stay!`);
            screen.createImage(queen2.image, "orange");
            screen.createBold(`${queen2.getName()}, you're getting the porkchop...`);
            queen1.addToTrackRecord(" WIN ");
            queen2.addToTrackRecord("LOSS");
            firstCast.push(queen1);
            secondCast.push(queen2);
        }
    }
    screen.createHorizontalLine();
    screen.createBigText("The porkchop queens will vote out one of their group...");
    screen.createBold("The queens vote...");
    for (let i = 0; i < secondCast.length; i++) {
        secondCast[i].lipstick = pickRandomlyFromArray(secondCast);
        while (secondCast[i].lipstick.getName() == secondCast[i].getName()) {
            secondCast[i].lipstick = pickRandomlyFromArray(secondCast);
        }
        secondCast[i].lipstick.votes++;
        screen.createParagraph(`${secondCast[i].getName()} voted for ${secondCast[i].lipstick.getName()}!`);
    }
    screen.createHorizontalLine();
    screen.createBold("The results are in..!");
    for (let i = 0; i < secondCast.length; i++) {
        screen.createBold(`${secondCast[i].getName()}: ${secondCast[i].votes.toString()} votes`);
    }
    screen.createHorizontalLine();
    let queen = secondCast.sort((a, b) => b.votes - a.votes)[0];

    if (secondCast[0].votes == secondCast[1].votes) {
        screen.createBold("It is a tie, the queens must revote between " + secondCast[0].getName() + " and " + secondCast[1].getName() + "!!");
        secondCast[0].votes = 0;
        secondCast[1].votes = 0;
        for (let i = 0; i < secondCast.length; i++) {
            secondCast[i].lipstick = secondCast[randomNumber(2)];
            while (secondCast[i].lipstick.getName() == secondCast[i].getName()) {
                secondCast[i].lipstick = secondCast[randomNumber(2)];
            }
            secondCast[i].lipstick.votes++;
            screen.createParagraph(`${secondCast[i].getName()} voted for ${secondCast[i].lipstick.getName()}!`);
        }
        screen.createHorizontalLine();
        screen.createBold("The results are in..!");
        screen.createBold(`${secondCast[0].getName()}: ${secondCast[0].votes.toString()} votes`);
        screen.createBold(`${secondCast[1].getName()}: ${secondCast[1].votes.toString()} votes`);
        let tiebreaker = secondCast.sort((a, b) => b.votes - a.votes)[0];
        queen = tiebreaker;
        screen.createHorizontalLine();
    }
    screen.createImage(queen.image, "orange");
    screen.createBold(`The queen that's getting the porkchop is... ${queen.getName()}!`);
    firstCast.push(queen);
    secondCast.splice(secondCast.indexOf(queen), 1);
    queen.trackRecord.pop();
    queen.addToTrackRecord("LOSS ")
    episodeChallenges.push("Lipsync");
    for (let i = 0; i < secondCast.length; i++) {
        secondCast[i].votes = 0;
    }
    screen.createButton("Proceed", "doublePremiere()");
    episodeCount++;
}
*/