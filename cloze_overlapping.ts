// Example of ClozeOL: "==cloze==^[ash]"
let clozeBegin = "=="
let clozeEnd = "=="
let clozeSeqIndicatorBegin = "^["
let clozeSeqIndicatorEnd = "]"


function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


interface ClozeOL {
    text: string;
    seq: string;
}

function getClozes(text: string): ClozeOL[] {
    
    const clozes: ClozeOL[] = [];
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

    const regex = new RegExp(`${cBegin}([^${cEnd}]+)${cEnd}${csBegin}([ash]+)${csEnd}`, "g");
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[1],
            seq: match[2]
        });
    }

    // Garante que todos os clozes tem o mesmo tamanho de seq
    let maxSeq = 0;
    for (const cloze of clozes) {
        if (cloze.seq.length > maxSeq) {
            maxSeq = cloze.seq.length;
        }
    }
    for (const cloze of clozes) {
        if (cloze.seq.length < maxSeq) {
            while (cloze.seq.length < maxSeq) {
                cloze.seq += "s";
            }
        }
    }

    return clozes;
}

function getFront(text: string, clozes: ClozeOL[], card: number): string {
    let newText = text;
    for (const cloze of clozes) {
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;
        // Oculta o texto se o caractere da posição "card" for "h"
        if (cloze.seq[card] === "a") {
            newText = newText.replace(oldText, `**[...]**`);
        } else if (cloze.seq[card] === "h") {
            newText = newText.replace(oldText, `...`);
        } else if (cloze.seq[card] === "s") {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}

function getBack(text: string, clozes: ClozeOL[], card: number): string {
    let newText = text;
    for (const cloze of clozes) {
        let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;
        if (cloze.seq[card] === "a") {
            newText = newText.replace(oldText, `**${cloze.text}**`);
        } else if (cloze.seq[card] === "h") {
            newText = newText.replace(oldText, `...`);
        } else if (cloze.seq[card] === "s") {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}

// Example usage
const text = "This is a ==cloze1==^[ash] ==cloze2==^[sha] ==cloze3==^[has]";
const clozes = getClozes(text);
console.log(clozes);


console.log(text);

let card = 0;
const front = getFront(text, clozes, card);
console.log(front);

const back = getBack(text, clozes, card);
console.log(back);
