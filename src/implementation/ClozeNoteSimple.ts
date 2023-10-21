import { ClozeFormatting } from "./ClozeFormatting";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { ClozeDeletionSimple } from "./ClozeDeletionSimple";
import { ClozeNoteClassic } from "./ClozeNoteClassic";

export class ClozeNoteSimple extends ClozeNoteClassic {
    protected _clozeDeletions: ClozeDeletionSimple[];

    // Override
    protected initParsing(text: string, formattings: ClozeFormatting[]) {

        let clozes: ClozeDeletionSimple[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeSimpleRegex;

            let match: IClozeRegExpExecArray | null;

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

    static isNote(text: string, formattings: ClozeFormatting[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeSimpleRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }
}
