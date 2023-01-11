import array from 'lodash/array';
import lang from 'lodash/lang';
import Queen from "../classes/competitors/Queen";

type BallTheme = {
    name: string,
    themes: string
}

// pick an item randomly from an array and return it
export function pickRandomlyFromArray(choices: Array<any>): any {
    let rand = randomNumber(choices.length);
    return choices[rand];
}

export function pickRandomlyFromArrayExcluding(choices: Array<any>, exclude: any): any {
    let chosen: any;
    do {
        chosen = pickRandomlyFromArray(choices)
    } while (chosen == exclude);
    return chosen;
}

export function pickBallTheme(choices: Array<BallTheme>): BallTheme {
    let rand = randomNumber(choices.length);
    return choices[rand];
}

// random number between 0 and x - 1 inclusive, used to pick randomly from array by index
export function randomNumber(x: number): number {
    let randomNumber = Math.floor(Math.random() * x);
    return randomNumber;
}

export function randomNumberWithMin(min: number, max: number): number {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// sorts queen array alphabetically by name and returns
export function sortQueensByName(queens: Array<Queen>) {
    return queens.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
}

export function sortQueensByNameReverse(queens: Array<Queen>) {
    return queens.sort((a, b) => b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase()));
}

export function sortQueensByAttribute(queens: Array<Queen>, attribute: string) {
    return queens.sort((function(a, b){return b[attribute] - a[attribute]}));
}

export function sortQueensByAttributeReverse(queens: Array<Queen>, attribute: string) {
    return queens.sort((function(a, b){return a[attribute] - b[attribute]}));
}

// adds queen to array and returns new array
export function addQueenToArray(queens: Array<Queen>, queen: Queen) {
    let beforeLength = queens.length
    queens.push(queen);
    if (queens.length != beforeLength + 1) {
        throw new Error("failed to add queen " + queen.name + " to array")
    }
    return queens;
}

// adds queen to array, sorts alphabetically, returns
export function addQueenToArrayAndSort(queens: Array<Queen>, queen: Queen) {
    return sortQueensByName(addQueenToArray(queens, queen));
}

// removes queen by object and returns new array
export function removeQueenFromArray(queens: Array<Queen>, queen: Queen) {
    let removed = array.remove(queens, function(q: Queen) {
        return areQueensEqual(q, queen);
    });
    if (!removed || removed.length < 1) {
        throw new Error("failed to remove queen " + queen.name + " from array");
    }
    if (removed.length > 1) {
        throw new Error("somehow removed multiple queens named " + queen.name + " from array?? how did you do this bro");
    }
    return queens;
}

// are two queen objects equal
export function areQueensEqual(q1: Queen, q2: Queen) {
    return lang.isEqual(q1, q2);
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
