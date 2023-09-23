import { ClozeDeletion, ClozeNote, ClozeNoteDefault } from "../interfaces/cloze-deletion";
import { ClozeFormatting } from "./clozeFormatting";
import { ClozeRegExpExecArray } from "./clozeRegExp";
import { format } from "./utils";


export class ClozeClassic implements ClozeDeletion {
    raw: string;
    answer: string;
    seq: number;
    hint: string;
}

export class ClozeClassicNote extends ClozeNoteDefault implements ClozeNote  {
    protected _clozeDeletions: ClozeClassic[];

    constructor(text: string, formattings: ClozeFormatting[]) {
        super(text);
        this.initParsing(text, formattings);
    }

    protected initParsing(text: string, formattings: ClozeFormatting[]): void {

        let clozes: ClozeClassic[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeClassicRegex;

            let match: ClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeClassic = {
                    raw: match[0],
                    answer: match.clozeText,
                    seq: parseInt(match.clozeSeq),
                    hint: match.clozeHint
                }

                clozes.push(newCloze);

                // Get the max seq
                if (numCards < newCloze.seq) {
                    numCards = newCloze.seq;
                }
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, formattings: ClozeFormatting[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeClassicRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }

    getFront(card: number): string {
        if (card > this._numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let frontText = this.raw;
        for (const cloze of this._clozeDeletions) {

            if (cloze.seq !== card) {
                frontText = frontText.replace(cloze.raw, cloze.answer); // Just show
                continue;
            }

            if (cloze.hint !== undefined) {
                frontText = frontText.replace(cloze.raw, format.asking(`[${cloze.hint}]`) ); // Hide asked cloze with hint
                continue
            }

            frontText = frontText.replace(cloze.raw, format.asking(`[...]`)); // Hide asked cloze
        }
        return frontText;
    }

    getBack(card: number): string {
        if (card > this._numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let backText = this.raw;
        for (const cloze of this._clozeDeletions) {

            if (cloze.seq === card) {
                backText = backText.replace(cloze.raw, format.showing(cloze.answer)); // Show as answer
            } else {
                backText = backText.replace(cloze.raw, cloze.answer); // Just show
            }
        }
        return backText;
    }
}
