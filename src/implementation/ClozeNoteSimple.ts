import { IClozeFormatter } from "../interfaces/IClozeFormatter";
import { IClozePattern } from "../interfaces/IClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { ClozeDeletionSimple } from "./ClozeDeletionSimple";
import { ClozeNote } from "./ClozeNote";
import { ClozeTypeEnum } from "./ClozeTypeEnum";
import { simpleFormatter } from "./utils";

export class ClozeNoteSimple extends ClozeNote<ClozeDeletionSimple> {

    constructor(raw: string, patterns: IClozePattern[]) {
        super(raw, patterns);
    }

    get clozeType(): ClozeTypeEnum {
        return ClozeTypeEnum.SIMPLE;
    }

    protected initParsing(rawNote: string, patterns: IClozePattern[]): { clozeDeletions: ClozeDeletionSimple[], numCards: number } {

        let clozeDeletions: ClozeDeletionSimple[] = [];
        let numCards = 0;
        const deletionsAnsIndexes: Set<number> = new Set();

        patterns.forEach((pattern) => {
            const regex = pattern.getClozeRegex(ClozeTypeEnum.SIMPLE)

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(rawNote)) {
                const ansIndex = match.index + match.raw.indexOf(match.answer);
                if (deletionsAnsIndexes.has(ansIndex)) {
                    break;
                }
                deletionsAnsIndexes.add(ansIndex);

                numCards++;

                let newCloze: ClozeDeletionSimple = {
                    raw: match.raw,
                    answer: match.answer,
                    seq: numCards,
                    hint: match.hint
                };

                clozeDeletions.push(newCloze);
            }
        });

        return { clozeDeletions, numCards };
    }

    getCardFront(cardIndex: number, formatter?: IClozeFormatter): string {
        if (cardIndex >= this._numCards || cardIndex < 0) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        if (!formatter) {
            formatter = new simpleFormatter();
        }

        let frontText = this.raw;
        for (const deletion of this._clozeDeletions) {

            if (deletion.seq !== cardIndex + 1) {
                frontText = frontText.replace(deletion.raw, deletion.answer); // Just show
                continue;
            }

            frontText = frontText.replace(deletion.raw, formatter.asking(deletion.answer, deletion.hint)); // Hide asked cloze
        }
        return frontText;
    }

    getCardBack(cardIndex: number, formatter?: IClozeFormatter): string {
        if (cardIndex >= this._numCards || cardIndex < 0) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        if (!formatter) {
            formatter = new simpleFormatter();
        }

        let backText = this.raw;
        for (const deletion of this._clozeDeletions) {

            if (deletion.seq === cardIndex + 1) {
                backText = backText.replace(deletion.raw, formatter.showingAnswer(deletion.answer, deletion.hint)); // Show as answer
            } else {
                backText = backText.replace(deletion.raw, deletion.answer); // Just show
            }
        }
        return backText;
    }
}
