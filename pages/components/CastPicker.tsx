import React from 'react';
import Queen from '../classes/Queen';
import BigText from './lilbabies/BigText';
import Button from './lilbabies/Button';
import NormalText from './lilbabies/NormalText';
import QueenCard from './lilbabies/QueenCard';
import { addQueenToArray, addQueenToArrayAndSort, pickRandomlyFromArray, removeQueenFromArray } from '../utils/utils';

type CastPickerProps = {
    queens: Array<Queen>
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

export default class ClassPicker extends React.Component<CastPickerProps, CastPickerState> {
    constructor(props: CastPickerProps) {
        super(props);
        this.state = {searchableQueens: props.queens, showingQueens: [], selectedQueens: [], searchValue: ""};
    }

    addRandomStandardContestant = () => {
        let queen = pickRandomlyFromArray(this.state.searchableQueens);
        this.selectQueen(queen);
    }
    
    addRandomCustomContestant() {
    }
    
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

    render() {
        return <div className="mainPart" id="MainBlock">
            <BigText text="This is your chance to simulate a drag race season with all your favorite contestants!" />
            <div className="search-wrapper">
                <BigText text="Choose your contestants:" noBreak/>
                <input type="search" className="searchInput" placeholder={this.canAddMoreQueens() ? "Type a name.." : "You can't choose more than 20 contestants"} value={this.state.searchValue} onChange={this.updateShowingQueens}></input>
            </div>
            <div>
                {(this.state.searchableQueens.length > 0 && this.canAddMoreQueens) ?
                    <Button text="Random" onClick={this.addRandomStandardContestant}/>
                    : null
                }
                {/*<Button text="Random Customs" onClick={this.addRandomCustomContestant}/>*/}
                {/*<Button text="Choose More Contestants" onClick={this.moreKweens}/>*/}
            </div>
            <div className="drag-cards">
                {this.state.showingQueens.map(queen => (
                    <QueenCard queen={queen} key={queen.getName()} onSelect={() => this.selectQueen(queen)}/>
                ))}
            </div>
            <hr />
            {this.state.selectedQueens.length > 0 ? 
                <div>
                    <BigText text="Current Cast:" noBreak/>
                    <div className="drag-cards">
                    {this.state.selectedQueens.map(queen => (
                        <QueenCard queen={queen} key={queen.getName()} onRemove={() => this.removeQueen(queen)}/>
                    ))}
                    </div>
                </div> : null
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
            <br />
            <div>
                <Button text="Simulate now!" onClick={startSimulation}/>
            </div>
            <hr />
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
*/