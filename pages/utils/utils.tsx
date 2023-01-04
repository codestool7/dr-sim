import Queen from "../classes/Queen";

type BallTheme = {
    name: string,
    themes: string
}

export function pickRandomlyFromArray(choices: Array<string>): string {
    let rand = randomNumber(choices.length);
    return choices[rand];
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

export function sortQueens(queens: Array<Queen>) {
    return queens.sort((a, b) => a.getName().toLocaleLowerCase().localeCompare(b.getName().toLocaleLowerCase()));
}