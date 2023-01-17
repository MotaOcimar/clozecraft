import { escapeRegExp } from "./utils";
import { clozeBegin, clozeEnd, clozeSeqIndicatorBegin, clozeSeqIndicatorEnd } from "./cloze";
import { Cloze, ClozeNote } from "./cloze";


class ClozeOL implements Cloze {
    text: string;
    seq: string;
}

export class ClozeOLNote implements ClozeNote {
    text: string;
    clozes: ClozeOL[];


    constructor(text: string) {
        this.text = text;
        this.clozes = [];

        let match: RegExpExecArray | null;

        // Scape regex special characters
        let cBegin = escapeRegExp(clozeBegin);
        let cEnd = escapeRegExp(clozeEnd);
        let csBegin = escapeRegExp(clozeSeqIndicatorBegin);
        let csEnd = escapeRegExp(clozeSeqIndicatorEnd);

        const regex = new RegExp(`${cBegin}([^${cEnd}]+)${cEnd}${csBegin}([ash]+)${csEnd}`, "g");
        while (match = regex.exec(text)) {
            this.clozes.push({
                text: match[1],
                seq: match[2]
            });
        }

        // Ensures that all clozes have the same size of seq
        let maxSeq = 0;
        for (const cloze of this.clozes) {
            if (cloze.seq.length > maxSeq) {
                maxSeq = cloze.seq.length;
            }
        }
        for (const cloze of this.clozes) {
            if (cloze.seq.length < maxSeq) {
                while (cloze.seq.length < maxSeq) {
                    cloze.seq += "s";
                }
            }
        }
    }

    getFront(card: number): string {
        card = card - 1; // card 1 is the first card

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;

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
        card = card - 1; // card 1 is the first card

        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;

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
