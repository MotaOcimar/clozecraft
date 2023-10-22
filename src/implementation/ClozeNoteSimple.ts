import { ClozePattern } from "./ClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { ClozeDeletionSimple } from "./ClozeDeletionSimple";
import { ClozeNoteClassic } from "./ClozeNoteClassic";

export class ClozeNoteSimple extends ClozeNoteClassic {
    protected _clozeDeletions: ClozeDeletionSimple[];

    // Override
    protected initParsing(text: string, patterns: ClozePattern[]) {

        let clozes: ClozeDeletionSimple[] = [];
        let numCards = 0

        patterns.forEach( (pattern) => {
            const regex = pattern.clozeSimpleRegex;

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                numCards++;

                let newCloze: ClozeDeletionSimple = {
                    raw: match[0],
                    answer: match.answer,
                    seq: numCards,
                    hint: match.hint
                }

                clozes.push(newCloze);
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, patterns: ClozePattern[]): boolean {
        for (const pattern of patterns) {
            const regex = pattern.clozeSimpleRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }
}
