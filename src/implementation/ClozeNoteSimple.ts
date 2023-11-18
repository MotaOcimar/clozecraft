import { IClozePattern } from "../interfaces/IClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { ClozeDeletionSimple } from "./ClozeDeletionSimple";
import { ClozeNoteClassic } from "./ClozeNoteClassic";
import { ClozeTypeEnum } from "./ClozeTypeEnum";

export class ClozeNoteSimple extends ClozeNoteClassic {
    protected _clozeDeletions: ClozeDeletionSimple[];

    constructor(text: string, patterns: IClozePattern[]) {
        super(text, patterns);
        this._clozeType = ClozeTypeEnum.SIMPLE;
    }

    // Override
    protected initParsing(text: string, patterns: IClozePattern[]) {

        let clozes: ClozeDeletionSimple[] = [];
        let numCards = 0;

        patterns.forEach( (pattern) => {
            const regex = pattern.getClozeRegex(ClozeTypeEnum.SIMPLE)

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                numCards++;

                let newCloze: ClozeDeletionSimple = {
                    raw: match.raw,
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
}
