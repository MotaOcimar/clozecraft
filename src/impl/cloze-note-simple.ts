import { ClozeFormattingImpl } from "./cloze-formatting";
import { ClozeRegExpExecArray } from "../interfaces/cloze-reg-exp-exec-array";
import { ClozeDeletionSimple } from "./cloze-deletion-simple";
import { ClozeNoteClassic } from "./cloze-note-classic";

export class ClozeNoteSimple extends ClozeNoteClassic {
    protected _clozeDeletions: ClozeDeletionSimple[];

    // Override
    protected initParsing(text: string, formattings: ClozeFormattingImpl[]) {

        let clozes: ClozeDeletionSimple[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeSimpleRegex;

            let match: ClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                numCards++;

                let newCloze: ClozeDeletionSimple = {
                    raw: match[0],
                    answer: match.clozeText,
                    seq: numCards,
                    hint: match.clozeHint
                }

                clozes.push(newCloze);
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, formattings: ClozeFormattingImpl[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeSimpleRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }
}
