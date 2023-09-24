import { ClozeDeletionClassic } from "./cloze-deletion-classic";
import { ClozeNote } from "../interfaces/cloze-note";
import { ClozeNoteDefault } from "./cloze-note-default";
import { ClozeFormattingImpl } from "./cloze-formatting";
import { ClozeRegExpExecArray } from "../interfaces/cloze-reg-exp-exec-array";
import { format } from "./utils";


export class ClozeNoteClassic extends ClozeNoteDefault implements ClozeNote  {
    protected _clozeDeletions: ClozeDeletionClassic[];

    constructor(text: string, formattings: ClozeFormattingImpl[]) {
        super(text);
        this.initParsing(text, formattings);
    }

    protected initParsing(text: string, formattings: ClozeFormattingImpl[]): void {

        let clozes: ClozeDeletionClassic[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeClassicRegex;

            let match: ClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeDeletionClassic = {
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

    static isNote(text: string, formattings: ClozeFormattingImpl[]): boolean {
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
