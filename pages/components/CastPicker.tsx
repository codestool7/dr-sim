import React from 'react';
import array from 'lodash/array';
import lang from 'lodash/lang';
import Queen from '../classes/Queen';
import BigText from './lilbabies/BigText';
import Button from './lilbabies/Button';
import NormalText from './lilbabies/NormalText';
import QueenCard from './lilbabies/QueenCard';

type CastPickerProps = {
    queens: Array<Queen>
}

type CastPickerState = {
    showingQueens: Array<Queen>,
    selectedQueens: Array<Queen>,
    searchValue: string
}

export default class ClassPicker extends React.Component<CastPickerProps, CastPickerState> {
    constructor(props: CastPickerProps) {
        super(props);
        this.state = {showingQueens: [], selectedQueens: [], searchValue: ""};
    }

    addRandomStandardContestant() {
    }
    
    addRandomCustomContestant() {
    }
    
    moreKweens() {
    }
    
    // TODO don't show queens that are already selected
    updateShowingQueens = (event) => {
        const searchString = event.target.value.toLocaleLowerCase();
        if (searchString.length == 0) {
            this.setState({
                showingQueens: [],
                searchValue: ""
            });
        } else {
            let nowShowing = this.props.queens.filter(queen => {
                return queen.getName().toLocaleLowerCase().includes(searchString);
            });
            this.setState({
                showingQueens: nowShowing,
                searchValue: searchString
            });
        }
    }

    selectQueen = (queen) => {
        let alreadySelected = this.state.selectedQueens;
        alreadySelected.push(queen);
        this.setState({
            selectedQueens: alreadySelected,
            showingQueens: [],
            searchValue: ""
        });
    }

    removeQueen = (queen) => {
        let nowSelected = this.state.selectedQueens;
        let removed = array.remove(nowSelected, function(q: Queen) {
            return lang.isEqual(q, queen);
        });
        if (!removed || removed.length < 1) {
            throw new Error("failed to remove queen " + queen.getName());
        }
        if (removed.length > 1) {
            throw new Error("somehow removed multiple queens named " + queen.getName() + "?? how did you do this bro");
        }
        this.setState({
            selectedQueens: nowSelected
        })
    }

    render() {
        return <div className="mainPart" id="MainBlock">
            <BigText text="This is your chance to simulate a drag race season with all your favorite contestants!" />
            <div className="search-wrapper">
                <BigText text="Choose your contestants:" noBreak/>
                <input type="search" className="searchInput" placeholder="Type a name.." value={this.state.searchValue} onChange={this.updateShowingQueens}></input>
            </div>
            <div>
                <Button text="Random" onClick={this.addRandomStandardContestant}/>
                <Button text="Random Customs" onClick={this.addRandomCustomContestant}/>
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
<template data-drag-template>
    <div className="card">
        <div className="data-image" data-image></div>
        <div className="header" data-header></div>
    </div>
</template>

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

const queenCardTemplate = document.querySelector("[data-drag-template]");
const queenCardContainer = document.querySelector("[data-drag-cards-container]");
const searchInput = document.querySelector("[data-search]");
let chosenKweensContainer = document.getElementById("chosenKweens");
let showingQueens = [];

// event listener to update queen options when you type a character
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    showingQueens.forEach(queen => {
        const isVisible = queen.name.toLowerCase().includes(value);
        if (value == "") {
            queen.element.classList.toggle("hide", isVisible);
        } else {
            queen.element.classList.toggle("hide", !isVisible);
        }
    });
});

// maps allQueens list to new showingQueens list that includes the dom element for each queen
showingQueens = allQueens.map(queen => {
    const card = queenCardTemplate.content.cloneNode(true).children[0];
    const cardImage = card.querySelector("[data-image]");
    const header = card.querySelector("[data-header]");
    let image = document.createElement("img");
    image.src = queen.image;
    image.setAttribute("style", `border-color: black; width: 105px; height: 105px;`);
    cardImage.appendChild(image);
    header.textContent = queen._name;
    card.setAttribute("id", queen._name);
    cardImage.setAttribute("id", queen._name);
    header.setAttribute("id", queen._name);
    image.setAttribute("id", queen._name);
    queenCardContainer.append(card);
    return { name: queen._name, element: card}
});

// when you select a queen to add
queenCardContainer.addEventListener("click", e => {
    if (e.target && (e.target.matches("div.card") || e.target.parentNode.matches("div.card") || e.target.matches("img") ) ) {
        let id;
        if (e.target.matches("div.card")) {
            id = e.target.id
        } else if (e.target.parentNode.matches("div.card")) {
            id = e.target.parentNode.id
        } else if (e.target.matches("img")) {
            id = e.target.parentNode.parentNode.id
        }
        let queenFound = allQueens.find((queen) => {
            return queen._name == id
        });
        //get selected names and compare them to the all queens list:
        for (let k = 0; k < allQueens.length; k++) {
            if (queenFound.getName() == allQueens[k].getName()) {
                currentCast.push(allQueens[k]);
                break;
            }
        }
        updateCast();
        resetSearch();
        let button = document.getElementById("randomK");
        let button1 = document.getElementById("moreK");
        if (currentCast.length == 20) {
            searchInput.setAttribute("readonly", true);
            searchInput.removeAttribute("placeholder");
            searchInput.setAttribute("placeholder", "You can't choose more than 20 contestants");
            button.classList.toggle("hide", true);
            button1.classList.toggle("hide", false);
        }
        let big = document.getElementById("castBig");
        if (currentCast.length != 0) {
            big.classList.toggle("hide", false);
            big.innerHTML = "Current Cast: " + currentCast.length;
        }
    }
})

// update chosen queens list with array of selected queens
function updateCast() {
    chosenKweensContainer.innerHTML = "";
    currentCast.forEach(queen => {
        chosenKweensContainer.innerHTML += addKween(queen);
    });
}

// shows specific queen in current cast list
function addKween(queen) {
    return `<div  class="card">
        <div class="data-image">
            <img src="`+queen.image+`" style= "border-color: black; width: 105px; height: 105px;"/>
        </div>
        <div class="data-header">`+queen._name+`</div>
        <div class="data-body" id="`+queen._name+`"><button id="remove">X</button></div>
        </div>`
}

// reset search box after selecting queen to add
function resetSearch() {
    searchInput.value = "";
    showingQueens.forEach(queen => {
        queen.element.classList.toggle("hide", true);
    });
}

// when you click the x to remove a queen
chosenKweensContainer.addEventListener("click",function(e) {
    if (e.target && e.target.matches("button#remove")) {
        let id = e.target.parentNode.id;
        let queenFound = currentCast.find((queen) => {
            return queen._name == id
        });
        currentCast.splice(currentCast.indexOf(queenFound), 1);
        updateCast();
        let big = document.getElementById("castBig");
        big.innerHTML = "Current Cast: " + currentCast.length;
        if (currentCast.length == 0) {
            big.classList.toggle("hide", true);
        }
    }
})
*/