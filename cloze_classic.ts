import { clozeBegin, clozeEnd, clozeSeqBegin, clozeSeqEnd } from "./cloze";
import { clozeBeginEsc, clozeEndEsc, clozeSeqBeginEsc, clozeSeqEndEsc } from "./cloze";
import { Cloze, ClozeNote } from "./cloze";


class ClozeClassic implements Cloze {
    text: string;
    seq: number;
}

export class ClozeClassicNote implements ClozeNote {
    text: string;
    clozes: ClozeClassic[];
    numCards: number;


    constructor(text: string) {
        this.text = text;
        this.clozes = [];
        this.numCards = 0;

        let match: RegExpExecArray | null;

        const regex = new RegExp(`${clozeBeginEsc}([^${clozeEndEsc}]+)${clozeEndEsc}${clozeSeqBeginEsc}(\\d+)${clozeSeqEndEsc}`, "g");
        while (match = regex.exec(text)) {

            let newCloze: ClozeClassic = {
                text: match[1],
                seq: parseInt(match[2])
            }

            this.clozes.push(newCloze);

            // Get the max seq
            if (this.numCards < newCloze.seq) {
                this.numCards = newCloze.seq;
            }
        }
    }

    getFront(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqBegin}${cloze.seq}${clozeSeqEnd}`;

            if (cloze.seq === card) {
                newText = newText.replace(oldText, `**[...]**`); // Hide asked cloze
            } else {
                newText = newText.replace(oldText, cloze.text); // Just show
            }
        }
        return newText;
    }

    getBack(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqBegin}${cloze.seq}${clozeSeqEnd}`;

            if (cloze.seq === card) {
                newText = newText.replace(oldText, `**${cloze.text}**`); // Show as answer
            } else {
                newText = newText.replace(oldText, cloze.text); // Just show
            }
        }
        return newText;
    }
}
