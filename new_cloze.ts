

// Example of cloze: "==cloze1==^[1]"
let clozeBegin = "=="
let clozeEnd = "=="
let clozeNumIndicatorBegin = "^["
let clozeNumIndicatorEnd = "]"


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


interface Cloze {
    text: string;
    num: number;
}

function getClozes(text: string): Cloze[] {
    
    const clozes: Cloze[] = [];
    let num = 0;
    let match;

    // for "{{c1:text}}" is const regex = /\{\{c(\d+):([^}]+)\}\}/g;
    // for "==text==^[1]" is const regex = /==([^=]+)==\^\[(\d+)\]/g;
    // Scape regex special characters
    let cBegin = escapeRegExp(clozeBegin);
    let cEnd = escapeRegExp(clozeEnd);
    let cnBegin = escapeRegExp(clozeNumIndicatorBegin);
    let cnEnd = escapeRegExp(clozeNumIndicatorEnd);

    const regex = new RegExp(`${cBegin}([^${cEnd}]+)${cEnd}${cnBegin}(\\d+)${cnEnd}`, "g");
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[1],
            num: parseInt(match[2])
        });
    }
    return clozes;
}

function getFront(text: string, clozes: Cloze[], ask: number[], hide: number[]): string {
    let newText = text;
    for (const cloze of clozes) {
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeNumIndicatorBegin}${cloze.num}${clozeNumIndicatorEnd}`;
        if (ask.indexOf(cloze.num) !== -1) {
            newText = newText.replace(oldText, `**[...]**`);
        } else if (hide.indexOf(cloze.num) !== -1) {
            newText = newText.replace(oldText, `...`);
        } else {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}

function getBack(text: string, clozes: Cloze[], hide: number[]): string {
    let newText = text;
    for (const cloze of clozes) {
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeNumIndicatorBegin}${cloze.num}${clozeNumIndicatorEnd}`;
        if (hide.indexOf(cloze.num) !== -1) {
            newText = newText.replace(oldText, `...`);
        } else {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}

// Example usage
const text = "This is a ==cloze1==^[1] ==cloze2==^[2] ==cloze3==^[3]";
const clozes = getClozes(text);
console.log(clozes);


console.log(text);

let ask = [1, 3]
let hide = [2]
const front = getFront(text, clozes, ask, hide);
console.log(front);

const back = getBack(text, clozes, hide);
console.log(back);
