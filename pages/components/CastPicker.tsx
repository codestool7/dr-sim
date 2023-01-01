import React from 'react';
import { AppProps, AppState } from '../misc/types';

export default class ClassPicker extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
    }
    
    componentWillUnmount() {
    }

    render() {
        return <div className="mainPart" id="MainBlock">
            <p><big>This is your chance to simulate a drag race season with all your favorite contestants!</big></p>
            <div className="search-wrapper">
                <big><label /* for="search" */>Choose your contestants:</label></big>
                <input type="search" id="search" className="searchInput" placeholder="Type a name.." data-search></input>
            </div>
            <div>
                <button /*onclick="addRandomContestant()"*/ id="randomK">Random</button>
                <button /* onclick="addRandomCustomContestant()" */ id="randomKC">Random Customs</button>
                <button /* onclick="moreKweens()" */ className="hide" id="moreK">Choose More Contestants</button>
            </div>
            <div className="drag-cards" data-drag-cards-container></div>
            {/* <template data-drag-template>
                <div className="card hide">
                    <div className="data-image" data-image></div>
                    <div className="header" data-header></div>
                </div>
            </template> */}
        </div>;
    }
}
/*
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

function updateCast() {
    chosenKweensContainer.innerHTML = "";
    currentCast.forEach(queen => {
        chosenKweensContainer.innerHTML += addKween(queen);
    });
}

function addKween(queen) {
    return `<div  class="card">
        <div class="data-image">
            <img src="`+queen.image+`" style= "border-color: black; width: 105px; height: 105px;"/>
        </div>
        <div class="data-header">`+queen._name+`</div>
        <div class="data-body" id="`+queen._name+`"><button id="remove">X</button></div>
        </div>`
}

function resetSearch() {
    searchInput.value = "";
    showingQueens.forEach(queen => {
        queen.element.classList.toggle("hide", true);
    });
}

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