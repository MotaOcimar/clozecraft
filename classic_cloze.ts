


interface Cloze {
    text: string;
    num: number;
}

function getClozes(text: string): Cloze[] {
    const clozes: Cloze[] = [];
    let num = 0;
    let match;
    const regex = /\{\{c(\d+):([^}]+)\}\}/g;
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[2],
            num: parseInt(match[1])
        });
    }
    return clozes;
}

function getFront(text: string, clozes: Cloze[], ask: number[], hide: number[]): string {
    let newText = text;
    for (const cloze of clozes) {
        if (ask.indexOf(cloze.num) !== -1) {
            newText = newText.replace(`{{c${cloze.num}:${cloze.text}}}`, `**[...]**`);
        } else if (hide.indexOf(cloze.num) !== -1) {
            newText = newText.replace(`{{c${cloze.num}:${cloze.text}}}`, `...`);
        } else {
            newText = newText.replace(`{{c${cloze.num}:${cloze.text}}}`, cloze.text);
        }
    }
    return newText;
}

function getBack(text: string, clozes: Cloze[], hide: number[]): string {
    let newText = text;
    for (const cloze of clozes) {
        if (hide.indexOf(cloze.num) !== -1) {
            newText = newText.replace(`{{c${cloze.num}:${cloze.text}}}`, `...`);
        } else {
            newText = newText.replace(`{{c${cloze.num}:${cloze.text}}}`, cloze.text);
        }
    }
    return newText;
}

// Example usage
const text = "This is a {{c1:cloze1}} {{c2:cloze2}} {{c3:cloze3}}";
const clozes = getClozes(text);
console.log(clozes);


ask = [1, 3]
hide = [2]
const front = getFront(text, clozes, ask, hide);
console.log(front);

const back = getBack(text, clozes, hide);
console.log(back);