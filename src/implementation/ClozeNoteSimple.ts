import { IClozePattern } from "../interfaces/IClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { ClozeDeletionSimple } from "./ClozeDeletionSimple";
import { ClozeNoteClassic } from "./ClozeNoteClassic";
import { ClozeTypeEnum } from "./ClozeTypeEnum";

export class ClozeNoteSimple extends ClozeNoteClassic {
    protected _clozeDeletions: ClozeDeletionSimple[];

    constructor(raw: string, patterns: IClozePattern[]) {
        super(raw, patterns);
    }

    get clozeType(): ClozeTypeEnum {
        return ClozeTypeEnum.SIMPLE;
    }

    // Override
    protected initParsing(rawNote: string, patterns: IClozePattern[]): { clozeDeletions: ClozeDeletionSimple[], numCards: number } {

        let clozeDeletions: ClozeDeletionSimple[] = [];
        let numCards = 0;

        patterns.forEach( (pattern) => {
            const regex = pattern.getClozeRegex(ClozeTypeEnum.SIMPLE)

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(rawNote)) {

                numCards++;

                let newCloze: ClozeDeletionSimple = {
                    raw: match.raw,
                    answer: match.answer,
                    seq: numCards,
                    hint: match.hint
                }

                clozeDeletions.push(newCloze);
            }
        } )

        return { clozeDeletions, numCards};
    }
}
