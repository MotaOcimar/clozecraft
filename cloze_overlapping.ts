import { clozeBeginEsc, clozeEndEsc, clozeSeqBeginEsc, clozeSeqEndEsc, clozeHintBeginEsc, clozeHintEndEsc } from "./cloze";
import { Cloze, ClozeNote } from "./cloze";


class ClozeOL implements Cloze {
    raw: string;
    text: string;
    seq: string;
    hint: string;
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

        const regex = new RegExp(`(${clozeBeginEsc}([^${clozeEndEsc}]+)${clozeEndEsc}${clozeSeqBeginEsc}([ash]+)${clozeSeqEndEsc}(?:${clozeHintBeginEsc}([^${clozeHintEndEsc}]+)${clozeHintEndEsc})?)`, "g");
        while (match = regex.exec(text)) {

            let newCloze: ClozeOL = {
                raw: match[1],
                text: match[2],
                seq: match[3],
                hint: match[4]
            }

            this.clozes.push(newCloze);

            // Get the max seq length
            if (this.numCards < newCloze.seq.length) {
                this.numCards = newCloze.seq.length;
            }
        }
    }

    getFront(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        card = card - 1; // card 1 is the first card, but the array starts at 0

        let frontText = this.text;
        for (const cloze of this.clozes) {

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            if ( card >= cloze.seq.length ) {
                frontText = frontText.replace(cloze.raw, cloze.text); // Just show
                continue;
            }

            switch (cloze.seq[card]) {
                case "a":
                    if (cloze.hint !== undefined) {
                        frontText = frontText.replace(cloze.raw, `**[${cloze.hint}]**`); // Hide asked cloze with hint
                        break;
                    }
                    frontText = frontText.replace(cloze.raw, `**[...]**`); // Hide asked cloze
                    break;
                case "h":
                    frontText = frontText.replace(cloze.raw, `...`); // Just hide
                    break;
                case "s":
                    frontText = frontText.replace(cloze.raw, cloze.text); // Just show
                    break;
            }
        }
        return frontText;
    }

    getBack(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        card = card - 1; // card 1 is the first card, but the array starts at 0

        let backText = this.text;
        for (const cloze of this.clozes) {

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            if ( card >= cloze.seq.length ) {
                backText = backText.replace(cloze.raw, cloze.text); // Just show
                continue;
            }

            switch (cloze.seq[card]) {
                case "a":
                    backText = backText.replace(cloze.raw, `**${cloze.text}**`); // Show as answer
                    break;
                case "h":
                    backText = backText.replace(cloze.raw, `...`); // Just hide
                    break;
                case "s":
                    backText = backText.replace(cloze.raw, cloze.text); // Just show
                    break;
            }
        }
        return backText;
    }
}
