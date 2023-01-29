import { Cloze, ClozeNote, ClozeDelimiters } from "./cloze";


class ClozeClassic implements Cloze {
    raw: string;
    text: string;
    seq: number;
    hint: string;
}

export class ClozeClassicNote implements ClozeNote {
    text: string;
    clozes: ClozeClassic[];
    numCards: number;


    constructor(text: string, delimiters: ClozeDelimiters[]) {
        this.text = text;
        this.clozes = [];
        this.numCards = 0;

        let match: RegExpExecArray | null;

        for (const cd of delimiters) {

            const regex = new RegExp(`(${cd.beginEsc}([^${cd.endEsc}]+)${cd.endEsc}${cd.seqBeginEsc}(\\d+)${cd.seqEndEsc}(?:${cd.hintBeginEsc}([^${cd.hintEndEsc}]+)${cd.hintEndEsc})?)`, "g");
            while (match = regex.exec(text)) {

                let newCloze: ClozeClassic = {
                    raw: match[1],
                    text: match[2],
                    seq: parseInt(match[3]),
                    hint: match[4]
                }

                this.clozes.push(newCloze);

                // Get the max seq
                if (this.numCards < newCloze.seq) {
                    this.numCards = newCloze.seq;
                }
            }
        }
    }

    getFront(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let frontText = this.text;
        for (const cloze of this.clozes) {

            if (cloze.seq !== card) {
                frontText = frontText.replace(cloze.raw, cloze.text); // Just show
                continue;
            }

            if (cloze.hint !== undefined) {
                frontText = frontText.replace(cloze.raw, `**[${cloze.hint}]**`); // Hide asked cloze with hint
                continue
            }

            frontText = frontText.replace(cloze.raw, `**[...]**`); // Hide asked cloze
        }
        return frontText;
    }

    getBack(card: number): string {
        if (card > this.numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let backText = this.text;
        for (const cloze of this.clozes) {

            if (cloze.seq === card) {
                backText = backText.replace(cloze.raw, `**${cloze.text}**`); // Show as answer
            } else {
                backText = backText.replace(cloze.raw, cloze.text); // Just show
            }
        }
        return backText;
    }
}
