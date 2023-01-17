import { clozeBegin, clozeEnd, clozeSeqBegin, clozeSeqEnd } from "./cloze";
import { clozeBeginEsc, clozeEndEsc, clozeSeqBeginEsc, clozeSeqEndEsc } from "./cloze";
import { Cloze, ClozeNote } from "./cloze";


class ClozeOL implements Cloze {
    text: string;
    seq: string;
}

export class ClozeOLNote implements ClozeNote {
    text: string;
    clozes: ClozeOL[];
    numCards: number;


    constructor(text: string) {
        this.text = text;
        this.clozes = [];
        this.numCards = 0;

        let match: RegExpExecArray | null;

        const regex = new RegExp(`${clozeBeginEsc}([^${clozeEndEsc}]+)${clozeEndEsc}${clozeSeqBeginEsc}([ash]+)${clozeSeqEndEsc}`, "g");
        while (match = regex.exec(text)) {

            let newCloze: ClozeOL = {
                text: match[1],
                seq: match[2]
            }

            this.clozes.push(newCloze);

            // Get the max seq length
            if (this.numCards < newCloze.seq.length) {
                this.numCards = newCloze.seq.length;
            }
        }
    }

    getFront(card: number): string {
        card = card - 1; // card 1 is the first card, but the array starts at 0

        if (card >= this.numCards || card < 0) {
            throw new Error(`Card ${card} does not exist`);
        }

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqBegin}${cloze.seq}${clozeSeqEnd}`;

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            if ( card >= cloze.seq.length ) {
                newText = newText.replace(oldText, cloze.text); // Just show
                continue;
            }

            switch (cloze.seq[card]) {
                case "a":
                    newText = newText.replace(oldText, `**[...]**`); // Hide asked cloze
                    break;
                case "h":
                    newText = newText.replace(oldText, `...`); // Just hide
                    break;
                case "s":
                    newText = newText.replace(oldText, cloze.text); // Just show
                    break;
            }
        }
        return newText;
    }

    getBack(card: number): string {
        card = card - 1; // card 1 is the first card, but the array starts at 0

        if (card >= this.numCards || card < 0) {
            throw new Error(`Card ${card} does not exist`);
        }

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqBegin}${cloze.seq}${clozeSeqEnd}`;

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            if ( card >= cloze.seq.length ) {
                newText = newText.replace(oldText, cloze.text); // Just show
                continue;
            }

            switch (cloze.seq[card]) {
                case "a":
                    newText = newText.replace(oldText, `**${cloze.text}**`); // Show as answer
                    break;
                case "h":
                    newText = newText.replace(oldText, `...`); // Just hide
                    break;
                case "s":
                    newText = newText.replace(oldText, cloze.text); // Just show
                    break;
            }
        }
        return newText;
    }
}
