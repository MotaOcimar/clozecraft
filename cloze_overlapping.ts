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
            this.clozes.push({
                text: match[1],
                seq: match[2]
            });
        }

        // Garante que todos os clozes tem o mesmo tamanho de seq
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
        card = card -1; // card 1 is the first card

        let newText = this.text;
        for (const cloze of this.clozes) {
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
    getBack(card: number): string {
        card = card -1; // card 1 is the first card

        let newText = this.text;
        for (const cloze of this.clozes) {
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
}
