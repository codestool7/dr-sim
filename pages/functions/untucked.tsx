export {};

/* //UNTUCKED
function untucked() {
    let screen = new Scene();
    screen.clean();
    document.body.style.backgroundImage = "url('image/untucked.webp')";
    screen.createHeader("Untucked!!");
    screen.createBold("At the end of the episode the queens go to sit and talk about their feelings in this episode.");
    screen.createHorizontalLine();
    let howManyInteractions = 0;
    if (currentCast.length < 21) {howManyInteractions = randomNumberWithMin(3, 7);}
    if (currentCast.length < 12) {howManyInteractions = randomNumberWithMin(2, 5);}
    if (currentCast.length < 6) {howManyInteractions = randomNumberWithMin(2, 3);}
    for (let i = 0; i < howManyInteractions; i++) {
        let howManyQueens = randomNumber(100);
        if (howManyQueens <= 75) {
            howManyQueens = 2;
        }
        if (howManyQueens > 75 && howManyQueens <= 95) {
            howManyQueens = 3;
        }
        if (howManyQueens > 95) {
            howManyQueens = 4;
        }
        if (currentCast.length < 6) {howManyQueens = randomNumberWithMin(2, 3);}
        let flag = false;
        if (howManyQueens == 2){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            interactions(2, queen1, queen2);
        }
        if (howManyQueens == 3){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            let queen3 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen3 != queen1) {
                    if (queen3 != queen2) {
                        flag = true;
                    } else {
                        queen3 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen3 = pickRandomlyFromArray(currentCast);
                }
            }
            interactions(3, queen1, queen2, queen3);
        }
        if (howManyQueens == 4){
            let queen1 = pickRandomlyFromArray(currentCast);
            let queen2 = pickRandomlyFromArray(currentCast);
            while(queen1 == queen2){
                queen2 = pickRandomlyFromArray(currentCast);
            }
            let queen3 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen3 != queen1) {
                    if (queen3 != queen2) {
                        flag = true;
                    } else {
                        queen3 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen3 = pickRandomlyFromArray(currentCast);
                }
            }
            flag = false;
            let queen4 = pickRandomlyFromArray(currentCast);
            while(!flag) {
                if (queen4 != queen1) {
                    if (queen4 != queen2) {
                        if (queen4 != queen3) {
                            flag = true;
                        } else {
                            queen4 = pickRandomlyFromArray(currentCast);
                        }
                    } else {
                        queen4 = pickRandomlyFromArray(currentCast);
                    }
                } else {
                    queen4 = pickRandomlyFromArray(currentCast);
                }
            }
            interactions(4, queen1, queen2, queen3, queen4);
        }
    }
    areRelations()
    screen.createButton("Proceed", "newEpisode()");
}
function interactions(howmany, queen1, queen2, queen3 = '', queen4 = '') {
    switch(howmany) {
        case 2:
            twoQueensUntucked(queen1, queen2);
            break;
        case 3:
            threeQueensUntucked(queen1, queen2, queen3);
            break;
        case 4:
            fourQueensUntucked(queen1, queen2, queen3, queen4);
            break;
        case 5:
            allVOneUntucked();
            break;
        default:
            break;
    }
}

function twoQueensUntucked(queen1, queen2) {
    let screen = new Scene();
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    let eventType = twoTypeEvent(queen1, queen2);
    let typeEvent = randomNumber(2);
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation1)}`);
        modRelation(2, 1, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation2)}`);
        modRelation(2, 2, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 3) {
        if (typeEvent == 0) {
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation3)}`);
        }
        if (typeEvent == 1) {
            screen.createBold(`${queen1.getName()} ${pickRandomlyFromArray(twoQueensRelation3_2)} ${queen2.getName()} `);
        }
        modRelation(2, 3, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 4) {
        if (typeEvent == 0) {
            screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation4)}`);
        }
        if (typeEvent == 1) {
            screen.createBold(`${queen1.getName()} ${pickRandomlyFromArray(twoQueensRelation4_2)} ${queen2.getName()} `);
        }
        modRelation(2, 4, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
    if (eventType == 5) {
        screen.createBold(`${queen1.getName()} and ${queen2.getName()} ${pickRandomlyFromArray(twoQueensRelation5)}`);
        modRelation(2, 5, queen1, queen2);
        queenRelations(queen1);
        queenRelations(queen2);
    }
}

function threeQueensUntucked(queen1, queen2, queen3) {
    let screen = new Scene();
    let eventType = randomNumber(4);
    let event = randomNumber(2);
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    screen.createImage(queen3.image);
    if (eventType == 0) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation1[event]}`);
        modRelation(3, 1, queen1, queen2, queen3);
    }
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation2[event]}`);
        modRelation(3, 2, queen1, queen2, queen3);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation3[event]}`);
        modRelation(3, 3, queen1, queen2, queen3);
    }
    if (eventType == 3) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()} and ${queen3.getName()} ${threeQueensRelation4[event]}`);
        modRelation(3, 4, queen1, queen2, queen3);
    }
}
function fourQueensUntucked(queen1, queen2, queen3, queen4) {
    let screen = new Scene();
    let eventType = randomNumber(4);
    let event = randomNumber(2);
    screen.createImage(queen1.image);
    screen.createImage(queen2.image);
    screen.createImage(queen3.image);
    screen.createImage(queen4.image);
    if (eventType == 0) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation1[event]}`);
        modRelation(4, 1, queen1, queen2, queen3, queen4);
    }
    if (eventType == 1) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation2[event]}`);
        modRelation(4, 2, queen1, queen2, queen3, queen4);
    }
    if (eventType == 2) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation3[event]}`);
        modRelation(4, 3, queen1, queen2, queen3, queen4);
    }
    if (eventType == 3) {
        screen.createBold(`${queen1.getName()}, ${queen2.getName()}, ${queen3.getName()} and ${queen4.getName()} ${fourQueensRelation4[event]}`);
        modRelation(4, 4, queen1, queen2, queen3, queen4);
    }
}

function queenRelations(queen) {
    for (let i = 0; i < queen.sisters.length; i++) {
        if (isFriend(queen, queen.sisters[i].queen)) {
            stillFriend(queen, queen.sisters[i].queen);
        } else if (isEnemy(queen, queen.sisters[i].queen)) {
            stillEnemy(queen, queen.sisters[i].queen);
        } else {
            CheckFriend(queen, queen.sisters[i].queen); 
        }
    }
} */