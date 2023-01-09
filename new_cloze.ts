

// Example of cloze: "==cloze1==^[1]"
// or "==cloze==^[ash]"
let clozeBegin = "=="
let clozeEnd = "=="
let clozeSeqIndicatorBegin = "^["
let clozeSeqIndicatorEnd = "]"


function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


interface Cloze {
    text: string;
    seq: number;
}

function getClozes(text: string): Cloze[] {
    
    const clozes: Cloze[] = [];
    let match: RegExpExecArray | null;

    // for "{{c1:text}}" is const regex = /\{\{c(\d+):([^}]+)\}\}/g;
    // for "==text==^[1]" is const regex = /==([^=]+)==\^\[(\d+)\]/g;
    // for "==text==^[a]" is const regex = /==([^=]+)==\^\[([ash]+)\]/g;
    // for both is const regex = /==([^=]+)==\^\[(\d+|[ash]+)\]/g;

    // Scape regex special characters
    let cBegin = escapeRegExp(clozeBegin);
    let cEnd = escapeRegExp(clozeEnd);
    let csBegin = escapeRegExp(clozeSeqIndicatorBegin);
    let csEnd = escapeRegExp(clozeSeqIndicatorEnd);

    const regex = new RegExp(`${cBegin}([^${cEnd}]+)${cEnd}${csBegin}(\\d+|[ash]+)${csEnd}`, "g");
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[1],
            seq: parseInt(match[2])
        });
    }
    return clozes;
}

function getFront(text: string, clozes: Cloze[], ask: number[], hide: number[]): string {
    let newText = text;
    for (const cloze of clozes) {
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;
        if (ask.indexOf(cloze.seq) !== -1) {
            newText = newText.replace(oldText, `**[...]**`);
        } else if (hide.indexOf(cloze.seq) !== -1) {
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
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;
        if (hide.indexOf(cloze.seq) !== -1) {
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
