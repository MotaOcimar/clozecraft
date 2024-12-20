import { ClozeDeletionClassic } from "./ClozeDeletionClassic";
import { ClozeNote } from "./ClozeNote";
import { IClozePattern } from "../interfaces/IClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { simpleFormatter } from "./utils";
import { ClozeTypeEnum } from "./ClozeTypeEnum";
import { IClozeFormatter } from "../interfaces/IClozeFormatter";


export class ClozeNoteClassic extends ClozeNote<ClozeDeletionClassic> {

    constructor(raw: string, patterns: IClozePattern[]) {
        super(raw, patterns);
    }

    get clozeType(): ClozeTypeEnum {
        return ClozeTypeEnum.CLASSIC;
    }

    protected initParsing(rawNote: string, patterns: IClozePattern[]): { clozeDeletions: ClozeDeletionClassic[], numCards: number } {

        let clozeDeletions: ClozeDeletionClassic[] = [];
        let numCards = 0;
        const deletionsAnsIndexes: Set<number> = new Set();

        patterns.forEach((pattern) => {
            const regex = pattern.getClozeRegex(ClozeTypeEnum.CLASSIC);

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(rawNote)) {
                if (!match.seq) {
                    break;
                }

                const ansIndex = match.index + match.raw.indexOf(match.answer);
                if (deletionsAnsIndexes.has(ansIndex)) {
                    break;
                }
                deletionsAnsIndexes.add(ansIndex);

                let newCloze: ClozeDeletionClassic = {
                    raw: match.raw,
                    answer: match.answer,
                    seq: parseInt(match.seq),
                    hint: match.hint
                };

                clozeDeletions.push(newCloze);

                // Get the max seq
                if (numCards < newCloze.seq) {
                    numCards = newCloze.seq;
                }
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
