import { escapeRegExp } from "./utils";
import { clozeBegin, clozeEnd, clozeSeqIndicatorBegin, clozeSeqIndicatorEnd } from "./cloze";
import { Cloze, ClozeNote } from "./cloze";


class ClozeClassic implements Cloze {
    text: string;
    seq: number;
}

export class ClozeClassicNote implements ClozeNote {
    text: string;
    clozes: ClozeClassic[];

    constructor(text: string) {
        this.text = text;
        this.clozes = [];

        let match: RegExpExecArray | null;

        // Scape regex special characters
        let cBegin = escapeRegExp(clozeBegin);
        let cEnd = escapeRegExp(clozeEnd);
        let csBegin = escapeRegExp(clozeSeqIndicatorBegin);
        let csEnd = escapeRegExp(clozeSeqIndicatorEnd);

        const regex = new RegExp(`${cBegin}([^${cEnd}]+)${cEnd}${csBegin}(\\d+)${csEnd}`, "g");
        while (match = regex.exec(text)) {
            this.clozes.push({
                text: match[1],
                seq: parseInt(match[2])
            });
        }
    }

    getFront(card: number): string {
        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;

            if (cloze.seq === card) {
                newText = newText.replace(oldText, `**[...]**`); // Hide asked cloze
            } else {
                newText = newText.replace(oldText, cloze.text); // Just show
            }
        }
        return newText;
    }

    getBack(card: number): string {
        let newText = this.text;
        for (const cloze of this.clozes) {
            let oldText = `${clozeBegin}${cloze.text}${clozeEnd}${clozeSeqIndicatorBegin}${cloze.seq}${clozeSeqIndicatorEnd}`;

            if (cloze.seq === card) {
                newText = newText.replace(oldText, `**${cloze.text}**`); // Show as answer
            } else {
                newText = newText.replace(oldText, cloze.text); // Just show
            }
        }
        return newText;
    }
}
